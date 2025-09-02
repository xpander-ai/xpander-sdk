"""
Task Management Module for xpander.ai SDK.

This module provides the Task class which serves as the primary interface
for managing task execution within the xpander.ai platform. It handles
task lifecycle operations including loading, saving, status updates,
and termination.

The Task class integrates with the xpander.ai Backend-as-a-Service (BaaS)
platform to provide seamless task management capabilities with both
synchronous and asynchronous operations.

Typical usage example:
    >>> from xpander_sdk.modules.tasks.sub_modules.task import Task
    >>> from xpander_sdk.modules.tasks.models.task import AgentExecutionStatus

    >>> # Load an existing task
    >>> task = Task.load(task_id="task_123")

    >>> # Update task status
    >>> task.set_status(AgentExecutionStatus.Running)

    >>> # Save changes
    >>> task.save()

    >>> # Stop the task when needed
    >>> task.stop()
"""

from datetime import datetime
from typing import Any, AsyncGenerator, Dict, Generator, List, Optional, Type, TypeVar, Union
from httpx import HTTPStatusError
import httpx
import json
from httpx_sse import aconnect_sse

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.events import (
    TaskUpdateEventType,
    ToolCallRequest,
    ToolCallResult,
)
from xpander_sdk.models.shared import ExecutionTokens, OutputFormat, Tokens, XPanderSharedModel
from xpander_sdk.modules.events.utils.generic import get_events_base, get_events_headers
from xpander_sdk.modules.tasks.models.task import (
    AgentExecutionInput,
    AgentExecutionStatus,
    HumanInTheLoop,
    ExecutionMetricsReport,
    PendingECARequest,
    TaskReportRequest,
)
from xpander_sdk.utils.event_loop import run_sync

# Type variable for Task class methods
T = TypeVar("T", bound="Task")

TaskUpdateEventData = Union[T, ToolCallRequest, ToolCallResult]


class TaskUpdateEvent(XPanderSharedModel):
    type: TaskUpdateEventType
    task_id: str
    organization_id: str
    time: datetime
    data: TaskUpdateEventData


class Task(XPanderSharedModel):
    """
    Represents a task entity in the xpander.ai platform.

    This class manages task-related operations, including state updates,
    API interaction, status control, and lifecycle management.

    Attributes:
        configuration (Optional[Configuration]): The current configuration settings for the task.
        id (str): Unique identifier for the task.
        agent_id (str): Identifier for the associated agent.
        organization_id (str): Identifier for the organization.
        input (AgentExecutionInput): The input parameters for agent execution.
        status (Optional[AgentExecutionStatus]): Current status of the task.
        last_executed_node_id (Optional[str]): ID of the last executed node.
        agent_version (Optional[str]): Version of the agent.
        created_at (datetime): Timestamp when the task was created.
        started_at (Optional[datetime]): Timestamp when the task was started.
        paused_at (Optional[datetime]): Timestamp when the task was paused.
        finished_at (Optional[datetime]): Timestamp when the task was finished.
        result (Optional[str]): Result of the task execution.
        parent_execution (Optional[str]): Parent execution ID, if applicable.
        sub_executions (Optional[List[str]]): List of sub-execution IDs.
        is_manually_stopped (Optional[bool]): Flag indicating if the task was manually stopped.
        payload_extension (Optional[dict]): Additional data for the task.
        hitl_request (Optional[HumanInTheLoop]): Human-in-the-loop request state.
        pending_eca_request (Optional[PendingECARequest]): Pending ECA request, if any.
        source (Optional[str]): Source information of the task.
        output_format (Optional[OutputFormat]): Desired output format of the task.
        output_schema (Optional[Dict]): Schema for the task's output.
        events_streaming (Optional[bool]): Flag indicating if the task has events streaming.
        additional_context (Optional[str]): Additional context to be passed to the agent.
        expected_output (Optional[str]): Expected output of the execution.

    Example:
        >>> task = Task.load(task_id="task_123")
        >>> task.set_status(AgentExecutionStatus.Running)
        >>> task.save()
    """

    configuration: Optional[Configuration] = None
    id: str
    agent_id: str
    organization_id: str
    input: AgentExecutionInput
    status: Optional[AgentExecutionStatus] = AgentExecutionStatus.Pending
    last_executed_node_id: Optional[str] = None
    agent_version: Optional[str] = None
    created_at: datetime
    started_at: Optional[datetime] = None
    paused_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    result: Optional[str] = None
    parent_execution: Optional[str] = None
    sub_executions: Optional[List[str]] = []
    is_manually_stopped: Optional[bool] = False
    payload_extension: Optional[dict] = None
    hitl_request: Optional[HumanInTheLoop] = None
    pending_eca_request: Optional[PendingECARequest] = None
    source: Optional[str] = None
    output_format: Optional[OutputFormat] = None
    output_schema: Optional[Dict] = None
    events_streaming: Optional[bool] = False
    additional_context: Optional[str] = None
    expected_output: Optional[str] = None,
    
    # metrics
    tokens: Optional[Tokens] = None
    used_tools: Optional[List[str]] = []
    duration: Optional[float] = 0

    def model_post_init(self, context):
        """
        Post-initialization hook for the model.

        This method is called after the model is initialized. It sets the current
        task state and then calls the parent class's `model_post_init` method.

        Parameters:
            context (Any): Context object provided during model initialization.

        Returns:
            Any: The result from the superclass `model_post_init` method.

        Note:
            This method uses `self.configuration.state.task = self` to register the current task
            in the global state.

        Powered by xpander.ai
        """
        self.configuration.state.task = self
        return super().model_post_init(context)

    @classmethod
    async def aload(
        cls: Type[T], task_id: str, configuration: Optional[Configuration] = None
    ) -> T:
        """
        Asynchronously loads a task by its ID.

        Args:
            task_id (str): Unique identifier for the task to load.
            configuration (Optional[Configuration]): Configuration settings for API interaction.

        Returns:
            T: Instance of the Task class.

        Raises:
            ModuleException: Error related to HTTP requests or task fetching.

        Example:
            >>> task = await Task.aload(task_id="task_123")
        """
        try:
            client = APIClient(configuration=configuration)
            response_data = await client.make_request(
                path=APIRoute.GetTask.format(task_id=task_id)
            )
            task = cls.model_validate({**response_data, "configuration": configuration or Configuration()})
            return task
        except HTTPStatusError as e:
            raise ModuleException(
                status_code=e.response.status_code, description=e.response.text
            )
        except Exception as e:
            raise ModuleException(
                status_code=500, description=f"Failed to get tas - {str(e)}"
            )

    @classmethod
    def load(
        cls: Type[T], task_id: str, configuration: Optional[Configuration] = None
    ) -> T:
        """
        Loads a task by its ID synchronously.

        This function wraps the asynchronous aload method.

        Args:
            task_id (str): Unique identifier for the task to load.
            configuration (Optional[Configuration]): Configuration settings for API interaction.

        Returns:
            T: Instance of the Task class.

        Example:
            >>> task = Task.load(task_id="task_123")
        """
        return run_sync(cls.aload(task_id=task_id, configuration=configuration))

    async def aset_status(
        self, status: AgentExecutionStatus, result: Optional[str] = None
    ):
        """
        Asynchronously sets the task status and updates it in the backend.

        Args:
            status (AgentExecutionStatus): The new status to apply.
            result (str): The result to apply.

        Example:
            >>> await task.aset_status(AgentExecutionStatus.Running, "task started")
        """
        self.status = status
        self.result = result
        await self.asave()

    def set_status(self, status: AgentExecutionStatus, result: Optional[str] = None):
        """
        Sets the task status synchronously.

        This function wraps the asynchronous aset_status method.

        Args:
            status (AgentExecutionStatus): The new status to apply.
            result (str): The result to apply.

        Example:
            >>> task.set_status(AgentExecutionStatus.Running, "task started")
        """
        return run_sync(self.aset_status(status=status, result=result))

    async def asave(self):
        """
        Asynchronously saves the current task state to the backend.

        Raises:
            ModuleException: Error related to HTTP requests or task saving.

        Example:
            >>> await task.asave()
        """
        client = APIClient(configuration=self.configuration)
        try:
            response = await client.make_request(
                path=APIRoute.UpdateTask.format(task_id=self.id),
                method="PATCH",
                payload=self.model_dump_safe(),
            )
            updated_task = Task(**response, configuration=self.configuration)
            for field, value in updated_task.__dict__.items():
                setattr(self, field, value)
        except HTTPStatusError as e:
            raise ModuleException(e.response.status_code, e.response.text)
        except Exception as e:
            raise ModuleException(500, f"Failed to save task: {str(e)}")

    def save(self):
        """
        Saves the current task state synchronously.

        This function wraps the asynchronous asave method.

        Example:
            >>> task.save()
        """
        return run_sync(self.asave())

    async def astop(self):
        """
        Asynchronously stops the task.

        Communicates with the backend to terminate the task execution.

        Raises:
            ModuleException: Error related to HTTP requests or task stopping.

        Example:
            >>> await task.astop()
        """
        client = APIClient(configuration=self.configuration)
        try:
            response = await client.make_request(
                path=APIRoute.TaskCrud.format(agent_or_task_id=self.id), method="DELETE"
            )
            updated_task = Task(**response, configuration=self.configuration)
            for field, value in updated_task.__dict__.items():
                setattr(self, field, value)
        except HTTPStatusError as e:
            raise ModuleException(e.response.status_code, e.response.text)
        except Exception as e:
            raise ModuleException(500, f"Failed to stop task: {str(e)}")

    def stop(self):
        """
        Stops the task synchronously.

        This function wraps the asynchronous astop method.

        Example:
            >>> task.stop()
        """
        return run_sync(self.astop())

    def to_message(self) -> str:
        """
        Converts the input data into a formatted message string.

        This method constructs a message from text and file inputs.
        If text exists, it is included first. If files are present,
        they are appended as a comma-separated list under "Files:".

        Returns:
            str: A formatted message string including text and/or file names.

        Powered by xpander.ai
        """
        message = ""
        if self.input.text:
            message = self.input.text

        if self.input.files and len(self.input.files) != 0:
            if len(message) != 0:
                message += "\n"
            message += "Files: " + (", ".join(self.input.files))

        return message

    async def aevents(self) -> AsyncGenerator[TaskUpdateEvent, None]:
        """
        Asynchronously streams task events.

        This method connects to the xpander.ai event stream using Server-Sent Events (SSE)
        and yields each `TaskUpdateEvent` related to the current task as they arrive.

        Requires that the task was created or loaded with `events_streaming=True`.

        Yields:
            TaskUpdateEvent: A parsed event containing real-time updates about the task.

        Raises:
            ValueError: If the task is not configured for event streaming.

        Example:
            >>> async for event in task.aevents():
            >>>     print(event)
        """
        if not self.events_streaming:
            raise ValueError(f"Task {self.id} does not set with events streaming")

        headers = get_events_headers(configuration=self.configuration)
        url = get_events_base(configuration=self.configuration).replace(
            "/events", f"/agent-execution/{self.id}/events"
        )

        async with httpx.AsyncClient(timeout=None, headers=headers) as client:
            async with aconnect_sse(client, method="GET", url=url) as sse:
                async for event in sse.aiter_sse():
                    # parse task and add configuration
                    if event.data:
                        try:
                            json_event_data: dict = json.loads(event.data)
                            if json_event_data.get("type", None).startswith("task"):
                                task_data = json_event_data.get("data")
                                json_event_data.pop("data") # delete data
                                yield TaskUpdateEvent(
                                    **json_event_data,
                                    data=Task(**task_data,configuration=self.configuration)
                                )
                                continue
                        except Exception:
                            pass
                    yield TaskUpdateEvent.model_validate_json(event.data)

    def events(self) -> Generator[TaskUpdateEvent, None, None]:
        """
        Synchronously streams task events.

        This method wraps the asynchronous `aevents` generator and yields events in a
        blocking manner for use in synchronous environments.

        Requires that the task was created or loaded with `events_streaming=True`.

        Yields:
            TaskUpdateEvent: A parsed event containing real-time updates about the task.

        Raises:
            ValueError: If the task is not configured for event streaming.

        Example:
            >>> for event in task.events():
            >>>     print(event)
        """

        async def _consume():
            async for event in self.aevents():
                yield event

        queue = []

        async def _run():
            async for item in _consume():
                queue.append(item)

        run_sync(_run())

        while queue:
            yield queue.pop(0)
    
    async def areport_metrics(
        self,
        configuration: Optional[Configuration] = None
    ):
        """
        Asynchronously report LLM task metrics to xpander.ai.

        Args:
            configuration (Optional[Configuration], optional): 
                API client configuration. If not provided, a new instance is created. Defaults to None.

        Raises:
            ModuleException: If the request fails due to an HTTP or unexpected error.

        Returns:
            None
        """
        try:
            configuration = configuration or Configuration()
            client = APIClient(configuration=configuration)
            
            if not self.tokens:
                raise ValueError("tokens must be provided. task.tokens = Tokens()")
            
            task_report_request = ExecutionMetricsReport(
                execution_id=self.id,
                source=self.source,
                memory_thread_id=self.id,
                task=self.input.text or "",
                status=self.status.value,
                duration=0.0,
                ai_model="xpander",
                api_calls_made=self.used_tools,
                result=self.result or None,
                llm_tokens=ExecutionTokens(worker=self.tokens)
            )

            await client.make_request(
                path=APIRoute.ReportExecutionMetrics.format(
                    agent_id=self.agent_id
                ),
                method="POST",
                payload=task_report_request.model_dump_safe(),
            )

        except HTTPStatusError as e:
            raise ModuleException(
                status_code=e.response.status_code,
                description=e.response.text
            )
        except Exception as e:
            raise ModuleException(
                status_code=500,
                description=f"Failed to report metrics - {str(e)}"
            )


    def report_metrics(
        self,
        configuration: Optional[Configuration] = None
    ):
        """
        Report LLM task metrics to xpander.ai.

        Args:
            configuration (Optional[Configuration], optional): 
                API client configuration. If not provided, a new instance is created. Defaults to None.

        Raises:
            ModuleException: If the request fails due to an HTTP or unexpected error.

        Returns:
            None
        """
        return run_sync(
            self.areport_metrics(
                configuration=configuration
            )
        )
    
    @classmethod
    async def areport_external_task(
        cls: Type[T], 
        configuration: Optional[Configuration] = None,
        agent_id: Optional[str] = None,
        id: Optional[str] = None,
        input: Optional[str] = None,
        llm_response: Optional[Any] = None,
        tokens: Optional[Tokens] = None,
        is_success: Optional[bool] = True,
        result: Optional[str] = None,
        duration: Optional[float] = 0,
        used_tools: Optional[List[str]] = []
    ) -> T:
        """
        Asynchronously reports an external task to the xpander.ai backend.

        This method is used to report the result of a task that was executed
        externally (outside the xpander.ai platform). It submits execution details,
        including inputs, outputs, success status, and resource usage, to the backend.
        
        Args:
            configuration (Optional[Configuration]): Optional configuration for API calls.
            agent_id (Optional[str]): Identifier of the agent associated with the task.
            id (Optional[str]): Task identifier (external or internal).
            input (Optional[str]): The input parameters or data used in execution.
            llm_response (Optional[Any]): The raw LLM response or relevant output object.
            tokens (Optional[Tokens]): Tokens used in the execution.
            is_success (Optional[bool]): Whether the task execution was successful. Defaults to True.
            result (Optional[str]): String representation of the final result.
            duration (Optional[float]): Task execution duration, in seconds. Defaults to 0.
            used_tools (Optional[List[str]]): List of tools used during the execution. Defaults to empty list.
        
        Returns:
            T: Instance of the Task class, representing the reported task.
        
        Raises:
            ModuleException: Raised on backend or network errors.
        
        Example:
            >>> task = await Task.areport_external_task(
            ...     agent_id="agent_xyz",
            ...     id="external_task_123",
            ...     input="User message",
            ...     result="Done"
            ... )
        """
        try:
            configuration = configuration or Configuration()
            client = APIClient(configuration=configuration)
            task_report_request = TaskReportRequest(
                id=id,
                input=input,
                llm_response=llm_response,
                tokens=tokens,
                is_success=is_success,
                result=result,
                duration=duration,
                used_tools=used_tools
            )
            response_data = await client.make_request(
                path=APIRoute.ReportExternalTask.format(agent_id=agent_id),
                method="POST",
                payload=task_report_request.model_dump_safe(),
            )
            return cls.model_validate({**response_data, "configuration": configuration})
        except HTTPStatusError as e:
            raise ModuleException(
                status_code=e.response.status_code, description=e.response.text
            )
        except Exception as e:
            raise ModuleException(
                status_code=500, description=f"Failed to report external task - {str(e)}"
            )

    @classmethod
    def report_external_task(
        cls: Type[T], 
        configuration: Optional[Configuration] = None,
        agent_id: Optional[str] = None,
        id: Optional[str] = None,
        input: Optional[str] = None,
        llm_response: Optional[Any] = None,
        tokens: Optional[Tokens] = None,
        is_success: Optional[bool] = True,
        result: Optional[str] = None,
        duration: Optional[float] = 0,
        used_tools: Optional[List[str]] = []
    ) -> T:
        """
        Synchronously reports an external task to the xpander.ai backend.

        This function wraps the asynchronous `areport_external_task` method for
        synchronous usage. It submits execution details, including inputs, outputs,
        success status, and resource usage, to the backend.

        Args:
            configuration (Optional[Configuration]): Optional configuration for API calls.
            agent_id (Optional[str]): Identifier of the agent associated with the task.
            id (Optional[str]): Task identifier (external or internal).
            input (Optional[str]): The input parameters or data used in execution.
            llm_response (Optional[Any]): The raw LLM response or relevant output object.
            tokens (Optional[Tokens]): Tokens used in the execution.
            is_success (Optional[bool]): Whether the task execution was successful. Defaults to True.
            result (Optional[str]): String representation of the final result.
            duration (Optional[float]): Task execution duration, in seconds. Defaults to 0.
            used_tools (Optional[List[str]]): List of tools used during the execution. Defaults to empty list.

        Returns:
            T: Instance of the Task class, representing the reported task.

        Example:
            >>> task = Task.report_external_task(
            ...     agent_id="agent_xyz",
            ...     id="external_task_123",
            ...     input="User message",
            ...     result="Done"
            ... )
        """
        return run_sync(
            cls.areport_external_task(
                configuration=configuration,
                agent_id=agent_id,
                id=id,
                input=input,
                llm_response=llm_response,
                tokens=tokens,
                is_success=is_success,
                result=result,
                duration=duration,
                used_tools=used_tools,
            )
        )