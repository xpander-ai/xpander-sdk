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

## 🏗️ Agents

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { Agents } from 'xpander-sdk';
```

## 📖 Description

Manages a collection of Agent instances in xpanderAI, providing methods to list, retrieve, and initialize agents, including custom agents.

## 🏗️ Constructor

#### 🏗️ `new Agents()`

> Constructs an instance of the Agents manager.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configuration` | `Configuration` | ✅ | - Configuration settings for managing agents. |

</details>

**Usage:**

```typescript
const instance = new Agents(configuration);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `agentsList`

Collection of Agent instances managed by this class.

| Property | Value |
|----------|-------|
| **Type** | `UnloadedAgent[]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `configuration`

- Configuration settings for managing agents.

| Property | Value |
|----------|-------|
| **Type** | `Configuration` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### ➕ `create()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | ✅ | - The name of the agent to be created. |
| `type` | `AgentType` | ❌ | - The type of the agent, defaults to Regular. |

**Returns:** `Agent`

</details>

**Usage:**

```typescript
const result = agent.create(name, type);
```

---

#### 📥 `get()`

> Retrieves a specific agent by its ID and initializes it.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agentId` | `string` | ✅ | - The unique identifier of the agent to retrieve. |
| `version` | `number` | ❌ | No description |

**Returns:** `Agent`

</details>

**Usage:**

```typescript
const result = agent.get(agentId, version);
```

---

### 🛠️ Utility Methods

#### 🔧 `list()`

> Retrieves the list of agents from the API and populates the local agents list.

<details>
<summary>📋 Method Details</summary>

**Returns:** `UnloadedAgent[]`

</details>

**Usage:**

```typescript
const result = agent.list();
```

---

## Usage Example

<details>
<summary>📝 TypeScript Agents Usage</summary>

```typescript
import { Agents } from 'xpander-sdk';

// Create Agents instance
const agents = new Agents();


// Access key property: agentsList
const value = agents.agentsList;
console.log(`agentsList: ${value}`);



// Call key method: create
const result = agents.create();
console.log(`Result: ${result}`);


console.log("Agents ready!");
```

</details>

