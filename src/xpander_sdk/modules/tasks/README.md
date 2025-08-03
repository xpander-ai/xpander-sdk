# Tasks Module

The Tasks Module provides rich functionality for managing tasks within the xpander.ai platform. It supports agent-based task execution and integrates seamlessly with other modules.

## Overview

This module handles:
- Task creation and execution with agents
- Task management and status updates
- Integration with tools and services
- Asynchronous and synchronous operations

## Structure

```
tasks/
├── tasks_module.py          # Main module interface
├── models/                  # Task-related data models
│   ├── task.py            # Task definitions
│   └── tasks_list.py      # Task listing models
├── sub_modules/            # Sub-module with additional functionalities
│   └── task.py           # Core task class
└── utils/                  # Task-related utility functions
```

## Key Classes

### `Tasks`
Interface for task management operations.

**Methods:**
- `acreate()` / `create()`: Create a new task
- `alist()` / `list()`: List all tasks
- `aget(task_id)` / `get(task_id)`: Retrieve a specific task
- Support for both async and sync operations

### `Task`
Instance of a single task with execution capabilities.

**Key Features:**
- Status management (`aset_status()` / `set_status()`)
- Result handling
- Task persistence
- Attachment support (documents, files, etc.)

## Usage Examples

### Basic Task Operations
```python
from xpander_sdk import Tasks, Task

# List tasks
tasks_manager = Tasks()
task_list = await tasks_manager.alist(agent_id="agent-id")

# Retrieve specific task
task = await tasks_manager.aget(task_id="task-id")

# Change task status
await task.aset_status(AgentExecutionStatus.Completed)
await task.asave()
```

### Create a New Task
```python
# Create task for agent
new_task = await tasks_manager.acreate(
    agent_id="agent-id",
    prompt="Analyze sales data",
    file_urls=["https://example.com/data.csv"]
)
```

## Configuration

Tasks support comprehensive configuration options:

- **Inputs**: Text prompts, files, and user details
- **Outputs**: Format and schema definitions
- **Agent**: Associated agent and version
- **Execution**: Local or remote execution settings

## API Reference

See the main [Tasks Guide](/docs/TASKS.md) for detailed API documentation.

## Types and Models

The module includes comprehensive type definitions for:
- Task configuration and metadata
- Execution inputs and outputs
- Status and result handling

## Best Practices

1. **Async First**: Use asynchronous methods to optimize performance
2. **Configuration**: Utilize environment variables for sensitive settings
3. **Resource Management**: Efficiently manage task resources and agents
4. **Error Handling**: Implement robust error handling strategies

## Dependencies

- `httpx`: HTTP client for API communication
- `pydantic`: Data validation and serialization
- `loguru`: Logging functionality
- `asyncio`: Asynchronous programming support

## Contributing

When contributing to this module:
1. Ensure backward compatibility with existing functionality
2. Include comprehensive tests and update existing tests
3. Update documentation for any API changes
4. Follow established code style and patterns

For more information, see the [main documentation](/docs/TASKS.md).
