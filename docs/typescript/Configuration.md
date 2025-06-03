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

## 🏗️ Configuration

**Language:** TypeScript | **Type:** Class

## 📦 Installation & Import

```typescript
import { Configuration } from 'xpander-sdk';
```

## 📖 Description

Manages the configuration settings for the xpanderAI client.

> This class encapsulates settings such as the API key, base URL,
metrics reporting, and optional organization-specific parameters.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new Configuration()`

> Constructs a new Configuration instance.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `__0` | `IConfiguration` | ✅ | - The API key for xpanderAI. |

</details>

**Usage:**

```typescript
const instance = new Configuration(__0);
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `url`

Constructs the full API endpoint URL.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `apiKey`

API key for authenticating requests to xpanderAI.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `baseUrl`

Base URL for the xpanderAI API requests.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

### ⚙️ Optional Properties

#### ⚙️ `organizationId`

Optional organization ID for scoped API requests.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

## Usage Example

<details>
<summary>📝 TypeScript Configuration Usage</summary>

```typescript
import { Configuration } from 'xpander-sdk';

// Create Configuration instance
const configuration = new Configuration();


// Access key property: url
const value = configuration.url;
console.log(`url: ${value}`);




console.log("Configuration ready!");
```

</details>

