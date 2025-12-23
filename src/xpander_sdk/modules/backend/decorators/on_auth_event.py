"""
xpander_sdk.modules.backend.decorators.on_auth_event

This module provides the `@on_auth_event` decorator, which allows developers to define
authentication event handlers that respond to OAuth flows and authentication events.

The decorator ensures that the registered function:
- Accepts three parameters: agent (Agent), task (Task), and event (TaskUpdateEvent)
- Handles authentication events (e.g., MCP OAuth flows requiring user login)
- Can be either synchronous or asynchronous

Execution Notes:
- The handler is called when authentication events occur (e.g., OAuth login required)
- The event.type will always be "auth_event"
- The event.data contains authentication-specific information (e.g., OAuth login URL)
- Use this for displaying authentication prompts, handling OAuth flows, etc.

Example usage:
--------------
>>> from xpander_sdk import Backend, on_auth_event
>>> 
>>> # Define handler with decorator - auto-registers globally
>>> @on_auth_event
... async def handle_auth(agent, task, event):
...     print(f"Authentication required for {agent.name}")
...     print(f"Login URL: {event.data.get('auth_url')}")
...     # Display authentication prompt to user
>>> 
>>> # Handler is automatically invoked when auth events occur
>>> backend = Backend()
>>> args = await backend.aget_args(agent_id="agent-123")  # handle_auth is called automatically
"""

from functools import wraps
from inspect import iscoroutinefunction, signature
from typing import Optional, Callable

from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.tasks.sub_modules.task import Task, TaskUpdateEvent
from xpander_sdk.modules.backend.events_registry import EventsRegistry, EventType


def on_auth_event(_func: Optional[Callable] = None):
    """
    Decorator to register a handler for authentication events.

    The decorated function is automatically registered globally and will be called
    whenever authentication events occur during agent execution (e.g., MCP OAuth flows
    requiring user login). The function:
    - Must accept three parameters: agent (Agent), task (Task), event (TaskUpdateEvent)
    - Can be either synchronous or asynchronous
    - Receives only authentication events (event.type == "auth_event")
    - Is invoked automatically - no need to pass it to aget_args/get_args

    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_auth_event`).

    Raises:
        TypeError: If the decorated function does not have the correct parameters.

    Example:
        >>> @on_auth_event
        ... async def handle_oauth_login(agent, task, event):
        ...     print(f"Agent: {agent.name}")
        ...     print(f"Task: {task.id}")
        ...     print(f"Auth data: {event.data}")
        ...     # Handle OAuth flow
        
        >>> @on_auth_event
        ... def sync_auth_handler(agent, task, event):
        ...     if 'auth_url' in event.data:
        ...         print(f"Please visit: {event.data['auth_url']}")
    """

    def decorator(func: Callable) -> Callable:
        sig = signature(func)
        params = list(sig.parameters.keys())

        # Validate function signature
        if len(params) < 3:
            raise TypeError(
                f"Function '{func.__name__}' must accept 3 parameters: agent, task, event. "
                f"Got {len(params)} parameters: {params}"
            )

        # Store the original function for later use
        @wraps(func)
        async def async_wrapper(agent: Agent, task: Task, event: TaskUpdateEvent):
            return await func(agent, task, event)

        @wraps(func)
        def sync_wrapper(agent: Agent, task: Task, event: TaskUpdateEvent):
            return func(agent, task, event)

        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper
        
        # Mark the function as an auth event handler
        wrapped._is_auth_event_handler = True
        
        # Register the handler in the singleton registry
        registry = EventsRegistry()
        registry.register_auth_event(wrapped)
        
        return wrapped

    if _func and callable(_func):
        return decorator(_func)

    return decorator


def get_registered_handlers():
    """
    Get all registered authentication event handlers.
    
    Returns:
        list: List of registered handler functions.
    """
    registry = EventsRegistry()
    return registry.get_auth_handlers()


def clear_handlers():
    """
    Clear all registered authentication event handlers.
    
    Useful for testing or when you want to reset the handlers.
    """
    registry = EventsRegistry()
    registry.clear(EventType.AUTH_EVENT)
