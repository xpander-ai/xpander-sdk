# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### Agent <a name="Agent" id="xpander-sdk.Agent"></a>

Represents an agent in xpanderAI, managing the tools, sessions, and operations associated with the agent.

This class enables loading agents, handling tool executions,
and managing prompt group sessions.

#### Initializers <a name="Initializers" id="xpander-sdk.Agent.Initializer"></a>

```typescript
import { Agent } from 'xpander-sdk'

new Agent(configuration: Configuration, id: string, organizationId: string, status: AgentStatus, name: string, sourceNodes: ISourceNode[], pgSwitchAllowed?: boolean, tools?: IAgentTool[], graphs?: IGraphItem[], pgOas?: IAgentTool[], autoLoad?: boolean, pgSchemas?: IPGSchema[], pgNodeDescriptionOverride?: INodeDescription[], generalInstructions?: string, judgeInstructions?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | Configuration settings for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.id">id</a></code> | <code>string</code> | Unique identifier for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | Organization ID to which the agent belongs. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | Current status of the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.name">name</a></code> | <code>string</code> | Human-readable name of the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | List of source nodes associated with the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.pgSwitchAllowed">pgSwitchAllowed</a></code> | <code>boolean</code> | Whether prompt group switching is allowed for the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | Array of tools available to the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.graphs">graphs</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]</code> | Array of graph items related to the agent. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.autoLoad">autoLoad</a></code> | <code>boolean</code> | Whether the agent should automatically load its resources. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.pgSchemas">pgSchemas</a></code> | <code><a href="#xpander-sdk.IPGSchema">IPGSchema</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.pgNodeDescriptionOverride">pgNodeDescriptionOverride</a></code> | <code><a href="#xpander-sdk.INodeDescription">INodeDescription</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.generalInstructions">generalInstructions</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.judgeInstructions">judgeInstructions</a></code> | <code>string</code> | *No description.* |

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.Initializer.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for the agent.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Agent.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier for the agent.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Agent.Initializer.parameter.organizationId"></a>

- *Type:* string

Organization ID to which the agent belongs.

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Agent.Initializer.parameter.status"></a>

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

Current status of the agent.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Agent.Initializer.parameter.name"></a>

- *Type:* string

Human-readable name of the agent.

---

##### `sourceNodes`<sup>Required</sup> <a name="sourceNodes" id="xpander-sdk.Agent.Initializer.parameter.sourceNodes"></a>

- *Type:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]

List of source nodes associated with the agent.

---

##### `pgSwitchAllowed`<sup>Optional</sup> <a name="pgSwitchAllowed" id="xpander-sdk.Agent.Initializer.parameter.pgSwitchAllowed"></a>

- *Type:* boolean

Whether prompt group switching is allowed for the agent.

---

##### `tools`<sup>Optional</sup> <a name="tools" id="xpander-sdk.Agent.Initializer.parameter.tools"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Array of tools available to the agent.

---

##### `graphs`<sup>Optional</sup> <a name="graphs" id="xpander-sdk.Agent.Initializer.parameter.graphs"></a>

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]

Array of graph items related to the agent.

---

##### `pgOas`<sup>Optional</sup> <a name="pgOas" id="xpander-sdk.Agent.Initializer.parameter.pgOas"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Array of agent tools specific to prompt groups.

---

##### `autoLoad`<sup>Optional</sup> <a name="autoLoad" id="xpander-sdk.Agent.Initializer.parameter.autoLoad"></a>

- *Type:* boolean

Whether the agent should automatically load its resources.

---

##### `pgSchemas`<sup>Optional</sup> <a name="pgSchemas" id="xpander-sdk.Agent.Initializer.parameter.pgSchemas"></a>

- *Type:* <a href="#xpander-sdk.IPGSchema">IPGSchema</a>[]

Array of agent tools specific to prompt groups.

---

##### `pgNodeDescriptionOverride`<sup>Optional</sup> <a name="pgNodeDescriptionOverride" id="xpander-sdk.Agent.Initializer.parameter.pgNodeDescriptionOverride"></a>

- *Type:* <a href="#xpander-sdk.INodeDescription">INodeDescription</a>[]

Array of agent tools specific to prompt groups.

---

##### `generalInstructions`<sup>Optional</sup> <a name="generalInstructions" id="xpander-sdk.Agent.Initializer.parameter.generalInstructions"></a>

- *Type:* string

---

##### `judgeInstructions`<sup>Optional</sup> <a name="judgeInstructions" id="xpander-sdk.Agent.Initializer.parameter.judgeInstructions"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agent.from">from</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.toDict">toDict</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.toJson">toJson</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.addLocalTools">addLocalTools</a></code> | Adds local tools to the agent with prefixed function names. |
| <code><a href="#xpander-sdk.Agent.disableOversizedResponseFunctionality">disableOversizedResponseFunctionality</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.getTools">getTools</a></code> | Retrieves tools compatible with the specified LLM provider. |
| <code><a href="#xpander-sdk.Agent.load">load</a></code> | Loads the agent data from the specified source node type. |
| <code><a href="#xpander-sdk.Agent.modifyOversizedResponseCache">modifyOversizedResponseCache</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.retrieveAllGraphTools">retrieveAllGraphTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.retrieveOversizedResponseCache">retrieveOversizedResponseCache</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.runTool">runTool</a></code> | Executes a single tool call and returns the result. |
| <code><a href="#xpander-sdk.Agent.runTools">runTools</a></code> | Executes multiple tool calls sequentially and returns their results. |
| <code><a href="#xpander-sdk.Agent.schemasByNodeName">schemasByNodeName</a></code> | Retrieves schemas grouped by node name based on the active prompt group session. |
| <code><a href="#xpander-sdk.Agent.selectPromptGroup">selectPromptGroup</a></code> | *No description.* |

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

##### `disableOversizedResponseFunctionality` <a name="disableOversizedResponseFunctionality" id="xpander-sdk.Agent.disableOversizedResponseFunctionality"></a>

```typescript
public disableOversizedResponseFunctionality(): void
```

##### `getTools` <a name="getTools" id="xpander-sdk.Agent.getTools"></a>

```typescript
public getTools(llmProvider?: LLMProvider, returnAllTools?: boolean): any[]
```

Retrieves tools compatible with the specified LLM provider.

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.Agent.getTools.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

The LLM provider to filter tools by.

---

###### `returnAllTools`<sup>Optional</sup> <a name="returnAllTools" id="xpander-sdk.Agent.getTools.parameter.returnAllTools"></a>

- *Type:* boolean

---

##### `load` <a name="load" id="xpander-sdk.Agent.load"></a>

```typescript
public load(sourceNodeType?: SourceNodeType): void
```

Loads the agent data from the specified source node type.

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.load.parameter.sourceNodeType"></a>

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

The type of source node to load.

---

##### `modifyOversizedResponseCache` <a name="modifyOversizedResponseCache" id="xpander-sdk.Agent.modifyOversizedResponseCache"></a>

```typescript
public modifyOversizedResponseCache(cache: any): any
```

###### `cache`<sup>Required</sup> <a name="cache" id="xpander-sdk.Agent.modifyOversizedResponseCache.parameter.cache"></a>

- *Type:* any

---

##### `retrieveAllGraphTools` <a name="retrieveAllGraphTools" id="xpander-sdk.Agent.retrieveAllGraphTools"></a>

```typescript
public retrieveAllGraphTools(): any[]
```

##### `retrieveOversizedResponseCache` <a name="retrieveOversizedResponseCache" id="xpander-sdk.Agent.retrieveOversizedResponseCache"></a>

```typescript
public retrieveOversizedResponseCache(): any
```

##### `runTool` <a name="runTool" id="xpander-sdk.Agent.runTool"></a>

```typescript
public runTool(tool: ToolCall, payloadExtension?: any): ToolCallResult
```

Executes a single tool call and returns the result.

###### `tool`<sup>Required</sup> <a name="tool" id="xpander-sdk.Agent.runTool.parameter.tool"></a>

- *Type:* <a href="#xpander-sdk.ToolCall">ToolCall</a>

The tool call to execute.

---

###### `payloadExtension`<sup>Optional</sup> <a name="payloadExtension" id="xpander-sdk.Agent.runTool.parameter.payloadExtension"></a>

- *Type:* any

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

---

##### `schemasByNodeName` <a name="schemasByNodeName" id="xpander-sdk.Agent.schemasByNodeName"></a>

```typescript
public schemasByNodeName(): {[ key: string ]: INodeSchema}
```

Retrieves schemas grouped by node name based on the active prompt group session.

This method returns an object where each key is a node name, and the value is the corresponding schema.
It ensures that schemas are only fetched if there is an active session with a valid `promptGroupId`
and if `pgSchemas` is not empty.

##### `selectPromptGroup` <a name="selectPromptGroup" id="xpander-sdk.Agent.selectPromptGroup"></a>

```typescript
public selectPromptGroup(promptGroupName: string): void
```

###### `promptGroupName`<sup>Required</sup> <a name="promptGroupName" id="xpander-sdk.Agent.selectPromptGroup.parameter.promptGroupName"></a>

- *Type:* string

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
| <code><a href="#xpander-sdk.Agent.property.hasLocalTools">hasLocalTools</a></code> | <code>boolean</code> | Checks if the agent has any local tools loaded. |
| <code><a href="#xpander-sdk.Agent.property.isCustom">isCustom</a></code> | <code>boolean</code> | Checks if the agent is a custom-defined agent. |
| <code><a href="#xpander-sdk.Agent.property.sourceNodeType">sourceNodeType</a></code> | <code><a href="#xpander-sdk.SourceNodeType">SourceNodeType</a></code> | Retrieves the type of source node for the agent. |
| <code><a href="#xpander-sdk.Agent.property.url">url</a></code> | <code>string</code> | Constructs the API URL for this agent. |
| <code><a href="#xpander-sdk.Agent.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | Configuration settings for the agent. |
| <code><a href="#xpander-sdk.Agent.property.generalInstructions">generalInstructions</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.graphs">graphs</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]</code> | Array of graph items related to the agent. |
| <code><a href="#xpander-sdk.Agent.property.id">id</a></code> | <code>string</code> | Unique identifier for the agent. |
| <code><a href="#xpander-sdk.Agent.property.judgeInstructions">judgeInstructions</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.localTools">localTools</a></code> | <code><a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]</code> | Collection of local tools specific to this agent. |
| <code><a href="#xpander-sdk.Agent.property.name">name</a></code> | <code>string</code> | Human-readable name of the agent. |
| <code><a href="#xpander-sdk.Agent.property.organizationId">organizationId</a></code> | <code>string</code> | Organization ID to which the agent belongs. |
| <code><a href="#xpander-sdk.Agent.property.pgNodeDescriptionOverride">pgNodeDescriptionOverride</a></code> | <code><a href="#xpander-sdk.INodeDescription">INodeDescription</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.Agent.property.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.Agent.property.pgSchemas">pgSchemas</a></code> | <code><a href="#xpander-sdk.IPGSchema">IPGSchema</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.Agent.property.pgSwitchAllowed">pgSwitchAllowed</a></code> | <code>boolean</code> | Whether prompt group switching is allowed for the agent. |
| <code><a href="#xpander-sdk.Agent.property.promptGroupSessions">promptGroupSessions</a></code> | <code><a href="#xpander-sdk.PromptGroupSessionsList">PromptGroupSessionsList</a></code> | Manages prompt group sessions for this agent. |
| <code><a href="#xpander-sdk.Agent.property.ready">ready</a></code> | <code>boolean</code> | Indicates whether the agent is ready with tools loaded. |
| <code><a href="#xpander-sdk.Agent.property.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | List of source nodes associated with the agent. |
| <code><a href="#xpander-sdk.Agent.property.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | Current status of the agent. |
| <code><a href="#xpander-sdk.Agent.property.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | Array of tools available to the agent. |

---

##### `hasLocalTools`<sup>Required</sup> <a name="hasLocalTools" id="xpander-sdk.Agent.property.hasLocalTools"></a>

```typescript
public readonly hasLocalTools: boolean;
```

- *Type:* boolean

Checks if the agent has any local tools loaded.

---

##### `isCustom`<sup>Required</sup> <a name="isCustom" id="xpander-sdk.Agent.property.isCustom"></a>

```typescript
public readonly isCustom: boolean;
```

- *Type:* boolean

Checks if the agent is a custom-defined agent.

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

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

Configuration settings for the agent.

---

##### `generalInstructions`<sup>Required</sup> <a name="generalInstructions" id="xpander-sdk.Agent.property.generalInstructions"></a>

```typescript
public readonly generalInstructions: string;
```

- *Type:* string

---

##### `graphs`<sup>Required</sup> <a name="graphs" id="xpander-sdk.Agent.property.graphs"></a>

```typescript
public readonly graphs: IGraphItem[];
```

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]

Array of graph items related to the agent.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Agent.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Unique identifier for the agent.

---

##### `judgeInstructions`<sup>Required</sup> <a name="judgeInstructions" id="xpander-sdk.Agent.property.judgeInstructions"></a>

```typescript
public readonly judgeInstructions: string;
```

- *Type:* string

---

##### `localTools`<sup>Required</sup> <a name="localTools" id="xpander-sdk.Agent.property.localTools"></a>

```typescript
public readonly localTools: ILocalTool[];
```

- *Type:* <a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]

Collection of local tools specific to this agent.

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

##### `pgNodeDescriptionOverride`<sup>Required</sup> <a name="pgNodeDescriptionOverride" id="xpander-sdk.Agent.property.pgNodeDescriptionOverride"></a>

```typescript
public readonly pgNodeDescriptionOverride: INodeDescription[];
```

- *Type:* <a href="#xpander-sdk.INodeDescription">INodeDescription</a>[]

Array of agent tools specific to prompt groups.

---

##### `pgOas`<sup>Required</sup> <a name="pgOas" id="xpander-sdk.Agent.property.pgOas"></a>

```typescript
public readonly pgOas: IAgentTool[];
```

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Array of agent tools specific to prompt groups.

---

##### `pgSchemas`<sup>Required</sup> <a name="pgSchemas" id="xpander-sdk.Agent.property.pgSchemas"></a>

```typescript
public readonly pgSchemas: IPGSchema[];
```

- *Type:* <a href="#xpander-sdk.IPGSchema">IPGSchema</a>[]

Array of agent tools specific to prompt groups.

---

##### `pgSwitchAllowed`<sup>Required</sup> <a name="pgSwitchAllowed" id="xpander-sdk.Agent.property.pgSwitchAllowed"></a>

```typescript
public readonly pgSwitchAllowed: boolean;
```

- *Type:* boolean

Whether prompt group switching is allowed for the agent.

---

##### `promptGroupSessions`<sup>Required</sup> <a name="promptGroupSessions" id="xpander-sdk.Agent.property.promptGroupSessions"></a>

```typescript
public readonly promptGroupSessions: PromptGroupSessionsList;
```

- *Type:* <a href="#xpander-sdk.PromptGroupSessionsList">PromptGroupSessionsList</a>

Manages prompt group sessions for this agent.

---

##### `ready`<sup>Required</sup> <a name="ready" id="xpander-sdk.Agent.property.ready"></a>

```typescript
public readonly ready: boolean;
```

- *Type:* boolean

Indicates whether the agent is ready with tools loaded.

---

##### `sourceNodes`<sup>Required</sup> <a name="sourceNodes" id="xpander-sdk.Agent.property.sourceNodes"></a>

```typescript
public readonly sourceNodes: ISourceNode[];
```

- *Type:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]

List of source nodes associated with the agent.

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

Array of tools available to the agent.

---


### Agents <a name="Agents" id="xpander-sdk.Agents"></a>

Manages a collection of Agent instances in xpanderAI, providing methods to list, retrieve, and initialize specific agents including custom agents.

#### Initializers <a name="Initializers" id="xpander-sdk.Agents.Initializer"></a>

```typescript
import { Agents } from 'xpander-sdk'

new Agents(configuration: Configuration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agents.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | *No description.* |

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agents.Initializer.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agents.get">get</a></code> | Retrieves an agent by ID and initializes it with the given source node type. |
| <code><a href="#xpander-sdk.Agents.getCustomAgent">getCustomAgent</a></code> | Retrieves the custom agent instance, initializing it with the given source node type. |
| <code><a href="#xpander-sdk.Agents.list">list</a></code> | Retrieves the list of agents. |

---

##### `get` <a name="get" id="xpander-sdk.Agents.get"></a>

```typescript
public get(agentId: string, sourceNodeType?: SourceNodeType): Agent
```

Retrieves an agent by ID and initializes it with the given source node type.

###### `agentId`<sup>Required</sup> <a name="agentId" id="xpander-sdk.Agents.get.parameter.agentId"></a>

- *Type:* string

The ID of the agent to retrieve.

---

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agents.get.parameter.sourceNodeType"></a>

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

The source node type for the agent, default is SDK.

---

##### `getCustomAgent` <a name="getCustomAgent" id="xpander-sdk.Agents.getCustomAgent"></a>

```typescript
public getCustomAgent(sourceNodeType?: SourceNodeType): Agent
```

Retrieves the custom agent instance, initializing it with the given source node type.

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agents.getCustomAgent.parameter.sourceNodeType"></a>

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

The source node type for the custom agent, default is SDK.

---

##### `list` <a name="list" id="xpander-sdk.Agents.list"></a>

```typescript
public list(refetch?: boolean): Agent[]
```

Retrieves the list of agents.

If `refetch` is true, it re-fetches the list
from the API even if agents are already loaded.

###### `refetch`<sup>Optional</sup> <a name="refetch" id="xpander-sdk.Agents.list.parameter.refetch"></a>

- *Type:* boolean

If true, forces a re-fetch of the agent list from the API.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agents.property.agentsList">agentsList</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a>[]</code> | Collection of Agent instances managed by this class. |
| <code><a href="#xpander-sdk.Agents.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | *No description.* |

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

---


### AmazonBedrockSupportedModels <a name="AmazonBedrockSupportedModels" id="xpander-sdk.AmazonBedrockSupportedModels"></a>

Contains constants representing various models supported by Amazon Bedrock.

#### Initializers <a name="Initializers" id="xpander-sdk.AmazonBedrockSupportedModels.Initializer"></a>

```typescript
import { AmazonBedrockSupportedModels } from 'xpander-sdk'

new AmazonBedrockSupportedModels()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_5_SONNET_20240620">ANTHROPIC_CLAUDE_3_5_SONNET_20240620</a></code> | <code>string</code> | Anthropocene Claude 3.5 Sonnet model (version 2024-06-20). |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_HAIKU_20240307">ANTHROPIC_CLAUDE_3_HAIKU_20240307</a></code> | <code>string</code> | Anthropocene Claude 3 Haiku model (version 2024-03-07). |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R">COHERE_COMMAND_R</a></code> | <code>string</code> | Cohere Command R model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R_PLUS">COHERE_COMMAND_R_PLUS</a></code> | <code>string</code> | Cohere Command R Plus model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_405B_INSTRUCT">META_LLAMA3_1_405B_INSTRUCT</a></code> | <code>string</code> | Meta Llama 3 1.405B Instruct model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_70B_INSTRUCT">META_LLAMA3_1_70B_INSTRUCT</a></code> | <code>string</code> | Meta Llama 3 1.70B Instruct model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_8B_INSTRUCT">META_LLAMA3_1_8B_INSTRUCT</a></code> | <code>string</code> | Meta Llama 3 1.8B Instruct model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2402">MISTRAL_MISTRAL_LARGE_2402</a></code> | <code>string</code> | Mistral Large 2402 model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2407">MISTRAL_MISTRAL_LARGE_2407</a></code> | <code>string</code> | Mistral Large 2407 model. |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_SMALL_2402">MISTRAL_MISTRAL_SMALL_2402</a></code> | <code>string</code> | Mistral Small 2402 model. |

---

##### `ANTHROPIC_CLAUDE_3_5_SONNET_20240620`<sup>Required</sup> <a name="ANTHROPIC_CLAUDE_3_5_SONNET_20240620" id="xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_5_SONNET_20240620"></a>

```typescript
public readonly ANTHROPIC_CLAUDE_3_5_SONNET_20240620: string;
```

- *Type:* string

Anthropocene Claude 3.5 Sonnet model (version 2024-06-20).

---

##### `ANTHROPIC_CLAUDE_3_HAIKU_20240307`<sup>Required</sup> <a name="ANTHROPIC_CLAUDE_3_HAIKU_20240307" id="xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_HAIKU_20240307"></a>

```typescript
public readonly ANTHROPIC_CLAUDE_3_HAIKU_20240307: string;
```

- *Type:* string

Anthropocene Claude 3 Haiku model (version 2024-03-07).

---

##### `COHERE_COMMAND_R`<sup>Required</sup> <a name="COHERE_COMMAND_R" id="xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R"></a>

```typescript
public readonly COHERE_COMMAND_R: string;
```

- *Type:* string

Cohere Command R model.

---

##### `COHERE_COMMAND_R_PLUS`<sup>Required</sup> <a name="COHERE_COMMAND_R_PLUS" id="xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R_PLUS"></a>

```typescript
public readonly COHERE_COMMAND_R_PLUS: string;
```

- *Type:* string

Cohere Command R Plus model.

---

##### `META_LLAMA3_1_405B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA3_1_405B_INSTRUCT" id="xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_405B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA3_1_405B_INSTRUCT: string;
```

- *Type:* string

Meta Llama 3 1.405B Instruct model.

---

##### `META_LLAMA3_1_70B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA3_1_70B_INSTRUCT" id="xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_70B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA3_1_70B_INSTRUCT: string;
```

- *Type:* string

Meta Llama 3 1.70B Instruct model.

---

##### `META_LLAMA3_1_8B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA3_1_8B_INSTRUCT" id="xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_8B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA3_1_8B_INSTRUCT: string;
```

- *Type:* string

Meta Llama 3 1.8B Instruct model.

---

##### `MISTRAL_MISTRAL_LARGE_2402`<sup>Required</sup> <a name="MISTRAL_MISTRAL_LARGE_2402" id="xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2402"></a>

```typescript
public readonly MISTRAL_MISTRAL_LARGE_2402: string;
```

- *Type:* string

Mistral Large 2402 model.

---

##### `MISTRAL_MISTRAL_LARGE_2407`<sup>Required</sup> <a name="MISTRAL_MISTRAL_LARGE_2407" id="xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2407"></a>

```typescript
public readonly MISTRAL_MISTRAL_LARGE_2407: string;
```

- *Type:* string

Mistral Large 2407 model.

---

##### `MISTRAL_MISTRAL_SMALL_2402`<sup>Required</sup> <a name="MISTRAL_MISTRAL_SMALL_2402" id="xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_SMALL_2402"></a>

```typescript
public readonly MISTRAL_MISTRAL_SMALL_2402: string;
```

- *Type:* string

Mistral Small 2402 model.

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

Manages the configuration settings for the xpanderAI client, including API key, base URL, metrics reporting, and custom parameters.

#### Initializers <a name="Initializers" id="xpander-sdk.Configuration.Initializer"></a>

```typescript
import { Configuration } from 'xpander-sdk'

new Configuration(__0: IConfiguration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Configuration.Initializer.parameter.__0">__0</a></code> | <code><a href="#xpander-sdk.IConfiguration">IConfiguration</a></code> | *No description.* |

---

##### `__0`<sup>Required</sup> <a name="__0" id="xpander-sdk.Configuration.Initializer.parameter.__0"></a>

- *Type:* <a href="#xpander-sdk.IConfiguration">IConfiguration</a>

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
| <code><a href="#xpander-sdk.Configuration.property.apiKey">apiKey</a></code> | <code>string</code> | API key for authenticating requests to xpanderAI. |
| <code><a href="#xpander-sdk.Configuration.property.baseUrl">baseUrl</a></code> | <code>string</code> | Base URL for the xpanderAI API requests. |
| <code><a href="#xpander-sdk.Configuration.property.customParams">customParams</a></code> | <code><a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a></code> | Custom parameters for additional configuration options. |
| <code><a href="#xpander-sdk.Configuration.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | Flag to enable or disable metrics reporting. |

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

##### `customParams`<sup>Required</sup> <a name="customParams" id="xpander-sdk.Configuration.property.customParams"></a>

```typescript
public readonly customParams: IXpanderClientCustomParams;
```

- *Type:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>

Custom parameters for additional configuration options.

---

##### `withMetricsReport`<sup>Required</sup> <a name="withMetricsReport" id="xpander-sdk.Configuration.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

Flag to enable or disable metrics reporting.

---


### FriendliAISupportedModels <a name="FriendliAISupportedModels" id="xpander-sdk.FriendliAISupportedModels"></a>

Contains constants representing various models supported by OpenAI.

#### Initializers <a name="Initializers" id="xpander-sdk.FriendliAISupportedModels.Initializer"></a>

```typescript
import { FriendliAISupportedModels } from 'xpander-sdk'

new FriendliAISupportedModels()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.FriendliAISupportedModels.property.META_LLAMA_3_1_70B_INSTRUCT">META_LLAMA_3_1_70B_INSTRUCT</a></code> | <code>string</code> | Meta LLaMA 3.1 70B Instruct model. |
| <code><a href="#xpander-sdk.FriendliAISupportedModels.property.META_LLAMA_3_1_8B_INSTRUCT">META_LLAMA_3_1_8B_INSTRUCT</a></code> | <code>string</code> | Meta LLaMA 3.1 8B Instruct model. |
| <code><a href="#xpander-sdk.FriendliAISupportedModels.property.MISTRAL_8X_7B_INSTRUCT">MISTRAL_8X_7B_INSTRUCT</a></code> | <code>string</code> | Mistral 8x7B Instruct model (version 0.1). |

---

##### `META_LLAMA_3_1_70B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA_3_1_70B_INSTRUCT" id="xpander-sdk.FriendliAISupportedModels.property.META_LLAMA_3_1_70B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA_3_1_70B_INSTRUCT: string;
```

- *Type:* string

Meta LLaMA 3.1 70B Instruct model.

---

##### `META_LLAMA_3_1_8B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA_3_1_8B_INSTRUCT" id="xpander-sdk.FriendliAISupportedModels.property.META_LLAMA_3_1_8B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA_3_1_8B_INSTRUCT: string;
```

- *Type:* string

Meta LLaMA 3.1 8B Instruct model.

---

##### `MISTRAL_8X_7B_INSTRUCT`<sup>Required</sup> <a name="MISTRAL_8X_7B_INSTRUCT" id="xpander-sdk.FriendliAISupportedModels.property.MISTRAL_8X_7B_INSTRUCT"></a>

```typescript
public readonly MISTRAL_8X_7B_INSTRUCT: string;
```

- *Type:* string

Mistral 8x7B Instruct model (version 0.1).

---

### NvidiaNIMSupportedModels <a name="NvidiaNIMSupportedModels" id="xpander-sdk.NvidiaNIMSupportedModels"></a>

Contains constants representing various models supported by Nvidia NIM.

#### Initializers <a name="Initializers" id="xpander-sdk.NvidiaNIMSupportedModels.Initializer"></a>

```typescript
import { NvidiaNIMSupportedModels } from 'xpander-sdk'

new NvidiaNIMSupportedModels()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.NvidiaNIMSupportedModels.property.LLAMA_3_1_70B_INSTRUCT">LLAMA_3_1_70B_INSTRUCT</a></code> | <code>string</code> | Meta Llama 3.1 70B Instruct model. |

---

##### `LLAMA_3_1_70B_INSTRUCT`<sup>Required</sup> <a name="LLAMA_3_1_70B_INSTRUCT" id="xpander-sdk.NvidiaNIMSupportedModels.property.LLAMA_3_1_70B_INSTRUCT"></a>

```typescript
public readonly LLAMA_3_1_70B_INSTRUCT: string;
```

- *Type:* string

Meta Llama 3.1 70B Instruct model.

---

### OpenAISupportedModels <a name="OpenAISupportedModels" id="xpander-sdk.OpenAISupportedModels"></a>

Contains constants representing various models supported by OpenAI.

#### Initializers <a name="Initializers" id="xpander-sdk.OpenAISupportedModels.Initializer"></a>

```typescript
import { OpenAISupportedModels } from 'xpander-sdk'

new OpenAISupportedModels()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.OpenAISupportedModels.property.GPT_4">GPT_4</a></code> | <code>string</code> | OpenAI GPT-4 model. |
| <code><a href="#xpander-sdk.OpenAISupportedModels.property.GPT_4_O">GPT_4_O</a></code> | <code>string</code> | OpenAI GPT-4o model. |
| <code><a href="#xpander-sdk.OpenAISupportedModels.property.GPT_4_O_MINI">GPT_4_O_MINI</a></code> | <code>string</code> | OpenAI GPT-4o Mini model. |

---

##### `GPT_4`<sup>Required</sup> <a name="GPT_4" id="xpander-sdk.OpenAISupportedModels.property.GPT_4"></a>

```typescript
public readonly GPT_4: string;
```

- *Type:* string

OpenAI GPT-4 model.

---

##### `GPT_4_O`<sup>Required</sup> <a name="GPT_4_O" id="xpander-sdk.OpenAISupportedModels.property.GPT_4_O"></a>

```typescript
public readonly GPT_4_O: string;
```

- *Type:* string

OpenAI GPT-4o model.

---

##### `GPT_4_O_MINI`<sup>Required</sup> <a name="GPT_4_O_MINI" id="xpander-sdk.OpenAISupportedModels.property.GPT_4_O_MINI"></a>

```typescript
public readonly GPT_4_O_MINI: string;
```

- *Type:* string

OpenAI GPT-4o Mini model.

---

### PromptGroupSession <a name="PromptGroupSession" id="xpander-sdk.PromptGroupSession"></a>

Represents a session within a prompt group in xpanderAI, managing the graph item and tracking the last processed node.

#### Initializers <a name="Initializers" id="xpander-sdk.PromptGroupSession.Initializer"></a>

```typescript
import { PromptGroupSession } from 'xpander-sdk'

new PromptGroupSession(pg: IGraphItem, lastNode?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSession.Initializer.parameter.pg">pg</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a></code> | The graph item associated with the prompt group session. |
| <code><a href="#xpander-sdk.PromptGroupSession.Initializer.parameter.lastNode">lastNode</a></code> | <code>string</code> | Identifier for the last node accessed in the session. |

---

##### `pg`<sup>Required</sup> <a name="pg" id="xpander-sdk.PromptGroupSession.Initializer.parameter.pg"></a>

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>

The graph item associated with the prompt group session.

---

##### `lastNode`<sup>Optional</sup> <a name="lastNode" id="xpander-sdk.PromptGroupSession.Initializer.parameter.lastNode"></a>

- *Type:* string

Identifier for the last node accessed in the session.

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSession.property.lastNode">lastNode</a></code> | <code>string</code> | Identifier for the last node accessed in the session. |
| <code><a href="#xpander-sdk.PromptGroupSession.property.pg">pg</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a></code> | The graph item associated with the prompt group session. |

---

##### `lastNode`<sup>Required</sup> <a name="lastNode" id="xpander-sdk.PromptGroupSession.property.lastNode"></a>

```typescript
public readonly lastNode: string;
```

- *Type:* string

Identifier for the last node accessed in the session.

---

##### `pg`<sup>Required</sup> <a name="pg" id="xpander-sdk.PromptGroupSession.property.pg"></a>

```typescript
public readonly pg: IGraphItem;
```

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>

The graph item associated with the prompt group session.

---


### PromptGroupSessionsList <a name="PromptGroupSessionsList" id="xpander-sdk.PromptGroupSessionsList"></a>

Manages a collection of prompt group sessions, providing functionalities to start, manage, and retrieve tools for active sessions in xpanderAI.

#### Initializers <a name="Initializers" id="xpander-sdk.PromptGroupSessionsList.Initializer"></a>

```typescript
import { PromptGroupSessionsList } from 'xpander-sdk'

new PromptGroupSessionsList(graphs: IGraphItem[], pgOas: IAgentTool[], sessions?: PromptGroupSession[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.Initializer.parameter.graphs">graphs</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]</code> | Collection of graph items associated with prompt groups. |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.Initializer.parameter.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | Array of agent tools specific to prompt groups. |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.Initializer.parameter.sessions">sessions</a></code> | <code><a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a>[]</code> | List of active prompt group sessions. |

---

##### `graphs`<sup>Required</sup> <a name="graphs" id="xpander-sdk.PromptGroupSessionsList.Initializer.parameter.graphs"></a>

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]

Collection of graph items associated with prompt groups.

---

##### `pgOas`<sup>Required</sup> <a name="pgOas" id="xpander-sdk.PromptGroupSessionsList.Initializer.parameter.pgOas"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Array of agent tools specific to prompt groups.

---

##### `sessions`<sup>Optional</sup> <a name="sessions" id="xpander-sdk.PromptGroupSessionsList.Initializer.parameter.sessions"></a>

- *Type:* <a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a>[]

List of active prompt group sessions.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.getToolsForActiveSession">getToolsForActiveSession</a></code> | Retrieves the available tools for the currently active session, filtering tools based on their position in the graph and local tool prefix. |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.resetSessions">resetSessions</a></code> | Resets all active prompt group sessions. |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.startPgSession">startPgSession</a></code> | Starts a new session for a specified tool call, associating it with a prompt group. |

---

##### `getToolsForActiveSession` <a name="getToolsForActiveSession" id="xpander-sdk.PromptGroupSessionsList.getToolsForActiveSession"></a>

```typescript
public getToolsForActiveSession(allTools: any[]): any[]
```

Retrieves the available tools for the currently active session, filtering tools based on their position in the graph and local tool prefix.

###### `allTools`<sup>Required</sup> <a name="allTools" id="xpander-sdk.PromptGroupSessionsList.getToolsForActiveSession.parameter.allTools"></a>

- *Type:* any[]

A list of all tools available for the session.

---

##### `resetSessions` <a name="resetSessions" id="xpander-sdk.PromptGroupSessionsList.resetSessions"></a>

```typescript
public resetSessions(): void
```

Resets all active prompt group sessions.

##### `startPgSession` <a name="startPgSession" id="xpander-sdk.PromptGroupSessionsList.startPgSession"></a>

```typescript
public startPgSession(tool: ToolCall): string
```

Starts a new session for a specified tool call, associating it with a prompt group.

If the prompt group or graph cannot be matched, an error is thrown.

###### `tool`<sup>Required</sup> <a name="tool" id="xpander-sdk.PromptGroupSessionsList.startPgSession.parameter.tool"></a>

- *Type:* <a href="#xpander-sdk.ToolCall">ToolCall</a>

The tool call used to start the prompt group session.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.property.activeSession">activeSession</a></code> | <code><a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a></code> | Returns the currently active session, if one exists. |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.property.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | Array of agent tools specific to prompt groups. |

---

##### `activeSession`<sup>Required</sup> <a name="activeSession" id="xpander-sdk.PromptGroupSessionsList.property.activeSession"></a>

```typescript
public readonly activeSession: PromptGroupSession;
```

- *Type:* <a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a>

Returns the currently active session, if one exists.

---

##### `pgOas`<sup>Required</sup> <a name="pgOas" id="xpander-sdk.PromptGroupSessionsList.property.pgOas"></a>

```typescript
public readonly pgOas: IAgentTool[];
```

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

Array of agent tools specific to prompt groups.

---


### RealTimeOpenAISupportedModels <a name="RealTimeOpenAISupportedModels" id="xpander-sdk.RealTimeOpenAISupportedModels"></a>

Contains constants representing various models supported by OpenAI.

#### Initializers <a name="Initializers" id="xpander-sdk.RealTimeOpenAISupportedModels.Initializer"></a>

```typescript
import { RealTimeOpenAISupportedModels } from 'xpander-sdk'

new RealTimeOpenAISupportedModels()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.RealTimeOpenAISupportedModels.property.GPT_4_O_AUDIO_PREVIEW">GPT_4_O_AUDIO_PREVIEW</a></code> | <code>string</code> | OpenAI GPT-4o Audio Preview model. |
| <code><a href="#xpander-sdk.RealTimeOpenAISupportedModels.property.GPT_4_O_REALTIME_PREVIEW">GPT_4_O_REALTIME_PREVIEW</a></code> | <code>string</code> | OpenAI GPT-4o Realtime Preview model. |
| <code><a href="#xpander-sdk.RealTimeOpenAISupportedModels.property.WHISPER_1">WHISPER_1</a></code> | <code>string</code> | OpenAI Whisper model for speech-to-text tasks. |

---

##### `GPT_4_O_AUDIO_PREVIEW`<sup>Required</sup> <a name="GPT_4_O_AUDIO_PREVIEW" id="xpander-sdk.RealTimeOpenAISupportedModels.property.GPT_4_O_AUDIO_PREVIEW"></a>

```typescript
public readonly GPT_4_O_AUDIO_PREVIEW: string;
```

- *Type:* string

OpenAI GPT-4o Audio Preview model.

---

##### `GPT_4_O_REALTIME_PREVIEW`<sup>Required</sup> <a name="GPT_4_O_REALTIME_PREVIEW" id="xpander-sdk.RealTimeOpenAISupportedModels.property.GPT_4_O_REALTIME_PREVIEW"></a>

```typescript
public readonly GPT_4_O_REALTIME_PREVIEW: string;
```

- *Type:* string

OpenAI GPT-4o Realtime Preview model.

---

##### `WHISPER_1`<sup>Required</sup> <a name="WHISPER_1" id="xpander-sdk.RealTimeOpenAISupportedModels.property.WHISPER_1"></a>

```typescript
public readonly WHISPER_1: string;
```

- *Type:* string

OpenAI Whisper model for speech-to-text tasks.

---

### ToolCall <a name="ToolCall" id="xpander-sdk.ToolCall"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.ToolCall.Initializer"></a>

```typescript
import { ToolCall } from 'xpander-sdk'

new ToolCall(name?: string, type?: ToolCallType, payload?: any, toolCallId?: string, isPg?: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.Initializer.parameter.isPg">isPg</a></code> | <code>boolean</code> | *No description.* |

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

##### `isPg`<sup>Optional</sup> <a name="isPg" id="xpander-sdk.ToolCall.Initializer.parameter.isPg"></a>

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
| <code><a href="#xpander-sdk.ToolCall.property.isPg">isPg</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.payload">payload</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolCall.property.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |

---

##### `isPg`<sup>Required</sup> <a name="isPg" id="xpander-sdk.ToolCall.property.isPg"></a>

```typescript
public readonly isPg: boolean;
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

new XpanderClient(apiKey: string, baseUrl?: any, withMetricsReport?: boolean, customParams?: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.baseUrl">baseUrl</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.customParams">customParams</a></code> | <code>any</code> | *No description.* |

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

##### `customParams`<sup>Optional</sup> <a name="customParams" id="xpander-sdk.XpanderClient.Initializer.parameter.customParams"></a>

- *Type:* any

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
| <code><a href="#xpander-sdk.IConfiguration.property.customParams">customParams</a></code> | <code><a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a></code> | Custom parameters for client-specific settings. |
| <code><a href="#xpander-sdk.IConfiguration.property.baseUrl">baseUrl</a></code> | <code>string</code> | Optional base URL for the xpanderAI API. |
| <code><a href="#xpander-sdk.IConfiguration.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | Optional flag to enable metrics reporting. |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.IConfiguration.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

API key for authenticating with xpanderAI.

---

##### `customParams`<sup>Required</sup> <a name="customParams" id="xpander-sdk.IConfiguration.property.customParams"></a>

```typescript
public readonly customParams: IXpanderClientCustomParams;
```

- *Type:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>

Custom parameters for client-specific settings.

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="xpander-sdk.IConfiguration.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

Optional base URL for the xpanderAI API.

---

##### `withMetricsReport`<sup>Optional</sup> <a name="withMetricsReport" id="xpander-sdk.IConfiguration.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

Optional flag to enable metrics reporting.

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
| <code><a href="#xpander-sdk.ISourceNode.property.pgSwitchAllowed">pgSwitchAllowed</a></code> | <code>boolean</code> | Flag indicating if switching prompt groups is allowed for this node. |
| <code><a href="#xpander-sdk.ISourceNode.property.targets">targets</a></code> | <code>string[]</code> | List of target nodes connected to this source node. |
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

##### `pgSwitchAllowed`<sup>Required</sup> <a name="pgSwitchAllowed" id="xpander-sdk.ISourceNode.property.pgSwitchAllowed"></a>

```typescript
public readonly pgSwitchAllowed: boolean;
```

- *Type:* boolean

Flag indicating if switching prompt groups is allowed for this node.

---

##### `targets`<sup>Required</sup> <a name="targets" id="xpander-sdk.ISourceNode.property.targets"></a>

```typescript
public readonly targets: string[];
```

- *Type:* string[]

List of target nodes connected to this source node.

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
| <code><a href="#xpander-sdk.IToolExecutionResult.property.isSuccess">isSuccess</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolExecutionResult.property.statusCode">statusCode</a></code> | <code>number</code> | *No description.* |

---

##### `data`<sup>Required</sup> <a name="data" id="xpander-sdk.IToolExecutionResult.property.data"></a>

```typescript
public readonly data: any;
```

- *Type:* any

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

### IXpanderClientCustomParams <a name="IXpanderClientCustomParams" id="xpander-sdk.IXpanderClientCustomParams"></a>

- *Implemented By:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>

Interface representing optional custom parameters for configuring the xpanderAI client.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IXpanderClientCustomParams.property.connectors">connectors</a></code> | <code>any[]</code> | Optional array of connectors associated with the client. |
| <code><a href="#xpander-sdk.IXpanderClientCustomParams.property.organizationId">organizationId</a></code> | <code>string</code> | Optional organization ID associated with the client. |

---

##### `connectors`<sup>Optional</sup> <a name="connectors" id="xpander-sdk.IXpanderClientCustomParams.property.connectors"></a>

```typescript
public readonly connectors: any[];
```

- *Type:* any[]

Optional array of connectors associated with the client.

---

##### `organizationId`<sup>Optional</sup> <a name="organizationId" id="xpander-sdk.IXpanderClientCustomParams.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

Optional organization ID associated with the client.

---

## Enums <a name="Enums" id="Enums"></a>

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

