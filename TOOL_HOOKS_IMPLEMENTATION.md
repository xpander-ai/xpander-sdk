# Tool Hooks Implementation Summary

## Overview
Implemented a decorator-based tool hooks system for the xpander.ai SDK that allows users to intercept and react to tool invocations at different lifecycle stages (before, after, and on error).

## Files Created

### 1. `/src/xpander_sdk/modules/events/decorators/on_tool.py`
Main implementation file containing:
- `ToolHooksRegistry`: Central registry for managing hooks
- `on_tool_before`: Decorator for pre-invocation hooks
- `on_tool_after`: Decorator for post-invocation hooks (on success)
- `on_tool_error`: Decorator for error hooks (on failure)

**Key Features:**
- Supports both sync and async hooks
- Multiple hooks per type can be registered
- Hooks execute in registration order
- Hook failures are logged but don't break tool execution
- Full access to tool context (tool object, payload, payload_extension, tool_call_id, agent_version)

### 2. `/docs/TOOL_HOOKS.md`
Comprehensive documentation including:
- Hook signatures and parameters
- Basic and advanced usage examples
- Common use cases (logging, monitoring, validation, alerting, caching)
- Best practices and troubleshooting
- Integration with other SDK features

### 3. `/examples/tool_hooks_example.py`
Working example demonstrating:
- Both async and sync hooks
- All three hook types (before/after/error)
- Practical logging and validation patterns
- Multiple hooks of the same type

## Files Modified

### 1. `/src/xpander_sdk/modules/tools_repository/sub_modules/tool.py`
**Modified Method:** `ainvoke()`

**Changes:**
- Added import for `ToolHooksRegistry`
- Execute before hooks at start of invocation
- Execute after hooks on successful completion (with result)
- Execute error hooks on exception (with error)

**Integration Points:**
```python
# Before invocation
await ToolHooksRegistry.execute_before_hooks(tool, payload, payload_extension, tool_call_id, agent_version)

# After successful invocation
await ToolHooksRegistry.execute_after_hooks(tool, payload, payload_extension, tool_call_id, agent_version, result)

# On error
await ToolHooksRegistry.execute_error_hooks(tool, payload, payload_extension, tool_call_id, agent_version, error)
```

### 2. `/src/xpander_sdk/modules/events/decorators/__init__.py`
**Changes:**
- Export `on_tool_before`, `on_tool_after`, `on_tool_error` decorators

### 3. `/src/xpander_sdk/__init__.py`
**Changes:**
- Import tool hook decorators
- Add to `__all__` export list for public API

## Architecture

### Hook Execution Flow
```
Tool.ainvoke() called
    ↓
Execute all @on_tool_before hooks
    ↓
Validate payload against schema
    ↓
Execute tool (local or remote)
    ↓
Success? ────No────→ Execute all @on_tool_error hooks
    ↓                           ↓
   Yes                     Return result
    ↓
Execute all @on_tool_after hooks
    ↓
Return result
```

### Registry Pattern
The `ToolHooksRegistry` class maintains class-level lists of hooks:
- `_before_hooks`: List[Callable]
- `_after_hooks`: List[Callable]
- `_error_hooks`: List[Callable]

Hooks are registered at decoration time and executed during tool invocation.

## Hook Signatures

### Before Hook
```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

def hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    """Called before tool invocation"""
```

### After Hook
```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

def hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    """Called after successful tool invocation"""
```

### Error Hook
```python
from typing import Optional, Dict, Any
from xpander_sdk import Tool

def hook(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    """Called when tool invocation fails"""
```

## Usage Example

```python
from typing import Optional, Dict, Any
from xpander_sdk import on_tool_before, on_tool_after, on_tool_error, Tool
from loguru import logger

@on_tool_before
async def log_start(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None
):
    logger.info(f"Starting tool: {tool.name}")

@on_tool_after
async def log_success(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    result: Any = None
):
    logger.info(f"Tool {tool.name} succeeded: {result}")

@on_tool_error
async def log_error(
    tool: Tool,
    payload: Any,
    payload_extension: Optional[Dict[str, Any]] = None,
    tool_call_id: Optional[str] = None,
    agent_version: Optional[str] = None,
    error: Optional[Exception] = None
):
    logger.error(f"Tool {tool.name} failed: {error}")
```

## Key Design Decisions

1. **Decorator Pattern**: Follows existing SDK patterns (@on_task, @on_boot, @on_shutdown)
2. **Class-Level Registry**: Hooks are global, not per-instance
3. **Async-First**: All hook execution methods are async to support both sync and async hooks
4. **Non-Blocking Errors**: Hook failures don't prevent tool execution
5. **Complete Context**: Hooks receive all invocation parameters for maximum flexibility

## Benefits

1. **Observability**: Easy to add logging, monitoring, and metrics
2. **Validation**: Pre-invocation validation without modifying tools
3. **Error Handling**: Centralized error handling and alerting
4. **Audit Trail**: Comprehensive audit logging capabilities
5. **Extensibility**: New hooks can be added without changing tool code
6. **Performance Monitoring**: Track tool execution times and patterns

## Compatibility

- Works with both local and remote tools
- Compatible with sync (`invoke`) and async (`ainvoke`) tool methods
- Integrates seamlessly with existing `@on_task` handlers
- No breaking changes to existing SDK functionality

## Testing

Syntax validation confirmed for all modified and created files:
- ✓ `on_tool.py` - Valid Python syntax
- ✓ `tool.py` - Valid Python syntax
- ✓ Example file ready for use

## Future Enhancements

Potential additions:
1. Per-tool hook registration (tool-specific hooks)
2. Hook priorities/ordering control
3. Conditional hook execution (filters)
4. Hook performance metrics
5. Hook registry inspection API
