"""
Decorator for handling task execution within the xpander.ai events system.

This module provides the @on_task decorator, allowing developers to define
task execution logic that integrates seamlessly with the event system, whether
in synchronous or asynchronous environments.
"""

import asyncio
from functools import wraps
from inspect import iscoroutinefunction, signature
from typing import Optional, Callable

from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.events.events_module import Events
from xpander_sdk.modules.tasks.models.task import LocalTaskTest
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tasks.tasks_module import Tasks


def on_task(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None,
    test_task: Optional[LocalTaskTest] = None
):
    """
    Decorator to register a handler as an event-driven task executor.
    
    This decorator registers a function as both a synchronous or asynchronous
    task handler that receives dynamic updates from the xpander.ai event system.
    The function must accept a 'task' parameter representing the task being executed.
    
    Args:
        _func (Optional[Callable]): Function to decorate, if used directly.
        configuration (Optional[Configuration]): SDK configuration to use.
        test_task (Optional[LocalTaskTest]): Local test task configuration.
        
    Raises:
        TypeError: If the decorated function doesn't accept a 'task' parameter.
        TypeError: If test_task is not an instance of LocalTaskTest.
        
    Example:
        >>> @on_task
        ... def handle_task(task):
        ...     # process the task
        
        >>> @on_task(configuration=my_config, test_task=my_test_task)
        ... async def async_handle_task(task):
        ...     # process the task asynchronously
    """
    
    def decorator(func: Callable) -> Callable:
        """
        Inner decorator to register the event-driven task handler.
        
        Args:
            func (Callable): The function to register as a task handler.
            
        Returns:
            Callable: The same function, with added registration logic.
        """
        sig = signature(func)

        if 'task' not in sig.parameters:
            raise TypeError(f"Function '{func.__name__}' must have a 'task' parameter.")

        if test_task:
            if not isinstance(test_task, LocalTaskTest):
                raise TypeError(f"'test_task' must be an instance of LocalTaskTest, got {type(test_task).__name__}")

        param_names = list(sig.parameters)

        def get_task_from_call(args, kwargs) -> Task:
            if 'task' in kwargs:
                task_value = kwargs['task']
            else:
                task_index = param_names.index('task')
                task_value = args[task_index] if len(args) > task_index else None
            if not isinstance(task_value, Task):
                raise TypeError(f"'task' must be an instance of Task, got {type(task_value).__name__}")
            return task_value

        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            get_task_from_call(args, kwargs)
            return await func(*args, **kwargs)

        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            get_task_from_call(args, kwargs)
            return func(*args, **kwargs)

        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper

        events_module = Events(configuration=configuration)
        events_module.register(on_task=wrapped, test_task=test_task)

        return wrapped

    if _func and callable(_func):
        return decorator(_func)

    return decorator
