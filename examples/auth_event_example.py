"""
Example: Authentication event handling

This example demonstrates:
- Handling authentication events
- Using @on_auth_event decorator
- Displaying login URL to users
- Production-ready pattern

Use case:
- OAuth login
- MCP server authentication
- External API authorization
"""

from xpander_sdk import Backend, Configuration, on_auth_event
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.tasks.sub_modules.task import Task, TaskUpdateEvent
from loguru import logger


# Global auth event handler
@on_auth_event
async def handle_auth_event(
    agent: Agent,
    task: Task,
    event: TaskUpdateEvent
):
    """
    This function runs automatically when authentication is required.
    """

    logger.warning("======================================")
    logger.warning("[AUTH] Authentication required!")
    logger.warning(f"[AUTH] Agent: {agent.name}")
    logger.warning(f"[AUTH] Task ID: {task.id}")

    # event.data usually contains login URL or OAuth info
    auth_data = event.data

    logger.warning(f"[AUTH] Auth Data: {auth_data}")

    # Typical structure:
    # {
    #   "login_url": "https://auth.provider.com/..."
    # }

    if isinstance(auth_data, dict) and "login_url" in auth_data:
        logger.warning(f"[AUTH] Please login here:")
        logger.warning(auth_data["login_url"])

    logger.warning("======================================")


async def main():
    """
    Demo showing how auth handler integrates with Backend
    """

    config = Configuration()  # uses env vars

    backend = Backend(configuration=config)

    # Dummy task object (normally comes from agent execution)
    task = None  # will be populated by xpander runtime

    logger.info("Auth event hook registered successfully!")
    logger.info("This handler will trigger when login is required.")


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
