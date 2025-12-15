# Tasks Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Tasks module of the xpander.ai SDK.

## Module Overview

The Tasks module enables comprehensive management of task execution within the xpander.ai platform. It supports agent-based task execution, external task reporting, and integrates seamlessly with other modules.

## Module Structure for AI Agents

```tasks/
├── tasks_module.py          # Main module interface - entry point AI agents should understand
├── models/                  # Task-related data models
│   ├── task.py            # Task definitions
│   └── tasks_list.py      # Task listing models
├── sub_modules/            # Sub-module with additional functionalities
│   └── task.py           # Core task class
└── utils/                  # Task-related utility functions
```

## Coding Conventions for AI Agents

### Task-Specific Conventions
- AI agents should use the `Tasks` class for bulk operations (create, list)
- AI agents should use the `Task` class for individual task operations (set_status, save)
- Follow the async-first pattern: `acreate()`, `aget()`, `alist()` for production code
- Consistently use type hints with task-specific models from `/models/`

### Task Configuration Management
- AI agents should handle task configuration through the Configuration class
- Implement validation for task input parameters
- AI agents should support both async and sync operations for all public methods

## API Patterns for AI Agents

### Task Management Operations
```python
# Correct pattern for listing all tasks
tasks_manager = Tasks()
task_list = await tasks_manager.alist(agent_id="agent-id")

# Correct pattern for retrieving a specific task
task = await tasks_manager.aget(task_id="task-id")
# OR
task = Task.get(task_id="task-id")
```

### Task Creation Patterns (Test-Verified)
```python
# AI agents should use the standard task creation pattern from tests
tasks = Tasks()
prompt = "what can you do"
created_task = await tasks.acreate(agent_id=XPANDER_AGENT_ID, prompt=prompt)
assert isinstance(created_task, Task)
assert created_task.agent_id == XPANDER_AGENT_ID
assert created_task.input.text == prompt
assert created_task.status == AgentExecutionStatus.Pending

# Create task with events streaming (test pattern)
created_task = await tasks.acreate(
    agent_id=XPANDER_AGENT_ID, 
    prompt=prompt, 
    events_streaming=True
)
assert created_task.events_streaming is True
```

### External Task Reporting Patterns (Test-Verified)
```python
import uuid
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.models.shared import Tokens

# AI agents should follow these patterns for reporting external tasks
# Basic external task reporting
task_id = str(uuid.uuid4())
reported_task = await Task.areport_external_task(
    agent_id=XPANDER_AGENT_ID,
    id=task_id,
    input="External processing task",
    result="Task completed successfully"
)
assert isinstance(reported_task, Task)
assert reported_task.agent_id == XPANDER_AGENT_ID

# Comprehensive external task reporting with tokens and tools
tokens = Tokens(
    completion_tokens=150,
    prompt_tokens=50,
    total_tokens=200
)

reported_task = await Task.areport_external_task(
    agent_id=XPANDER_AGENT_ID,
    id=str(uuid.uuid4()),
    input="Complex external analysis",
    llm_response={"content": "Analysis completed", "model": "gpt-4"},
    tokens=tokens,
    is_success=True,
    result="Detailed analysis report generated",
    duration=5.7,
    used_tools=["analyzer", "formatter", "validator"]
)

# Synchronous external task reporting for non-async environments
reported_task_sync = Task.report_external_task(
    agent_id=XPANDER_AGENT_ID,
    id=str(uuid.uuid4()),
    input="Sync external task",
    result="Sync task completed"
)
```

### Task Activity Log Patterns
```python
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.models.activity import AgentActivityThread

# AI agents should use these patterns for retrieving task activity logs
# Async activity log retrieval
task = await Task.aload(task_id="task_123")
activity_log = await task.aget_activity_log()

# Process different message types in the activity thread
for message in activity_log.messages:
    if hasattr(message, 'role'):
        # AgentActivityThreadMessage
        print(f"{message.role}: {message.content.text}")
    elif hasattr(message, 'tool_name'):
        # AgentActivityThreadToolCall
        print(f"Tool: {message.tool_name}")
        print(f"Payload: {message.payload}")
        if message.result:
            print(f"Result: {message.result}")
    elif hasattr(message, 'type') and hasattr(message, 'thought'):
        # AgentActivityThreadReasoning
        print(f"Reasoning ({message.type}): {message.thought}")
    elif hasattr(message, 'agent_id') and hasattr(message, 'query'):
        # AgentActivityThreadSubAgentTrigger
        print(f"Sub-agent triggered: {message.agent_id}")
        print(f"Query: {message.query}")

# Synchronous activity log retrieval
task = Task.load(task_id="task_123")
activity_log = task.get_activity_log()

# Access user information if available
if activity_log.user:
    print(f"User: {activity_log.user.email}")
```

## Data Models and Types for AI Agents

### Core Task Models
- `Task`: Main task entity with execution capabilities
- `TaskListItem`: Summary view for task collections
- `TaskConfiguration`: Configuration and parameters
- `TaskExecutionResult`: Results from task execution

## Testing Requirements for AI Agents

### Task-Specific Tests
```bash
# Run task module tests
pytest tests/test_tasks.py

# Run specific task functionality tests
pytest tests/test_tasks.py::test_task_creation
pytest tests/test_tasks.py::test_task_execution
```

### Test Patterns AI Agents Should Follow
- Mock external API calls to xpander.ai backend
- Test both sync and async method variants
- Verify proper error handling for resource failures
- Test task parameter validation

## Best Practices for AI Agents

### Task Lifecycle Management
1. **Creation**: Validate task parameters before creation
2. **Loading**: Handle errors gracefully for non-existent tasks
3. **Execution**: Implement retries for recoverable errors
4. **Completion**: Ensure proper task status updates

### Activity Log Management
1. **Retrieval**: Only fetch activity logs for completed or stopped tasks
2. **Processing**: Use type checking (hasattr) to handle different message types
3. **Error Handling**: Wrap activity log retrieval in try-catch blocks
4. **Performance**: Activity logs can be large; process them efficiently

### Performance Considerations
- AI agents should use async methods for task operations
- Implement batching for bulk task executions
- Use paginated API calls for large task lists

## Integration Guidelines for AI Agents

### Agent Integration
- Seamlessly connect tasks with the relevant agent operations
- Handle agent-task associations correctly

### Document Integration
- Utilize document URLs correctly for task inputs
- Validate document accessibility and format

## Security Guidelines for AI Agents

### Credential Management
- AI agents should never log task credentials or sensitive information
- Ensure authorization checks before task execution

### Data Protection
- Implement data sanitization for task inputs
- Handle task execution results with care to avoid leaks

### Error Handling Patterns
```python
from xpander_sdk.exceptions import ModuleException

try:
    result = await tasks_manager.acreate("Create a new task")
except ModuleException as e:
    logger.error(f"Task creation failed: {e.description}")
except Exception as e:
    logger.error(f"Unexpected error: {str(e)}")
```

## Common Patterns AI Agents Should Follow

### Task Queue Pattern
```python
async def process_task_queue():
    tasks = Tasks()
    pending_tasks = await tasks.alist(status="Pending")
 
    for task_item in pending_tasks:
        task = await tasks.aget(task_item.id)
        result = await task.execute()
 
        if result.success:
            await task.aset_status("Completed")
        else:
            await task.aset_status("Failed")
```

## Troubleshooting for AI Agents

### Common Issues
1. **Task not found**: Verify task ID and agent association
2. **Execution timeout**: Adjust execution parameters or optimize tasks
3. **Failed to update status**: Check task consistency and dependencies

### Debugging Tips
- Enable debug logging with appropriate log levels
- Use exception handling to capture and analyze errors
- Verify connectivity and API response correctness

 For more information, see the [main Tasks documentation](/docs/TASKS.md).
