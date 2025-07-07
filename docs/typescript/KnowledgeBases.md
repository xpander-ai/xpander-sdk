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

## 🏗️ KnowledgeBases

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { KnowledgeBases } from 'xpander-sdk';
```

## 📖 Description

Manages a collection of knowledge bases in the xpander.ai system, providing methods to list, retrieve, and create individual knowledge bases.

## 🏗️ Constructor

#### 🏗️ `new KnowledgeBases()`

> Constructs an instance of the KnowledgeBases manager.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configuration` | `Configuration` | ✅ | - Configuration settings for managing knowledge bases. |

</details>

**Usage:**

```typescript
const instance = new KnowledgeBases(configuration);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `configuration`

- Configuration settings for managing knowledge bases.

| Property | Value |
|----------|-------|
| **Type** | `Configuration` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### ➕ `create()`

> Creates a new knowledge base using the xpander.ai API.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | ✅ | - The name of the new knowledge base. |
| `description` | `string` | ❌ | - Optional. |

**Returns:** `KnowledgeBaseItem`

</details>

**Usage:**

```typescript
const result = agent.create(name, description);
```

---

#### 📥 `get()`

> Retrieves a specific knowledge base by its ID from the xpander.ai API.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `knowledgeBaseId` | `string` | ✅ | - The unique identifier of the knowledge base to retrieve. |

**Returns:** `KnowledgeBaseItem`

</details>

**Usage:**

```typescript
const result = agent.get(knowledgeBaseId);
```

---

### 🛠️ Utility Methods

#### 🔧 `list()`

> Retrieves the list of knowledge bases from the xpander.ai API.

<details>
<summary>📋 Method Details</summary>

**Returns:** `KnowledgeBaseItem[]`

</details>

**Usage:**

```typescript
const result = agent.list();
```

---

## Usage Example

<details>
<summary>📝 TypeScript KnowledgeBases Usage</summary>

```typescript
import { KnowledgeBases } from 'xpander-sdk';

// Create KnowledgeBases instance
const knowledgebases = new KnowledgeBases();


// Access key property: configuration
const value = knowledgebases.configuration;
console.log(`configuration: ${value}`);



// Call key method: create
const result = knowledgebases.create();
console.log(`Result: ${result}`);


console.log("KnowledgeBases ready!");
```

</details>

