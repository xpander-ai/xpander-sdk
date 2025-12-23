"""
xpander_sdk.decorators.on_tool

This module provides decorators for tool invocation lifecycle hooks:
- `@on_tool_before`: Execute before tool invocation
- `@on_tool_after`: Execute after successful tool invocation
- `@on_tool_error`: Execute when tool invocation fails

The decorators ensure that registered functions:
- Accept parameters: Tool, payload, payload_extension, tool_call_id, agent_version
- Can be either synchronous or asynchronous
- Are called at the appropriate lifecycle stage during tool execution

Execution Notes:
- Before-hooks execute before tool invocation and can perform validation or logging
- After-hooks execute after successful invocation with access to the result
- Error-hooks execute when an exception occurs during invocation
- Multiple hooks of the same type can be registered and will execute in registration order
- Exceptions in hooks are logged but don't prevent tool execution

Example usage:
--------------
>>> @on_tool_before
... async def log_tool_invocation(tool, payload, payload_extension, tool_call_id, agent_version):
...     logger.info(f"Invoking tool {tool.name} with payload: {payload}")

>>> @on_tool_after
... def record_tool_result(tool, payload, payload_extension, tool_call_id, agent_version, result):
...     logger.info(f"Tool {tool.name} completed with result: {result}")

>>> @on_tool_error
... async def handle_tool_error(tool, payload, payload_extension, tool_call_id, agent_version, error):
...     logger.error(f"Tool {tool.name} failed: {error}")
"""

import asyncio
from functools import wraps
from inspect import iscoroutinefunction
from typing import Optional, Callable, Any, Dict, List

from xpander_sdk.models.configuration import Configuration


class ToolHooksRegistry:
    """
    Registry for tool invocation lifecycle hooks.
    
    This class maintains class-level lists of hooks that are executed at different
    stages of tool invocation: before, after, and on error.
    """
    
    _before_hooks: List[Callable] = []
    _after_hooks: List[Callable] = []
    _error_hooks: List[Callable] = []
    
    @classmethod
    def register_before_hook(cls, hook: Callable) -> None:
        """
        Register a before-invocation hook.
        
        Args:
            hook (Callable): The hook function to execute before tool invocation.
        """
        cls._before_hooks.append(hook)
    
    @classmethod
    def register_after_hook(cls, hook: Callable) -> None:
        """
        Register an after-invocation hook.
        
        Args:
            hook (Callable): The hook function to execute after successful tool invocation.
        """
        cls._after_hooks.append(hook)
    
    @classmethod
    def register_error_hook(cls, hook: Callable) -> None:
        """
        Register an error hook.
        
        Args:
            hook (Callable): The hook function to execute when tool invocation fails.
        """
        cls._error_hooks.append(hook)
    
    @classmethod
    async def execute_before_hooks(
        cls,
        tool: Any,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = None,
        tool_call_id: Optional[str] = None,
        agent_version: Optional[str] = None
    ) -> None:
        """
        Execute all registered before-invocation hooks.
        
        Args:
            tool: The Tool object being invoked.
            payload: The payload being sent to the tool.
            payload_extension: Additional payload data.
            tool_call_id: Unique ID of the tool call.
            agent_version: Version of the agent making the call.
        """
        from loguru import logger
        
        for hook in cls._before_hooks:
            try:
                if asyncio.iscoroutinefunction(hook):
                    await hook(tool, payload, payload_extension, tool_call_id, agent_version)
                else:
                    hook(tool, payload, payload_extension, tool_call_id, agent_version)
            except Exception as e:
                logger.error(f"Before-hook {hook.__name__} failed: {e}")
    
    @classmethod
    async def execute_after_hooks(
        cls,
        tool: Any,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = None,
        tool_call_id: Optional[str] = None,
        agent_version: Optional[str] = None,
        result: Any = None
    ) -> None:
        """
        Execute all registered after-invocation hooks.
        
        Args:
            tool: The Tool object that was invoked.
            payload: The payload sent to the tool.
            payload_extension: Additional payload data.
            tool_call_id: Unique ID of the tool call.
            agent_version: Version of the agent that made the call.
            result: The result returned by the tool invocation.
        """
        from loguru import logger
        
        for hook in cls._after_hooks:
            try:
                if asyncio.iscoroutinefunction(hook):
                    await hook(tool, payload, payload_extension, tool_call_id, agent_version, result)
                else:
                    hook(tool, payload, payload_extension, tool_call_id, agent_version, result)
            except Exception as e:
                logger.error(f"After-hook {hook.__name__} failed: {e}")
    
    @classmethod
    async def execute_error_hooks(
        cls,
        tool: Any,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = None,
        tool_call_id: Optional[str] = None,
        agent_version: Optional[str] = None,
        error: Optional[Exception] = None
    ) -> None:
        """
        Execute all registered error hooks.
        
        Args:
            tool: The Tool object that failed.
            payload: The payload sent to the tool.
            payload_extension: Additional payload data.
            tool_call_id: Unique ID of the tool call.
            agent_version: Version of the agent that made the call.
            error: The exception that occurred during invocation.
        """
        from loguru import logger
        
        for hook in cls._error_hooks:
            try:
                if asyncio.iscoroutinefunction(hook):
                    await hook(tool, payload, payload_extension, tool_call_id, agent_version, error)
                else:
                    hook(tool, payload, payload_extension, tool_call_id, agent_version, error)
            except Exception as e:
                logger.error(f"Error-hook {hook.__name__} failed: {e}")


def on_tool_before(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None
):
    """
    Decorator to register a handler as a before-invocation hook for tool calls.
    
    The decorated function will be executed before any tool invocation. The function:
    - Must accept parameters: tool, payload, payload_extension, tool_call_id, agent_version
    - Can be either synchronous or asynchronous
    - Can perform validation, logging, or modification of invocation context
    
    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_tool_before`).
        configuration (Optional[Configuration]):
            An optional configuration object (reserved for future use).
    
    Example:
        >>> from typing import Optional, Dict, Any
        >>> from xpander_sdk import Tool
        >>> 
        >>> @on_tool_before
        ... async def validate_tool_input(
        ...     tool: Tool,
        ...     payload: Any,
        ...     payload_extension: Optional[Dict[str, Any]] = None,
        ...     tool_call_id: Optional[str] = None,
        ...     agent_version: Optional[str] = None
        ... ):
        ...     logger.info(f"Pre-invoking tool: {tool.name}")
        ...     if not payload:
        ...         logger.warning("Empty payload provided")
        
        >>> @on_tool_before
        ... def log_tool_metrics(
        ...     tool: Tool,
        ...     payload: Any,
        ...     payload_extension: Optional[Dict[str, Any]] = None,
        ...     tool_call_id: Optional[str] = None,
        ...     agent_version: Optional[str] = None
        ... ):
        ...     metrics.record_tool_invocation(tool.name, tool_call_id)
    """
    
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            return await func(*args, **kwargs)
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        
        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper
        
        # Register hook in the registry
        ToolHooksRegistry.register_before_hook(wrapped)
        
        return wrapped
    
    if _func and callable(_func):
        return decorator(_func)
    
    return decorator


def on_tool_after(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None
):
    """
    Decorator to register a handler as an after-invocation hook for tool calls.
    
    The decorated function will be executed after successful tool invocation. The function:
    - Must accept parameters: tool, payload, payload_extension, tool_call_id, agent_version, result
    - Can be either synchronous or asynchronous
    - Can perform logging, analytics, or result processing
    
    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_tool_after`).
        configuration (Optional[Configuration]):
            An optional configuration object (reserved for future use).
    
    Example:
        >>> from typing import Optional, Dict, Any
        >>> from xpander_sdk import Tool
        >>> 
        >>> @on_tool_after
        ... async def log_tool_success(
        ...     tool: Tool,
        ...     payload: Any,
        ...     payload_extension: Optional[Dict[str, Any]] = None,
        ...     tool_call_id: Optional[str] = None,
        ...     agent_version: Optional[str] = None,
        ...     result: Any = None
        ... ):
        ...     logger.info(f"Tool {tool.name} succeeded with result: {result}")
        ...     analytics.record_success(tool.name, tool_call_id)
        
        >>> @on_tool_after
        ... def cache_tool_result(
        ...     tool: Tool,
        ...     payload: Any,
        ...     payload_extension: Optional[Dict[str, Any]] = None,
        ...     tool_call_id: Optional[str] = None,
        ...     agent_version: Optional[str] = None,
        ...     result: Any = None
        ... ):
        ...     cache.set(f"tool_{tool.id}_{hash(payload)}", result)
    """
    
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            return await func(*args, **kwargs)
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        
        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper
        
        # Register hook in the registry
        ToolHooksRegistry.register_after_hook(wrapped)
        
        return wrapped
    
    if _func and callable(_func):
        return decorator(_func)
    
    return decorator


def on_tool_error(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None
):
    """
    Decorator to register a handler as an error hook for tool calls.
    
    The decorated function will be executed when tool invocation fails. The function:
    - Must accept parameters: tool, payload, payload_extension, tool_call_id, agent_version, error
    - Can be either synchronous or asynchronous
    - Can perform error logging, alerting, or recovery actions
    
    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_tool_error`).
        configuration (Optional[Configuration]):
            An optional configuration object (reserved for future use).
    
    Example:
        >>> from typing import Optional, Dict, Any
        >>> from xpander_sdk import Tool
        >>> 
        >>> @on_tool_error
        ... async def alert_on_tool_failure(
        ...     tool: Tool,
        ...     payload: Any,
        ...     payload_extension: Optional[Dict[str, Any]] = None,
        ...     tool_call_id: Optional[str] = None,
        ...     agent_version: Optional[str] = None,
        ...     error: Optional[Exception] = None
        ... ):
        ...     logger.error(f"Tool {tool.name} failed: {error}")
        ...     await send_alert(f"Tool failure: {tool.name}", str(error))
        
        >>> @on_tool_error
        ... def log_tool_failure(
        ...     tool: Tool,
        ...     payload: Any,
        ...     payload_extension: Optional[Dict[str, Any]] = None,
        ...     tool_call_id: Optional[str] = None,
        ...     agent_version: Optional[str] = None,
        ...     error: Optional[Exception] = None
        ... ):
        ...     error_log.write(f"{tool.name},{tool_call_id},{str(error)}\n")
    """
    
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            return await func(*args, **kwargs)
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        
        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper
        
        # Register hook in the registry
        ToolHooksRegistry.register_error_hook(wrapped)
        
        return wrapped
    
    if _func and callable(_func):
        return decorator(_func)
    
    return decorator
