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

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { Agent } from 'xpander-sdk';
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
| `sourceNodes` | `ISourceNode[]` | ✅ | - Source nodes associated with the agent. |
| `prompts` | `string[]` | ✅ | - Prompts used by the agent. |
| `tools` | `IAgentTool[]` | ❌ | - Tools available to the agent. |
| `_graph` | `any[]` | ❌ | No description |
| `knowledgeBases` | `KnowledgeBase[]` | ❌ | - Knowledge bases associated with the agent. |
| `oas` | `any` | ❌ | No description |

</details>

**Usage:**

```typescript
const instance = new Agent(configuration, id);
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
| **Type** | `any[]` |
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
| **Type** | `KnowledgeBase[]` |
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
| **Type** | `KnowledgeBase[]` |
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
| **Type** | `ILocalTool[]` |
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
| **Type** | `{ [key: string]: string }` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `prompts`

- Prompts used by the agent.

| Property | Value |
|----------|-------|
| **Type** | `string[]` |
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
| **Type** | `ISourceNode[]` |
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
| **Type** | `IAgentTool[]` |
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
| `tools` | `any[] | ILocalTool[]` | ✅ | - The list of local tools to add. |

</details>

**Usage:**

```typescript
const result = agent.addLocalTools(tools);
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

```typescript
const result = agent.addMessages(messages);
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
| `files` | `string[]` | ❌ | No description |
| `useWorker` | `boolean` | ❌ | No description |

**Returns:** `Execution`

</details>

**Usage:**

```typescript
const result = agent.addTask(input, threadId);
```

---

#### ➕ `addToolCallResults()`

> Adds tool call results as messages to the memory thread.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCallResults` | `ToolCallResult[]` | ✅ | - An array of tool call results to be added as messages. |

</details>

**Usage:**

```typescript
const result = agent.addToolCallResults(toolCallResults);
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

**Returns:** `any[]`

</details>

**Usage:**

```typescript
const result = agent.getTools(llmProvider);
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

```typescript
const result = agent.load(agentId, ignoreCache);
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

**Returns:** `AgenticInterface[]`

</details>

**Usage:**

```typescript
const result = agent.retrieveAgenticInterfaces(ignore_cache);
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

**Returns:** `AgenticOperation[]`

</details>

**Usage:**

```typescript
const result = agent.retrieveAgenticOperations(agenticInterface, ignore_cache);
```

---

#### 📥 `retrieveExecutionResult()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `Execution`

</details>

**Usage:**

```typescript
const result = agent.retrieveExecutionResult();
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

```typescript
const result = agent.retrieveNodeFromGraph(itemId);
```

---

#### 📥 `retrievePendingLocalToolCalls()`

> Filters and retrieves local tool calls from a given list of tool calls.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCalls` | `ToolCall[]` | ✅ | - The list of tool calls to filter. |

**Returns:** `ToolCall[]`

</details>

**Usage:**

```typescript
const result = agent.retrievePendingLocalToolCalls(toolCalls);
```

---

#### 📥 `retrieveThreadsList()`

> Retrieves the list of memory threads for the current user.

<details>
<summary>📋 Method Details</summary>

**Returns:** `MemoryThread[]`

</details>

**Usage:**

```typescript
const result = agent.retrieveThreadsList();
```

---

#### ✏️ `update()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `Agent`

</details>

**Usage:**

```typescript
const result = agent.update();
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

```typescript
const result = agent.updateUserDetails(userDetails);
```

---

### 🛠️ Utility Methods

#### ❌ `disableAgentEndTool()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```typescript
const result = agent.disableAgentEndTool();
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

**Returns:** `ToolCall[]`

</details>

**Usage:**

```typescript
const result = agent.extractToolCalls(llmResponse);
```

---

#### 🏁 `isFinished()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `boolean`

</details>

**Usage:**

```typescript
const result = agent.isFinished();
```

---

#### 📥 `retrieveThreadsList()`

> Retrieves the list of memory threads for the current user.

<details>
<summary>📋 Method Details</summary>

**Returns:** `MemoryThread[]`

</details>

**Usage:**

```typescript
const result = agent.retrieveThreadsList();
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
| `operations` | `AgenticOperation[]` | ✅ | - The list of agentic operations to attach. |

</details>

**Usage:**

```typescript
const result = agent.attachOperations(operations);
```

---

#### ✅ `enableAgentEndTool()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```typescript
const result = agent.enableAgentEndTool();
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

```typescript
const result = agent.initTask(execution);
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

```typescript
const result = agent.reportExecutionMetrics(llmTokens, aiModel);
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

```typescript
const result = agent.reportLlmUsage(llmResponse, llmInferenceDuration);
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

```typescript
const result = agent.runTool(tool, payloadExtension);
```

---

#### ▶️ `runTools()`

> Executes multiple tool calls sequentially and returns their results.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCalls` | `ToolCall[]` | ✅ | - The list of tool calls to execute. |
| `payloadExtension` | `any` | ❌ | - Additional payload data to merge. |

**Returns:** `ToolCallResult[]`

</details>

**Usage:**

```typescript
const result = agent.runTools(toolCalls, payloadExtension);
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

```typescript
const result = agent.selectLLMProvider(llmProvider);
```

---

#### 🔧 `stop()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```typescript
const result = agent.stop();
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

```typescript
const result = agent.stopExecution(isSuccess, result);
```

---

#### 🔧 `sync()`

<details>
<summary>📋 Method Details</summary>

**Returns:** `Agent`

</details>

**Usage:**

```typescript
const result = agent.sync();
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

```typescript
const result = agent.getById(configuration, agentId);
```

---

## Usage Example

<details>
<summary>📝 TypeScript Agent Implementation</summary>

```typescript
import { Agent, XpanderClient, LLMProvider } from 'xpander-sdk';

export class MyAgent {
    private agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async agentLoop(task: string): Promise<any> {
        console.log("🚀 Starting Agent workflow");
        
        // Agent workflow
        console.log(`🤖 Agent: ${this.agent.name}`);
        console.log(`📊 Status: ${this.agent.status}`);
        
        // Main reasoning loop
        while (!this.agent.isFinished()) {
            console.log("🤔 Agent thinking...");
            
            // Get available tools
            const tools = this.agent.getTools(LLMProvider.OPEN_AI);
            console.log(`🔧 Available tools: ${tools.length}`);
            
            // Access conversation state
            const messages = this.agent.messages;
            console.log(`💬 Messages: ${messages.length}`);
            
            // Simulate LLM response with tool calls
            const mockResponse = { choices: [{ message: { tool_calls: [] } }] };
            
            // Add LLM response to memory
            this.agent.addMessages(mockResponse);
            
            // Extract and execute tool calls
            const toolCalls = this.agent.extractToolCalls(mockResponse);
            const results = await this.agent.runTools(toolCalls);
            console.log(`⚡ Executed ${results.length} tools`);
            
            break; // Break for demo
        }
        
        // Get final result
        const result = this.agent.retrieveExecutionResult();
        console.log(`✅ Final result: ${result}`);
        return result;
    }
}

// Usage
async function main() {
    const client = new XpanderClient({ apiKey: "your-api-key" });
    const agent = client.agents.get("your-agent-id");
    
    const myAgent = new MyAgent(agent);
    await myAgent.agentLoop("Complete my task");
}

main().catch(console.error);
```

</details>

