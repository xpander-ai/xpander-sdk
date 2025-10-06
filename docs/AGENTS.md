# Agents Module Guide

The Agents Module in the xpander.ai SDK offers comprehensive tools for creating, configuring, managing, and executing AI agents on the xpander.ai platform. This guide explains available classes, methods, and real-world usage examples based on the test suite.

## Overview

With the Agents Module, developers can:

- List and retrieve AI agents from the platform
- Load agents with specific versions
- Create and manage tasks for agents
- Invoke tools through agents
- Access knowledge bases linked to agents
- Manage MCP (Model Context Protocol) servers
- Handle database connection strings for agents
- Manage user sessions and agent interactions
- Access agent storage and memory backends
- Configure custom LLM API keys for individual agents

## Classes

### Agents

Handles the lifecycle management of multiple agents. Offers methods to retrieve and manage agent lists and specific instances.

#### Key Methods

- **`alist()`**: Retrieve a list of all agents asynchronously.
- **`list()`**: Retrieve a list of all agents synchronously.
- **`aget(agent_id: str, version: Optional[int] = None)`**: Retrieve a specific agent by ID asynchronously.
- **`get(agent_id: str, version: Optional[int] = None)`**: Retrieve a specific agent by ID synchronously.

### AgentsListItem

Represents a summary item from the agents list with basic agent information.

#### Key Methods

- **`aload()`**: Asynchronously load the full agent details from this list item.
- **`load()`**: Synchronously load the full agent details from this list item.

### Agent

Represents a specific agent with capabilities to manage tasks, invoke tools, access linked knowledge bases, and manage connections.

#### Key Properties

- **`mcp_servers`**: List of MCPServerDetails configured for this agent.
- **`tools`**: ToolsRepository instance providing access to all agent tools.
- **`graph`**: Agent execution graph with all configured items.
- **`llm_credentials`**: Optional custom LLM API credentials for this agent.
- **`deployment_type`**: Deployment type for the agent (Serverless or Container).

#### Key Methods

##### Agent Loading

- **`aload(agent_id: str, configuration: Optional[Configuration] = None, version: Optional[int] = None)`**: Asynchronously load an existing agent (class method).
- **`load(agent_id: str, configuration: Optional[Configuration] = None, version: Optional[int] = None)`**: Synchronously load an existing agent (class method).

##### Task Management

- **`acreate_task(**kwargs)`\*\*: Create a new task for this agent asynchronously.
- **`create_task(**kwargs)`\*\*: Create a new task for this agent synchronously.

##### Tool Integration

- **`ainvoke_tool(tool: Tool, payload: Any, **kwargs)`\*\*: Asynchronously invoke a specific tool using the agent.
- **`invoke_tool(tool: Tool, payload: Any, **kwargs)`\*\*: Synchronously invoke a specific tool using the agent.

##### Knowledge Base Access

- **`aget_knowledge_bases()`**: Asynchronously access knowledge bases linked to this agent.
- **`get_knowledge_bases()`**: Synchronously access knowledge bases linked to this agent.

##### Connection Management

- **`aget_connection_string()`**: Asynchronously retrieve the agent's database connection string.
- **`get_connection_string()`**: Synchronously retrieve the agent's database connection string.

##### Session Management

- **`aget_user_sessions(user_id: str)`**: Asynchronously obtain user sessions associated with this agent.
- **`get_user_sessions(user_id: str)`**: Synchronously obtain user sessions associated with this agent.
- **`aget_session(session_id: str)`**: Asynchronously retrieve a specific session by ID.
- **`get_session(session_id: str)`**: Synchronously retrieve a specific session by ID.
- **`adelete_session(session_id: str)`**: Asynchronously delete a session by ID.
- **`delete_session(session_id: str)`**: Synchronously delete a session by ID.

## Examples

### Basic Agent Management

```python
from xpander_sdk import Agents, Agent, Configuration

# Initialize the SDK
config = Configuration(api_key="your-api-key", organization_id="your-org-id")
agents_manager = Agents(configuration=config)

# List all agents
all_agents = await agents_manager.alist()
for agent_item in all_agents:
    print(f"Agent: {agent_item.name} (ID: {agent_item.id})")

# Load specific agent by ID
agent = await agents_manager.aget(agent_id="your-agent-id")
print(f"Loaded agent: {agent.name}")
```

### Loading Agents from List Items

```python
# Get agent list and load full agent from list item
agents_list = await agents_manager.alist()
if agents_list:
    # Load full agent details from the first list item
    full_agent = await agents_list[0].aload()
    print(f"Loaded agent: {full_agent.name}")
    assert full_agent.id == agents_list[0].id
```

### Task Creation and Management

```python
# Create a task with basic prompt
prompt = "what can you do"
task = await agent.acreate_task(prompt=prompt)
print(f"Created task ID: {task.id}")
print(f"Task agent ID: {task.agent_id}")
print(f"Task input: {task.input.text}")

# Create task with additional options
task_with_options = await agent.acreate_task(
    prompt="Analyze this data",
    file_urls=["https://example.com/data.csv"],
    events_streaming=True,  # Enable real-time event streaming
    output_format=OutputFormat.Json,
    output_schema={"analysis": "string", "insights": "array"}
)
```

### MCP Server Access

```python
# Access MCP servers configured for the agent
if agent.mcp_servers:
    for mcp_server in agent.mcp_servers:
        print(f"MCP Server: {mcp_server.name}")
        print(f"Type: {mcp_server.type}")
        print(f"Command: {mcp_server.command}")
```

### Tool Integration

```python
# Access agent's tools repository
tools_repo = agent.tools
print(f"Available tools: {len(tools_repo.functions)}")

# Get specific tool and invoke it
email_tool = tools_repo.get_tool_by_id("XpanderEmailServiceSendEmailWithHtmlOrTextContent")
if email_tool:
    payload = {
        "body_params": {
            "subject": "Test email",
            "body_html": "Hello world",
            "to": ["user@example.com"],
        },
        "path_params": {},
        "query_params": {},
    }
    result = await agent.ainvoke_tool(tool=email_tool, payload=payload)
    print(f"Tool execution success: {result.is_success}")
```

### Knowledge Base Integration

```python
# Access agent's knowledge bases
kbs = await agent.aget_knowledge_bases()
for kb in kbs:
    print(f"Knowledge Base: {kb.name}")

    # Search within the knowledge base
    search_results = await kb.asearch(search_query="David Hines", top_k=1)
    for result in search_results:
        print(f"Content: {result.content[:100]}...")
        print(f"Score: {result.score}")
```

### Attaching Knowledge Bases to Agents

```python
from xpander_sdk import KnowledgeBases

# Get a knowledge base to attach
kb_manager = KnowledgeBases()
kb = await kb_manager.aget(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")

# Attach knowledge base to agent using the instance
agent.attach_knowledge_base(knowledge_base=kb)
```

### Custom LLM API Keys

Agents support custom LLM API keys that override default environment variables. The priority depends on the deployment environment:

```python
# For xpander cloud deployments:
# Priority: Custom LLM Key > Environment Variable

# For local deployments:
# Priority: Environment Variable > Custom LLM Key

# Example agent with custom LLM credentials
agent = await agents_manager.aget(agent_id="your-agent-id")

# Check if agent has custom LLM credentials configured
if agent.llm_credentials:
    print(f"Agent has custom LLM key: {agent.llm_credentials.name}")
    print(f"Description: {agent.llm_credentials.description}")
    # Note: The actual key value is securely stored and not displayed

# When using the Backend module, custom keys are automatically resolved:
from xpander_sdk import Backend

backend = Backend()
args = await backend.aget_args(agent=agent)
# The resolved model will use the appropriate API key based on priority

# Or attach using just the knowledge base ID
agent.attach_knowledge_base(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")

# Verify the knowledge base is now attached
attached_kbs = await agent.aget_knowledge_bases()
print(f"Agent now has {len(attached_kbs)} knowledge bases attached")
assert any(k.id == kb.id for k in attached_kbs)
```

### Connection String Management

```python
# Get agent's database connection string
connection_string = await agent.aget_connection_string()
print(f"Database URI: {connection_string.connection_uri.uri}")
```

### Session Management

```python
# Get user sessions for a specific user
user_sessions = await agent.aget_user_sessions(user_id="user@example.com")
print(f"Found {len(user_sessions)} sessions")

# Access specific session
if user_sessions:
    session_id = user_sessions[0].id  # Assuming session has an id attribute
    session_details = await agent.aget_session(session_id=session_id)
    print(f"Session details: {session_details}")

    # Delete session when no longer needed
    await agent.adelete_session(session_id=session_id)
```

### Agent Graph Access

```python
# Access agent's execution graph
if agent.graph and agent.graph.items:
    print(f"Graph has {len(agent.graph.items)} items")

    # Find specific graph item
    graph_item = agent.graph.get_graph_item(attr="item_id", value="some-tool-id")
    if graph_item:
        print(f"Found graph item: {graph_item.type}")
```

### Advanced Storage Management

```python
# Access agent's storage backend (requires Agno framework)
try:
    storage = await agent.aget_db()
    print(f"Storage backend initialized: {storage}")

    # Example usage would depend on the storage backend API
    # This is typically used internally by session management
except NotImplementedError as e:
    print(f"Storage not supported: {e}")
except LookupError as e:
    print(f"Storage not enabled: {e}")
```

### Knowledge Base Search Integration

```python
# Use the knowledge bases retriever for search
if agent.has_knowledge_bases:
    retriever = agent.knowledge_bases_retriever()

    # Search across all linked knowledge bases
    search_results = retriever(
        query="pricing strategy",
        num_documents=10
    )

    if search_results:
        for result in search_results:
            print(f"Document: {result['document_name']}")
            print(f"Content: {result['content'][:100]}...")
            print(f"Score: {result['score']}")
    else:
        print("No results found")
else:
    print("No knowledge bases linked to this agent")
```

### Agent Status and Properties

```python
# Check agent status and properties
print(f"Agent is active: {agent.is_active}")
print(f"Agent has knowledge bases: {agent.has_knowledge_bases}")
print(f"Agent output configuration: {agent.output}")

# Access agent configuration details
print(f"Agent framework: {agent.framework}")
print(f"Model provider: {agent.model_provider}")
print(f"Model name: {agent.model_name}")
print(f"Output format: {agent.output_format}")
print(f"Deployment type: {agent.deployment_type}")
```

### Agent Deployment Configuration

```python
from xpander_sdk import AgentDeploymentType

# Check agent deployment type
if agent.deployment_type == AgentDeploymentType.Serverless:
    print("Agent is configured for serverless deployment")
elif agent.deployment_type == AgentDeploymentType.Container:
    print("Agent is configured for container deployment")

# The deployment type affects how the agent is executed:
# - Serverless: Agent runs in a serverless environment, ideal for lightweight tasks
# - Container: Agent runs in a containerized environment, suitable for resource-intensive operations
```

## API Reference

### `Agents`

- **`async alist()`**: Asynchronously retrieves all available agents.

  - **Returns**: `List[AgentsListItem]` containing summary of each agent.
  - **Raises**: `ModuleException` on API errors.

- **`list()`**: Synchronously retrieves all available agents.

  - **Returns**: `List[AgentsListItem]` containing summary of each agent.

- **`async aget(agent_id: str, version: Optional[int] = None)`**: Loads a specific agent by ID.

  - **Parameters**:
    - `agent_id` (str): Agent's unique identifier
    - `version` (Optional[int]): Optional version number
  - **Returns**: `Agent` instance with complete configuration.
  - **Raises**: `ModuleException` if agent not found or access denied.

- **`get(agent_id: str, version: Optional[int] = None)`**: Synchronously loads a specific agent.
  - **Parameters**: Same as `aget`
  - **Returns**: `Agent` instance.

### `AgentsListItem`

- **`async aload()`**: Load full agent details from this list item.

  - **Returns**: `Agent` instance with complete configuration.

- **`load()`**: Synchronously load full agent details.
  - **Returns**: `Agent` instance.

### `Agent`

#### Core Methods

- **`async acreate_task(self, existing_task_id: Optional[str] = None, prompt: Optional[str] = "", file_urls: Optional[List[str]] = [], user_details: Optional[User] = None, agent_version: Optional[str] = None, tool_call_payload_extension: Optional[dict] = None, source: Optional[str] = None, worker_id: Optional[str] = None, run_locally: Optional[bool] = False, output_format: Optional[OutputFormat] = None, output_schema: Optional[Dict] = None, events_streaming: Optional[bool] = False, additional_context: Optional[str] = None, expected_output: Optional[str] = None) -> Task`**: Asynchronously create a new task and link it to this agent.

  - **Parameters**:
    - `existing_task_id` (Optional[str]): Existing task id if exists.
    - `prompt` (Optional[str]): Task initiation prompt.
    - `file_urls` (Optional[List[str]]): URLs of files related to the task.
    - `user_details` (Optional[User]): User linked to this task context.
    - `agent_version` (Optional[str]): Optional agent version to use.
    - `tool_call_payload_extension` (Optional[dict]): Extend payload with additional information.
    - `source` (Optional[str]): Origin or source of the request.
    - `worker_id` (Optional[str]): Worker identifier if applicable.
    - `run_locally` (Optional[bool]): Indicates if task should run locally.
    - `output_format` (Optional[OutputFormat]): Format for output response.
    - `output_schema` (Optional[Dict]): Schema defining structure of output.
    - `events_streaming` (Optional[bool]): Flag indicating if events are required for this task.
    - `additional_context` (Optional[str]): Additional context to be passed to the agent.
    - `expected_output` (Optional[str]): Expected output of the execution.
  - **Returns**: `Task` - Created Task object linked to this agent.
  - **Raises**: `ModuleException` on task creation failure.

- **`create_task(self, \*args, **kwargs) -> Task`\*\*: Synchronously create a new task for this agent.

  - **Parameters**: Arguments matching `acreate_task`.
  - **Returns**: `Task` - Created Task object linked to this agent.
  - **Example**: `>>> task = agent.create_task(prompt="Analyze data files")`

- **`async ainvoke_tool(self, tool: Tool, payload: Any, payload_extension: Optional[Dict] = {}, task_id: Optional[str] = None, tool_call_id: Optional[str] = None) -> ToolInvocationResult`**: Asynchronously invoke a specific tool linked to the agent.

  - **Parameters**:
    - `tool` (Tool): Tool to be invoked during the execution.
    - `payload` (Any): Data payload to be passed to the tool.
    - `payload_extension` (Optional[Dict]): Optional payload extensions.
    - `task_id` (Optional[str]): Related task ID if linked.
    - `tool_call_id` (Optional[str]): Optional tool call identifier.
  - **Returns**: `ToolInvocationResult` - Result object with execution details.

- **`invoke_tool(self, \*args, **kwargs) -> ToolInvocationResult`\*\*: Synchronously invoke a specific tool linked to the agent.
  - **Parameters**: Arguments matching `ainvoke_tool`.
  - **Returns**: `ToolInvocationResult` - Result object with execution details.
  - **Example**: `>>> result = agent.invoke_tool(my_tool, payload={"data": "value"})`

#### Knowledge Base Methods

- **`attach_knowledge_base(self, knowledge_base: Optional[KnowledgeBase] = None, knowledge_base_id: Optional[str] = None)`**: Attach a knowledge base to the agent if it is not already linked.

  - **Parameters**:
    - `knowledge_base` (Optional[KnowledgeBase]): The KnowledgeBase instance to attach.
    - `knowledge_base_id` (Optional[str]): The unique identifier of the knowledge base.
  - **Raises**:
    - `ValueError`: If neither a knowledge base nor an ID is provided.
    - `TypeError`: If a provided knowledge base is not a valid `KnowledgeBase` instance.
  - **Example**: `>>> agent.attach_knowledge_base(knowledge_base_id="kb_12345")`

  - **Note**: Changes only affect the runtime instance of the agent. To persist changes, an explicit save or sync must be called.

- **`async aget_knowledge_bases()`**: Get linked knowledge bases.

  - **Returns**: `List[KnowledgeBase]`

- **`get_knowledge_bases()`**: Synchronously get linked knowledge bases.
  - **Returns**: `List[KnowledgeBase]`

#### Connection Methods

- **`async aget_connection_string()`**: Get database connection string.

  - **Returns**: `DatabaseConnectionString`
  - **Raises**: `ModuleException` on failure.

- **`get_connection_string()`**: Synchronously get connection string.
  - **Returns**: `DatabaseConnectionString`

#### Session Methods

- **`async aget_user_sessions(self, user_id: str)`**: Asynchronously retrieve all user sessions associated with this agent.

  - **Description**: This method loads all saved session records linked to the specified user ID from the agent's storage backend. It is only supported for agents using the Agno framework with session storage enabled.
  - **Parameters**:
    - `user_id` (str): Identifier of the user whose sessions are to be retrieved.
  - **Returns**: `Any` - A list of session records associated with the user.
  - **Raises**:
    - `NotImplementedError`: If the agent framework does not support session storage.
    - `LookupError`: If session storage is not enabled for this agent.
    - `ImportError`: If required dependencies for Agno storage are not installed.
    - `ValueError`: If the agent connection string is invalid.
  - **Example**: `>>> sessions = await agent.aget_user_sessions(user_id="user_123")`

- **`get_user_sessions(self, user_id: str)`**: Synchronously retrieve all user sessions associated with this agent.

  - **Description**: This method wraps the asynchronous `aget_user_sessions` method and returns the result in a synchronous context. It loads session data for a given user ID from the agent's storage backend.
  - **Parameters**:
    - `user_id` (str): Identifier of the user whose sessions are to be retrieved.
  - **Returns**: `Any` - A list of sessions related to the given user.
  - **Example**: `>>> sessions = agent.get_user_sessions(user_id="user_123")`

- **`async aget_session(self, session_id: str)`**: Asynchronously retrieve a single session by its session ID.

  - **Description**: This method accesses the agent's storage backend and loads the session record corresponding to the given session ID. It is only supported for agents using the Agno framework with session storage enabled.
  - **Parameters**:
    - `session_id` (str): Unique identifier of the session to retrieve.
  - **Returns**: `Any` - A single session record if found, or None if the session does not exist.
  - **Raises**:
    - `NotImplementedError`: If the agent framework does not support session storage.
    - `LookupError`: If session storage is not enabled for this agent.
    - `ImportError`: If required dependencies for Agno storage are not installed.
    - `ValueError`: If the agent connection string is invalid.
  - **Example**: `>>> session = await agent.aget_session(session_id="sess_456")`

- **`get_session(self, session_id: str)`**: Synchronously retrieve a single session by its session ID.

  - **Description**: This method wraps the asynchronous `aget_session` and returns the result in a synchronous context. It retrieves the session record from the agent's storage backend using the given session ID.
  - **Parameters**:
    - `session_id` (str): Unique identifier of the session to retrieve.
  - **Returns**: `Any` - A single session record if found, or None if the session does not exist.
  - **Example**: `>>> session = agent.get_session(session_id="sess_456")`

- **`async adelete_session(self, session_id: str)`**: Asynchronously delete a session by its session ID.

  - **Description**: This method removes a specific session record from the agent's storage backend based on the provided session ID. It is only supported for agents using the Agno framework with session storage enabled.
  - **Parameters**:
    - `session_id` (str): Unique identifier of the session to delete.
  - **Raises**:
    - `NotImplementedError`: If the agent framework does not support session storage.
    - `LookupError`: If session storage is not enabled for this agent.
    - `ImportError`: If required dependencies for Agno storage are not installed.
    - `ValueError`: If the agent connection string is invalid.
  - **Example**: `>>> await agent.adelete_session(session_id="sess_456")`

- **`delete_session(self, session_id: str)`**: Synchronously delete a session by its session ID.
  - **Description**: This method wraps the asynchronous `adelete_session` and removes the session record from the agent's storage backend in a synchronous context.
  - **Parameters**:
    - `session_id` (str): Unique identifier of the session to delete.
  - **Example**: `>>> agent.delete_session(session_id="sess_456")`

#### Storage and Memory Methods

- **`async aget_db()`**: Asynchronously retrieve the storage backend for this agent.

  - **Description**: This method returns the storage backend for agent sessions. Only supported for agents using the Agno framework with session storage enabled.
  - **Returns**: `PostgresDb` - Initialized storage backend for agent sessions.
  - **Raises**:
    - `NotImplementedError`: If the framework does not support storage.
    - `ImportError`: If required dependencies are missing.
    - `ValueError`: If the connection string for storage is invalid.
    - `LookupError`: If session storage is not enabled for this agent.

- **`get_db()`**: Synchronously retrieve the storage backend for this agent.

  - **Returns**: `Any` - Initialized storage backend for agent sessions.
  - **Example**: `>>> storage = agent.get_db()`

#### Utility Methods

- **`knowledge_bases_retriever()`**: Retrieve callable to perform search within linked knowledge bases.
  - **Returns**: `Callable[[str, Optional[Any], int], asyncio.Future]` - Function to execute a search query across all linked knowledge bases.
  - **Description**: Returns a search function that can query all knowledge bases associated with the agent.

#### Properties

- **`has_knowledge_bases`**: Check if any knowledge bases are linked to this agent.

  - **Type**: `bool`
  - **Returns**: `True` if one or more knowledge bases are linked, otherwise `False`.

- **`is_active`**: Check if the agent is active.

  - **Type**: `bool`
  - **Returns**: `True` if the agent is active, `False` if not.

- **`output`**: Construct the output settings for this agent.
  - **Type**: `AgentOutput`
  - **Returns**: Output configuration based on schema and format.

## Error Handling

```python
from xpander_sdk.exceptions import ModuleException

try:
    agent = await agents.aget(agent_id="invalid-id")
except ModuleException as e:
    print(f"Error {e.status_code}: {e.description}")
```

## Additional Information

- All asynchronous methods have synchronous counterparts for convenience
- MCP servers are automatically loaded with agent configuration
- Session management requires Agno framework with session storage enabled
- Connection strings are cached after first retrieval
- For configuration options, refer to the [Configuration Guide](CONFIGURATION.md)
- For more advanced scenarios, visit the full [SDK Documentation](https://docs.xpander.ai)

Contact Support: dev@xpander.ai
