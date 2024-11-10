# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### Agent <a name="Agent" id="xpander-sdk.Agent"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.Agent.Initializer"></a>

```typescript
import { Agent } from 'xpander-sdk'

new Agent(configuration: Configuration, id: string, organizationId: string, status: AgentStatus, name: string, sourceNodes: ISourceNode[], pgSwitchAllowed?: boolean, tools?: IAgentTool[], graphs?: IGraphItem[], pgOas?: IAgentTool[], autoLoad?: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.pgSwitchAllowed">pgSwitchAllowed</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.graphs">graphs</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.Initializer.parameter.autoLoad">autoLoad</a></code> | <code>boolean</code> | *No description.* |

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.Initializer.parameter.configuration"></a>

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Agent.Initializer.parameter.id"></a>

- *Type:* string

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Agent.Initializer.parameter.organizationId"></a>

- *Type:* string

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Agent.Initializer.parameter.status"></a>

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Agent.Initializer.parameter.name"></a>

- *Type:* string

---

##### `sourceNodes`<sup>Required</sup> <a name="sourceNodes" id="xpander-sdk.Agent.Initializer.parameter.sourceNodes"></a>

- *Type:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]

---

##### `pgSwitchAllowed`<sup>Optional</sup> <a name="pgSwitchAllowed" id="xpander-sdk.Agent.Initializer.parameter.pgSwitchAllowed"></a>

- *Type:* boolean

---

##### `tools`<sup>Optional</sup> <a name="tools" id="xpander-sdk.Agent.Initializer.parameter.tools"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

---

##### `graphs`<sup>Optional</sup> <a name="graphs" id="xpander-sdk.Agent.Initializer.parameter.graphs"></a>

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]

---

##### `pgOas`<sup>Optional</sup> <a name="pgOas" id="xpander-sdk.Agent.Initializer.parameter.pgOas"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

---

##### `autoLoad`<sup>Optional</sup> <a name="autoLoad" id="xpander-sdk.Agent.Initializer.parameter.autoLoad"></a>

- *Type:* boolean

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Agent.addLocalTools">addLocalTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.getTools">getTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.load">load</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.runTool">runTool</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.runTools">runTools</a></code> | *No description.* |

---

##### `addLocalTools` <a name="addLocalTools" id="xpander-sdk.Agent.addLocalTools"></a>

```typescript
public addLocalTools(tools: any[] | ILocalTool[]): void
```

###### `tools`<sup>Required</sup> <a name="tools" id="xpander-sdk.Agent.addLocalTools.parameter.tools"></a>

- *Type:* any[] | <a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]

---

##### `getTools` <a name="getTools" id="xpander-sdk.Agent.getTools"></a>

```typescript
public getTools(llmProvider?: LLMProvider): any[]
```

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.Agent.getTools.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `load` <a name="load" id="xpander-sdk.Agent.load"></a>

```typescript
public load(sourceNodeType?: SourceNodeType): void
```

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.load.parameter.sourceNodeType"></a>

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

---

##### `runTool` <a name="runTool" id="xpander-sdk.Agent.runTool"></a>

```typescript
public runTool(tool: IToolCall): IToolCallResult
```

###### `tool`<sup>Required</sup> <a name="tool" id="xpander-sdk.Agent.runTool.parameter.tool"></a>

- *Type:* <a href="#xpander-sdk.IToolCall">IToolCall</a>

---

##### `runTools` <a name="runTools" id="xpander-sdk.Agent.runTools"></a>

```typescript
public runTools(toolCalls: IToolCall[]): IToolCallResult[]
```

###### `toolCalls`<sup>Required</sup> <a name="toolCalls" id="xpander-sdk.Agent.runTools.parameter.toolCalls"></a>

- *Type:* <a href="#xpander-sdk.IToolCall">IToolCall</a>[]

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agent.property.hasLocalTools">hasLocalTools</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.isCustom">isCustom</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.sourceNodeType">sourceNodeType</a></code> | <code><a href="#xpander-sdk.SourceNodeType">SourceNodeType</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.graphs">graphs</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.localTools">localTools</a></code> | <code><a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.pgSwitchAllowed">pgSwitchAllowed</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.promptGroupSessions">promptGroupSessions</a></code> | <code><a href="#xpander-sdk.PromptGroupSessionsList">PromptGroupSessionsList</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.ready">ready</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.sourceNodes">sourceNodes</a></code> | <code><a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.status">status</a></code> | <code><a href="#xpander-sdk.AgentStatus">AgentStatus</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agent.property.tools">tools</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | *No description.* |

---

##### `hasLocalTools`<sup>Required</sup> <a name="hasLocalTools" id="xpander-sdk.Agent.property.hasLocalTools"></a>

```typescript
public readonly hasLocalTools: boolean;
```

- *Type:* boolean

---

##### `isCustom`<sup>Required</sup> <a name="isCustom" id="xpander-sdk.Agent.property.isCustom"></a>

```typescript
public readonly isCustom: boolean;
```

- *Type:* boolean

---

##### `sourceNodeType`<sup>Required</sup> <a name="sourceNodeType" id="xpander-sdk.Agent.property.sourceNodeType"></a>

```typescript
public readonly sourceNodeType: SourceNodeType;
```

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

---

##### `url`<sup>Required</sup> <a name="url" id="xpander-sdk.Agent.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agent.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

---

##### `graphs`<sup>Required</sup> <a name="graphs" id="xpander-sdk.Agent.property.graphs"></a>

```typescript
public readonly graphs: IGraphItem[];
```

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.Agent.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `localTools`<sup>Required</sup> <a name="localTools" id="xpander-sdk.Agent.property.localTools"></a>

```typescript
public readonly localTools: ILocalTool[];
```

- *Type:* <a href="#xpander-sdk.ILocalTool">ILocalTool</a>[]

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.Agent.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="xpander-sdk.Agent.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

---

##### `pgOas`<sup>Required</sup> <a name="pgOas" id="xpander-sdk.Agent.property.pgOas"></a>

```typescript
public readonly pgOas: IAgentTool[];
```

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

---

##### `pgSwitchAllowed`<sup>Required</sup> <a name="pgSwitchAllowed" id="xpander-sdk.Agent.property.pgSwitchAllowed"></a>

```typescript
public readonly pgSwitchAllowed: boolean;
```

- *Type:* boolean

---

##### `promptGroupSessions`<sup>Required</sup> <a name="promptGroupSessions" id="xpander-sdk.Agent.property.promptGroupSessions"></a>

```typescript
public readonly promptGroupSessions: PromptGroupSessionsList;
```

- *Type:* <a href="#xpander-sdk.PromptGroupSessionsList">PromptGroupSessionsList</a>

---

##### `ready`<sup>Required</sup> <a name="ready" id="xpander-sdk.Agent.property.ready"></a>

```typescript
public readonly ready: boolean;
```

- *Type:* boolean

---

##### `sourceNodes`<sup>Required</sup> <a name="sourceNodes" id="xpander-sdk.Agent.property.sourceNodes"></a>

```typescript
public readonly sourceNodes: ISourceNode[];
```

- *Type:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>[]

---

##### `status`<sup>Required</sup> <a name="status" id="xpander-sdk.Agent.property.status"></a>

```typescript
public readonly status: AgentStatus;
```

- *Type:* <a href="#xpander-sdk.AgentStatus">AgentStatus</a>

---

##### `tools`<sup>Required</sup> <a name="tools" id="xpander-sdk.Agent.property.tools"></a>

```typescript
public readonly tools: IAgentTool[];
```

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

---


### Agents <a name="Agents" id="xpander-sdk.Agents"></a>

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
| <code><a href="#xpander-sdk.Agents.get">get</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agents.getCustomAgent">getCustomAgent</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Agents.list">list</a></code> | *No description.* |

---

##### `get` <a name="get" id="xpander-sdk.Agents.get"></a>

```typescript
public get(agentId: string, sourceNodeType?: SourceNodeType): Agent
```

###### `agentId`<sup>Required</sup> <a name="agentId" id="xpander-sdk.Agents.get.parameter.agentId"></a>

- *Type:* string

---

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agents.get.parameter.sourceNodeType"></a>

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

---

##### `getCustomAgent` <a name="getCustomAgent" id="xpander-sdk.Agents.getCustomAgent"></a>

```typescript
public getCustomAgent(sourceNodeType?: SourceNodeType): Agent
```

###### `sourceNodeType`<sup>Optional</sup> <a name="sourceNodeType" id="xpander-sdk.Agents.getCustomAgent.parameter.sourceNodeType"></a>

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

---

##### `list` <a name="list" id="xpander-sdk.Agents.list"></a>

```typescript
public list(refetch?: boolean): Agent[]
```

###### `refetch`<sup>Optional</sup> <a name="refetch" id="xpander-sdk.Agents.list.parameter.refetch"></a>

- *Type:* boolean

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Agents.property.agentsList">agentsList</a></code> | <code><a href="#xpander-sdk.Agent">Agent</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.Agents.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | *No description.* |

---

##### `agentsList`<sup>Required</sup> <a name="agentsList" id="xpander-sdk.Agents.property.agentsList"></a>

```typescript
public readonly agentsList: Agent[];
```

- *Type:* <a href="#xpander-sdk.Agent">Agent</a>[]

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.Agents.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

---


### AmazonBedrockSupportedModels <a name="AmazonBedrockSupportedModels" id="xpander-sdk.AmazonBedrockSupportedModels"></a>

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
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_5_SONNET_20240620">ANTHROPIC_CLAUDE_3_5_SONNET_20240620</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_HAIKU_20240307">ANTHROPIC_CLAUDE_3_HAIKU_20240307</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R">COHERE_COMMAND_R</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R_PLUS">COHERE_COMMAND_R_PLUS</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_405B_INSTRUCT">META_LLAMA3_1_405B_INSTRUCT</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_70B_INSTRUCT">META_LLAMA3_1_70B_INSTRUCT</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_8B_INSTRUCT">META_LLAMA3_1_8B_INSTRUCT</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2402">MISTRAL_MISTRAL_LARGE_2402</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2407">MISTRAL_MISTRAL_LARGE_2407</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_SMALL_2402">MISTRAL_MISTRAL_SMALL_2402</a></code> | <code>string</code> | *No description.* |

---

##### `ANTHROPIC_CLAUDE_3_5_SONNET_20240620`<sup>Required</sup> <a name="ANTHROPIC_CLAUDE_3_5_SONNET_20240620" id="xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_5_SONNET_20240620"></a>

```typescript
public readonly ANTHROPIC_CLAUDE_3_5_SONNET_20240620: string;
```

- *Type:* string

---

##### `ANTHROPIC_CLAUDE_3_HAIKU_20240307`<sup>Required</sup> <a name="ANTHROPIC_CLAUDE_3_HAIKU_20240307" id="xpander-sdk.AmazonBedrockSupportedModels.property.ANTHROPIC_CLAUDE_3_HAIKU_20240307"></a>

```typescript
public readonly ANTHROPIC_CLAUDE_3_HAIKU_20240307: string;
```

- *Type:* string

---

##### `COHERE_COMMAND_R`<sup>Required</sup> <a name="COHERE_COMMAND_R" id="xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R"></a>

```typescript
public readonly COHERE_COMMAND_R: string;
```

- *Type:* string

---

##### `COHERE_COMMAND_R_PLUS`<sup>Required</sup> <a name="COHERE_COMMAND_R_PLUS" id="xpander-sdk.AmazonBedrockSupportedModels.property.COHERE_COMMAND_R_PLUS"></a>

```typescript
public readonly COHERE_COMMAND_R_PLUS: string;
```

- *Type:* string

---

##### `META_LLAMA3_1_405B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA3_1_405B_INSTRUCT" id="xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_405B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA3_1_405B_INSTRUCT: string;
```

- *Type:* string

---

##### `META_LLAMA3_1_70B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA3_1_70B_INSTRUCT" id="xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_70B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA3_1_70B_INSTRUCT: string;
```

- *Type:* string

---

##### `META_LLAMA3_1_8B_INSTRUCT`<sup>Required</sup> <a name="META_LLAMA3_1_8B_INSTRUCT" id="xpander-sdk.AmazonBedrockSupportedModels.property.META_LLAMA3_1_8B_INSTRUCT"></a>

```typescript
public readonly META_LLAMA3_1_8B_INSTRUCT: string;
```

- *Type:* string

---

##### `MISTRAL_MISTRAL_LARGE_2402`<sup>Required</sup> <a name="MISTRAL_MISTRAL_LARGE_2402" id="xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2402"></a>

```typescript
public readonly MISTRAL_MISTRAL_LARGE_2402: string;
```

- *Type:* string

---

##### `MISTRAL_MISTRAL_LARGE_2407`<sup>Required</sup> <a name="MISTRAL_MISTRAL_LARGE_2407" id="xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_LARGE_2407"></a>

```typescript
public readonly MISTRAL_MISTRAL_LARGE_2407: string;
```

- *Type:* string

---

##### `MISTRAL_MISTRAL_SMALL_2402`<sup>Required</sup> <a name="MISTRAL_MISTRAL_SMALL_2402" id="xpander-sdk.AmazonBedrockSupportedModels.property.MISTRAL_MISTRAL_SMALL_2402"></a>

```typescript
public readonly MISTRAL_MISTRAL_SMALL_2402: string;
```

- *Type:* string

---

### Configuration <a name="Configuration" id="xpander-sdk.Configuration"></a>

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



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.Configuration.property.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Configuration.property.baseUrl">baseUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.Configuration.property.customParams">customParams</a></code> | <code><a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a></code> | *No description.* |
| <code><a href="#xpander-sdk.Configuration.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | *No description.* |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.Configuration.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

---

##### `baseUrl`<sup>Required</sup> <a name="baseUrl" id="xpander-sdk.Configuration.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

---

##### `customParams`<sup>Required</sup> <a name="customParams" id="xpander-sdk.Configuration.property.customParams"></a>

```typescript
public readonly customParams: IXpanderClientCustomParams;
```

- *Type:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>

---

##### `withMetricsReport`<sup>Required</sup> <a name="withMetricsReport" id="xpander-sdk.Configuration.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

---


### NvidiaNIMSupportedModels <a name="NvidiaNIMSupportedModels" id="xpander-sdk.NvidiaNIMSupportedModels"></a>

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
| <code><a href="#xpander-sdk.NvidiaNIMSupportedModels.property.LLAMA_3_1_70B_INSTRUCT">LLAMA_3_1_70B_INSTRUCT</a></code> | <code>string</code> | *No description.* |

---

##### `LLAMA_3_1_70B_INSTRUCT`<sup>Required</sup> <a name="LLAMA_3_1_70B_INSTRUCT" id="xpander-sdk.NvidiaNIMSupportedModels.property.LLAMA_3_1_70B_INSTRUCT"></a>

```typescript
public readonly LLAMA_3_1_70B_INSTRUCT: string;
```

- *Type:* string

---

### OpenAISupportedModels <a name="OpenAISupportedModels" id="xpander-sdk.OpenAISupportedModels"></a>

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
| <code><a href="#xpander-sdk.OpenAISupportedModels.property.GPT_4">GPT_4</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.OpenAISupportedModels.property.GPT_4_O">GPT_4_O</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.OpenAISupportedModels.property.GPT_4_O_MINI">GPT_4_O_MINI</a></code> | <code>string</code> | *No description.* |

---

##### `GPT_4`<sup>Required</sup> <a name="GPT_4" id="xpander-sdk.OpenAISupportedModels.property.GPT_4"></a>

```typescript
public readonly GPT_4: string;
```

- *Type:* string

---

##### `GPT_4_O`<sup>Required</sup> <a name="GPT_4_O" id="xpander-sdk.OpenAISupportedModels.property.GPT_4_O"></a>

```typescript
public readonly GPT_4_O: string;
```

- *Type:* string

---

##### `GPT_4_O_MINI`<sup>Required</sup> <a name="GPT_4_O_MINI" id="xpander-sdk.OpenAISupportedModels.property.GPT_4_O_MINI"></a>

```typescript
public readonly GPT_4_O_MINI: string;
```

- *Type:* string

---

### PromptGroupSession <a name="PromptGroupSession" id="xpander-sdk.PromptGroupSession"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.PromptGroupSession.Initializer"></a>

```typescript
import { PromptGroupSession } from 'xpander-sdk'

new PromptGroupSession(pg: IGraphItem, lastNode?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSession.Initializer.parameter.pg">pg</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a></code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSession.Initializer.parameter.lastNode">lastNode</a></code> | <code>string</code> | *No description.* |

---

##### `pg`<sup>Required</sup> <a name="pg" id="xpander-sdk.PromptGroupSession.Initializer.parameter.pg"></a>

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>

---

##### `lastNode`<sup>Optional</sup> <a name="lastNode" id="xpander-sdk.PromptGroupSession.Initializer.parameter.lastNode"></a>

- *Type:* string

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSession.property.lastNode">lastNode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSession.property.pg">pg</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a></code> | *No description.* |

---

##### `lastNode`<sup>Required</sup> <a name="lastNode" id="xpander-sdk.PromptGroupSession.property.lastNode"></a>

```typescript
public readonly lastNode: string;
```

- *Type:* string

---

##### `pg`<sup>Required</sup> <a name="pg" id="xpander-sdk.PromptGroupSession.property.pg"></a>

```typescript
public readonly pg: IGraphItem;
```

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>

---


### PromptGroupSessionsList <a name="PromptGroupSessionsList" id="xpander-sdk.PromptGroupSessionsList"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.PromptGroupSessionsList.Initializer"></a>

```typescript
import { PromptGroupSessionsList } from 'xpander-sdk'

new PromptGroupSessionsList(graphs: IGraphItem[], pgOas: IAgentTool[], sessions?: PromptGroupSession[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.Initializer.parameter.graphs">graphs</a></code> | <code><a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.Initializer.parameter.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.Initializer.parameter.sessions">sessions</a></code> | <code><a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a>[]</code> | *No description.* |

---

##### `graphs`<sup>Required</sup> <a name="graphs" id="xpander-sdk.PromptGroupSessionsList.Initializer.parameter.graphs"></a>

- *Type:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>[]

---

##### `pgOas`<sup>Required</sup> <a name="pgOas" id="xpander-sdk.PromptGroupSessionsList.Initializer.parameter.pgOas"></a>

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

---

##### `sessions`<sup>Optional</sup> <a name="sessions" id="xpander-sdk.PromptGroupSessionsList.Initializer.parameter.sessions"></a>

- *Type:* <a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a>[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.getToolsForActiveSession">getToolsForActiveSession</a></code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.resetSessions">resetSessions</a></code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.startPgSession">startPgSession</a></code> | *No description.* |

---

##### `getToolsForActiveSession` <a name="getToolsForActiveSession" id="xpander-sdk.PromptGroupSessionsList.getToolsForActiveSession"></a>

```typescript
public getToolsForActiveSession(allTools: any[]): any[]
```

###### `allTools`<sup>Required</sup> <a name="allTools" id="xpander-sdk.PromptGroupSessionsList.getToolsForActiveSession.parameter.allTools"></a>

- *Type:* any[]

---

##### `resetSessions` <a name="resetSessions" id="xpander-sdk.PromptGroupSessionsList.resetSessions"></a>

```typescript
public resetSessions(): void
```

##### `startPgSession` <a name="startPgSession" id="xpander-sdk.PromptGroupSessionsList.startPgSession"></a>

```typescript
public startPgSession(tool: IToolCall): string
```

###### `tool`<sup>Required</sup> <a name="tool" id="xpander-sdk.PromptGroupSessionsList.startPgSession.parameter.tool"></a>

- *Type:* <a href="#xpander-sdk.IToolCall">IToolCall</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.property.activeSession">activeSession</a></code> | <code><a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a></code> | *No description.* |
| <code><a href="#xpander-sdk.PromptGroupSessionsList.property.pgOas">pgOas</a></code> | <code><a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]</code> | *No description.* |

---

##### `activeSession`<sup>Required</sup> <a name="activeSession" id="xpander-sdk.PromptGroupSessionsList.property.activeSession"></a>

```typescript
public readonly activeSession: PromptGroupSession;
```

- *Type:* <a href="#xpander-sdk.PromptGroupSession">PromptGroupSession</a>

---

##### `pgOas`<sup>Required</sup> <a name="pgOas" id="xpander-sdk.PromptGroupSessionsList.property.pgOas"></a>

```typescript
public readonly pgOas: IAgentTool[];
```

- *Type:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>[]

---


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

Class representing the XpanderClient used to interact with xpanderAI tools.

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

new XpanderClient(__0: IXpanderClientParams)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.__0">__0</a></code> | <code><a href="#xpander-sdk.IXpanderClientParams">IXpanderClientParams</a></code> | - An object containing the parameters for the XpanderClient. |

---

##### `__0`<sup>Required</sup> <a name="__0" id="xpander-sdk.XpanderClient.Initializer.parameter.__0"></a>

- *Type:* <a href="#xpander-sdk.IXpanderClientParams">IXpanderClientParams</a>

An object containing the parameters for the XpanderClient.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.extractToolCalls">extractToolCalls</a></code> | *No description.* |

---

##### `extractToolCalls` <a name="extractToolCalls" id="xpander-sdk.XpanderClient.extractToolCalls"></a>

```typescript
public extractToolCalls(llmResponse: any, llmProvider?: LLMProvider): IToolCall[]
```

###### `llmResponse`<sup>Required</sup> <a name="llmResponse" id="xpander-sdk.XpanderClient.extractToolCalls.parameter.llmResponse"></a>

- *Type:* any

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.extractToolCalls.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.agents">agents</a></code> | <code><a href="#xpander-sdk.Agents">Agents</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.configuration">configuration</a></code> | <code><a href="#xpander-sdk.Configuration">Configuration</a></code> | *No description.* |

---

##### `agents`<sup>Required</sup> <a name="agents" id="xpander-sdk.XpanderClient.property.agents"></a>

```typescript
public readonly agents: Agents;
```

- *Type:* <a href="#xpander-sdk.Agents">Agents</a>

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="xpander-sdk.XpanderClient.property.configuration"></a>

```typescript
public readonly configuration: Configuration;
```

- *Type:* <a href="#xpander-sdk.Configuration">Configuration</a>

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IAgentTool <a name="IAgentTool" id="xpander-sdk.IAgentTool"></a>

- *Implemented By:* <a href="#xpander-sdk.IAgentTool">IAgentTool</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IAgentTool.property.functionDescription">functionDescription</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.method">method</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.parameters">parameters</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.pathParams">pathParams</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.queryParams">queryParams</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IAgentTool.property.rawDescription">rawDescription</a></code> | <code>string</code> | *No description.* |

---

##### `functionDescription`<sup>Required</sup> <a name="functionDescription" id="xpander-sdk.IAgentTool.property.functionDescription"></a>

```typescript
public readonly functionDescription: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.IAgentTool.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `method`<sup>Required</sup> <a name="method" id="xpander-sdk.IAgentTool.property.method"></a>

```typescript
public readonly method: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IAgentTool.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="xpander-sdk.IAgentTool.property.parameters"></a>

```typescript
public readonly parameters: any;
```

- *Type:* any

---

##### `path`<sup>Required</sup> <a name="path" id="xpander-sdk.IAgentTool.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `pathParams`<sup>Required</sup> <a name="pathParams" id="xpander-sdk.IAgentTool.property.pathParams"></a>

```typescript
public readonly pathParams: any;
```

- *Type:* any

---

##### `queryParams`<sup>Required</sup> <a name="queryParams" id="xpander-sdk.IAgentTool.property.queryParams"></a>

```typescript
public readonly queryParams: any;
```

- *Type:* any

---

##### `rawDescription`<sup>Required</sup> <a name="rawDescription" id="xpander-sdk.IAgentTool.property.rawDescription"></a>

```typescript
public readonly rawDescription: string;
```

- *Type:* string

---

### IBedrockTool <a name="IBedrockTool" id="xpander-sdk.IBedrockTool"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockTool">IBedrockTool</a>

Interface representing a Bedrock tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockTool.property.toolSpec">toolSpec</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a></code> | The tool specification of the Bedrock tool. |
| <code><a href="#xpander-sdk.IBedrockTool.property.execute">execute</a></code> | <code>any</code> | Function to execute the Bedrock tool. |

---

##### `toolSpec`<sup>Required</sup> <a name="toolSpec" id="xpander-sdk.IBedrockTool.property.toolSpec"></a>

```typescript
public readonly toolSpec: IBedrockToolSpec;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>

The tool specification of the Bedrock tool.

---

##### `execute`<sup>Optional</sup> <a name="execute" id="xpander-sdk.IBedrockTool.property.execute"></a>

```typescript
public readonly execute: any;
```

- *Type:* any

Function to execute the Bedrock tool.

---

### IBedrockToolOutput <a name="IBedrockToolOutput" id="xpander-sdk.IBedrockToolOutput"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockToolOutput">IBedrockToolOutput</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolOutput.property.toolSpec">toolSpec</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a></code> | The tool specification of the Bedrock tool. |
| <code><a href="#xpander-sdk.IBedrockToolOutput.property.execute">execute</a></code> | <code>any</code> | Function to execute the Bedrock tool. |

---

##### `toolSpec`<sup>Required</sup> <a name="toolSpec" id="xpander-sdk.IBedrockToolOutput.property.toolSpec"></a>

```typescript
public readonly toolSpec: IBedrockToolSpec;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>

The tool specification of the Bedrock tool.

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

Interface representing a Bedrock tool specification.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.description">description</a></code> | <code>string</code> | The description of the Bedrock tool. |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.inputSchema">inputSchema</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a></code> | Input schema of the Bedrock tool. |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.name">name</a></code> | <code>string</code> | The name of the Bedrock tool. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.IBedrockToolSpec.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description of the Bedrock tool.

---

##### `inputSchema`<sup>Required</sup> <a name="inputSchema" id="xpander-sdk.IBedrockToolSpec.property.inputSchema"></a>

```typescript
public readonly inputSchema: IBedrockToolSpecInputSchema;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a>

Input schema of the Bedrock tool.

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

Interface representing the input schema for a Bedrock tool specification.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolSpecInputSchema.property.json">json</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | JSON schema of the tool parameters. |

---

##### `json`<sup>Required</sup> <a name="json" id="xpander-sdk.IBedrockToolSpecInputSchema.property.json"></a>

```typescript
public readonly json: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

JSON schema of the tool parameters.

---

### IConfiguration <a name="IConfiguration" id="xpander-sdk.IConfiguration"></a>

- *Implemented By:* <a href="#xpander-sdk.IConfiguration">IConfiguration</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IConfiguration.property.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IConfiguration.property.customParams">customParams</a></code> | <code><a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IConfiguration.property.baseUrl">baseUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IConfiguration.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | *No description.* |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.IConfiguration.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

---

##### `customParams`<sup>Required</sup> <a name="customParams" id="xpander-sdk.IConfiguration.property.customParams"></a>

```typescript
public readonly customParams: IXpanderClientCustomParams;
```

- *Type:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="xpander-sdk.IConfiguration.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

---

##### `withMetricsReport`<sup>Optional</sup> <a name="withMetricsReport" id="xpander-sdk.IConfiguration.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

---

### IGraphItem <a name="IGraphItem" id="xpander-sdk.IGraphItem"></a>

- *Implemented By:* <a href="#xpander-sdk.IGraphItem">IGraphItem</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IGraphItem.property.enrichedPrompts">enrichedPrompts</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IGraphItem.property.graph">graph</a></code> | <code>{[ key: string ]: string[]}</code> | *No description.* |
| <code><a href="#xpander-sdk.IGraphItem.property.promptGroupId">promptGroupId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IGraphItem.property.prompts">prompts</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IGraphItem.property.startingNode">startingNode</a></code> | <code>string</code> | *No description.* |

---

##### `enrichedPrompts`<sup>Required</sup> <a name="enrichedPrompts" id="xpander-sdk.IGraphItem.property.enrichedPrompts"></a>

```typescript
public readonly enrichedPrompts: string[];
```

- *Type:* string[]

---

##### `graph`<sup>Required</sup> <a name="graph" id="xpander-sdk.IGraphItem.property.graph"></a>

```typescript
public readonly graph: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

---

##### `promptGroupId`<sup>Required</sup> <a name="promptGroupId" id="xpander-sdk.IGraphItem.property.promptGroupId"></a>

```typescript
public readonly promptGroupId: string;
```

- *Type:* string

---

##### `prompts`<sup>Required</sup> <a name="prompts" id="xpander-sdk.IGraphItem.property.prompts"></a>

```typescript
public readonly prompts: string[];
```

- *Type:* string[]

---

##### `startingNode`<sup>Required</sup> <a name="startingNode" id="xpander-sdk.IGraphItem.property.startingNode"></a>

```typescript
public readonly startingNode: string;
```

- *Type:* string

---

### ILocalTool <a name="ILocalTool" id="xpander-sdk.ILocalTool"></a>

- *Implemented By:* <a href="#xpander-sdk.ILocalTool">ILocalTool</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ILocalTool.property.function">function</a></code> | <code><a href="#xpander-sdk.ILocalToolFunction">ILocalToolFunction</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ILocalTool.property.type">type</a></code> | <code>string</code> | *No description.* |

---

##### `function`<sup>Required</sup> <a name="function" id="xpander-sdk.ILocalTool.property.function"></a>

```typescript
public readonly function: ILocalToolFunction;
```

- *Type:* <a href="#xpander-sdk.ILocalToolFunction">ILocalToolFunction</a>

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.ILocalTool.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

### ILocalToolFunction <a name="ILocalToolFunction" id="xpander-sdk.ILocalToolFunction"></a>

- *Implemented By:* <a href="#xpander-sdk.ILocalToolFunction">ILocalToolFunction</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ILocalToolFunction.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ILocalToolFunction.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ILocalToolFunction.property.parameters">parameters</a></code> | <code>any</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.ILocalToolFunction.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ILocalToolFunction.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="xpander-sdk.ILocalToolFunction.property.parameters"></a>

```typescript
public readonly parameters: any;
```

- *Type:* any

---

### IOpenAIToolFunctionOutput <a name="IOpenAIToolFunctionOutput" id="xpander-sdk.IOpenAIToolFunctionOutput"></a>

- *Implemented By:* <a href="#xpander-sdk.IOpenAIToolFunctionOutput">IOpenAIToolFunctionOutput</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.description">description</a></code> | <code>string</code> | The description of the tool. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.name">name</a></code> | <code>string</code> | The name of the tool. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.execute">execute</a></code> | <code>any</code> | Function to execute the Bedrock tool. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.func">func</a></code> | <code>any</code> | Function to execute the tool. |
| <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput.property.parameters">parameters</a></code> | <code><a href="#xpander-sdk.IToolParameter">IToolParameter</a></code> | Parameters of the tool. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.IOpenAIToolFunctionOutput.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description of the tool.

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IOpenAIToolFunctionOutput.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the tool.

---

##### `execute`<sup>Optional</sup> <a name="execute" id="xpander-sdk.IOpenAIToolFunctionOutput.property.execute"></a>

```typescript
public readonly execute: any;
```

- *Type:* any

Function to execute the Bedrock tool.

---

##### `func`<sup>Optional</sup> <a name="func" id="xpander-sdk.IOpenAIToolFunctionOutput.property.func"></a>

```typescript
public readonly func: any;
```

- *Type:* any

Function to execute the tool.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.IOpenAIToolFunctionOutput.property.parameters"></a>

```typescript
public readonly parameters: IToolParameter;
```

- *Type:* <a href="#xpander-sdk.IToolParameter">IToolParameter</a>

Parameters of the tool.

---

### IOpenAIToolOutput <a name="IOpenAIToolOutput" id="xpander-sdk.IOpenAIToolOutput"></a>

- *Implemented By:* <a href="#xpander-sdk.IOpenAIToolOutput">IOpenAIToolOutput</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IOpenAIToolOutput.property.function">function</a></code> | <code><a href="#xpander-sdk.IOpenAIToolFunctionOutput">IOpenAIToolFunctionOutput</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IOpenAIToolOutput.property.type">type</a></code> | <code>string</code> | *No description.* |

---

##### `function`<sup>Required</sup> <a name="function" id="xpander-sdk.IOpenAIToolOutput.property.function"></a>

```typescript
public readonly function: IOpenAIToolFunctionOutput;
```

- *Type:* <a href="#xpander-sdk.IOpenAIToolFunctionOutput">IOpenAIToolFunctionOutput</a>

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IOpenAIToolOutput.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

### ISourceNode <a name="ISourceNode" id="xpander-sdk.ISourceNode"></a>

- *Implemented By:* <a href="#xpander-sdk.ISourceNode">ISourceNode</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ISourceNode.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ISourceNode.property.metadata">metadata</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ISourceNode.property.pgSwitchAllowed">pgSwitchAllowed</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.ISourceNode.property.targets">targets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.ISourceNode.property.type">type</a></code> | <code><a href="#xpander-sdk.SourceNodeType">SourceNodeType</a></code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.ISourceNode.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `metadata`<sup>Required</sup> <a name="metadata" id="xpander-sdk.ISourceNode.property.metadata"></a>

```typescript
public readonly metadata: any;
```

- *Type:* any

---

##### `pgSwitchAllowed`<sup>Required</sup> <a name="pgSwitchAllowed" id="xpander-sdk.ISourceNode.property.pgSwitchAllowed"></a>

```typescript
public readonly pgSwitchAllowed: boolean;
```

- *Type:* boolean

---

##### `targets`<sup>Required</sup> <a name="targets" id="xpander-sdk.ISourceNode.property.targets"></a>

```typescript
public readonly targets: string[];
```

- *Type:* string[]

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.ISourceNode.property.type"></a>

```typescript
public readonly type: SourceNodeType;
```

- *Type:* <a href="#xpander-sdk.SourceNodeType">SourceNodeType</a>

---

### ITool <a name="ITool" id="xpander-sdk.ITool"></a>

- *Implemented By:* <a href="#xpander-sdk.ITool">ITool</a>

Interface representing a tool.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ITool.property.description">description</a></code> | <code>string</code> | The description of the tool. |
| <code><a href="#xpander-sdk.ITool.property.name">name</a></code> | <code>string</code> | The name of the tool. |
| <code><a href="#xpander-sdk.ITool.property.func">func</a></code> | <code>any</code> | Function to execute the tool. |
| <code><a href="#xpander-sdk.ITool.property.parameters">parameters</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | Parameters of the tool. |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.ITool.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description of the tool.

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

Function to execute the tool.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.ITool.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

Parameters of the tool.

---

### IToolCall <a name="IToolCall" id="xpander-sdk.IToolCall"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolCall">IToolCall</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolCall.property.isPg">isPg</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCall.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCall.property.payload">payload</a></code> | <code><a href="#xpander-sdk.IToolCallPayload">IToolCallPayload</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCall.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCall.property.type">type</a></code> | <code><a href="#xpander-sdk.ToolCallType">ToolCallType</a></code> | *No description.* |

---

##### `isPg`<sup>Required</sup> <a name="isPg" id="xpander-sdk.IToolCall.property.isPg"></a>

```typescript
public readonly isPg: boolean;
```

- *Type:* boolean

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IToolCall.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `payload`<sup>Required</sup> <a name="payload" id="xpander-sdk.IToolCall.property.payload"></a>

```typescript
public readonly payload: IToolCallPayload;
```

- *Type:* <a href="#xpander-sdk.IToolCallPayload">IToolCallPayload</a>

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.IToolCall.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IToolCall.property.type"></a>

```typescript
public readonly type: ToolCallType;
```

- *Type:* <a href="#xpander-sdk.ToolCallType">ToolCallType</a>

---

### IToolCallPayload <a name="IToolCallPayload" id="xpander-sdk.IToolCallPayload"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolCallPayload">IToolCallPayload</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolCallPayload.property.bodyParams">bodyParams</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallPayload.property.headers">headers</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallPayload.property.pathParams">pathParams</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallPayload.property.queryParams">queryParams</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `bodyParams`<sup>Required</sup> <a name="bodyParams" id="xpander-sdk.IToolCallPayload.property.bodyParams"></a>

```typescript
public readonly bodyParams: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `headers`<sup>Required</sup> <a name="headers" id="xpander-sdk.IToolCallPayload.property.headers"></a>

```typescript
public readonly headers: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `pathParams`<sup>Required</sup> <a name="pathParams" id="xpander-sdk.IToolCallPayload.property.pathParams"></a>

```typescript
public readonly pathParams: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `queryParams`<sup>Required</sup> <a name="queryParams" id="xpander-sdk.IToolCallPayload.property.queryParams"></a>

```typescript
public readonly queryParams: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

### IToolCallResult <a name="IToolCallResult" id="xpander-sdk.IToolCallResult"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolCallResult">IToolCallResult</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolCallResult.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallResult.property.payload">payload</a></code> | <code><a href="#xpander-sdk.IToolCallPayload">IToolCallPayload</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallResult.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallResult.property.isError">isError</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallResult.property.isSuccess">isSuccess</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallResult.property.result">result</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolCallResult.property.statusCode">statusCode</a></code> | <code>number</code> | *No description.* |

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="xpander-sdk.IToolCallResult.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---

##### `payload`<sup>Required</sup> <a name="payload" id="xpander-sdk.IToolCallResult.property.payload"></a>

```typescript
public readonly payload: IToolCallPayload;
```

- *Type:* <a href="#xpander-sdk.IToolCallPayload">IToolCallPayload</a>

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.IToolCallResult.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `isError`<sup>Optional</sup> <a name="isError" id="xpander-sdk.IToolCallResult.property.isError"></a>

```typescript
public readonly isError: boolean;
```

- *Type:* boolean

---

##### `isSuccess`<sup>Optional</sup> <a name="isSuccess" id="xpander-sdk.IToolCallResult.property.isSuccess"></a>

```typescript
public readonly isSuccess: boolean;
```

- *Type:* boolean

---

##### `result`<sup>Optional</sup> <a name="result" id="xpander-sdk.IToolCallResult.property.result"></a>

```typescript
public readonly result: any;
```

- *Type:* any

---

##### `statusCode`<sup>Optional</sup> <a name="statusCode" id="xpander-sdk.IToolCallResult.property.statusCode"></a>

```typescript
public readonly statusCode: number;
```

- *Type:* number

---

### IToolInstructions <a name="IToolInstructions" id="xpander-sdk.IToolInstructions"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolInstructions">IToolInstructions</a>

Interface representing tool instructions.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolInstructions.property.functionDescription">functionDescription</a></code> | <code>string</code> | The description of the tool function. |
| <code><a href="#xpander-sdk.IToolInstructions.property.id">id</a></code> | <code>string</code> | The ID of the tool. |
| <code><a href="#xpander-sdk.IToolInstructions.property.parameters">parameters</a></code> | <code>any</code> | The parameters for the tool. |

---

##### `functionDescription`<sup>Required</sup> <a name="functionDescription" id="xpander-sdk.IToolInstructions.property.functionDescription"></a>

```typescript
public readonly functionDescription: string;
```

- *Type:* string

The description of the tool function.

---

##### `id`<sup>Required</sup> <a name="id" id="xpander-sdk.IToolInstructions.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The ID of the tool.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.IToolInstructions.property.parameters"></a>

```typescript
public readonly parameters: any;
```

- *Type:* any

The parameters for the tool.

---

### IToolParameter <a name="IToolParameter" id="xpander-sdk.IToolParameter"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolParameter">IToolParameter</a>

Interface representing a tool parameter.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolParameter.property.properties">properties</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | Properties of the parameter. |
| <code><a href="#xpander-sdk.IToolParameter.property.type">type</a></code> | <code>string</code> | The type of the parameter. |
| <code><a href="#xpander-sdk.IToolParameter.property.required">required</a></code> | <code>string[]</code> | List of required properties. |

---

##### `properties`<sup>Required</sup> <a name="properties" id="xpander-sdk.IToolParameter.property.properties"></a>

```typescript
public readonly properties: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

Properties of the parameter.

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IToolParameter.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The type of the parameter.

---

##### `required`<sup>Optional</sup> <a name="required" id="xpander-sdk.IToolParameter.property.required"></a>

```typescript
public readonly required: string[];
```

- *Type:* string[]

List of required properties.

---

### IXpanderClientCustomParams <a name="IXpanderClientCustomParams" id="xpander-sdk.IXpanderClientCustomParams"></a>

- *Implemented By:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IXpanderClientCustomParams.property.connectors">connectors</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#xpander-sdk.IXpanderClientCustomParams.property.organizationId">organizationId</a></code> | <code>string</code> | *No description.* |

---

##### `connectors`<sup>Optional</sup> <a name="connectors" id="xpander-sdk.IXpanderClientCustomParams.property.connectors"></a>

```typescript
public readonly connectors: any[];
```

- *Type:* any[]

---

##### `organizationId`<sup>Optional</sup> <a name="organizationId" id="xpander-sdk.IXpanderClientCustomParams.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

---

### IXpanderClientParams <a name="IXpanderClientParams" id="xpander-sdk.IXpanderClientParams"></a>

- *Implemented By:* <a href="#xpander-sdk.IXpanderClientParams">IXpanderClientParams</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IXpanderClientParams.property.apiKey">apiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IXpanderClientParams.property.baseUrl">baseUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IXpanderClientParams.property.customParams">customParams</a></code> | <code><a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IXpanderClientParams.property.withMetricsReport">withMetricsReport</a></code> | <code>boolean</code> | *No description.* |

---

##### `apiKey`<sup>Required</sup> <a name="apiKey" id="xpander-sdk.IXpanderClientParams.property.apiKey"></a>

```typescript
public readonly apiKey: string;
```

- *Type:* string

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="xpander-sdk.IXpanderClientParams.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

---

##### `customParams`<sup>Optional</sup> <a name="customParams" id="xpander-sdk.IXpanderClientParams.property.customParams"></a>

```typescript
public readonly customParams: IXpanderClientCustomParams;
```

- *Type:* <a href="#xpander-sdk.IXpanderClientCustomParams">IXpanderClientCustomParams</a>

---

##### `withMetricsReport`<sup>Optional</sup> <a name="withMetricsReport" id="xpander-sdk.IXpanderClientParams.property.withMetricsReport"></a>

```typescript
public readonly withMetricsReport: boolean;
```

- *Type:* boolean

---

## Enums <a name="Enums" id="Enums"></a>

### AgentStatus <a name="AgentStatus" id="xpander-sdk.AgentStatus"></a>

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

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMProvider.LANG_CHAIN">LANG_CHAIN</a></code> | Represents the 'langchain' provider. |
| <code><a href="#xpander-sdk.LLMProvider.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai' provider. |
| <code><a href="#xpander-sdk.LLMProvider.NVIDIA_NIM">NVIDIA_NIM</a></code> | Represents the 'nvidiaNim' provider. |
| <code><a href="#xpander-sdk.LLMProvider.AMAZON_BEDROCK">AMAZON_BEDROCK</a></code> | Represents the 'amazonBedrock' provider. |

---

##### `LANG_CHAIN` <a name="LANG_CHAIN" id="xpander-sdk.LLMProvider.LANG_CHAIN"></a>

Represents the 'langchain' provider.

---


##### `OPEN_AI` <a name="OPEN_AI" id="xpander-sdk.LLMProvider.OPEN_AI"></a>

Represents the 'openai' provider.

---


##### `NVIDIA_NIM` <a name="NVIDIA_NIM" id="xpander-sdk.LLMProvider.NVIDIA_NIM"></a>

Represents the 'nvidiaNim' provider.

---


##### `AMAZON_BEDROCK` <a name="AMAZON_BEDROCK" id="xpander-sdk.LLMProvider.AMAZON_BEDROCK"></a>

Represents the 'amazonBedrock' provider.

---


### SourceNodeType <a name="SourceNodeType" id="xpander-sdk.SourceNodeType"></a>

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

