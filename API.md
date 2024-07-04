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
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">agentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">agentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.llmProvider">llmProvider</a></code> | <code><a href="#xpander-sdk.LLMProvider">LLMProvider</a></code> | *No description.* |

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* string

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* string

---

##### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.Initializer.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.getLLMProviderHandler">getLLMProviderHandler</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.initLLMProviderHandler">initLLMProviderHandler</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.retrieveAgentTools">retrieveAgentTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.tools">tools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.xpanderToolCall">xpanderToolCall</a></code> | *No description.* |

---

##### `getLLMProviderHandler` <a name="getLLMProviderHandler" id="xpander-sdk.XpanderClient.getLLMProviderHandler"></a>

```typescript
public getLLMProviderHandler(llmProvider: LLMProvider): any
```

###### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.getLLMProviderHandler.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `initLLMProviderHandler` <a name="initLLMProviderHandler" id="xpander-sdk.XpanderClient.initLLMProviderHandler"></a>

```typescript
public initLLMProviderHandler(llmProvider: LLMProvider): any
```

###### `llmProvider`<sup>Required</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.initLLMProviderHandler.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `retrieveAgentTools` <a name="retrieveAgentTools" id="xpander-sdk.XpanderClient.retrieveAgentTools"></a>

```typescript
public retrieveAgentTools(): any
```

##### `tools` <a name="tools" id="xpander-sdk.XpanderClient.tools"></a>

```typescript
public tools(llmProvider?: LLMProvider): any
```

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.tools.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---

##### `xpanderToolCall` <a name="xpanderToolCall" id="xpander-sdk.XpanderClient.xpanderToolCall"></a>

```typescript
public xpanderToolCall(toolSelectorResponse: any, llmProvider?: LLMProvider): any
```

###### `toolSelectorResponse`<sup>Required</sup> <a name="toolSelectorResponse" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.toolSelectorResponse"></a>

- *Type:* any

---

###### `llmProvider`<sup>Optional</sup> <a name="llmProvider" id="xpander-sdk.XpanderClient.xpanderToolCall.parameter.llmProvider"></a>

- *Type:* <a href="#xpander-sdk.LLMProvider">LLMProvider</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.property.agentKey">agentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.agentUrl">agentUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.property.llmProviderHandler">llmProviderHandler</a></code> | <code>any</code> | *No description.* |
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

##### `llmProviderHandler`<sup>Required</sup> <a name="llmProviderHandler" id="xpander-sdk.XpanderClient.property.llmProviderHandler"></a>

```typescript
public readonly llmProviderHandler: any;
```

- *Type:* any

---

##### `toolsCache`<sup>Required</sup> <a name="toolsCache" id="xpander-sdk.XpanderClient.property.toolsCache"></a>

```typescript
public readonly toolsCache: any;
```

- *Type:* any

---



## Enums <a name="Enums" id="Enums"></a>

### LLMProvider <a name="LLMProvider" id="xpander-sdk.LLMProvider"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.LLMProvider.LANG_CHAIN">LANG_CHAIN</a></code> | Represents the 'langchain'. |
| <code><a href="#xpander-sdk.LLMProvider.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai'. |
| <code><a href="#xpander-sdk.LLMProvider.ANTHROPIC">ANTHROPIC</a></code> | Represents the 'anthropic'. |

---

##### `LANG_CHAIN` <a name="LANG_CHAIN" id="xpander-sdk.LLMProvider.LANG_CHAIN"></a>

Represents the 'langchain'.

---


##### `OPEN_AI` <a name="OPEN_AI" id="xpander-sdk.LLMProvider.OPEN_AI"></a>

Represents the 'openai'.

---


##### `ANTHROPIC` <a name="ANTHROPIC" id="xpander-sdk.LLMProvider.ANTHROPIC"></a>

Represents the 'anthropic'.

---

