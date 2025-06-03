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

## 🏗️ AgenticOperation

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { AgenticOperation } from 'xpander-sdk';
```

## 📖 Description

Represents an agentic operation with metadata and execution details.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new AgenticOperation()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | ✅ | No description |
| `name` | `string` | ✅ | No description |
| `summary` | `string` | ✅ | No description |
| `description` | `string` | ✅ | No description |
| `idToUseOnGraph` | `string` | ✅ | No description |
| `interfaceId` | `string` | ✅ | No description |
| `isFunction` | `boolean` | ✅ | No description |
| `method` | `string` | ✅ | No description |
| `path` | `string` | ✅ | No description |

</details>

**Usage:**

```typescript
const instance = new AgenticOperation(id, name);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `description`

| Property | Value |
|----------|-------|
| **Type** | `string` |
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

#### 📝 `idToUseOnGraph`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `interfaceId`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `isFunction`

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `method`

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

#### 📝 `path`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `summary`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## Usage Example

<details>
<summary>📝 TypeScript AgenticOperation Usage</summary>

```typescript
import { AgenticOperation } from 'xpander-sdk';

// Create AgenticOperation instance
const agenticoperation = new AgenticOperation();


// Access key property: description
const value = agenticoperation.description;
console.log(`description: ${value}`);




console.log("AgenticOperation ready!");
```

</details>

