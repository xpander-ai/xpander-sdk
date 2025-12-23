# Backend Module 

The Backend Module provides rich functionality for retrieving agent runtime arguments for execution across multiple frameworks.

## Overview

This module handles:
- Resolving runtime arguments for agents, with optional fallback to environment variables
- Supporting multiple frameworks through dispatching mechanics
- Reporting external task execution results to the xpander.ai platform
- Providing asynchronous and synchronous APIs
- Monitoring task execution in real-time through event callbacks

## Structure

```
backend/
├── backend_module.py          # Main module interface
├── frameworks/                # Framework-specific implementations
│   ├── agno.py                # Agno framework integration
│   └── dispatch.py            # Framework dispatch functionality
```

## Key Classes

### `Backend`
Interface for retrieving agent runtime arguments.

**Methods:**
- `aget_args(auth_events_callback=None)`: Asynchronously resolve runtime arguments with optional auth event callback
- `get_args(auth_events_callback=None)`: Synchronously resolve runtime arguments with optional auth event callback
- `areport_external_task()`: Asynchronously report external task execution results
- `report_external_task()`: Synchronously report external task execution results

## Usage Examples

### Basic Operations
```python
from xpander_sdk.modules.backend import Backend

backend = Backend()
# Option 1: Use explicit agent ID
args = await backend.aget_args(agent_id="agent-id")
args_sync = backend.get_args(agent_id="agent-id")

# Option 2: Utilize environment variable fallback
os.environ["XPANDER_AGENT_ID"] = "agent-id"
args_env = await backend.aget_args()
```

### Framework Dispatch
```python
from xpander_sdk.modules.backend.frameworks import dispatch_get_args

args = await dispatch_get_args(agent=agent, task=task)
```

### Authentication Events Callback

Handle authentication events in real-time. This callback is triggered **only** for authentication flows (e.g., MCP OAuth).

**You can use both approaches simultaneously** - decorated handlers are auto-registered globally and always invoked, plus you can pass an explicit callback for additional per-call handling.

```python
from xpander_sdk.modules.backend import Backend
from xpander_sdk import Agent, Task
from xpander_sdk.models.tasks.task_update_event import TaskUpdateEvent

backend = Backend()

# Option 1: Direct callback
async def event_callback(agent: Agent, task: Task, event: TaskUpdateEvent):
    # event.type will always be "auth_event"
    print(f"Authentication required: {event.data}")

args = await backend.aget_args(
    agent_id="agent-id",
    auth_events_callback=event_callback
)

# Option 2: Decorator (auto-registered)
from xpander_sdk import on_auth_event

@on_auth_event
async def handle_auth(agent, task, event):
    print(f"Auth: {event.data}")

# Automatically invoked - no need to pass
args = await backend.aget_args(agent_id="agent-id")

# Option 3: Both together
# Both handle_auth (decorated) and custom_callback will be invoked
args = await backend.aget_args(
    agent_id="agent-id",
    auth_events_callback=event_callback
)
```

### External Task Reporting
```python
import uuid
from xpander_sdk.modules.backend import Backend

backend = Backend()

# Report external task execution
reported_task = await backend.areport_external_task(
    agent_id="agent-id",
    id=str(uuid.uuid4()),
    input="Process data batch",
    result="Successfully processed 1000 records",
    duration=3.2,
    used_tools=["data_processor", "validator"]
)

print(f"Reported task: {reported_task.id}")
```

## Dependencies

- `httpx`: HTTP client for API communication
- `pydantic`: Data validation and serialization
- `asyncio`: Asynchronous programming support

## Contributing

When contributing to this module:
1. Ensure backward compatibility with existing functionality
2. Include comprehensive tests and update existing tests
3. Update documentation for any API changes
4. Follow established code style and patterns

For more information, see the [main documentation](/docs/BACKEND.md).
