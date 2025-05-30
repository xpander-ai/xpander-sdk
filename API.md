# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### Agent <a name="Agent" id="xpander-sdk.Agent"></a>

Represents an agent in xpanderAI, managing tools, sessions, and operational workflows.

This class facilitates loading agents, handling tool executions, and managing prompt groups.

#### Initializers <a name="Initializers" id="xpander-sdk.Agent.Initializer"></a>

```typescript
import { Agent } from 'xpander-sdk'

new Agent(configuration: Configuration, id: string, name: string, organizationId: string, status: AgentStatus, delegationType: AgentDelegationType, delegationEndStrategy: AgentDelegationEndStrategy, memoryType: MemoryType, memoryStrategy: MemoryStrategy, instructions: IAgentInstructions, accessScope: AgentAccessScope, sourceNodes: ISourceNode[], prompts: string[], tools?: IAgentTool[], _graph?: any[], knowledgeBases?: KnowledgeBase[], oas?: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.id">id</a></code> | <code>string</code> | - Unique identifier for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.name">name</a></code> | <code>string</code> | - Human-readable name of the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | - Organization ID to which the agent belongs. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | - Current status of the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.delegationType">delegationType</a></code> | <code><a href="#xpander-sdk.AgentDelegationType">AgentDelegationType</a></code> | - The agent's delegation type (Router/Sequence). |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.delegationEndStrategy">delegationEndStrategy</a></code> | <code><a href="#xpander-sdk.AgentDelegationEndStrategy">AgentDelegationEndStrategy</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | - Type of memory the agent utilizes. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.memoryStrategy">memoryStrategy</a></code> | <code><a href="#xpander-sdk.MemoryStrategy">MemoryStrategy</a></code> | - Strategy for memory management. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.instructions">instructions</a></code> | <code><a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a></code> | - Instructions for the agent's operation. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.accessScope">accessScope</a></code> | <code><a href="#xpander-sdk.AgentAccessScope">AgentAccessScope</a></code> | - Scope of the agent's access permissions. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | - Source nodes associated with the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.prompts">prompts</a></code> | <code>string[]</code> | - Prompts used by the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | - Tools available to the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter._graph">_graph</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.knowledgeBases">knowledgeBases</a></code> | <code><a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]</code> | - Knowledge bases associated with the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.oas">oas</a></code> | <code>any</code> | *No description.* |

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.Initializer.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for the agent.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Agent.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier for the agent.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Agent.Initializer.parameter.name"></a>

- *Type:* string

Human-readable name of the agent.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Agent.Initializer.parameter.organizationId"></a>

- *Type:* string

Organization ID to which the agent belongs.

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Agent.Initializer.parameter.status"></a>

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

Current status of the agent.

---

##### `delegationType`<sup>Required</sup> <a name="delegationType" id="xpander-sdk.Agent.Initializer.parameter.delegationType"></a>

- *Type:* <a href="#xpander-sdk.AgentDelegationType">AgentDelegationType</a>

The agent's delegation type (Router/Sequence).

---

##### `delegationEndStrategy`<sup>Required</sup> <a name="delegationEndStrategy" id="xpander-sdk.Agent.Initializer.parameter.delegationEndStrategy"></a>

- *Type:* <a href="#xpander-sdk.AgentDelegationEndStrategy">AgentDelegationEndStrategy</a>

---

##### `memoryType`<sup>Required</sup> <a name="memoryType" id="xpander-sdk.Agent.Initializer.parameter.memoryType"></a>

- *Type:* <a href="#xpander-sdk.MemoryType">MemoryType</a>

Type of memory the agent utilizes.

---

##### `memoryStrategy`<sup>Required</sup> <a name="memoryStrategy" id="xpander-sdk.Agent.Initializer.parameter.memoryStrategy"></a>

- *Type:* <a href="#xpander-sdk.MemoryStrategy">MemoryStrategy</a>

Strategy for memory management.

---

##### `instructions`<sup>Required</sup> <a name="instructions" id="xpander-sdk.Agent.Initializer.parameter.instructions"></a>

- *Type:* <a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a>

Instructions for the agent's operation.

---

##### `accessScope`<sup>Required</sup> <a name="accessScope" id="xpander-sdk.Agent.Initializer.parameter.accessScope"></a>

- *Type:* <a href="#xpander-sdk.AgentAccessScope">AgentAccessScope</a>

Scope of the agent's access permissions.

---

##### `sourceNodes`<sup>Required</sup> <a name="sourceNodes" id="xpander-sdk.Agent.Initializer.parameter.sourceNodes"></a>

- *Type:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]

Source nodes associated with the agent.

---

##### `prompts`<sup>Required</sup> <a name="prompts" id="xpander-sdk.Agent.Initializer.parameter.prompts"></a>

- *Type:* string[]

Prompts used by the agent.

---

##### `tools`<sup>Optional</sup> <a name="tools" id="xpander-sdk.Agent.Initializer.parameter.tools"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Tools available to the agent.

---

##### `_graph`<sup>Optional</sup> <a name="_graph" id="xpander-sdk.Agent.Initializer.parameter._graph"></a>

- *Type:* any[]

---

##### `knowledgeBases`<sup>Optional</sup> <a name="knowledgeBases" id="xpander-sdk.Agent.Initializer.parameter.knowledgeBases"></a>

- *Type:* <a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]

Knowledge bases associated with the agent.

---

##### `oas`<sup>Optional</sup> <a name="oas" id="xpander-sdk.Agent.Initializer.parameter.oas"></a>

- *Type:* any

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agent.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.addLocalTools">addLocalTools</a></code> | Adds local tools to the agent with prefixed function names. |
| <code><a href="#xpander-sdk.Agent.addMessages">addMessages</a></code> | Adds messages to the memory thread. |
| <code><a href="#xpander-sdk.Agent.addTask">addTask</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.addToolCallResults">addToolCallResults</a></code> | Adds tool call results as messages to the memory thread. |
| <code><a href="#xpander-sdk.Agent.attachOperations">attachOperations</a></code> | Attaches a list of agentic operations to the agent. |
| <code><a href="#xpander-sdk.Agent.disableAgentEndTool">disableAgentEndTool</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.enableAgentEndTool">enableAgentEndTool</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.extractToolCalls">extractToolCalls</a></code> | Extracts tool calls from an LLM response based on the specified LLM provider. |
| <code><a href="#xpander-sdk.Agent.getTools">getTools</a></code> | Retrieves tools compatible with a specified LLM provider. |
| <code><a href="#xpander-sdk.Agent.initTask">initTask</a></code> | Initializes the task execution for the agent. |
| <code><a href="#xpander-sdk.Agent.isFinished">isFinished</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.load">load</a></code> | Loads the agent data from its source node type. |
| <code><a href="#xpander-sdk.Agent.reportExecutionMetrics">reportExecutionMetrics</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.reportLlmUsage">reportLlmUsage</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.retrieveAgenticInterfaces">retrieveAgenticInterfaces</a></code> | Retrieves a list of available agentic interfaces. |
| <code><a href="#xpander-sdk.Agent.retrieveAgenticOperations">retrieveAgenticOperations</a></code> | Retrieves a list of operations for a given agentic interface. |
| <code><a href="#xpander-sdk.Agent.retrieveExecutionResult">retrieveExecutionResult</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.retrieveNodeFromGraph">retrieveNodeFromGraph</a></code> | Retrieves a node from the graph by its ID. |
| <code><a href="#xpander-sdk.Agent.retrievePendingLocalToolCalls">retrievePendingLocalToolCalls</a></code> | Filters and retrieves local tool calls from a given list of tool calls. |
| <code><a href="#xpander-sdk.Agent.retrieveThreadsList">retrieveThreadsList</a></code> | Retrieves the list of memory threads for the current user. |
| <code><a href="#xpander-sdk.Agent.runTool">runTool</a></code> | Executes a single tool call and returns the result. |
| <code><a href="#xpander-sdk.Agent.runTools">runTools</a></code> | Executes multiple tool calls sequentially and returns their results. |
| <code><a href="#xpander-sdk.Agent.selectLLMProvider">selectLLMProvider</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.stop">stop</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.stopExecution">stopExecution</a></code> | Stops execution and reports the final result to the controller via a tool call. |
| <code><a href="#xpander-sdk.Agent.sync">sync</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.update">update</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.updateUserDetails">updateUserDetails</a></code> | Updates the user details for the agent. |

---

##### `from` <a name="from" id="xpander-sdk.Agent.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Agent.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.Agent.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.Agent.toJson"></a>

```typescript
public toJson(): string
```

##### `addLocalTools` <a name="addLocalTools" id="xpander-sdk.Agent.addLocalTools"></a>

```typescript
public addLocalTools(tools: any[] | ILocalTool[]): void
```

Adds local tools to the agent with prefixed function names.

###### `tools`<sup>Required</sup> <a name="tools" id="xpander-sdk.Agent.addLocalTools.parameter.tools"></a>

- *Type:* any[] | <a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]

The list of local tools to add.

---

##### `addMessages` <a name="addMessages" id="xpander-sdk.Agent.addMessages"></a>

```typescript
public addMessages(messages: any): void
```

Adds messages to the memory thread.

Converts non-standard messages to a compatible format before storing.

###### `messages`<sup>Required</sup> <a name="messages" id="xpander-sdk.Agent.addMessages.parameter.messages"></a>

- *Type:* any

An array of messages to be added to the memory thread.

---

##### `addTask` <a name="addTask" id="xpander-sdk.Agent.addTask"></a>

```typescript
public addTask(input?: string, files?: string[], useWorker?: boolean, threadId?: string): Execution
```

###### `input`<sup>Optional</sup> <a name="input" id="xpander-sdk.Agent.addTask.parameter.input"></a>

- *Type:* string

---

###### `files`<sup>Optional</sup> <a name="files" id="xpander-sdk.Agent.addTask.parameter.files"></a>

- *Type:* string[]

---

###### `useWorker`<sup>Optional</sup> <a name="useWorker" id="xpander-sdk.Agent.addTask.parameter.useWorker"></a>

- *Type:* boolean

---

###### `threadId`<sup>Optional</sup> <a name="threadId" id="xpander-sdk.Agent.addTask.parameter.threadId"></a>

- *Type:* string

---

##### `addToolCallResults` <a name="addToolCallResults" id="xpander-sdk.Agent.addToolCallResults"></a>

```typescript
public addToolCallResults(toolCallResults: ToolCallResult[]): void
```

Adds tool call results as messages to the memory thread.

###### `toolCallResults`<sup>Required</sup> <a name="toolCallResults" id="xpander-sdk.Agent.addToolCallResults.parameter.toolCallResults"></a>

- *Type:* <a href="#xpander-sdk.ToolCallResult">ToolCallResult</a>[]

An array of tool call results to be added as messages.

---

##### `attachOperations` <a name="attachOperations" id="xpander-sdk.Agent.attachOperations"></a>

```typescript
public attachOperations(operations: AgenticOperation[]): void
```

Attaches a list of agentic operations to the agent.

###### `operations`<sup>Required</sup> <a name="operations" id="xpander-sdk.Agent.attachOperations.parameter.operations"></a>

- *Type:* <a href="#xpander-sdk.AgenticOperation">AgenticOperation</a>[]

The list of agentic operations to attach.

---

##### `disableAgentEndTool` <a name="disableAgentEndTool" id="xpander-sdk.Agent.disableAgentEndTool"></a>

```typescript
public disableAgentEndTool(): void
```

##### `enableAgentEndTool` <a name="enableAgentEndTool" id="xpander-sdk.Agent.enableAgentEndTool"></a>

```typescript
public enableAgentEndTool(): void
```

##### `extractToolCalls` <a name="extractToolCalls" id="xpander-sdk.Agent.extractToolCalls"></a>

```typescript
public extractToolCalls(llmResponse: any): ToolCall[]
```

Extracts tool calls from an LLM response based on the specified LLM provider.

###### `llmResponse`<sup>Required</sup> <a name="llmResponse" id="xpander-sdk.Agent.extractToolCalls.parameter.llmResponse"></a>

- *Type:* any

The LLM response to analyze for tool calls.

---

##### `getTools` <a name="getTools" id="xpander-sdk.Agent.getTools"></a>

```typescript
public getTools(llmProvider?: LLMProvider): any[]
```

Retrieves tools compatible with a specified LLM provider.

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.Agent.getTools.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

The LLM provider to filter tools by (default: `OPEN_AI`).

---

##### `initTask` <a name="initTask" id="xpander-sdk.Agent.initTask"></a>

```typescript
public initTask(execution: any): void
```

Initializes the task execution for the agent.

###### `execution`<sup>Required</sup> <a name="execution" id="xpander-sdk.Agent.initTask.parameter.execution"></a>

- *Type:* any

The execution details.

---

##### `isFinished` <a name="isFinished" id="xpander-sdk.Agent.isFinished"></a>

```typescript
public isFinished(): boolean
```

##### `load` <a name="load" id="xpander-sdk.Agent.load"></a>

```typescript
public load(agentId?: string, ignoreCache?: boolean, rawAgentData?: any): void
```

Loads the agent data from its source node type.

###### `agentId`<sup>Optional</sup> <a name="agentId" id="xpander-sdk.Agent.load.parameter.agentId"></a>

- *Type:* string

---

###### `ignoreCache`<sup>Optional</sup> <a name="ignoreCache" id="xpander-sdk.Agent.load.parameter.ignoreCache"></a>

- *Type:* boolean

---

###### `rawAgentData`<sup>Optional</sup> <a name="rawAgentData" id="xpander-sdk.Agent.load.parameter.rawAgentData"></a>

- *Type:* any

---

##### `reportExecutionMetrics` <a name="reportExecutionMetrics" id="xpander-sdk.Agent.reportExecutionMetrics"></a>

```typescript
public reportExecutionMetrics(llmTokens: Tokens, aiModel?: string, sourceNodeType?: string): void
```

###### `llmTokens`<sup>Required</sup> <a name="llmTokens" id="xpander-sdk.Agent.reportExecutionMetrics.parameter.llmTokens"></a>

- *Type:* <a href="#xpander-sdk.Tokens">Tokens</a>

---

###### `aiModel`<sup>Optional</sup> <a name="aiModel" id="xpander-sdk.Agent.reportExecutionMetrics.parameter.aiModel"></a>

- *Type:* string

---

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.reportExecutionMetrics.parameter.sourceNodeType"></a>

- *Type:* string

---

##### `reportLlmUsage` <a name="reportLlmUsage" id="xpander-sdk.Agent.reportLlmUsage"></a>

```typescript
public reportLlmUsage(llmResponse: any, llmInferenceDuration?: number, llmProvider?: LLMProvider, sourceNodeType?: string): void
```

###### `llmResponse`<sup>Required</sup> <a name="llmResponse" id="xpander-sdk.Agent.reportLlmUsage.parameter.llmResponse"></a>

- *Type:* any

---

###### `llmInferenceDuration`<sup>Optional</sup> <a name="llmInferenceDuration" id="xpander-sdk.Agent.reportLlmUsage.parameter.llmInferenceDuration"></a>

- *Type:* number

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.Agent.reportLlmUsage.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.reportLlmUsage.parameter.sourceNodeType"></a>

- *Type:* string

---

##### `retrieveAgenticInterfaces` <a name="retrieveAgenticInterfaces" id="xpander-sdk.Agent.retrieveAgenticInterfaces"></a>

```typescript
public retrieveAgenticInterfaces(ignore_cache?: boolean): AgenticInterface[]
```

Retrieves a list of available agentic interfaces.

###### `ignore_cache`<sup>Optional</sup> <a name="ignore_cache" id="xpander-sdk.Agent.retrieveAgenticInterfaces.parameter.ignore_cache"></a>

- *Type:* boolean

Whether to ignore cached data and fetch fresh data.

---

##### `retrieveAgenticOperations` <a name="retrieveAgenticOperations" id="xpander-sdk.Agent.retrieveAgenticOperations"></a>

```typescript
public retrieveAgenticOperations(agenticInterface: AgenticInterface, ignore_cache?: boolean): AgenticOperation[]
```

Retrieves a list of operations for a given agentic interface.

###### `agenticInterface`<sup>Required</sup> <a name="agenticInterface" id="xpander-sdk.Agent.retrieveAgenticOperations.parameter.agenticInterface"></a>

- *Type:* <a href="#xpander-sdk.AgenticInterface">AgenticInterface</a>

The agentic interface to retrieve operations for.

---

###### `ignore_cache`<sup>Optional</sup> <a name="ignore_cache" id="xpander-sdk.Agent.retrieveAgenticOperations.parameter.ignore_cache"></a>

- *Type:* boolean

Whether to ignore cached data and fetch fresh data.

---

##### `retrieveExecutionResult` <a name="retrieveExecutionResult" id="xpander-sdk.Agent.retrieveExecutionResult"></a>

```typescript
public retrieveExecutionResult(): Execution
```

##### `retrieveNodeFromGraph` <a name="retrieveNodeFromGraph" id="xpander-sdk.Agent.retrieveNodeFromGraph"></a>

```typescript
public retrieveNodeFromGraph(itemId: string): GraphItem
```

Retrieves a node from the graph by its ID.

###### `itemId`<sup>Required</sup> <a name="itemId" id="xpander-sdk.Agent.retrieveNodeFromGraph.parameter.itemId"></a>

- *Type:* string

The ID of the graph node to retrieve.

---

##### `retrievePendingLocalToolCalls` <a name="retrievePendingLocalToolCalls" id="xpander-sdk.Agent.retrievePendingLocalToolCalls"></a>

```typescript
public retrievePendingLocalToolCalls(toolCalls: ToolCall[]): ToolCall[]
```

Filters and retrieves local tool calls from a given list of tool calls.

###### `toolCalls`<sup>Required</sup> <a name="toolCalls" id="xpander-sdk.Agent.retrievePendingLocalToolCalls.parameter.toolCalls"></a>

- *Type:* <a href="#xpander-sdk.ToolCall">ToolCall</a>[]

The list of tool calls to filter.

---

##### `retrieveThreadsList` <a name="retrieveThreadsList" id="xpander-sdk.Agent.retrieveThreadsList"></a>

```typescript
public retrieveThreadsList(): MemoryThread[]
```

Retrieves the list of memory threads for the current user.

##### `runTool` <a name="runTool" id="xpander-sdk.Agent.runTool"></a>

```typescript
public runTool(tool: ToolCall, payloadExtension?: any, isMultiple?: boolean): ToolCallResult
```

Executes a single tool call and returns the result.

###### `tool`<sup>Required</sup> <a name="tool" id="xpander-sdk.Agent.runTool.parameter.tool"></a>

- *Type:* <a href="#xpander-sdk.ToolCall">ToolCall</a>

The tool call to execute.

---

###### `payloadExtension`<sup>Optional</sup> <a name="payloadExtension" id="xpander-sdk.Agent.runTool.parameter.payloadExtension"></a>

- *Type:* any

Additional payload data to merge.

---

###### `isMultiple`<sup>Optional</sup> <a name="isMultiple" id="xpander-sdk.Agent.runTool.parameter.isMultiple"></a>

- *Type:* boolean

---

##### `runTools` <a name="runTools" id="xpander-sdk.Agent.runTools"></a>

```typescript
public runTools(toolCalls: ToolCall[], payloadExtension?: any): ToolCallResult[]
```

Executes multiple tool calls sequentially and returns their results.

###### `toolCalls`<sup>Required</sup> <a name="toolCalls" id="xpander-sdk.Agent.runTools.parameter.toolCalls"></a>

- *Type:* <a href="#xpander-sdk.ToolCall">ToolCall</a>[]

The list of tool calls to execute.

---

###### `payloadExtension`<sup>Optional</sup> <a name="payloadExtension" id="xpander-sdk.Agent.runTools.parameter.payloadExtension"></a>

- *Type:* any

Additional payload data to merge.

---

##### `selectLLMProvider` <a name="selectLLMProvider" id="xpander-sdk.Agent.selectLLMProvider"></a>

```typescript
public selectLLMProvider(llmProvider: LLMProvider): void
```

###### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.Agent.selectLLMProvider.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `stop` <a name="stop" id="xpander-sdk.Agent.stop"></a>

```typescript
public stop(): void
```

##### `stopExecution` <a name="stopExecution" id="xpander-sdk.Agent.stopExecution"></a>

```typescript
public stopExecution(isSuccess: boolean, result?: string): void
```

Stops execution and reports the final result to the controller via a tool call.

###### `isSuccess`<sup>Required</sup> <a name="isSuccess" id="xpander-sdk.Agent.stopExecution.parameter.isSuccess"></a>

- *Type:* boolean

Indicates whether the execution was successful.

---

###### `result`<sup>Optional</sup> <a name="result" id="xpander-sdk.Agent.stopExecution.parameter.result"></a>

- *Type:* string

Optional result string to return upon stopping.

---

##### `sync` <a name="sync" id="xpander-sdk.Agent.sync"></a>

```typescript
public sync(): Agent
```

##### `update` <a name="update" id="xpander-sdk.Agent.update"></a>

```typescript
public update(): Agent
```

##### `updateUserDetails` <a name="updateUserDetails" id="xpander-sdk.Agent.updateUserDetails"></a>

```typescript
public updateUserDetails(userDetails: UserDetails): void
```

Updates the user details for the agent.

###### `userDetails`<sup>Required</sup> <a name="userDetails" id="xpander-sdk.Agent.updateUserDetails.parameter.userDetails"></a>

- *Type:* <a href="#xpander-sdk.UserDetails">UserDetails</a>

The user details to update.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agent.fromObject">fromObject</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.getById">getById</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Agent.fromObject"></a>

```typescript
import { Agent } from 'xpander-sdk'

Agent.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Agent.fromObject.parameter.data"></a>

- *Type:* any

---

##### `getById` <a name="getById" id="xpander-sdk.Agent.getById"></a>

```typescript
import { Agent } from 'xpander-sdk'

Agent.getById(configuration: Configuration, agentId: string)
```

###### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.getById.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

---

###### `agentId`<sup>Required</sup> <a name="agentId" id="xpander-sdk.Agent.getById.parameter.agentId"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.property.endToolEnabled">endToolEnabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.hasLocalTools">hasLocalTools</a></code> | <code>boolean</code> | Checks if the agent has local tools loaded. |
| <code><a href="#xpander-sdk.Agent.property.hasMCPServers">hasMCPServers</a></code> | <code>boolean</code> | Checks if the agent has mcp servers attached. |
| <code><a href="#xpander-sdk.Agent.property.memory">memory</a></code> | <code><a href="#xpander-sdk.Memory">Memory</a></code> | Retrieves the memory instance for the agent. |
| <code><a href="#xpander-sdk.Agent.property.messages">messages</a></code> | <code>any[]</code> | Retrieves list of messages. |
| <code><a href="#xpander-sdk.Agent.property.sourceNodeType">sourceNodeType</a></code> | <code><a href="#xpander-sdk.SourceNodeType">SourceNodeType</a></code> | Retrieves the type of source node for the agent. |
| <code><a href="#xpander-sdk.Agent.property.toolChoice">toolChoice</a></code> | <code>string</code> | Gets the tool choice mode. |
| <code><a href="#xpander-sdk.Agent.property.url">url</a></code> | <code>string</code> | Constructs the API URL for this agent. |
| <code><a href="#xpander-sdk.Agent.property.vanillaKnowledgeBases">vanillaKnowledgeBases</a></code> | <code><a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]</code> | Retrieves the vanilla knowledge bases of the agent. |
| <code><a href="#xpander-sdk.Agent.property.accessScope">accessScope</a></code> | <code><a href="#xpander-sdk.AgentAccessScope">AgentAccessScope</a></code> | - Scope of the agent's access permissions. |
| <code><a href="#xpander-sdk.Agent.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for the agent. |
| <code><a href="#xpander-sdk.Agent.property.delegationEndStrategy">delegationEndStrategy</a></code> | <code><a href="#xpander-sdk.AgentDelegationEndStrategy">AgentDelegationEndStrategy</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.delegationType">delegationType</a></code> | <code><a href="#xpander-sdk.AgentDelegationType">AgentDelegationType</a></code> | - The agent's delegation type (Router/Sequence). |
| <code><a href="#xpander-sdk.Agent.property.graph">graph</a></code> | <code><a href="#xpander-sdk.Graph">Graph</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.id">id</a></code> | <code>string</code> | - Unique identifier for the agent. |
| <code><a href="#xpander-sdk.Agent.property.instructions">instructions</a></code> | <code><a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a></code> | - Instructions for the agent's operation. |
| <code><a href="#xpander-sdk.Agent.property.knowledgeBases">knowledgeBases</a></code> | <code><a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]</code> | - Knowledge bases associated with the agent. |
| <code><a href="#xpander-sdk.Agent.property.llmProvider">llmProvider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.localTools">localTools</a></code> | <code><a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]</code> | Collection of local tools specific to this agent. |
| <code><a href="#xpander-sdk.Agent.property.memoryStrategy">memoryStrategy</a></code> | <code><a href="#xpander-sdk.MemoryStrategy">MemoryStrategy</a></code> | - Strategy for memory management. |
| <code><a href="#xpander-sdk.Agent.property.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | - Type of memory the agent utilizes. |
| <code><a href="#xpander-sdk.Agent.property.name">name</a></code> | <code>string</code> | - Human-readable name of the agent. |
| <code><a href="#xpander-sdk.Agent.property.oas">oas</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.organizationId">organizationId</a></code> | <code>string</code> | - Organization ID to which the agent belongs. |
| <code><a href="#xpander-sdk.Agent.property.prompts">prompts</a></code> | <code>string[]</code> | - Prompts used by the agent. |
| <code><a href="#xpander-sdk.Agent.property.ready">ready</a></code> | <code>boolean</code> | Indicates if the agent is ready and tools are loaded. |
| <code><a href="#xpander-sdk.Agent.property.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | - Source nodes associated with the agent. |
| <code><a href="#xpander-sdk.Agent.property.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | - Current status of the agent. |
| <code><a href="#xpander-sdk.Agent.property.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | - Tools available to the agent. |
| <code><a href="#xpander-sdk.Agent.property.execution">execution</a></code> | <code><a href="#xpander-sdk.Execution">Execution</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.executionMemory">executionMemory</a></code> | <code><a href="#xpander-sdk.Memory">Memory</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.userDetails">userDetails</a></code> | <code><a href="#xpander-sdk.UserDetails">UserDetails</a></code> | *No description.* |

---

##### `endToolEnabled`<sup>Required</sup> <a name="endToolEnabled" id="xpander-sdk.Agent.property.endToolEnabled"></a>

```typescript
public readonly endToolEnabled: boolean;
```

- *Type:* boolean

---

##### `hasLocalTools`<sup>Required</sup> <a name="hasLocalTools" id="xpander-sdk.Agent.property.hasLocalTools"></a>

```typescript
public readonly hasLocalTools: boolean;
```

- *Type:* boolean

Checks if the agent has local tools loaded.

---

##### `hasMCPServers`<sup>Required</sup> <a name="hasMCPServers" id="xpander-sdk.Agent.property.hasMCPServers"></a>

```typescript
public readonly hasMCPServers: boolean;
```

- *Type:* boolean

Checks if the agent has mcp servers attached.

---

##### `memory`<sup>Required</sup> <a name="memory" id="xpander-sdk.Agent.property.memory"></a>

```typescript
public readonly memory: Memory;
```

- *Type:* <a href="#xpander-sdk.Memory">Memory</a>

Retrieves the memory instance for the agent.

---

##### `messages`<sup>Required</sup> <a name="messages" id="xpander-sdk.Agent.property.messages"></a>

```typescript
public readonly messages: any[];
```

- *Type:* any[]

Retrieves list of messages.

---

##### `sourceNodeType`<sup>Required</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.property.sourceNodeType"></a>

```typescript
public readonly sourceNodeType: SourceNodeType;
```

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

Retrieves the type of source node for the agent.

---

##### `toolChoice`<sup>Required</sup> <a name="toolChoice" id="xpander-sdk.Agent.property.toolChoice"></a>

```typescript
public readonly toolChoice: string;
```

- *Type:* string

Gets the tool choice mode.

---

##### `url`<sup>Required</sup> <a name="url" id="xpander-sdk.Agent.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

Constructs the API URL for this agent.

---

##### `vanillaKnowledgeBases`<sup>Required</sup> <a name="vanillaKnowledgeBases" id="xpander-sdk.Agent.property.vanillaKnowledgeBases"></a>

```typescript
public readonly vanillaKnowledgeBases: KnowledgeBase[];
```

- *Type:* <a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]

Retrieves the vanilla knowledge bases of the agent.

---

##### `accessScope`<sup>Required</sup> <a name="accessScope" id="xpander-sdk.Agent.property.accessScope"></a>

```typescript
public readonly accessScope: AgentAccessScope;
```

- *Type:* <a href="#xpander-sdk.AgentAccessScope">AgentAccessScope</a>

Scope of the agent's access permissions.

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for the agent.

---

##### `delegationEndStrategy`<sup>Required</sup> <a name="delegationEndStrategy" id="xpander-sdk.Agent.property.delegationEndStrategy"></a>

```typescript
public readonly delegationEndStrategy: AgentDelegationEndStrategy;
```

- *Type:* <a href="#xpander-sdk.AgentDelegationEndStrategy">AgentDelegationEndStrategy</a>

---

##### `delegationType`<sup>Required</sup> <a name="delegationType" id="xpander-sdk.Agent.property.delegationType"></a>

```typescript
public readonly delegationType: AgentDelegationType;
```

- *Type:* <a href="#xpander-sdk.AgentDelegationType">AgentDelegationType</a>

The agent's delegation type (Router/Sequence).

---

##### `graph`<sup>Required</sup> <a name="graph" id="xpander-sdk.Agent.property.graph"></a>

```typescript
public readonly graph: Graph;
```

- *Type:* <a href="#xpander-sdk.Graph">Graph</a>

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Agent.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Unique identifier for the agent.

---

##### `instructions`<sup>Required</sup> <a name="instructions" id="xpander-sdk.Agent.property.instructions"></a>

```typescript
public readonly instructions: IAgentInstructions;
```

- *Type:* <a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a>

Instructions for the agent's operation.

---

##### `knowledgeBases`<sup>Required</sup> <a name="knowledgeBases" id="xpander-sdk.Agent.property.knowledgeBases"></a>

```typescript
public readonly knowledgeBases: KnowledgeBase[];
```

- *Type:* <a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]

Knowledge bases associated with the agent.

---

##### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.Agent.property.llmProvider"></a>

```typescript
public readonly llmProvider: LLMProvider;
```

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `localTools`<sup>Required</sup> <a name="localTools" id="xpander-sdk.Agent.property.localTools"></a>

```typescript
public readonly localTools: ILocalTool[];
```

- *Type:* <a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]

Collection of local tools specific to this agent.

---

##### `memoryStrategy`<sup>Required</sup> <a name="memoryStrategy" id="xpander-sdk.Agent.property.memoryStrategy"></a>

```typescript
public readonly memoryStrategy: MemoryStrategy;
```

- *Type:* <a href="#xpander-sdk.MemoryStrategy">MemoryStrategy</a>

Strategy for memory management.

---

##### `memoryType`<sup>Required</sup> <a name="memoryType" id="xpander-sdk.Agent.property.memoryType"></a>

```typescript
public readonly memoryType: MemoryType;
```

- *Type:* <a href="#xpander-sdk.MemoryType">MemoryType</a>

Type of memory the agent utilizes.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Agent.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Human-readable name of the agent.

---

##### `oas`<sup>Required</sup> <a name="oas" id="xpander-sdk.Agent.property.oas"></a>

```typescript
public readonly oas: any;
```

- *Type:* any

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Agent.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

Organization ID to which the agent belongs.

---

##### `prompts`<sup>Required</sup> <a name="prompts" id="xpander-sdk.Agent.property.prompts"></a>

```typescript
public readonly prompts: string[];
```

- *Type:* string[]

Prompts used by the agent.

---

##### `ready`<sup>Required</sup> <a name="ready" id="xpander-sdk.Agent.property.ready"></a>

```typescript
public readonly ready: boolean;
```

- *Type:* boolean

Indicates if the agent is ready and tools are loaded.

---

##### `sourceNodes`<sup>Required</sup> <a name="sourceNodes" id="xpander-sdk.Agent.property.sourceNodes"></a>

```typescript
public readonly sourceNodes: ISourceNode[];
```

- *Type:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]

Source nodes associated with the agent.

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Agent.property.status"></a>

```typescript
public readonly status: AgentStatus;
```

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

Current status of the agent.

---

##### `tools`<sup>Required</sup> <a name="tools" id="xpander-sdk.Agent.property.tools"></a>

```typescript
public readonly tools: IAgentTool[];
```

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Tools available to the agent.

---

##### `execution`<sup>Optional</sup> <a name="execution" id="xpander-sdk.Agent.property.execution"></a>

```typescript
public readonly execution: Execution;
```

- *Type:* <a href="#xpander-sdk.Execution">Execution</a>

---

##### `executionMemory`<sup>Optional</sup> <a name="executionMemory" id="xpander-sdk.Agent.property.executionMemory"></a>

```typescript
public readonly executionMemory: Memory;
```

- *Type:* <a href="#xpander-sdk.Memory">Memory</a>

---

##### `userDetails`<sup>Optional</sup> <a name="userDetails" id="xpander-sdk.Agent.property.userDetails"></a>

```typescript
public readonly userDetails: UserDetails;
```

- *Type:* <a href="#xpander-sdk.UserDetails">UserDetails</a>

---


### AgenticInterface <a name="AgenticInterface" id="xpander-sdk.AgenticInterface"></a>

Represents an agentic interface with identifying and descriptive properties.

#### Initializers <a name="Initializers" id="xpander-sdk.AgenticInterface.Initializer"></a>

```typescript
import { AgenticInterface } from 'xpander-sdk'

new AgenticInterface(id: string, name: string, summary: string, description: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.AgenticInterface.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.Initializer.parameter.summary">summary</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.AgenticInterface.Initializer.parameter.id"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.AgenticInterface.Initializer.parameter.name"></a>

- *Type:* string

---

##### `summary`<sup>Required</sup> <a name="summary" id="xpander-sdk.AgenticInterface.Initializer.parameter.summary"></a>

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.AgenticInterface.Initializer.parameter.description"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgenticInterface.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.AgenticInterface.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.AgenticInterface.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.AgenticInterface.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.AgenticInterface.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgenticInterface.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.AgenticInterface.fromObject"></a>

```typescript
import { AgenticInterface } from 'xpander-sdk'

AgenticInterface.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.AgenticInterface.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.AgenticInterface.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticInterface.property.summary">summary</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.AgenticInterface.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.AgenticInterface.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.AgenticInterface.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `summary`<sup>Required</sup> <a name="summary" id="xpander-sdk.AgenticInterface.property.summary"></a>

```typescript
public readonly summary: string;
```

- *Type:* string

---


### AgenticOperation <a name="AgenticOperation" id="xpander-sdk.AgenticOperation"></a>

Represents an agentic operation with metadata and execution details.

#### Initializers <a name="Initializers" id="xpander-sdk.AgenticOperation.Initializer"></a>

```typescript
import { AgenticOperation } from 'xpander-sdk'

new AgenticOperation(id: string, name: string, summary: string, description: string, idToUseOnGraph: string, interfaceId: string, isFunction: boolean, method: string, path: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.summary">summary</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.idToUseOnGraph">idToUseOnGraph</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.isFunction">isFunction</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.method">method</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.Initializer.parameter.path">path</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.AgenticOperation.Initializer.parameter.id"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.AgenticOperation.Initializer.parameter.name"></a>

- *Type:* string

---

##### `summary`<sup>Required</sup> <a name="summary" id="xpander-sdk.AgenticOperation.Initializer.parameter.summary"></a>

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.AgenticOperation.Initializer.parameter.description"></a>

- *Type:* string

---

##### `idToUseOnGraph`<sup>Required</sup> <a name="idToUseOnGraph" id="xpander-sdk.AgenticOperation.Initializer.parameter.idToUseOnGraph"></a>

- *Type:* string

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="xpander-sdk.AgenticOperation.Initializer.parameter.interfaceId"></a>

- *Type:* string

---

##### `isFunction`<sup>Required</sup> <a name="isFunction" id="xpander-sdk.AgenticOperation.Initializer.parameter.isFunction"></a>

- *Type:* boolean

---

##### `method`<sup>Required</sup> <a name="method" id="xpander-sdk.AgenticOperation.Initializer.parameter.method"></a>

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="xpander-sdk.AgenticOperation.Initializer.parameter.path"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgenticOperation.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.AgenticOperation.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.AgenticOperation.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.AgenticOperation.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.AgenticOperation.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgenticOperation.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.AgenticOperation.fromObject"></a>

```typescript
import { AgenticOperation } from 'xpander-sdk'

AgenticOperation.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.AgenticOperation.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.AgenticOperation.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.idToUseOnGraph">idToUseOnGraph</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.isFunction">isFunction</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.method">method</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AgenticOperation.property.summary">summary</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.AgenticOperation.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.AgenticOperation.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `idToUseOnGraph`<sup>Required</sup> <a name="idToUseOnGraph" id="xpander-sdk.AgenticOperation.property.idToUseOnGraph"></a>

```typescript
public readonly idToUseOnGraph: string;
```

- *Type:* string

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="xpander-sdk.AgenticOperation.property.interfaceId"></a>

```typescript
public readonly interfaceId: string;
```

- *Type:* string

---

##### `isFunction`<sup>Required</sup> <a name="isFunction" id="xpander-sdk.AgenticOperation.property.isFunction"></a>

```typescript
public readonly isFunction: boolean;
```

- *Type:* boolean

---

##### `method`<sup>Required</sup> <a name="method" id="xpander-sdk.AgenticOperation.property.method"></a>

```typescript
public readonly method: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.AgenticOperation.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="xpander-sdk.AgenticOperation.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `summary`<sup>Required</sup> <a name="summary" id="xpander-sdk.AgenticOperation.property.summary"></a>

```typescript
public readonly summary: string;
```

- *Type:* string

---


### Agents <a name="Agents" id="xpander-sdk.Agents"></a>

Manages a collection of Agent instances in xpanderAI, providing methods to list, retrieve, and initialize agents, including custom agents.

#### Initializers <a name="Initializers" id="xpander-sdk.Agents.Initializer"></a>

```typescript
import { Agents } from 'xpander-sdk'

new Agents(configuration: Configuration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agents.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for managing agents. |

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agents.Initializer.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for managing agents.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agents.create">create</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agents.get">get</a></code> | Retrieves a specific agent by its ID and initializes it. |
| <code><a href="#xpander-sdk.Agents.list">list</a></code> | Retrieves the list of agents from the API and populates the local agents list. |

---

##### `create` <a name="create" id="xpander-sdk.Agents.create"></a>

```typescript
public create(name: string, type?: AgentType): Agent
```

###### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Agents.create.parameter.name"></a>

- *Type:* string

The name of the agent to be created.

---

###### `type`<sup>Optional</sup> <a name="type" id="xpander-sdk.Agents.create.parameter.type"></a>

- *Type:* <a href="#xpander-sdk.AgentType">AgentType</a>

The type of the agent, defaults to Regular.

---

##### `get` <a name="get" id="xpander-sdk.Agents.get"></a>

```typescript
public get(agentId: string): Agent
```

Retrieves a specific agent by its ID and initializes it.

###### `agentId`<sup>Required</sup> <a name="agentId" id="xpander-sdk.Agents.get.parameter.agentId"></a>

- *Type:* string

The unique identifier of the agent to retrieve.

---

##### `list` <a name="list" id="xpander-sdk.Agents.list"></a>

```typescript
public list(): UnloadedAgent[]
```

Retrieves the list of agents from the API and populates the local agents list.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agents.property.agentsList">agentsList</a></code> | <code><a href="#xpander-sdk.UnloadedAgent">UnloadedAgent</a>[]</code> | Collection of Agent instances managed by this class. |
| <code><a href="#xpander-sdk.Agents.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for managing agents. |

---

##### `agentsList`<sup>Required</sup> <a name="agentsList" id="xpander-sdk.Agents.property.agentsList"></a>

```typescript
public readonly agentsList: UnloadedAgent[];
```

- *Type:* <a href="#xpander-sdk.UnloadedAgent">UnloadedAgent</a>[]

Collection of Agent instances managed by this class.

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agents.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for managing agents.

---


### Base <a name="Base" id="xpander-sdk.Base"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.Base.Initializer"></a>

```typescript
import { Base } from 'xpander-sdk'

new Base()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Base.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Base.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Base.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.Base.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Base.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.Base.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.Base.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Base.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Base.fromObject"></a>

```typescript
import { Base } from 'xpander-sdk'

Base.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Base.fromObject.parameter.data"></a>

- *Type:* any

---



### Configuration <a name="Configuration" id="xpander-sdk.Configuration"></a>

Manages the configuration settings for the xpanderAI client.

This class encapsulates settings such as the API key, base URL,
metrics reporting, and optional organization-specific parameters.

#### Initializers <a name="Initializers" id="xpander-sdk.Configuration.Initializer"></a>

```typescript
import { Configuration } from 'xpander-sdk'

new Configuration(__0: IConfiguration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Configuration.Initializer.parameter.__0">__0</a></code> | <code><a href="#xpander-sdk.IConfiguration">IConfiguration</a></code> | - The API key for xpanderAI. |

---

##### `__0`<sup>Required</sup> <a name="__0" id="xpander-sdk.Configuration.Initializer.parameter.__0"></a>

- *Type:* <a href="#xpander-sdk.IConfiguration">IConfiguration</a>

The API key for xpanderAI.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Configuration.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Configuration.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Configuration.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.Configuration.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Configuration.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.Configuration.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.Configuration.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Configuration.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Configuration.fromObject"></a>

```typescript
import { Configuration } from 'xpander-sdk'

Configuration.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Configuration.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Configuration.property.url">url</a></code> | <code>string</code> | Constructs the full API endpoint URL. |
| <code><a href="#xpander-sdk.Configuration.property.apiKey">apiKey</a></code> | <code>string</code> | API key for authenticating requests to xpanderAI. |
| <code><a href="#xpander-sdk.Configuration.property.baseUrl">baseUrl</a></code> | <code>string</code> | Base URL for the xpanderAI API requests. |
| <code><a href="#xpander-sdk.Configuration.property.organizationId">organizationId</a></code> | <code>string</code> | Optional organization ID for scoped API requests. |

---

##### `url`<sup>Required</sup> <a name="url" id="xpander-sdk.Configuration.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

Constructs the full API endpoint URL.

The URL combines the base URL with the optional organization ID if provided.

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.Configuration.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

API key for authenticating requests to xpanderAI.

---

##### `baseUrl`<sup>Required</sup> <a name="baseUrl" id="xpander-sdk.Configuration.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

Base URL for the xpanderAI API requests.

---

##### `organizationId`<sup>Optional</sup> <a name="organizationId" id="xpander-sdk.Configuration.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

Optional organization ID for scoped API requests.

---


### Execution <a name="Execution" id="xpander-sdk.Execution"></a>

Represents an execution of an agent in xpanderAI, including its input, status, memory, and other related details.

#### Initializers <a name="Initializers" id="xpander-sdk.Execution.Initializer"></a>

```typescript
import { Execution } from 'xpander-sdk'

new Execution(id: string, agentId: string, organizationId: string, input: IExecutionInput, status: ExecutionStatus, lastExecutedNodeId?: string, memoryThreadId?: string, parentExecution?: string, workerId?: string, result?: string, llmTokens?: Tokens)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.id">id</a></code> | <code>string</code> | - Unique identifier of the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.agentId">agentId</a></code> | <code>string</code> | - Identifier of the agent performing the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | - Identifier of the organization associated with the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.input">input</a></code> | <code><a href="#xpander-sdk.IExecutionInput">IExecutionInput</a></code> | - Input provided for the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.status">status</a></code> | <code><a href="#xpander-sdk.ExecutionStatus">ExecutionStatus</a></code> | - Current status of the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.lastExecutedNodeId">lastExecutedNodeId</a></code> | <code>string</code> | - Identifier of the last executed node. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.memoryThreadId">memoryThreadId</a></code> | <code>string</code> | - Identifier of the memory thread associated with the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.parentExecution">parentExecution</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.workerId">workerId</a></code> | <code>string</code> | - Identifier of the worker associated with the execution. |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.result">result</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.Initializer.parameter.llmTokens">llmTokens</a></code> | <code><a href="#xpander-sdk.Tokens">Tokens</a></code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Execution.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier of the execution.

---

##### `agentId`<sup>Required</sup> <a name="agentId" id="xpander-sdk.Execution.Initializer.parameter.agentId"></a>

- *Type:* string

Identifier of the agent performing the execution.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Execution.Initializer.parameter.organizationId"></a>

- *Type:* string

Identifier of the organization associated with the execution.

---

##### `input`<sup>Required</sup> <a name="input" id="xpander-sdk.Execution.Initializer.parameter.input"></a>

- *Type:* <a href="#xpander-sdk.IExecutionInput">IExecutionInput</a>

Input provided for the execution.

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Execution.Initializer.parameter.status"></a>

- *Type:* <a href="#xpander-sdk.ExecutionStatus">ExecutionStatus</a>

Current status of the execution.

---

##### `lastExecutedNodeId`<sup>Optional</sup> <a name="lastExecutedNodeId" id="xpander-sdk.Execution.Initializer.parameter.lastExecutedNodeId"></a>

- *Type:* string

Identifier of the last executed node.

---

##### `memoryThreadId`<sup>Optional</sup> <a name="memoryThreadId" id="xpander-sdk.Execution.Initializer.parameter.memoryThreadId"></a>

- *Type:* string

Identifier of the memory thread associated with the execution.

---

##### `parentExecution`<sup>Optional</sup> <a name="parentExecution" id="xpander-sdk.Execution.Initializer.parameter.parentExecution"></a>

- *Type:* string

---

##### `workerId`<sup>Optional</sup> <a name="workerId" id="xpander-sdk.Execution.Initializer.parameter.workerId"></a>

- *Type:* string

Identifier of the worker associated with the execution.

---

##### `result`<sup>Optional</sup> <a name="result" id="xpander-sdk.Execution.Initializer.parameter.result"></a>

- *Type:* string

---

##### `llmTokens`<sup>Optional</sup> <a name="llmTokens" id="xpander-sdk.Execution.Initializer.parameter.llmTokens"></a>

- *Type:* <a href="#xpander-sdk.Tokens">Tokens</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Execution.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.Execution.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Execution.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.Execution.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.Execution.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Execution.fromObject">fromObject</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.create">create</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.fetch">fetch</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.initExecution">initExecution</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.retrievePendingExecution">retrievePendingExecution</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.update">update</a></code> | Updates an execution with the specified delta changes. |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Execution.fromObject"></a>

```typescript
import { Execution } from 'xpander-sdk'

Execution.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Execution.fromObject.parameter.data"></a>

- *Type:* any

---

##### `create` <a name="create" id="xpander-sdk.Execution.create"></a>

```typescript
import { Execution } from 'xpander-sdk'

Execution.create(agent: Agent, input: string, files: string[], workerId?: string, threadId?: string, parentExecutionId?: string, toolCallName?: string)
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Execution.create.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

###### `input`<sup>Required</sup> <a name="input" id="xpander-sdk.Execution.create.parameter.input"></a>

- *Type:* string

---

###### `files`<sup>Required</sup> <a name="files" id="xpander-sdk.Execution.create.parameter.files"></a>

- *Type:* string[]

---

###### `workerId`<sup>Optional</sup> <a name="workerId" id="xpander-sdk.Execution.create.parameter.workerId"></a>

- *Type:* string

---

###### `threadId`<sup>Optional</sup> <a name="threadId" id="xpander-sdk.Execution.create.parameter.threadId"></a>

- *Type:* string

---

###### `parentExecutionId`<sup>Optional</sup> <a name="parentExecutionId" id="xpander-sdk.Execution.create.parameter.parentExecutionId"></a>

- *Type:* string

---

###### `toolCallName`<sup>Optional</sup> <a name="toolCallName" id="xpander-sdk.Execution.create.parameter.toolCallName"></a>

- *Type:* string

---

##### `fetch` <a name="fetch" id="xpander-sdk.Execution.fetch"></a>

```typescript
import { Execution } from 'xpander-sdk'

Execution.fetch(agent: Agent, executionId: string)
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Execution.fetch.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

###### `executionId`<sup>Required</sup> <a name="executionId" id="xpander-sdk.Execution.fetch.parameter.executionId"></a>

- *Type:* string

---

##### `initExecution` <a name="initExecution" id="xpander-sdk.Execution.initExecution"></a>

```typescript
import { Execution } from 'xpander-sdk'

Execution.initExecution(createdExecution: any)
```

###### `createdExecution`<sup>Required</sup> <a name="createdExecution" id="xpander-sdk.Execution.initExecution.parameter.createdExecution"></a>

- *Type:* any

---

##### `retrievePendingExecution` <a name="retrievePendingExecution" id="xpander-sdk.Execution.retrievePendingExecution"></a>

```typescript
import { Execution } from 'xpander-sdk'

Execution.retrievePendingExecution(agent: Agent, workerId: string)
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Execution.retrievePendingExecution.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

###### `workerId`<sup>Required</sup> <a name="workerId" id="xpander-sdk.Execution.retrievePendingExecution.parameter.workerId"></a>

- *Type:* string

---

##### `update` <a name="update" id="xpander-sdk.Execution.update"></a>

```typescript
import { Execution } from 'xpander-sdk'

Execution.update(agent: Agent, execution_id: string, delta: {[ key: string ]: any})
```

Updates an execution with the specified delta changes.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Execution.update.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

The agent associated with the execution.

---

###### `execution_id`<sup>Required</sup> <a name="execution_id" id="xpander-sdk.Execution.update.parameter.execution_id"></a>

- *Type:* string

The ID of the execution to update.

---

###### `delta`<sup>Required</sup> <a name="delta" id="xpander-sdk.Execution.update.parameter.delta"></a>

- *Type:* {[ key: string ]: any}

A record of changes to apply to the execution.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Execution.property.inputMessage">inputMessage</a></code> | <code><a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a></code> | Retrieves the input message formatted as a memory message. |
| <code><a href="#xpander-sdk.Execution.property.agentId">agentId</a></code> | <code>string</code> | - Identifier of the agent performing the execution. |
| <code><a href="#xpander-sdk.Execution.property.id">id</a></code> | <code>string</code> | - Unique identifier of the execution. |
| <code><a href="#xpander-sdk.Execution.property.input">input</a></code> | <code><a href="#xpander-sdk.IExecutionInput">IExecutionInput</a></code> | - Input provided for the execution. |
| <code><a href="#xpander-sdk.Execution.property.lastExecutedNodeId">lastExecutedNodeId</a></code> | <code>string</code> | - Identifier of the last executed node. |
| <code><a href="#xpander-sdk.Execution.property.llmTokens">llmTokens</a></code> | <code><a href="#xpander-sdk.Tokens">Tokens</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.property.memoryThreadId">memoryThreadId</a></code> | <code>string</code> | - Identifier of the memory thread associated with the execution. |
| <code><a href="#xpander-sdk.Execution.property.organizationId">organizationId</a></code> | <code>string</code> | - Identifier of the organization associated with the execution. |
| <code><a href="#xpander-sdk.Execution.property.parentExecution">parentExecution</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.property.result">result</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Execution.property.status">status</a></code> | <code><a href="#xpander-sdk.ExecutionStatus">ExecutionStatus</a></code> | - Current status of the execution. |
| <code><a href="#xpander-sdk.Execution.property.workerId">workerId</a></code> | <code>string</code> | - Identifier of the worker associated with the execution. |

---

##### `inputMessage`<sup>Required</sup> <a name="inputMessage" id="xpander-sdk.Execution.property.inputMessage"></a>

```typescript
public readonly inputMessage: IMemoryMessage;
```

- *Type:* <a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>

Retrieves the input message formatted as a memory message.

Combines text and file references into a single message object.

---

##### `agentId`<sup>Required</sup> <a name="agentId" id="xpander-sdk.Execution.property.agentId"></a>

```typescript
public readonly agentId: string;
```

- *Type:* string

Identifier of the agent performing the execution.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Execution.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Unique identifier of the execution.

---

##### `input`<sup>Required</sup> <a name="input" id="xpander-sdk.Execution.property.input"></a>

```typescript
public readonly input: IExecutionInput;
```

- *Type:* <a href="#xpander-sdk.IExecutionInput">IExecutionInput</a>

Input provided for the execution.

---

##### `lastExecutedNodeId`<sup>Required</sup> <a name="lastExecutedNodeId" id="xpander-sdk.Execution.property.lastExecutedNodeId"></a>

```typescript
public readonly lastExecutedNodeId: string;
```

- *Type:* string

Identifier of the last executed node.

---

##### `llmTokens`<sup>Required</sup> <a name="llmTokens" id="xpander-sdk.Execution.property.llmTokens"></a>

```typescript
public readonly llmTokens: Tokens;
```

- *Type:* <a href="#xpander-sdk.Tokens">Tokens</a>

---

##### `memoryThreadId`<sup>Required</sup> <a name="memoryThreadId" id="xpander-sdk.Execution.property.memoryThreadId"></a>

```typescript
public readonly memoryThreadId: string;
```

- *Type:* string

Identifier of the memory thread associated with the execution.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Execution.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

Identifier of the organization associated with the execution.

---

##### `parentExecution`<sup>Required</sup> <a name="parentExecution" id="xpander-sdk.Execution.property.parentExecution"></a>

```typescript
public readonly parentExecution: string;
```

- *Type:* string

---

##### `result`<sup>Required</sup> <a name="result" id="xpander-sdk.Execution.property.result"></a>

```typescript
public readonly result: string;
```

- *Type:* string

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Execution.property.status"></a>

```typescript
public readonly status: ExecutionStatus;
```

- *Type:* <a href="#xpander-sdk.ExecutionStatus">ExecutionStatus</a>

Current status of the execution.

---

##### `workerId`<sup>Required</sup> <a name="workerId" id="xpander-sdk.Execution.property.workerId"></a>

```typescript
public readonly workerId: string;
```

- *Type:* string

Identifier of the worker associated with the execution.

---


### ExecutionMetrics <a name="ExecutionMetrics" id="xpander-sdk.ExecutionMetrics"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.ExecutionMetrics.Initializer"></a>

```typescript
import { ExecutionMetrics } from 'xpander-sdk'

new ExecutionMetrics(source: string, executionId: string, subExecutions?: string[], memoryThreadId?: string, task?: string, triggeredBy?: string, skills?: string[], status?: string, duration?: number, aiModel?: string, worker?: string, aiEmployeeId?: string, apiCallsMade?: any[], result?: string, llmTokens?: Tokens)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.source">source</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.executionId">executionId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.subExecutions">subExecutions</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.memoryThreadId">memoryThreadId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.task">task</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.triggeredBy">triggeredBy</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.skills">skills</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.status">status</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.duration">duration</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.aiModel">aiModel</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.worker">worker</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.aiEmployeeId">aiEmployeeId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.apiCallsMade">apiCallsMade</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.result">result</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.Initializer.parameter.llmTokens">llmTokens</a></code> | <code><a href="#xpander-sdk.Tokens">Tokens</a></code> | *No description.* |

---

##### `source`<sup>Required</sup> <a name="source" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.source"></a>

- *Type:* string

---

##### `executionId`<sup>Required</sup> <a name="executionId" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.executionId"></a>

- *Type:* string

---

##### `subExecutions`<sup>Optional</sup> <a name="subExecutions" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.subExecutions"></a>

- *Type:* string[]

---

##### `memoryThreadId`<sup>Optional</sup> <a name="memoryThreadId" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.memoryThreadId"></a>

- *Type:* string

---

##### `task`<sup>Optional</sup> <a name="task" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.task"></a>

- *Type:* string

---

##### `triggeredBy`<sup>Optional</sup> <a name="triggeredBy" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.triggeredBy"></a>

- *Type:* string

---

##### `skills`<sup>Optional</sup> <a name="skills" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.skills"></a>

- *Type:* string[]

---

##### `status`<sup>Optional</sup> <a name="status" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.status"></a>

- *Type:* string

---

##### `duration`<sup>Optional</sup> <a name="duration" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.duration"></a>

- *Type:* number

---

##### `aiModel`<sup>Optional</sup> <a name="aiModel" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.aiModel"></a>

- *Type:* string

---

##### `worker`<sup>Optional</sup> <a name="worker" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.worker"></a>

- *Type:* string

---

##### `aiEmployeeId`<sup>Optional</sup> <a name="aiEmployeeId" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.aiEmployeeId"></a>

- *Type:* string

---

##### `apiCallsMade`<sup>Optional</sup> <a name="apiCallsMade" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.apiCallsMade"></a>

- *Type:* any[]

---

##### `result`<sup>Optional</sup> <a name="result" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.result"></a>

- *Type:* string

---

##### `llmTokens`<sup>Optional</sup> <a name="llmTokens" id="xpander-sdk.ExecutionMetrics.Initializer.parameter.llmTokens"></a>

- *Type:* <a href="#xpander-sdk.Tokens">Tokens</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ExecutionMetrics.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.report">report</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.ExecutionMetrics.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.ExecutionMetrics.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.ExecutionMetrics.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.ExecutionMetrics.toJson"></a>

```typescript
public toJson(): string
```

##### `report` <a name="report" id="xpander-sdk.ExecutionMetrics.report"></a>

```typescript
public report(agent: Agent, reportType: string): void
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.ExecutionMetrics.report.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

###### `reportType`<sup>Required</sup> <a name="reportType" id="xpander-sdk.ExecutionMetrics.report.parameter.reportType"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ExecutionMetrics.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.ExecutionMetrics.fromObject"></a>

```typescript
import { ExecutionMetrics } from 'xpander-sdk'

ExecutionMetrics.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.ExecutionMetrics.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.aiEmployeeId">aiEmployeeId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.aiModel">aiModel</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.apiCallsMade">apiCallsMade</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.duration">duration</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.executionId">executionId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.llmTokens">llmTokens</a></code> | <code><a href="#xpander-sdk.Tokens">Tokens</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.memoryThreadId">memoryThreadId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.result">result</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.skills">skills</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.source">source</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.status">status</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.subExecutions">subExecutions</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.task">task</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.triggeredBy">triggeredBy</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionMetrics.property.worker">worker</a></code> | <code>string</code> | *No description.* |

---

##### `aiEmployeeId`<sup>Required</sup> <a name="aiEmployeeId" id="xpander-sdk.ExecutionMetrics.property.aiEmployeeId"></a>

```typescript
public readonly aiEmployeeId: string;
```

- *Type:* string

---

##### `aiModel`<sup>Required</sup> <a name="aiModel" id="xpander-sdk.ExecutionMetrics.property.aiModel"></a>

```typescript
public readonly aiModel: string;
```

- *Type:* string

---

##### `apiCallsMade`<sup>Required</sup> <a name="apiCallsMade" id="xpander-sdk.ExecutionMetrics.property.apiCallsMade"></a>

```typescript
public readonly apiCallsMade: any[];
```

- *Type:* any[]

---

##### `duration`<sup>Required</sup> <a name="duration" id="xpander-sdk.ExecutionMetrics.property.duration"></a>

```typescript
public readonly duration: number;
```

- *Type:* number

---

##### `executionId`<sup>Required</sup> <a name="executionId" id="xpander-sdk.ExecutionMetrics.property.executionId"></a>

```typescript
public readonly executionId: string;
```

- *Type:* string

---

##### `llmTokens`<sup>Required</sup> <a name="llmTokens" id="xpander-sdk.ExecutionMetrics.property.llmTokens"></a>

```typescript
public readonly llmTokens: Tokens;
```

- *Type:* <a href="#xpander-sdk.Tokens">Tokens</a>

---

##### `memoryThreadId`<sup>Required</sup> <a name="memoryThreadId" id="xpander-sdk.ExecutionMetrics.property.memoryThreadId"></a>

```typescript
public readonly memoryThreadId: string;
```

- *Type:* string

---

##### `result`<sup>Required</sup> <a name="result" id="xpander-sdk.ExecutionMetrics.property.result"></a>

```typescript
public readonly result: string;
```

- *Type:* string

---

##### `skills`<sup>Required</sup> <a name="skills" id="xpander-sdk.ExecutionMetrics.property.skills"></a>

```typescript
public readonly skills: string[];
```

- *Type:* string[]

---

##### `source`<sup>Required</sup> <a name="source" id="xpander-sdk.ExecutionMetrics.property.source"></a>

```typescript
public readonly source: string;
```

- *Type:* string

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.ExecutionMetrics.property.status"></a>

```typescript
public readonly status: string;
```

- *Type:* string

---

##### `subExecutions`<sup>Required</sup> <a name="subExecutions" id="xpander-sdk.ExecutionMetrics.property.subExecutions"></a>

```typescript
public readonly subExecutions: string[];
```

- *Type:* string[]

---

##### `task`<sup>Required</sup> <a name="task" id="xpander-sdk.ExecutionMetrics.property.task"></a>

```typescript
public readonly task: string;
```

- *Type:* string

---

##### `triggeredBy`<sup>Required</sup> <a name="triggeredBy" id="xpander-sdk.ExecutionMetrics.property.triggeredBy"></a>

```typescript
public readonly triggeredBy: string;
```

- *Type:* string

---

##### `worker`<sup>Required</sup> <a name="worker" id="xpander-sdk.ExecutionMetrics.property.worker"></a>

```typescript
public readonly worker: string;
```

- *Type:* string

---


### Graph <a name="Graph" id="xpander-sdk.Graph"></a>

Represents a graph structure containing nodes related to an agent.

#### Initializers <a name="Initializers" id="xpander-sdk.Graph.Initializer"></a>

```typescript
import { Graph } from 'xpander-sdk'

new Graph(agent: Agent, items: GraphItem[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Graph.Initializer.parameter.agent">agent</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Graph.Initializer.parameter.items">items</a></code> | <code><a href="#xpander-sdk.GraphItem">GraphItem</a>[]</code> | *No description.* |

---

##### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Graph.Initializer.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

##### `items`<sup>Required</sup> <a name="items" id="xpander-sdk.Graph.Initializer.parameter.items"></a>

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Graph.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Graph.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Graph.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Graph.addNode">addNode</a></code> | Adds a new node to the graph. |
| <code><a href="#xpander-sdk.Graph.findNodeByItemId">findNodeByItemId</a></code> | Finds a node in the graph by its item ID. |
| <code><a href="#xpander-sdk.Graph.findNodeByName">findNodeByName</a></code> | Finds a node in the graph by its name. |
| <code><a href="#xpander-sdk.Graph.findNodeByNodeId">findNodeByNodeId</a></code> | Finds a node in the graph by its node ID. |
| <code><a href="#xpander-sdk.Graph.reset">reset</a></code> | Resets the graph for the associated agent. |

---

##### `from` <a name="from" id="xpander-sdk.Graph.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Graph.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.Graph.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.Graph.toJson"></a>

```typescript
public toJson(): string
```

##### `addNode` <a name="addNode" id="xpander-sdk.Graph.addNode"></a>

```typescript
public addNode(node: Agent | GraphItem): GraphItem
```

Adds a new node to the graph.

###### `node`<sup>Required</sup> <a name="node" id="xpander-sdk.Graph.addNode.parameter.node"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a> | <a href="#xpander-sdk.GraphItem">GraphItem</a>

The node to add, which can be an agent or a graph item.

---

##### `findNodeByItemId` <a name="findNodeByItemId" id="xpander-sdk.Graph.findNodeByItemId"></a>

```typescript
public findNodeByItemId(itemId: string): GraphItem
```

Finds a node in the graph by its item ID.

###### `itemId`<sup>Required</sup> <a name="itemId" id="xpander-sdk.Graph.findNodeByItemId.parameter.itemId"></a>

- *Type:* string

The item ID to search for.

---

##### `findNodeByName` <a name="findNodeByName" id="xpander-sdk.Graph.findNodeByName"></a>

```typescript
public findNodeByName(name: string): GraphItem
```

Finds a node in the graph by its name.

###### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Graph.findNodeByName.parameter.name"></a>

- *Type:* string

The item ID to search for.

---

##### `findNodeByNodeId` <a name="findNodeByNodeId" id="xpander-sdk.Graph.findNodeByNodeId"></a>

```typescript
public findNodeByNodeId(nodeId: string): GraphItem
```

Finds a node in the graph by its node ID.

###### `nodeId`<sup>Required</sup> <a name="nodeId" id="xpander-sdk.Graph.findNodeByNodeId.parameter.nodeId"></a>

- *Type:* string

The node ID to search for.

---

##### `reset` <a name="reset" id="xpander-sdk.Graph.reset"></a>

```typescript
public reset(): void
```

Resets the graph for the associated agent.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Graph.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Graph.fromObject"></a>

```typescript
import { Graph } from 'xpander-sdk'

Graph.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Graph.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Graph.property.isEmpty">isEmpty</a></code> | <code>boolean</code> | Checks whether the graph is empty. |
| <code><a href="#xpander-sdk.Graph.property.mcpNodes">mcpNodes</a></code> | <code><a href="#xpander-sdk.GraphItem">GraphItem</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Graph.property.nodes">nodes</a></code> | <code><a href="#xpander-sdk.GraphItem">GraphItem</a>[]</code> | Gets the list of nodes in the graph. |
| <code><a href="#xpander-sdk.Graph.property.textual">textual</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Graph.property.lastNode">lastNode</a></code> | <code><a href="#xpander-sdk.GraphItem">GraphItem</a></code> | Gets the last node in the graph. |
| <code><a href="#xpander-sdk.Graph.property.lastNodeInSequence">lastNodeInSequence</a></code> | <code><a href="#xpander-sdk.GraphItem">GraphItem</a></code> | Gets the last node in sequence. |
| <code><a href="#xpander-sdk.Graph.property.rootNode">rootNode</a></code> | <code><a href="#xpander-sdk.GraphItem">GraphItem</a></code> | *No description.* |

---

##### `isEmpty`<sup>Required</sup> <a name="isEmpty" id="xpander-sdk.Graph.property.isEmpty"></a>

```typescript
public readonly isEmpty: boolean;
```

- *Type:* boolean

Checks whether the graph is empty.

---

##### `mcpNodes`<sup>Required</sup> <a name="mcpNodes" id="xpander-sdk.Graph.property.mcpNodes"></a>

```typescript
public readonly mcpNodes: GraphItem[];
```

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>[]

---

##### `nodes`<sup>Required</sup> <a name="nodes" id="xpander-sdk.Graph.property.nodes"></a>

```typescript
public readonly nodes: GraphItem[];
```

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>[]

Gets the list of nodes in the graph.

---

##### `textual`<sup>Required</sup> <a name="textual" id="xpander-sdk.Graph.property.textual"></a>

```typescript
public readonly textual: string;
```

- *Type:* string

---

##### `lastNode`<sup>Optional</sup> <a name="lastNode" id="xpander-sdk.Graph.property.lastNode"></a>

```typescript
public readonly lastNode: GraphItem;
```

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>

Gets the last node in the graph.

---

##### `lastNodeInSequence`<sup>Optional</sup> <a name="lastNodeInSequence" id="xpander-sdk.Graph.property.lastNodeInSequence"></a>

```typescript
public readonly lastNodeInSequence: GraphItem;
```

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>

Gets the last node in sequence.

---

##### `rootNode`<sup>Optional</sup> <a name="rootNode" id="xpander-sdk.Graph.property.rootNode"></a>

```typescript
public readonly rootNode: GraphItem;
```

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>

---


### GraphItem <a name="GraphItem" id="xpander-sdk.GraphItem"></a>

Represents a single item (node) in an agent's graph structure.

#### Initializers <a name="Initializers" id="xpander-sdk.GraphItem.Initializer"></a>

```typescript
import { GraphItem } from 'xpander-sdk'

new GraphItem(agent: Agent, id?: string, itemId?: string, name?: string, type?: AgentGraphItemType, isLocalTool?: boolean, targets?: string[], settings?: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.agent">agent</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a></code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.itemId">itemId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.type">type</a></code> | <code><a href="#xpander-sdk.AgentGraphItemType">AgentGraphItemType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.isLocalTool">isLocalTool</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.targets">targets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.Initializer.parameter.settings">settings</a></code> | <code>any</code> | *No description.* |

---

##### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.GraphItem.Initializer.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

##### `id`<sup>Optional</sup> <a name="id" id="xpander-sdk.GraphItem.Initializer.parameter.id"></a>

- *Type:* string

---

##### `itemId`<sup>Optional</sup> <a name="itemId" id="xpander-sdk.GraphItem.Initializer.parameter.itemId"></a>

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="xpander-sdk.GraphItem.Initializer.parameter.name"></a>

- *Type:* string

---

##### `type`<sup>Optional</sup> <a name="type" id="xpander-sdk.GraphItem.Initializer.parameter.type"></a>

- *Type:* <a href="#xpander-sdk.AgentGraphItemType">AgentGraphItemType</a>

---

##### `isLocalTool`<sup>Optional</sup> <a name="isLocalTool" id="xpander-sdk.GraphItem.Initializer.parameter.isLocalTool"></a>

- *Type:* boolean

---

##### `targets`<sup>Optional</sup> <a name="targets" id="xpander-sdk.GraphItem.Initializer.parameter.targets"></a>

- *Type:* string[]

---

##### `settings`<sup>Optional</sup> <a name="settings" id="xpander-sdk.GraphItem.Initializer.parameter.settings"></a>

- *Type:* any

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.GraphItem.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.connect">connect</a></code> | Connects this graph item to other graph items, creating edges in the graph. |
| <code><a href="#xpander-sdk.GraphItem.save">save</a></code> | Saves the current graph item state to the server. |

---

##### `from` <a name="from" id="xpander-sdk.GraphItem.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.GraphItem.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.GraphItem.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.GraphItem.toJson"></a>

```typescript
public toJson(): string
```

##### `connect` <a name="connect" id="xpander-sdk.GraphItem.connect"></a>

```typescript
public connect(targets: GraphItem[]): GraphItem
```

Connects this graph item to other graph items, creating edges in the graph.

###### `targets`<sup>Required</sup> <a name="targets" id="xpander-sdk.GraphItem.connect.parameter.targets"></a>

- *Type:* <a href="#xpander-sdk.GraphItem">GraphItem</a>[]

The target graph items to connect to.

---

##### `save` <a name="save" id="xpander-sdk.GraphItem.save"></a>

```typescript
public save(): GraphItem
```

Saves the current graph item state to the server.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.GraphItem.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.GraphItem.fromObject"></a>

```typescript
import { GraphItem } from 'xpander-sdk'

GraphItem.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.GraphItem.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.GraphItem.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.property.isLocalTool">isLocalTool</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.property.itemId">itemId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.property.targets">targets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.property.type">type</a></code> | <code><a href="#xpander-sdk.AgentGraphItemType">AgentGraphItemType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.GraphItem.property.settings">settings</a></code> | <code>any</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.GraphItem.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `isLocalTool`<sup>Required</sup> <a name="isLocalTool" id="xpander-sdk.GraphItem.property.isLocalTool"></a>

```typescript
public readonly isLocalTool: boolean;
```

- *Type:* boolean

---

##### `itemId`<sup>Required</sup> <a name="itemId" id="xpander-sdk.GraphItem.property.itemId"></a>

```typescript
public readonly itemId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.GraphItem.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `targets`<sup>Required</sup> <a name="targets" id="xpander-sdk.GraphItem.property.targets"></a>

```typescript
public readonly targets: string[];
```

- *Type:* string[]

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.GraphItem.property.type"></a>

```typescript
public readonly type: AgentGraphItemType;
```

- *Type:* <a href="#xpander-sdk.AgentGraphItemType">AgentGraphItemType</a>

---

##### `settings`<sup>Optional</sup> <a name="settings" id="xpander-sdk.GraphItem.property.settings"></a>

```typescript
public readonly settings: any;
```

- *Type:* any

---


### KnowledgeBase <a name="KnowledgeBase" id="xpander-sdk.KnowledgeBase"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.KnowledgeBase.Initializer"></a>

```typescript
import { KnowledgeBase } from 'xpander-sdk'

new KnowledgeBase(id: string, name: string, description: string, strategy: KnowledgeBaseStrategy, documents: string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.KnowledgeBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.Initializer.parameter.strategy">strategy</a></code> | <code><a href="#xpander-sdk.KnowledgeBaseStrategy">KnowledgeBaseStrategy</a></code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.Initializer.parameter.documents">documents</a></code> | <code>string[]</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.KnowledgeBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.KnowledgeBase.Initializer.parameter.name"></a>

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.KnowledgeBase.Initializer.parameter.description"></a>

- *Type:* string

---

##### `strategy`<sup>Required</sup> <a name="strategy" id="xpander-sdk.KnowledgeBase.Initializer.parameter.strategy"></a>

- *Type:* <a href="#xpander-sdk.KnowledgeBaseStrategy">KnowledgeBaseStrategy</a>

---

##### `documents`<sup>Required</sup> <a name="documents" id="xpander-sdk.KnowledgeBase.Initializer.parameter.documents"></a>

- *Type:* string[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.KnowledgeBase.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.KnowledgeBase.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.KnowledgeBase.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.KnowledgeBase.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.KnowledgeBase.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.KnowledgeBase.fromObject">fromObject</a></code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.loadByAgent">loadByAgent</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.KnowledgeBase.fromObject"></a>

```typescript
import { KnowledgeBase } from 'xpander-sdk'

KnowledgeBase.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.KnowledgeBase.fromObject.parameter.data"></a>

- *Type:* any

---

##### `loadByAgent` <a name="loadByAgent" id="xpander-sdk.KnowledgeBase.loadByAgent"></a>

```typescript
import { KnowledgeBase } from 'xpander-sdk'

KnowledgeBase.loadByAgent(agent: Agent)
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.KnowledgeBase.loadByAgent.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.KnowledgeBase.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.property.documents">documents</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBase.property.strategy">strategy</a></code> | <code><a href="#xpander-sdk.KnowledgeBaseStrategy">KnowledgeBaseStrategy</a></code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.KnowledgeBase.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `documents`<sup>Required</sup> <a name="documents" id="xpander-sdk.KnowledgeBase.property.documents"></a>

```typescript
public readonly documents: string[];
```

- *Type:* string[]

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.KnowledgeBase.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.KnowledgeBase.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `strategy`<sup>Required</sup> <a name="strategy" id="xpander-sdk.KnowledgeBase.property.strategy"></a>

```typescript
public readonly strategy: KnowledgeBaseStrategy;
```

- *Type:* <a href="#xpander-sdk.KnowledgeBaseStrategy">KnowledgeBaseStrategy</a>

---


### LLMMetrics <a name="LLMMetrics" id="xpander-sdk.LLMMetrics"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.LLMMetrics.Initializer"></a>

```typescript
import { LLMMetrics } from 'xpander-sdk'

new LLMMetrics(sourceNodeType: string, finishReason?: string, provider?: LLMProvider, model?: string, duration?: number, promptTokens?: number, completionTokens?: number, totalTokens?: number, functionName?: string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.sourceNodeType">sourceNodeType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.finishReason">finishReason</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.provider">provider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.model">model</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.duration">duration</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.promptTokens">promptTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.completionTokens">completionTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.totalTokens">totalTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.Initializer.parameter.functionName">functionName</a></code> | <code>string[]</code> | *No description.* |

---

##### `sourceNodeType`<sup>Required</sup> <a name="sourceNodeType" id="xpander-sdk.LLMMetrics.Initializer.parameter.sourceNodeType"></a>

- *Type:* string

---

##### `finishReason`<sup>Optional</sup> <a name="finishReason" id="xpander-sdk.LLMMetrics.Initializer.parameter.finishReason"></a>

- *Type:* string

---

##### `provider`<sup>Optional</sup> <a name="provider" id="xpander-sdk.LLMMetrics.Initializer.parameter.provider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `model`<sup>Optional</sup> <a name="model" id="xpander-sdk.LLMMetrics.Initializer.parameter.model"></a>

- *Type:* string

---

##### `duration`<sup>Optional</sup> <a name="duration" id="xpander-sdk.LLMMetrics.Initializer.parameter.duration"></a>

- *Type:* number

---

##### `promptTokens`<sup>Optional</sup> <a name="promptTokens" id="xpander-sdk.LLMMetrics.Initializer.parameter.promptTokens"></a>

- *Type:* number

---

##### `completionTokens`<sup>Optional</sup> <a name="completionTokens" id="xpander-sdk.LLMMetrics.Initializer.parameter.completionTokens"></a>

- *Type:* number

---

##### `totalTokens`<sup>Optional</sup> <a name="totalTokens" id="xpander-sdk.LLMMetrics.Initializer.parameter.totalTokens"></a>

- *Type:* number

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="xpander-sdk.LLMMetrics.Initializer.parameter.functionName"></a>

- *Type:* string[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMMetrics.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.report">report</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.LLMMetrics.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.LLMMetrics.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.LLMMetrics.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.LLMMetrics.toJson"></a>

```typescript
public toJson(): string
```

##### `report` <a name="report" id="xpander-sdk.LLMMetrics.report"></a>

```typescript
public report(agent: Agent, reportType: string): void
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.LLMMetrics.report.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

###### `reportType`<sup>Required</sup> <a name="reportType" id="xpander-sdk.LLMMetrics.report.parameter.reportType"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMMetrics.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.LLMMetrics.fromObject"></a>

```typescript
import { LLMMetrics } from 'xpander-sdk'

LLMMetrics.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.LLMMetrics.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.LLMMetrics.property.completionTokens">completionTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.duration">duration</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.finishReason">finishReason</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.functionName">functionName</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.model">model</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.promptTokens">promptTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.provider">provider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.sourceNodeType">sourceNodeType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMMetrics.property.totalTokens">totalTokens</a></code> | <code>number</code> | *No description.* |

---

##### `completionTokens`<sup>Required</sup> <a name="completionTokens" id="xpander-sdk.LLMMetrics.property.completionTokens"></a>

```typescript
public readonly completionTokens: number;
```

- *Type:* number

---

##### `duration`<sup>Required</sup> <a name="duration" id="xpander-sdk.LLMMetrics.property.duration"></a>

```typescript
public readonly duration: number;
```

- *Type:* number

---

##### `finishReason`<sup>Required</sup> <a name="finishReason" id="xpander-sdk.LLMMetrics.property.finishReason"></a>

```typescript
public readonly finishReason: string;
```

- *Type:* string

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="xpander-sdk.LLMMetrics.property.functionName"></a>

```typescript
public readonly functionName: string[];
```

- *Type:* string[]

---

##### `model`<sup>Required</sup> <a name="model" id="xpander-sdk.LLMMetrics.property.model"></a>

```typescript
public readonly model: string;
```

- *Type:* string

---

##### `promptTokens`<sup>Required</sup> <a name="promptTokens" id="xpander-sdk.LLMMetrics.property.promptTokens"></a>

```typescript
public readonly promptTokens: number;
```

- *Type:* number

---

##### `provider`<sup>Required</sup> <a name="provider" id="xpander-sdk.LLMMetrics.property.provider"></a>

```typescript
public readonly provider: LLMProvider;
```

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `sourceNodeType`<sup>Required</sup> <a name="sourceNodeType" id="xpander-sdk.LLMMetrics.property.sourceNodeType"></a>

```typescript
public readonly sourceNodeType: string;
```

- *Type:* string

---

##### `totalTokens`<sup>Required</sup> <a name="totalTokens" id="xpander-sdk.LLMMetrics.property.totalTokens"></a>

```typescript
public readonly totalTokens: number;
```

- *Type:* number

---


### LLMTokens <a name="LLMTokens" id="xpander-sdk.LLMTokens"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.LLMTokens.Initializer"></a>

```typescript
import { LLMTokens } from 'xpander-sdk'

new LLMTokens(completionTokens?: number, promptTokens?: number, totalTokens?: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.LLMTokens.Initializer.parameter.completionTokens">completionTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMTokens.Initializer.parameter.promptTokens">promptTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMTokens.Initializer.parameter.totalTokens">totalTokens</a></code> | <code>number</code> | *No description.* |

---

##### `completionTokens`<sup>Optional</sup> <a name="completionTokens" id="xpander-sdk.LLMTokens.Initializer.parameter.completionTokens"></a>

- *Type:* number

---

##### `promptTokens`<sup>Optional</sup> <a name="promptTokens" id="xpander-sdk.LLMTokens.Initializer.parameter.promptTokens"></a>

- *Type:* number

---

##### `totalTokens`<sup>Optional</sup> <a name="totalTokens" id="xpander-sdk.LLMTokens.Initializer.parameter.totalTokens"></a>

- *Type:* number

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.LLMTokens.property.completionTokens">completionTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMTokens.property.promptTokens">promptTokens</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.LLMTokens.property.totalTokens">totalTokens</a></code> | <code>number</code> | *No description.* |

---

##### `completionTokens`<sup>Required</sup> <a name="completionTokens" id="xpander-sdk.LLMTokens.property.completionTokens"></a>

```typescript
public readonly completionTokens: number;
```

- *Type:* number

---

##### `promptTokens`<sup>Required</sup> <a name="promptTokens" id="xpander-sdk.LLMTokens.property.promptTokens"></a>

```typescript
public readonly promptTokens: number;
```

- *Type:* number

---

##### `totalTokens`<sup>Required</sup> <a name="totalTokens" id="xpander-sdk.LLMTokens.property.totalTokens"></a>

```typescript
public readonly totalTokens: number;
```

- *Type:* number

---


### Memory <a name="Memory" id="xpander-sdk.Memory"></a>

Represents a memory thread in xpanderAI, handling storage, retrieval, and processing of memory messages and related operations.

#### Initializers <a name="Initializers" id="xpander-sdk.Memory.Initializer"></a>

```typescript
import { Memory } from 'xpander-sdk'

new Memory(agent: Agent, id: string, messages: IMemoryMessage[], userDetails: string, memoryType: MemoryType, metadata?: {[ key: string ]: any})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.agent">agent</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.messages">messages</a></code> | <code><a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.userDetails">userDetails</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.metadata">metadata</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.Initializer.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Memory.Initializer.parameter.id"></a>

- *Type:* string

---

##### `messages`<sup>Required</sup> <a name="messages" id="xpander-sdk.Memory.Initializer.parameter.messages"></a>

- *Type:* <a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>[]

---

##### `userDetails`<sup>Required</sup> <a name="userDetails" id="xpander-sdk.Memory.Initializer.parameter.userDetails"></a>

- *Type:* string

---

##### `memoryType`<sup>Required</sup> <a name="memoryType" id="xpander-sdk.Memory.Initializer.parameter.memoryType"></a>

- *Type:* <a href="#xpander-sdk.MemoryType">MemoryType</a>

---

##### `metadata`<sup>Optional</sup> <a name="metadata" id="xpander-sdk.Memory.Initializer.parameter.metadata"></a>

- *Type:* {[ key: string ]: any}

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Memory.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.addKnowledgeBase">addKnowledgeBase</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.addMessages">addMessages</a></code> | Adds messages to the memory thread. |
| <code><a href="#xpander-sdk.Memory.addToolCallResults">addToolCallResults</a></code> | Adds tool call results as messages to the memory thread. |
| <code><a href="#xpander-sdk.Memory.initInstructions">initInstructions</a></code> | Initializes the memory thread with system instructions if no messages exist. |
| <code><a href="#xpander-sdk.Memory.initMessages">initMessages</a></code> | Initializes the thread with input and instructions. |
| <code><a href="#xpander-sdk.Memory.retrieveMessages">retrieveMessages</a></code> | Retrieves the messages stored in the memory thread. |
| <code><a href="#xpander-sdk.Memory.updateMessages">updateMessages</a></code> | Updates the message history for the agent by sending the provided messages to the server. |

---

##### `from` <a name="from" id="xpander-sdk.Memory.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Memory.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.Memory.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.Memory.toJson"></a>

```typescript
public toJson(): string
```

##### `addKnowledgeBase` <a name="addKnowledgeBase" id="xpander-sdk.Memory.addKnowledgeBase"></a>

```typescript
public addKnowledgeBase(): void
```

##### `addMessages` <a name="addMessages" id="xpander-sdk.Memory.addMessages"></a>

```typescript
public addMessages(_messages: any): void
```

Adds messages to the memory thread.

Converts non-standard messages to a compatible format before storing.

###### `_messages`<sup>Required</sup> <a name="_messages" id="xpander-sdk.Memory.addMessages.parameter._messages"></a>

- *Type:* any

An array of messages to be added to the memory thread.

---

##### `addToolCallResults` <a name="addToolCallResults" id="xpander-sdk.Memory.addToolCallResults"></a>

```typescript
public addToolCallResults(toolCallResults: ToolCallResult[]): void
```

Adds tool call results as messages to the memory thread.

###### `toolCallResults`<sup>Required</sup> <a name="toolCallResults" id="xpander-sdk.Memory.addToolCallResults.parameter.toolCallResults"></a>

- *Type:* <a href="#xpander-sdk.ToolCallResult">ToolCallResult</a>[]

An array of tool call results to be added as messages.

---

##### `initInstructions` <a name="initInstructions" id="xpander-sdk.Memory.initInstructions"></a>

```typescript
public initInstructions(instructions: IAgentInstructions): void
```

Initializes the memory thread with system instructions if no messages exist.

###### `instructions`<sup>Required</sup> <a name="instructions" id="xpander-sdk.Memory.initInstructions.parameter.instructions"></a>

- *Type:* <a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a>

Instructions to initialize the memory thread.

---

##### `initMessages` <a name="initMessages" id="xpander-sdk.Memory.initMessages"></a>

```typescript
public initMessages(input: IMemoryMessage, instructions: IAgentInstructions, llmProvider?: LLMProvider, files?: string[]): void
```

Initializes the thread with input and instructions.

###### `input`<sup>Required</sup> <a name="input" id="xpander-sdk.Memory.initMessages.parameter.input"></a>

- *Type:* <a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>

Initial user input message.

---

###### `instructions`<sup>Required</sup> <a name="instructions" id="xpander-sdk.Memory.initMessages.parameter.instructions"></a>

- *Type:* <a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a>

Instructions to initialize the memory thread.

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.Memory.initMessages.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

###### `files`<sup>Optional</sup> <a name="files" id="xpander-sdk.Memory.initMessages.parameter.files"></a>

- *Type:* string[]

---

##### `retrieveMessages` <a name="retrieveMessages" id="xpander-sdk.Memory.retrieveMessages"></a>

```typescript
public retrieveMessages(): any[]
```

Retrieves the messages stored in the memory thread.

Applies the agent's memory strategy to refresh the messages if needed.

##### `updateMessages` <a name="updateMessages" id="xpander-sdk.Memory.updateMessages"></a>

```typescript
public updateMessages(_messages: any): void
```

Updates the message history for the agent by sending the provided messages to the server.

If the messages are not in the expected "xpander.ai" message format, they are converted.

###### `_messages`<sup>Required</sup> <a name="_messages" id="xpander-sdk.Memory.updateMessages.parameter._messages"></a>

- *Type:* any

The messages to be updated.

Can be in various formats.
 If not in the "xpander.ai" format, they will be converted.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Memory.fromObject">fromObject</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.create">create</a></code> | Creates a new memory thread for the specified agent. |
| <code><a href="#xpander-sdk.Memory.deleteThreadById">deleteThreadById</a></code> | Deletes a memory thread by its ID. |
| <code><a href="#xpander-sdk.Memory.fetch">fetch</a></code> | Fetches an existing memory thread by its ID. |
| <code><a href="#xpander-sdk.Memory.fetchUserThreads">fetchUserThreads</a></code> | Fetches the memory threads associated with a given agent. |
| <code><a href="#xpander-sdk.Memory.renameThreadById">renameThreadById</a></code> | Renames a memory thread by its ID. |
| <code><a href="#xpander-sdk.Memory.update">update</a></code> | Updates an existing memory thread for a specified agent. |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Memory.fromObject"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Memory.fromObject.parameter.data"></a>

- *Type:* any

---

##### `create` <a name="create" id="xpander-sdk.Memory.create"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.create(agent: Agent, userDetails?: UserDetails, threadMetadata?: {[ key: string ]: any})
```

Creates a new memory thread for the specified agent.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.create.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

The agent for which the memory thread is created.

---

###### `userDetails`<sup>Optional</sup> <a name="userDetails" id="xpander-sdk.Memory.create.parameter.userDetails"></a>

- *Type:* <a href="#xpander-sdk.UserDetails">UserDetails</a>

Optional user details associated with the memory thread.

---

###### `threadMetadata`<sup>Optional</sup> <a name="threadMetadata" id="xpander-sdk.Memory.create.parameter.threadMetadata"></a>

- *Type:* {[ key: string ]: any}

---

##### `deleteThreadById` <a name="deleteThreadById" id="xpander-sdk.Memory.deleteThreadById"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.deleteThreadById(agent: any, threadId: string)
```

Deletes a memory thread by its ID.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.deleteThreadById.parameter.agent"></a>

- *Type:* any

The agent instance containing configuration details.

---

###### `threadId`<sup>Required</sup> <a name="threadId" id="xpander-sdk.Memory.deleteThreadById.parameter.threadId"></a>

- *Type:* string

The ID of the thread to delete.

---

##### `fetch` <a name="fetch" id="xpander-sdk.Memory.fetch"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.fetch(agent: any, threadId: string)
```

Fetches an existing memory thread by its ID.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.fetch.parameter.agent"></a>

- *Type:* any

The agent associated with the memory thread.

---

###### `threadId`<sup>Required</sup> <a name="threadId" id="xpander-sdk.Memory.fetch.parameter.threadId"></a>

- *Type:* string

The ID of the memory thread to fetch.

---

##### `fetchUserThreads` <a name="fetchUserThreads" id="xpander-sdk.Memory.fetchUserThreads"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.fetchUserThreads(agent: any)
```

Fetches the memory threads associated with a given agent.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.fetchUserThreads.parameter.agent"></a>

- *Type:* any

The agent whose memory threads are to be retrieved.

---

##### `renameThreadById` <a name="renameThreadById" id="xpander-sdk.Memory.renameThreadById"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.renameThreadById(agent: any, threadId: string, name: string)
```

Renames a memory thread by its ID.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.renameThreadById.parameter.agent"></a>

- *Type:* any

The agent instance containing configuration details.

---

###### `threadId`<sup>Required</sup> <a name="threadId" id="xpander-sdk.Memory.renameThreadById.parameter.threadId"></a>

- *Type:* string

The ID of the thread to rename.

---

###### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Memory.renameThreadById.parameter.name"></a>

- *Type:* string

The new name for the thread.

---

##### `update` <a name="update" id="xpander-sdk.Memory.update"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.update(agent: Agent, threadId: string, delta?: {[ key: string ]: any})
```

Updates an existing memory thread for a specified agent.

Sends a PATCH request to the agent's memory endpoint to update an existing thread
with the provided `delta` object. The updated thread is returned as a new
instance of the `Memory` class.

*Example*

```typescript
const memory = Memory.update(agent, 'thread-id-123', { status: 'active' });
```


###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.update.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

The agent for which the memory thread should be updated.

Must contain
  valid configuration including `url` and `apiKey`.

---

###### `threadId`<sup>Required</sup> <a name="threadId" id="xpander-sdk.Memory.update.parameter.threadId"></a>

- *Type:* string

The unique identifier of the memory thread to update.

---

###### `delta`<sup>Optional</sup> <a name="delta" id="xpander-sdk.Memory.update.parameter.delta"></a>

- *Type:* {[ key: string ]: any}

Optional object containing the fields and values to update in the memory thread.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Memory.property.systemMessage">systemMessage</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.llmProvider">llmProvider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | The LLM provider to be used for message processing. |
| <code><a href="#xpander-sdk.Memory.property.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.messages">messages</a></code> | <code><a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.metadata">metadata</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.userDetails">userDetails</a></code> | <code>string</code> | *No description.* |

---

##### `systemMessage`<sup>Required</sup> <a name="systemMessage" id="xpander-sdk.Memory.property.systemMessage"></a>

```typescript
public readonly systemMessage: any[];
```

- *Type:* any[]

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Memory.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.Memory.property.llmProvider"></a>

```typescript
public readonly llmProvider: LLMProvider;
```

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

The LLM provider to be used for message processing.

---

##### `memoryType`<sup>Required</sup> <a name="memoryType" id="xpander-sdk.Memory.property.memoryType"></a>

```typescript
public readonly memoryType: MemoryType;
```

- *Type:* <a href="#xpander-sdk.MemoryType">MemoryType</a>

---

##### `messages`<sup>Required</sup> <a name="messages" id="xpander-sdk.Memory.property.messages"></a>

```typescript
public readonly messages: IMemoryMessage[];
```

- *Type:* <a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>[]

---

##### `metadata`<sup>Required</sup> <a name="metadata" id="xpander-sdk.Memory.property.metadata"></a>

```typescript
public readonly metadata: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `userDetails`<sup>Required</sup> <a name="userDetails" id="xpander-sdk.Memory.property.userDetails"></a>

```typescript
public readonly userDetails: string;
```

- *Type:* string

---


### MemoryThread <a name="MemoryThread" id="xpander-sdk.MemoryThread"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.MemoryThread.Initializer"></a>

```typescript
import { MemoryThread } from 'xpander-sdk'

new MemoryThread(id: string, createdAt?: string, name?: string, metadata?: {[ key: string ]: any})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.MemoryThread.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.Initializer.parameter.createdAt">createdAt</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.Initializer.parameter.metadata">metadata</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.MemoryThread.Initializer.parameter.id"></a>

- *Type:* string

---

##### `createdAt`<sup>Optional</sup> <a name="createdAt" id="xpander-sdk.MemoryThread.Initializer.parameter.createdAt"></a>

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="xpander-sdk.MemoryThread.Initializer.parameter.name"></a>

- *Type:* string

---

##### `metadata`<sup>Optional</sup> <a name="metadata" id="xpander-sdk.MemoryThread.Initializer.parameter.metadata"></a>

- *Type:* {[ key: string ]: any}

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.MemoryThread.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.MemoryThread.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.MemoryThread.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.MemoryThread.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.MemoryThread.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.MemoryThread.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.MemoryThread.fromObject"></a>

```typescript
import { MemoryThread } from 'xpander-sdk'

MemoryThread.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.MemoryThread.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.MemoryThread.property.createdAt">createdAt</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.property.metadata">metadata</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryThread.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `createdAt`<sup>Required</sup> <a name="createdAt" id="xpander-sdk.MemoryThread.property.createdAt"></a>

```typescript
public readonly createdAt: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.MemoryThread.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `metadata`<sup>Required</sup> <a name="metadata" id="xpander-sdk.MemoryThread.property.metadata"></a>

```typescript
public readonly metadata: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.MemoryThread.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---


### MetricsBase <a name="MetricsBase" id="xpander-sdk.MetricsBase"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.MetricsBase.Initializer"></a>

```typescript
import { MetricsBase } from 'xpander-sdk'

new MetricsBase()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.MetricsBase.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MetricsBase.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MetricsBase.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MetricsBase.report">report</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.MetricsBase.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.MetricsBase.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.MetricsBase.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.MetricsBase.toJson"></a>

```typescript
public toJson(): string
```

##### `report` <a name="report" id="xpander-sdk.MetricsBase.report"></a>

```typescript
public report(agent: Agent, reportType: string): void
```

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.MetricsBase.report.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

---

###### `reportType`<sup>Required</sup> <a name="reportType" id="xpander-sdk.MetricsBase.report.parameter.reportType"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.MetricsBase.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.MetricsBase.fromObject"></a>

```typescript
import { MetricsBase } from 'xpander-sdk'

MetricsBase.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.MetricsBase.fromObject.parameter.data"></a>

- *Type:* any

---



### Tokens <a name="Tokens" id="xpander-sdk.Tokens"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.Tokens.Initializer"></a>

```typescript
import { Tokens } from 'xpander-sdk'

new Tokens(inner?: LLMTokens, worker?: LLMTokens)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Tokens.Initializer.parameter.inner">inner</a></code> | <code><a href="#xpander-sdk.LLMTokens">LLMTokens</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Tokens.Initializer.parameter.worker">worker</a></code> | <code><a href="#xpander-sdk.LLMTokens">LLMTokens</a></code> | *No description.* |

---

##### `inner`<sup>Optional</sup> <a name="inner" id="xpander-sdk.Tokens.Initializer.parameter.inner"></a>

- *Type:* <a href="#xpander-sdk.LLMTokens">LLMTokens</a>

---

##### `worker`<sup>Optional</sup> <a name="worker" id="xpander-sdk.Tokens.Initializer.parameter.worker"></a>

- *Type:* <a href="#xpander-sdk.LLMTokens">LLMTokens</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Tokens.property.inner">inner</a></code> | <code><a href="#xpander-sdk.LLMTokens">LLMTokens</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Tokens.property.worker">worker</a></code> | <code><a href="#xpander-sdk.LLMTokens">LLMTokens</a></code> | *No description.* |

---

##### `inner`<sup>Required</sup> <a name="inner" id="xpander-sdk.Tokens.property.inner"></a>

```typescript
public readonly inner: LLMTokens;
```

- *Type:* <a href="#xpander-sdk.LLMTokens">LLMTokens</a>

---

##### `worker`<sup>Required</sup> <a name="worker" id="xpander-sdk.Tokens.property.worker"></a>

```typescript
public readonly worker: LLMTokens;
```

- *Type:* <a href="#xpander-sdk.LLMTokens">LLMTokens</a>

---


### ToolCall <a name="ToolCall" id="xpander-sdk.ToolCall"></a>

Represents a tool call with its metadata and payload.

#### Initializers <a name="Initializers" id="xpander-sdk.ToolCall.Initializer"></a>

```typescript
import { ToolCall } from 'xpander-sdk'

new ToolCall(name?: string, type?: ToolCallType, payload?: any, toolCallId?: string, graphApproved?: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.graphApproved">graphApproved</a></code> | <code>boolean</code> | *No description.* |

---

##### `name`<sup>Optional</sup> <a name="name" id="xpander-sdk.ToolCall.Initializer.parameter.name"></a>

- *Type:* string

---

##### `type`<sup>Optional</sup> <a name="type" id="xpander-sdk.ToolCall.Initializer.parameter.type"></a>

- *Type:* <a href="#xpander-sdk.ToolCallType">ToolCallType</a>

---

##### `payload`<sup>Optional</sup> <a name="payload" id="xpander-sdk.ToolCall.Initializer.parameter.payload"></a>

- *Type:* any

---

##### `toolCallId`<sup>Optional</sup> <a name="toolCallId" id="xpander-sdk.ToolCall.Initializer.parameter.toolCallId"></a>

- *Type:* string

---

##### `graphApproved`<sup>Optional</sup> <a name="graphApproved" id="xpander-sdk.ToolCall.Initializer.parameter.graphApproved"></a>

- *Type:* boolean

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolCall.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.ToolCall.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.ToolCall.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.ToolCall.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.ToolCall.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolCall.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.ToolCall.fromObject"></a>

```typescript
import { ToolCall } from 'xpander-sdk'

ToolCall.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.ToolCall.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolCall.property.graphApproved">graphApproved</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |

---

##### `graphApproved`<sup>Required</sup> <a name="graphApproved" id="xpander-sdk.ToolCall.property.graphApproved"></a>

```typescript
public readonly graphApproved: boolean;
```

- *Type:* boolean

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolCall.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `payload`<sup>Required</sup> <a name="payload" id="xpander-sdk.ToolCall.property.payload"></a>

```typescript
public readonly payload: any;
```

- *Type:* any

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.ToolCall.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.ToolCall.property.type"></a>

```typescript
public readonly type: ToolCallType;
```

- *Type:* <a href="#xpander-sdk.ToolCallType">ToolCallType</a>

---


### ToolCallResult <a name="ToolCallResult" id="xpander-sdk.ToolCallResult"></a>

Represents the result of a tool call execution.

#### Initializers <a name="Initializers" id="xpander-sdk.ToolCallResult.Initializer"></a>

```typescript
import { ToolCallResult } from 'xpander-sdk'

new ToolCallResult(functionName?: string, toolCallId?: string, payload?: any, statusCode?: number, result?: any, isSuccess?: boolean, isError?: boolean, isLocal?: boolean, graphApproved?: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.functionName">functionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.statusCode">statusCode</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.result">result</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.isSuccess">isSuccess</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.isError">isError</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.isLocal">isLocal</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.Initializer.parameter.graphApproved">graphApproved</a></code> | <code>boolean</code> | *No description.* |

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="xpander-sdk.ToolCallResult.Initializer.parameter.functionName"></a>

- *Type:* string

---

##### `toolCallId`<sup>Optional</sup> <a name="toolCallId" id="xpander-sdk.ToolCallResult.Initializer.parameter.toolCallId"></a>

- *Type:* string

---

##### `payload`<sup>Optional</sup> <a name="payload" id="xpander-sdk.ToolCallResult.Initializer.parameter.payload"></a>

- *Type:* any

---

##### `statusCode`<sup>Optional</sup> <a name="statusCode" id="xpander-sdk.ToolCallResult.Initializer.parameter.statusCode"></a>

- *Type:* number

---

##### `result`<sup>Optional</sup> <a name="result" id="xpander-sdk.ToolCallResult.Initializer.parameter.result"></a>

- *Type:* any

---

##### `isSuccess`<sup>Optional</sup> <a name="isSuccess" id="xpander-sdk.ToolCallResult.Initializer.parameter.isSuccess"></a>

- *Type:* boolean

---

##### `isError`<sup>Optional</sup> <a name="isError" id="xpander-sdk.ToolCallResult.Initializer.parameter.isError"></a>

- *Type:* boolean

---

##### `isLocal`<sup>Optional</sup> <a name="isLocal" id="xpander-sdk.ToolCallResult.Initializer.parameter.isLocal"></a>

- *Type:* boolean

---

##### `graphApproved`<sup>Optional</sup> <a name="graphApproved" id="xpander-sdk.ToolCallResult.Initializer.parameter.graphApproved"></a>

- *Type:* boolean

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolCallResult.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.ToolCallResult.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.ToolCallResult.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.ToolCallResult.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.ToolCallResult.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolCallResult.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.ToolCallResult.fromObject"></a>

```typescript
import { ToolCallResult } from 'xpander-sdk'

ToolCallResult.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.ToolCallResult.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolCallResult.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.graphApproved">graphApproved</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.isError">isError</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.isLocal">isLocal</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.isSuccess">isSuccess</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.result">result</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.statusCode">statusCode</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallResult.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="xpander-sdk.ToolCallResult.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---

##### `graphApproved`<sup>Required</sup> <a name="graphApproved" id="xpander-sdk.ToolCallResult.property.graphApproved"></a>

```typescript
public readonly graphApproved: boolean;
```

- *Type:* boolean

---

##### `isError`<sup>Required</sup> <a name="isError" id="xpander-sdk.ToolCallResult.property.isError"></a>

```typescript
public readonly isError: boolean;
```

- *Type:* boolean

---

##### `isLocal`<sup>Required</sup> <a name="isLocal" id="xpander-sdk.ToolCallResult.property.isLocal"></a>

```typescript
public readonly isLocal: boolean;
```

- *Type:* boolean

---

##### `isSuccess`<sup>Required</sup> <a name="isSuccess" id="xpander-sdk.ToolCallResult.property.isSuccess"></a>

```typescript
public readonly isSuccess: boolean;
```

- *Type:* boolean

---

##### `payload`<sup>Required</sup> <a name="payload" id="xpander-sdk.ToolCallResult.property.payload"></a>

```typescript
public readonly payload: any;
```

- *Type:* any

---

##### `result`<sup>Required</sup> <a name="result" id="xpander-sdk.ToolCallResult.property.result"></a>

```typescript
public readonly result: any;
```

- *Type:* any

---

##### `statusCode`<sup>Required</sup> <a name="statusCode" id="xpander-sdk.ToolCallResult.property.statusCode"></a>

```typescript
public readonly statusCode: number;
```

- *Type:* number

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.ToolCallResult.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---


### UnloadedAgent <a name="UnloadedAgent" id="xpander-sdk.UnloadedAgent"></a>

Represents an unloaded agent in the xpander.ai system. Used to reference agents that are not yet fully loaded.

#### Initializers <a name="Initializers" id="xpander-sdk.UnloadedAgent.Initializer"></a>

```typescript
import { UnloadedAgent } from 'xpander-sdk'

new UnloadedAgent(configuration: Configuration, id: string, name: string, status: AgentStatus, organizationId: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.UnloadedAgent.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - The configuration instance used for loading the agent. |
| <code><a href="#xpander-sdk.UnloadedAgent.Initializer.parameter.id">id</a></code> | <code>string</code> | - The unique identifier of the agent. |
| <code><a href="#xpander-sdk.UnloadedAgent.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name of the agent. |
| <code><a href="#xpander-sdk.UnloadedAgent.Initializer.parameter.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | - The current status of the agent. |
| <code><a href="#xpander-sdk.UnloadedAgent.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | - The ID of the organization to which the agent belongs. |

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.UnloadedAgent.Initializer.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

The configuration instance used for loading the agent.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.UnloadedAgent.Initializer.parameter.id"></a>

- *Type:* string

The unique identifier of the agent.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.UnloadedAgent.Initializer.parameter.name"></a>

- *Type:* string

The name of the agent.

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.UnloadedAgent.Initializer.parameter.status"></a>

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

The current status of the agent.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.UnloadedAgent.Initializer.parameter.organizationId"></a>

- *Type:* string

The ID of the organization to which the agent belongs.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.UnloadedAgent.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.UnloadedAgent.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.UnloadedAgent.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.UnloadedAgent.load">load</a></code> | Loads the full Agent instance from the xpander.ai system using its ID. |

---

##### `from` <a name="from" id="xpander-sdk.UnloadedAgent.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.UnloadedAgent.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.UnloadedAgent.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.UnloadedAgent.toJson"></a>

```typescript
public toJson(): string
```

##### `load` <a name="load" id="xpander-sdk.UnloadedAgent.load"></a>

```typescript
public load(): Agent
```

Loads the full Agent instance from the xpander.ai system using its ID.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.UnloadedAgent.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.UnloadedAgent.fromObject"></a>

```typescript
import { UnloadedAgent } from 'xpander-sdk'

UnloadedAgent.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.UnloadedAgent.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.UnloadedAgent.property.id">id</a></code> | <code>string</code> | - The unique identifier of the agent. |
| <code><a href="#xpander-sdk.UnloadedAgent.property.name">name</a></code> | <code>string</code> | - The name of the agent. |
| <code><a href="#xpander-sdk.UnloadedAgent.property.organizationId">organizationId</a></code> | <code>string</code> | - The ID of the organization to which the agent belongs. |
| <code><a href="#xpander-sdk.UnloadedAgent.property.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | - The current status of the agent. |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.UnloadedAgent.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The unique identifier of the agent.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.UnloadedAgent.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the agent.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.UnloadedAgent.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

The ID of the organization to which the agent belongs.

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.UnloadedAgent.property.status"></a>

```typescript
public readonly status: AgentStatus;
```

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

The current status of the agent.

---


### UserDetails <a name="UserDetails" id="xpander-sdk.UserDetails"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.UserDetails.Initializer"></a>

```typescript
import { UserDetails } from 'xpander-sdk'

new UserDetails(id: string, firstName?: string, lastName?: string, email?: string, additionalAttributes?: {[ key: string ]: any})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.UserDetails.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.Initializer.parameter.firstName">firstName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.Initializer.parameter.lastName">lastName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.Initializer.parameter.email">email</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.Initializer.parameter.additionalAttributes">additionalAttributes</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.UserDetails.Initializer.parameter.id"></a>

- *Type:* string

---

##### `firstName`<sup>Optional</sup> <a name="firstName" id="xpander-sdk.UserDetails.Initializer.parameter.firstName"></a>

- *Type:* string

---

##### `lastName`<sup>Optional</sup> <a name="lastName" id="xpander-sdk.UserDetails.Initializer.parameter.lastName"></a>

- *Type:* string

---

##### `email`<sup>Optional</sup> <a name="email" id="xpander-sdk.UserDetails.Initializer.parameter.email"></a>

- *Type:* string

---

##### `additionalAttributes`<sup>Optional</sup> <a name="additionalAttributes" id="xpander-sdk.UserDetails.Initializer.parameter.additionalAttributes"></a>

- *Type:* {[ key: string ]: any}

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.UserDetails.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.toJson">toJson</a></code> | *No description.* |

---

##### `from` <a name="from" id="xpander-sdk.UserDetails.from"></a>

```typescript
public from(data: object): Base
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.UserDetails.from.parameter.data"></a>

- *Type:* object

---

##### `toDict` <a name="toDict" id="xpander-sdk.UserDetails.toDict"></a>

```typescript
public toDict(): {[ key: string ]: any}
```

##### `toJson` <a name="toJson" id="xpander-sdk.UserDetails.toJson"></a>

```typescript
public toJson(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.UserDetails.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.UserDetails.fromObject"></a>

```typescript
import { UserDetails } from 'xpander-sdk'

UserDetails.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.UserDetails.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.UserDetails.property.additionalAttributes">additionalAttributes</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.property.email">email</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.property.firstName">firstName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.UserDetails.property.lastName">lastName</a></code> | <code>string</code> | *No description.* |

---

##### `additionalAttributes`<sup>Required</sup> <a name="additionalAttributes" id="xpander-sdk.UserDetails.property.additionalAttributes"></a>

```typescript
public readonly additionalAttributes: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `email`<sup>Required</sup> <a name="email" id="xpander-sdk.UserDetails.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

---

##### `firstName`<sup>Required</sup> <a name="firstName" id="xpander-sdk.UserDetails.property.firstName"></a>

```typescript
public readonly firstName: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.UserDetails.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `lastName`<sup>Required</sup> <a name="lastName" id="xpander-sdk.UserDetails.property.lastName"></a>

```typescript
public readonly lastName: string;
```

- *Type:* string

---


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

XpanderClient provides methods for configuring and interacting with xpanderAI tools, managing agents, and extracting tool calls from LLM responses.

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

new XpanderClient(apiKey: string, baseUrl?: any, organizationId?: string, should_reset_cache?: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.baseUrl">baseUrl</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.should_reset_cache">should_reset_cache</a></code> | <code>boolean</code> | *No description.* |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.XpanderClient.Initializer.parameter.apiKey"></a>

- *Type:* string

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.baseUrl"></a>

- *Type:* any

---

##### `organizationId`<sup>Optional</sup> <a name="organizationId" id="xpander-sdk.XpanderClient.Initializer.parameter.organizationId"></a>

- *Type:* string

---

##### `should_reset_cache`<sup>Optional</sup> <a name="should_reset_cache" id="xpander-sdk.XpanderClient.Initializer.parameter.should_reset_cache"></a>

- *Type:* boolean

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.extractToolCalls">extractToolCalls</a></code> | Extracts tool calls from an LLM response based on the specified LLM provider. |
| <code><a href="#xpander-sdk.XpanderClient.retrievePendingLocalToolCalls">retrievePendingLocalToolCalls</a></code> | Filters and retrieves local tool calls from a given list of tool calls. |

---

##### `extractToolCalls` <a name="extractToolCalls" id="xpander-sdk.XpanderClient.extractToolCalls"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

XpanderClient.extractToolCalls(llmResponse: any, llmProvider?: LLMProvider)
```

Extracts tool calls from an LLM response based on the specified LLM provider.

###### `llmResponse`<sup>Required</sup> <a name="llmResponse" id="xpander-sdk.XpanderClient.extractToolCalls.parameter.llmResponse"></a>

- *Type:* any

The LLM response to analyze for tool calls.

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.extractToolCalls.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

The LLM provider, defaults to OPEN_AI.

---

##### `retrievePendingLocalToolCalls` <a name="retrievePendingLocalToolCalls" id="xpander-sdk.XpanderClient.retrievePendingLocalToolCalls"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

XpanderClient.retrievePendingLocalToolCalls(toolCalls: ToolCall[])
```

Filters and retrieves local tool calls from a given list of tool calls.

###### `toolCalls`<sup>Required</sup> <a name="toolCalls" id="xpander-sdk.XpanderClient.retrievePendingLocalToolCalls.parameter.toolCalls"></a>

- *Type:* <a href="#xpander-sdk.ToolCall">ToolCall</a>[]

The list of tool calls to filter.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.agents">agents</a></code> | <code><a href="#xpander-sdk.Agents">Agents</a></code> | Instance of Agents to manage xpanderAI agents. |
| <code><a href="#xpander-sdk.XpanderClient.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | Configuration settings for the xpanderAI client. |

---

##### `agents`<sup>Required</sup> <a name="agents" id="xpander-sdk.XpanderClient.property.agents"></a>

```typescript
public readonly agents: Agents;
```

- *Type:* <a href="#xpander-sdk.Agents">Agents</a>

Instance of Agents to manage xpanderAI agents.

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.XpanderClient.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for the xpanderAI client.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IAgentGraphItemAdvancedFilteringOption <a name="IAgentGraphItemAdvancedFilteringOption" id="xpander-sdk.IAgentGraphItemAdvancedFilteringOption"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentGraphItemAdvancedFilteringOption">IAgentGraphItemAdvancedFilteringOption</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentGraphItemAdvancedFilteringOption.property.returnables">returnables</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemAdvancedFilteringOption.property.searchables">searchables</a></code> | <code>string[]</code> | *No description.* |

---

##### `returnables`<sup>Optional</sup> <a name="returnables" id="xpander-sdk.IAgentGraphItemAdvancedFilteringOption.property.returnables"></a>

```typescript
public readonly returnables: string[];
```

- *Type:* string[]

---

##### `searchables`<sup>Optional</sup> <a name="searchables" id="xpander-sdk.IAgentGraphItemAdvancedFilteringOption.property.searchables"></a>

```typescript
public readonly searchables: string[];
```

- *Type:* string[]

---

### IAgentGraphItemMCPSettings <a name="IAgentGraphItemMCPSettings" id="xpander-sdk.IAgentGraphItemMCPSettings"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentGraphItemMCPSettings">IAgentGraphItemMCPSettings</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentGraphItemMCPSettings.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemMCPSettings.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemMCPSettings.property.allowedTools">allowedTools</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemMCPSettings.property.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IAgentGraphItemMCPSettings.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `url`<sup>Required</sup> <a name="url" id="xpander-sdk.IAgentGraphItemMCPSettings.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `allowedTools`<sup>Optional</sup> <a name="allowedTools" id="xpander-sdk.IAgentGraphItemMCPSettings.property.allowedTools"></a>

```typescript
public readonly allowedTools: string[];
```

- *Type:* string[]

---

##### `apiKey`<sup>Optional</sup> <a name="apiKey" id="xpander-sdk.IAgentGraphItemMCPSettings.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

---

### IAgentGraphItemSchema <a name="IAgentGraphItemSchema" id="xpander-sdk.IAgentGraphItemSchema"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentGraphItemSchema">IAgentGraphItemSchema</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentGraphItemSchema.property.input">input</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemSchema.property.output">output</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `input`<sup>Optional</sup> <a name="input" id="xpander-sdk.IAgentGraphItemSchema.property.input"></a>

```typescript
public readonly input: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `output`<sup>Optional</sup> <a name="output" id="xpander-sdk.IAgentGraphItemSchema.property.output"></a>

```typescript
public readonly output: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

### IAgentGraphItemSettings <a name="IAgentGraphItemSettings" id="xpander-sdk.IAgentGraphItemSettings"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentGraphItemSettings">IAgentGraphItemSettings</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentGraphItemSettings.property.advancedFilteringOptions">advancedFilteringOptions</a></code> | <code><a href="#xpander-sdk.IAgentGraphItemAdvancedFilteringOption">IAgentGraphItemAdvancedFilteringOption</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemSettings.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemSettings.property.instructions">instructions</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemSettings.property.mcpSettings">mcpSettings</a></code> | <code><a href="#xpander-sdk.IAgentGraphItemMCPSettings">IAgentGraphItemMCPSettings</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItemSettings.property.schemas">schemas</a></code> | <code><a href="#xpander-sdk.IAgentGraphItemSchema">IAgentGraphItemSchema</a></code> | *No description.* |

---

##### `advancedFilteringOptions`<sup>Optional</sup> <a name="advancedFilteringOptions" id="xpander-sdk.IAgentGraphItemSettings.property.advancedFilteringOptions"></a>

```typescript
public readonly advancedFilteringOptions: IAgentGraphItemAdvancedFilteringOption[];
```

- *Type:* <a href="#xpander-sdk.IAgentGraphItemAdvancedFilteringOption">IAgentGraphItemAdvancedFilteringOption</a>[]

---

##### `description`<sup>Optional</sup> <a name="description" id="xpander-sdk.IAgentGraphItemSettings.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `instructions`<sup>Optional</sup> <a name="instructions" id="xpander-sdk.IAgentGraphItemSettings.property.instructions"></a>

```typescript
public readonly instructions: string;
```

- *Type:* string

---

##### `mcpSettings`<sup>Optional</sup> <a name="mcpSettings" id="xpander-sdk.IAgentGraphItemSettings.property.mcpSettings"></a>

```typescript
public readonly mcpSettings: IAgentGraphItemMCPSettings;
```

- *Type:* <a href="#xpander-sdk.IAgentGraphItemMCPSettings">IAgentGraphItemMCPSettings</a>

---

##### `schemas`<sup>Optional</sup> <a name="schemas" id="xpander-sdk.IAgentGraphItemSettings.property.schemas"></a>

```typescript
public readonly schemas: IAgentGraphItemSchema;
```

- *Type:* <a href="#xpander-sdk.IAgentGraphItemSchema">IAgentGraphItemSchema</a>

---

### IAgentInstructions <a name="IAgentInstructions" id="xpander-sdk.IAgentInstructions"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentInstructions.property.general">general</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentInstructions.property.goal">goal</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentInstructions.property.role">role</a></code> | <code>string</code> | *No description.* |

---

##### `general`<sup>Required</sup> <a name="general" id="xpander-sdk.IAgentInstructions.property.general"></a>

```typescript
public readonly general: string;
```

- *Type:* string

---

##### `goal`<sup>Required</sup> <a name="goal" id="xpander-sdk.IAgentInstructions.property.goal"></a>

```typescript
public readonly goal: string;
```

- *Type:* string

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.IAgentInstructions.property.role"></a>

```typescript
public readonly role: string;
```

- *Type:* string

---

### IAgentTool <a name="IAgentTool" id="xpander-sdk.IAgentTool"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>

Interface representing a tool available to an agent.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentTool.property.functionDescription">functionDescription</a></code> | <code>string</code> | Function-level description for the tool. |
| <code><a href="#xpander-sdk.IAgentTool.property.id">id</a></code> | <code>string</code> | Unique identifier for the tool. |
| <code><a href="#xpander-sdk.IAgentTool.property.method">method</a></code> | <code>string</code> | HTTP method used to call the tool. |
| <code><a href="#xpander-sdk.IAgentTool.property.name">name</a></code> | <code>string</code> | Name of the tool. |
| <code><a href="#xpander-sdk.IAgentTool.property.parameters">parameters</a></code> | <code>any</code> | Parameters required for executing the tool. |
| <code><a href="#xpander-sdk.IAgentTool.property.path">path</a></code> | <code>string</code> | Endpoint path for the tool. |
| <code><a href="#xpander-sdk.IAgentTool.property.pathParams">pathParams</a></code> | <code>any</code> | Parameters for path in the tool’s endpoint. |
| <code><a href="#xpander-sdk.IAgentTool.property.queryParams">queryParams</a></code> | <code>any</code> | Parameters for query in the tool’s endpoint. |
| <code><a href="#xpander-sdk.IAgentTool.property.rawDescription">rawDescription</a></code> | <code>string</code> | Raw description of the tool. |

---

##### `functionDescription`<sup>Required</sup> <a name="functionDescription" id="xpander-sdk.IAgentTool.property.functionDescription"></a>

```typescript
public readonly functionDescription: string;
```

- *Type:* string

Function-level description for the tool.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.IAgentTool.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Unique identifier for the tool.

---

##### `method`<sup>Required</sup> <a name="method" id="xpander-sdk.IAgentTool.property.method"></a>

```typescript
public readonly method: string;
```

- *Type:* string

HTTP method used to call the tool.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IAgentTool.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the tool.

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="xpander-sdk.IAgentTool.property.parameters"></a>

```typescript
public readonly parameters: any;
```

- *Type:* any

Parameters required for executing the tool.

---

##### `path`<sup>Required</sup> <a name="path" id="xpander-sdk.IAgentTool.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Endpoint path for the tool.

---

##### `pathParams`<sup>Required</sup> <a name="pathParams" id="xpander-sdk.IAgentTool.property.pathParams"></a>

```typescript
public readonly pathParams: any;
```

- *Type:* any

Parameters for path in the tool’s endpoint.

---

##### `queryParams`<sup>Required</sup> <a name="queryParams" id="xpander-sdk.IAgentTool.property.queryParams"></a>

```typescript
public readonly queryParams: any;
```

- *Type:* any

Parameters for query in the tool’s endpoint.

---

##### `rawDescription`<sup>Required</sup> <a name="rawDescription" id="xpander-sdk.IAgentTool.property.rawDescription"></a>

```typescript
public readonly rawDescription: string;
```

- *Type:* string

Raw description of the tool.

---

### IBedrockTool <a name="IBedrockTool" id="xpander-sdk.IBedrockTool"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockTool">IBedrockTool</a>

Interface representing a Bedrock tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockTool.property.toolSpec">toolSpec</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a></code> | Specification details for the Bedrock tool. |
| <code><a href="#xpander-sdk.IBedrockTool.property.execute">execute</a></code> | <code>any</code> | Function to execute the tool, if defined. |

---

##### `toolSpec`<sup>Required</sup> <a name="toolSpec" id="xpander-sdk.IBedrockTool.property.toolSpec"></a>

```typescript
public readonly toolSpec: IBedrockToolSpec;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>

Specification details for the Bedrock tool.

---

##### `execute`<sup>Optional</sup> <a name="execute" id="xpander-sdk.IBedrockTool.property.execute"></a>

```typescript
public readonly execute: any;
```

- *Type:* any

Function to execute the tool, if defined.

---

### IBedrockToolOutput <a name="IBedrockToolOutput" id="xpander-sdk.IBedrockToolOutput"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockToolOutput">IBedrockToolOutput</a>

Output interface for a Bedrock tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolOutput.property.toolSpec">toolSpec</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a></code> | Specification of the Bedrock tool. |
| <code><a href="#xpander-sdk.IBedrockToolOutput.property.execute">execute</a></code> | <code>any</code> | Function to execute the Bedrock tool. |

---

##### `toolSpec`<sup>Required</sup> <a name="toolSpec" id="xpander-sdk.IBedrockToolOutput.property.toolSpec"></a>

```typescript
public readonly toolSpec: IBedrockToolSpec;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>

Specification of the Bedrock tool.

---

##### `execute`<sup>Optional</sup> <a name="execute" id="xpander-sdk.IBedrockToolOutput.property.execute"></a>

```typescript
public readonly execute: any;
```

- *Type:* any

Function to execute the Bedrock tool.

---

### IBedrockToolSpec <a name="IBedrockToolSpec" id="xpander-sdk.IBedrockToolSpec"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>

Interface representing the specification for a Bedrock tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.description">description</a></code> | <code>string</code> | Description of what the Bedrock tool does. |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.inputSchema">inputSchema</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a></code> | Input schema detailing required parameters for the tool. |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.name">name</a></code> | <code>string</code> | The name of the Bedrock tool. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.IBedrockToolSpec.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of what the Bedrock tool does.

---

##### `inputSchema`<sup>Required</sup> <a name="inputSchema" id="xpander-sdk.IBedrockToolSpec.property.inputSchema"></a>

```typescript
public readonly inputSchema: IBedrockToolSpecInputSchema;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a>

Input schema detailing required parameters for the tool.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IBedrockToolSpec.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the Bedrock tool.

---

### IBedrockToolSpecInputSchema <a name="IBedrockToolSpecInputSchema" id="xpander-sdk.IBedrockToolSpecInputSchema"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a>

Interface representing the input schema for a Bedrock tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolSpecInputSchema.property.json">json</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | JSON schema defining the parameters for the tool. |

---

##### `json`<sup>Required</sup> <a name="json" id="xpander-sdk.IBedrockToolSpecInputSchema.property.json"></a>

```typescript
public readonly json: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

JSON schema defining the parameters for the tool.

---

### IConfiguration <a name="IConfiguration" id="xpander-sdk.IConfiguration"></a>

- *Implemented By:* <a href="#xpander-sdk.IConfiguration">IConfiguration</a>

Interface representing configuration settings for the xpanderAI client.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IConfiguration.property.apiKey">apiKey</a></code> | <code>string</code> | API key for authenticating with xpanderAI. |
| <code><a href="#xpander-sdk.IConfiguration.property.baseUrl">baseUrl</a></code> | <code>string</code> | Optional base URL for the xpanderAI API. |
| <code><a href="#xpander-sdk.IConfiguration.property.organizationId">organizationId</a></code> | <code>string</code> | Custom parameters for client-specific settings. |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.IConfiguration.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

API key for authenticating with xpanderAI.

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="xpander-sdk.IConfiguration.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

Optional base URL for the xpanderAI API.

---

##### `organizationId`<sup>Optional</sup> <a name="organizationId" id="xpander-sdk.IConfiguration.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

Custom parameters for client-specific settings.

---

### IExecutionInput <a name="IExecutionInput" id="xpander-sdk.IExecutionInput"></a>

- *Implemented By:* <a href="#xpander-sdk.IExecutionInput">IExecutionInput</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IExecutionInput.property.user">user</a></code> | <code><a href="#xpander-sdk.UserDetails">UserDetails</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IExecutionInput.property.files">files</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IExecutionInput.property.text">text</a></code> | <code>string</code> | *No description.* |

---

##### `user`<sup>Required</sup> <a name="user" id="xpander-sdk.IExecutionInput.property.user"></a>

```typescript
public readonly user: UserDetails;
```

- *Type:* <a href="#xpander-sdk.UserDetails">UserDetails</a>

---

##### `files`<sup>Optional</sup> <a name="files" id="xpander-sdk.IExecutionInput.property.files"></a>

```typescript
public readonly files: string[];
```

- *Type:* string[]

---

##### `text`<sup>Optional</sup> <a name="text" id="xpander-sdk.IExecutionInput.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

---

### ILocalTool <a name="ILocalTool" id="xpander-sdk.ILocalTool"></a>

- *Implemented By:* <a href="#xpander-sdk.ILocalTool">ILocalTool</a>

Interface for a local tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ILocalTool.property.function">function</a></code> | <code><a href="#xpander-sdk.ILocalToolFunction">ILocalToolFunction</a></code> | Function specification for the local tool. |
| <code><a href="#xpander-sdk.ILocalTool.property.type">type</a></code> | <code>string</code> | Specifies the tool type as a 'function'. |

---

##### `function`<sup>Required</sup> <a name="function" id="xpander-sdk.ILocalTool.property.function"></a>

```typescript
public readonly function: ILocalToolFunction;
```

- *Type:* <a href="#xpander-sdk.ILocalToolFunction">ILocalToolFunction</a>

Function specification for the local tool.

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.ILocalTool.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

Specifies the tool type as a 'function'.

---

### ILocalToolFunction <a name="ILocalToolFunction" id="xpander-sdk.ILocalToolFunction"></a>

- *Implemented By:* <a href="#xpander-sdk.ILocalToolFunction">ILocalToolFunction</a>

Interface for a function within a local tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ILocalToolFunction.property.description">description</a></code> | <code>string</code> | Description of the local tool's purpose. |
| <code><a href="#xpander-sdk.ILocalToolFunction.property.name">name</a></code> | <code>string</code> | The name of the local tool function. |
| <code><a href="#xpander-sdk.ILocalToolFunction.property.parameters">parameters</a></code> | <code>any</code> | Parameters used by the local tool function. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.ILocalToolFunction.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the local tool's purpose.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ILocalToolFunction.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the local tool function.

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="xpander-sdk.ILocalToolFunction.property.parameters"></a>

```typescript
public readonly parameters: any;
```

- *Type:* any

Parameters used by the local tool function.

---

### IMemoryMessage <a name="IMemoryMessage" id="xpander-sdk.IMemoryMessage"></a>

- *Implemented By:* <a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IMemoryMessage.property.role">role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IMemoryMessage.property.completionResponse">completionResponse</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IMemoryMessage.property.content">content</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IMemoryMessage.property.nodeName">nodeName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IMemoryMessage.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IMemoryMessage.property.toolCalls">toolCalls</a></code> | <code><a href="#xpander-sdk.IToolCall">IToolCall</a>[]</code> | *No description.* |

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.IMemoryMessage.property.role"></a>

```typescript
public readonly role: string;
```

- *Type:* string

---

##### `completionResponse`<sup>Optional</sup> <a name="completionResponse" id="xpander-sdk.IMemoryMessage.property.completionResponse"></a>

```typescript
public readonly completionResponse: any;
```

- *Type:* any

---

##### `content`<sup>Optional</sup> <a name="content" id="xpander-sdk.IMemoryMessage.property.content"></a>

```typescript
public readonly content: string;
```

- *Type:* string

---

##### `nodeName`<sup>Optional</sup> <a name="nodeName" id="xpander-sdk.IMemoryMessage.property.nodeName"></a>

```typescript
public readonly nodeName: string;
```

- *Type:* string

---

##### `toolCallId`<sup>Optional</sup> <a name="toolCallId" id="xpander-sdk.IMemoryMessage.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `toolCalls`<sup>Optional</sup> <a name="toolCalls" id="xpander-sdk.IMemoryMessage.property.toolCalls"></a>

```typescript
public readonly toolCalls: IToolCall[];
```

- *Type:* <a href="#xpander-sdk.IToolCall">IToolCall</a>[]

---

### INodeDescription <a name="INodeDescription" id="xpander-sdk.INodeDescription"></a>

- *Implemented By:* <a href="#xpander-sdk.INodeDescription">INodeDescription</a>

Represents a prompt group + node name node's description override.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.INodeDescription.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.INodeDescription.property.nodeName">nodeName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.INodeDescription.property.promptGroupId">promptGroupId</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.INodeDescription.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `nodeName`<sup>Required</sup> <a name="nodeName" id="xpander-sdk.INodeDescription.property.nodeName"></a>

```typescript
public readonly nodeName: string;
```

- *Type:* string

---

##### `promptGroupId`<sup>Required</sup> <a name="promptGroupId" id="xpander-sdk.INodeDescription.property.promptGroupId"></a>

```typescript
public readonly promptGroupId: string;
```

- *Type:* string

---

### INodeSchema <a name="INodeSchema" id="xpander-sdk.INodeSchema"></a>

- *Implemented By:* <a href="#xpander-sdk.INodeSchema">INodeSchema</a>

Represents the schema of a single node with defined input and output structures.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.INodeSchema.property.input">input</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.INodeSchema.property.nodeName">nodeName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.INodeSchema.property.output">output</a></code> | <code>any</code> | *No description.* |

---

##### `input`<sup>Required</sup> <a name="input" id="xpander-sdk.INodeSchema.property.input"></a>

```typescript
public readonly input: any;
```

- *Type:* any

---

##### `nodeName`<sup>Required</sup> <a name="nodeName" id="xpander-sdk.INodeSchema.property.nodeName"></a>

```typescript
public readonly nodeName: string;
```

- *Type:* string

---

##### `output`<sup>Required</sup> <a name="output" id="xpander-sdk.INodeSchema.property.output"></a>

```typescript
public readonly output: any;
```

- *Type:* any

---

### IOpenAIToolFunctionOutput <a name="IOpenAIToolFunctionOutput" id="xpander-sdk.IOpenAIToolFunctionOutput"></a>

- *Implemented By:* <a href="#xpander-sdk.IOpenAIToolFunctionOutput">IOpenAIToolFunctionOutput</a>

Output interface for an OpenAI tool function.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.description">description</a></code> | <code>string</code> | Description of the tool function's purpose. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.name">name</a></code> | <code>string</code> | The name of the tool function. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.execute">execute</a></code> | <code>any</code> | Secondary execution function for Bedrock compatibility. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.func">func</a></code> | <code>any</code> | Primary function to execute the tool. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.parameters">parameters</a></code> | <code><a href="#xpander-sdk.IToolParameter">IToolParameter</a></code> | Parameters required for the tool function. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.IOpenAIToolFunctionOutput.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the tool function's purpose.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IOpenAIToolFunctionOutput.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the tool function.

---

##### `execute`<sup>Optional</sup> <a name="execute" id="xpander-sdk.IOpenAIToolFunctionOutput.property.execute"></a>

```typescript
public readonly execute: any;
```

- *Type:* any

Secondary execution function for Bedrock compatibility.

---

##### `func`<sup>Optional</sup> <a name="func" id="xpander-sdk.IOpenAIToolFunctionOutput.property.func"></a>

```typescript
public readonly func: any;
```

- *Type:* any

Primary function to execute the tool.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.IOpenAIToolFunctionOutput.property.parameters"></a>

```typescript
public readonly parameters: IToolParameter;
```

- *Type:* <a href="#xpander-sdk.IToolParameter">IToolParameter</a>

Parameters required for the tool function.

---

### IOpenAIToolOutput <a name="IOpenAIToolOutput" id="xpander-sdk.IOpenAIToolOutput"></a>

- *Implemented By:* <a href="#xpander-sdk.IOpenAIToolOutput">IOpenAIToolOutput</a>

Output interface for an OpenAI tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IOpenAIToolOutput.property.function">function</a></code> | <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput">IOpenAIToolFunctionOutput</a></code> | Function specification for the OpenAI tool. |
| <code><a href="#xpander-sdk.IOpenAIToolOutput.property.type">type</a></code> | <code>string</code> | Type of the tool, typically 'function'. |

---

##### `function`<sup>Required</sup> <a name="function" id="xpander-sdk.IOpenAIToolOutput.property.function"></a>

```typescript
public readonly function: IOpenAIToolFunctionOutput;
```

- *Type:* <a href="#xpander-sdk.IOpenAIToolFunctionOutput">IOpenAIToolFunctionOutput</a>

Function specification for the OpenAI tool.

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IOpenAIToolOutput.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

Type of the tool, typically 'function'.

---

### IPGSchema <a name="IPGSchema" id="xpander-sdk.IPGSchema"></a>

- *Implemented By:* <a href="#xpander-sdk.IPGSchema">IPGSchema</a>

Represents a schema group for a prompt group session (PGSchema), containing multiple node schemas.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IPGSchema.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IPGSchema.property.schemas">schemas</a></code> | <code><a href="#xpander-sdk.INodeSchema">INodeSchema</a>[]</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.IPGSchema.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `schemas`<sup>Required</sup> <a name="schemas" id="xpander-sdk.IPGSchema.property.schemas"></a>

```typescript
public readonly schemas: INodeSchema[];
```

- *Type:* <a href="#xpander-sdk.INodeSchema">INodeSchema</a>[]

---

### ISourceNode <a name="ISourceNode" id="xpander-sdk.ISourceNode"></a>

- *Implemented By:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>

Interface representing a source node in the agent's graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ISourceNode.property.id">id</a></code> | <code>string</code> | Unique identifier for the source node. |
| <code><a href="#xpander-sdk.ISourceNode.property.metadata">metadata</a></code> | <code>any</code> | Metadata associated with the source node. |
| <code><a href="#xpander-sdk.ISourceNode.property.type">type</a></code> | <code><a href="#xpander-sdk.SourceNodeType">SourceNodeType</a></code> | Type of the source node (e.g., SDK, TASK). |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.ISourceNode.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Unique identifier for the source node.

---

##### `metadata`<sup>Required</sup> <a name="metadata" id="xpander-sdk.ISourceNode.property.metadata"></a>

```typescript
public readonly metadata: any;
```

- *Type:* any

Metadata associated with the source node.

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.ISourceNode.property.type"></a>

```typescript
public readonly type: SourceNodeType;
```

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

Type of the source node (e.g., SDK, TASK).

---

### ITool <a name="ITool" id="xpander-sdk.ITool"></a>

- *Implemented By:* <a href="#xpander-sdk.ITool">ITool</a>

Interface representing a general tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ITool.property.description">description</a></code> | <code>string</code> | A description of the tool's functionality. |
| <code><a href="#xpander-sdk.ITool.property.name">name</a></code> | <code>string</code> | The name of the tool. |
| <code><a href="#xpander-sdk.ITool.property.func">func</a></code> | <code>any</code> | Function to execute the tool's logic. |
| <code><a href="#xpander-sdk.ITool.property.parameters">parameters</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | Parameters required by the tool. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.ITool.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A description of the tool's functionality.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ITool.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the tool.

---

##### `func`<sup>Optional</sup> <a name="func" id="xpander-sdk.ITool.property.func"></a>

```typescript
public readonly func: any;
```

- *Type:* any

Function to execute the tool's logic.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.ITool.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

Parameters required by the tool.

---

### IToolCall <a name="IToolCall" id="xpander-sdk.IToolCall"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolCall">IToolCall</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolCall.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCall.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCall.property.payload">payload</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IToolCall.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.IToolCall.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `payload`<sup>Optional</sup> <a name="payload" id="xpander-sdk.IToolCall.property.payload"></a>

```typescript
public readonly payload: string;
```

- *Type:* string

---

### IToolCallPayload <a name="IToolCallPayload" id="xpander-sdk.IToolCallPayload"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolCallPayload">IToolCallPayload</a>

Interface representing the payload for a tool call.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolCallPayload.property.bodyParams">bodyParams</a></code> | <code>{[ key: string ]: any}</code> | Parameters for the request body. |
| <code><a href="#xpander-sdk.IToolCallPayload.property.headers">headers</a></code> | <code>{[ key: string ]: any}</code> | Headers for the tool call request. |
| <code><a href="#xpander-sdk.IToolCallPayload.property.pathParams">pathParams</a></code> | <code>{[ key: string ]: any}</code> | Parameters for the URL path. |
| <code><a href="#xpander-sdk.IToolCallPayload.property.queryParams">queryParams</a></code> | <code>{[ key: string ]: any}</code> | Parameters for the URL query string. |

---

##### `bodyParams`<sup>Required</sup> <a name="bodyParams" id="xpander-sdk.IToolCallPayload.property.bodyParams"></a>

```typescript
public readonly bodyParams: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Parameters for the request body.

---

##### `headers`<sup>Required</sup> <a name="headers" id="xpander-sdk.IToolCallPayload.property.headers"></a>

```typescript
public readonly headers: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Headers for the tool call request.

---

##### `pathParams`<sup>Required</sup> <a name="pathParams" id="xpander-sdk.IToolCallPayload.property.pathParams"></a>

```typescript
public readonly pathParams: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Parameters for the URL path.

---

##### `queryParams`<sup>Required</sup> <a name="queryParams" id="xpander-sdk.IToolCallPayload.property.queryParams"></a>

```typescript
public readonly queryParams: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Parameters for the URL query string.

---

### IToolExecutionResult <a name="IToolExecutionResult" id="xpander-sdk.IToolExecutionResult"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolExecutionResult">IToolExecutionResult</a>

Represents the result of a tool execution, including status, data, and success indicator.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolExecutionResult.property.data">data</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolExecutionResult.property.headers">headers</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolExecutionResult.property.isSuccess">isSuccess</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolExecutionResult.property.statusCode">statusCode</a></code> | <code>number</code> | *No description.* |

---

##### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.IToolExecutionResult.property.data"></a>

```typescript
public readonly data: any;
```

- *Type:* any

---

##### `headers`<sup>Required</sup> <a name="headers" id="xpander-sdk.IToolExecutionResult.property.headers"></a>

```typescript
public readonly headers: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `isSuccess`<sup>Required</sup> <a name="isSuccess" id="xpander-sdk.IToolExecutionResult.property.isSuccess"></a>

```typescript
public readonly isSuccess: boolean;
```

- *Type:* boolean

---

##### `statusCode`<sup>Required</sup> <a name="statusCode" id="xpander-sdk.IToolExecutionResult.property.statusCode"></a>

```typescript
public readonly statusCode: number;
```

- *Type:* number

---

### IToolInstructions <a name="IToolInstructions" id="xpander-sdk.IToolInstructions"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolInstructions">IToolInstructions</a>

Interface representing instructions for a tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolInstructions.property.functionDescription">functionDescription</a></code> | <code>string</code> | Description of the tool's function. |
| <code><a href="#xpander-sdk.IToolInstructions.property.id">id</a></code> | <code>string</code> | Identifier for the tool. |
| <code><a href="#xpander-sdk.IToolInstructions.property.parameters">parameters</a></code> | <code>any</code> | Parameters required by the tool. |

---

##### `functionDescription`<sup>Required</sup> <a name="functionDescription" id="xpander-sdk.IToolInstructions.property.functionDescription"></a>

```typescript
public readonly functionDescription: string;
```

- *Type:* string

Description of the tool's function.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.IToolInstructions.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Identifier for the tool.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.IToolInstructions.property.parameters"></a>

```typescript
public readonly parameters: any;
```

- *Type:* any

Parameters required by the tool.

---

### IToolParameter <a name="IToolParameter" id="xpander-sdk.IToolParameter"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolParameter">IToolParameter</a>

Interface representing a parameter for a tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolParameter.property.properties">properties</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | Properties of the parameter, if it is an object type. |
| <code><a href="#xpander-sdk.IToolParameter.property.type">type</a></code> | <code>string</code> | The type of the parameter (e.g., string, object). |
| <code><a href="#xpander-sdk.IToolParameter.property.required">required</a></code> | <code>string[]</code> | List of required properties within this parameter, if any. |

---

##### `properties`<sup>Required</sup> <a name="properties" id="xpander-sdk.IToolParameter.property.properties"></a>

```typescript
public readonly properties: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

Properties of the parameter, if it is an object type.

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IToolParameter.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The type of the parameter (e.g., string, object).

---

##### `required`<sup>Optional</sup> <a name="required" id="xpander-sdk.IToolParameter.property.required"></a>

```typescript
public readonly required: string[];
```

- *Type:* string[]

List of required properties within this parameter, if any.

---

## Enums <a name="Enums" id="Enums"></a>

### AgentAccessScope <a name="AgentAccessScope" id="xpander-sdk.AgentAccessScope"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentAccessScope.PERSONAL">PERSONAL</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentAccessScope.ORGANIZATIONAL">ORGANIZATIONAL</a></code> | *No description.* |

---

##### `PERSONAL` <a name="PERSONAL" id="xpander-sdk.AgentAccessScope.PERSONAL"></a>

---


##### `ORGANIZATIONAL` <a name="ORGANIZATIONAL" id="xpander-sdk.AgentAccessScope.ORGANIZATIONAL"></a>

---


### AgentDelegationEndStrategy <a name="AgentDelegationEndStrategy" id="xpander-sdk.AgentDelegationEndStrategy"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentDelegationEndStrategy.RETURN_TO_START">RETURN_TO_START</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentDelegationEndStrategy.FINISH_WITH_LAST">FINISH_WITH_LAST</a></code> | *No description.* |

---

##### `RETURN_TO_START` <a name="RETURN_TO_START" id="xpander-sdk.AgentDelegationEndStrategy.RETURN_TO_START"></a>

---


##### `FINISH_WITH_LAST` <a name="FINISH_WITH_LAST" id="xpander-sdk.AgentDelegationEndStrategy.FINISH_WITH_LAST"></a>

---


### AgentDelegationType <a name="AgentDelegationType" id="xpander-sdk.AgentDelegationType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentDelegationType.ROUTER">ROUTER</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentDelegationType.SEQUENCE">SEQUENCE</a></code> | *No description.* |

---

##### `ROUTER` <a name="ROUTER" id="xpander-sdk.AgentDelegationType.ROUTER"></a>

---


##### `SEQUENCE` <a name="SEQUENCE" id="xpander-sdk.AgentDelegationType.SEQUENCE"></a>

---


### AgentGraphItemSubType <a name="AgentGraphItemSubType" id="xpander-sdk.AgentGraphItemSubType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.SDK">SDK</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.TASK">TASK</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.ASSISTANT">ASSISTANT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.WEBHOOK">WEBHOOK</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.OPERATION">OPERATION</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.CUSTOM_FUNCTION">CUSTOM_FUNCTION</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemSubType.LOCAL_TOOL">LOCAL_TOOL</a></code> | *No description.* |

---

##### `SDK` <a name="SDK" id="xpander-sdk.AgentGraphItemSubType.SDK"></a>

---


##### `TASK` <a name="TASK" id="xpander-sdk.AgentGraphItemSubType.TASK"></a>

---


##### `ASSISTANT` <a name="ASSISTANT" id="xpander-sdk.AgentGraphItemSubType.ASSISTANT"></a>

---


##### `WEBHOOK` <a name="WEBHOOK" id="xpander-sdk.AgentGraphItemSubType.WEBHOOK"></a>

---


##### `OPERATION` <a name="OPERATION" id="xpander-sdk.AgentGraphItemSubType.OPERATION"></a>

---


##### `CUSTOM_FUNCTION` <a name="CUSTOM_FUNCTION" id="xpander-sdk.AgentGraphItemSubType.CUSTOM_FUNCTION"></a>

---


##### `LOCAL_TOOL` <a name="LOCAL_TOOL" id="xpander-sdk.AgentGraphItemSubType.LOCAL_TOOL"></a>

---


### AgentGraphItemType <a name="AgentGraphItemType" id="xpander-sdk.AgentGraphItemType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentGraphItemType.SOURCE_NODE">SOURCE_NODE</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.AGENT">AGENT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.TOOL">TOOL</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.HUMAN_IN_THE_LOOP">HUMAN_IN_THE_LOOP</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.STORAGE">STORAGE</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.CODING_AGENT">CODING_AGENT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.MCP">MCP</a></code> | *No description.* |

---

##### `SOURCE_NODE` <a name="SOURCE_NODE" id="xpander-sdk.AgentGraphItemType.SOURCE_NODE"></a>

---


##### `AGENT` <a name="AGENT" id="xpander-sdk.AgentGraphItemType.AGENT"></a>

---


##### `TOOL` <a name="TOOL" id="xpander-sdk.AgentGraphItemType.TOOL"></a>

---


##### `HUMAN_IN_THE_LOOP` <a name="HUMAN_IN_THE_LOOP" id="xpander-sdk.AgentGraphItemType.HUMAN_IN_THE_LOOP"></a>

---


##### `STORAGE` <a name="STORAGE" id="xpander-sdk.AgentGraphItemType.STORAGE"></a>

---


##### `CODING_AGENT` <a name="CODING_AGENT" id="xpander-sdk.AgentGraphItemType.CODING_AGENT"></a>

---


##### `MCP` <a name="MCP" id="xpander-sdk.AgentGraphItemType.MCP"></a>

---


### AgentStatus <a name="AgentStatus" id="xpander-sdk.AgentStatus"></a>

Enum representing the possible statuses of an agent.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentStatus.DRAFT">DRAFT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentStatus.ACTIVE">ACTIVE</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentStatus.INACTIVE">INACTIVE</a></code> | *No description.* |

---

##### `DRAFT` <a name="DRAFT" id="xpander-sdk.AgentStatus.DRAFT"></a>

---


##### `ACTIVE` <a name="ACTIVE" id="xpander-sdk.AgentStatus.ACTIVE"></a>

---


##### `INACTIVE` <a name="INACTIVE" id="xpander-sdk.AgentStatus.INACTIVE"></a>

---


### AgentType <a name="AgentType" id="xpander-sdk.AgentType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentType.REGULAR">REGULAR</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentType.MANAGER">MANAGER</a></code> | *No description.* |

---

##### `REGULAR` <a name="REGULAR" id="xpander-sdk.AgentType.REGULAR"></a>

---


##### `MANAGER` <a name="MANAGER" id="xpander-sdk.AgentType.MANAGER"></a>

---


### ExecutionStatus <a name="ExecutionStatus" id="xpander-sdk.ExecutionStatus"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ExecutionStatus.PENDING">PENDING</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionStatus.EXECUTING">EXECUTING</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionStatus.PAUSED">PAUSED</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionStatus.ERROR">ERROR</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ExecutionStatus.COMPLETED">COMPLETED</a></code> | *No description.* |

---

##### `PENDING` <a name="PENDING" id="xpander-sdk.ExecutionStatus.PENDING"></a>

---


##### `EXECUTING` <a name="EXECUTING" id="xpander-sdk.ExecutionStatus.EXECUTING"></a>

---


##### `PAUSED` <a name="PAUSED" id="xpander-sdk.ExecutionStatus.PAUSED"></a>

---


##### `ERROR` <a name="ERROR" id="xpander-sdk.ExecutionStatus.ERROR"></a>

---


##### `COMPLETED` <a name="COMPLETED" id="xpander-sdk.ExecutionStatus.COMPLETED"></a>

---


### KnowledgeBaseStrategy <a name="KnowledgeBaseStrategy" id="xpander-sdk.KnowledgeBaseStrategy"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.KnowledgeBaseStrategy.VANILLA">VANILLA</a></code> | *No description.* |
| <code><a href="#xpander-sdk.KnowledgeBaseStrategy.AGENTIC_RAG">AGENTIC_RAG</a></code> | *No description.* |

---

##### `VANILLA` <a name="VANILLA" id="xpander-sdk.KnowledgeBaseStrategy.VANILLA"></a>

---


##### `AGENTIC_RAG` <a name="AGENTIC_RAG" id="xpander-sdk.KnowledgeBaseStrategy.AGENTIC_RAG"></a>

---


### LLMProvider <a name="LLMProvider" id="xpander-sdk.LLMProvider"></a>

Enum representing different Large Language Model (LLM) providers.

This enum lists various LLM service providers integrated with xpanderAI, enabling
selection of the desired LLM provider for specific tasks.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMProvider.LANG_CHAIN">LANG_CHAIN</a></code> | Represents the 'langchain' provider. |
| <code><a href="#xpander-sdk.LLMProvider.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai' provider. |
| <code><a href="#xpander-sdk.LLMProvider.GEMINI_OPEN_AI">GEMINI_OPEN_AI</a></code> | Represents the 'gemini-openai' provider. |
| <code><a href="#xpander-sdk.LLMProvider.REAL_TIME_OPEN_AI">REAL_TIME_OPEN_AI</a></code> | Represents the 'openai' provider. |
| <code><a href="#xpander-sdk.LLMProvider.NVIDIA_NIM">NVIDIA_NIM</a></code> | Represents the 'nvidiaNim' provider. |
| <code><a href="#xpander-sdk.LLMProvider.AMAZON_BEDROCK">AMAZON_BEDROCK</a></code> | Represents the 'amazonBedrock' provider. |
| <code><a href="#xpander-sdk.LLMProvider.OLLAMA">OLLAMA</a></code> | Represents the 'ollama' provider. |
| <code><a href="#xpander-sdk.LLMProvider.FRIENDLI_AI">FRIENDLI_AI</a></code> | Represents the 'FriendliAI' provider. |

---

##### `LANG_CHAIN` <a name="LANG_CHAIN" id="xpander-sdk.LLMProvider.LANG_CHAIN"></a>

Represents the 'langchain' provider.

---


##### `OPEN_AI` <a name="OPEN_AI" id="xpander-sdk.LLMProvider.OPEN_AI"></a>

Represents the 'openai' provider.

---


##### `GEMINI_OPEN_AI` <a name="GEMINI_OPEN_AI" id="xpander-sdk.LLMProvider.GEMINI_OPEN_AI"></a>

Represents the 'gemini-openai' provider.

---


##### `REAL_TIME_OPEN_AI` <a name="REAL_TIME_OPEN_AI" id="xpander-sdk.LLMProvider.REAL_TIME_OPEN_AI"></a>

Represents the 'openai' provider.

---


##### `NVIDIA_NIM` <a name="NVIDIA_NIM" id="xpander-sdk.LLMProvider.NVIDIA_NIM"></a>

Represents the 'nvidiaNim' provider.

---


##### `AMAZON_BEDROCK` <a name="AMAZON_BEDROCK" id="xpander-sdk.LLMProvider.AMAZON_BEDROCK"></a>

Represents the 'amazonBedrock' provider.

---


##### `OLLAMA` <a name="OLLAMA" id="xpander-sdk.LLMProvider.OLLAMA"></a>

Represents the 'ollama' provider.

---


##### `FRIENDLI_AI` <a name="FRIENDLI_AI" id="xpander-sdk.LLMProvider.FRIENDLI_AI"></a>

Represents the 'FriendliAI' provider.

---


### MemoryStrategy <a name="MemoryStrategy" id="xpander-sdk.MemoryStrategy"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.MemoryStrategy.FULL">FULL</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryStrategy.SUMMARIZATION">SUMMARIZATION</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryStrategy.BUFFERING">BUFFERING</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryStrategy.MOVING_WINDOW">MOVING_WINDOW</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryStrategy.CONTEXT">CONTEXT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryStrategy.CLEAN_TOOL_CALLS">CLEAN_TOOL_CALLS</a></code> | *No description.* |

---

##### `FULL` <a name="FULL" id="xpander-sdk.MemoryStrategy.FULL"></a>

---


##### `SUMMARIZATION` <a name="SUMMARIZATION" id="xpander-sdk.MemoryStrategy.SUMMARIZATION"></a>

---


##### `BUFFERING` <a name="BUFFERING" id="xpander-sdk.MemoryStrategy.BUFFERING"></a>

---


##### `MOVING_WINDOW` <a name="MOVING_WINDOW" id="xpander-sdk.MemoryStrategy.MOVING_WINDOW"></a>

---


##### `CONTEXT` <a name="CONTEXT" id="xpander-sdk.MemoryStrategy.CONTEXT"></a>

---


##### `CLEAN_TOOL_CALLS` <a name="CLEAN_TOOL_CALLS" id="xpander-sdk.MemoryStrategy.CLEAN_TOOL_CALLS"></a>

---


### MemoryType <a name="MemoryType" id="xpander-sdk.MemoryType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.MemoryType.LONG_TERM">LONG_TERM</a></code> | *No description.* |
| <code><a href="#xpander-sdk.MemoryType.SHORT_TERM">SHORT_TERM</a></code> | *No description.* |

---

##### `LONG_TERM` <a name="LONG_TERM" id="xpander-sdk.MemoryType.LONG_TERM"></a>

---


##### `SHORT_TERM` <a name="SHORT_TERM" id="xpander-sdk.MemoryType.SHORT_TERM"></a>

---


### SourceNodeType <a name="SourceNodeType" id="xpander-sdk.SourceNodeType"></a>

Enum representing different source node types for agents.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.SourceNodeType.SDK">SDK</a></code> | *No description.* |
| <code><a href="#xpander-sdk.SourceNodeType.TASK">TASK</a></code> | *No description.* |
| <code><a href="#xpander-sdk.SourceNodeType.ASSISTANT">ASSISTANT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.SourceNodeType.WEBHOOK">WEBHOOK</a></code> | *No description.* |

---

##### `SDK` <a name="SDK" id="xpander-sdk.SourceNodeType.SDK"></a>

---


##### `TASK` <a name="TASK" id="xpander-sdk.SourceNodeType.TASK"></a>

---


##### `ASSISTANT` <a name="ASSISTANT" id="xpander-sdk.SourceNodeType.ASSISTANT"></a>

---


##### `WEBHOOK` <a name="WEBHOOK" id="xpander-sdk.SourceNodeType.WEBHOOK"></a>

---


### ToolCallType <a name="ToolCallType" id="xpander-sdk.ToolCallType"></a>

Enum representing types of tool calls.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolCallType.XPANDER">XPANDER</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCallType.LOCAL">LOCAL</a></code> | *No description.* |

---

##### `XPANDER` <a name="XPANDER" id="xpander-sdk.ToolCallType.XPANDER"></a>

---


##### `LOCAL` <a name="LOCAL" id="xpander-sdk.ToolCallType.LOCAL"></a>

---

