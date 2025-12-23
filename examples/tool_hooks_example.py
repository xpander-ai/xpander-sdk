"""
Example demonstrating the use of tool lifecycle hooks.

This example shows how to use @on_tool_before, @on_tool_after, and @on_tool_error
decorators to monitor and react to tool invocations.
"""

from typing import Optional, Dict, Any
from xpander_sdk import on_tool_before, on_tool_after, on_tool_error, Tool
from loguru import logger


@on_tool_before
async def log_tool_start(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    """Log when a tool is about to be invoked."""
    logger.info(f"[BEFORE] Invoking tool: {tool.name} (ID: {tool.id})")
    logger.info(f"[BEFORE] Tool call ID: {tool_call_id}")
    logger.info(f"[BEFORE] Agent version: {agent_version}")
    logger.info(f"[BEFORE] Payload: {payload}")
    if payload_extension:
        logger.info(f"[BEFORE] Payload extension: {payload_extension}")


@on_tool_before
def validate_tool_payload(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    """Validate tool payload before invocation (sync hook example)."""
    if not payload:
        logger.warning(f"[BEFORE] Tool {tool.name} invoked with empty payload")


@on_tool_after
async def log_tool_success(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    """Log successful tool invocation with result."""
    logger.info(f"[AFTER] Tool {tool.name} completed successfully")
    logger.info(f"[AFTER] Tool call ID: {tool_call_id}")
    logger.info(f"[AFTER] Result type: {type(result).__name__}")
    logger.info(f"[AFTER] Result: {result}")


@on_tool_after
def record_tool_metrics(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    """Record metrics for successful tool invocations (sync hook example)."""
    # In a real application, you would send these metrics to a monitoring system
    logger.info(f"[METRICS] Tool {tool.name} execution recorded")


@on_tool_error
async def handle_tool_error(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    """Handle tool invocation errors."""
    logger.error(f"[ERROR] Tool {tool.name} failed")
    logger.error(f"[ERROR] Tool call ID: {tool_call_id}")
    logger.error(f"[ERROR] Error type: {type(error).__name__}")
    logger.error(f"[ERROR] Error message: {str(error)}")
    logger.error(f"[ERROR] Payload that caused error: {payload}")


@on_tool_error
def alert_on_tool_failure(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    """Send alerts for tool failures (sync hook example)."""
    # In a real application, you would send this to an alerting system
    logger.warning(f"[ALERT] Tool failure alert for {tool.name}: {str(error)}")


if __name__ == "__main__":
    logger.info("Tool hooks registered successfully!")
    logger.info("These hooks will be called automatically during tool invocations.")
    logger.info("")
    logger.info("Registered hooks:")
    logger.info("  - 2 before hooks (1 async, 1 sync)")
    logger.info("  - 2 after hooks (1 async, 1 sync)")
    logger.info("  - 2 error hooks (1 async, 1 sync)")
