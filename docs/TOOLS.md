# Tools Repository Module Guide

The Tools Repository Module in xpander.ai SDK provides functionality for managing and integrating external tools and services with AI agents. It supports both local tool registration and backend-managed tools.

## Overview

This module enables developers to:

- Register local tools using decorators
- Manage tools from the backend
- Invoke tools during agent execution
- Synchronize local tools with the platform

## Classes

### ToolsRepository

Manages the collection of available tools, providing methods for tool registration, discovery, and execution.

#### Key Properties

- **`list`**: Returns all available tools (both local and backend-managed)
- **`functions`**: Returns normalized callable functions for each tool

#### Key Methods

- **`register_tool`**: Register a local tool
- **`get_tool_by_id`**: Retrieve a tool by its unique identifier
- **`should_sync_local_tools`**: Check if local tools need syncing
- **`get_local_tools_for_sync`**: Get local tools requiring synchronization

### Tool

Represents an individual tool with execution capabilities and configuration.

#### Key Methods

- **`ainvoke`**: Asynchronously invoke the tool
  - **Note**: This is an asynchronous function that can be used for invoking tools in a non-blocking manner.
- **`invoke`**: Synchronously invoke the tool
  - **Note**: This is a synchronous wrapper around the `ainvoke` function.
- **`set_configuration`**: Update tool configuration

## Examples

### Register Local Tools

```python
from xpander_sdk import register_tool

# Register a simple tool
@register_tool(
    name="weather_check",
    description="Check weather for a given location"
)
def check_weather(location: str) -> str:
    """Get weather information for a location."""
    return f"Weather in {location}: Sunny, 25°C"

# Register a tool with complex parameters
@register_tool(
    name="data_analyzer",
    description="Analyze data from multiple sources"
)
def analyze_data(data_sources: list, analysis_type: str, include_charts: bool = False) -> dict:
    """Analyze data from specified sources."""
    return {
        "sources_analyzed": len(data_sources),
        "analysis_type": analysis_type,
        "charts_included": include_charts,
        "status": "completed"
    }
```

### Use Tools Repository

```python
from xpander_sdk import ToolsRepository

# Initialize tools repository
tools_repo = ToolsRepository(configuration=config)

# List all available tools
all_tools = tools_repo.list
for tool in all_tools:
    print(f"Tool: {tool.name} - {tool.description}")

# Get a specific tool
weather_tool = tools_repo.get_tool_by_id("weather_check")

# Invoke a tool asynchronously
result = await weather_tool.ainvoke(
    agent_id="agent-123",
    payload={"location": "New York"}
)
print(f"Tool result: {result.result}")

# Invoke a tool synchronously
result = weather_tool.invoke(
    agent_id="agent-123",
    payload={"location": "London"}
)
```

### Tool Synchronization

```python
# Check if local tools need syncing
if tools_repo.should_sync_local_tools():
    local_tools = tools_repo.get_local_tools_for_sync()
    print(f"Found {len(local_tools)} tools to sync")

    for tool in local_tools:
        print(f"Syncing tool: {tool.name}")
        # Sync logic would be handled by the platform
```

### MCP Server Integration

```python
from xpander_sdk import MCPServerDetails, MCPServerType

# Configure MCP server
mcp_server = MCPServerDetails(
    name="data-server",
    type=MCPServerType.STDIO,
    command="python",
    args=["-m", "data_mcp_server"],
    env={"API_KEY": "your-api-key"}
)

# Tools from MCP servers are automatically available in the repository
```

## API Reference

### `ToolsRepository`

- **`register_tool(tool: Tool)`**: Register a local tool
  - **Parameters**: `tool` (Tool): The tool instance to register
  - **Returns**: None

- **`get_tool_by_id(tool_id: str)`**: Get tool by ID
  - **Parameters**: `tool_id` (str): Unique identifier of the tool
  - **Returns**: Tool instance

- **`should_sync_local_tools()`**: Check sync requirements
  - **Returns**: bool indicating if sync is needed

- **`get_local_tools_for_sync()`**: Get tools needing sync
  - **Returns**: List of tools requiring synchronization

### `Tool`

- **`async ainvoke(agent_id: str, payload: Any, ...)`**: Invoke tool asynchronously
  - **Parameters**:
    - `agent_id` (str): ID of the agent invoking the tool
    - `payload` (Any): Input data for the tool
    - `configuration` (Optional[Configuration]): Override configuration
    - `task_id` (Optional[str]): Associated task ID
  - **Returns**: ToolInvocationResult

- **`invoke(agent_id: str, payload: Any, ...)`**: Invoke tool synchronously
  - **Parameters**: Same as `ainvoke`
  - **Returns**: ToolInvocationResult

- **`set_configuration(configuration: Configuration)`**: Update configuration
  - **Parameters**: `configuration` (Configuration): New configuration

### `@register_tool` Decorator

```python
@register_tool(
    name: str,                    # Tool name
    description: str,             # Tool description
    should_add_to_graph: bool = True  # Add to agent graph
)
def tool_function(param1: type, param2: type = default) -> return_type:
    """Tool implementation"""
    pass
```

## Types and Models

### ToolInvocationResult

Result object returned by tool invocations:

```python
class ToolInvocationResult:
    tool_id: str                 # ID of the invoked tool
    payload: Any                 # Original payload
    result: Any                  # Tool execution result
    is_success: bool             # Success status
    is_error: bool               # Error status
    status_code: Optional[int]   # HTTP status code (if applicable)
    tool_call_id: Optional[str]  # Unique call identifier
    task_id: Optional[str]       # Associated task ID
    is_local: bool               # Whether tool was executed locally
```

### MCPServerDetails

Configuration for MCP (Model Context Protocol) servers:

```python
class MCPServerDetails:
    name: str                    # Server name
    type: MCPServerType          # Server type (STDIO, HTTP, etc.)
    command: Optional[str]       # Command to start server
    args: Optional[List[str]]    # Command arguments
    env: Optional[Dict[str, str]] # Environment variables
    url: Optional[str]           # Server URL (for HTTP type)
```

## Best Practices

### Tool Development

1. **Clear Documentation**: Provide detailed descriptions and parameter documentation
2. **Type Hints**: Use proper type hints for better SDK integration
3. **Error Handling**: Implement robust error handling in tool functions
4. **Schema Validation**: Ensure payload schemas match expected parameters

### Performance

1. **Async First**: Use asynchronous methods for better performance
2. **Caching**: Consider caching tool results when appropriate
3. **Batching**: Group related tool calls when possible

### Security

1. **Input Validation**: Always validate tool inputs
2. **Authorization**: Implement proper authorization checks
3. **Rate Limiting**: Consider rate limiting for external API calls

## Error Handling

```python
from xpander_sdk.exceptions import ModuleException

try:
    result = await tool.ainvoke(
        agent_id="agent-123",
        payload={"invalid": "data"}
    )
except ModuleException as e:
    print(f"Tool execution failed: {e.description}")
except ValueError as e:
    print(f"Invalid payload: {e}")
```

## Advanced Usage

### Custom Tool Classes

```python
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool

class CustomTool(Tool):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Custom initialization

    async def custom_method(self):
        # Custom functionality
        pass
```

### Dynamic Tool Registration

```python
def register_dynamic_tool(name: str, func: callable, description: str):
    """Dynamically register a tool at runtime."""
    tool = Tool(
        id=name,
        name=name,
        description=description,
        method="POST",
        path=f"/tools/{name}",
        is_local=True,
        fn=func
    )
    ToolsRepository.register_tool(tool)
```

## Integration Examples

### FastAPI Integration

```python
from fastapi import FastAPI
from xpander_sdk import register_tool

app = FastAPI()

@register_tool(
    name="api_endpoint",
    description="Call internal API endpoint"
)
def call_api_endpoint(endpoint: str, method: str = "GET") -> dict:
    """Call an internal API endpoint."""
    # Implementation here
    return {"status": "success", "endpoint": endpoint}
```

### Database Integration

```python
import asyncpg
from xpander_sdk import register_tool

@register_tool(
    name="query_database",
    description="Query PostgreSQL database"
)
async def query_database(query: str, params: list = None) -> list:
    """Execute a database query."""
    conn = await asyncpg.connect("postgresql://...")
    try:
        result = await conn.fetch(query, *(params or []))
        return [dict(row) for row in result]
    finally:
        await conn.close()
```

## Additional Information

- Tools are automatically available to agents once registered
- Local tools can be synchronized with the backend for persistence
- MCP servers provide additional tool integration capabilities
- Full [SDK Documentation](https://docs.xpander.ai) available online

Contact Support: dev@xpander.ai
