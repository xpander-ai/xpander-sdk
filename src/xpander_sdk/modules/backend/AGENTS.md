# Backend Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Backend module of the xpander.ai SDK.

## Module Overview

The Backend module retrieves agent runtime arguments for execution across multiple frameworks in the xpander.ai platform. It supports both asynchronous and synchronous APIs for easy integration with existing agents.

## Module Structure for AI Agents

```
backend/
├── backend_module.py          # Main module interface - entry point for AI agents
├── frameworks/                # Framework-specific implementations
│   ├── agno.py                # Agno framework integration
│   └── dispatch.py            # Framework dispatch functionality
```

## Coding Conventions for AI Agents

### Argument Retrieval Conventions
- AI agents should use the `Backend` class for argument retrieval operations
- Follow the async-first pattern: `aget_args()`, `get_args()` for production code
- Implement proper error handling and logging for argument retrieval process

### Framework Handling
- AI agents should utilize the framework dispatch mechanism
- Ensure framework-specific logic is properly encapsulated
- Handle framework extensions with grace by using the `dispatch_get_args()`

## API Patterns for AI Agents

### Runtime Argument Retrieval
```python
from xpander_sdk.modules.backend import Backend
import os

# Initialize Backend module
backend = Backend()

# Option 1: Use explicit agent ID
args = await backend.aget_args(agent_id="agent-id")
args_sync = backend.get_args(agent_id="agent-id")

# Option 2: Use environment variable fallback
os.environ["XPANDER_AGENT_ID"] = "agent-id"
args_env = await backend.aget_args()
```

### Framework Dispatch Usage
```python
from xpander_sdk.modules.backend.frameworks import dispatch_get_args

# Dispatch arguments for given agent and task
args = await dispatch_get_args(agent=agent, task=task)
```

## Testing Requirements for AI Agents

### Backend-Specific Tests
```bash
# Run backend module tests
pytest tests/test_backend.py
```
- Test argument retrieval with various agents and frameworks
- Mock framework-specific dependencies and data sources
- Verify proper argument configuration handling

## Best Practices for AI Agents

### Argument Management
1. **Validation**: Validate input parameters before argument retrieval
2. **Error Handling**: Implement retries for recoverable errors
3. **Performance**: Optimize for async operations for efficient argument handling
4. **Environment Variables**: Leverage XPANDER_AGENT_ID for simplified agent resolution

### Framework Execution
- Ensure correct framework identification and dispatch
- Use async methods to prevent blocking execution

## Integration Guidelines for AI Agents

### Agent Integration
- Integrate with agent task handling and argument management seamlessly
- Handle agent-framework associations through configuration

### Security Guidelines

### Data Protection
- Sanitize inputs before processing
- Handle sensitive configuration and arguments securely

### Error Handling Pattern
```python
from xpander_sdk.exceptions import ModuleException

try:
    args = await backend.aget_args("agent-id")
except ModuleException as e:
    logger.error(f"Argument retrieval failed: {e.description}")
except Exception as e:
    logger.error(f"Unexpected error: {str(e)}")
```

For more information, see the [main Backend documentation](/docs/BACKEND.md).
