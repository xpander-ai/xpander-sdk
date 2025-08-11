"""
xpander_sdk.decorators.on_shutdown

This module provides the `@on_shutdown` decorator, which allows developers to define
shutdown functions that execute when the application is exiting from xpander.ai's event system.

The decorator ensures that the registered function:
- Can be either synchronous or asynchronous
- Executes during application shutdown phase
- Handles cleanup logic, resource disposal, or finalization tasks

Execution Notes:
- Shutdown handlers execute when the application is terminating
- They run after event listeners are stopped but before final cleanup
- If an exception is raised in the function, it will be logged but won't prevent shutdown
- Use shutdown handlers for cleanup tasks like closing database connections, saving state, etc.

Example usage:
--------------
>>> @on_shutdown
... async def cleanup_database():
...     database = get_database_connection()
...     await database.close()
...     logger.info("Database connection closed")

>>> @on_shutdown  
... def save_application_state():
...     state = get_current_state()
...     save_state_to_file(state)
...     logger.info("Application state saved")
"""

import asyncio
from functools import wraps
from inspect import iscoroutinefunction
from typing import Optional, Callable

from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.events.events_module import Events


def on_shutdown(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None
):
    """
    Decorator to register a handler as a shutdown event executor.

    The decorated function will be executed during the application shutdown phase, after
    event listeners are stopped. The function:
    - Can be either synchronous or asynchronous
    - Should handle cleanup logic or resource disposal
    - Will be executed once during application shutdown

    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_shutdown`).
        configuration (Optional[Configuration]):
            An optional configuration object used to initialize the Events module.

    Example:
        >>> @on_shutdown
        ... async def cleanup_resources():
        ...     await close_database_connections()
        ...     await cleanup_temp_files()
        ...     logger.info("All resources cleaned up")
        
        >>> @on_shutdown
        ... def save_final_state():
        ...     save_application_metrics()
        ...     logger.info("Final state saved")
    """

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            return await func(*args, **kwargs)

        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            return func(*args, **kwargs)

        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper

        # Register handler directly on Events class without instantiating
        Events.register_shutdown_handler(wrapped)

        return wrapped

    if _func and callable(_func):
        return decorator(_func)

    return decorator
