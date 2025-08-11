"""
xpander_sdk.decorators.on_boot

This module provides the `@on_boot` decorator, which allows developers to define
boot functions that execute before event listeners are set up in xpander.ai's event system.

The decorator ensures that the registered function:
- Can be either synchronous or asynchronous
- Executes before any event listeners are initialized
- Handles initialization logic, setup tasks, or pre-processing

Execution Notes:
- Boot handlers execute once during the application startup phase
- They run before event listeners are registered and task processing begins
- If an exception is raised in the function, the application will fail to start
- Use boot handlers for initialization tasks like database connections, configuration loading, etc.

Example usage:
--------------
>>> @on_boot
... async def initialize_database():
...     database = Database()
...     await database.connect()
...     logger.info("Database connected successfully")

>>> @on_boot  
... def load_configuration():
...     config = load_config_file()
...     validate_config(config)
...     logger.info("Configuration loaded and validated")
"""

import asyncio
from functools import wraps
from inspect import iscoroutinefunction
from typing import Optional, Callable

from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.events.events_module import Events


def on_boot(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None
):
    """
    Decorator to register a handler as a boot event executor.

    The decorated function will be executed during the application boot phase, before
    any event listeners are set up. The function:
    - Can be either synchronous or asynchronous
    - Should handle initialization logic or setup tasks
    - Will be executed only once during application startup

    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_boot`).
        configuration (Optional[Configuration]):
            An optional configuration object used to initialize the Events module.

    Example:
        >>> @on_boot
        ... async def initialize_services():
        ...     await setup_database()
        ...     await connect_external_apis()
        ...     logger.info("All services initialized")
        
        >>> @on_boot
        ... def load_environment():
        ...     load_dotenv()
        ...     validate_environment_variables()
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
        Events.register_boot_handler(wrapped)

        return wrapped

    if _func and callable(_func):
        return decorator(_func)

    return decorator
