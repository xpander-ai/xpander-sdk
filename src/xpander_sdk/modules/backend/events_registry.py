"""
Events Registry - Singleton pattern for managing event handlers and hooks.

This registry supports multiple event types:
- Authentication events (OAuth flows)
- Tool call hooks (pre/post/error) - Coming soon
"""

from typing import Callable, List, Optional, Dict, Any
from enum import Enum
import asyncio


class EventType(str, Enum):
    """Supported event types in the backend module."""
    AUTH_EVENT = "auth_event"
    TOOL_PRE_CALL = "tool_pre_call"  # Future: before tool execution
    TOOL_POST_CALL = "tool_post_call"  # Future: after successful tool execution
    TOOL_ERROR = "tool_error"  # Future: when tool execution fails


class EventsRegistry:
    """
    Singleton registry for managing event handlers and hooks.
    
    This registry maintains handlers for different event types and provides
    methods to register, retrieve, and invoke them.
    
    Supported event types:
    - AUTH_EVENT: Authentication events (e.g., MCP OAuth flows)
    - TOOL_PRE_CALL: Before tool execution (future)
    - TOOL_POST_CALL: After successful tool execution (future)
    - TOOL_ERROR: When tool execution fails (future)
    """
    
    _instance: Optional['EventsRegistry'] = None
    _handlers: Dict[EventType, List[Callable]] = {}
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._handlers = {
                EventType.AUTH_EVENT: [],
                EventType.TOOL_PRE_CALL: [],
                EventType.TOOL_POST_CALL: [],
                EventType.TOOL_ERROR: [],
            }
        return cls._instance
    
    def register(self, event_type: EventType, handler: Callable) -> None:
        """
        Register an event handler for a specific event type.
        
        Args:
            event_type (EventType): The type of event to handle.
            handler (Callable): The handler function to register.
        """
        if event_type not in self._handlers:
            self._handlers[event_type] = []
        
        if handler not in self._handlers[event_type]:
            self._handlers[event_type].append(handler)
    
    def register_auth_event(self, handler: Callable) -> None:
        """
        Register an authentication event handler.
        
        Args:
            handler (Callable): The handler function to register.
        """
        self.register(EventType.AUTH_EVENT, handler)
    
    def get_handlers(self, event_type: EventType) -> List[Callable]:
        """
        Get all registered handlers for a specific event type.
        
        Args:
            event_type (EventType): The type of event.
        
        Returns:
            List[Callable]: List of registered handler functions.
        """
        return self._handlers.get(event_type, []).copy()
    
    def get_auth_handlers(self) -> List[Callable]:
        """
        Get all registered authentication event handlers.
        
        Returns:
            List[Callable]: List of registered auth handler functions.
        """
        return self.get_handlers(EventType.AUTH_EVENT)
    
    def clear(self, event_type: Optional[EventType] = None) -> None:
        """
        Clear registered handlers.
        
        Args:
            event_type (Optional[EventType]): If provided, clear only handlers
                for this event type. If None, clear all handlers.
        """
        if event_type:
            if event_type in self._handlers:
                self._handlers[event_type].clear()
        else:
            for handlers_list in self._handlers.values():
                handlers_list.clear()
    
    async def invoke_handlers(self, event_type: EventType, *args, **kwargs) -> None:
        """
        Invoke all registered handlers for a specific event type.
        
        Args:
            event_type (EventType): The type of event to invoke handlers for.
            *args: Positional arguments to pass to handlers.
            **kwargs: Keyword arguments to pass to handlers.
        """
        handlers = self._handlers.get(event_type, [])
        
        for handler in handlers:
            try:
                if asyncio.iscoroutinefunction(handler):
                    await handler(*args, **kwargs)
                else:
                    handler(*args, **kwargs)
            except Exception as e:
                # Log error but continue with other handlers
                from loguru import logger
                logger.error(f"Error in {event_type.value} handler {handler.__name__}: {e}")
    
    async def invoke_auth_handlers(self, agent, task, event) -> None:
        """
        Invoke all registered authentication event handlers.
        
        Args:
            agent: The Agent object associated with the task.
            task: The Task object being executed.
            event: The TaskUpdateEvent containing authentication event data.
        """
        await self.invoke_handlers(EventType.AUTH_EVENT, agent, task, event)
    
    def has_handlers(self, event_type: EventType) -> bool:
        """
        Check if any handlers are registered for a specific event type.
        
        Args:
            event_type (EventType): The type of event.
        
        Returns:
            bool: True if at least one handler is registered, False otherwise.
        """
        return len(self._handlers.get(event_type, [])) > 0
    
    def has_auth_handlers(self) -> bool:
        """
        Check if any authentication event handlers are registered.
        
        Returns:
            bool: True if at least one auth handler is registered, False otherwise.
        """
        return self.has_handlers(EventType.AUTH_EVENT)
    
    @classmethod
    def reset(cls) -> None:
        """
        Reset the singleton instance.
        
        Useful for testing to ensure a clean state.
        """
        if cls._instance is not None:
            cls._instance.clear()
            cls._instance = None
