# Events Module

The Events Module provides comprehensive functionality for handling background tasks and event streaming within the xpander.ai platform. It enables real-time task execution and seamless integration with deployed agents.

## Overview

This module handles:
- Event-driven task execution
- Server Sent Events (SSE) integration
- Background task management
- Graceful shutdown and resource cleanup
- Real-time agent communication

## Structure

```
events/
├── events_module.py           # Main module interface
├── decorators/                # Decorator utilities
│   └── on_task.py            # Task handler decorator
├── models/                    # Event-related data models
│   ├── events.py             # Event definitions
│   └── deployments.py        # Deployment models
└── utils/                     # Event utility functions
    ├── generic.py            # Generic utilities
    └── git_init.py           # Git initialization
```

## Key Classes

### `Events`
Main interface for event stream management and task execution.

**Methods:**
- `start()`: Start listening for task execution events
- `stop()`: Stop the event listener and cleanup resources
- `register_agent_worker()`: Register workers for specific agents

### `@on_task` Decorator
Provides a simple decorator interface for registering task handlers.

**Features:**
- Support for both synchronous and asynchronous functions
- Automatic task parameter validation
- Integration with the event system
- Optional configuration parameter for custom SDK settings
- Optional test_task parameter for local testing and development
- Automatic validation that decorated function has a 'task' parameter

**Parameters:**
- `configuration` (Optional[Configuration]): SDK configuration to use
- `test_task` (Optional[LocalTaskTest]): Local test task for testing

## Usage Examples

### Basic Event Handling
```python
from xpander_sdk import Events, on_task

# Define task handler using decorator
@on_task
async def handle_task(task):
    print(f"Processing task: {task.id}")
    # Task processing logic here
    return {"status": "completed"}

# Start event listener
events = Events()
await events.start(on_execution_request=handle_task)
```

### Manual Event Management
```python
# Initialize events module
events = Events(configuration=config, max_sync_workers=8)

# Define handler function
async def custom_task_handler(task):
    # Custom task processing
    result = process_task(task)
    return result

# Start listening
await events.start(on_execution_request=custom_task_handler)

# Graceful shutdown
await events.stop()
```

### Context Manager Usage
```python
async with Events() as events:
    await events.start(on_execution_request=handle_task)
    # Events will automatically cleanup on exit
```

### Local Task Testing
```python
from xpander_sdk.modules.tasks.models.task import LocalTaskTest, AgentExecutionInput
from xpander_sdk.models.shared import OutputFormat
from xpander_sdk import on_task

# Define a local test task
local_task = LocalTaskTest(
    input=AgentExecutionInput(text="What can you do?"),
    output_format=OutputFormat.Json,
    output_schema={"capabilities": "list of capabilities"}
)

# Test with local task
@on_task(test_task=local_task)
async def handle_test_task(task):
    task.result = {
        "capabilities": [
            "Data analysis",
            "Text processing", 
            "API integration"
        ]
    }
    return task
```

### Advanced Decorator Usage
```python
# Task handler with custom configuration
@on_task(configuration=custom_config)
def sync_task_handler(task):
    print(f"Handling task synchronously: {task.id}")
    task.result = "Processing complete"
    return task

# Multiple task handlers
@on_task
async def data_processing_handler(task):
    # Specialized data processing
    return task

@on_task
async def notification_handler(task):
    # Send notifications
    return task
```

## Configuration

Events support various configuration options:

- **Worker Management**: Configure maximum synchronous workers
- **Retry Logic**: Customizable retry strategies for network failures
- **Environment**: Support for both cloud and local deployment
- **Graceful Shutdown**: Signal handling for clean shutdowns

## API Reference

See the main [Events Guide](/docs/EVENTS.md) for detailed API documentation.

## Types and Models

The module includes comprehensive type definitions for:
- Event types and statuses
- Worker configurations and environments
- Deployment assets and metadata
- Task execution contexts

## Event Flow

1. **Initialization**: Events module connects to the platform
2. **Registration**: Agent workers are registered for task handling
3. **Listening**: SSE connection established for real-time events
4. **Processing**: Tasks are received and processed by handlers
5. **Cleanup**: Graceful shutdown with resource cleanup

## Best Practices

1. **Async Handlers**: Use asynchronous task handlers for better performance
2. **Error Handling**: Implement robust error handling in task handlers
3. **Resource Management**: Properly manage resources and connections
4. **Graceful Shutdown**: Use signal handlers for clean shutdowns
5. **Environment Variables**: Configure using environment variables

## Dependencies

- `httpx`: HTTP client for API communication
- `httpx_sse`: Server Sent Events support
- `asyncio`: Asynchronous programming support
- `loguru`: Logging functionality

## Environment Variables

Required environment variables:
- `XPANDER_AGENT_ID`: Agent identifier for task routing
- `XPANDER_ORGANIZATION_ID`: Organization identifier
- `XPANDER_API_KEY`: API key for authentication

Optional variables:
- `IS_XPANDER_CLOUD`: Cloud deployment flag
- `XPANDER_BASE_URL`: Custom API base URL

## Contributing

When contributing to this module:
1. Maintain backward compatibility with existing event handlers
2. Add comprehensive tests for new event types
3. Update documentation for API changes
4. Follow established patterns for asynchronous programming

For more information, see the [main documentation](/docs/EVENTS.md).
