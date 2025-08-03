# Agents Module Guide

The Agents Module in xpander.ai SDK provides functionality for creating, configuring, and managing AI agents. This guide covers the available classes, methods, and usage examples.

## Overview

The Agents Module allows developers to:

- Create and configure AI agents
- Manage agent deployment settings
- Execute tasks and handle results
- Integrate with external tools and services

## Classes

### Agents

Manages a collection of agents. Provides methods to create, list, and manage agents.

#### Key Methods

- **`alist`**: Asynchronously retrieve a list of all agents.
- **`list`**: Synchronously retrieve a list of all agents.
- **`aget`**: Asynchronously retrieve a specific agent by ID.
- **`get`**: Synchronously retrieve a specific agent by ID.

### Agent

Represents a single agent. Provides access to agent-specific operations such as task creation, tool invocation, and knowledge base management.

#### Key Methods

- **`aload`**: Asynchronously load an existing agent from configuration (class method).
- **`load`**: Synchronously load an existing agent from configuration (class method).
- **`acreate_task`**: Asynchronously create a new task for this agent.
- **`create_task`**: Synchronously create a new task for this agent.
- **`ainvoke_tool`**: Asynchronously invoke a tool on this agent.
- **`invoke_tool`**: Synchronously invoke a tool on this agent.
- **`aget_knowledge_bases`**: Asynchronously get knowledge bases associated with this agent.
- **`get_knowledge_bases`**: Synchronously get knowledge bases associated with this agent.
- **`aget_session`**: Asynchronously retrieve a session by ID.
- **`get_session`**: Synchronously retrieve a session by ID.
- **`adelete_session`**: Asynchronously delete a session by ID.
- **`delete_session`**: Synchronously delete a session by ID.

## Examples

### Create and Manage Agents

```python
from xpander_sdk import Agents, Configuration

# Initialize the SDK
config = Configuration(api_key="your-api-key", organization_id="your-org-id")
agents_manager = Agents(configuration=config)

# List all agents
# Note: alist is an asynchronous function
all_agents = await agents_manager.alist()
```

### Create and Execute a Task

```python
from xpander_sdk import Agent

# Load an existing agent by ID
agent = Agent.load("agent123", configuration=config)

# Create and execute a task
# Note: acreate_task is an asynchronous function
task = await agent.acreate_task(
    prompt="Please summarize this document.",
    file_urls=[]
)
print(task.result)
```

### Configuration Management

```python
# Update agent's configuration
agent.set_configuration(new_config)

# Add MCP server configuration
await agent.aadd_mcp_server("data-server", mcp_config)
```

## API Reference

### `Agents`

- **`async acreate(name: str, description: str, ...)`**: Create a new agent asynchronously
  - **Parameters**: `name` (str): The agent's name. `description` (str): A brief description of the agent.
  - **Returns**: An instance of `Agent`.

### `Agent`

- **`async arun(self, input_data: Any, ...)`**: Execute a task asynchronously

  - **Parameters**: `input_data` (Any): The input data for the task.
  - **Returns**: Task execution result.

- **`async aadd_mcp_server(self, server_name: str, config: dict)`**: Add MCP server configuration
  - **Parameters**: `server_name` (str): Name of the server.
  - **Returns**: None

## Additional Information

- For configuration options, refer to the [Configuration Guide](CONFIGURATION.md).
- Async support allows for efficient execution in production.
- For more advanced use-cases, refer to the full [SDK Documentation](https://docs.xpander.ai).

Contact Support: dev@xpander.ai
