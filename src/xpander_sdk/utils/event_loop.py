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
    runtime errors. For uvloop compatibility, it uses asyncio.create_task
    and waits for completion instead of nest_asyncio when uvloop is detected.
    
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
            # Check if we're running with uvloop
            loop_module = type(loop).__module__
            if 'uvloop' in loop_module.lower():
                # uvloop doesn't support nest_asyncio, so we need a different approach
                # Create a task and run it in the current loop context
                import concurrent.futures
                
                # Use a separate thread with a new event loop
                def _run_in_thread():
                    new_loop = asyncio.new_event_loop()
                    asyncio.set_event_loop(new_loop)
                    try:
                        return new_loop.run_until_complete(coro)
                    finally:
                        new_loop.close()
                
                with concurrent.futures.ThreadPoolExecutor() as executor:
                    future = executor.submit(_run_in_thread)
                    return future.result()
            else:
                # Use `nest_asyncio` for standard asyncio loops
                import nest_asyncio
                nest_asyncio.apply()
                return loop.run_until_complete(coro)
    except RuntimeError:
        # No event loop in this context, safe to run
        return asyncio.run(coro)
