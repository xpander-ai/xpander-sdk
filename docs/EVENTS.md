# Events Module Guide

The Events Module in xpander.ai SDK provides functionality for handling background tasks and event streaming. It seamlessly integrates with the xpander.ai platform for real-time task execution.

## Overview

The SDK provides **two distinct event handling systems**:

1. **Agent Event Listeners** - For handling incoming task execution requests to agents
2. **Task Event Streaming** - For monitoring real-time updates during task execution

### Agent Event Listeners

This system allows developers to:
- Set up event listeners for agents using `@on_task` decorators
- Handle incoming task execution requests
- Integrate with Server Sent Events (SSE) for agent deployment
- Handle background processing with graceful shutdown

### Task Event Streaming

This system allows developers to:
- Stream real-time events from specific task executions
- Monitor task progress, tool calls, and status changes
- Handle task lifecycle events (created, updated, finished)

## Classes

### Events

Manages event streams for task execution, offering real-time interaction with deployed agents.

#### Key Methods

- **`start`**: Asynchronously start listening for task execution events.
  - **Note**: This is an asynchronous function that starts the event listener.
- **`stop`**: Asynchronously stop the event listener and cleanup resources.
  - **Note**: This is an asynchronous function that performs cleanup operations.
- **`register`**: Register event handlers in both synchronous and asynchronous environments.
- **`register_agent_worker`**: Internal method to register a worker to handle specific tasks.
  - **Note**: This is an internal asynchronous method used by the event system.

### `@on_task` Decorator

Provides a simple way to register functions as event-driven task handlers.

#### Usage

- Attach to any function to make it a task handler
- Support for both asynchronous and synchronous functions
- Accepts optional `configuration` and `test_task` parameters
- Automatically validates that the decorated function has a `task` parameter
- Integrates with the Events system for automatic registration

#### Parameters

- **`configuration`** (Optional[Configuration]): SDK configuration to use for the handler
- **`test_task`** (Optional[LocalTaskTest]): Local test task for testing and development

## Event Types

### Agent Event Types (Worker Events)

These events are used for agent deployment and worker management:

- **`WorkerRegistration`** (`"worker-registration"`): Fired when a worker/agent is successfully registered
- **`AgentExecution`** (`"agent-execution"`): Fired when a task execution request is received for an agent
- **`WorkerHeartbeat`** (`"worker-heartbeat"`): Periodic heartbeat signals from workers to maintain active status
- **`WorkerFinished`** (`"worker-finished"`): Fired when a worker completes its lifecycle
- **`EnvironmentConflict`** (`"worker-environment-conflict"`): Fired when there are environment conflicts

### TaskUpdateEventType Enum

The `TaskUpdateEventType` enum is used to categorize task-specific events:

- **`TaskCreated`**: Represents the creation of a new task
- **`TaskUpdated`**: Indicates an update to a task's status or data
- **`TaskFinished`**: Marks the completion of a task, regardless of success or failure

#### Tool-Related Events
These are specific to tool-related operations:

- **`ToolCallRequest`**: Fired when a request is made to invoke a tool
- **`ToolCallResult`**: Fired when the result of a tool call is received

#### Example Usage of TaskUpdateEventType

```python
from xpander_sdk.models.events import TaskUpdateEventType

# Example function that uses TaskUpdateEventType
async def process_task_event(event):
    if event.type == TaskUpdateEventType.TaskCreated:
        print("A new task was created.")
    elif event.type == TaskUpdateEventType.TaskUpdated:
        print("Task was updated.")
    elif event.type == TaskUpdateEventType.TaskFinished:
        print("Task has finished.")
    elif event.type == TaskUpdateEventType.ToolCallRequest:
        print("A tool call was requested.")
    elif event.type == TaskUpdateEventType.ToolCallResult:
        print("A tool call result was received.")
```

### Task Event Types (Task Streaming Events)

These events are streamed during task execution when `events_streaming=True`:

- **`TaskCreated`** (`"task_created"`): Fired when a task is initially created
- **`TaskUpdated`** (`"task_updated"`): Fired when task status, progress, or data is updated
- **`TaskFinished`** (`"task_finished"`): Fired when a task completes (successfully or with failure)
- **`ToolCallRequest`** (`"tool_call_request"`): Fired when the agent requests to invoke a tool
- **`ToolCallResult`** (`"tool_call_result"`): Fired when a tool call completes and returns results
- **`SubAgentTrigger`** (`"sub_agent_trigger"`): Fired when a sub-agent is triggered during execution

### Task Execution Statuses

These are the possible status values for tasks:

- **`Pending`** (`"pending"`): Task is waiting to be executed
- **`Executing`** (`"executing"`): Task is currently being processed
- **`Paused`** (`"paused"`): Task execution is temporarily paused
- **`Error`** (`"error"`): Task encountered an error during execution
- **`Failed`** (`"failed"`): Task execution failed to complete successfully
- **`Completed`** (`"completed"`): Task execution completed successfully
- **`Stopped`** (`"stopped"`): Task execution was manually stopped

## Examples

### 1. Agent Event Listeners (for Agent Deployment)

#### Basic Agent Event Handler

```python
from xpander_sdk import Events, on_task

# Define task handler using decorator
@on_task
async def handle_task(task):
    print(f"Task Received: {task.id}")
    print(f"Task Status: {task.status}")
    print(f"Task Input: {task.input.text}")
    
    # Process the task
    # Your custom logic here
    
    # Update task status
    task.status = "completed"
    task.result = "Task processed successfully"
    
    return task
```

#### Multiple Event Handlers

```python
# Define different task handlers
@on_task
def sync_task_handler(task):
    print(f"Handling task synchronously: {task.id}")
    return task

@on_task(configuration=my_config)
async def custom_async_task_handler(task):
    print(f"Custom async processing: {task.id}")
    # Custom async processing
    return task

# Register multiple handlers
events.register(on_task=handle_task)
```

#### Graceful Shutdown

```python
# Stop the event listener
await events.stop()
```

### 2. Task Event Streaming (for Task Monitoring)

#### Basic Task Event Streaming

```python
from xpander_sdk import Tasks, Agent
from xpander_sdk.models.events import TaskUpdateEventType, ToolCallRequest, ToolCallResult

# Create a task with event streaming enabled
agent = Agent.load("agent-id")
task = await agent.acreate_task(
    prompt="Analyze this dataset",
    file_urls=["https://example.com/data.csv"],
    events_streaming=True  # Enable event streaming
)

# Stream events from the task using the enum for type checking
# Note: aevents is an asynchronous generator function
async for event in task.aevents():
    print(f"Event Type: {event.type}")
    print(f"Task ID: {event.task_id}")
    print(f"Timestamp: {event.time}")
    
    # Use the enum for robust type checking
    if event.type == TaskUpdateEventType.TaskCreated:
        # Handle task creation
        created_task = event.data
        print(f"Task created with ID: {created_task.id}")
        
    elif event.type == TaskUpdateEventType.TaskUpdated:
        # Handle task updates
        updated_task = event.data
        print(f"Task Status: {updated_task.status}")
        
    elif event.type == TaskUpdateEventType.ToolCallRequest:
        # Handle tool call requests - event.data is a ToolCallRequest object
        tool_request: ToolCallRequest = event.data
        print(f"Tool Call Requested:")
        print(f"  Tool: {tool_request.tool_name}")
        print(f"  Operation ID: {tool_request.operation_id}")
        print(f"  Request ID: {tool_request.request_id}")
        print(f"  Payload: {tool_request.payload}")
        
    elif event.type == TaskUpdateEventType.ToolCallResult:
        # Handle tool call results - event.data is a ToolCallResult object
        tool_result: ToolCallResult = event.data
        print(f"Tool Call Result:")
        print(f"  Tool: {tool_result.tool_name}")
        print(f"  Operation ID: {tool_result.operation_id}")
        print(f"  Result: {tool_result.result}")
        print(f"  Success: {not tool_result.is_error}")
        if tool_result.is_error:
            print(f"  Error: {tool_result.result}")
        
    elif event.type == TaskUpdateEventType.TaskFinished:
        # Handle task completion
        finished_task = event.data
        print(f"Task finished!")
        print(f"Final Status: {finished_task.status}")
        print(f"Result: {finished_task.result}")
        break
        
    elif event.type == TaskUpdateEventType.SubAgentTrigger:
        # Handle sub-agent triggers
        sub_agent_data = event.data
        print(f"Sub-agent triggered: {sub_agent_data}")
```

#### Synchronous Task Event Streaming

```python
# For non-async environments
for event in task.events():
    print(f"Event: {event.type} at {event.time}")
    
    if event.type == "task_finished":
        print("Task completed!")
        break
```

#### Filtering Specific Event Types

```python
# Monitor only tool-related events
async for event in task.aevents():
    if event.type in ["tool_call_request", "tool_call_result"]:
        print(f"Tool Event: {event.type}")
        if hasattr(event.data, 'tool_name'):
            print(f"Tool: {event.data.tool_name}")
    
    elif event.type == "task_finished":
        break
```

### 3. Combined Usage Example

```python
import asyncio
from xpander_sdk import Events, Agent, on_task

# Agent-side: Handle incoming tasks
@on_task
async def process_data_task(task):
    print(f"Processing task: {task.id}")
    
    # Simulate processing
    await asyncio.sleep(2)
    
    # Update status
    task.status = "completed"
    task.result = "Data processed successfully"
    return task

# Client-side: Create and monitor a task
async def create_and_monitor_task():
    agent = Agent.load("data-processor-agent")
    
    # Create task with streaming
    task = await agent.acreate_task(
        prompt="Process customer data",
        events_streaming=True
    )
    
    # Monitor the task execution
    async for event in task.aevents():
        print(f"[{event.time}] {event.type}")
        
        if event.type == "task_finished":
            final_task = event.data
            print(f"Task completed with status: {final_task.status}")
            break
```

## Event Models

### TaskUpdateEvent

Represents a single event in the task execution stream:

```python
class TaskUpdateEvent:
    type: TaskUpdateEventType       # Type of the event
    task_id: str                   # ID of the task this event relates to
    organization_id: str           # Organization ID
    time: datetime                 # Timestamp when the event occurred
    data: TaskUpdateEventData      # Event-specific data (Task, ToolCallRequest, or ToolCallResult)
```

### ToolCallRequest

Represents a tool invocation request:

```python
class ToolCallRequest:
    request_id: str                    # Unique request identifier
    operation_id: str                  # Operation identifier
    tool_call_id: Optional[str]        # Tool call identifier
    graph_node_id: Optional[str]       # Graph node that triggered the tool call
    tool_name: Optional[str]           # Name of the tool being called
    payload: Optional[Any]             # Input data for the tool
```

### ToolCallResult

Represents the result of a tool invocation:

```python
class ToolCallResult(ToolCallRequest):
    operation_id: str                  # Operation identifier
    tool_call_id: Optional[str]        # Tool call identifier
    tool_name: Optional[str]           # Name of the tool that was called
    payload: Optional[Any]             # Original input data
    result: Optional[Any]              # Result returned by the tool
    is_error: Optional[bool]           # Whether the tool call resulted in an error
```

### Example: Working with Event Models

```python
from xpander_sdk.models.events import TaskUpdateEventType, ToolCallRequest, ToolCallResult
from xpander_sdk.modules.tasks.sub_modules.task import TaskUpdateEvent

async def detailed_event_handler(task):
    """Handle task events with detailed model access."""
    
    async for event in task.aevents():
        # Access event metadata
        print(f"Event occurred at: {event.time}")
        print(f"Organization: {event.organization_id}")
        print(f"Task: {event.task_id}")
        
        # Type-safe event handling
        match event.type:
            case TaskUpdateEventType.TaskCreated:
                created_task = event.data
                print(f"New task created: {created_task.id}")
                
            case TaskUpdateEventType.ToolCallRequest:
                request: ToolCallRequest = event.data
                print(f"Tool call requested:")
                print(f"  Request ID: {request.request_id}")
                print(f"  Tool: {request.tool_name}")
                print(f"  Operation: {request.operation_id}")
                if request.graph_node_id:
                    print(f"  From node: {request.graph_node_id}")
                    
            case TaskUpdateEventType.ToolCallResult:
                result: ToolCallResult = event.data
                print(f"Tool call completed:")
                print(f"  Tool: {result.tool_name}")
                print(f"  Success: {not result.is_error}")
                if result.is_error:
                    print(f"  Error: {result.result}")
                else:
                    print(f"  Result: {result.result}")
                    
            case TaskUpdateEventType.TaskFinished:
                finished_task = event.data
                print(f"Task completed: {finished_task.status}")
                break
```

### Local Task Testing

The SDK supports local task testing using the `LocalTaskTest` model:

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

## API Reference

### `Events`

- **`async start(on_execution_request: Callable)`**: Start the event listener
    - **Parameters**: `on_execution_request` (Callable): Function to handle task execution requests.

- **`async stop()`**: Stop the event listener and cleanup resources

- **`register_agent_worker(agent_id: str, on_execution_request)`**: Register a worker for tasks
    - **Parameters**: 
        - `agent_id` (str): Identifier for the agent
        - `on_execution_request` (Callable): Associated task handler

### `@on_task` Decorator

```python
@on_task
async def task_handler(task):
    # Implementation
    pass
```

## Best Practices

### Event Handling

1. **Efficient Processing**: Ensure task handlers are optimized for performance
2. **Graceful Shutdown**: Implement proper cleanup for long-running tasks
3. **Error Handling**: Use try-except blocks to manage exceptions

### Scaling

1. **Thread Management**: Use thread pools for concurrent execution
2. **Retry Logic**: Implement retry strategies for network calls
3. **Parallel Processing**: Utilize async capabilities for parallel task handling

## Additional Information

- SSE integration allows for real-time task monitoring and control
- Custom decorators simplify the creation of event-driven functions
- Full [SDK Documentation](https://docs.xpander.ai) available online

Contact Support: dev@xpander.ai

