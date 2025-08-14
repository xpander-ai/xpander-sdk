# Backend Module Guide

The Backend Module in the xpander.ai SDK provides functionality for retrieving agent runtime arguments for execution across multiple frameworks. This guide explains available classes, methods, and usage examples.

## Overview

The Backend Module allows developers to:

- Retrieve runtime arguments for agents, with optional environment variable support for agent ID
- Automatically resolve custom LLM API keys with environment variable fallback
- Support multiple frameworks, dispatching arguments accordingly
- Report external task execution results to the xpander.ai platform
- Provide both asynchronous and synchronous APIs

## Classes

### Backend

Handles retrieval of runtime arguments for agents.

#### Key Methods

- **`aget_args(agent_id: Optional[str], agent: Optional[Agent], ...)`**: Asynchronously resolve runtime arguments.
- **`get_args(agent_id: Optional[str], agent: Optional[Agent], ...)`**: Synchronously resolve runtime arguments.
- **`areport_external_task(agent_id: Optional[str], agent: Optional[Agent], ...)`**: Asynchronously report external task execution results.
- **`report_external_task(agent_id: Optional[str], agent: Optional[Agent], ...)`**: Synchronously report external task execution results.

## Examples

### Retrieve Agent Arguments

```python
from xpander_sdk.modules.backend import Backend
import os

# Initialize Backend module
backend = Backend()

# Option 1: Use explicit agent ID
args = await backend.aget_args(agent_id="agent-id")
args_sync = backend.get_args(agent_id="agent-id")

# Option 2: Use environment variable for agent ID
os.environ["XPANDER_AGENT_ID"] = "agent-id"
args_env = await backend.aget_args()
```

### Framework Integration

```python
from xpander_sdk.modules.backend.frameworks import dispatch_get_args

# Assumes `agent` and `task` objects are available
args = await dispatch_get_args(agent=agent, task=task)
```

### Integration with @on_task Decorator

```python
from xpander_sdk import Backend, on_task

@on_task
async def handle_agent_task(task):
    backend = Backend(task.configuration)
    agno_args = await backend.aget_args(
        agent_id=task.agent_id,
        agent_version=task.agent_version,
        task=task
    )
    # Use agno_args to instantiate framework agent
    # agno_agent = Agent(**agno_args)
    # result = await agno_agent.arun(message=task.to_message())
    task.result = "Task processed with Backend arguments"
    return task
```

### Report External Task Execution

```python
import uuid
from xpander_sdk.modules.backend import Backend
from xpander_sdk.models.shared import Tokens

# Initialize Backend module
backend = Backend()

# Report a simple external task execution
task_id = str(uuid.uuid4())
reported_task = await backend.areport_external_task(
    agent_id="agent-123",
    id=task_id,
    input="Process customer data",
    result="Successfully processed 100 customer records",
    duration=2.5
)

# Report with comprehensive execution details
tokens = Tokens(
    completion_tokens=150,
    prompt_tokens=50,
    total_tokens=200
)

reported_task = await backend.areport_external_task(
    agent_id="agent-123",
    id=str(uuid.uuid4()),
    input="Analyze sales data and generate report",
    llm_response={"content": "Analysis complete", "model": "gpt-4"},
    tokens=tokens,
    is_success=True,
    result="Generated comprehensive sales analysis report",
    duration=4.2,
    used_tools=["data_analyzer", "chart_generator", "report_writer"]
)

# Synchronous reporting
reported_task_sync = backend.report_external_task(
    agent_id="agent-123",
    id=str(uuid.uuid4()),
    input="Send notification email",
    result="Email sent successfully",
    used_tools=["email_sender"]
)
```

## Custom LLM Key Resolution

The Backend module automatically handles custom LLM API key resolution:

- **Priority Logic**: 
  - xpander Cloud: Custom LLM Key → Environment Variable
  - Local Environment: Environment Variable → Custom LLM Key
- **Automatic Fallback**: When custom keys aren't available, environment variables are used
- **Secure Handling**: Custom keys are never exposed in logs or responses

## Additional Information

- The Module supports framework-specific argument dispatching.
- Custom LLM keys are automatically resolved during argument retrieval.
- Refer to the [Agents Guide](AGENTS.md) for related operations.
- Full [SDK Documentation](https://docs.xpander.ai) is available for more advanced use-cases.

Contact Support: dev@xpander.ai
