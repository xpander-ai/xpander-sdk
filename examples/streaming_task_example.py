"""
Example: Streaming task events (secure logging)

Demonstrates:
- Live task streaming
- Safe logging
- Redacting secrets

Use cases:
- Real-time dashboards
- Debugging long-running agents
- Monitoring agent execution

------------------------------------------------

SETUP REQUIRED:

1) Get API key:
   xpander.ai → Admin Settings → API Keys

2) Get Organization ID:
   Same page shows "Your organization ID"

3) Get Agent ID:
   Run this once:

   python - <<EOF
   import asyncio
   from xpander_sdk import Agents, Configuration

   async def main():
       config = Configuration()
       agents = Agents(configuration=config)
       for a in await agents.alist():
           print("Name:", a.name)
           print("ID:", a.id)
           print("-"*30)

   asyncio.run(main())
   EOF

------------------------------------------------

EXPORT ENV VARIABLES:

export XPANDER_API_KEY="your_api_key"
export XPANDER_ORGANIZATION_ID="your_org_id"
export XPANDER_AGENT_ID="your_agent_id"

------------------------------------------------

RUN:

python examples/streaming_task_example.py
"""

import os
import asyncio
from xpander_sdk import Agent, Configuration
from loguru import logger


# Read agent ID from env
AGENT_ID = os.getenv("XPANDER_AGENT_ID")

# Keys that must NEVER be logged
SENSITIVE_KEYS = {
    "api_key",
    "authorization",
    "token",
    "secret",
    "password",
}


def sanitize(data):
    """Recursively redact secrets from dict"""
    if not isinstance(data, dict):
        return data

    clean = {}
    for k, v in data.items():
        if any(s in k.lower() for s in SENSITIVE_KEYS):
            clean[k] = "***REDACTED***"
        elif isinstance(v, dict):
            clean[k] = sanitize(v)
        else:
            clean[k] = v
    return clean


def safe_dump(obj):
    """Safely serialize SDK objects"""
    try:
        if hasattr(obj, "model_dump"):
            return sanitize(obj.model_dump())
        return str(obj)
    except Exception:
        return "<unserializable>"


async def main():

    # Safety checks
    if not os.getenv("XPANDER_API_KEY"):
        logger.error("XPANDER_API_KEY not set")
        logger.error("Run: export XPANDER_API_KEY=your_api_key")
        return

    if not os.getenv("XPANDER_ORGANIZATION_ID"):
        logger.error("XPANDER_ORGANIZATION_ID not set")
        logger.error("Run: export XPANDER_ORGANIZATION_ID=your_org_id")
        return

    if not AGENT_ID:
        logger.error("XPANDER_AGENT_ID not set")
        logger.error("Run: export XPANDER_AGENT_ID=your_agent_id")
        return

    # Load config
    config = Configuration()

    logger.info("Loading agent...")
    agent = await Agent.aload(
        agent_id=AGENT_ID,
        configuration=config
    )

    logger.success(f"Agent loaded: {agent.name}")

    logger.info("Creating streaming task...")

    task = await agent.acreate_task(
        prompt="Analyze this dataset and summarize insights",
        events_streaming=True
    )

    logger.success(f"Task created: {task.id}")
    logger.info("Listening to live events...\n")

    async for event in task.aevents():

        logger.info("=================================")
        logger.info(f"Event type: {event.type}")

        # Safe logging
        data = safe_dump(event.data)
        logger.info(f"Event data: {data}")

        # Stop when finished
        if str(event.type).lower().endswith("finished"):
            logger.success("Task completed successfully!")
            break


if __name__ == "__main__":
    asyncio.run(main())
