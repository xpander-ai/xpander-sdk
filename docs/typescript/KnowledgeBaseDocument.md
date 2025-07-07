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

## 🏗️ KnowledgeBaseDocument

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { KnowledgeBaseDocument } from 'xpander-sdk';
```

## 📖 Description

Represents a knowledge base document in the xpander.ai system. This is used to reference a document within a knowledge base.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new KnowledgeBaseDocument()`

> Creates a new KnowledgeBaseDocument instance.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configuration` | `Configuration` | ✅ | - The configuration instance used for interacting with the xpander.ai API. |
| `id` | `string` | ✅ | - The unique identifier of the document. |
| `kbId` | `string` | ✅ | - The identifier of the knowledge base this document belongs to. |
| `documentUrl` | `string` | ✅ | - The URL of the document stored in the knowledge base. |

</details>

**Usage:**

```typescript
const instance = new KnowledgeBaseDocument(configuration, id);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `documentUrl`

- The URL of the document stored in the knowledge base.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `id`

- The unique identifier of the document.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `kbId`

- The identifier of the knowledge base this document belongs to.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### 🗑️ `delete()`

> Deletes the document from the knowledge base via the xpander.ai API.

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```typescript
const result = agent.delete();
```

---

## Usage Example

<details>
<summary>📝 TypeScript KnowledgeBaseDocument Usage</summary>

```typescript
import { KnowledgeBaseDocument } from 'xpander-sdk';

// Create KnowledgeBaseDocument instance
const knowledgebasedocument = new KnowledgeBaseDocument();


// Access key property: documentUrl
const value = knowledgebasedocument.documentUrl;
console.log(`documentUrl: ${value}`);



// Call key method: delete
const result = knowledgebasedocument.delete();
console.log(`Result: ${result}`);


console.log("KnowledgeBaseDocument ready!");
```

</details>

