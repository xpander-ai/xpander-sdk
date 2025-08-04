"""
Tasks module for managing tasks in the xpander.ai platform.

This module provides functionality to create, list, retrieve, update,
and stop tasks within the xpander.ai Backend-as-a-Service platform.
"""

from typing import Dict, List, Optional

from httpx import HTTPStatusError

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.shared import OutputFormat
from xpander_sdk.models.user import User
from xpander_sdk.modules.tasks.models.task import (
    AgentExecutionInput,
    AgentExecutionStatus,
)
from xpander_sdk.modules.tasks.models.tasks_list import TasksListItem
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.utils.event_loop import run_sync


class Tasks(ModuleBase):
    """
    Main module for managing tasks in xpander.ai.

    This class provides methods for creating, listing, retrieving, updating,
    and stopping tasks related to AI agents within xpander.ai. It offers both
    asynchronous and synchronous versions for flexibility in different runtime
    environments.

    The module uses the singleton pattern inherited from ModuleBase to ensure
    consistent configuration across all task operations.

    Example:
        >>> tasks = Tasks()
        >>> task_list = tasks.list(agent_id="agent123")
        >>> specific_task = tasks.get(task_id="task456")
    """

    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the Tasks module.

        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will use default configuration from environment variables.
        """
        super().__init__(configuration)

    async def alist(self, agent_id: str) -> List[TasksListItem]:
        """
        Asynchronously list all tasks for a specific agent.

        Retrieves a list of all tasks associated with a given agent, providing
        basic information for display and selection purposes.

        Args:
            agent_id (str): The unique identifier of the agent whose tasks should be listed.

        Returns:
            List[TasksListItem]: List of task summary objects related to the agent.

        Raises:
            ModuleException: If the API request fails or returns an error.

        Example:
            >>> tasks = Tasks()
            >>> task_list = await tasks.alist(agent_id="agent123")
            >>> for task in task_list:
            ...     print(f"Task: {task.id} - Status: {task.status}")
        """
        try:
            client = APIClient(configuration=self.configuration)
            tasks = await client.make_request(
                path=APIRoute.ListTasks.format(agent_id=agent_id)
            )
            return [TasksListItem(**task) for task in tasks]
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to list tasks - {str(e)}")

    def list(self, agent_id: str) -> List[TasksListItem]:
        """
        Synchronously list all tasks for a specific agent.

        This is the synchronous version of alist(). It internally calls the
        asynchronous method and waits for completion.

        Args:
            agent_id (str): The unique identifier of the agent whose tasks should be listed.

        Returns:
            List[TasksListItem]: List of task summary objects related to the agent.

        Raises:
            ModuleException: If the API request fails or returns an error.

        Example:
            >>> tasks = Tasks()
            >>> task_list = tasks.list(agent_id="agent123")
            >>> print(f"Found {len(task_list)} tasks")
        """
        return run_sync(self.alist(agent_id=agent_id))

    async def aget(self, task_id: str) -> Task:
        """
        Asynchronously retrieve a specific task by its unique ID.

        Loads and returns a full Task object with complete configuration and
        execution details based on the task's unique identifier.

        Args:
            task_id (str): Unique identifier of the task to retrieve.

        Returns:
            Task: Complete task object with all associated metadata.

        Raises:
            ModuleException: If the task is not found or access is denied.

        Example:
            >>> tasks = Tasks()
            >>> task = await tasks.aget(task_id="task456")
            >>> print(f"Loaded task: {task.name}")
        """
        return await Task.aload(task_id=task_id, configuration=self.configuration)

    def get(self, task_id: str) -> Task:
        """
        Synchronously retrieve a specific task by its unique ID.

        This is the synchronous version of aget(). It internally calls the
        asynchronous method and waits for completion.

        Args:
            task_id (str): Unique identifier of the task to retrieve.

        Returns:
            Task: Complete task object with all associated metadata.

        Raises:
            ModuleException: If the task is not found or access is denied.

        Example:
            >>> tasks = Tasks()
            >>> task = tasks.get(task_id="task456")
            >>> result = task.execute(parameters={"param": "value"})
        """
        return run_sync(self.aget(task_id=task_id))

    async def acreate(
        self,
        agent_id: str,
        existing_task_id: Optional[str] = None,
        prompt: Optional[str] = "",
        file_urls: Optional[List[str]] = [],
        user_details: Optional[User] = None,
        agent_version: Optional[str] = None,
        tool_call_payload_extension: Optional[dict] = None,
        source: Optional[str] = None,
        worker_id: Optional[str] = None,
        run_locally: Optional[bool] = False,
        output_format: Optional[OutputFormat] = None,
        output_schema: Optional[Dict] = None,
        events_streaming: Optional[bool] = False,
        additional_context: Optional[str] = None,
        expected_output: Optional[str] = None,
    ) -> Task:
        """
        Asynchronously create a new task for a specific agent.

        Initiates a new task using the xpander.ai platform, linking it to the specified
        agent and using provided input and configuration parameters.

        Args:
            agent_id (str): The unique identifier of the agent responsible for executing the task.
            existing_task_id (Optional[str]): Existing task id if exists.
            prompt (Optional[str]): Textual input for task initiation.
            file_urls (Optional[List[str]]): List URLs pointing to task-related files.
            user_details (Optional[User]): User information to pass with the task.
            agent_version (Optional[str]): Specific agent version to target.
            tool_call_payload_extension (Optional[dict]): Extension details for tool call payload.
            source (Optional[str]): Information about the task's origin.
            worker_id (Optional[str]): Identifier for the worker handling the task.
            run_locally (Optional[bool]): Whether to execute the task locally.
            output_format (Optional[OutputFormat]): Format of the task output.
            output_schema (Optional[Dict]): Schema defining the expected output structure.
            events_streaming (Optional[bool]): Flag idicating for events are required for this task.
            additional_context (Optional[str]): Additional context to be passed to the agent.
            expected_output (Optional[str]): Expected output of the execution.

        Returns:
            Task: Newly created task object containing all initial configuration data.

        Raises:
            ModuleException: If task creation fails due to API problems or configuration errors.

        Example:
            >>> tasks = Tasks()
            >>> new_task = await tasks.acreate(
            ...     agent_id="agent123",
            ...     prompt="Analyze the provided dataset",
            ...     file_urls=["https://data.source/file.csv"]
            ... )
            >>> print(f"Created task: {new_task.id}")
        """
        try:
            headers = {}
            if agent_version:
                headers['x-agent-version'] = str(agent_version)
            
            client = APIClient(configuration=self.configuration)
            created_task = await client.make_request(
                path=APIRoute.TaskCrud.format(agent_or_task_id=agent_id),
                method="POST",
                headers=headers,
                payload={
                    "id": existing_task_id,
                    "input": AgentExecutionInput(
                        text=prompt, files=file_urls, user=user_details
                    ).model_dump(),
                    "payload_extension": tool_call_payload_extension,
                    "source": source,
                    "worker_id": worker_id,
                    "output_format": output_format,
                    "output_schema": output_schema,
                    "run_locally": run_locally,
                    "events_streaming": events_streaming,
                    "additional_context": additional_context,
                    "expected_output": expected_output
                },
            )
            return Task(**created_task, configuration=self.configuration)
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to create task - {str(e)}")

    def create(self, *args, **kwargs) -> Task:
        """
        Synchronously create a new task for a specific agent.

        This is the synchronous version of acreate(). It internally calls the
        asynchronous method and waits for completion.

        Args:
            *args, **kwargs: Arguments and keyword arguments matching those of acreate().

        Returns:
            Task: Newly created task object containing all initial configuration data.

        Raises:
            ModuleException: If task creation fails due to API problems or configuration errors.

        Example:
            >>> tasks = Tasks()
            >>> new_task = tasks.create(
            ...     agent_id="agent123",
            ...     prompt="Analyze the provided dataset",
            ...     file_urls=["https://data.source/file.csv"]
            ... )
            >>> print(f"Created task: {new_task.id}")
        """
        return run_sync(self.acreate(*args, **kwargs))

    async def aupdate(
        self,
        task_id: str,
        tool_call_payload_extension: Optional[dict] = None,
        source: Optional[str] = None,
        status: Optional[AgentExecutionStatus] = None,
        last_executed_node_id: Optional[str] = None,
        result: Optional[str] = None,
    ) -> Task:
        """
        Asynchronously update an existing task by its unique ID.

        Modifies task attributes, statuses, or results on the xpander.ai platform.

        Args:
            task_id (str): Unique identifier of the task to update.
            tool_call_payload_extension (Optional[dict]): Details to extend the payload.
            source (Optional[str]): Information about the task's origin.
            status (Optional[AgentExecutionStatus]): New status for the task.
            last_executed_node_id (Optional[str]): Identifier of the last executed node.
            result (Optional[str]): Result data or message to associate with the task.

        Returns:
            Task: Updated task object reflecting the changes made.

        Raises:
            ModuleException: If task update fails due to API problems or configuration errors.

        Example:
            >>> tasks = Tasks()
            >>> updated_task = await tasks.aupdate(
            ...     task_id="task456",
            ...     status=AgentExecutionStatus.COMPLETED,
            ...     result="Task successfully executed"
            ... )
            >>> print(f"Updated task: {updated_task.id} - {updated_task.status}")
        """
        client = APIClient(configuration=self.configuration)

        payload: dict = {
            "tool_call_payload_extension": tool_call_payload_extension,
            "source": source,
            "status": status.value if status else None,
            "last_executed_node_id": last_executed_node_id,
            "result": result,
        }
        payload = {k: v for k, v in payload.items() if v is not None}

        try:
            response = await client.make_request(
                path=APIRoute.UpdateTask.format(task_id=task_id),
                method="PATCH",
                payload=payload,
            )
            return Task(**response, configuration=self.configuration)
        except HTTPStatusError as e:
            raise ModuleException(e.response.status_code, e.response.text)
        except Exception as e:
            raise ModuleException(500, f"Failed to update task: {str(e)}")

    def update(self, *args, **kwargs) -> Task:
        """
        Synchronously update an existing task by its unique ID.

        This is the synchronous version of aupdate(). It internally calls the
        asynchronous method and waits for completion.

        Args:
            *args, **kwargs: Arguments and keyword arguments matching those of aupdate().

        Returns:
            Task: Updated task object reflecting the changes made.

        Raises:
            ModuleException: If task update fails due to API problems or configuration errors.

        Example:
            >>> tasks = Tasks()
            >>> updated_task = tasks.update(
            ...     task_id="task456",
            ...     status=AgentExecutionStatus.COMPLETED,
            ...     result="Task successfully executed"
            ... )
            >>> print(f"Updated task: {updated_task.id} - {updated_task.status}")
        """
        return run_sync(self.aupdate(*args, **kwargs))

    async def astop(self, task_id: str) -> Task:
        """
        Asynchronously stop a specific task by its unique ID.

        Terminates the running task on the xpander.ai platform gracefully
        by using its unique identifier.

        Args:
            task_id (str): Unique identifier of the task to stop.

        Returns:
            Task: Task object reflecting the task's stopped state.

        Raises:
            ModuleException: If task stopping fails due to API problems or configuration errors.

        Example:
            >>> tasks = Tasks()
            >>> stopped_task = await tasks.astop(task_id="task456")
            >>> print(f"Stopped task: {stopped_task.id}")
        """
        try:
            client = APIClient(configuration=self.configuration)
            created_task = await client.make_request(
                path=APIRoute.TaskCrud.format(agent_or_task_id=task_id),
                method="DELETE",
            )
            return Task(**created_task, configuration=self.configuration)
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to stop task - {str(e)}")

    def stop(self, task_id: str) -> Task:
        """
        Synchronously stop a specific task by its unique ID.

        This is the synchronous version of astop(). It internally calls the
        asynchronous method and waits for completion.

        Args:
            task_id (str): Unique identifier of the task to stop.

        Returns:
            Task: Task object reflecting the task's stopped state.

        Raises:
            ModuleException: If task stopping fails due to API problems or configuration errors.

        Example:
            >>> tasks = Tasks()
            >>> stopped_task = tasks.stop(task_id="task456")
            >>> print(f"Stopped task: {stopped_task.id}")
        """
        return run_sync(self.astop(task_id=task_id))
