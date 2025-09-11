import json
from os import getenv
from typing import Any, Callable, Dict, List, Optional, Union

from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.shared import OutputFormat, Tokens
from xpander_sdk.models.user import User
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.backend.frameworks.dispatch import dispatch_get_args
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tasks.tasks_module import Tasks
from xpander_sdk.utils.event_loop import run_sync


class Backend(ModuleBase):
    """
    Backend module for agent runtime management and task execution.

    This module provides comprehensive functionality for interacting with agents
    in the xpander.ai platform, including:
    - Direct agent invocation with task creation
    - Runtime argument resolution for agent execution
    - External task result reporting
    - Support for multiple execution frameworks

    The module follows the singleton pattern inherited from ModuleBase,
    ensuring consistent configuration across all backend operations.
    Provides both asynchronous and synchronous APIs for flexibility.

    Example:
        >>> backend = Backend()
        >>> # Direct agent invocation
        >>> task = backend.invoke_agent(agent_id="agent-123", prompt="Hello world")
        >>> # Runtime argument resolution
        >>> args = backend.get_args(agent_id="agent-123")
        >>> # External task reporting
        >>> reported_task = backend.report_external_task(agent_id="agent-123", result="Success")
    """

    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the Backend module.

        Args:
            configuration (Optional[Configuration]): Optional SDK configuration.
        """
        super().__init__(configuration)

    async def ainvoke_agent(
        self,
        agent_id: Optional[str] = None,
        prompt: Optional[str] = "",
        existing_task_id: Optional[str] = None,
        file_urls: Optional[List[str]] = None,
        user_details: Optional[User] = None,
        agent_version: Optional[str] = None,
        tool_call_payload_extension: Optional[dict] = None,
        source: Optional[str] = "sdk",
        worker_id: Optional[str] = None,
        run_locally: Optional[bool] = False,
        output_format: Optional[OutputFormat] = None,
        output_schema: Optional[Dict] = None,
        events_streaming: Optional[bool] = False,
        additional_context: Optional[str] = None,
        expected_output: Optional[str] = None,
    ) -> Task:
        """
        Asynchronously invoke an agent to create and execute a task.

        This method directly invokes an agent by creating a new task with the specified
        parameters. It supports comprehensive task configuration including file uploads,
        user context, output formatting, and execution preferences.

        Args:
            agent_id (Optional[str]): Unique identifier of the agent to invoke. 
                If not provided, will attempt to use XPANDER_AGENT_ID environment variable.
            prompt (Optional[str]): The input prompt or message for the agent. Defaults to empty string.
            existing_task_id (Optional[str]): ID of an existing task to continue or reference.
            file_urls (Optional[List[str]]): List of file URLs to provide as context to the agent.
            user_details (Optional[User]): User information and context for personalized responses.
            agent_version (Optional[str]): Specific version of the agent to invoke. 
                If not provided, uses the latest version.
            tool_call_payload_extension (Optional[dict]): Additional parameters for tool calls.
            source (Optional[str]): Source identifier for task tracking. Defaults to "sdk".
            worker_id (Optional[str]): Specific worker ID for task execution.
            run_locally (Optional[bool]): Whether to execute the task locally. Defaults to False.
            output_format (Optional[OutputFormat]): Desired output format (e.g., JSON, XML, etc.).
            output_schema (Optional[Dict]): Schema definition for structured output validation.
            events_streaming (Optional[bool]): Enable real-time event streaming. Defaults to False.
            additional_context (Optional[str]): Additional context or instructions for the agent.
            expected_output (Optional[str]): Description of expected output format or content.

        Returns:
            Task: The created and potentially executed task object containing results,
                metadata, and execution status.

        Raises:
            ValueError: If agent_id is not provided and XPANDER_AGENT_ID environment
                variable is not set.
            ModuleException: If agent invocation fails due to API errors or invalid parameters.

        Example:
            >>> backend = Backend()
            >>> task = await backend.ainvoke_agent(
            ...     agent_id="agent-123",
            ...     prompt="Analyze this data and provide insights",
            ...     file_urls=["https://example.com/data.csv"],
            ...     output_format=OutputFormat.JSON
            ... )
            >>> print(f"Task completed: {task.result}")
        """
        if not agent_id:
            agent_id = getenv("XPANDER_AGENT_ID", None)

        # try to parse prompt if its json and extract task id if sent
        try:
            parsed_prompt = json.loads(prompt)
            if parsed_prompt and "xpander_task_id" in parsed_prompt:
                return await Tasks(configuration=self.configuration).aget(task_id=parsed_prompt["xpander_task_id"])
        except:
            pass
        
        return await (await Agents(configuration=self.configuration).aget(agent_id=agent_id)).acreate_task(
            prompt=prompt,
            existing_task_id=existing_task_id,
            file_urls=file_urls,
            user_details=user_details,
            agent_version=agent_version,
            tool_call_payload_extension=tool_call_payload_extension,
            source=source,
            worker_id=worker_id,
            run_locally=run_locally,
            output_format=output_format,
            output_schema=output_schema,
            events_streaming=events_streaming,
            additional_context=additional_context,
            expected_output=expected_output,
        )
    
    def invoke_agent(
        self,
        agent_id: Optional[str] = None,
        prompt: Optional[str] = "",
        existing_task_id: Optional[str] = None,
        file_urls: Optional[List[str]] = None,
        user_details: Optional[User] = None,
        agent_version: Optional[str] = None,
        tool_call_payload_extension: Optional[dict] = None,
        source: Optional[str] = "sdk",
        worker_id: Optional[str] = None,
        run_locally: Optional[bool] = False,
        output_format: Optional[OutputFormat] = None,
        output_schema: Optional[Dict] = None,
        events_streaming: Optional[bool] = False,
        additional_context: Optional[str] = None,
        expected_output: Optional[str] = None,
    ) -> Task:
        """
        Synchronously invoke an agent to create and execute a task.

        This is the blocking version of `ainvoke_agent()`. It provides a direct,
        synchronous interface for agent invocation when asynchronous execution
        is not required or not available.

        Args:
            agent_id (Optional[str]): Unique identifier of the agent to invoke. 
                If not provided, will attempt to use XPANDER_AGENT_ID environment variable.
            prompt (Optional[str]): The input prompt or message for the agent. Defaults to empty string.
            existing_task_id (Optional[str]): ID of an existing task to continue or reference.
            file_urls (Optional[List[str]]): List of file URLs to provide as context to the agent.
            user_details (Optional[User]): User information and context for personalized responses.
            agent_version (Optional[str]): Specific version of the agent to invoke. 
                If not provided, uses the latest version.
            tool_call_payload_extension (Optional[dict]): Additional parameters for tool calls.
            source (Optional[str]): Source identifier for task tracking. Defaults to "sdk".
            worker_id (Optional[str]): Specific worker ID for task execution.
            run_locally (Optional[bool]): Whether to execute the task locally. Defaults to False.
            output_format (Optional[OutputFormat]): Desired output format (e.g., JSON, XML, etc.).
            output_schema (Optional[Dict]): Schema definition for structured output validation.
            events_streaming (Optional[bool]): Enable real-time event streaming. Defaults to False.
            additional_context (Optional[str]): Additional context or instructions for the agent.
            expected_output (Optional[str]): Description of expected output format or content.

        Returns:
            Task: The created and executed task object containing results,
                metadata, and execution status.

        Raises:
            ValueError: If agent_id is not provided and XPANDER_AGENT_ID environment
                variable is not set.
            ModuleException: If agent invocation fails due to API errors or invalid parameters.

        Example:
            >>> backend = Backend()
            >>> task = backend.invoke_agent(
            ...     agent_id="agent-123",
            ...     prompt="Generate a summary of recent sales data",
            ...     file_urls=["https://example.com/sales.xlsx"],
            ...     output_format=OutputFormat.JSON,
            ...     additional_context="Focus on Q4 2023 trends"
            ... )
            >>> print(f"Task result: {task.result}")
            >>> print(f"Task status: {task.status}")
        """
        return run_sync(self.ainvoke_agent(
            agent_id=agent_id,
            prompt=prompt,
            existing_task_id=existing_task_id,
            file_urls=file_urls,
            user_details=user_details,
            agent_version=agent_version,
            tool_call_payload_extension=tool_call_payload_extension,
            source=source,
            worker_id=worker_id,
            run_locally=run_locally,
            output_format=output_format,
            output_schema=output_schema,
            events_streaming=events_streaming,
            additional_context=additional_context,
            expected_output=expected_output,
        ))
    
    async def aget_args(
        self,
        agent_id: Optional[str] = None,
        agent: Optional[Agent] = None,
        agent_version: Optional[int] = None,
        task: Optional[Task] = None,
        override: Optional[Dict[str, Any]] = None,
        tools: Optional[List[Callable]] = None,
    ) -> Dict[str, Any]:
        """
        Asynchronously resolve runtime arguments for the specified agent.

        Args:
            agent_id (Optional[str]): ID of the agent. Required if 'agent' is not provided.
            agent (Optional[Agent]): Preloaded Agent instance. Takes precedence over 'agent_id'.
            agent_version (Optional[int]): Optional version to resolve.
            task (Optional[Task]): Optional Task object providing runtime input/output context.
            override (Optional[Dict[str, Any]]): Optional overrides for final arguments.
            tools (Optional[List[Callable]]): Optional additional tools to be added to the agent arguments.

        Returns:
            Dict[str, Any]: Resolved argument dictionary to use with the agent.

        Raises:
            ValueError: If neither 'agent' nor 'agent_id' is provided.
        """
        # Attempt to take agent_id from environment if not provided
        if not agent and not agent_id:
            agent_id = getenv("XPANDER_AGENT_ID", None)

        if agent:
            xpander_agent = agent
        elif agent_id:
            xpander_agent = await Agents(configuration=self.configuration).aget(
                agent_id=agent_id,
                version=agent_version
            )
        else:
            raise ValueError(
                "Missing agent context: either 'agent' or 'agent_id' must be provided explicitly "
                "or set via the 'XPANDER_AGENT_ID' environment variable."
            )

        return await dispatch_get_args(agent=xpander_agent, task=task, override=override, tools=tools)

    def get_args(
        self,
        agent_id: Optional[str] = None,
        agent: Optional[Agent] = None,
        agent_version: Optional[int] = None,
        task: Optional[Task] = None,
        override: Optional[Dict[str, Any]] = None,
        tools: Optional[List[Callable]] = None,
    ) -> Dict[str, Any]:
        """
        Synchronously resolve runtime arguments for the specified agent.

        This is the blocking version of `aget_args()`. It will block the event loop
        until the arguments are resolved.

        Args:
            agent_id (Optional[str]): ID of the agent. Required if 'agent' is not provided.
            agent (Optional[Agent]): Preloaded Agent instance. Takes precedence over 'agent_id'.
            agent_version (Optional[int]): Optional version to resolve.
            task (Optional[Task]): Optional Task object providing runtime input/output context.
            override (Optional[Dict[str, Any]]): Optional overrides for final arguments.
            tools (Optional[List[Callable]]): Optional additional tools to be added to the agent arguments.

        Returns:
            Dict[str, Any]: Resolved argument dictionary to use with the agent.

        Raises:
            ValueError: If neither 'agent_id' nor 'agent' is provided.
        """
        return run_sync(
            self.aget_args(
                agent_id=agent_id,
                agent=agent,
                agent_version=agent_version,
                task=task,
                override=override,
                tools=tools
            )
        )
    
    async def areport_external_task(
        self,
        agent_id: Optional[str] = None,
        agent: Optional[Agent] = None,
        id: Optional[str] = None,
        input: Optional[str] = None,
        llm_response: Optional[Any] = None,
        tokens: Optional[Tokens] = None,
        is_success: Optional[bool] = True,
        result: Optional[str] = None,
        duration: Optional[float] = 0,
        used_tools: Optional[list] = None,
        configuration: Optional[Configuration] = None,
    ) -> Task:
        """
        Asynchronously report the result of an external task.

        This method will use a provided agent or agent_id. If agent is not provided or not persisted,
        it will load the agent using the agent_id (or from the environment variable).

        Args:
            agent_id (Optional[str]): The agent's ID.
            agent (Optional[Agent]): Optional preloaded Agent instance (takes precedence).
            id (Optional[str]): Task identifier.
            input (Optional[str]): The input parameters or message for the task.
            llm_response (Optional[Any]): The LLM's response object.
            tokens (Optional[Tokens]): The tokens used.
            is_success (Optional[bool]): Task success status.
            result (Optional[str]): Final result string.
            duration (Optional[float]): Execution duration (seconds).
            used_tools (Optional[list]): List of tool names used.
            configuration (Optional[Configuration]): Optional configuration override.

        Returns:
            Task: The reported Task object from the backend.

        Raises:
            ValueError: If neither agent nor agent_id is provided.
        """
        used_tools = used_tools or []
        configuration = configuration or self.configuration

        agent_id = agent.id if agent else agent_id
        agent_id = agent_id or getenv("XPANDER_AGENT_ID")
        
        # Call Task.areport_external_task with all arguments.
        return await Task.areport_external_task(
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

    def report_external_task(
        self,
        agent_id: Optional[str] = None,
        agent: Optional[Agent] = None,
        id: Optional[str] = None,
        input: Optional[str] = None,
        llm_response: Optional[Any] = None,
        tokens: Optional[Any] = None,
        is_success: Optional[bool] = True,
        result: Optional[str] = None,
        duration: Optional[float] = 0,
        used_tools: Optional[list] = None,
        configuration: Optional[Configuration] = None,
    ) -> Task:
        """
        Synchronously report the result of an external task.

        This is the blocking version of areport_external_task(). It supports either a provided Agent
        instance (preferred), or loads by agent_id as needed.

        Args:
            agent_id (Optional[str]): The agent's ID.
            agent (Optional[Agent]): Optional preloaded Agent instance (takes precedence).
            id (Optional[str]): Task identifier.
            input (Optional[str]): The input parameters or message for the task.
            llm_response (Optional[Any]): The LLM's response object.
            tokens (Optional[Any]): The tokens used.
            is_success (Optional[bool]): Task success status.
            result (Optional[str]): Final result string.
            duration (Optional[float]): Execution duration (seconds).
            used_tools (Optional[list]): List of tool names used.
            configuration (Optional[Configuration]): Optional configuration override.

        Returns:
            Task: The reported Task object from the backend.

        Raises:
            ValueError: If neither agent nor agent_id is provided.
        """
        return run_sync(
            self.areport_external_task(
                agent_id=agent_id,
                agent=agent,
                id=id,
                input=input,
                llm_response=llm_response,
                tokens=tokens,
                is_success=is_success,
                result=result,
                duration=duration,
                used_tools=used_tools,
                configuration=configuration,
            )
        )
