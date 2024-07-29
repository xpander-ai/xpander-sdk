# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### ToolResponse <a name="ToolResponse" id="xpander-sdk.ToolResponse"></a>

- *Implements:* <a href="#xpander-sdk.IToolResponse">IToolResponse</a>

#### Initializers <a name="Initializers" id="xpander-sdk.ToolResponse.Initializer"></a>

```typescript
import { ToolResponse } from 'xpander-sdk'

new ToolResponse(toolCallId: string, role: string, name: string, responseMessage: string, filteredTool: object, payloadProperty1?: string, payloadProperty2?: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.role">role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.responseMessage">responseMessage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.filteredTool">filteredTool</a></code> | <code>object</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1">payloadProperty1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2">payloadProperty2</a></code> | <code>number</code> | *No description.* |

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.ToolResponse.Initializer.parameter.toolCallId"></a>

- *Type:* string

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.ToolResponse.Initializer.parameter.role"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolResponse.Initializer.parameter.name"></a>

- *Type:* string

---

##### `responseMessage`<sup>Required</sup> <a name="responseMessage" id="xpander-sdk.ToolResponse.Initializer.parameter.responseMessage"></a>

- *Type:* string

---

##### `filteredTool`<sup>Required</sup> <a name="filteredTool" id="xpander-sdk.ToolResponse.Initializer.parameter.filteredTool"></a>

- *Type:* object

---

##### `payloadProperty1`<sup>Optional</sup> <a name="payloadProperty1" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1"></a>

- *Type:* string

---

##### `payloadProperty2`<sup>Optional</sup> <a name="payloadProperty2" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2"></a>

- *Type:* number

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.buildMessage">buildMessage</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.toJSON">toJSON</a></code> | *No description.* |

---

##### `buildMessage` <a name="buildMessage" id="xpander-sdk.ToolResponse.buildMessage"></a>

```typescript
public buildMessage(): string
```

##### `toJSON` <a name="toJSON" id="xpander-sdk.ToolResponse.toJSON"></a>

```typescript
public toJSON(): object
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.fromJSON">fromJSON</a></code> | *No description.* |

---

##### `fromJSON` <a name="fromJSON" id="xpander-sdk.ToolResponse.fromJSON"></a>

```typescript
import { ToolResponse } from 'xpander-sdk'

ToolResponse.fromJSON(json: any)
```

###### `json`<sup>Required</sup> <a name="json" id="xpander-sdk.ToolResponse.fromJSON.parameter.json"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.property.filteredTool">filteredTool</a></code> | <code>object</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.responseMessage">responseMessage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.role">role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty1">payloadProperty1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty2">payloadProperty2</a></code> | <code>number</code> | *No description.* |

---

##### `filteredTool`<sup>Required</sup> <a name="filteredTool" id="xpander-sdk.ToolResponse.property.filteredTool"></a>

```typescript
public readonly filteredTool: object;
```

- *Type:* object

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolResponse.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `responseMessage`<sup>Required</sup> <a name="responseMessage" id="xpander-sdk.ToolResponse.property.responseMessage"></a>

```typescript
public readonly responseMessage: string;
```

- *Type:* string

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.ToolResponse.property.role"></a>

```typescript
public readonly role: string;
```

- *Type:* string

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.ToolResponse.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `payloadProperty1`<sup>Optional</sup> <a name="payloadProperty1" id="xpander-sdk.ToolResponse.property.payloadProperty1"></a>

```typescript
public readonly payloadProperty1: string;
```

- *Type:* string

---

##### `payloadProperty2`<sup>Optional</sup> <a name="payloadProperty2" id="xpander-sdk.ToolResponse.property.payloadProperty2"></a>

```typescript
public readonly payloadProperty2: number;
```

- *Type:* number

---


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

new XpanderClient(agentKey: string, agentUrl: string, llmProvider: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">agentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">agentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.llmProvider">llmProvider</a></code> | <code>string</code> | *No description.* |

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* string

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* string

---

##### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.Initializer.parameter.llmProvider"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.loadXpanderTools">loadXpanderTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.tools">tools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.xpanderToolCall">xpanderToolCall</a></code> | *No description.* |

---

##### `loadXpanderTools` <a name="loadXpanderTools" id="xpander-sdk.XpanderClient.loadXpanderTools"></a>

```typescript
public loadXpanderTools(): any[]
```

##### `tools` <a name="tools" id="xpander-sdk.XpanderClient.tools"></a>

```typescript
public tools(llmProvider?: string): ITool[] | IBedrockTool[]
```

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.tools.parameter.llmProvider"></a>

- *Type:* string

---

##### `xpanderToolCall` <a name="xpanderToolCall" id="xpander-sdk.XpanderClient.xpanderToolCall"></a>

```typescript
public xpanderToolCall(toolSelectorResponse: any, llmProvider?: string): ToolResponse[]
```

###### `toolSelectorResponse`<sup>Required</sup> <a name="toolSelectorResponse" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.toolSelectorResponse"></a>

- *Type:* any

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.llmProvider"></a>

- *Type:* string

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.validProviders">validProviders</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.supportedModels">supportedModels</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.toolsNamesMapping">toolsNamesMapping</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentKey">agentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentUrl">agentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.toolsCache">toolsCache</a></code> | <code>any</code> | *No description.* |

---

##### `validProviders`<sup>Required</sup> <a name="validProviders" id="xpander-sdk.XpanderClient.property.validProviders"></a>

```typescript
public readonly validProviders: string[];
```

- *Type:* string[]

---

##### `supportedModels`<sup>Required</sup> <a name="supportedModels" id="xpander-sdk.XpanderClient.property.supportedModels"></a>

```typescript
public readonly supportedModels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `toolsNamesMapping`<sup>Required</sup> <a name="toolsNamesMapping" id="xpander-sdk.XpanderClient.property.toolsNamesMapping"></a>

```typescript
public readonly toolsNamesMapping: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.property.agentKey"></a>

```typescript
public readonly agentKey: string;
```

- *Type:* string

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.property.agentUrl"></a>

```typescript
public readonly agentUrl: string;
```

- *Type:* string

---

##### `toolsCache`<sup>Required</sup> <a name="toolsCache" id="xpander-sdk.XpanderClient.property.toolsCache"></a>

```typescript
public readonly toolsCache: any;
```

- *Type:* any

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IBedrockTool <a name="IBedrockTool" id="xpander-sdk.IBedrockTool"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockTool">IBedrockTool</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockTool.property.toolSpec">toolSpec</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IBedrockTool.property.execute">execute</a></code> | <code>any</code> | *No description.* |

---

##### `toolSpec`<sup>Required</sup> <a name="toolSpec" id="xpander-sdk.IBedrockTool.property.toolSpec"></a>

```typescript
public readonly toolSpec: IBedrockToolSpec;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>

---

##### `execute`<sup>Optional</sup> <a name="execute" id="xpander-sdk.IBedrockTool.property.execute"></a>

```typescript
public readonly execute: any;
```

- *Type:* any

---

### IBedrockToolSpec <a name="IBedrockToolSpec" id="xpander-sdk.IBedrockToolSpec"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockToolSpec">IBedrockToolSpec</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.inputSchema">inputSchema</a></code> | <code><a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a></code> | *No description.* |
| <code><a href="#xpander-sdk.IBedrockToolSpec.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.IBedrockToolSpec.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `inputSchema`<sup>Required</sup> <a name="inputSchema" id="xpander-sdk.IBedrockToolSpec.property.inputSchema"></a>

```typescript
public readonly inputSchema: IBedrockToolSpecInputSchema;
```

- *Type:* <a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a>

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IBedrockToolSpec.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

### IBedrockToolSpecInputSchema <a name="IBedrockToolSpecInputSchema" id="xpander-sdk.IBedrockToolSpecInputSchema"></a>

- *Implemented By:* <a href="#xpander-sdk.IBedrockToolSpecInputSchema">IBedrockToolSpecInputSchema</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IBedrockToolSpecInputSchema.property.json">json</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | *No description.* |

---

##### `json`<sup>Required</sup> <a name="json" id="xpander-sdk.IBedrockToolSpecInputSchema.property.json"></a>

```typescript
public readonly json: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

---

### ILLMProviderHandler <a name="ILLMProviderHandler" id="xpander-sdk.ILLMProviderHandler"></a>

- *Implemented By:* <a href="#xpander-sdk.ILLMProviderHandler">ILLMProviderHandler</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ILLMProviderHandler.getTools">getTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ILLMProviderHandler.invokeTools">invokeTools</a></code> | *No description.* |

---

##### `getTools` <a name="getTools" id="xpander-sdk.ILLMProviderHandler.getTools"></a>

```typescript
public getTools(functionize?: boolean): ITool[]
```

###### `functionize`<sup>Optional</sup> <a name="functionize" id="xpander-sdk.ILLMProviderHandler.getTools.parameter.functionize"></a>

- *Type:* boolean

---

##### `invokeTools` <a name="invokeTools" id="xpander-sdk.ILLMProviderHandler.invokeTools"></a>

```typescript
public invokeTools(toolSelectorResponse: any): any
```

###### `toolSelectorResponse`<sup>Required</sup> <a name="toolSelectorResponse" id="xpander-sdk.ILLMProviderHandler.invokeTools.parameter.toolSelectorResponse"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ILLMProviderHandler.property.toolsNamesMapping">toolsNamesMapping</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `toolsNamesMapping`<sup>Optional</sup> <a name="toolsNamesMapping" id="xpander-sdk.ILLMProviderHandler.property.toolsNamesMapping"></a>

```typescript
public readonly toolsNamesMapping: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

### IMessage <a name="IMessage" id="xpander-sdk.IMessage"></a>

- *Implemented By:* <a href="#xpander-sdk.IMessage">IMessage</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IMessage.property.content">content</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IMessage.property.role">role</a></code> | <code>string</code> | *No description.* |

---

##### `content`<sup>Required</sup> <a name="content" id="xpander-sdk.IMessage.property.content"></a>

```typescript
public readonly content: string;
```

- *Type:* string

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.IMessage.property.role"></a>

```typescript
public readonly role: string;
```

- *Type:* string

---

### ITool <a name="ITool" id="xpander-sdk.ITool"></a>

- *Implemented By:* <a href="#xpander-sdk.ITool">ITool</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ITool.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ITool.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ITool.property.func">func</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ITool.property.parameters">parameters</a></code> | <code>{[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="xpander-sdk.ITool.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ITool.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `func`<sup>Optional</sup> <a name="func" id="xpander-sdk.ITool.property.func"></a>

```typescript
public readonly func: any;
```

- *Type:* any

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="xpander-sdk.ITool.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: IToolParameter};
```

- *Type:* {[ key: string ]: <a href="#xpander-sdk.IToolParameter">IToolParameter</a>}

---

### IToolParameter <a name="IToolParameter" id="xpander-sdk.IToolParameter"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolParameter">IToolParameter</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolParameter.property.properties">properties</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolParameter.property.type">type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolParameter.property.required">required</a></code> | <code>string[]</code> | *No description.* |

---

##### `properties`<sup>Required</sup> <a name="properties" id="xpander-sdk.IToolParameter.property.properties"></a>

```typescript
public readonly properties: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `type`<sup>Required</sup> <a name="type" id="xpander-sdk.IToolParameter.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

##### `required`<sup>Optional</sup> <a name="required" id="xpander-sdk.IToolParameter.property.required"></a>

```typescript
public readonly required: string[];
```

- *Type:* string[]

---

### IToolResponse <a name="IToolResponse" id="xpander-sdk.IToolResponse"></a>

- *Implemented By:* <a href="#xpander-sdk.ToolResponse">ToolResponse</a>, <a href="#xpander-sdk.IToolResponse">IToolResponse</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponse.property.filteredTool">filteredTool</a></code> | <code>object</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.responseMessage">responseMessage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.role">role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.toolCallId">toolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty1">payloadProperty1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty2">payloadProperty2</a></code> | <code>number</code> | *No description.* |

---

##### `filteredTool`<sup>Required</sup> <a name="filteredTool" id="xpander-sdk.IToolResponse.property.filteredTool"></a>

```typescript
public readonly filteredTool: object;
```

- *Type:* object

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IToolResponse.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `responseMessage`<sup>Required</sup> <a name="responseMessage" id="xpander-sdk.IToolResponse.property.responseMessage"></a>

```typescript
public readonly responseMessage: string;
```

- *Type:* string

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.IToolResponse.property.role"></a>

```typescript
public readonly role: string;
```

- *Type:* string

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.IToolResponse.property.toolCallId"></a>

```typescript
public readonly toolCallId: string;
```

- *Type:* string

---

##### `payloadProperty1`<sup>Optional</sup> <a name="payloadProperty1" id="xpander-sdk.IToolResponse.property.payloadProperty1"></a>

```typescript
public readonly payloadProperty1: string;
```

- *Type:* string

---

##### `payloadProperty2`<sup>Optional</sup> <a name="payloadProperty2" id="xpander-sdk.IToolResponse.property.payloadProperty2"></a>

```typescript
public readonly payloadProperty2: number;
```

- *Type:* number

---

### IToolResponsePayload <a name="IToolResponsePayload" id="xpander-sdk.IToolResponsePayload"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolResponsePayload">IToolResponsePayload</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property1">property1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property2">property2</a></code> | <code>number</code> | *No description.* |

---

##### `property1`<sup>Required</sup> <a name="property1" id="xpander-sdk.IToolResponsePayload.property.property1"></a>

```typescript
public readonly property1: string;
```

- *Type:* string

---

##### `property2`<sup>Required</sup> <a name="property2" id="xpander-sdk.IToolResponsePayload.property.property2"></a>

```typescript
public readonly property2: number;
```

- *Type:* number

---

## Enums <a name="Enums" id="Enums"></a>

### LLMProvider <a name="LLMProvider" id="xpander-sdk.LLMProvider"></a>

Enum representing different Large Language Model (LLM) providers.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMProvider.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai' provider. |
| <code><a href="#xpander-sdk.LLMProvider.NVIDIA_NIM">NVIDIA_NIM</a></code> | Represents the 'nvidiaNim' provider. |
| <code><a href="#xpander-sdk.LLMProvider.AMAZON_BEDROCK">AMAZON_BEDROCK</a></code> | Represents the 'amazonBedrock' provider. |

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

