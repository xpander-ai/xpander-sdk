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

## 🏗️ KnowledgeBaseItem

**Language:** Python | **Type:** Class

## 📦 Installation & Import

```python
from xpander_sdk import KnowledgeBaseItem
```

## 📖 Description

Represents a knowledge base in the xpander.ai system. Used to manage documents stored within the knowledge base.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new KnowledgeBaseItem()`

> Creates a new KnowledgeBaseItem instance.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configuration` | `Configuration` | ✅ | - The configuration instance used for interacting with the xpander.ai API. |
| `id` | `string` | ✅ | - The unique identifier of the knowledge base. |
| `name` | `string` | ✅ | - The name of the knowledge base. |
| `description` | `string` | ✅ | - The description of the knowledge base. |
| `type` | `KnowledgeBaseType` | ✅ | - The type of the knowledge base. |
| `organizationId` | `string` | ✅ | - The ID of the organization to which the knowledge base belongs. |
| `totalDocuments` | `number` | ✅ | - The total number of documents in the knowledge base. |

</details>

**Usage:**

```python
instance = KnowledgeBaseItem(configuration, id)
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `description`

- The description of the knowledge base.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `id`

- The unique identifier of the knowledge base.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `name`

- The name of the knowledge base.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `organizationId`

- The ID of the organization to which the knowledge base belongs.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `totalDocuments`

- The total number of documents in the knowledge base.

| Property | Value |
|----------|-------|
| **Type** | `number` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `type`

- The type of the knowledge base.

| Property | Value |
|----------|-------|
| **Type** | `KnowledgeBaseType` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### ➕ `addDocuments()`

> Adds new documents to the knowledge base using the xpander.ai API.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `List[string]` | ✅ | - An array of document URLs to be added to the knowledge base. |
| `sync` | `boolean` | ❌ | - Optional. |

**Returns:** `List[KnowledgeBaseDocument]`

</details>

**Usage:**

```python
result = agent.addDocuments(urls, sync=None)
```

---

### 🛠️ Utility Methods

#### 🔧 `listDocuments()`

> Retrieves the list of documents in the knowledge base from the xpander.ai API.

<details>
<summary>📋 Method Details</summary>

**Returns:** `List[KnowledgeBaseDocument]`

</details>

**Usage:**

```python
result = agent.listDocuments()
```

---

## Usage Example

<details>
<summary>🐍 Python KnowledgeBaseItem Usage</summary>

```python
from xpander_sdk import KnowledgeBaseItem

# Create KnowledgeBaseItem instance
knowledgebaseitem = KnowledgeBaseItem()


# Access key property: description
value = knowledgebaseitem.description
print(f"description: {value}")



# Call key method: addDocuments
result = knowledgebaseitem.addDocuments()
print(f"Result: {result}")


print("KnowledgeBaseItem ready!")
```

</details>

