"""
xpander_sdk.decorators.on_task

This module provides the `@on_task` decorator, which allows developers to define
task execution functions that integrate with xpander.ai’s event system.

The decorator ensures that the registered function:
- Accepts a single parameter named `task` of type `Task`
- Returns the modified `Task` after processing
- Optionally works with both sync and async function styles

Execution Notes:
- The task executor automatically handles status transitions (e.g., success or failure).
- You must set `task.result = ...` to assign your output.
- If an exception is raised in the function, the task will be marked as failed.
- You do not need to manually manage status or lifecycle hooks.

Example usage:
--------------
>>> @on_task
... async def handle_agent_task(task: Task):
...     backend = Backend(task.configuration)
...     agno_args = await backend.aget_args(
...         agent_id=task.agent_id,
...         agent_version=task.agent_version,
...         task=task
...     )
...     agno_agent = Agent(**agno_args)
...     result = await agno_agent.arun(message=task.to_message())
...     task.result = result.content
...     return task
"""

import asyncio
from functools import wraps
from inspect import iscoroutinefunction, signature
from typing import Optional, Callable

from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.events.events_module import Events
from xpander_sdk.modules.tasks.models.task import LocalTaskTest
from xpander_sdk.modules.tasks.sub_modules.task import Task


def on_task(
    _func: Optional[Callable] = None,
    *,
    configuration: Optional[Configuration] = None,
    test_task: Optional[LocalTaskTest] = None
):
    """
    Decorator to register a handler as an event-driven task executor.

    The decorated function will be executed when the task is triggered through
    xpander.ai’s event system. The function:
    - Must accept a single parameter named `task` of type `Task`
    - Must return the `Task` instance after applying changes
    - Should assign the final output using `task.result`
    - Does not need to set the task status; it's handled automatically

    - Supports both synchronous and asynchronous functions
    - Automatically transitions task statuses based on function outcome
    Args:
        _func (Optional[Callable]):
            The function to decorate (for direct usage like `@on_task`).
        configuration (Optional[Configuration]):
            An optional configuration object used to initialize the Events module.
        test_task (Optional[LocalTaskTest]):
            Optional simulated task used for local development or testing.

    Raises:
        TypeError: If the decorated function does not accept a `task` parameter.
        TypeError: If `test_task` is provided but is not a `LocalTaskTest`.
        TypeError: If the input `task` is not an instance of `Task`.
        TypeError: If the return value is not an instance of `Task`.

    Example:
        >>> @on_task
        ... async def handle_agent_task(task: Task):
        ...     backend = Backend(task.configuration)
        ...     agno_args = await backend.aget_args(
        ...         agent_id=task.agent_id,
        ...         agent_version=task.agent_version,
        ...         task=task
        ...     )
        ...     agno_agent = Agent(**agno_args)
        ...     result = await agno_agent.arun(message=task.to_message())
        ...     task.result = result.content
        ...     return task
    """

    def decorator(func: Callable) -> Callable:
        sig = signature(func)

        if 'task' not in sig.parameters:
            raise TypeError(f"Function '{func.__name__}' must have a 'task' parameter.")

        if test_task and not isinstance(test_task, LocalTaskTest):
            raise TypeError(
                f"'test_task' must be an instance of LocalTaskTest, got {type(test_task).__name__}"
            )

        param_names = list(sig.parameters)

        def get_task_from_call(args, kwargs) -> Task:
            if 'task' in kwargs:
                task_value = kwargs['task']
            else:
                task_index = param_names.index('task')
                task_value = args[task_index] if len(args) > task_index else None
            if not isinstance(task_value, Task):
                raise TypeError(
                    f"'task' must be an instance of Task, got {type(task_value).__name__}"
                )
            return task_value

        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            get_task_from_call(args, kwargs)
            result = await func(*args, **kwargs)
            if not isinstance(result, Task):
                raise TypeError(
                    f"Function '{func.__name__}' must return an instance of Task, got {type(result).__name__}"
                )
            return result

        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            get_task_from_call(args, kwargs)
            result = func(*args, **kwargs)
            if not isinstance(result, Task):
                raise TypeError(
                    f"Function '{func.__name__}' must return an instance of Task, got {type(result).__name__}"
                )
            return result

        wrapped = async_wrapper if iscoroutinefunction(func) else sync_wrapper

        events_module = Events(configuration=configuration)
        events_module.register(on_task=wrapped, test_task=test_task)

        return wrapped

    if _func and callable(_func):
        return decorator(_func)

    return decorator
