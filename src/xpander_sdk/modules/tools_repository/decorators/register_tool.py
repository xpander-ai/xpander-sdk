"""
Decorator for registering local tools in the xpander.ai SDK.

This module provides the @register_tool decorator that allows developers to
register Python functions as tools that can be used by AI agents in the
xpander.ai platform.
"""

import inspect
from typing import Callable, Any, Optional, get_type_hints, Union
from pydantic import create_model
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool
from xpander_sdk.modules.tools_repository.tools_repository_module import ToolsRepository


def register_tool(
    func: Optional[Callable] = None, 
    *, 
    add_to_graph: Optional[bool] = False
) -> Union[Callable, Tool]:
    """
    Decorator to register a Python function as a tool for xpander.ai agents.
    
    This decorator automatically creates a Tool object from a Python function,
    extracting type hints and docstrings to generate a proper tool schema that
    can be used by AI agents. The decorated function becomes available in the
    tools repository and can optionally be added to agent execution graphs.
    
    Args:
        func (Optional[Callable]): The function to register (used for @register_tool syntax).
        add_to_graph (Optional[bool]): Whether to automatically add this tool to
            agent execution graphs. Defaults to False.
            
    Returns:
        Union[Callable, Tool]: The original function (preserves functionality) or
            a partial decorator when used with arguments.
            
    Raises:
        TypeError: If the decorated object is not a callable function.
        
    Example:
        >>> @register_tool
        ... def calculate_sum(a: int, b: int) -> int:
        ...     return a + b
        
        >>> @register_tool(add_to_graph=True)
        ... def fetch_weather(city: str, country: str = "US") -> str:
        ...     # Implementation here
        ...     return f"Weather for {city}, {country}"
        
        >>> # The functions remain callable as normal
        >>> result = calculate_sum(5, 3)  # Returns 8
        
        >>> # But are also available as tools
        >>> tools = ToolsRepository()
        >>> tool = tools.get_tool_by_id("calculate_sum")
    """
    
    def decorator(inner_func: Callable) -> Callable:
        """
        Inner decorator that processes the function and creates a tool.
        
        Args:
            inner_func (Callable): The function to be registered as a tool.
            
        Returns:
            Callable: The original function, unchanged in functionality.
        """
        # Extract function signature and type hints
        sig = inspect.signature(inner_func)
        hints = get_type_hints(inner_func)

        # Build Pydantic model for function arguments
        fields = {}
        for name, param in sig.parameters.items():
            annotation = hints.get(name, Any)
            default = param.default if param.default is not inspect.Parameter.empty else ...
            fields[name] = (annotation, default)

        # Create a Pydantic model class for argument validation
        ArgsModel = create_model(f"{inner_func.__name__.title()}Args", **fields)  # type: ignore

        # Create Tool object with extracted metadata
        tool = Tool(
            id=inner_func.__name__,
            name=inner_func.__name__,
            method="POST",
            path=f"/tools/{inner_func.__name__}",
            description=inspect.getdoc(inner_func) or "",
            parameters=ArgsModel.model_json_schema(mode="serialization"),
            fn=inner_func,
            is_local=True,
            should_add_to_graph=add_to_graph
        )

        # Register the tool in the global repository
        ToolsRepository.register_tool(tool)
        
        # Return the original function unchanged
        return inner_func

    # Handle both @register_tool and @register_tool(...) syntax
    if func is None:
        # Called with arguments: @register_tool(add_to_graph=True)
        return decorator
    else:
        # Called without parentheses: @register_tool
        return decorator(func)
