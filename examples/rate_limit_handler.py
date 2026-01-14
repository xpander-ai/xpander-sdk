"""
Example: Rate limit handling (HTTP 429)

Demonstrates:
- Catching rate limit errors
- Respecting Retry-After header
- Exponential backoff
- Max retry protection
- Production-safe pattern

Use cases:
- External API calls
- Tool invocations
- Agent execution reliability

------------------------------------------------

SETUP REQUIRED:

export XPANDER_API_KEY="your_api_key"
export XPANDER_ORGANIZATION_ID="your_org_id"

------------------------------------------------

RUN:

python examples/rate_limit_handler.py
"""

import os
import asyncio
import random
from loguru import logger
from xpander_sdk import Agent, Configuration
from xpander_sdk.exceptions.module_exception import ModuleException


MAX_RETRIES = 5
BASE_BACKOFF = 2  # seconds


async def call_agent_with_retry(agent, prompt: str):
    """
    Calls agent with rate-limit protection.
    Retries automatically on 429.
    """

    attempt = 1

    while attempt <= MAX_RETRIES:
        try:
            logger.info(f"Attempt {attempt} → sending request")

            task = await agent.acreate_task(prompt=prompt)

            logger.success("Request successful!")
            logger.success(f"Task ID: {task.id}")
            return task

        except ModuleException as e:

            # Check if rate limit
            if e.status_code == 429:
                logger.warning("Rate limit hit (HTTP 429)")

                retry_after = getattr(e, "retry_after", None)

                # Respect Retry-After header if present
                if retry_after:
                    wait_time = int(retry_after)
                    logger.warning(f"Retry-After header found → waiting {wait_time}s")
                else:
                    # Exponential backoff + jitter
                    wait_time = BASE_BACKOFF ** attempt + random.uniform(0, 1)
                    logger.warning(f"Backoff wait → {wait_time:.2f}s")

                await asyncio.sleep(wait_time)
                attempt += 1
                continue

            # Non rate-limit error
            logger.error(f"Request failed: {e}")
            raise

    logger.error("Max retries exceeded. Aborting.")
    return None


async def main():

    # Safety checks
    if not os.getenv("XPANDER_API_KEY"):
        logger.error("XPANDER_API_KEY not set")
        return

    if not os.getenv("XPANDER_ORGANIZATION_ID"):
        logger.error("XPANDER_ORGANIZATION_ID not set")
        return

    if not os.getenv("XPANDER_AGENT_ID"):
        logger.error("XPANDER_AGENT_ID not set")
        logger.error("Run: export XPANDER_AGENT_ID=your_agent_id")
        return

    config = Configuration()

    logger.info("Loading agent...")

    agent = await Agent.aload(
        agent_id=os.getenv("XPANDER_AGENT_ID"),
        configuration=config
    )

    logger.success(f"Agent loaded: {agent.name}")

    # Call agent safely
    await call_agent_with_retry(
        agent,
        prompt="Summarize latest AI trends"
    )


if __name__ == "__main__":
    asyncio.run(main())