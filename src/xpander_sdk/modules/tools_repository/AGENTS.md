# Tools Repository Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Tools Repository module of the xpander.ai SDK.

## Module Overview

The Tools Repository module provides extensive functionality for managing and integrating external tools and services within the xpander.ai platform. It supports both local tool registration and backend-managed tools with MCP server integration.

## Module Structure for AI Agents

```
tools_repository/
├── tools_repository_module.py    # Main module interface - entry point AI agents should understand
├── decorators/                   # Decorator utilities for tool registration
│   └── register_tool.py         # @register_tool decorator
├── models/                       # Tool-related data models
│   ├── tool_invocation_result.py # Result of tool executions
│   └── mcp.py                   # MCP server configurations
├── sub_modules/                 # Sub-modules for additional functionalities
│   └── tool.py                 # Core tool class
└── utils/                       # Utility functions
    └── schemas.py              # Schema-related utilities
```

## Coding Conventions for AI Agents

### Tool-Specific Conventions

- AI agents should use the `@register_tool` decorator for local tool registration
- AI agents should use the `ToolsRepository` class for tool management operations
- AI agents should use the `Tool` class for individual tool operations (invoke, configure)
- Follow the async-first pattern: `ainvoke()`, `aget_tool_by_id()` for production code
- Use proper type hints with tool-specific models from `/models/`

### Tool Registration Patterns

- AI agents should use descriptive names and clear descriptions for tools
- Include comprehensive parameter documentation with type hints
- AI agents should implement proper error handling in tool functions
- Use schema validation for tool parameters

### Tool Invocation Patterns

- AI agents should handle `ToolInvocationResult` objects properly
- Implement proper logging for tool execution results
- AI agents should validate tool payloads before invocation

## API Patterns for AI Agents

### Tool Registration Operations

```python
# Correct pattern for registering local tools
from xpander_sdk import register_tool

@register_tool(
    name="data_analyzer",
    description="Analyze data from multiple sources",
    should_add_to_graph=True
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

### Tool Management Operations

```python
# Correct pattern for tool repository operations
tools_repo = ToolsRepository(configuration=config)

# List all available tools
all_tools = tools_repo.list
for tool in all_tools:
    print(f"Tool: {tool.name} - {tool.description}")

# Get a specific tool
weather_tool = tools_repo.get_tool_by_id("weather_check")
```

### Tool Invocation Operations

```python
# AI agents should use the standard tool invocation pattern
result = await tool.ainvoke(
    agent_id="agent-123",
    payload={"location": "New York"},
    task_id="task-456"  # Optional
)

# Handle invocation result properly
if result.is_success:
    print(f"Tool result: {result.result}")
else:
    print(f"Tool execution failed: {result.status_code}")
```

## Data Models and Types for AI Agents

### Core Tool Models

- `Tool`: Main tool entity with execution capabilities
- `ToolInvocationResult`: Results from tool execution
- `ToolConfiguration`: Tool setup and parameters
- `ToolSchema`: Parameter definitions and validation

### MCP Integration Models

- `MCPServerDetails`: MCP server configuration
- `MCPServerType`: Server type enumeration (STDIO, HTTP, etc.)
- `MCPServerAuthType`: Authentication type enumeration

## Testing Requirements for AI Agents

### Tool-Specific Tests

```bash
# Run tools repository module tests
pytest tests/test_tools_repository.py

# Run specific tool functionality tests
pytest tests/test_tools_repository.py::test_tool_registration
pytest tests/test_tools_repository.py::test_tool_invocation
pytest tests/test_tools_repository.py::test_mcp_integration
```

### Test Patterns AI Agents Should Follow

- Mock external tool dependencies and API calls
- Test both local and remote tool execution paths
- Verify proper error handling for tool failures
- Test tool parameter validation and schema compliance
- Mock MCP server communications for integration tests

## Best Practices for AI Agents

### Tool Development Guidelines

1. **Clear Documentation**: Provide detailed descriptions and parameter documentation
2. **Type Hints**: Use proper type hints for better SDK integration
3. **Error Handling**: Implement robust error handling in tool functions
4. **Schema Validation**: Ensure payload schemas match expected parameters

### Performance Considerations

- AI agents should use async methods for tool invocations
- Implement caching for tool results when appropriate
- Use batching for multiple tool calls when possible
- AI agents should handle tool timeouts gracefully

### Security Guidelines

- AI agents should validate all tool inputs before execution
- Implement proper authorization checks for sensitive tools
- Never log sensitive data in tool execution logs
- Use environment variables for tool credentials

## Integration Guidelines for AI Agents

### Agent Integration

- Tools are automatically available to agents once registered
- AI agents should register tools before agent creation when possible
- Handle agent-tool associations correctly

### MCP Server Integration

```python
# Configure MCP server for tool integration
from xpander_sdk import MCPServerDetails, MCPServerType

mcp_server = MCPServerDetails(
    name="data-server",
    type=MCPServerType.STDIO,
    command="python",
    args=["-m", "data_mcp_server"],
    env={"API_KEY": "your-api-key"}
)

# Tools from MCP servers are automatically available in the repository
```

### Tool Synchronization

- AI agents should check `should_sync_local_tools()` for sync requirements
- Use `get_local_tools_for_sync()` to get tools needing synchronization
- Handle synchronization errors gracefully

## Common Patterns AI Agents Should Follow

### Tool Factory Pattern

```python
def create_database_tool(db_connection: str) -> Tool:
    """Create a database tool with specific connection."""

    @register_tool(
        name=f"query_db_{hash(db_connection)}",
        description="Query database with specific connection"
    )
    async def query_database(query: str) -> list:
        # Implementation here
        return results

    return tools_repo.get_tool_by_id(f"query_db_{hash(db_connection)}")
```

### Batch Tool Execution Pattern

```python
async def execute_tools_batch(tools_and_payloads: list, agent_id: str):
    """Execute multiple tools in batch."""
    results = []

    for tool, payload in tools_and_payloads:
        try:
            result = await tool.ainvoke(
                agent_id=agent_id,
                payload=payload
            )
            results.append(result)
        except Exception as e:
            logger.error(f"Tool {tool.name} failed: {e}")
            results.append(None)

    return results
```

### Error Handling Patterns

```python
from xpander_sdk.exceptions import ModuleException

try:
    result = await tool.ainvoke(
        agent_id="agent-123",
        payload={"invalid": "data"}
    )
except ModuleException as e:
    logger.error(f"Tool execution failed: {e.description}")
except ValueError as e:
    logger.error(f"Invalid payload: {e}")
```

## Tool Schema Guidelines for AI Agents

### Parameter Definition

- AI agents should use clear parameter names and descriptions
- Include default values where appropriate
- Use proper Python type hints for automatic schema generation
- Document parameter constraints and validation rules

### Schema Validation

- Validate tool inputs before execution
- Provide clear error messages for invalid parameters
- AI agents should handle missing required parameters gracefully

## Advanced Usage Patterns for AI Agents

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

## Troubleshooting for AI Agents

### Common Issues

1. **Tool not found**: Verify tool registration and ID consistency
2. **Invocation failures**: Check tool parameters and payload format
3. **MCP server errors**: Validate server configuration and connectivity
4. **Schema validation errors**: Ensure payload matches expected schema

### Debugging Tips

- Enable debug logging for tool execution details
- Use proper exception handling to capture tool errors
- Verify tool registration and availability before invocation
- Check MCP server logs for integration issues

## Module-Specific Environment Variables

Optional for tool operations:

- `XPANDER_TOOL_TIMEOUT`: Default timeout for tool execution
- `XPANDER_MCP_SERVER_TIMEOUT`: Timeout for MCP server communications
- Tool-specific environment variables as required by individual tools

For more information, see the [main Tools documentation](/docs/TOOLS.md).
