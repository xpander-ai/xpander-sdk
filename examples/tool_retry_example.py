"""
Example: Tool retry with exponential backoff

This example demonstrates:
- Automatic retry on tool failure
- Exponential backoff strategy
- Max retry limit
- Production-safe pattern

Use case:
- API timeouts
- Temporary failures
- Network issues
"""

import asyncio
from typing import Optional, Dict, Any
from xpander_sdk import on_tool_error, Tool
from loguru import logger

# Retry configuration
MAX_RETRIES = 3
BASE_DELAY = 1  # seconds

# Track retry attempts per tool call
RETRY_COUNTER = {}


def get_backoff_delay(attempt: int) -> int:
    """Exponential backoff: 2^attempt"""
    return BASE_DELAY * (2 ** attempt)


@on_tool_error
async def retry_failed_tool(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    """Retry tool on failure with exponential backoff."""

    # Initialize counter
    RETRY_COUNTER.setdefault(tool_call_id, 0)
    RETRY_COUNTER[tool_call_id] += 1

    attempt = RETRY_COUNTER[tool_call_id]

    logger.error("======================================")
    logger.error(f"[RETRY] Tool failed: {tool.name}")
    logger.error(f"[RETRY] Attempt: {attempt}/{MAX_RETRIES}")
    logger.error(f"[RETRY] Error: {str(error)}")

    if attempt > MAX_RETRIES:
        logger.error("[RETRY] Max retries exceeded. Giving up.")
        RETRY_COUNTER.pop(tool_call_id, None)
        return

    # Calculate delay
    delay = get_backoff_delay(attempt)

    logger.warning(f"[RETRY] Waiting {delay}s before retry...")

    await asyncio.sleep(delay)

    try:
        logger.info("[RETRY] Retrying tool invocation...")

        result = await tool.ainvoke(
            agent_id=None,  # auto resolved
            payload=payload,
            payload_extension=payload_extension
        )

        logger.success("[RETRY] Tool succeeded after retry!")
        logger.success(f"[RETRY] Result: {result}")

        # Cleanup
        RETRY_COUNTER.pop(tool_call_id, None)

    except Exception as retry_error:
        logger.error("[RETRY] Retry failed")
        logger.error(str(retry_error))
        raise retry_error


if __name__ == "__main__":
    logger.info("✅ Tool retry hooks registered successfully!")
    logger.info("")
    logger.info("Features:")
    logger.info(" - Auto retry on failure")
    logger.info(" - Exponential backoff")
    logger.info(" - Max retry protection")
    logger.info("")
    logger.info("This helps handle:")
    logger.info(" - Network errors")
    logger.info(" - API timeouts")
    logger.info(" - Temporary failures")
