# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### ToolResponse <a name="ToolResponse" id="xpander-sdk.ToolResponse"></a>

- *Implements:* <a href="#xpander-sdk.IToolResponse">IToolResponse</a>

#### Initializers <a name="Initializers" id="xpander-sdk.ToolResponse.Initializer"></a>

```python
import xpander_sdk

xpander_sdk.ToolResponse(
  tool_call_id: str,
  role: str,
  name: str,
  response_message: str,
  filtered_tool: any,
  payload_property1: str = None,
  payload_property2: typing.Union[int, float] = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.toolCallId">tool_call_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.role">role</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.responseMessage">response_message</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.filteredTool">filtered_tool</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1">payload_property1</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2">payload_property2</a></code> | <code>typing.Union[int, float]</code> | *No description.* |

---

##### `tool_call_id`<sup>Required</sup> <a name="tool_call_id" id="xpander-sdk.ToolResponse.Initializer.parameter.toolCallId"></a>

- *Type:* str

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.ToolResponse.Initializer.parameter.role"></a>

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolResponse.Initializer.parameter.name"></a>

- *Type:* str

---

##### `response_message`<sup>Required</sup> <a name="response_message" id="xpander-sdk.ToolResponse.Initializer.parameter.responseMessage"></a>

- *Type:* str

---

##### `filtered_tool`<sup>Required</sup> <a name="filtered_tool" id="xpander-sdk.ToolResponse.Initializer.parameter.filteredTool"></a>

- *Type:* any

---

##### `payload_property1`<sup>Optional</sup> <a name="payload_property1" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty1"></a>

- *Type:* str

---

##### `payload_property2`<sup>Optional</sup> <a name="payload_property2" id="xpander-sdk.ToolResponse.Initializer.parameter.payloadProperty2"></a>

- *Type:* typing.Union[int, float]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.buildMessage">build_message</a></code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.toJSON">to_jso_n</a></code> | *No description.* |

---

##### `build_message` <a name="build_message" id="xpander-sdk.ToolResponse.buildMessage"></a>

```python
def build_message() -> str
```

##### `to_jso_n` <a name="to_jso_n" id="xpander-sdk.ToolResponse.toJSON"></a>

```python
def to_jso_n() -> any
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.fromJSON">from_jso_n</a></code> | *No description.* |

---

##### `from_jso_n` <a name="from_jso_n" id="xpander-sdk.ToolResponse.fromJSON"></a>

```python
import xpander_sdk

xpander_sdk.ToolResponse.from_jso_n(
  json: typing.Any
)
```

###### `json`<sup>Required</sup> <a name="json" id="xpander-sdk.ToolResponse.fromJSON.parameter.json"></a>

- *Type:* typing.Any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.ToolResponse.property.filteredTool">filtered_tool</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.responseMessage">response_message</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.role">role</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.toolCallId">tool_call_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty1">payload_property1</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.ToolResponse.property.payloadProperty2">payload_property2</a></code> | <code>typing.Union[int, float]</code> | *No description.* |

---

##### `filtered_tool`<sup>Required</sup> <a name="filtered_tool" id="xpander-sdk.ToolResponse.property.filteredTool"></a>

```python
filtered_tool: any
```

- *Type:* any

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.ToolResponse.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `response_message`<sup>Required</sup> <a name="response_message" id="xpander-sdk.ToolResponse.property.responseMessage"></a>

```python
response_message: str
```

- *Type:* str

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.ToolResponse.property.role"></a>

```python
role: str
```

- *Type:* str

---

##### `tool_call_id`<sup>Required</sup> <a name="tool_call_id" id="xpander-sdk.ToolResponse.property.toolCallId"></a>

```python
tool_call_id: str
```

- *Type:* str

---

##### `payload_property1`<sup>Optional</sup> <a name="payload_property1" id="xpander-sdk.ToolResponse.property.payloadProperty1"></a>

```python
payload_property1: str
```

- *Type:* str

---

##### `payload_property2`<sup>Optional</sup> <a name="payload_property2" id="xpander-sdk.ToolResponse.property.payloadProperty2"></a>

```python
payload_property2: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---


### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```python
import xpander_sdk

xpander_sdk.XpanderClient(
  agent_key: str,
  agent_url: str,
  llm_provider: str
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">agent_key</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">agent_url</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.llmProvider">llm_provider</a></code> | <code>str</code> | *No description.* |

---

##### `agent_key`<sup>Required</sup> <a name="agent_key" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* str

---

##### `agent_url`<sup>Required</sup> <a name="agent_url" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* str

---

##### `llm_provider`<sup>Required</sup> <a name="llm_provider" id="xpander-sdk.XpanderClient.Initializer.parameter.llmProvider"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.loadXpanderTools">load_xpander_tools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.tools">tools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.xpanderToolCall">xpander_tool_call</a></code> | *No description.* |

---

##### `load_xpander_tools` <a name="load_xpander_tools" id="xpander-sdk.XpanderClient.loadXpanderTools"></a>

```python
def load_xpander_tools() -> typing.List[typing.Any]
```

##### `tools` <a name="tools" id="xpander-sdk.XpanderClient.tools"></a>

```python
def tools(
  llm_provider: str = None
) -> typing.Any
```

###### `llm_provider`<sup>Optional</sup> <a name="llm_provider" id="xpander-sdk.XpanderClient.tools.parameter.llmProvider"></a>

- *Type:* str

---

##### `xpander_tool_call` <a name="xpander_tool_call" id="xpander-sdk.XpanderClient.xpanderToolCall"></a>

```python
def xpander_tool_call(
  tool_selector_response: typing.Any,
  llm_provider: str = None
) -> typing.List[ToolResponse]
```

###### `tool_selector_response`<sup>Required</sup> <a name="tool_selector_response" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.toolSelectorResponse"></a>

- *Type:* typing.Any

---

###### `llm_provider`<sup>Optional</sup> <a name="llm_provider" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.llmProvider"></a>

- *Type:* str

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.validProviders">valid_providers</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentKey">agent_key</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentUrl">agent_url</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.toolsCache">tools_cache</a></code> | <code>typing.Any</code> | *No description.* |

---

##### `valid_providers`<sup>Required</sup> <a name="valid_providers" id="xpander-sdk.XpanderClient.property.validProviders"></a>

```python
valid_providers: typing.List[str]
```

- *Type:* typing.List[str]

---

##### `agent_key`<sup>Required</sup> <a name="agent_key" id="xpander-sdk.XpanderClient.property.agentKey"></a>

```python
agent_key: str
```

- *Type:* str

---

##### `agent_url`<sup>Required</sup> <a name="agent_url" id="xpander-sdk.XpanderClient.property.agentUrl"></a>

```python
agent_url: str
```

- *Type:* str

---

##### `tools_cache`<sup>Required</sup> <a name="tools_cache" id="xpander-sdk.XpanderClient.property.toolsCache"></a>

```python
tools_cache: typing.Any
```

- *Type:* typing.Any

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IToolResponse <a name="IToolResponse" id="xpander-sdk.IToolResponse"></a>

- *Implemented By:* <a href="#xpander-sdk.ToolResponse">ToolResponse</a>, <a href="#xpander-sdk.IToolResponse">IToolResponse</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponse.property.filteredTool">filtered_tool</a></code> | <code>any</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.responseMessage">response_message</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.role">role</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.toolCallId">tool_call_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty1">payload_property1</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponse.property.payloadProperty2">payload_property2</a></code> | <code>typing.Union[int, float]</code> | *No description.* |

---

##### `filtered_tool`<sup>Required</sup> <a name="filtered_tool" id="xpander-sdk.IToolResponse.property.filteredTool"></a>

```python
filtered_tool: any
```

- *Type:* any

---

##### `name`<sup>Required</sup> <a name="name" id="xpander-sdk.IToolResponse.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `response_message`<sup>Required</sup> <a name="response_message" id="xpander-sdk.IToolResponse.property.responseMessage"></a>

```python
response_message: str
```

- *Type:* str

---

##### `role`<sup>Required</sup> <a name="role" id="xpander-sdk.IToolResponse.property.role"></a>

```python
role: str
```

- *Type:* str

---

##### `tool_call_id`<sup>Required</sup> <a name="tool_call_id" id="xpander-sdk.IToolResponse.property.toolCallId"></a>

```python
tool_call_id: str
```

- *Type:* str

---

##### `payload_property1`<sup>Optional</sup> <a name="payload_property1" id="xpander-sdk.IToolResponse.property.payloadProperty1"></a>

```python
payload_property1: str
```

- *Type:* str

---

##### `payload_property2`<sup>Optional</sup> <a name="payload_property2" id="xpander-sdk.IToolResponse.property.payloadProperty2"></a>

```python
payload_property2: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

### IToolResponsePayload <a name="IToolResponsePayload" id="xpander-sdk.IToolResponsePayload"></a>

- *Implemented By:* <a href="#xpander-sdk.IToolResponsePayload">IToolResponsePayload</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property1">property1</a></code> | <code>str</code> | *No description.* |
| <code><a href="#xpander-sdk.IToolResponsePayload.property.property2">property2</a></code> | <code>typing.Union[int, float]</code> | *No description.* |

---

##### `property1`<sup>Required</sup> <a name="property1" id="xpander-sdk.IToolResponsePayload.property.property1"></a>

```python
property1: str
```

- *Type:* str

---

##### `property2`<sup>Required</sup> <a name="property2" id="xpander-sdk.IToolResponsePayload.property.property2"></a>

```python
property2: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

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

