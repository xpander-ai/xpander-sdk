from os import getenv
from typing import Any, Dict, Optional, Union

from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.shared import Tokens
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.backend.frameworks.dispatch import dispatch_get_args
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.utils.event_loop import run_sync


class Backend(ModuleBase):
    """
    Backend module for retrieving agent runtime arguments for execution.

    This module supports multiple frameworks and dispatches agent arguments
    accordingly. Provides both asynchronous and synchronous APIs.
    """

    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the Backend module.

        Args:
            configuration (Optional[Configuration]): Optional SDK configuration.
        """
        super().__init__(configuration)

    async def aget_args(
        self,
        agent_id: Optional[str] = None,
        agent: Optional[Agent] = None,
        agent_version: Optional[int] = None,
        task: Optional[Task] = None,
        override: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Asynchronously resolve runtime arguments for the specified agent.

        Args:
            agent_id (Optional[str]): ID of the agent. Required if 'agent' is not provided.
            agent (Optional[Agent]): Preloaded Agent instance. Takes precedence over 'agent_id'.
            agent_version (Optional[int]): Optional version to resolve.
            task (Optional[Task]): Optional Task object providing runtime input/output context.
            override (Optional[Dict[str, Any]]): Optional overrides for final arguments.

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

        return await dispatch_get_args(agent=xpander_agent, task=task, override=override)

    def get_args(
        self,
        agent_id: Optional[str] = None,
        agent: Optional[Agent] = None,
        agent_version: Optional[int] = None,
        task: Optional[Task] = None,
        override: Optional[Dict[str, Any]] = None
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
                override=override
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
