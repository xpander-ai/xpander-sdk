# Tasks Module Guide

The Tasks Module in xpander.ai SDK enables comprehensive management of task execution within the platform. It offers both asynchronous and synchronous methods for ease of integration and supports real-time event streaming.

## Overview

This module allows developers to:

- Create tasks and associate them with agents
- List and retrieve existing tasks
- Update task states and manage execution
- Stream real-time events during task execution
- Stop and manage task lifecycle

## Classes

### Tasks

Handles task-related operations, providing methods for task creation, listing, retrieval, updating, and stopping.

#### Key Methods

- **`acreate`**: Asynchronously create a new task with detailed configuration options.
- **`create`**: Synchronously create a new task.
- **`alist`**: Asynchronously list all tasks for a specific agent.
- **`list`**: Synchronously list all tasks for a specific agent.
- **`aget`**: Asynchronously retrieve a task by its unique ID.
- **`get`**: Synchronously retrieve a task by its unique ID.
- **`aupdate`**: Asynchronously update task details such as status and results.
- **`update`**: Synchronously update task details.
- **`astop`**: Asynchronously stop a task.
- **`stop`**: Synchronously stop a task.

### TasksListItem

Represents a summary item from the tasks list with basic task information.

#### Key Methods

- **`aload()`**: Asynchronously load the full task details from this list item.
- **`load()`**: Synchronously load the full task details from this list item.

### Task

Represents a single task, providing methods to interact with task configurations, track execution status, and stream events.

#### Key Properties

- **`id`**: Unique identifier for the task.
- **`agent_id`**: Identifier for the associated agent.
- **`status`**: Current status of the task (Pending, Executing, Completed, etc.).
- **`input`**: The input parameters for agent execution.
- **`result`**: Result of the task execution.
- **`events_streaming`**: Flag indicating if the task has events streaming enabled.

#### Key Methods

- **`aload`**: Asynchronously load a task by ID (class method).
- **`load`**: Synchronously load a task by ID (class method).
- **`aset_status`**: Asynchronously change the task's status.
- **`set_status`**: Synchronously change the task's status.
- **`asave`**: Asynchronously save task changes back to the xpander platform.
- **`save`**: Synchronously save task changes.
- **`astop`**: Asynchronously stop the task.
- **`stop`**: Synchronously stop the task.
- **`aevents`**: Asynchronously stream task events.
- **`events`**: Synchronously stream task events.

## Examples

### Create and Manage Tasks

```python
from xpander_sdk import Tasks

# Initialize the Tasks module
tasks = Tasks(configuration=config)

# Create a new task for an agent
new_task = await tasks.acreate(
    agent_id="agent123",
    prompt="Analyze the sales data",
    file_urls=["https://example.com/data.csv"],
)

# List all tasks for a specific agent
task_list = await tasks.alist(agent_id="agent123")
for task in task_list:
    print(f"Task ID: {task.id}, Status: {task.status}")
```

### Retrieve and Update Task

```python
# Retrieve a specific task
specific_task = await tasks.aget(task_id="task456")

# Update task status
# Note: aset_status is an asynchronous function
await specific_task.aset_status(AgentExecutionStatus.Completed)
# Note: asave is an asynchronous function
await specific_task.asave()
```

### Stream Task Events

```python
# Create a task with event streaming enabled
new_task = await tasks.acreate(
    agent_id="agent123",
    prompt="Analyze the sales data",
    events_streaming=True  # Enable event streaming
)

# Stream task events asynchronously
# Note: aevents is an asynchronous generator function
async for event in new_task.aevents():
    print(f"Event Type: {event.type}")
    print(f"Event Data: {event.data}")
    
# Stream task events synchronously (for non-async environments)  
for event in new_task.events():
    print(f"Event: {event}")
```

## API Reference

### `Tasks`

- **`async acreate(agent_id: str, ...)`**: Create a new task asynchronously
    - **Parameters**: `agent_id` (str): The agent ID. `prompt` (str): Task description or prompt.
    - **Returns**: An instance of `Task`.

- **`async alist(agent_id: str)`**: List tasks for an agent
    - **Parameters**: `agent_id` (str): The unique identifier for the agent.
    - **Returns**: A list of `TasksListItem` summary objects.

- **`async aget(task_id: str)`**: Get a task by ID
    - **Parameters**: `task_id` (str): The unique task ID to retrieve.
    - **Returns**: A complete `Task` object.

### `Task`

- **`async aset_status(status: AgentExecutionStatus)`**: Set task status
    - **Parameters**: `status` (AgentExecutionStatus): The new status.

- **`async asave()`**: Save task changes asynchronously

## Additional Information

- The module supports synchronous versions for each asynchronous method for environments that do not support async.
- Refer to the [Agents Guide](AGENTS.md) for related operations.
- Full [SDK Documentation](https://docs.xpander.ai) is available for more advanced use-cases.

Contact Support: dev@xpander.ai

