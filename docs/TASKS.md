# Tasks Module Guide

The Tasks Module in xpander.ai SDK enables comprehensive management of task execution within the platform. It offers both asynchronous and synchronous methods for ease of integration and supports real-time event streaming.

## Overview

This module allows developers to:

- Create tasks and associate them with agents
- List and retrieve existing tasks
- Update task states and manage execution
- Report external task execution results to the platform
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
- **`internal_status`**: Optional internal status field that customers can use to report their own status (max 255 characters).
- **`input`**: The input parameters for agent execution.
- **`result`**: Result of the task execution.
- **`events_streaming`**: Flag indicating if the task has events streaming enabled.

#### Key Methods

- **`aload`**: Asynchronously load a task by ID (class method).
- **`load`**: Synchronously load a task by ID (class method).
- **`areport_external_task`**: Asynchronously report an external task execution (class method).
- **`report_external_task`**: Synchronously report an external task execution (class method).
- **`aset_status`**: Asynchronously change the task's status.
- **`set_status`**: Synchronously change the task's status.
- **`asave`**: Asynchronously save task changes back to the xpander platform.
- **`save`**: Synchronously save task changes.
- **`astop`**: Asynchronously stop the task.
- **`stop`**: Synchronously stop the task.
- **`aevents`**: Asynchronously stream task events.
- **`events`**: Synchronously stream task events.
- **`get_files`**: Get PDF files formatted for Agno integration.
- **`get_images`**: Get image files formatted for Agno integration.
- **`get_human_readable_files`**: Get text-based files with their content.
- **`to_message`**: Convert task input to a formatted message string.

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

# Set internal status for custom tracking
specific_task.internal_status = "Processing customer data"

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

### Report External Task Execution

```python
import uuid
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.models.shared import Tokens

# Report a simple external task execution
task_id = str(uuid.uuid4())
reported_task = await Task.areport_external_task(
    agent_id="agent123",
    id=task_id,
    input="Process inventory data",
    result="Successfully updated 500 inventory items"
)

# Report with comprehensive execution details
tokens = Tokens(
    completion_tokens=200,
    prompt_tokens=75,
    total_tokens=275
)

reported_task = await Task.areport_external_task(
    agent_id="agent123",
    id=str(uuid.uuid4()),
    input="Generate monthly financial report",
    llm_response={"content": "Report generated successfully", "model": "gpt-4"},
    tokens=tokens,
    is_success=True,
    result="Monthly financial report generated with insights",
    duration=8.7,
    used_tools=["financial_analyzer", "chart_generator", "pdf_creator"]
)

# Report external task with internal status tracking
reported_task_with_status = await Task.areport_external_task(
    agent_id="agent123",
    id=str(uuid.uuid4()),
    input="Process customer orders",
    result="Successfully processed 150 orders",
    # Note: internal_status can be set on the task after reporting
)
reported_task_with_status.internal_status = "Orders validated and shipped"
await reported_task_with_status.asave()

# Synchronous external task reporting
reported_task_sync = Task.report_external_task(
    agent_id="agent123",
    id=str(uuid.uuid4()),
    input="Send weekly status update",
    result="Status update sent to stakeholders",
    used_tools=["email_sender", "template_engine"]
)

print(f"Reported task ID: {reported_task.id}")
print(f"Task status: {reported_task.status}")
```

### Task File Handling for Agno Integration

```python
# Create a task with various file types
task = await tasks.acreate(
    agent_id="agent123",
    prompt="Analyze the attached documents and images",
    file_urls=[
        "https://example.com/report.pdf",      # PDF document
        "https://example.com/chart.png",       # Image file
        "https://example.com/data.csv",        # Human-readable file
        "https://example.com/logo.jpg"         # Another image
    ]
)

# Get files categorized by type for Agno integration
files = task.get_files()    # Returns Agno File objects for PDFs
images = task.get_images()  # Returns Agno Image objects for images

# Use with Agno agent
from xpander_sdk import Backend
from agno.agent import Agent

backend = Backend()
agno_agent = Agent(**backend.get_args())

# Pass files and images directly to Agno
result = await agno_agent.arun(
    input=task.to_message(),  # Includes text + file URLs + readable file content
    files=files,              # PDF files as Agno File objects
    images=images            # Image files as Agno Image objects
)

print(f"Analysis result: {result.content}")

# Access human-readable files separately if needed
readable_files = task.get_human_readable_files()
for file_data in readable_files:
    print(f"File: {file_data['url']}")
    print(f"Content preview: {file_data['content'][:200]}...")
```

### Internal Status Tracking

The `internal_status` field allows customers to set custom context information alongside the standard task status. This optional field has a maximum length of 255 characters and is set once before the task is saved or returned.

```python
# Create a task and set internal status
task = await tasks.acreate(
    agent_id="agent123",
    prompt="Analyze customer feedback"
)

# Your processing logic here
# ... analyze customer feedback ...

# Set custom internal status once before saving (max 255 characters)
task.internal_status = "Sentiment analysis completed with 95% confidence"
await task.asave()  # internal_status is persisted here

# The internal_status field is independent of the main status
print(f"Task Status: {task.status}")           # e.g., "Executing" or "Completed"
print(f"Internal Status: {task.internal_status}")  # "Sentiment analysis completed with 95% confidence"

# Internal status is also tracked in execution metrics
# This allows customers to provide additional context information
# that complements the standard task lifecycle status
# Note: internal_status is limited to 255 characters and set once per task
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

