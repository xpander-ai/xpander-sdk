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
- Agent credentials should be handled through environment variables or custom LLM keys
- AI agents should support model provider abstraction (OpenAI, Anthropic, etc.)
- Configuration should be injected, not hardcoded in agent logic
- Check for custom LLM credentials before using environment variables

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
# AI agents should create tasks using the standard pattern from tests
prompt = "what can you do"
task = await agent.acreate_task(prompt=prompt)

# Task with additional options (based on test patterns)
task_with_options = await agent.acreate_task(
    prompt="Analyze this data",
    file_urls=["https://example.com/data.csv"],
    events_streaming=True,  # Enable real-time event streaming
    output_format=OutputFormat.Json,
    output_schema={"analysis": "string", "insights": "array"},
    additional_context="Additional context for processing",
    expected_output="Structured analysis results"
)

# Verify task creation results
assert task.agent_id == agent.id
assert task.input.text == prompt

# Check for custom LLM credentials (recommended pattern)
if agent.llm_credentials:
    print(f"Agent uses custom LLM key: {agent.llm_credentials.name}")
    assert agent.llm_credentials.value is not None  # Securely stored
```

### Tool Invocation Patterns
```python
# AI agents should invoke tools through the agent instance (test-based pattern)
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

### Knowledge Base Attachment Patterns
```python
# AI agents should attach knowledge bases using the standard pattern from tests
from xpander_sdk import KnowledgeBases

# Method 1: Attach using KnowledgeBase instance
kb_manager = KnowledgeBases()
kb = await kb_manager.aget(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")
agent.attach_knowledge_base(knowledge_base=kb)

# Method 2: Attach using knowledge base ID directly
agent.attach_knowledge_base(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")

# Verify attachment (test-based pattern)
attached_kbs = await agent.aget_knowledge_bases()
assert any(k.id == kb.id for k in attached_kbs)

# Search across attached knowledge bases
if agent.has_knowledge_bases:
    retriever = agent.knowledge_bases_retriever()
    search_results = retriever(
        query="search term",
        num_documents=5
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
- Custom LLM keys are resolved automatically by the Backend module

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
- AI agents should use `attach_knowledge_base()` to link knowledge bases to agents
- Use `aget_knowledge_bases()` to retrieve linked knowledge bases for searching
- Use `knowledge_bases_retriever()` for searching across all linked knowledge bases
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
- Custom LLM API keys are securely stored and never exposed in logs
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
- `AGENTS_OPENAI_API_KEY`: OpenAI API key (fallback when no custom key)
- `ANTHROPIC_API_KEY`: Anthropic API key (fallback when no custom key)

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

## Custom LLM API Keys for AI Agents

### Understanding Custom LLM Keys
- Agents can be configured with custom LLM API keys that override environment variables
- Priority depends on deployment environment:
  - **xpander Cloud**: Custom LLM Key → Environment Variable
  - **Local Environment**: Environment Variable → Custom LLM Key

### AI Agent Patterns for Custom Keys
```python
# AI agents should check for custom credentials
if agent.llm_credentials:
    logger.info(f"Using custom LLM key: {agent.llm_credentials.name}")
    # Key value is securely managed - never log it
else:
    logger.info("Using environment variable for LLM key")

# When using Backend module, keys are resolved automatically
from xpander_sdk import Backend
backend = Backend()
args = await backend.aget_args(agent=agent)
# The resolved model uses appropriate API key based on priority
```

### Best Practices for AI Agents
1. **Never log custom LLM key values** - they are sensitive credentials
2. **Check for custom keys before falling back to environment variables**
3. **Use Backend module for automatic key resolution**
4. **Handle missing keys gracefully with appropriate error messages**

## Troubleshooting for AI Agents

### Common Issues
1. **Agent not found**: Verify agent ID and organization access
2. **Task execution timeout**: Increase timeout or optimize task complexity
3. **Tool invocation failures**: Check tool registration and parameters
4. **Configuration errors**: Validate environment variables and settings
5. **Knowledge base attachment failures**: Verify knowledge base ID exists and agent has proper permissions
6. **Knowledge base search errors**: Check if knowledge bases are properly attached before searching
7. **LLM key issues**: Verify custom keys are properly configured or environment variables are set

### Debugging Tips
- Enable debug logging with loguru
- Use proper exception handling to capture detailed error information
- Verify network connectivity and API endpoint accessibility
- Check agent and tool configurations for consistency

For more information, see the [main Agents documentation](/docs/AGENTS.md).
