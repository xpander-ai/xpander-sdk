<h3 align="center">
  <a name="readme-top"></a>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.xpanderai.io/logo/xpander.ai_dark.png">
    <img
      src="https://assets.xpanderai.io/logo/xpander.ai_light.png"
      style="max-width: 100%; height: auto; width: auto; max-height: 170px;"
      alt="xpander.ai Logo"
    >
  </picture>
</h3>

<div align="center">
  <h1>A framework-agnostic Backend for your AI Agents</h1>

  <a href="https://pepy.tech/projects/xpander-sdk"><img src="https://static.pepy.tech/badge/xpander-sdk/month"></a> 
  <a href="https://github.com/xpander-ai/xpander.ai/blob/main/LICENSE"><img src="https://img.shields.io/github/license/xpander-ai/xpander.ai" alt="License"></a> <a href="https://pypi.org/project/xpander-sdk"><img src="https://img.shields.io/pypi/v/xpander-sdk" alt="PyPI Version"></a> <a href="https://npmjs.com/package/xpander-sdk"><img src="https://img.shields.io/npm/v/xpander-sdk" alt="NPM Version"></a> <a href="https://app.xpander.ai"><img src="https://img.shields.io/badge/platform-login-30a46c" alt="Platform Login"></a>
</div>

<div align="center">
  <p align="center">
<a href="https://x.com/xpander_ai"><img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" /></a> <a href="https://www.linkedin.com/company/xpander-ai"><img src="https://img.shields.io/badge/Follow%20on%20LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a> <a href="https://discord.gg/CUcp4WWh5g"><img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a>
  </p>
</div>

---

## 🏗️ Memory

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { Memory } from 'xpander-sdk';
```

## 📖 Description

Represents a memory thread in xpanderAI, handling storage, retrieval, and processing of memory messages and related operations.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new Memory()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | No description |
| `id` | `string` | ✅ | No description |
| `messages` | `IMemoryMessage[]` | ✅ | No description |
| `userDetails` | `string` | ✅ | No description |
| `memoryType` | `MemoryType` | ✅ | No description |
| `metadata` | `{ [key: string]: any }` | ❌ | No description |

</details>

**Usage:**

```typescript
const instance = new Memory(agent, id);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `systemMessage`

| Property | Value |
|----------|-------|
| **Type** | `any[]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `id`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `llmProvider`

The LLM provider to be used for message processing.

| Property | Value |
|----------|-------|
| **Type** | `LLMProvider` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `memoryType`

| Property | Value |
|----------|-------|
| **Type** | `MemoryType` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `messages`

| Property | Value |
|----------|-------|
| **Type** | `IMemoryMessage[]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `metadata`

| Property | Value |
|----------|-------|
| **Type** | `{ [key: string]: any }` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `userDetails`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### ➕ `addKnowledgeBase()`

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```typescript
const result = agent.addKnowledgeBase();
```

---

#### ➕ `addMessages()`

> Adds messages to the memory thread.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `_messages` | `any` | ✅ | - An array of messages to be added to the memory thread. |

</details>

**Usage:**

```typescript
const result = agent.addMessages(_messages);
```

---

#### ➕ `addToolCallResults()`

> Adds tool call results as messages to the memory thread.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCallResults` | `ToolCallResult[]` | ✅ | - An array of tool call results to be added as messages. |

</details>

**Usage:**

```typescript
const result = agent.addToolCallResults(toolCallResults);
```

---

#### 📥 `retrieveMessages()`

> Retrieves the messages stored in the memory thread.

<details>
<summary>📋 Method Details</summary>

**Returns:** `any[]`

</details>

**Usage:**

```typescript
const result = agent.retrieveMessages();
```

---

#### ✏️ `updateMessages()`

> Updates the message history for the agent by sending the provided messages to the server.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `_messages` | `any` | ✅ | - The messages to be updated. |

</details>

**Usage:**

```typescript
const result = agent.updateMessages(_messages);
```

---

### 🔄 Other Methods

#### ➕ `initInstructions()`

> Initializes the memory thread with system instructions if no messages exist.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `instructions` | `AgentInstructions` | ✅ | - Instructions to initialize the memory thread. |

</details>

**Usage:**

```typescript
const result = agent.initInstructions(instructions);
```

---

#### ➕ `initMessages()`

> Initializes the thread with input and instructions.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `IMemoryMessage` | ✅ | - Initial user input message. |
| `instructions` | `AgentInstructions` | ✅ | - Instructions to initialize the memory thread. |
| `llmProvider` | `LLMProvider` | ❌ | No description |
| `files` | `string[]` | ❌ | No description |

</details>

**Usage:**

```typescript
const result = agent.initMessages(input, instructions);
```

---

## ⚡ Static Methods

#### ➕ `create()`

> Creates a new memory thread for the specified agent.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | - The agent for which the memory thread is created. |
| `userDetails` | `UserDetails` | ❌ | - Optional user details associated with the memory thread. |
| `threadMetadata` | `{ [key: string]: any }` | ❌ | No description |

**Returns:** `Memory`

</details>

**Usage:**

```typescript
const result = agent.create(agent, userDetails);
```

---

#### 🗑️ `deleteThreadById()`

> Deletes a memory thread by its ID.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `any` | ✅ | - The agent instance containing configuration details. |
| `threadId` | `string` | ✅ | - The ID of the thread to delete. |

</details>

**Usage:**

```typescript
const result = agent.deleteThreadById(agent, threadId);
```

---

#### 🔧 `fetch()`

> Fetches an existing memory thread by its ID.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `any` | ✅ | - The agent associated with the memory thread. |
| `threadId` | `string` | ✅ | - The ID of the memory thread to fetch. |

**Returns:** `Memory`

</details>

**Usage:**

```typescript
const result = agent.fetch(agent, threadId);
```

---

#### 🔧 `fetchUserThreads()`

> Fetches the memory threads associated with a given agent.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `any` | ✅ | - The agent whose memory threads are to be retrieved. |

**Returns:** `MemoryThread[]`

</details>

**Usage:**

```typescript
const result = agent.fetchUserThreads(agent);
```

---

#### 🔧 `renameThreadById()`

> Renames a memory thread by its ID.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `any` | ✅ | - The agent instance containing configuration details. |
| `threadId` | `string` | ✅ | - The ID of the thread to rename. |
| `name` | `string` | ✅ | - The new name for the thread. |

</details>

**Usage:**

```typescript
const result = agent.renameThreadById(agent, threadId);
```

---

#### ✏️ `update()`

> Updates an existing memory thread for a specified agent.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | - The agent for which the memory thread should be updated. |
| `threadId` | `string` | ✅ | - The unique identifier of the memory thread to update. |
| `delta` | `{ [key: string]: any }` | ❌ | - Optional object containing the fields and values to update in the memory thread. |

**Returns:** `Memory`

</details>

**Usage:**

```typescript
const result = agent.update(agent, threadId);
```

---

## Usage Example

<details>
<summary>📝 TypeScript Memory Usage</summary>

```typescript
import { Memory } from 'xpander-sdk';

// Work with Memory - methods found dynamically
const memory = agent.memory;
const messages = memory.messages;
console.log(`Messages count: ${messages.length}`);

// Add messages
const newMessages = [
    { role: "user", content: "Hello!" },
    { role: "assistant", content: "Hi there!" }
];
memory.addMessages(newMessages);

console.log("Memory operations complete!");
```

</details>

