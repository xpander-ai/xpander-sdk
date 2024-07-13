# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### ToolResponse <a name="ToolResponse" id="xpander-sdk.ToolResponse"></a>

- *Implements:* <a href="#xpander-sdk.IToolResponse">IToolResponse</a>

#### Initializers <a name="Initializers" id="xpander-sdk.ToolResponse.Initializer"></a>

```java
import ai.xpander.sdk.ToolResponse;

new ToolResponse(java.lang.String toolCallId, java.lang.String role, java.lang.String name, java.lang.String responseMessage, com.fasterxml.jackson.databind.node.ObjectNode filteredTool);,new ToolResponse(java.lang.String toolCallId, java.lang.String role, java.lang.String name, java.lang.String responseMessage, com.fasterxml.jackson.databind.node.ObjectNode filteredTool, java.lang.String payloadProperty1);,new ToolResponse(java.lang.String toolCallId, java.lang.String role, java.lang.String name, java.lang.String responseMessage, com.fasterxml.jackson.databind.node.ObjectNode filteredTool, java.lang.String payloadProperty1, java.lang.Number payloadProperty2);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.toolCallId">toolCallId</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.role">role</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.name">name</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.responseMessage">responseMessage</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.filteredTool">filteredTool</a></code> | <code>com.fasterxml.jackson.databind.node.ObjectNode</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1">payloadProperty1</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2">payloadProperty2</a></code> | <code>java.lang.Number</code> | *No description.* |

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.ToolResponse.Initializer.parameter.toolCallId"></a>

- *Type:* java.lang.String

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.ToolResponse.Initializer.parameter.role"></a>

- *Type:* java.lang.String

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolResponse.Initializer.parameter.name"></a>

- *Type:* java.lang.String

---

##### `responseMessage`<sup>Required</sup> <a name="responseMessage" id="xpander-sdk.ToolResponse.Initializer.parameter.responseMessage"></a>

- *Type:* java.lang.String

---

##### `filteredTool`<sup>Required</sup> <a name="filteredTool" id="xpander-sdk.ToolResponse.Initializer.parameter.filteredTool"></a>

- *Type:* com.fasterxml.jackson.databind.node.ObjectNode

---

##### `payloadProperty1`<sup>Optional</sup> <a name="payloadProperty1" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1"></a>

- *Type:* java.lang.String

---

##### `payloadProperty2`<sup>Optional</sup> <a name="payloadProperty2" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2"></a>

- *Type:* java.lang.Number

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.buildMessage">buildMessage</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.toJSON">toJSON</a></code> | *No description.* |

---

##### `buildMessage` <a name="buildMessage" id="xpander-sdk.ToolResponse.buildMessage"></a>

```java
public java.lang.String buildMessage()
```

##### `toJSON` <a name="toJSON" id="xpander-sdk.ToolResponse.toJSON"></a>

```java
public com.fasterxml.jackson.databind.node.ObjectNode toJSON()
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.fromJSON">fromJSON</a></code> | *No description.* |

---

##### `fromJSON` <a name="fromJSON" id="xpander-sdk.ToolResponse.fromJSON"></a>

```java
import ai.xpander.sdk.ToolResponse;

ToolResponse.fromJSON(java.lang.Object json)
```

###### `json`<sup>Required</sup> <a name="json" id="xpander-sdk.ToolResponse.fromJSON.parameter.json"></a>

- *Type:* java.lang.Object

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.property.filteredTool">filteredTool</a></code> | <code>com.fasterxml.jackson.databind.node.ObjectNode</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.name">name</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.responseMessage">responseMessage</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.role">role</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.toolCallId">toolCallId</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty1">payloadProperty1</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty2">payloadProperty2</a></code> | <code>java.lang.Number</code> | *No description.* |

---

##### `filteredTool`<sup>Required</sup> <a name="filteredTool" id="xpander-sdk.ToolResponse.property.filteredTool"></a>

```java
public com.fasterxml.jackson.databind.node.ObjectNode getFilteredTool();
```

- *Type:* com.fasterxml.jackson.databind.node.ObjectNode

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolResponse.property.name"></a>

```java
public java.lang.String getName();
```

- *Type:* java.lang.String

---

##### `responseMessage`<sup>Required</sup> <a name="responseMessage" id="xpander-sdk.ToolResponse.property.responseMessage"></a>

```java
public java.lang.String getResponseMessage();
```

- *Type:* java.lang.String

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.ToolResponse.property.role"></a>

```java
public java.lang.String getRole();
```

- *Type:* java.lang.String

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.ToolResponse.property.toolCallId"></a>

```java
public java.lang.String getToolCallId();
```

- *Type:* java.lang.String

---

##### `payloadProperty1`<sup>Optional</sup> <a name="payloadProperty1" id="xpander-sdk.ToolResponse.property.payloadProperty1"></a>

```java
public java.lang.String getPayloadProperty1();
```

- *Type:* java.lang.String

---

##### `payloadProperty2`<sup>Optional</sup> <a name="payloadProperty2" id="xpander-sdk.ToolResponse.property.payloadProperty2"></a>

```java
public java.lang.Number getPayloadProperty2();
```

- *Type:* java.lang.Number

---


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```java
import ai.xpander.sdk.XpanderClient;

new XpanderClient(java.lang.String agentKey, java.lang.String agentUrl, java.lang.String llmProvider);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">agentKey</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">agentUrl</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.llmProvider">llmProvider</a></code> | <code>java.lang.String</code> | *No description.* |

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* java.lang.String

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* java.lang.String

---

##### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.Initializer.parameter.llmProvider"></a>

- *Type:* java.lang.String

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.loadXpanderTools">loadXpanderTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.tools">tools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.xpanderToolCall">xpanderToolCall</a></code> | *No description.* |

---

##### `loadXpanderTools` <a name="loadXpanderTools" id="xpander-sdk.XpanderClient.loadXpanderTools"></a>

```java
public java.util.List<java.lang.Object> loadXpanderTools()
```

##### `tools` <a name="tools" id="xpander-sdk.XpanderClient.tools"></a>

```java
public java.lang.Object tools()
public java.lang.Object tools(java.lang.String llmProvider)
```

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.tools.parameter.llmProvider"></a>

- *Type:* java.lang.String

---

##### `xpanderToolCall` <a name="xpanderToolCall" id="xpander-sdk.XpanderClient.xpanderToolCall"></a>

```java
public java.util.List<ToolResponse> xpanderToolCall(java.lang.Object toolSelectorResponse)
public java.util.List<ToolResponse> xpanderToolCall(java.lang.Object toolSelectorResponse, java.lang.String llmProvider)
```

###### `toolSelectorResponse`<sup>Required</sup> <a name="toolSelectorResponse" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.toolSelectorResponse"></a>

- *Type:* java.lang.Object

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.llmProvider"></a>

- *Type:* java.lang.String

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.validProviders">validProviders</a></code> | <code>java.util.List<java.lang.String></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentKey">agentKey</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentUrl">agentUrl</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.toolsCache">toolsCache</a></code> | <code>java.lang.Object</code> | *No description.* |

---

##### `validProviders`<sup>Required</sup> <a name="validProviders" id="xpander-sdk.XpanderClient.property.validProviders"></a>

```java
public java.util.List<java.lang.String> getValidProviders();
```

- *Type:* java.util.List<java.lang.String>

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.property.agentKey"></a>

```java
public java.lang.String getAgentKey();
```

- *Type:* java.lang.String

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.property.agentUrl"></a>

```java
public java.lang.String getAgentUrl();
```

- *Type:* java.lang.String

---

##### `toolsCache`<sup>Required</sup> <a name="toolsCache" id="xpander-sdk.XpanderClient.property.toolsCache"></a>

```java
public java.lang.Object getToolsCache();
```

- *Type:* java.lang.Object

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IToolResponse <a name="IToolResponse" id="xpander-sdk.IToolResponse"></a>

- *Implemented By:* <a href="#xpander-sdk.ToolResponse">ToolResponse</a>, <a href="#xpander-sdk.IToolResponse">IToolResponse</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponse.property.filteredTool">filteredTool</a></code> | <code>com.fasterxml.jackson.databind.node.ObjectNode</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.name">name</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.responseMessage">responseMessage</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.role">role</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.toolCallId">toolCallId</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty1">payloadProperty1</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty2">payloadProperty2</a></code> | <code>java.lang.Number</code> | *No description.* |

---

##### `filteredTool`<sup>Required</sup> <a name="filteredTool" id="xpander-sdk.IToolResponse.property.filteredTool"></a>

```java
public com.fasterxml.jackson.databind.node.ObjectNode getFilteredTool();
```

- *Type:* com.fasterxml.jackson.databind.node.ObjectNode

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IToolResponse.property.name"></a>

```java
public java.lang.String getName();
```

- *Type:* java.lang.String

---

##### `responseMessage`<sup>Required</sup> <a name="responseMessage" id="xpander-sdk.IToolResponse.property.responseMessage"></a>

```java
public java.lang.String getResponseMessage();
```

- *Type:* java.lang.String

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.IToolResponse.property.role"></a>

```java
public java.lang.String getRole();
```

- *Type:* java.lang.String

---

##### `toolCallId`<sup>Required</sup> <a name="toolCallId" id="xpander-sdk.IToolResponse.property.toolCallId"></a>

```java
public java.lang.String getToolCallId();
```

- *Type:* java.lang.String

---

##### `payloadProperty1`<sup>Optional</sup> <a name="payloadProperty1" id="xpander-sdk.IToolResponse.property.payloadProperty1"></a>

```java
public java.lang.String getPayloadProperty1();
```

- *Type:* java.lang.String

---

##### `payloadProperty2`<sup>Optional</sup> <a name="payloadProperty2" id="xpander-sdk.IToolResponse.property.payloadProperty2"></a>

```java
public java.lang.Number getPayloadProperty2();
```

- *Type:* java.lang.Number

---

### IToolResponsePayload <a name="IToolResponsePayload" id="xpander-sdk.IToolResponsePayload"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolResponsePayload">IToolResponsePayload</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property1">property1</a></code> | <code>java.lang.String</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property2">property2</a></code> | <code>java.lang.Number</code> | *No description.* |

---

##### `property1`<sup>Required</sup> <a name="property1" id="xpander-sdk.IToolResponsePayload.property.property1"></a>

```java
public java.lang.String getProperty1();
```

- *Type:* java.lang.String

---

##### `property2`<sup>Required</sup> <a name="property2" id="xpander-sdk.IToolResponsePayload.property.property2"></a>

```java
public java.lang.Number getProperty2();
```

- *Type:* java.lang.Number

---

## Enums <a name="Enums" id="Enums"></a>

### LLMProvider <a name="LLMProvider" id="xpander-sdk.LLMProvider"></a>

Enum representing different Large Language Model (LLM) providers.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMProvider.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai' provider. |

---

##### `OPEN_AI` <a name="OPEN_AI" id="xpander-sdk.LLMProvider.OPEN_AI"></a>

Represents the 'openai' provider.

---

