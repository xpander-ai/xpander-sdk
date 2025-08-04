# Agents Module

The Agents Module provides comprehensive functionality for creating, managing, and executing AI agents within the xpander.ai platform.

## Overview

This module handles:
- Agent creation and configuration
- Task execution and management
- Tool integration and MCP server configuration
- Agent graph management and execution flow
- Storage and memory management

## Structure

```
agents/
├── agents_module.py          # Main module interface
├── models/                   # Data models
│   ├── agent.py             # Agent configuration models
│   ├── agent_list.py        # Agent listing models
│   └── knowledge_bases.py   # Agent knowledge base models
├── sub_modules/             # Core functionality
│   └── agent.py            # Agent class implementation
└── utils/                   # Utility functions
    └── generic.py          # Helper functions
```

## Key Classes

### `Agents`
Main interface for agent management operations.

**Methods:**
- `alist()` / `list()`: List all available agents
- `aget(agent_id)` / `get(agent_id)`: Retrieve specific agent
- Support for both async and sync operations

### `Agent`
Individual agent instance with full functionality.

**Key Features:**
- Task execution (`arun()` / `run()`)
- Tool management and invocation
- Knowledge base integration
- MCP server configuration
- Graph-based execution flow
- Memory and storage management

**Methods:**
- `aload()` / `load()`: Load agent from backend  
- `acreate_task()` / `create_task()`: Create and execute tasks
- `ainvoke_tool()` / `invoke_tool()`: Call tools
- `aget_knowledge_bases()` / `get_knowledge_bases()`: Access linked knowledge bases
- `aget_connection_string()` / `get_connection_string()`: Get database connection
- `aget_user_sessions()` / `get_user_sessions()`: Manage user sessions
- `aget_session()` / `get_session()`: Access specific session
- `adelete_session()` / `delete_session()`: Delete sessions

## Usage Examples

### Basic Agent Operations (Test-Verified)
```python
from xpander_sdk import Agents, Agent

# List agents
agents = Agents()
agent_list = await agents.alist()
assert isinstance(agent_list, list)
assert len(agent_list) != 0

# Load specific agent
agent = await agents.aget("agent-id")
assert isinstance(agent, Agent)

# Load agent from list item
full_agent = await agent_list[0].aload()
assert full_agent.id == agent_list[0].id
```

### Task Creation and Management
```python
# Create a task
prompt = "what can you do"
task = await agent.acreate_task(prompt=prompt)
assert task.agent_id == agent.id
assert task.input.text == prompt

# Create task with options
task = await agent.acreate_task(
    prompt="Analyze this data",
    file_urls=["https://example.com/data.csv"],
    events_streaming=True,
    output_format=OutputFormat.Json,
    output_schema={"analysis": "string"}
)
```

### Tool Integration (Test-Based)
```python
# Get tool from agent's repository
tool = agent.tools.get_tool_by_id("XpanderEmailServiceSendEmailWithHtmlOrTextContent")
if tool:
    payload = {
        "body_params": {
            "subject": "Test email",
            "body_html": "Hello world",
            "to": ["user@example.com"],
        },
        "path_params": {},
        "query_params": {},
    }
    result = await agent.ainvoke_tool(tool=tool, payload=payload)
    assert result.is_success == True
```

### Knowledge Base Integration
```python
# Access agent's knowledge bases
kbs = await agent.aget_knowledge_bases()
for kb in kbs:
    # Search within knowledge base
    results = await kb.asearch(search_query="David Hines", top_k=1)
    assert len(results) != 0
```

### MCP Server Access
```python
# Access MCP servers configured for agent
if agent.mcp_servers:
    for mcp_server in agent.mcp_servers:
        print(f"MCP Server: {mcp_server.name}")
        print(f"Type: {mcp_server.type}")
```

### Connection String Management
```python
# Get database connection string
connection_string = await agent.aget_connection_string()
assert connection_string.connection_uri.uri is not None
```

### Session Management
```python
# Get user sessions
sessions = await agent.aget_user_sessions(user_id="user@example.com")
assert len(sessions) != 0

# Access specific session
session = await agent.aget_session(session_id="session-id")

# Delete session
await agent.adelete_session(session_id="session-id")
```

## Configuration

Agents support various configuration options:

- **Model Settings**: Provider, model name, credentials
- **Framework**: Execution framework (e.g., Agno)
- **Tools**: Available tools and integrations
- **Knowledge Bases**: Connected knowledge repositories
- **Graph**: Execution flow definition
- **Output**: Format and schema specifications

## API Reference

See the main [Agents Guide](/docs/AGENTS.md) for detailed API documentation.

## Types and Models

The module includes comprehensive type definitions for:
- Agent configuration and metadata
- Execution inputs and outputs
- Tool definitions and results
- Knowledge base connections
- Graph structure and nodes

## Best Practices

1. **Async First**: Use asynchronous methods for production applications
2. **Error Handling**: Implement proper exception handling for API calls
3. **Configuration**: Use environment variables for sensitive configuration
4. **Resource Management**: Properly manage agent resources and connections

## Dependencies

- `httpx`: HTTP client for API communication
- `pydantic`: Data validation and serialization
- `loguru`: Logging functionality
- `asyncio`: Asynchronous programming support

## Contributing

When contributing to this module:
1. Maintain backward compatibility
2. Add comprehensive tests for new features
3. Update documentation for API changes
4. Follow the existing code style and patterns

For more information, see the [main documentation](/docs/AGENTS.md).
