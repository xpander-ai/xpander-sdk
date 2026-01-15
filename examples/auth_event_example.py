"""
Example: Authentication event handling

Demonstrates:
✔ Creating real task
✔ Streaming task events
✔ Capturing auth events from stream
✔ Using @on_auth_event hook
✔ Production pattern

Use cases:
- Handle OAuth login prompts automatically
- Monitor authentication failures in production
- Trigger user re-login workflows
- Debug permission & token issues
- Secure enterprise integrations

------------------------------------------------

STEP 1: Activate virtual environment

source venv/bin/activate

------------------------------------------------

STEP 2: Set environment variables

export XPANDER_API_KEY="your_api_key"
export XPANDER_ORGANIZATION_ID="your_org_id"
export XPANDER_AGENT_ID="your_agent_id"

------------------------------------------------

STEP 3: Run

python examples/auth_event_example.py
------------------------------------------------
"""

import os
import asyncio
from loguru import logger

from xpander_sdk import (
    Configuration,
    Agent,
    on_auth_event
)

AGENT_ID = os.getenv("XPANDER_AGENT_ID")


# ---------------- AUTH HOOK ---------------- #

@on_auth_event
async def handle_auth(agent, task, event):
    """
    Global auth event hook
    Triggered when login/OAuth required
    """
    logger.warning("🔐 Authentication required!")
    logger.info(f"Agent: {agent.name}")
    logger.info(f"Event data: {event.data}")


# ---------------- MAIN ---------------- #

async def main():

    if not AGENT_ID:
        logger.error("XPANDER_AGENT_ID not set")
        logger.error("Run: export XPANDER_AGENT_ID=your_agent_id")
        return

    logger.info("Loading agent...")

    config = Configuration()
    agent = await Agent.aload(AGENT_ID, configuration=config)

    logger.success(f"Agent loaded: {agent.name}")

    logger.info("Creating task with streaming enabled...")

    task = await agent.acreate_task(
        prompt="Call any tool that requires authentication",
        events_streaming=True
    )

    logger.success(f"Task created: {task.id}")
    logger.info("Listening for live events...")

    # -------- STREAM EVENTS -------- #
    async for event in task.aevents():

        logger.info("=" * 40)
        logger.info(f"Event type: {event.type}")

        # Auth events ALSO come from stream
        if event.type == "auth_event":
            logger.warning("🔐 Auth event received from stream!")
            logger.info(event.data)

    logger.success("Task finished!")


if __name__ == "__main__":
    asyncio.run(main())
