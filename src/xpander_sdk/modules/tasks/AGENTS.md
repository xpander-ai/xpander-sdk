# Tasks Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Tasks module of the xpander.ai SDK.

## Module Overview

The Tasks module enables comprehensive management of task execution within the xpander.ai platform. It supports agent-based task execution and integrates seamlessly with other modules.

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

### Task Creation Patterns
```python
# AI agents should use the standard task creation pattern
new_task = await tasks_manager.acreate(
    agent_id="agent-id",
    prompt="Analyze this data",
    file_urls=["data1.csv", "data2.pdf"],
    user_details={"user_email": "user@example.com"}  # Optional
)
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
