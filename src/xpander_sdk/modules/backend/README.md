# Backend Module

The Backend Module provides rich functionality for retrieving agent runtime arguments for execution across multiple frameworks.

## Overview

This module handles:
- Resolving runtime arguments for agents
- Supporting multiple frameworks
- Providing asynchronous and synchronous APIs

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
- `aget_args()`: Asynchronously resolve runtime arguments
- `get_args()`: Synchronously resolve runtime arguments

## Usage Examples

### Basic Operations
```python
from xpander_sdk.modules.backend import Backend

backend = Backend()
args = await backend.aget_args(agent_id="agent-id")
args_sync = backend.get_args(agent_id="agent-id")
```

### Framework Dispatch
```python
from xpander_sdk.modules.backend.frameworks import dispatch_get_args

args = await dispatch_get_args(agent=agent, task=task)
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
