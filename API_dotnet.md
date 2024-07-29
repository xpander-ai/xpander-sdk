# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### ToolResponse <a name="ToolResponse" id="xpander-sdk.ToolResponse"></a>

- *Implements:* <a href="#xpander-sdk.IToolResponse">IToolResponse</a>

#### Initializers <a name="Initializers" id="xpander-sdk.ToolResponse.Initializer"></a>

```csharp
using Xpander.AI.Sdk;

new ToolResponse(string ToolCallId, string Role, string Name, string ResponseMessage, Newtonsoft.Json.Linq.JObject FilteredTool, string PayloadProperty1 = null, double PayloadProperty2 = null);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.toolCallId">ToolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.role">Role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.name">Name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.responseMessage">ResponseMessage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.filteredTool">FilteredTool</a></code> | <code>Newtonsoft.Json.Linq.JObject</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1">PayloadProperty1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2">PayloadProperty2</a></code> | <code>double</code> | *No description.* |

---

##### `ToolCallId`<sup>Required</sup> <a name="ToolCallId" id="xpander-sdk.ToolResponse.Initializer.parameter.toolCallId"></a>

- *Type:* string

---

##### `Role`<sup>Required</sup> <a name="Role" id="xpander-sdk.ToolResponse.Initializer.parameter.role"></a>

- *Type:* string

---

##### `Name`<sup>Required</sup> <a name="Name" id="xpander-sdk.ToolResponse.Initializer.parameter.name"></a>

- *Type:* string

---

##### `ResponseMessage`<sup>Required</sup> <a name="ResponseMessage" id="xpander-sdk.ToolResponse.Initializer.parameter.responseMessage"></a>

- *Type:* string

---

##### `FilteredTool`<sup>Required</sup> <a name="FilteredTool" id="xpander-sdk.ToolResponse.Initializer.parameter.filteredTool"></a>

- *Type:* Newtonsoft.Json.Linq.JObject

---

##### `PayloadProperty1`<sup>Optional</sup> <a name="PayloadProperty1" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1"></a>

- *Type:* string

---

##### `PayloadProperty2`<sup>Optional</sup> <a name="PayloadProperty2" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2"></a>

- *Type:* double

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.buildMessage">BuildMessage</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.toJSON">ToJSON</a></code> | *No description.* |

---

##### `BuildMessage` <a name="BuildMessage" id="xpander-sdk.ToolResponse.buildMessage"></a>

```csharp
private string BuildMessage()
```

##### `ToJSON` <a name="ToJSON" id="xpander-sdk.ToolResponse.toJSON"></a>

```csharp
private Newtonsoft.Json.Linq.JObject ToJSON()
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.fromJSON">FromJSON</a></code> | *No description.* |

---

##### `FromJSON` <a name="FromJSON" id="xpander-sdk.ToolResponse.fromJSON"></a>

```csharp
using Xpander.AI.Sdk;

ToolResponse.FromJSON(object Json);
```

###### `Json`<sup>Required</sup> <a name="Json" id="xpander-sdk.ToolResponse.fromJSON.parameter.json"></a>

- *Type:* object

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.property.filteredTool">FilteredTool</a></code> | <code>Newtonsoft.Json.Linq.JObject</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.name">Name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.responseMessage">ResponseMessage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.role">Role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.toolCallId">ToolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty1">PayloadProperty1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty2">PayloadProperty2</a></code> | <code>double</code> | *No description.* |

---

##### `FilteredTool`<sup>Required</sup> <a name="FilteredTool" id="xpander-sdk.ToolResponse.property.filteredTool"></a>

```csharp
public Newtonsoft.Json.Linq.JObject FilteredTool { get; }
```

- *Type:* Newtonsoft.Json.Linq.JObject

---

##### `Name`<sup>Required</sup> <a name="Name" id="xpander-sdk.ToolResponse.property.name"></a>

```csharp
public string Name { get; }
```

- *Type:* string

---

##### `ResponseMessage`<sup>Required</sup> <a name="ResponseMessage" id="xpander-sdk.ToolResponse.property.responseMessage"></a>

```csharp
public string ResponseMessage { get; }
```

- *Type:* string

---

##### `Role`<sup>Required</sup> <a name="Role" id="xpander-sdk.ToolResponse.property.role"></a>

```csharp
public string Role { get; }
```

- *Type:* string

---

##### `ToolCallId`<sup>Required</sup> <a name="ToolCallId" id="xpander-sdk.ToolResponse.property.toolCallId"></a>

```csharp
public string ToolCallId { get; }
```

- *Type:* string

---

##### `PayloadProperty1`<sup>Optional</sup> <a name="PayloadProperty1" id="xpander-sdk.ToolResponse.property.payloadProperty1"></a>

```csharp
public string PayloadProperty1 { get; }
```

- *Type:* string

---

##### `PayloadProperty2`<sup>Optional</sup> <a name="PayloadProperty2" id="xpander-sdk.ToolResponse.property.payloadProperty2"></a>

```csharp
public double PayloadProperty2 { get; }
```

- *Type:* double

---


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```csharp
using Xpander.AI.Sdk;

new XpanderClient(string AgentKey, string AgentUrl, string LlmProvider);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">AgentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">AgentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.llmProvider">LlmProvider</a></code> | <code>string</code> | *No description.* |

---

##### `AgentKey`<sup>Required</sup> <a name="AgentKey" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* string

---

##### `AgentUrl`<sup>Required</sup> <a name="AgentUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* string

---

##### `LlmProvider`<sup>Required</sup> <a name="LlmProvider" id="xpander-sdk.XpanderClient.Initializer.parameter.llmProvider"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.loadXpanderTools">LoadXpanderTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.tools">Tools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.xpanderToolCall">XpanderToolCall</a></code> | *No description.* |

---

##### `LoadXpanderTools` <a name="LoadXpanderTools" id="xpander-sdk.XpanderClient.loadXpanderTools"></a>

```csharp
private object[] LoadXpanderTools()
```

##### `Tools` <a name="Tools" id="xpander-sdk.XpanderClient.tools"></a>

```csharp
private ITool[] Tools(string LlmProvider = null)
```

###### `LlmProvider`<sup>Optional</sup> <a name="LlmProvider" id="xpander-sdk.XpanderClient.tools.parameter.llmProvider"></a>

- *Type:* string

---

##### `XpanderToolCall` <a name="XpanderToolCall" id="xpander-sdk.XpanderClient.xpanderToolCall"></a>

```csharp
private ToolResponse[] XpanderToolCall(object ToolSelectorResponse, string LlmProvider = null)
```

###### `ToolSelectorResponse`<sup>Required</sup> <a name="ToolSelectorResponse" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.toolSelectorResponse"></a>

- *Type:* object

---

###### `LlmProvider`<sup>Optional</sup> <a name="LlmProvider" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.llmProvider"></a>

- *Type:* string

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.validProviders">ValidProviders</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.supportedModels">SupportedModels</a></code> | <code>System.Collections.Generic.IDictionary<string, string></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentKey">AgentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentUrl">AgentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.toolsCache">ToolsCache</a></code> | <code>object</code> | *No description.* |

---

##### `ValidProviders`<sup>Required</sup> <a name="ValidProviders" id="xpander-sdk.XpanderClient.property.validProviders"></a>

```csharp
public string[] ValidProviders { get; }
```

- *Type:* string[]

---

##### `SupportedModels`<sup>Required</sup> <a name="SupportedModels" id="xpander-sdk.XpanderClient.property.supportedModels"></a>

```csharp
public System.Collections.Generic.IDictionary<string, string> SupportedModels { get; }
```

- *Type:* System.Collections.Generic.IDictionary<string, string>

---

##### `AgentKey`<sup>Required</sup> <a name="AgentKey" id="xpander-sdk.XpanderClient.property.agentKey"></a>

```csharp
public string AgentKey { get; }
```

- *Type:* string

---

##### `AgentUrl`<sup>Required</sup> <a name="AgentUrl" id="xpander-sdk.XpanderClient.property.agentUrl"></a>

```csharp
public string AgentUrl { get; }
```

- *Type:* string

---

##### `ToolsCache`<sup>Required</sup> <a name="ToolsCache" id="xpander-sdk.XpanderClient.property.toolsCache"></a>

```csharp
public object ToolsCache { get; }
```

- *Type:* object

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ILLMProviderHandler <a name="ILLMProviderHandler" id="xpander-sdk.ILLMProviderHandler"></a>

- *Implemented By:* <a href="#xpander-sdk.ILLMProviderHandler">ILLMProviderHandler</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ILLMProviderHandler.getTools">GetTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ILLMProviderHandler.invokeTools">InvokeTools</a></code> | *No description.* |

---

##### `GetTools` <a name="GetTools" id="xpander-sdk.ILLMProviderHandler.getTools"></a>

```csharp
private ITool[] GetTools(bool Functionize = null)
```

###### `Functionize`<sup>Optional</sup> <a name="Functionize" id="xpander-sdk.ILLMProviderHandler.getTools.parameter.functionize"></a>

- *Type:* bool

---

##### `InvokeTools` <a name="InvokeTools" id="xpander-sdk.ILLMProviderHandler.invokeTools"></a>

```csharp
private object InvokeTools(object ToolSelectorResponse)
```

###### `ToolSelectorResponse`<sup>Required</sup> <a name="ToolSelectorResponse" id="xpander-sdk.ILLMProviderHandler.invokeTools.parameter.toolSelectorResponse"></a>

- *Type:* object

---


### IMessage <a name="IMessage" id="xpander-sdk.IMessage"></a>

- *Implemented By:* <a href="#xpander-sdk.IMessage">IMessage</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IMessage.property.content">Content</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IMessage.property.role">Role</a></code> | <code>string</code> | *No description.* |

---

##### `Content`<sup>Required</sup> <a name="Content" id="xpander-sdk.IMessage.property.content"></a>

```csharp
public string Content { get; set; }
```

- *Type:* string

---

##### `Role`<sup>Required</sup> <a name="Role" id="xpander-sdk.IMessage.property.role"></a>

```csharp
public string Role { get; set; }
```

- *Type:* string

---

### ITool <a name="ITool" id="xpander-sdk.ITool"></a>

- *Implemented By:* <a href="#xpander-sdk.ITool">ITool</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ITool.property.description">Description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ITool.property.name">Name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.ITool.property.func">Func</a></code> | <code>object</code> | *No description.* |
| <code><a href="#xpander-sdk.ITool.property.parameters">Parameters</a></code> | <code>System.Collections.Generic.IDictionary<string, <a href="#xpander-sdk.IToolParameter">IToolParameter</a>></code> | *No description.* |

---

##### `Description`<sup>Required</sup> <a name="Description" id="xpander-sdk.ITool.property.description"></a>

```csharp
public string Description { get; set; }
```

- *Type:* string

---

##### `Name`<sup>Required</sup> <a name="Name" id="xpander-sdk.ITool.property.name"></a>

```csharp
public string Name { get; set; }
```

- *Type:* string

---

##### `Func`<sup>Optional</sup> <a name="Func" id="xpander-sdk.ITool.property.func"></a>

```csharp
public object Func { get; set; }
```

- *Type:* object

---

##### `Parameters`<sup>Optional</sup> <a name="Parameters" id="xpander-sdk.ITool.property.parameters"></a>

```csharp
public System.Collections.Generic.IDictionary<string, IToolParameter> Parameters { get; set; }
```

- *Type:* System.Collections.Generic.IDictionary<string, <a href="#xpander-sdk.IToolParameter">IToolParameter</a>>

---

### IToolParameter <a name="IToolParameter" id="xpander-sdk.IToolParameter"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolParameter">IToolParameter</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolParameter.property.properties">Properties</a></code> | <code>System.Collections.Generic.IDictionary<string, object></code> | *No description.* |
| <code><a href="#xpander-sdk.IToolParameter.property.type">Type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolParameter.property.required">Required</a></code> | <code>string[]</code> | *No description.* |

---

##### `Properties`<sup>Required</sup> <a name="Properties" id="xpander-sdk.IToolParameter.property.properties"></a>

```csharp
public System.Collections.Generic.IDictionary<string, object> Properties { get; set; }
```

- *Type:* System.Collections.Generic.IDictionary<string, object>

---

##### `Type`<sup>Required</sup> <a name="Type" id="xpander-sdk.IToolParameter.property.type"></a>

```csharp
public string Type { get; set; }
```

- *Type:* string

---

##### `Required`<sup>Optional</sup> <a name="Required" id="xpander-sdk.IToolParameter.property.required"></a>

```csharp
public string[] Required { get; set; }
```

- *Type:* string[]

---

### IToolResponse <a name="IToolResponse" id="xpander-sdk.IToolResponse"></a>

- *Implemented By:* <a href="#xpander-sdk.ToolResponse">ToolResponse</a>, <a href="#xpander-sdk.IToolResponse">IToolResponse</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponse.property.filteredTool">FilteredTool</a></code> | <code>Newtonsoft.Json.Linq.JObject</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.name">Name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.responseMessage">ResponseMessage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.role">Role</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.toolCallId">ToolCallId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty1">PayloadProperty1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty2">PayloadProperty2</a></code> | <code>double</code> | *No description.* |

---

##### `FilteredTool`<sup>Required</sup> <a name="FilteredTool" id="xpander-sdk.IToolResponse.property.filteredTool"></a>

```csharp
public Newtonsoft.Json.Linq.JObject FilteredTool { get; set; }
```

- *Type:* Newtonsoft.Json.Linq.JObject

---

##### `Name`<sup>Required</sup> <a name="Name" id="xpander-sdk.IToolResponse.property.name"></a>

```csharp
public string Name { get; set; }
```

- *Type:* string

---

##### `ResponseMessage`<sup>Required</sup> <a name="ResponseMessage" id="xpander-sdk.IToolResponse.property.responseMessage"></a>

```csharp
public string ResponseMessage { get; set; }
```

- *Type:* string

---

##### `Role`<sup>Required</sup> <a name="Role" id="xpander-sdk.IToolResponse.property.role"></a>

```csharp
public string Role { get; set; }
```

- *Type:* string

---

##### `ToolCallId`<sup>Required</sup> <a name="ToolCallId" id="xpander-sdk.IToolResponse.property.toolCallId"></a>

```csharp
public string ToolCallId { get; set; }
```

- *Type:* string

---

##### `PayloadProperty1`<sup>Optional</sup> <a name="PayloadProperty1" id="xpander-sdk.IToolResponse.property.payloadProperty1"></a>

```csharp
public string PayloadProperty1 { get; set; }
```

- *Type:* string

---

##### `PayloadProperty2`<sup>Optional</sup> <a name="PayloadProperty2" id="xpander-sdk.IToolResponse.property.payloadProperty2"></a>

```csharp
public double PayloadProperty2 { get; set; }
```

- *Type:* double

---

### IToolResponsePayload <a name="IToolResponsePayload" id="xpander-sdk.IToolResponsePayload"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolResponsePayload">IToolResponsePayload</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property1">Property1</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property2">Property2</a></code> | <code>double</code> | *No description.* |

---

##### `Property1`<sup>Required</sup> <a name="Property1" id="xpander-sdk.IToolResponsePayload.property.property1"></a>

```csharp
public string Property1 { get; set; }
```

- *Type:* string

---

##### `Property2`<sup>Required</sup> <a name="Property2" id="xpander-sdk.IToolResponsePayload.property.property2"></a>

```csharp
public double Property2 { get; set; }
```

- *Type:* double

---

## Enums <a name="Enums" id="Enums"></a>

### LLMProvider <a name="LLMProvider" id="xpander-sdk.LLMProvider"></a>

Enum representing different Large Language Model (LLM) providers.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMProvider.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai' provider. |
| <code><a href="#xpander-sdk.LLMProvider.NVIDIA_NIM">NVIDIA_NIM</a></code> | Represents the 'nvidiaNim' provider. |

---

##### `OPEN_AI` <a name="OPEN_AI" id="xpander-sdk.LLMProvider.OPEN_AI"></a>

Represents the 'openai' provider.

---


##### `NVIDIA_NIM` <a name="NVIDIA_NIM" id="xpander-sdk.LLMProvider.NVIDIA_NIM"></a>

Represents the 'nvidiaNim' provider.

---

