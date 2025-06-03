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

## 🏗️ LLMMetrics

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { LLMMetrics } from 'xpander-sdk';
```

> 🔗 **Extends:** [`MetricsBase`](MetricsBase.md)

## 🏗️ Constructor

#### 🏗️ `new LLMMetrics()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sourceNodeType` | `string` | ✅ | No description |
| `finishReason` | `string` | ❌ | No description |
| `provider` | `LLMProvider` | ❌ | No description |
| `model` | `string` | ❌ | No description |
| `duration` | `number` | ❌ | No description |
| `promptTokens` | `number` | ❌ | No description |
| `completionTokens` | `number` | ❌ | No description |
| `totalTokens` | `number` | ❌ | No description |
| `functionName` | `string[]` | ❌ | No description |

</details>

**Usage:**

```typescript
const instance = new LLMMetrics(sourceNodeType, finishReason);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `completionTokens`

| Property | Value |
|----------|-------|
| **Type** | `number` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `duration`

| Property | Value |
|----------|-------|
| **Type** | `number` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `finishReason`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `functionName`

| Property | Value |
|----------|-------|
| **Type** | `string[]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `model`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `promptTokens`

| Property | Value |
|----------|-------|
| **Type** | `number` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `provider`

| Property | Value |
|----------|-------|
| **Type** | `LLMProvider` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `sourceNodeType`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `totalTokens`

| Property | Value |
|----------|-------|
| **Type** | `number` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## Usage Example

<details>
<summary>📝 TypeScript LLMMetrics Usage</summary>

```typescript
import { LLMMetrics } from 'xpander-sdk';

// Create LLMMetrics instance
const llmmetrics = new LLMMetrics();


// Access key property: completionTokens
const value = llmmetrics.completionTokens;
console.log(`completionTokens: ${value}`);




console.log("LLMMetrics ready!");
```

</details>

