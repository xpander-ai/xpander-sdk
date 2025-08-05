from os import getenv
from typing import Any, Dict, Optional, Union

from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.models.configuration import Configuration
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
