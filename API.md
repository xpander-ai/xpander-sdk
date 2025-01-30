# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### Agent <a name="Agent" id="xpander-sdk.Agent"></a>

Represents an agent in xpanderAI, managing tools, sessions, and operational workflows.

This class facilitates loading agents, handling tool executions, and managing prompt groups.

#### Initializers <a name="Initializers" id="xpander-sdk.Agent.Initializer"></a>

```typescript
import { Agent } from 'xpander-sdk'

new Agent(configuration: Configuration, id: string, name: string, organizationId: string, status: AgentStatus, memoryType: MemoryType, memoryStrategy: MemoryStrategy, instructions: IAgentInstructions, accessScope: AgentAccessScope, sourceNodes: ISourceNode[], prompts: string[], tools?: IAgentTool[], graph?: IAgentGraphItem[], knowledgeBases?: KnowledgeBase[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.id">id</a></code> | <code>string</code> | - Unique identifier for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.name">name</a></code> | <code>string</code> | - Human-readable name of the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | - Organization ID to which the agent belongs. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | - Current status of the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | - Type of memory the agent utilizes. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.memoryStrategy">memoryStrategy</a></code> | <code><a href="#xpander-sdk.MemoryStrategy">MemoryStrategy</a></code> | - Strategy for memory management. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.instructions">instructions</a></code> | <code><a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a></code> | - Instructions for the agent's operation. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.accessScope">accessScope</a></code> | <code><a href="#xpander-sdk.AgentAccessScope">AgentAccessScope</a></code> | - Scope of the agent's access permissions. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | - Source nodes associated with the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.prompts">prompts</a></code> | <code>string[]</code> | - Prompts used by the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | - Tools available to the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.graph">graph</a></code> | <code><a href="#xpander-sdk.IAgentGraphItem">IAgentGraphItem</a>[]</code> | - Graph structure representing the agent's operational flow. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.knowledgeBases">knowledgeBases</a></code> | <code><a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]</code> | - Knowledge bases associated with the agent. |

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

##### `graph`<sup>Optional</sup> <a name="graph" id="xpander-sdk.Agent.Initializer.parameter.graph"></a>

- *Type:* <a href="#xpander-sdk.IAgentGraphItem">IAgentGraphItem</a>[]

Graph structure representing the agent's operational flow.

---

##### `knowledgeBases`<sup>Optional</sup> <a name="knowledgeBases" id="xpander-sdk.Agent.Initializer.parameter.knowledgeBases"></a>

- *Type:* <a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]

Knowledge bases associated with the agent.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agent.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.addLocalTools">addLocalTools</a></code> | Adds local tools to the agent with prefixed function names. |
| <code><a href="#xpander-sdk.Agent.addTask">addTask</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.disableAgentEndTool">disableAgentEndTool</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.getTools">getTools</a></code> | Retrieves tools compatible with a specified LLM provider. |
| <code><a href="#xpander-sdk.Agent.initTask">initTask</a></code> | Initializes the task execution for the agent. |
| <code><a href="#xpander-sdk.Agent.isFinished">isFinished</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.load">load</a></code> | Loads the agent data from its source node type. |
| <code><a href="#xpander-sdk.Agent.retrieveExecutionResult">retrieveExecutionResult</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.retrieveNodeFromGraph">retrieveNodeFromGraph</a></code> | Retrieves a node from the graph by its ID. |
| <code><a href="#xpander-sdk.Agent.runTool">runTool</a></code> | Executes a single tool call and returns the result. |
| <code><a href="#xpander-sdk.Agent.runTools">runTools</a></code> | Executes multiple tool calls sequentially and returns their results. |
| <code><a href="#xpander-sdk.Agent.stop">stop</a></code> | *No description.* |
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

##### `disableAgentEndTool` <a name="disableAgentEndTool" id="xpander-sdk.Agent.disableAgentEndTool"></a>

```typescript
public disableAgentEndTool(): void
```

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
public load(agentId?: string): void
```

Loads the agent data from its source node type.

###### `agentId`<sup>Optional</sup> <a name="agentId" id="xpander-sdk.Agent.load.parameter.agentId"></a>

- *Type:* string

---

##### `retrieveExecutionResult` <a name="retrieveExecutionResult" id="xpander-sdk.Agent.retrieveExecutionResult"></a>

```typescript
public retrieveExecutionResult(): Execution
```

##### `retrieveNodeFromGraph` <a name="retrieveNodeFromGraph" id="xpander-sdk.Agent.retrieveNodeFromGraph"></a>

```typescript
public retrieveNodeFromGraph(itemId: string): IAgentGraphItem
```

Retrieves a node from the graph by its ID.

###### `itemId`<sup>Required</sup> <a name="itemId" id="xpander-sdk.Agent.retrieveNodeFromGraph.parameter.itemId"></a>

- *Type:* string

The ID of the graph node to retrieve.

---

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

##### `stop` <a name="stop" id="xpander-sdk.Agent.stop"></a>

```typescript
public stop(): void
```

##### `updateUserDetails` <a name="updateUserDetails" id="xpander-sdk.Agent.updateUserDetails"></a>

```typescript
public updateUserDetails(userDetails: any): void
```

Updates the user details for the agent.

###### `userDetails`<sup>Required</sup> <a name="userDetails" id="xpander-sdk.Agent.updateUserDetails.parameter.userDetails"></a>

- *Type:* any

The user details to update.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agent.fromObject">fromObject</a></code> | *No description.* |

---

##### `fromObject` <a name="fromObject" id="xpander-sdk.Agent.fromObject"></a>

```typescript
import { Agent } from 'xpander-sdk'

Agent.fromObject(data: any)
```

###### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.Agent.fromObject.parameter.data"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.property.hasLocalTools">hasLocalTools</a></code> | <code>boolean</code> | Checks if the agent has local tools loaded. |
| <code><a href="#xpander-sdk.Agent.property.memory">memory</a></code> | <code><a href="#xpander-sdk.Memory">Memory</a></code> | Retrieves the memory instance for the agent. |
| <code><a href="#xpander-sdk.Agent.property.sourceNodeType">sourceNodeType</a></code> | <code><a href="#xpander-sdk.SourceNodeType">SourceNodeType</a></code> | Retrieves the type of source node for the agent. |
| <code><a href="#xpander-sdk.Agent.property.url">url</a></code> | <code>string</code> | Constructs the API URL for this agent. |
| <code><a href="#xpander-sdk.Agent.property.vanillaKnowledgeBases">vanillaKnowledgeBases</a></code> | <code><a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]</code> | Retrieves the vanilla knowledge bases of the agent. |
| <code><a href="#xpander-sdk.Agent.property.accessScope">accessScope</a></code> | <code><a href="#xpander-sdk.AgentAccessScope">AgentAccessScope</a></code> | - Scope of the agent's access permissions. |
| <code><a href="#xpander-sdk.Agent.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for the agent. |
| <code><a href="#xpander-sdk.Agent.property.graph">graph</a></code> | <code><a href="#xpander-sdk.IAgentGraphItem">IAgentGraphItem</a>[]</code> | - Graph structure representing the agent's operational flow. |
| <code><a href="#xpander-sdk.Agent.property.id">id</a></code> | <code>string</code> | - Unique identifier for the agent. |
| <code><a href="#xpander-sdk.Agent.property.instructions">instructions</a></code> | <code><a href="#xpander-sdk.IAgentInstructions">IAgentInstructions</a></code> | - Instructions for the agent's operation. |
| <code><a href="#xpander-sdk.Agent.property.knowledgeBases">knowledgeBases</a></code> | <code><a href="#xpander-sdk.KnowledgeBase">KnowledgeBase</a>[]</code> | - Knowledge bases associated with the agent. |
| <code><a href="#xpander-sdk.Agent.property.localTools">localTools</a></code> | <code><a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]</code> | Collection of local tools specific to this agent. |
| <code><a href="#xpander-sdk.Agent.property.memoryStrategy">memoryStrategy</a></code> | <code><a href="#xpander-sdk.MemoryStrategy">MemoryStrategy</a></code> | - Strategy for memory management. |
| <code><a href="#xpander-sdk.Agent.property.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | - Type of memory the agent utilizes. |
| <code><a href="#xpander-sdk.Agent.property.name">name</a></code> | <code>string</code> | - Human-readable name of the agent. |
| <code><a href="#xpander-sdk.Agent.property.organizationId">organizationId</a></code> | <code>string</code> | - Organization ID to which the agent belongs. |
| <code><a href="#xpander-sdk.Agent.property.prompts">prompts</a></code> | <code>string[]</code> | - Prompts used by the agent. |
| <code><a href="#xpander-sdk.Agent.property.ready">ready</a></code> | <code>boolean</code> | Indicates if the agent is ready and tools are loaded. |
| <code><a href="#xpander-sdk.Agent.property.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | - Source nodes associated with the agent. |
| <code><a href="#xpander-sdk.Agent.property.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | - Current status of the agent. |
| <code><a href="#xpander-sdk.Agent.property.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | - Tools available to the agent. |
| <code><a href="#xpander-sdk.Agent.property.execution">execution</a></code> | <code><a href="#xpander-sdk.Execution">Execution</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.executionMemory">executionMemory</a></code> | <code><a href="#xpander-sdk.Memory">Memory</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.userDetails">userDetails</a></code> | <code><a href="#xpander-sdk.IUserDetails">IUserDetails</a></code> | *No description.* |

---

##### `hasLocalTools`<sup>Required</sup> <a name="hasLocalTools" id="xpander-sdk.Agent.property.hasLocalTools"></a>

```typescript
public readonly hasLocalTools: boolean;
```

- *Type:* boolean

Checks if the agent has local tools loaded.

---

##### `memory`<sup>Required</sup> <a name="memory" id="xpander-sdk.Agent.property.memory"></a>

```typescript
public readonly memory: Memory;
```

- *Type:* <a href="#xpander-sdk.Memory">Memory</a>

Retrieves the memory instance for the agent.

---

##### `sourceNodeType`<sup>Required</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.property.sourceNodeType"></a>

```typescript
public readonly sourceNodeType: SourceNodeType;
```

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

Retrieves the type of source node for the agent.

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

##### `graph`<sup>Required</sup> <a name="graph" id="xpander-sdk.Agent.property.graph"></a>

```typescript
public readonly graph: IAgentGraphItem[];
```

- *Type:* <a href="#xpander-sdk.IAgentGraphItem">IAgentGraphItem</a>[]

Graph structure representing the agent's operational flow.

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
public readonly userDetails: IUserDetails;
```

- *Type:* <a href="#xpander-sdk.IUserDetails">IUserDetails</a>

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
| <code><a href="#xpander-sdk.Agents.get">get</a></code> | Retrieves a specific agent by its ID and initializes it. |
| <code><a href="#xpander-sdk.Agents.list">list</a></code> | Retrieves the list of agents from the API and populates the local agents list. |

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
public list(): Agent[]
```

Retrieves the list of agents from the API and populates the local agents list.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agents.property.agentsList">agentsList</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a>[]</code> | Collection of Agent instances managed by this class. |
| <code><a href="#xpander-sdk.Agents.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | - Configuration settings for managing agents. |

---

##### `agentsList`<sup>Required</sup> <a name="agentsList" id="xpander-sdk.Agents.property.agentsList"></a>

```typescript
public readonly agentsList: Agent[];
```

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>[]

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
| <code><a href="#xpander-sdk.Configuration.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | Flag to enable or disable metrics reporting. |
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

##### `withMetricsReport`<sup>Required</sup> <a name="withMetricsReport" id="xpander-sdk.Configuration.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

Flag to enable or disable metrics reporting.

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

Execution.create(agent: Agent, input: string, files: string[], workerId?: string, threadId?: string)
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

new Memory(agent: Agent, id: string, messages: IMemoryMessage[], userDetails: string, memoryType: MemoryType)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.agent">agent</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.messages">messages</a></code> | <code><a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.userDetails">userDetails</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.Initializer.parameter.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | *No description.* |

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
public initMessages(input: IMemoryMessage, instructions: IAgentInstructions, llmProvider?: LLMProvider): void
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

##### `retrieveMessages` <a name="retrieveMessages" id="xpander-sdk.Memory.retrieveMessages"></a>

```typescript
public retrieveMessages(): any[]
```

Retrieves the messages stored in the memory thread.

Applies the agent's memory strategy to refresh the messages if needed.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Memory.fromObject">fromObject</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.create">create</a></code> | Creates a new memory thread for the specified agent. |
| <code><a href="#xpander-sdk.Memory.fetch">fetch</a></code> | Fetches an existing memory thread by its ID. |

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

Memory.create(agent: Agent, userDetails?: IUserDetails)
```

Creates a new memory thread for the specified agent.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.create.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

The agent for which the memory thread is created.

---

###### `userDetails`<sup>Optional</sup> <a name="userDetails" id="xpander-sdk.Memory.create.parameter.userDetails"></a>

- *Type:* <a href="#xpander-sdk.IUserDetails">IUserDetails</a>

Optional user details associated with the memory thread.

---

##### `fetch` <a name="fetch" id="xpander-sdk.Memory.fetch"></a>

```typescript
import { Memory } from 'xpander-sdk'

Memory.fetch(agent: Agent, threadId: string)
```

Fetches an existing memory thread by its ID.

###### `agent`<sup>Required</sup> <a name="agent" id="xpander-sdk.Memory.fetch.parameter.agent"></a>

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>

The agent associated with the memory thread.

---

###### `threadId`<sup>Required</sup> <a name="threadId" id="xpander-sdk.Memory.fetch.parameter.threadId"></a>

- *Type:* string

The ID of the memory thread to fetch.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Memory.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.llmProvider">llmProvider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | The LLM provider to be used for message processing. |
| <code><a href="#xpander-sdk.Memory.property.memoryType">memoryType</a></code> | <code><a href="#xpander-sdk.MemoryType">MemoryType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.messages">messages</a></code> | <code><a href="#xpander-sdk.IMemoryMessage">IMemoryMessage</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Memory.property.userDetails">userDetails</a></code> | <code>string</code> | *No description.* |

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

##### `userDetails`<sup>Required</sup> <a name="userDetails" id="xpander-sdk.Memory.property.userDetails"></a>

```typescript
public readonly userDetails: string;
```

- *Type:* string

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

#### Initializers <a name="Initializers" id="xpander-sdk.ToolCall.Initializer"></a>

```typescript
import { ToolCall } from 'xpander-sdk'

new ToolCall(name?: string, type?: ToolCallType, payload?: any, toolCallId?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |

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
| <code><a href="#xpander-sdk.ToolCall.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |

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

#### Initializers <a name="Initializers" id="xpander-sdk.ToolCallResult.Initializer"></a>

```typescript
import { ToolCallResult } from 'xpander-sdk'

new ToolCallResult(functionName?: string, toolCallId?: string, payload?: any, statusCode?: number, result?: any, isSuccess?: boolean, isError?: boolean)
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
| <code><a href="#xpander-sdk.ToolCallResult.property.isError">isError</a></code> | <code>boolean</code> | *No description.* |
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

##### `isError`<sup>Required</sup> <a name="isError" id="xpander-sdk.ToolCallResult.property.isError"></a>

```typescript
public readonly isError: boolean;
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


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

XpanderClient provides methods for configuring and interacting with xpanderAI tools, managing agents, and extracting tool calls from LLM responses.

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

new XpanderClient(apiKey: string, baseUrl?: any, withMetricsReport?: boolean, organizationId?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.baseUrl">baseUrl</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.XpanderClient.Initializer.parameter.apiKey"></a>

- *Type:* string

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.baseUrl"></a>

- *Type:* any

---

##### `withMetricsReport`<sup>Optional</sup> <a name="withMetricsReport" id="xpander-sdk.XpanderClient.Initializer.parameter.withMetricsReport"></a>

- *Type:* boolean

---

##### `organizationId`<sup>Optional</sup> <a name="organizationId" id="xpander-sdk.XpanderClient.Initializer.parameter.organizationId"></a>

- *Type:* string

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.extractToolCalls">extractToolCalls</a></code> | Extracts tool calls from an LLM response based on the specified LLM provider. |

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

### IAgentGraphItem <a name="IAgentGraphItem" id="xpander-sdk.IAgentGraphItem"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentGraphItem">IAgentGraphItem</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.itemId">itemId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.targets">targets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.type">type</a></code> | <code><a href="#xpander-sdk.AgentGraphItemType">AgentGraphItemType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.settings">settings</a></code> | <code><a href="#xpander-sdk.IAgentGraphItemSettings">IAgentGraphItemSettings</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentGraphItem.property.subType">subType</a></code> | <code><a href="#xpander-sdk.AgentGraphItemSubType">AgentGraphItemSubType</a></code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.IAgentGraphItem.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `itemId`<sup>Required</sup> <a name="itemId" id="xpander-sdk.IAgentGraphItem.property.itemId"></a>

```typescript
public readonly itemId: string;
```

- *Type:* string

---

##### `targets`<sup>Required</sup> <a name="targets" id="xpander-sdk.IAgentGraphItem.property.targets"></a>

```typescript
public readonly targets: string[];
```

- *Type:* string[]

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IAgentGraphItem.property.type"></a>

```typescript
public readonly type: AgentGraphItemType;
```

- *Type:* <a href="#xpander-sdk.AgentGraphItemType">AgentGraphItemType</a>

---

##### `name`<sup>Optional</sup> <a name="name" id="xpander-sdk.IAgentGraphItem.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `settings`<sup>Optional</sup> <a name="settings" id="xpander-sdk.IAgentGraphItem.property.settings"></a>

```typescript
public readonly settings: IAgentGraphItemSettings;
```

- *Type:* <a href="#xpander-sdk.IAgentGraphItemSettings">IAgentGraphItemSettings</a>

---

##### `subType`<sup>Optional</sup> <a name="subType" id="xpander-sdk.IAgentGraphItem.property.subType"></a>

```typescript
public readonly subType: AgentGraphItemSubType;
```

- *Type:* <a href="#xpander-sdk.AgentGraphItemSubType">AgentGraphItemSubType</a>

---

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
| <code><a href="#xpander-sdk.IConfiguration.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | Optional flag to enable metrics reporting. |

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

##### `withMetricsReport`<sup>Optional</sup> <a name="withMetricsReport" id="xpander-sdk.IConfiguration.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

Optional flag to enable metrics reporting.

---

### IExecutionInput <a name="IExecutionInput" id="xpander-sdk.IExecutionInput"></a>

- *Implemented By:* <a href="#xpander-sdk.IExecutionInput">IExecutionInput</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IExecutionInput.property.user">user</a></code> | <code><a href="#xpander-sdk.IUserDetails">IUserDetails</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IExecutionInput.property.files">files</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IExecutionInput.property.text">text</a></code> | <code>string</code> | *No description.* |

---

##### `user`<sup>Required</sup> <a name="user" id="xpander-sdk.IExecutionInput.property.user"></a>

```typescript
public readonly user: IUserDetails;
```

- *Type:* <a href="#xpander-sdk.IUserDetails">IUserDetails</a>

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

### IGraphItem <a name="IGraphItem" id="xpander-sdk.IGraphItem"></a>

- *Implemented By:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>

Interface representing an item in an agent's graph, containing the structure of connected nodes, prompt details, and associated group information.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IGraphItem.property.enrichedPrompts">enrichedPrompts</a></code> | <code>string[]</code> | Array of enriched prompts, providing additional context or formatting. |
| <code><a href="#xpander-sdk.IGraphItem.property.graph">graph</a></code> | <code>{[ key: string ]: string[]}</code> | Representation of the graph structure with nodes and their connections. |
| <code><a href="#xpander-sdk.IGraphItem.property.promptGroupId">promptGroupId</a></code> | <code>string</code> | Unique identifier for the prompt group associated with this graph item. |
| <code><a href="#xpander-sdk.IGraphItem.property.prompts">prompts</a></code> | <code>string[]</code> | Array of prompt texts associated with the graph item. |
| <code><a href="#xpander-sdk.IGraphItem.property.startingNode">startingNode</a></code> | <code>string</code> | Identifier for the starting node in the graph. |
| <code><a href="#xpander-sdk.IGraphItem.property.operationNodesInstructions">operationNodesInstructions</a></code> | <code><a href="#xpander-sdk.IOperationNodeInstructions">IOperationNodeInstructions</a>[]</code> | *No description.* |

---

##### `enrichedPrompts`<sup>Required</sup> <a name="enrichedPrompts" id="xpander-sdk.IGraphItem.property.enrichedPrompts"></a>

```typescript
public readonly enrichedPrompts: string[];
```

- *Type:* string[]

Array of enriched prompts, providing additional context or formatting.

---

##### `graph`<sup>Required</sup> <a name="graph" id="xpander-sdk.IGraphItem.property.graph"></a>

```typescript
public readonly graph: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Representation of the graph structure with nodes and their connections.

---

##### `promptGroupId`<sup>Required</sup> <a name="promptGroupId" id="xpander-sdk.IGraphItem.property.promptGroupId"></a>

```typescript
public readonly promptGroupId: string;
```

- *Type:* string

Unique identifier for the prompt group associated with this graph item.

---

##### `prompts`<sup>Required</sup> <a name="prompts" id="xpander-sdk.IGraphItem.property.prompts"></a>

```typescript
public readonly prompts: string[];
```

- *Type:* string[]

Array of prompt texts associated with the graph item.

---

##### `startingNode`<sup>Required</sup> <a name="startingNode" id="xpander-sdk.IGraphItem.property.startingNode"></a>

```typescript
public readonly startingNode: string;
```

- *Type:* string

Identifier for the starting node in the graph.

---

##### `operationNodesInstructions`<sup>Optional</sup> <a name="operationNodesInstructions" id="xpander-sdk.IGraphItem.property.operationNodesInstructions"></a>

```typescript
public readonly operationNodesInstructions: IOperationNodeInstructions[];
```

- *Type:* <a href="#xpander-sdk.IOperationNodeInstructions">IOperationNodeInstructions</a>[]

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

### IOperationNodeInstructions <a name="IOperationNodeInstructions" id="xpander-sdk.IOperationNodeInstructions"></a>

- *Implemented By:* <a href="#xpander-sdk.IOperationNodeInstructions">IOperationNodeInstructions</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IOperationNodeInstructions.property.instructions">instructions</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IOperationNodeInstructions.property.nodeIndexInGraph">nodeIndexInGraph</a></code> | <code>number</code> | *No description.* |
| <code><a href="#xpander-sdk.IOperationNodeInstructions.property.nodeName">nodeName</a></code> | <code>string</code> | *No description.* |

---

##### `instructions`<sup>Required</sup> <a name="instructions" id="xpander-sdk.IOperationNodeInstructions.property.instructions"></a>

```typescript
public readonly instructions: string;
```

- *Type:* string

---

##### `nodeIndexInGraph`<sup>Required</sup> <a name="nodeIndexInGraph" id="xpander-sdk.IOperationNodeInstructions.property.nodeIndexInGraph"></a>

```typescript
public readonly nodeIndexInGraph: number;
```

- *Type:* number

---

##### `nodeName`<sup>Required</sup> <a name="nodeName" id="xpander-sdk.IOperationNodeInstructions.property.nodeName"></a>

```typescript
public readonly nodeName: string;
```

- *Type:* string

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

### IUserDetails <a name="IUserDetails" id="xpander-sdk.IUserDetails"></a>

- *Implemented By:* <a href="#xpander-sdk.IUserDetails">IUserDetails</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IUserDetails.property.additionalAttributes">additionalAttributes</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IUserDetails.property.email">email</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IUserDetails.property.firstName">firstName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IUserDetails.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IUserDetails.property.lastName">lastName</a></code> | <code>string</code> | *No description.* |

---

##### `additionalAttributes`<sup>Optional</sup> <a name="additionalAttributes" id="xpander-sdk.IUserDetails.property.additionalAttributes"></a>

```typescript
public readonly additionalAttributes: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `email`<sup>Optional</sup> <a name="email" id="xpander-sdk.IUserDetails.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

---

##### `firstName`<sup>Optional</sup> <a name="firstName" id="xpander-sdk.IUserDetails.property.firstName"></a>

```typescript
public readonly firstName: string;
```

- *Type:* string

---

##### `id`<sup>Optional</sup> <a name="id" id="xpander-sdk.IUserDetails.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `lastName`<sup>Optional</sup> <a name="lastName" id="xpander-sdk.IUserDetails.property.lastName"></a>

```typescript
public readonly lastName: string;
```

- *Type:* string

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


### AgentGraphItemType <a name="AgentGraphItemType" id="xpander-sdk.AgentGraphItemType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.AgentGraphItemType.SOURCE_NODE">SOURCE_NODE</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.AGENT">AGENT</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.TOOL">TOOL</a></code> | *No description.* |
| <code><a href="#xpander-sdk.AgentGraphItemType.HUMAN_IN_THE_LOOP">HUMAN_IN_THE_LOOP</a></code> | *No description.* |

---

##### `SOURCE_NODE` <a name="SOURCE_NODE" id="xpander-sdk.AgentGraphItemType.SOURCE_NODE"></a>

---


##### `AGENT` <a name="AGENT" id="xpander-sdk.AgentGraphItemType.AGENT"></a>

---


##### `TOOL` <a name="TOOL" id="xpander-sdk.AgentGraphItemType.TOOL"></a>

---


##### `HUMAN_IN_THE_LOOP` <a name="HUMAN_IN_THE_LOOP" id="xpander-sdk.AgentGraphItemType.HUMAN_IN_THE_LOOP"></a>

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

