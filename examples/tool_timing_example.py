"""
Example: Tool execution timing & performance monitoring

This example demonstrates how to:
- Capture start time before tool execution
- Measure execution duration after completion
- Handle errors with timing data
- Works with both async & sync hooks

Use case:
- Performance monitoring
- SLA tracking
- Observability dashboards
"""

import time
from typing import Optional, Dict, Any
from xpander_sdk import (
    on_tool_before,
    on_tool_after,
    on_tool_error,
    Tool
)
from loguru import logger

# Store start time per tool call
TOOL_START_TIMES = {}


@on_tool_before
def start_tool_timer(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    """Start timer before tool execution."""
    TOOL_START_TIMES[tool_call_id] = time.time()

    logger.info("======================================")
    logger.info(f"[TIMER-START] Tool: {tool.name}")
    logger.info(f"[TIMER-START] Tool Call ID: {tool_call_id}")
    logger.info(f"[TIMER-START] Agent Version: {agent_version}")
    logger.info(f"[TIMER-START] Payload: {payload}")


@on_tool_after
async def stop_tool_timer(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    """Stop timer and log execution duration."""
    start_time = TOOL_START_TIMES.get(tool_call_id)

    if start_time:
        duration = time.time() - start_time
    else:
        duration = -1  # fallback if hook failed

    logger.success("======================================")
    logger.success(f"[TIMER-END] Tool: {tool.name}")
    logger.success(f"[TIMER-END] Tool Call ID: {tool_call_id}")
    logger.success(f"[TIMER-END] Execution Time: {duration:.3f} seconds")
    logger.success(f"[TIMER-END] Result Type: {type(result).__name__}")
    logger.success(f"[TIMER-END] Result: {result}")

    # Cleanup
    TOOL_START_TIMES.pop(tool_call_id, None)


@on_tool_error
async def handle_tool_error_with_timing(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    """Handle tool failure and log execution time until crash."""
    start_time = TOOL_START_TIMES.get(tool_call_id)

    if start_time:
        duration = time.time() - start_time
    else:
        duration = -1

    logger.error("======================================")
    logger.error(f"[TIMER-ERROR] Tool: {tool.name}")
    logger.error(f"[TIMER-ERROR] Tool Call ID: {tool_call_id}")
    logger.error(f"[TIMER-ERROR] Failed After: {duration:.3f} seconds")
    logger.error(f"[TIMER-ERROR] Error Type: {type(error).__name__}")
    logger.error(f"[TIMER-ERROR] Error Message: {str(error)}")
    logger.error(f"[TIMER-ERROR] Payload: {payload}")

    # Cleanup
    TOOL_START_TIMES.pop(tool_call_id, None)


if __name__ == "__main__":
    logger.info("✅ Tool timing hooks registered successfully!")
    logger.info("")
    logger.info("Hooks:")
    logger.info(" - on_tool_before → Start timer")
    logger.info(" - on_tool_after  → Stop timer & log duration")
    logger.info(" - on_tool_error  → Log crash duration")
    logger.info("")
    logger.info("This example helps in:")
    logger.info(" - Performance monitoring")
    logger.info(" - SLA tracking")
    logger.info(" - Debugging slow tools")
