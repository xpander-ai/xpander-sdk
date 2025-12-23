# Tool Hooks Documentation

Tool hooks provide a powerful mechanism to intercept and react to tool invocations throughout their lifecycle. This allows you to implement cross-cutting concerns like logging, monitoring, validation, and error handling without modifying tool implementations.

## Overview

The xpander.ai SDK provides three decorators for tool lifecycle hooks:

- `@on_tool_before`: Execute before tool invocation
- `@on_tool_after`: Execute after successful tool invocation  
- `@on_tool_error`: Execute when tool invocation fails

## Hook Signatures

### Before Hook
```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_before
def hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    """
    Args:
        tool: The Tool object being invoked
        payload: The payload being sent to the tool
        payload_extension: Additional payload data
        tool_call_id: Unique ID of the tool call
        agent_version: Version of the agent making the call
    """
    pass
```

### After Hook
```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_after
def hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    """
    Args:
        tool: The Tool object that was invoked
        payload: The payload sent to the tool
        payload_extension: Additional payload data
        tool_call_id: Unique ID of the tool call
        agent_version: Version of the agent that made the call
        result: The result returned by the tool invocation
    """
    pass
```

### Error Hook
```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_error
def hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    """
    Args:
        tool: The Tool object that failed
        payload: The payload sent to the tool
        payload_extension: Additional payload data
        tool_call_id: Unique ID of the tool call
        agent_version: Version of the agent that made the call
        error: The exception that occurred during invocation
    """
    pass
```

## Basic Usage

### Simple Logging

```python
from typing import Optional, Dict, Any
from xpander_sdk import on_tool_before, on_tool_after, on_tool_error, Tool
from loguru import logger

@on_tool_before
def log_invocation(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    logger.info(f"Invoking tool: {tool.name}")

@on_tool_after
def log_success(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    logger.info(f"Tool {tool.name} succeeded")

@on_tool_error
def log_failure(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    logger.error(f"Tool {tool.name} failed: {error}")
```

### Async Hooks

Both sync and async hooks are supported:

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_before
async def async_validation(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    # Async validation logic
    await validate_payload(payload)

@on_tool_after
async def async_metrics(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    # Send metrics to async service
    await metrics_service.record(tool.name, result)
```

## Common Use Cases

### 1. Request Validation

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_before
def validate_request(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    if not payload:
        logger.warning(f"Empty payload for tool {tool.name}")
    
    # Additional validation logic
    if tool.name == "sensitive_tool" and not agent_version:
        logger.error("Sensitive tool requires agent version")
```

### 2. Metrics and Monitoring

```python
import time
from typing import Optional, Dict, Any
from collections import defaultdict
from xpander_sdk import Tool

# Track execution times
execution_times = defaultdict(list)

@on_tool_before
def record_start_time(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    execution_times[tool_call_id] = {"start": time.time(), "tool": tool.name}

@on_tool_after
def record_duration(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    if tool_call_id in execution_times:
        duration = time.time() - execution_times[tool_call_id]["start"]
        logger.info(f"Tool {tool.name} took {duration:.2f}s")
        
        # Send to monitoring system
        metrics.gauge(f"tool.{tool.name}.duration", duration)
```

### 3. Error Alerting

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_error
async def alert_on_failure(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    # Send alert for critical tools
    if tool.name in ["payment_processor", "auth_service"]:
        await alert_service.send(
            title=f"Critical Tool Failure: {tool.name}",
            message=f"Error: {str(error)}\nCall ID: {tool_call_id}",
            severity="critical"
        )
```

### 4. Audit Logging

```python
import json
from typing import Optional, Dict, Any
from datetime import datetime
from xpander_sdk import Tool

@on_tool_before
def audit_log_request(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    audit_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "event": "tool_invocation",
        "tool_name": tool.name,
        "tool_id": tool.id,
        "call_id": tool_call_id,
        "agent_version": agent_version,
        "payload": payload
    }
    audit_log.write(json.dumps(audit_entry) + "\n")

@on_tool_after
def audit_log_response(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    audit_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "event": "tool_success",
        "call_id": tool_call_id,
        "result_type": type(result).__name__
    }
    audit_log.write(json.dumps(audit_entry) + "\n")
```

### 5. Result Caching

```python
import hashlib
import json
from typing import Optional, Dict, Any
from xpander_sdk import Tool

cache = {}

@on_tool_before
def check_cache(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    # Generate cache key
    cache_key = f"{tool.id}:{hashlib.md5(json.dumps(payload, sort_keys=True).encode()).hexdigest()}"
    
    if cache_key in cache:
        logger.info(f"Cache hit for tool {tool.name}")

@on_tool_after
def cache_result(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    # Cache successful results
    cache_key = f"{tool.id}:{hashlib.md5(json.dumps(payload, sort_keys=True).encode()).hexdigest()}"
    cache[cache_key] = result
    logger.debug(f"Cached result for tool {tool.name}")
```

## Advanced Features

### Multiple Hooks

You can register multiple hooks of the same type - they execute in registration order:

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_before
def first_hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    logger.info("First before hook")

@on_tool_before
def second_hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    logger.info("Second before hook")
```

### Hook Execution Flow

```
Tool Invocation Request
         ↓
Execute @on_tool_before hooks (all registered)
         ↓
Execute Tool Logic
         ↓
    Success? ───No──→ Execute @on_tool_error hooks
         ↓                        ↓
        Yes                  Return Result
         ↓
Execute @on_tool_after hooks
         ↓
    Return Result
```

### Error Handling in Hooks

Exceptions in hooks are caught and logged but don't prevent tool execution:

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_before
def may_fail(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    # If this raises an exception, it's logged but tool still executes
    risky_operation()
```

## Best Practices

1. **Keep hooks lightweight**: Hooks should be fast to avoid delaying tool execution
2. **Use async for I/O operations**: If your hook does I/O (database, API calls), make it async
3. **Don't modify tool behavior**: Hooks should observe, not alter tool execution
4. **Handle errors gracefully**: Hook failures shouldn't break tool invocations
5. **Consider security**: Be careful logging sensitive data from payloads
6. **Use structured logging**: Include tool_call_id for traceability

## Accessing Hook Context

Hooks have access to the complete tool invocation context:

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

@on_tool_before
def inspect_context(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    # Tool information
    logger.info(f"Tool ID: {tool.id}")
    logger.info(f"Tool Name: {tool.name}")
    logger.info(f"Is Local: {tool.is_local}")
    logger.info(f"Description: {tool.description}")
    
    # Call information
    logger.info(f"Call ID: {tool_call_id}")
    logger.info(f"Agent Version: {agent_version}")
    
    # Payload information
    logger.info(f"Payload: {payload}")
    logger.info(f"Extension: {payload_extension}")
```

## Integration with Other Features

Tool hooks work seamlessly with other xpander.ai SDK features:

```python
from xpander_sdk import on_tool_before, on_task

# Tool hooks work with @on_task handlers
@on_task
async def handle_task(task):
    # Tool hooks will be triggered for any tools invoked here
    result = await tool.ainvoke(agent_id=task.agent_id, payload={...})
    return task
```

## Troubleshooting

### Hooks Not Executing

Ensure hooks are registered before any tool invocations:

```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

# Register hooks at module level
@on_tool_before
def my_hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    pass

# Then use tools
tool.invoke(...)
```

### Performance Issues

If hooks slow down execution, consider:
- Making hooks async if they do I/O
- Moving expensive operations to background tasks
- Using sampling for high-frequency tools

### Debug Logging

Enable debug logging to see hook execution:

```python
from loguru import logger

logger.add("tool_hooks.log", level="DEBUG")
```

## Examples

See the `/examples/tool_hooks_example.py` file for a complete working example demonstrating all hook types.
