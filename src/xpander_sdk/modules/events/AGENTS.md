# Events Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Events module of the xpander.ai SDK.

## Module Overview

The Events module provides comprehensive functionality for handling background tasks and event streaming within the xpander.ai platform. It enables real-time task execution and seamless integration with deployed agents.

## Module Structure for AI Agents

```
events/
├── events_module.py           # Main module interface - entry point AI agents should understand
├── decorators/                # Decorator utilities
│   └── on_task.py            # Task handler decorator
├── models/                    # Event-related data models
│   ├── events.py             # Event definitions
│   └── deployments.py        # Deployment models
└── utils/                     # Event utility functions
    ├── generic.py            # Generic utilities
    └── git_init.py           # Git initialization
```

## Coding Conventions for AI Agents

### Event-Specific Conventions
- AI agents should use the `Events` class for event stream management operations
- Use the `@on_task` decorator to register task handlers
- Follow async-first pattern for handling events: `start()`, `stop()`, `register_agent_worker()`
- AI agents should implement proper error handling in event handlers

### Event Handler Registration Patterns
- AI agents should define clear, concise handler functions
- Support both async and sync handlers, using proper decorators
- Ensure efficient processing within handlers to avoid bottlenecks

## API Patterns for AI Agents

### Event Management Operations
```python
# Correct pattern for starting event listener
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

# Stop the event listener
await events.stop()
```

### Manual Event Management
```python
# Initialize events module
events = Events(configuration=config, max_sync_workers=8)

# Define custom handler function
async def custom_task_handler(task):
    # Custom task processing
    result = process_task(task)
    return result

# Start listening with custom handler
await events.start(on_execution_request=custom_task_handler)

# Graceful shutdown
await events.stop()
```

## Data Models and Types for AI Agents

### Core Event Models
- `Event`: Main event entity for handling streams
- `EventContext`: Data context for events
- `EventExecutionResult`: Results from event processing
- `EventTypes`: Enumeration of supported event types

### Task Registration Models
- `AgentWorker`: Worker registration details for task handling
- `EventHandlerContext`: Context for event handlers

## Testing Requirements for AI Agents

### Event-Specific Tests
```bash
# Run events module tests
pytest tests/test_events.py

# Run specific event functionality tests
pytest tests/test_events.py::test_event_startup
pytest tests/test_events.py::test_event_handling
pytest tests/test_events.py::test_graceful_shutdown
```

### Test Patterns AI Agents Should Follow
- Mock external event streams and data sources
- Test both async and sync event handling paths
- Verify proper event lifecycle management
- Ensure efficient event processing performance
- Mock SSE and background task communications

## Best Practices for AI Agents

### Event Lifecycle Management
1. **Registration**: Ensure proper handler registration for specific events
2. **Startup**: Validate event listener configuration before starting
3. **Handling**: Optimize event processing for performance
4. **Shutdown**: Implement graceful shutdown to clean up resources

### Performance Considerations
- AI agents should use async methods for event processing
- Implement connection pooling for event streams
- Use efficient data parsing techniques to handle large events
- Implement retry logic for transient errors

### Event Handling Guidelines
1. **Error Handling**: Implement robust error handling for event failures
2. **Logging**: Use structured logging for event processing details
3. **Thread Management**: Use async handlers to avoid blocking main threads
4. **Resource Management**: Properly manage connections and resources

## Integration Guidelines for AI Agents

### Agent Integration
- Seamlessly connect events with agent task handling
- Use the `register_agent_worker()` method for deploying agent workers
- Handle agent-event associations through configuration

### Real-time Streaming Integration
- Integrate Server Sent Events (SSE) for real-time task execution
- Implement proper connection handling for SSE streams
- AI agents should integrate event streams with existing task workflows

## Security Guidelines for AI Agents

### Access Control
- AI agents should implement proper authentication for event streams
- Verify task execution permissions before starting
- Handle event data securely, logging only necessary information

### Data Protection
- Sanitize event data inputs before processing
- Use secure connections for all event stream communications
- AI agents should handle sensitive event data with care

### Error Handling Patterns
```python
from xpander_sdk.exceptions import ModuleException

try:
    await events.start(on_execution_request=handle_task)
except ModuleException as e:
    logger.error(f"Error during event handling: {e.description}")
except Exception as e:
    logger.error(f"Unexpected error: {str(e)}")
```

## Common Patterns AI Agents Should Follow

### Event Handler Pattern
```python
async def process_task(task):
    """Process task with proper exception handling."""
    try:
        # Task processing logic
        return {"status": "success", "task_id": task.id}
    except Exception as e:
        logger.error(f"Task {task.id} failed: {e}")
        return {"status": "error", "message": str(e)}
```

### Graceful Shutdown Pattern
```python
async def stop_event_listener():
    """Gracefully stop event listener and clean up."""
    try:
        await events.stop()
        logger.info("Event listener stopped successfully.")
    except Exception as e:
        logger.error(f"Failed to stop event listener: {e}")
```

## Advanced Usage Patterns for AI Agents

### Custom Decorator Usage
```python
from xpander_sdk import on_task
from xpander_sdk.modules.tasks.models.task import LocalTaskTest, AgentExecutionInput
from xpander_sdk.models.shared import OutputFormat

# Task handler with custom configuration
@on_task(configuration=custom_config)
def sync_task_handler(task):
    print(f"Handling task synchronously: {task.id}")
    task.result = "Processing complete"
    return task

# Local task testing
local_task = LocalTaskTest(
    input=AgentExecutionInput(text="What can you do?"),
    output_format=OutputFormat.Json,
    output_schema={"capabilities": "list of capabilities"}
)

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

### Context Manager Usage
```python
async with Events() as events:
    await events.start(on_execution_request=handle_task)
    # The event listener will automatically clean up on exit
```

## Troubleshooting for AI Agents

### Common Issues
1. **Event listener not starting**: Verify configuration and compatibilities
2. **Task handler errors**: Check handler compatibility and performance
3. **Connection timeouts**: Optimize connection handling and retry logic
4. **Unhandled exceptions**: Ensure proper exception management in handlers

### Debugging Tips
- Enable debug logging for event processing details
- Use proper exception handling to capture handler errors
- Verify network connectivity and API endpoint accessibility
- Check handler registration and processing compatibility

## Module-Specific Environment Variables

Optional for event operations:
- `XPANDER_EVENT_TIMEOUT`: Default timeout for event processing
- `XPANDER_SSE_RETRY_INTERVAL`: Retry interval for SSE connections
- `XPANDER_MAX_EVENT_WORKERS`: Maximum synchronous workers for events

For more information, see the [main Events documentation](/docs/EVENTS.md).
