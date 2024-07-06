# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

new XpanderClient(agentKey: string, agentUrl: string, llmProvider: LLMProvider)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">agentKey</a></code> | <code>string</code> | - Your API key for authenticating with the agent. |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">agentUrl</a></code> | <code>string</code> | - The base URL of your agent. |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.llmProvider">llmProvider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | - The LLM provider to use. |

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* string

Your API key for authenticating with the agent.

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* string

The base URL of your agent.

---

##### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.Initializer.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

The LLM provider to use.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.retrieveAgentTools">retrieveAgentTools</a></code> | Retrieves tools from the agent and caches them. |
| <code><a href="#xpander-sdk.XpanderClient.tools">tools</a></code> | Retrieves tools based on the provided LLM provider. |
| <code><a href="#xpander-sdk.XpanderClient.xpanderToolCall">xpanderToolCall</a></code> | Invokes tools based on the provided tool selector response. |

---

##### `retrieveAgentTools` <a name="retrieveAgentTools" id="xpander-sdk.XpanderClient.retrieveAgentTools"></a>

```typescript
public retrieveAgentTools(): void
```

Retrieves tools from the agent and caches them.

##### `tools` <a name="tools" id="xpander-sdk.XpanderClient.tools"></a>

```typescript
public tools(): any
```

Retrieves tools based on the provided LLM provider.

##### `xpanderToolCall` <a name="xpanderToolCall" id="xpander-sdk.XpanderClient.xpanderToolCall"></a>

```typescript
public xpanderToolCall(toolSelectorResponse: any): any
```

Invokes tools based on the provided tool selector response.

###### `toolSelectorResponse`<sup>Required</sup> <a name="toolSelectorResponse" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.toolSelectorResponse"></a>

- *Type:* any

The response from the tool selector.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.agentKey">agentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentUrl">agentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.toolsCache">toolsCache</a></code> | <code>any</code> | *No description.* |

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

