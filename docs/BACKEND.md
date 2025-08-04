# Backend Module Guide

The Backend Module in the xpander.ai SDK provides functionality for retrieving agent runtime arguments for execution across multiple frameworks. This guide explains available classes, methods, and usage examples.

## Overview

The Backend Module allows developers to:

- Retrieve runtime arguments for agents
- Support multiple frameworks
- Provide both asynchronous and synchronous APIs

## Classes

### Backend

Handles retrieval of runtime arguments for agents.

#### Key Methods

- **`aget_args(agent_id: Optional[str], agent: Optional[Agent], ...)`**: Asynchronously resolve runtime arguments.
- **`get_args(agent_id: Optional[str], agent: Optional[Agent], ...)`**: Synchronously resolve runtime arguments.

## Examples

### Retrieve Agent Arguments

```python
from xpander_sdk.modules.backend import Backend

# Initialize Backend module
backend = Backend()

# Asynchronously get arguments
args = await backend.aget_args(agent_id="agent-id")

# Synchronously get arguments
args_sync = backend.get_args(agent_id="agent-id")
```

### Framework Integration

```python
from xpander_sdk.modules.backend.frameworks import dispatch_get_args

# Assumes `agent` and `task` objects are available
args = await dispatch_get_args(agent=agent, task=task)
```

## Additional Information

- The Module supports framework-specific argument dispatching.
- Refer to the [Agents Guide](AGENTS.md) for related operations.
- Full [SDK Documentation](https://docs.xpander.ai) is available for more advanced use-cases.

Contact Support: dev@xpander.ai
