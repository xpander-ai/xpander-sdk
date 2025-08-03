"""
Tools Repository module for managing tools in the xpander.ai platform.

This module provides functionality to register, list, and manage tools within
the xpander.ai Backend-as-a-Service platform, supporting tool syncronization and
integration with AI agents.
"""

import asyncio
from inspect import Parameter, Signature
from typing import Any, Callable, ClassVar, List, Optional, Type
from pydantic import BaseModel, computed_field
from xpander_sdk.core.state import State
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.shared import XPanderSharedModel
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool


def _convert_parameter_value(value: Any, param_schema: dict) -> Any:
    """Convert parameter value based on JSON schema type information."""
    param_type = param_schema.get("type")

    if param_type == "array" and not isinstance(value, list):
        # Convert single values to arrays when schema expects array
        return [value] if value is not None else []
    elif param_type == "string" and not isinstance(value, str):
        # Convert to string if needed
        return str(value) if value is not None else ""
    elif param_type == "integer" and not isinstance(value, int):
        # Convert to int if needed
        return int(value) if value is not None else 0
    elif param_type == "number" and not isinstance(value, (int, float)):
        # Convert to number if needed
        return float(value) if value is not None else 0.0
    elif param_type == "boolean" and not isinstance(value, bool):
        # Convert to boolean if needed
        return bool(value) if value is not None else False

    return value


class ToolsRepository(XPanderSharedModel):
    """
    Repository for managing tools in xpander.ai.

    This class provides methods for tool registration, discovery, and
    management. It supports dealing with both local tools defined via decorators
    and tools managed by the backend, ensuring integration consistency.

    Attributes:
        configuration (Optional[Configuration]): SDK configuration.
        tools (List[Tool]): List of tools managed by the backend.
        _local_tools (ClassVar[List[Tool]]): Registry of tools defined via decorators.

    Methods:
        register_tool: Register a local tool.
        list: Return a list of all tools.
        get_tool_by_id: Retrieve a tool by its ID.
        should_sync_local_tools: Check if local tools need syncing.
        get_local_tools_for_sync: Retrieve local tools that require syncing.
        functions: Return normalized callable functions for each tool.

    Example:
        >>> repo = ToolsRepository()
        >>> tools = repo.list
        >>> specific_tool = repo.get_tool_by_id("tool-id")
    """

    configuration: Optional[Configuration] = Configuration()

    # Mutable list that can be set/overwritten by backend
    tools: List[Tool] = []

    # Immutable registry for tools defined via decorator
    _local_tools: ClassVar[List[Tool]] = []

    @classmethod
    def register_tool(cls, tool: Tool):
        """
        Register a new local tool.

        Args:
            tool (Tool): The tool to register.
        """
        cls._local_tools.append(tool)

    @computed_field
    @property
    def list(self) -> List[Tool]:
        """
        Return a list of all available tools.

        Merges both backend-managed tools and locally registered tools,
        ensuring no duplicate IDs. Sets each tool's configuration for
        further communication.

        Returns:
            List[Tool]: A list of all available tools.
        """
        # Merge _local_tools and _tools, ensuring no duplicates by id
        all_tools = {tool.id: tool for tool in self.tools}
        for local_tool in self._local_tools:
            all_tools.setdefault(local_tool.id, local_tool)

        tools: List[Tool] = list(all_tools.values())

        for tool in tools:
            tool.set_configuration(configuration=self.configuration)

        return tools

    def get_tool_by_id(self, tool_id: str):
        """
        Retrieve a tool by its unique identifier.

        Args:
            tool_id (str): The ID of the tool to retrieve.

        Returns:
            Tool: The tool corresponding to the given ID.
        """
        return next((tool for tool in self.list if tool.id == tool_id))

    def should_sync_local_tools(self):
        """
        Determine if local tools need to be synchronized with the backend.

        Checks whether any local tool is marked for graph addition and
        has not been synced yet.

        Returns:
            bool: True if any local tools need syncing, False otherwise.
        """
        return any(tool.is_local and tool.should_add_to_graph for tool in self.list)

    def get_local_tools_for_sync(self):
        """
        Retrieve local tools that require synchronization with the backend.

        Returns:
            List[Tool]: List of local tools marked for graph addition that are not yet synced.
        """
        return [
            tool
            for tool in self.list
            if tool.is_local and tool.should_add_to_graph and not tool.is_synced
        ]

    @computed_field
    @property
    def functions(self) -> List[Callable[..., Any]]:
        """
        Get a list of normalized callable functions for each registered tool.

        Each function is designed to accept a single payload matching the
        tool's expected schema, allowing for direct execution with
        schema-validated data.

        Returns:
            List[Callable[..., Any]]: List of callable functions corresponding to tools.
        """
        fn_list = []

        for tool in self.list:
            schema_cls: Type[BaseModel] = tool.schema

            # Create closure to capture tool and schema_cls
            def make_tool_function(tool_ref, schema_ref):
                def tool_function(payload: schema_ref) -> Any:
                    """
                    Normalized tool function that accepts a single Pydantic model payload.
                    This payload exactly matches the tool's expected schema structure.
                    """

                    # Convert the validated Pydantic model to a dict for the backend
                    payload_dict = payload.model_dump()

                    async def _run():
                        result = await tool_ref.ainvoke(
                            agent_id=State().agent.id,
                            payload=payload_dict,
                            configuration=self.configuration,
                            task_id=State().task.id if State().task else None,
                        )
                        return result

                    try:
                        loop = asyncio.get_running_loop()
                    except RuntimeError:
                        return asyncio.run(_run())
                    else:
                        return loop.run_until_complete(_run())

                # Set metadata for agno compatibility
                tool_function.__name__ = tool_ref.id
                tool_function.__doc__ = tool_ref.description or tool_ref.name

                # Create signature manually since the type annotation approach doesn't work
                payload_param = Parameter(
                    name="payload",
                    kind=Parameter.POSITIONAL_OR_KEYWORD,
                    annotation=schema_ref,
                )
                tool_function.__signature__ = Signature([payload_param])

                return tool_function

            fn = make_tool_function(tool, schema_cls)
            fn_list.append(fn)

        return fn_list
