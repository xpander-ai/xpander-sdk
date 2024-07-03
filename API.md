# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### XpanderClient <a name="XpanderClient" id="xpander-sdk.XpanderClient"></a>

#### Initializers <a name="Initializers" id="xpander-sdk.XpanderClient.Initializer"></a>

```typescript
import { XpanderClient } from 'xpander-sdk'

new XpanderClient(agentKey: string, agentUrl: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentKey">agentKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.Initializer.parameter.agentUrl">agentUrl</a></code> | <code>string</code> | *No description.* |

---

##### `agentKey`<sup>Required</sup> <a name="agentKey" id="xpander-sdk.XpanderClient.Initializer.parameter.agentKey"></a>

- *Type:* string

---

##### `agentUrl`<sup>Required</sup> <a name="agentUrl" id="xpander-sdk.XpanderClient.Initializer.parameter.agentUrl"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.XpanderClient.getPluginHandler">getPluginHandler</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.processChatResponse">processChatResponse</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.retrieveAgentTools">retrieveAgentTools</a></code> | *No description.* |
| <code><a href="#xpander-sdk.XpanderClient.tools">tools</a></code> | *No description.* |

---

##### `getPluginHandler` <a name="getPluginHandler" id="xpander-sdk.XpanderClient.getPluginHandler"></a>

```typescript
public getPluginHandler(plugin: Plugin): any
```

###### `plugin`<sup>Required</sup> <a name="plugin" id="xpander-sdk.XpanderClient.getPluginHandler.parameter.plugin"></a>

- *Type:* <a href="#xpander-sdk.Plugin">Plugin</a>

---

##### `processChatResponse` <a name="processChatResponse" id="xpander-sdk.XpanderClient.processChatResponse"></a>

```typescript
public processChatResponse(messages: any[], plugin: Plugin, chatCompletionResponse: any, aiClient: any): any
```

###### `messages`<sup>Required</sup> <a name="messages" id="xpander-sdk.XpanderClient.processChatResponse.parameter.messages"></a>

- *Type:* any[]

---

###### `plugin`<sup>Required</sup> <a name="plugin" id="xpander-sdk.XpanderClient.processChatResponse.parameter.plugin"></a>

- *Type:* <a href="#xpander-sdk.Plugin">Plugin</a>

---

###### `chatCompletionResponse`<sup>Required</sup> <a name="chatCompletionResponse" id="xpander-sdk.XpanderClient.processChatResponse.parameter.chatCompletionResponse"></a>

- *Type:* any

---

###### `aiClient`<sup>Required</sup> <a name="aiClient" id="xpander-sdk.XpanderClient.processChatResponse.parameter.aiClient"></a>

- *Type:* any

---

##### `retrieveAgentTools` <a name="retrieveAgentTools" id="xpander-sdk.XpanderClient.retrieveAgentTools"></a>

```typescript
public retrieveAgentTools(): any
```

##### `tools` <a name="tools" id="xpander-sdk.XpanderClient.tools"></a>

```typescript
public tools(plugin: Plugin): any
```

###### `plugin`<sup>Required</sup> <a name="plugin" id="xpander-sdk.XpanderClient.tools.parameter.plugin"></a>

- *Type:* <a href="#xpander-sdk.Plugin">Plugin</a>

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

### Plugin <a name="Plugin" id="xpander-sdk.Plugin"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xpander-sdk.Plugin.LANG_CHAIN">LANG_CHAIN</a></code> | Represents the 'langchain' plugin. |
| <code><a href="#xpander-sdk.Plugin.OPEN_AI">OPEN_AI</a></code> | Represents the 'openai' plugin. |

---

##### `LANG_CHAIN` <a name="LANG_CHAIN" id="xpander-sdk.Plugin.LANG_CHAIN"></a>

Represents the 'langchain' plugin.

---


##### `OPEN_AI` <a name="OPEN_AI" id="xpander-sdk.Plugin.OPEN_AI"></a>

Represents the 'openai' plugin.

---

