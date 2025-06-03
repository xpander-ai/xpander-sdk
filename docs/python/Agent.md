<h3 align="center">
  <a name="readme-top"></a>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.xpanderai.io/logo/xpander.ai_dark.png">
    <img
      src="https://assets.xpanderai.io/logo/xpander.ai_light.png"
      style="max-width: 100%; height: auto; width: auto; max-height: 170px;"
      alt="xpander.ai Logo"
    >
  </picture>
</h3>

<div align="center">
  <h1>A framework-agnostic Backend for your AI Agents</h1>

  <a href="https://pepy.tech/projects/xpander-sdk"><img src="https://static.pepy.tech/badge/xpander-sdk/month"></a> 
  <a href="https://github.com/xpander-ai/xpander.ai/blob/main/LICENSE"><img src="https://img.shields.io/github/license/xpander-ai/xpander.ai" alt="License"></a> <a href="https://pypi.org/project/xpander-sdk"><img src="https://img.shields.io/pypi/v/xpander-sdk" alt="PyPI Version"></a> <a href="https://npmjs.com/package/xpander-sdk"><img src="https://img.shields.io/npm/v/xpander-sdk" alt="NPM Version"></a> <a href="https://app.xpander.ai"><img src="https://img.shields.io/badge/platform-login-30a46c" alt="Platform Login"></a>
</div>

<div align="center">
  <p align="center">
<a href="https://x.com/xpander_ai"><img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" /></a> <a href="https://www.linkedin.com/company/xpander-ai"><img src="https://img.shields.io/badge/Follow%20on%20LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a> <a href="https://discord.gg/CUcp4WWh5g"><img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a>
  </p>
</div>

---

## 🏗️ Agent

**Language:** Python | **Type:** Class

## 📦 Installation & Import

```python
from xpander_sdk import Agent
```

## 📖 Description

Represents an agent in xpanderAI, managing tools, sessions, and operational workflows.

> This class facilitates loading agents, handling tool executions, and managing prompt groups.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new Agent()`

> Constructs a new Agent instance.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configuration` | `Configuration` | ✅ | - Configuration settings for the agent. |
| `id` | `string` | ✅ | - Unique identifier for the agent. |
| `name` | `string` | ✅ | - Human-readable name of the agent. |
| `organizationId` | `string` | ✅ | - Organization ID to which the agent belongs. |
| `status` | `AgentStatus` | ✅ | - Current status of the agent. |
| `delegationType` | `AgentDelegationType` | ✅ | - The agent's delegation type (Router/Sequence). |
| `delegationEndStrategy` | `AgentDelegationEndStrategy` | ✅ | No description |
| `memoryType` | `MemoryType` | ✅ | - Type of memory the agent utilizes. |
| `memoryStrategy` | `MemoryStrategy` | ✅ | - Strategy for memory management. |
| `instructions` | `IAgentInstructions` | ✅ | - Instructions for the agent's operation. |
| `accessScope` | `AgentAccessScope` | ✅ | - Scope of the agent's access permissions. |
| `sourceNodes` | `List[ISourceNode]` | ✅ | - Source nodes associated with the agent. |
| `prompts` | `List[string]` | ✅ | - Prompts used by the agent. |
| `tools` | `List[IAgentTool]` | ❌ | - Tools available to the agent. |
| `_graph` | `List[any]` | ❌ | No description |
| `knowledgeBases` | `List[KnowledgeBase]` | ❌ | - Knowledge bases associated with the agent. |
| `oas` | `any` | ❌ | No description |

</details>

**Usage:**

```python
instance = Agent(configuration, id)
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `endToolEnabled`

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `hasLocalTools`

Checks if the agent has local tools loaded.

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `hasMCPServers`

Checks if the agent has mcp servers attached.

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `memory`

Retrieves the memory instance for the agent.

| Property | Value |
|----------|-------|
| **Type** | `Memory` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `messages`

Retrieves list of messages.

| Property | Value |
|----------|-------|
| **Type** | `List[any]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `sourceNodeType`

Retrieves the type of source node for the agent.

| Property | Value |
|----------|-------|
| **Type** | `SourceNodeType` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `toolChoice`

Gets the tool choice mode.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `url`

Constructs the API URL for this agent.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `vanillaKnowledgeBases`

Retrieves the vanilla knowledge bases of the agent.

| Property | Value |
|----------|-------|
| **Type** | `List[KnowledgeBase]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `accessScope`

- Scope of the agent's access permissions.

| Property | Value |
|----------|-------|
| **Type** | `AgentAccessScope` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `configuration`

- Configuration settings for the agent.

| Property | Value |
|----------|-------|
| **Type** | `Configuration` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `delegationEndStrategy`

| Property | Value |
|----------|-------|
| **Type** | `AgentDelegationEndStrategy` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `delegationType`

- The agent's delegation type (Router/Sequence).

| Property | Value |
|----------|-------|
| **Type** | `AgentDelegationType` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `graph`

| Property | Value |
|----------|-------|
| **Type** | `Graph` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `id`

- Unique identifier for the agent.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `instructions`

- Instructions for the agent's operation.

| Property | Value |
|----------|-------|
| **Type** | `IAgentInstructions` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `knowledgeBases`

- Knowledge bases associated with the agent.

| Property | Value |
|----------|-------|
| **Type** | `List[KnowledgeBase]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `llmProvider`

| Property | Value |
|----------|-------|
| **Type** | `LLMProvider` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `localTools`

Collection of local tools specific to this agent.

| Property | Value |
|----------|-------|
| **Type** | `List[ILocalTool]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `memoryStrategy`

- Strategy for memory management.

| Property | Value |
|----------|-------|
| **Type** | `MemoryStrategy` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `memoryType`

- Type of memory the agent utilizes.

| Property | Value |
|----------|-------|
| **Type** | `MemoryType` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `name`

- Human-readable name of the agent.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `oas`

| Property | Value |
|----------|-------|
| **Type** | `any` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `organizationId`

- Organization ID to which the agent belongs.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `originalToolNamesReMapping`

Maps original tool names to renamed versions for consistency.

| Property | Value |
|----------|-------|
| **Type** | `Dict[str, string]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `prompts`

- Prompts used by the agent.

| Property | Value |
|----------|-------|
| **Type** | `List[string]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `ready`

Indicates if the agent is ready and tools are loaded.

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `sourceNodes`

- Source nodes associated with the agent.

| Property | Value |
|----------|-------|
| **Type** | `List[ISourceNode]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `status`

- Current status of the agent.

| Property | Value |
|----------|-------|
| **Type** | `AgentStatus` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `tools`

- Tools available to the agent.

| Property | Value |
|----------|-------|
| **Type** | `List[IAgentTool]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

### ⚙️ Optional Properties

#### ⚙️ `execution`

| Property | Value |
|----------|-------|
| **Type** | `Execution` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

#### ⚙️ `executionMemory`

| Property | Value |
|----------|-------|
| **Type** | `Memory` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

#### ⚙️ `userDetails`

| Property | Value |
|----------|-------|
| **Type** | `UserDetails` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### ➕ `addLocalTools()`

> Adds local tools to the agent with prefixed function names.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tools` | `List[any] | List[ILocalTool]` | ✅ | - The list of local tools to add. |

</details>

**Usage:**

```python
result = agent.addLocalTools(tools)
```

---

#### ➕ `addMessages()`

> Adds messages to the memory thread.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `any` | ✅ | - An array of messages to be added to the memory thread. |

</details>

**Usage:**

```python
result = agent.addMessages(messages)
```

---

#### ➕ `addTask()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | ❌ | No description |
| `threadId` | `string` | ❌ | No description |
| `files` | `List[string]` | ❌ | No description |
| `useWorker` | `boolean` | ❌ | No description |

**Returns:** `Execution`

</details>

**Usage:**

```python
result = agent.addTask(input=None, threadId=None)
```

---

#### ➕ `addToolCallResults()`

> Adds tool call results as messages to the memory thread.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCallResults` | `List[ToolCallResult]` | ✅ | - An array of tool call results to be added as messages. |

</details>

**Usage:**

```python
result = agent.addToolCallResults(toolCallResults)
```

---

#### 📥 `getTools()`

> Retrieves tools compatible with a specified LLM provider.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `llmProvider` | `LLMProvider` | ❌ | - The LLM provider to filter tools by (default: `OPEN_AI`). |

**Returns:** `List[any]`

</details>

**Usage:**

```python
result = agent.getTools(llmProvider=None)
```

---

#### 📥 `load()`

> Loads the agent data from its source node type.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agentId` | `string` | ❌ | No description |
| `ignoreCache` | `boolean` | ❌ | No description |
| `rawAgentData` | `any` | ❌ | No description |

</details>

**Usage:**

```python
result = agent.load(agentId=None, ignoreCache=None)
```

---

#### 📥 `retrieveAgenticInterfaces()`

> Retrieves a list of available agentic interfaces.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ignore_cache` | `boolean` | ❌ | - Whether to ignore cached data and fetch fresh data. |

**Returns:** `List[AgenticInterface]`

</details>

**Usage:**

```python
result = agent.retrieveAgenticInterfaces(ignore_cache=None)
```

---

#### 📥 `retrieveAgenticOperations()`

> Retrieves a list of operations for a given agentic interface.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agenticInterface` | `AgenticInterface` | ✅ | - The agentic interface to retrieve operations for. |
| `ignore_cache` | `boolean` | ❌ | - Whether to ignore cached data and fetch fresh data. |

**Returns:** `List[AgenticOperation]`

</details>

**Usage:**

```python
result = agent.retrieveAgenticOperations(agenticInterface, ignore_cache=None)
```

---

#### 📥 `retrieveExecutionResult()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `Execution`

</details>

**Usage:**

```python
result = agent.retrieveExecutionResult()
```

---

#### 📥 `retrieveNodeFromGraph()`

> Retrieves a node from the graph by its ID.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `itemId` | `string` | ✅ | - The ID of the graph node to retrieve. |

**Returns:** `GraphItem`

</details>

**Usage:**

```python
result = agent.retrieveNodeFromGraph(itemId)
```

---

#### 📥 `retrievePendingLocalToolCalls()`

> Filters and retrieves local tool calls from a given list of tool calls.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCalls` | `List[ToolCall]` | ✅ | - The list of tool calls to filter. |

**Returns:** `List[ToolCall]`

</details>

**Usage:**

```python
result = agent.retrievePendingLocalToolCalls(toolCalls)
```

---

#### 📥 `retrieveThreadsList()`

> Retrieves the list of memory threads for the current user.

<details>
<summary>📋 Method Details</summary>

**Returns:** `List[MemoryThread]`

</details>

**Usage:**

```python
result = agent.retrieveThreadsList()
```

---

#### ✏️ `update()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `Agent`

</details>

**Usage:**

```python
result = agent.update()
```

---

#### ✏️ `updateUserDetails()`

> Updates the user details for the agent.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userDetails` | `UserDetails` | ✅ | - The user details to update. |

</details>

**Usage:**

```python
result = agent.updateUserDetails(userDetails)
```

---

### 🛠️ Utility Methods

#### ❌ `disableAgentEndTool()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```python
result = agent.disableAgentEndTool()
```

---

#### 🔍 `extractToolCalls()`

> Extracts tool calls from an LLM response based on the specified LLM provider.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `llmResponse` | `any` | ✅ | - The LLM response to analyze for tool calls. |

**Returns:** `List[ToolCall]`

</details>

**Usage:**

```python
result = agent.extractToolCalls(llmResponse)
```

---

#### 🏁 `isFinished()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `boolean`

</details>

**Usage:**

```python
result = agent.isFinished()
```

---

#### 📥 `retrieveThreadsList()`

> Retrieves the list of memory threads for the current user.

<details>
<summary>📋 Method Details</summary>

**Returns:** `List[MemoryThread]`

</details>

**Usage:**

```python
result = agent.retrieveThreadsList()
```

---

### 🔄 Other Methods

#### 🔗 `attachOperations()`

> Attaches a list of agentic operations to the agent.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `operations` | `List[AgenticOperation]` | ✅ | - The list of agentic operations to attach. |

</details>

**Usage:**

```python
result = agent.attachOperations(operations)
```

---

#### ✅ `enableAgentEndTool()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```python
result = agent.enableAgentEndTool()
```

---

#### ➕ `initTask()`

> Initializes the task execution for the agent.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `execution` | `any` | ✅ | - The execution details. |

</details>

**Usage:**

```python
result = agent.initTask(execution)
```

---

#### 📊 `reportExecutionMetrics()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `llmTokens` | `Tokens` | ✅ | No description |
| `aiModel` | `string` | ❌ | No description |
| `sourceNodeType` | `string` | ❌ | No description |

</details>

**Usage:**

```python
result = agent.reportExecutionMetrics(llmTokens, aiModel=None)
```

---

#### 📊 `reportLlmUsage()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `llmResponse` | `any` | ✅ | No description |
| `llmInferenceDuration` | `number` | ❌ | No description |
| `llmProvider` | `LLMProvider` | ❌ | No description |
| `sourceNodeType` | `string` | ❌ | No description |

</details>

**Usage:**

```python
result = agent.reportLlmUsage(llmResponse, llmInferenceDuration=None)
```

---

#### ▶️ `runTool()`

> Executes a single tool call and returns the result.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tool` | `ToolCall` | ✅ | - The tool call to execute. |
| `payloadExtension` | `any` | ❌ | - Additional payload data to merge. |
| `isMultiple` | `boolean` | ❌ | No description |

**Returns:** `ToolCallResult`

</details>

**Usage:**

```python
result = agent.runTool(tool, payloadExtension=None)
```

---

#### ▶️ `runTools()`

> Executes multiple tool calls sequentially and returns their results.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCalls` | `List[ToolCall]` | ✅ | - The list of tool calls to execute. |
| `payloadExtension` | `any` | ❌ | - Additional payload data to merge. |

**Returns:** `List[ToolCallResult]`

</details>

**Usage:**

```python
result = agent.runTools(toolCalls, payloadExtension=None)
```

---

#### 🔧 `selectLLMProvider()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `llmProvider` | `LLMProvider` | ✅ | No description |

</details>

**Usage:**

```python
result = agent.selectLLMProvider(llmProvider)
```

---

#### 🔧 `stop()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```python
result = agent.stop()
```

---

#### 🔧 `stopExecution()`

> Stops execution and reports the final result to the controller via a tool call.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isSuccess` | `boolean` | ✅ | - Indicates whether the execution was successful. |
| `result` | `string` | ❌ | - Optional result string to return upon stopping. |

</details>

**Usage:**

```python
result = agent.stopExecution(isSuccess, result=None)
```

---

#### 🔧 `sync()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `Agent`

</details>

**Usage:**

```python
result = agent.sync()
```

---

## ⚡ Static Methods

#### 📥 `getById()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configuration` | `Configuration` | ✅ | No description |
| `agentId` | `string` | ✅ | No description |

**Returns:** `Agent`

</details>

**Usage:**

```python
result = agent.getById(configuration, agentId)
```

---

## Usage Example

<details>
<summary>🐍 Python Agent Implementation</summary>

```python
from xpander_sdk import Agent, XpanderClient, LLMProvider
import asyncio

class MyAgent:
    def __init__(self, agent: Agent):
        self.agent = agent
        
    async def agent_loop(self, task: str):
        """Demonstrate core Agent workflow using available methods."""
        
        # Agent workflow
        print(f"🤖 Agent: {self.agent.name}")
        print(f"📊 Status: {self.agent.status}")
        
        # Main reasoning loop
        while not self.agent.is_finished():
            print("🤔 Agent thinking...")
            
            # Get available tools
            tools = self.agent.get_tools(LLMProvider.OPEN_AI)
            print(f"🔧 Available tools: {len(tools)}")
            
            # Access conversation state
            messages = self.agent.messages
            print(f"💬 Messages: {len(messages)}")
            
            # Simulate LLM response with tool calls
            mock_response = {"choices": [{"message": {"tool_calls": []}}]}
            
            # Add LLM response to memory
            self.agent.add_messages(mock_response)
            
            # Extract and execute tool calls
            tool_calls = self.agent.extract_tool_calls(mock_response)
            results = self.agent.run_tools(tool_calls)
            print(f"⚡ Executed {len(results)} tools")
            
            break  # Break for demo
        
        # Get final result
        result = self.agent.retrieve_execution_result()
        print(f"✅ Final result: {result}")
        return result

# Usage
async def main():
    client = XpanderClient(api_key="your-api-key")
    agent = client.agents.get("your-agent-id")
    
    my_agent = MyAgent(agent)
    await my_agent.agent_loop("Complete my task")

if __name__ == "__main__":
    asyncio.run(main())
```

</details>

