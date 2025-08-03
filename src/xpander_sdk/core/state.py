"""
Global state management for the xpander.ai SDK.

This module provides thread-safe singleton state management for tracking
current agent and task contexts across the SDK lifecycle.
"""

from abc import ABC
from threading import Lock
from typing import Any, Optional


class State(ABC):
    """
    Thread-safe singleton state manager for xpander.ai SDK.
    
    This class maintains global state for the current agent and task contexts,
    providing thread-safe access to state information that needs to be shared
    across different parts of the SDK.
    
    The state is particularly important for:
    - Tool execution within agent contexts
    - Task tracking and management
    - Event handling and logging
    - Resource scoping and access control
    
    Attributes:
        agent (Optional[Any]): Current agent context.
        task (Optional[Any]): Current task context.
        
    Thread Safety:
        This class implements double-checked locking to ensure thread-safe
        singleton creation while minimizing performance overhead.
        
    Example:
        >>> state = State()
        >>> state.agent = my_agent
        >>> state.task = current_task
        >>> 
        >>> # Later, from anywhere in the application
        >>> current_state = State()
        >>> print(f"Current agent: {current_state.agent}")
    """
    
    _instance: Optional["State"] = None
    _lock: Lock = Lock()

    def __new__(cls) -> "State":
        """
        Create or return the singleton State instance.
        
        Uses double-checked locking pattern to ensure thread-safe singleton
        creation without unnecessary synchronization overhead on subsequent calls.
        
        Returns:
            State: The singleton State instance.
        """
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._agent_id = None
                    cls._instance._task = None
        return cls._instance

    @property
    def agent(self) -> Optional[Any]:
        """
        Get the current agent context.
        
        Returns:
            Optional[Any]: The current agent object or None if no agent is set.
        """
        return self._agent_id

    @agent.setter
    def agent(self, value: Optional[Any]) -> None:
        """
        Set the current agent context.
        
        Args:
            value (Optional[Any]): The agent object to set as current context.
                Can be None to clear the current agent.
        """
        self._agent_id = value

    @property
    def task(self) -> Optional[Any]:
        """
        Get the current task context.
        
        Returns:
            Optional[Any]: The current task object or None if no task is set.
        """
        return self._task

    @task.setter
    def task(self, value: Optional[Any]) -> None:
        """
        Set the current task context.
        
        Args:
            value (Optional[Any]): The task object to set as current context.
                Can be None to clear the current task.
        """
        self._task = value
