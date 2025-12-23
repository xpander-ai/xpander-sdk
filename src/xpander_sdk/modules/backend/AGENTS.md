# Backend Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Backend module of the xpander.ai SDK.

## Module Overview

The Backend module retrieves agent runtime arguments for execution across multiple frameworks in the xpander.ai platform. It also provides functionality for reporting external task execution results back to the platform. It supports both asynchronous and synchronous APIs for easy integration with existing agents.

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
- Use `auth_events_callback` parameter for authentication events (e.g., MCP OAuth flows)

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

### Authentication Events Callback Pattern

Handle authentication events only. This callback is triggered exclusively for authentication flows (e.g., MCP OAuth requiring user login).

**Both approaches work together** - decorated handlers are auto-registered globally, and you can also pass explicit callbacks for per-call handling.

```python
from xpander_sdk.modules.backend import Backend
from xpander_sdk import Agent, Task
from xpander_sdk.models.tasks.task_update_event import TaskUpdateEvent

backend = Backend()

# Option 1: Direct callback (per-call)
async def my_event_callback(agent: Agent, task: Task, event: TaskUpdateEvent):
    # event.type will always be "auth_event"
    print(f"Authentication required for {agent.name}")
    print(f"Auth data: {event.data}")

args = await backend.aget_args(
    agent_id="agent-id",
    auth_events_callback=my_event_callback
)

# Option 2: Decorator (auto-registered globally)
from xpander_sdk import on_auth_event

@on_auth_event
async def handle_auth(agent, task, event):
    print(f"Global auth handler: {event.data}")

# Automatically invoked - no need to pass
args = await backend.aget_args(agent_id="agent-id")

# Option 3: Combine both
# Both decorated handler and explicit callback will be invoked
args = await backend.aget_args(
    agent_id="agent-id",
    auth_events_callback=my_event_callback
)
```

**Callback Parameters:**
- `agent`: The Agent object associated with the task
- `task`: The Task object being executed
- `event`: A TaskUpdateEvent containing:
  - `type`: Event type (always "auth_event" for authentication flows)
  - `time`: Event timestamp
  - `data`: Authentication-specific data (e.g., OAuth login URL, token status)

### External Task Reporting Patterns
```python
import uuid
from xpander_sdk.modules.backend import Backend
from xpander_sdk.models.shared import Tokens

# Initialize Backend module
backend = Backend()

# Report simple external task execution
reported_task = await backend.areport_external_task(
    agent_id="agent-id",
    id=str(uuid.uuid4()),
    input="Execute data pipeline",
    result="Pipeline completed successfully",
    duration=15.3
)

# Report with comprehensive execution details
tokens = Tokens(
    completion_tokens=250,
    prompt_tokens=80,
    total_tokens=330
)

reported_task = await backend.areport_external_task(
    agent_id="agent-id",
    id=str(uuid.uuid4()),
    input="Complex analysis task",
    llm_response={"content": "Analysis completed", "model": "gpt-4"},
    tokens=tokens,
    is_success=True,
    result="Comprehensive analysis report generated",
    duration=12.8,
    used_tools=["analyzer", "visualizer", "reporter"]
)

# Synchronous reporting for non-async environments
reported_task_sync = backend.report_external_task(
    agent_id="agent-id",
    id=str(uuid.uuid4()),
    input="Cleanup task",
    result="Cleanup completed"
)
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
