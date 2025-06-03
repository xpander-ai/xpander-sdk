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

## 🏗️ ExecutionMetrics

**Language:** Python | **Type:** Class

## 📦 Installation & Import

```python
from xpander_sdk import ExecutionMetrics
```

> 🔗 **Extends:** [`MetricsBase`](MetricsBase.md)

## 🏗️ Constructor

#### 🏗️ `new ExecutionMetrics()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source` | `string` | ✅ | No description |
| `executionId` | `string` | ✅ | No description |
| `subExecutions` | `List[string]` | ❌ | No description |
| `memoryThreadId` | `string` | ❌ | No description |
| `task` | `string` | ❌ | No description |
| `triggeredBy` | `string` | ❌ | No description |
| `skills` | `List[string]` | ❌ | No description |
| `status` | `string` | ❌ | No description |
| `duration` | `number` | ❌ | No description |
| `aiModel` | `string` | ❌ | No description |
| `worker` | `string` | ❌ | No description |
| `aiEmployeeId` | `string` | ❌ | No description |
| `apiCallsMade` | `List[any]` | ❌ | No description |
| `result` | `string` | ❌ | No description |
| `llmTokens` | `Tokens` | ❌ | No description |

</details>

**Usage:**

```python
instance = ExecutionMetrics(source, executionId)
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `aiEmployeeId`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `aiModel`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `apiCallsMade`

| Property | Value |
|----------|-------|
| **Type** | `List[any]` |
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

#### 📝 `executionId`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `llmTokens`

| Property | Value |
|----------|-------|
| **Type** | `Tokens` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `memoryThreadId`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `result`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `skills`

| Property | Value |
|----------|-------|
| **Type** | `List[string]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `source`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `status`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `subExecutions`

| Property | Value |
|----------|-------|
| **Type** | `List[string]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `task`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `triggeredBy`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `worker`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## Usage Example

<details>
<summary>🐍 Python ExecutionMetrics Usage</summary>

```python
from xpander_sdk import ExecutionMetrics

# Create ExecutionMetrics instance
executionmetrics = ExecutionMetrics()


# Access key property: aiEmployeeId
value = executionmetrics.aiEmployeeId
print(f"aiEmployeeId: {value}")




print("ExecutionMetrics ready!")
```

</details>

