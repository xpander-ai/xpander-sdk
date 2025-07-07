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

## 🏗️ XpanderClient

**Language:** Python | **Type:** Class

## 📦 Installation & Import

```python
from xpander_sdk import XpanderClient
```

## 📖 Description

XpanderClient provides methods for configuring and interacting with xpanderAI tools, managing agents, and extracting tool calls from LLM responses.

## 🏗️ Constructor

#### 🏗️ `new XpanderClient()`

> Constructs a new XpanderClient instance.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | ✅ | No description |
| `baseUrl` | `any` | ❌ | No description |
| `organizationId` | `string` | ❌ | No description |
| `should_reset_cache` | `boolean` | ❌ | No description |

</details>

**Usage:**

```python
instance = XpanderClient(apiKey, baseUrl=None)
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `agents`

Instance of Agents to manage xpanderAI agents.

| Property | Value |
|----------|-------|
| **Type** | `Agents` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `configuration`

Configuration settings for the xpanderAI client.

| Property | Value |
|----------|-------|
| **Type** | `Configuration` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `knowledgeBases`

Instance of Knowledgebases to manage xpanderAI knowledge bases.

| Property | Value |
|----------|-------|
| **Type** | `KnowledgeBases` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## ⚡ Static Methods

#### 🔍 `extractToolCalls()`

> Extracts tool calls from an LLM response based on the specified LLM provider.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `llmResponse` | `any` | ✅ | - The LLM response to analyze for tool calls. |
| `llmProvider` | `LLMProvider` | ❌ | - The LLM provider, defaults to OPEN_AI. |

**Returns:** `List[ToolCall]`

</details>

**Usage:**

```python
result = agent.extractToolCalls(llmResponse, llmProvider=None)
```

---

#### 📥 `retrievePendingLocalToolCalls()`

> Filters and retrieves local tool calls from a given list of tool calls.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolCalls` | `List[ToolCall]` | ✅ | - The list of tool calls to filter. |

**Returns:** `List[ToolCall]`

</details>

**Usage:**

```python
result = agent.retrievePendingLocalToolCalls(toolCalls)
```

---

## Usage Example

<details>
<summary>🐍 Python XpanderClient Usage</summary>

```python
from xpander_sdk import XpanderClient

# Create client instance
client = XpanderClient(
    api_key="your-api-key",
    organization_id="your-org-id"
)


print("XpanderClient ready!")

```



</details>

