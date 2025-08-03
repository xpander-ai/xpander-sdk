"""
Utilities for managing event loop execution in the xpander.ai SDK.

This module provides utilities for handling asyncio event loops, enabling
synchronous execution of coroutines in environments that may not natively
support asynchronous operations.
"""

import asyncio
from typing import Any, Awaitable


def run_sync(coro: Awaitable[Any]) -> Any:
    """
    Synchronously run an asynchronous coroutine, ensuring compatibility
    with nested event loops in environments like Jupyter Notebooks or
    web frameworks such as FastAPI.
    
    This function detects and manages running event loops to prevent
    runtime errors, applying the `nest_asyncio` package if necessary
    to allow reentrant execution.
    
    Args:
        coro (Awaitable[Any]): The coroutine to be executed.
        
    Returns:
        Any: The result of the coroutine execution.
        
    Example:
        >>> async def fetch_data():
        ...     # simulate async operation
        ...     await asyncio.sleep(1)
        ...     return "data"
        
        >>> result = run_sync(fetch_data())
        >>> print(result)  # Outputs: "data"
    """
    try:
        loop = asyncio.get_running_loop()
        if loop.is_running():
            # Use `nest_asyncio` to allow nested event loops (e.g., Jupyter, FastAPI)
            import nest_asyncio
            nest_asyncio.apply()
            return loop.run_until_complete(coro)
    except RuntimeError:
        # No event loop in this context, safe to run
        return asyncio.run(coro)
