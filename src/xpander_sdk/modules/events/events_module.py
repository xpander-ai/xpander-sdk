"""
Events module for handling background tasks and event streaming in the xpander.ai platform.

This module provides functionality for managing Server Sent Events (SSE) and executing tasks
based on events within the xpander.ai platform. It supports asynchronous execution and retry logic.
"""

from __future__ import annotations

import asyncio
import json
import signal
import sys
from os import getenv
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Awaitable, Callable, Optional, Set, Union, List

import httpx
from httpx_sse import aconnect_sse
from loguru import logger

from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.tasks.tasks_module import Tasks

from .utils.git_init import configure_git_credentials
from .utils.generic import backoff_delay, get_events_base, get_events_headers
from .models.deployments import DeployedAsset
from .models.events import (
    EventType,
    WorkerEnvironmentConflict,
    WorkerFinishedEvent,
    WorkerHeartbeat,
)
from ..tasks.sub_modules.task import Task
from ..tasks.models.task import AgentExecutionStatus, LocalTaskTest


_MAX_RETRIES = 5  # total attempts (1 initial + 4 retries)

ExecutionRequestHandler = Union[
    Callable[[Task], Task],
    Callable[[Task], Awaitable[Task]],
]

BootHandler = Union[
    Callable[[], None],
    Callable[[], Awaitable[None]],
]

ShutdownHandler = Union[
    Callable[[], None],
    Callable[[], Awaitable[None]],
]


class Events(ModuleBase):
    """
    Events module for managing SSE connections and task execution.

    This class manages Server Sent Events (SSE) for real-time task execution requests
    and integrates with agents deployed on xpander.ai. It handles event streaming,
    retry logic, and background task management.

    Attributes:
        worker (Optional[DeployedAsset]): Represents the deployed asset/agent.
        test_task (Optional[LocalTaskTest]): Task to be tested within the local environment.
        configuration (Configuration): SDK configuration with credentials and endpoints.

    Example:
        >>> events = Events()
        >>> events.register(on_task=handle_task)
    """

    worker: Optional[DeployedAsset] = None
    test_task: Optional[LocalTaskTest] = None
    
    # Class-level registries for boot and shutdown handlers
    _boot_handlers: List[BootHandler] = []
    _shutdown_handlers: List[ShutdownHandler] = []

    def __init__(
        self,
        configuration: Optional[Configuration] = None,
        max_sync_workers: Optional[int] = 4,
        max_retries: Optional[int] = _MAX_RETRIES,
    ):
        """
        Initialize the Events module with configuration and worker settings.

        Configures event streaming parameters and validates essential environment setup.

        Args:
            configuration (Optional[Configuration]): SDK configuration with credentials and endpoints. Defaults to environment configuration.
            max_sync_workers (Optional[int]): Maximum number of synchronous worker threads. Defaults to 4.
            max_retries (Optional[int]): Maximum retry attempts for network calls. Defaults to 5.

        Raises:
            ModuleException: When required environment variables are missing or configuration is incorrect.
        """
        super().__init__(configuration)
        configure_git_credentials()

        self.is_xpander_cloud = getenv("IS_XPANDER_CLOUD", "false") == "true"
        self.agent_id = getenv("XPANDER_AGENT_ID", None)

        if not self.agent_id:
            raise ModuleException(
                400, "XPANDER_AGENT_ID is missing from your environment variables."
            )
        if not self.configuration.organization_id:
            raise ModuleException(
                400,
                "XPANDER_ORGANIZATION_ID is missing from your environment variables.",
            )
        if not self.configuration.api_key:
            raise ModuleException(
                400, "XPANDER_API_KEY is missing from your environment variables."
            )

        self.max_retries = max_retries

        # Internal resources
        self._pool: ThreadPoolExecutor = ThreadPoolExecutor(
            max_workers=max_sync_workers,
            thread_name_prefix="xpander-handler",
        )
        self._bg: Set[asyncio.Task] = set()
        self._root_worker: DeployedAsset | None = None

        logger.debug(
            f"Events initialised (base_url={self.configuration.base_url}, "
            f"org_id={self.configuration.organization_id}, retries={self.max_retries})"
        )

    # lifecycle
    async def start(
        self,
        on_execution_request: ExecutionRequestHandler,
    ) -> None:
        """
        Start the event listener and register handlers for task execution events.

        This method sets up signal handling for graceful shutdown, registers required
        workers, and begins listening to task execution requests over SSE.
        use on_task decorator and not the Events module directly.

        Args:
            on_execution_request (ExecutionRequestHandler): Callback handler
                for processing task execution requests. Can be synchronous or asynchronous.
        """
        # Execute boot handlers first, before any event listeners are set up
        await self._execute_boot_handlers()
        
        loop = asyncio.get_running_loop()
        for sig in (signal.SIGINT, signal.SIGTERM):
            loop.add_signal_handler(
                sig, lambda s=sig: asyncio.create_task(self.stop(s))
            )

        # Register root worker (blocks until first WorkerRegistration)
        self._root_worker = await self.register_parent_worker()

        # One SSE consumer per agent
        self.track(
            asyncio.create_task(
                self.register_agent_worker(self.agent_id, on_execution_request)
            )
        )

        logger.info("Listener started; waiting for events…")
        await asyncio.gather(*self._bg)

    async def stop(self, sig: signal.Signals | None = None) -> None:
        """
        Stop the event listener and cleanup background tasks.

        Args:
            sig (signal.Signals | None): Signal that triggered the stop request.

        Example:
            >>> await events.stop()
        """
        if sig:
            logger.info(f"Received {sig.name} – shutting down…")

        for t in self._bg:
            t.cancel()
        if self._bg:
            await asyncio.gather(*self._bg, return_exceptions=True)

        self._pool.shutdown(wait=False, cancel_futures=True)
        self._bg.clear()
        
        # Execute shutdown handlers after stopping event listeners but before final cleanup
        await self._execute_shutdown_handlers()
        
        logger.info("Listener stopped.")

    async def __aenter__(self) -> "Events":
        return self

    async def __aexit__(self, *_exc) -> bool:  # noqa: D401
        await self.stop()
        return False

    # ---------------------- HTTP helpers with retry ---------------------- #

    async def _request_with_retries(
        self,
        method: str,
        url: str,
        *,
        headers: dict[str, str],
        json: Any | None = None,
        timeout: float | None = 10.0,
    ) -> httpx.Response:
        """
        Perform an HTTP request with automatic retries on failure.

        Args:
            method (str): HTTP method to use for the request (e.g., 'POST', 'GET').
            url (str): The URL to which the request is sent.
            headers (dict[str, str]): HTTP headers to include in the request.
            json (Any | None, optional): JSON payload to send with the request.
            timeout (float | None, optional): Timeout for the request.

        Returns:
            httpx.Response: The response object received from the request.

        Raises:
            Exception: If the request fails after the maximum retry attempts.
        """
        last_exc: Exception | None = None
        for attempt in range(1, self.max_retries + 1):
            try:
                async with httpx.AsyncClient(timeout=timeout) as client:
                    response = await client.request(
                        method,
                        url,
                        headers=headers,
                        json=json,
                        follow_redirects=True,
                    )
                return response
            except Exception as exc:  # noqa: BLE001 broad (includes timeouts)
                last_exc = exc
                if attempt < self.max_retries:
                    delay = backoff_delay(attempt)
                    await asyncio.sleep(delay)
                else:
                    logger.error(
                        f"{method} {url} failed after {self.max_retries} attempts - exiting. ({exc})"
                    )
                    sys.exit(1)
        assert last_exc is not None
        raise last_exc  # for static checkers

    async def _release_worker(self, worker_id: str) -> None:
        """
        Release the worker resource after task execution completion.

        Args:
            worker_id (str): The unique identifier of the worker to release.
        """
        url = f"{get_events_base(configuration=self.configuration)}/{worker_id}"
        await self._request_with_retries(
            "POST",
            url,
            headers=get_events_headers(configuration=self.configuration),
            json=WorkerFinishedEvent(data={}).model_dump_safe(),
        )

    async def _make_heartbeat(self, worker_id: str) -> None:
        """
        Send a heartbeat signal to maintain the worker's active status.

        Args:
            worker_id (str): The unique identifier of the worker to update.
        """
        url = f"{get_events_base(configuration=self.configuration)}/{worker_id}"
        await self._request_with_retries(
            "POST",
            url,
            headers=get_events_headers(configuration=self.configuration),
            json=WorkerHeartbeat().model_dump_safe(),
        )


    # ----------------------- SSE helpers with retry ---------------------- #

    async def _sse_events_with_retries(self, url: str):
        """Yield Server-Sent Events with reconnect/back‑off logic using httpx‑sse."""
        attempt = 1
        while True:
            try:
                async with httpx.AsyncClient(
                    timeout=None, follow_redirects=True
                ) as client:
                    if not url.endswith('/'):
                        url += "/"
                    async with aconnect_sse(
                        client,
                        "GET",
                        url,
                        headers=get_events_headers(configuration=self.configuration),
                        follow_redirects=True
                    ) as event_source:
                        async for sse in event_source.aiter_sse():
                            yield sse

                # Server closed the stream gracefully – reconnect
                attempt = 1
                await asyncio.sleep(backoff_delay(1))

            except Exception as exc:  # noqa: BLE001 broad
                if attempt >= self.max_retries:
                    logger.error(
                        f"SSE connection to {url} failed after {self.max_retries} attempts – exiting. ({exc})"
                    )
                    sys.exit(1)
                await asyncio.sleep(backoff_delay(attempt))
                attempt += 1

    async def handle_task_execution_request(
        self,
        agent_worker: DeployedAsset,
        task: Task,
        on_execution_request: ExecutionRequestHandler,
    ) -> None:
        """
        Handle an incoming task execution request.

        Args:
            agent_worker (DeployedAsset): The deployed asset (agent) to handle the task.
            task (Task): The task object containing execution details.
            on_execution_request (ExecutionRequestHandler): The handler function to process the task.
        """
        error = None
        try:
            logger.info(f"Handling task {task.id}")
            await task.aset_status(status=AgentExecutionStatus.Executing)
            if asyncio.iscoroutinefunction(on_execution_request):
                task = await on_execution_request(task)
            else:
                task = await asyncio.get_running_loop().run_in_executor(
                    self._pool,
                    on_execution_request,
                    task,
                )
        except Exception as e:
            logger.exception(f"Execution handler failed - {str(e)}")
            error = str(e)
        finally:
            task_used_tokens = task.tokens
            task_used_tools = task.used_tools
            await self._release_worker(agent_worker.id)

            if error:
                task.result = error
                task.status = AgentExecutionStatus.Failed
            elif (
                task.status == AgentExecutionStatus.Executing
            ):  # let the handler set the status, if not set - mark as completed
                task.status = AgentExecutionStatus.Completed

            await task.asave()
            task.tokens = task_used_tokens
            task.used_tools = task_used_tools
            
            if task.tokens:
                await task.areport_metrics()

            logger.info(f"Finished handling task {task.id}")

            # local test task, finish? kill the worker
            if self.test_task:
                logger.info("Local task handled, exiting")
                sys.exit(0)

    async def register_agent_worker(
        self,
        agent_id: str,
        on_execution_request: ExecutionRequestHandler,
    ) -> None:
        """
        Register a worker agent and start listening for task events.

        Args:
            agent_id (str): The unique identifier of the agent to register.
            on_execution_request (ExecutionRequestHandler): The callback function to process task execution requests.
        """
        assert self._root_worker, "Root worker must be registered first"
        environment = "xpander" if self.is_xpander_cloud else "local"

        url = f"{get_events_base(configuration=self.configuration)}/{self._root_worker.id}/{agent_id}?environment={environment}"

        async for event in self._sse_events_with_retries(url):
            if event.event == EventType.EnvironmentConflict:
                conflict = WorkerEnvironmentConflict(**json.loads(event.data))
                logger.error(f"Conflict! - {conflict.error}")
                return
            if event.event == EventType.WorkerRegistration:
                self.worker = agent_worker = DeployedAsset(**json.loads(event.data))
                logger.info(f"Worker registered – id={agent_worker.id}")

                # convenience URLs
                agent_meta = agent_worker.metadata or {}
                if agent_meta:
                    is_stg = "stg." in get_events_base(
                        configuration=self.configuration
                    ) or "localhost" in get_events_base(
                        configuration=self.configuration
                    )
                    chat_url = (
                        f"https://{agent_meta.get('unique_name', agent_id)}.agents"
                    )
                    chat_url += ".stg" if is_stg else ""
                    chat_url += ".xpander.ai"

                    builder_url = (
                        "https://"
                        + ("stg." if is_stg else "")
                        + f"app.xpander.ai/agents/{agent_id}"
                    )
                    logger.info(
                        f"Agent '{agent_meta.get('name', agent_id)}' chat: {chat_url} | builder: {builder_url}"
                    )

                if self.test_task:
                    logger.info(f"Sending test task {self.test_task.model_dump_json()}")
                    created_task = await Tasks(configuration=self.configuration).acreate(
                        agent_id=self.agent_id,
                        prompt=self.test_task.input.text,
                        file_urls=self.test_task.input.files,
                        user_details=self.test_task.input.user,
                        agent_version=self.test_task.agent_version,
                        worker_id=self.worker.id,
                        output_format=self.test_task.output_format,
                        output_schema=self.test_task.output_schema,
                        run_locally=True
                    )
                    self.track(
                    asyncio.create_task(
                        self.handle_task_execution_request(
                            agent_worker, created_task, on_execution_request
                        )
                    )
                )

                self.track(asyncio.create_task(self.heartbeat_loop(agent_worker.id)))

            elif event.event == EventType.AgentExecution:
                task = Task(**json.loads(event.data), configuration=self.configuration)
                self.track(
                    asyncio.create_task(
                        self.handle_task_execution_request(
                            agent_worker, task, on_execution_request
                        )
                    )
                )

    async def register_parent_worker(self) -> DeployedAsset:
        """
        Register the parent worker asset and start receiving events.

        Returns:
            DeployedAsset: The deployed asset for the root worker after successful registration.

        Raises:
            RuntimeError: If registration fails due to absence of WorkerRegistration events.
        """
        url = get_events_base(configuration=self.configuration)

        async for event in self._sse_events_with_retries(url):
            if event.event == EventType.WorkerRegistration:
                return DeployedAsset(**json.loads(event.data))

        raise RuntimeError(
            "Failed to register root worker – no WorkerRegistration received"
        )

    # --------------------------------------------------------------------- #
    # Misc helpers                                                          #
    # --------------------------------------------------------------------- #

    def track(self, task: asyncio.Task) -> None:
        """
        Add a task to the background task set for auto-removal on completion.

        Args:
            task (asyncio.Task): The asynchronous task to track.
        """
        self._bg.add(task)
        task.add_done_callback(self._bg.discard)

    async def heartbeat_loop(self, worker_id: str) -> None:
        """
        Continuously send heartbeat signals to maintain worker's active status.

        Args:
            worker_id (str): The unique identifier of the worker.
        """
        while True:
            try:
                await self._make_heartbeat(worker_id)
            except Exception:
                # _request_with_retries handles fatal exit
                pass
            await asyncio.sleep(2)

    def register(
        self,
        on_task: ExecutionRequestHandler,
        test_task: Optional[LocalTaskTest] = None,
    ) -> None:
        """
        Register the event listener with optional test task in synchronous or asynchronous environments.

        Args:
            on_task (ExecutionRequestHandler): Callback handler for task execution.
            test_task (Optional[LocalTaskTest]): Optional local test task for diagnostics and testing.

        Example:
            >>> def handle_task(task):
            ...     # process task execution

            >>> events = Events()
            >>> events.register(on_task=handle_task)
        """
        try:
            self.test_task = test_task
            loop = asyncio.get_running_loop()
            if loop.is_running():
                loop.create_task(self.start(on_task))
            else:
                asyncio.run(self.start(on_task))
        except RuntimeError:
            # No running loop, safe to run
            asyncio.run(self.start(on_task))
    
    # --------------------------------------------------------------------- #
    # Boot and Shutdown Handler Management                                  #
    # --------------------------------------------------------------------- #
    
    @classmethod
    def register_boot_handler(cls, handler: BootHandler) -> None:
        """
        Register a boot handler to be executed before event listeners are set up.
        
        Args:
            handler (BootHandler): The boot handler function to register.
        """
        cls._boot_handlers.append(handler)
        logger.debug(f"Boot handler registered: {handler.__name__ if hasattr(handler, '__name__') else 'anonymous'}")
    
    @classmethod
    def register_shutdown_handler(cls, handler: ShutdownHandler) -> None:
        """
        Register a shutdown handler to be executed during application shutdown.
        
        Args:
            handler (ShutdownHandler): The shutdown handler function to register.
        """
        cls._shutdown_handlers.append(handler)
        logger.debug(f"Shutdown handler registered: {handler.__name__ if hasattr(handler, '__name__') else 'anonymous'}")
    
    @classmethod
    async def _execute_boot_handlers(cls) -> None:
        """
        Execute all registered boot handlers.
        
        Raises:
            Exception: If any boot handler fails, the application will not start.
        """
        if not cls._boot_handlers:
            return
            
        logger.info(f"Executing {len(cls._boot_handlers)} boot handler(s)...")
        
        for handler in cls._boot_handlers:
            try:
                if asyncio.iscoroutinefunction(handler):
                    await handler()
                else:
                    handler()
                logger.debug(f"Boot handler executed successfully: {handler.__name__ if hasattr(handler, '__name__') else 'anonymous'}")
            except Exception as e:
                logger.error(f"Boot handler failed: {handler.__name__ if hasattr(handler, '__name__') else 'anonymous'} - {e}")
                raise
                
        logger.info("All boot handlers executed successfully")
    
    @classmethod
    async def _execute_shutdown_handlers(cls) -> None:
        """
        Execute all registered shutdown handlers.
        
        Note: Exceptions in shutdown handlers are logged but do not prevent shutdown.
        """
        if not cls._shutdown_handlers:
            return
            
        logger.info(f"Executing {len(cls._shutdown_handlers)} shutdown handler(s)...")
        
        for handler in cls._shutdown_handlers:
            try:
                if asyncio.iscoroutinefunction(handler):
                    await handler()
                else:
                    handler()
                logger.debug(f"Shutdown handler executed successfully: {handler.__name__ if hasattr(handler, '__name__') else 'anonymous'}")
            except Exception as e:
                logger.error(f"Shutdown handler failed: {handler.__name__ if hasattr(handler, '__name__') else 'anonymous'} - {e}")
                # Continue with other shutdown handlers even if one fails
                
        logger.info("All shutdown handlers executed")
