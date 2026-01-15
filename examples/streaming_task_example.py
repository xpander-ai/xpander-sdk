"""
Example: Streaming task events (secure logging)

Demonstrates:
- Live task streaming
- Safe logging
- Redacting secrets
- Matching events by event.type (reviewer suggestion)

Use cases:
- Real-time dashboards
- Debugging long-running agents
- Monitoring agent execution
- Observability pipelines
- Backend alerting systems

------------------------------------------------

STEP 1: Activate virtual environment

source venv/bin/activate

------------------------------------------------

STEP 2: Get credentials

1) API Key:
   xpander.ai → Admin Settings → API Keys

2) Organization ID:
   Same page → "Your organization ID"

3) Agent ID:
   Run once:

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

STEP 3: Export env vars

export XPANDER_API_KEY="your_api_key"
export XPANDER_ORGANIZATION_ID="your_org_id"
export XPANDER_AGENT_ID="your_agent_id"

------------------------------------------------

STEP 4: Run

python examples/streaming_task_example.py
"""

import os
import asyncio
from xpander_sdk import Agent, Configuration
from loguru import logger


AGENT_ID = os.getenv("XPANDER_AGENT_ID")

# Never log these keys
SENSITIVE_KEYS = {
    "api_key",
    "authorization",
    "token",
    "secret",
    "password",
}


# ---------------- SECURITY ---------------- #

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


# ---------------- MAIN ---------------- #

async def main():

    if not os.getenv("XPANDER_API_KEY"):
        logger.error("XPANDER_API_KEY not set")
        return

    if not os.getenv("XPANDER_ORGANIZATION_ID"):
        logger.error("XPANDER_ORGANIZATION_ID not set")
        return

    if not AGENT_ID:
        logger.error("XPANDER_AGENT_ID not set")
        return

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

        logger.info("=" * 40)
        logger.info(f"Event type: {event.type}")

        # Safe logging
        data = safe_dump(event.data)
        logger.info(f"Event data: {data}")

        if event.type == "task.finished":
            logger.success("Task completed successfully!")
            break


if __name__ == "__main__":
    asyncio.run(main())
