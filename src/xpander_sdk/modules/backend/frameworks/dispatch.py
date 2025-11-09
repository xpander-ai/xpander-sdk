from typing import Any, Callable, Dict, List, Optional

from xpander_sdk.models.frameworks import Framework
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.tasks.sub_modules.task import Task

async def dispatch_get_args(
    agent: Agent,
    task: Optional[Task] = None,
    override: Optional[Dict[str, Any]] = None,
    tools: Optional[List[Callable]] = None,
    is_async: Optional[bool] = True
) -> Dict[str, Any]:
    """
    Dispatch to the correct framework-specific argument resolver.

    Args:
        agent (Agent): The agent to generate args for.
        task (Optional[Task]): Optional runtime task.
        override (Optional[Dict[str, Any]]): Dict of override values.
        tools (Optional[List[Callable]]): Optional additional tools to be added to the agent arguments.
        is_async (Optional[bool]): Is in Async Context?.

    Returns:
        Dict[str, Any]: Arguments for instantiating the framework agent.
    """
    match agent.framework:
        case Framework.Agno:
            from .agno import build_agent_args
            return await build_agent_args(xpander_agent=agent, task=task, override=override, tools=tools, is_async=is_async)
        # case Framework.Langchain: # PLACEHOLDER
        #     from .langchain import build_agent_args
        #     return await build_agent_args(xpander_agent=agent, task=task, override=override)
        case _:
            raise NotImplementedError(f"Framework '{agent.framework.value}' is not supported.")
