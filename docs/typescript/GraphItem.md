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

## 🏗️ GraphItem

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { GraphItem } from 'xpander-sdk';
```

## 📖 Description

Represents a single item (node) in an agent's graph structure.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new GraphItem()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | No description |
| `id` | `string` | ❌ | No description |
| `itemId` | `string` | ❌ | No description |
| `name` | `string` | ❌ | No description |
| `type` | `AgentGraphItemType` | ❌ | No description |
| `isLocalTool` | `boolean` | ❌ | No description |
| `targets` | `string[]` | ❌ | No description |
| `settings` | `any` | ❌ | No description |

</details>

**Usage:**

```typescript
const instance = new GraphItem(agent, id);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `id`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `isLocalTool`

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `itemId`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `name`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `targets`

| Property | Value |
|----------|-------|
| **Type** | `string[]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `type`

| Property | Value |
|----------|-------|
| **Type** | `AgentGraphItemType` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

### ⚙️ Optional Properties

#### ⚙️ `settings`

| Property | Value |
|----------|-------|
| **Type** | `any` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 🔄 Other Methods

#### 🔗 `connect()`

> Connects this graph item to other graph items, creating edges in the graph.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targets` | `GraphItem[]` | ✅ | - The target graph items to connect to. |

**Returns:** `GraphItem`

</details>

**Usage:**

```typescript
const result = agent.connect(targets);
```

---

#### 🔧 `save()`

> Saves the current graph item state to the server.

<details>
<summary>📋 Method Details</summary>

**Returns:** `GraphItem`

</details>

**Usage:**

```typescript
const result = agent.save();
```

---

## Usage Example

<details>
<summary>📝 TypeScript GraphItem Usage</summary>

```typescript
import { GraphItem } from 'xpander-sdk';

// Create GraphItem instance
const graphitem = new GraphItem();


// Access key property: id
const value = graphitem.id;
console.log(`id: ${value}`);



// Call key method: connect
const result = graphitem.connect();
console.log(`Result: ${result}`);


console.log("GraphItem ready!");
```

</details>

