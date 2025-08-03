# Tools Repository Module

The Tools Repository Module provides extensive functionality for managing and integrating external tools and services within the xpander.ai platform. It supports both local tool registration and backend-managed tools.

## Overview

This module handles:

- Tool registration and management
- Tool execution and invocation within tasks
- Synchronization with backend services
- Integration with MCP servers
- Asynchronous and synchronous operations

## Structure

```
tools_repository/
├── tools_repository_module.py    # Main module interface
├── models/                     # Tool-related data models
│   ├── tool_invocation_result.py # Result of tool executions
│   └── mcp.py                  # MCP server configurations
├── sub_modules/                # Sub-modules for additional functionalities
│   └── tool.py               # Core tool class
└── utils/                      # Utility functions
    └── schemas.py             # Schema-related utilities
```

## Key Classes

### `ToolsRepository`

Interface for tool management operations.

**Methods:**

- `register_tool()` / `get_tool_by_id()`: Manage local tools
- `list()`: List all available tools
- Support for asynchronous and synchronous operations

### `Tool`

Instance of a single tool with execution capabilities.

**Key Features:**

- Registration and configuration
- Invocation (`ainvoke()` / `invoke()`)
- Schema-based validation
- Result handling and logging

## Usage Examples

### Tool Management

```python
from xpander_sdk import ToolsRepository, Tool

# Initialize repository
tools_repo = ToolsRepository()

# Register a local tool
@tools_repo.register_tool
def example_tool(data):
    return f"Data: {data}"

# List tools
all_tools = tools_repo.list
for tool in all_tools:
    print(f"Tool: {tool.name}")
```

### Tool Invocation

```python
# Invoke a tool asynchronously
result = await tool.ainvoke(
    agent_id="agent-123",
    payload={"data": "Example data"}
)

# Synchronous invocation
result = tool.invoke(
    agent_id="agent-123",
    payload={"data": "Example data"}
)
```

## Configuration

Tools support various configuration options:

- **Schema**: Parameter definitions and validation
- **MCP Servers**: Integration with server-based tools
- **Execution**: Asynchronous execution for enhanced performance

## API Reference

See the main [Tools Guide](/docs/TOOLS.md) for detailed API documentation.

## Types and Models

The module includes comprehensive type definitions for:

- Tools configuration and metadata
- Execution inputs and outputs
- Schema validation
- MCP server integration

## Best Practices

1. **Async First**: Use asynchronous methods for high-throughput applications
2. **Schema Validation**: Ensure strong validation for tool inputs
3. **Configuration**: Use environment variables for sensitive settings
4. **Resource Management**: Handle resources efficiently, especially for large-scale deployments

## Dependencies

- `httpx`: HTTP client for API communication
- `pydantic`: Data validation and serialization
- `loguru`: Logging functionality
- `asyncio`: Asynchronous programming support

## Contributing

When contributing to this module:

1. Ensure backward compatibility with existing functionality
2. Include comprehensive tests and update existing tests
3. Update documentation for any API changes
4. Follow established code style and patterns

For more information, see the [main documentation](/docs/TOOLS.md).
