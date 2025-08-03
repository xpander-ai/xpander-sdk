# Agents Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Agents module of the xpander.ai SDK.

## Module Overview

The Agents module provides comprehensive functionality for creating, managing, and executing AI agents within the xpander.ai platform. This module is central to the SDK's functionality and handles agent lifecycle management, task execution, tool integration, and knowledge base operations.

## Module Structure for AI Agents

```
agents/
├── agents_module.py          # Main module interface - entry point AI agents should understand
├── models/                   # Data models - AI agents must maintain type safety
│   ├── agent.py             # Agent configuration models
│   ├── agent_list.py        # Agent listing models
│   └── knowledge_bases.py   # Agent knowledge base models
├── sub_modules/             # Core functionality - business logic AI agents should respect
│   └── agent.py            # Agent class implementation
└── utils/                   # Utility functions - AI agents should leverage these
    └── generic.py          # Helper functions
```

## Coding Conventions for AI Agents

### Agent-Specific Conventions
- AI agents should use the `Agents` class for collection operations (list, create)
- AI agents should use the `Agent` class for individual agent operations (run, invoke_tool)
- Follow the async-first pattern: `aload()`, `arun()`, `alist()` for production code
- AI agents should maintain both sync and async interfaces for all public methods
- Use proper type hints with agent-specific models from `/models/`

### Agent Configuration Management
- AI agents should use the Configuration class for all API settings
- Agent credentials should be handled through environment variables
- AI agents should support model provider abstraction (OpenAI, Anthropic, etc.)
- Configuration should be injected, not hardcoded in agent logic

### Tool Integration Patterns
- AI agents should use the `ainvoke_tool()` method for tool execution
- Tools should be registered through the ToolsRepository module
- AI agents should handle tool invocation results gracefully
- Implement proper error handling for tool execution failures

## API Patterns for AI Agents

### Agent Management Operations
```python
# Correct pattern for listing agents
agents = Agents(configuration=config)
agent_list = await agents.alist()

# Correct pattern for loading specific agent
agent = await agents.aget("agent-id")
# OR
agent = Agent.load("agent-id", configuration=config)
```

### Task Execution Patterns
```python
# AI agents should use the standard task execution pattern
result = await agent.arun(
    input_data="User prompt or instruction",
    input_files=["file1.pdf", "file2.txt"],  # Optional
    user_details={"name": "User", "email": "user@example.com"}  # Optional
)
```

### Tool Invocation Patterns
```python
# AI agents should invoke tools through the agent instance
tool_result = await agent.ainvoke_tool(
    tool_id="tool-name",
    payload={"param1": "value1", "param2": "value2"}
)
```

## Data Models and Types for AI Agents

### Core Agent Models
- `Agent`: Main agent entity with execution capabilities
- `AgentListItem`: Summary view for agent collections
- `AgentConfiguration`: Configuration and settings
- `AgentExecutionResult`: Results from agent task execution

### Integration Models
- `KnowledgeBaseConnection`: Links agents to knowledge repositories
- `ToolConfiguration`: Tool setup and parameters
- `MCPServerDetails`: MCP server integration settings

## Testing Requirements for AI Agents

### Agent-Specific Tests
```bash
# Run agent module tests
pytest tests/test_agents.py

# Run specific agent functionality tests
pytest tests/test_agents.py::test_agent_creation
pytest tests/test_agents.py::test_agent_execution
pytest tests/test_agents.py::test_tool_integration
```

### Test Patterns AI Agents Should Follow
- Mock external API calls to xpander.ai backend
- Test both sync and async method variants
- Verify proper error handling for network failures
- Test agent configuration validation
- Mock tool invocations for integration tests

## Best Practices for AI Agents

### Agent Lifecycle Management
1. **Creation**: Always validate agent configuration before creation
2. **Loading**: Use proper error handling for non-existent agents
3. **Execution**: Implement timeout and retry logic for long-running tasks
4. **Cleanup**: Properly dispose of agent resources after use

### Performance Considerations
- AI agents should use async methods for I/O operations
- Cache agent configurations when appropriate
- Implement connection pooling for HTTP requests
- Use streaming for large task outputs

### Error Handling Patterns
```python
from xpander_sdk.exceptions import ModuleException

try:
    result = await agent.arun("Execute this task")
except ModuleException as e:
    # Handle SDK-specific errors
    logger.error(f"Agent execution failed: {e.description}")
except Exception as e:
    # Handle unexpected errors
    logger.error(f"Unexpected error: {str(e)}")
```

## Integration Guidelines for AI Agents

### Knowledge Base Integration
- AI agents should use `aproxy_knowledge_base()` for searching knowledge bases
- Implement proper pagination for large search results
- Handle knowledge base connection errors gracefully

### MCP Server Integration
- AI agents should use `aadd_mcp_server()` for adding MCP server configurations
- Validate MCP server settings before adding
- Handle MCP server communication errors

### Tool Repository Integration
- Register tools through the ToolsRepository module before use
- AI agents should validate tool schemas before invocation
- Implement proper logging for tool execution results

## Security Guidelines for AI Agents

### Authentication and Authorization
- AI agents should never expose API keys in logs or responses
- Use the Configuration class for credential management
- Implement proper input validation for agent parameters

### Data Protection
- Sanitize user inputs before processing
- Implement proper error messages that don't leak sensitive information
- Use HTTPS for all API communications

## Module-Specific Environment Variables

Required for agent operations:
- `XPANDER_API_KEY`: Authentication key
- `XPANDER_ORGANIZATION_ID`: Organization identifier

Optional:
- `XPANDER_BASE_URL`: Custom API endpoint
- `XPANDER_DEFAULT_MODEL_PROVIDER`: Default model provider
- `XPANDER_DEFAULT_MODEL_NAME`: Default model name

## Common Patterns AI Agents Should Follow

### Agent Factory Pattern
```python
async def create_agent_with_tools(name: str, tools: list) -> Agent:
    """Create an agent with predefined tools."""
    agents = Agents()
    agent = await agents.acreate(name=name, description="Agent with tools")
    
    # Configure tools for the agent
    for tool in tools:
        await agent.configure_tool(tool)
    
    return agent
```

### Batch Operations Pattern
```python
async def process_multiple_agents(agent_ids: list, task: str):
    """Process the same task across multiple agents."""
    agents = Agents()
    results = []
    
    for agent_id in agent_ids:
        agent = await agents.aget(agent_id)
        result = await agent.arun(task)
        results.append(result)
    
    return results
```

## Troubleshooting for AI Agents

### Common Issues
1. **Agent not found**: Verify agent ID and organization access
2. **Task execution timeout**: Increase timeout or optimize task complexity
3. **Tool invocation failures**: Check tool registration and parameters
4. **Configuration errors**: Validate environment variables and settings

### Debugging Tips
- Enable debug logging with loguru
- Use proper exception handling to capture detailed error information
- Verify network connectivity and API endpoint accessibility
- Check agent and tool configurations for consistency

For more information, see the [main Agents documentation](/docs/AGENTS.md).
