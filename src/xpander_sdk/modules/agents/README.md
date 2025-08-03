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
- `arun()` / `run()`: Execute tasks
- `ainvoke_tool()` / `invoke_tool()`: Call tools
- `aproxy_knowledge_base()`: Search knowledge bases
- `aadd_mcp_server()`: Add MCP server configuration

## Usage Examples

### Basic Agent Operations
```python
from xpander_sdk import Agents, Agent

# List agents
agents = Agents()
agent_list = await agents.alist()

# Load specific agent
agent = await agents.aget("agent-id")

# Execute task
result = await agent.arun("Analyze this data")
```

### Tool Integration
```python
# Invoke a tool
tool_result = await agent.ainvoke_tool(
    tool_id="data-analyzer",
    payload={"data": "sample data"}
)
```

### Knowledge Base Search
```python
# Search knowledge base
kb_results = await agent.aproxy_knowledge_base(
    knowledge_base_id="kb-123",
    search_query="pricing information"
)
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
