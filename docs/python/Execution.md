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

## 🏗️ Execution

**Language:** Python | **Type:** Class

## 📦 Installation & Import

```python
from xpander_sdk import Execution
```

## 📖 Description

Represents an execution of an agent in xpanderAI, including its input, status, memory, and other related details.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new Execution()`

> Constructs a new Execution instance.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | ✅ | - Unique identifier of the execution. |
| `agentId` | `string` | ✅ | - Identifier of the agent performing the execution. |
| `organizationId` | `string` | ✅ | - Identifier of the organization associated with the execution. |
| `input` | `IExecutionInput` | ✅ | - Input provided for the execution. |
| `status` | `ExecutionStatus` | ✅ | - Current status of the execution. |
| `lastExecutedNodeId` | `string` | ❌ | - Identifier of the last executed node. |
| `memoryThreadId` | `string` | ❌ | - Identifier of the memory thread associated with the execution. |
| `parentExecution` | `string` | ❌ | No description |
| `workerId` | `string` | ❌ | - Identifier of the worker associated with the execution. |
| `result` | `string` | ❌ | No description |
| `llmTokens` | `Tokens` | ❌ | No description |
| `agentVersion` | `any` | ❌ | No description |

</details>

**Usage:**

```python
instance = Execution(id, agentId)
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `inputMessage`

Retrieves the input message formatted as a memory message.

| Property | Value |
|----------|-------|
| **Type** | `IMemoryMessage` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `agentId`

- Identifier of the agent performing the execution.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `agentVersion`

| Property | Value |
|----------|-------|
| **Type** | `any` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `id`

- Unique identifier of the execution.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `input`

- Input provided for the execution.

| Property | Value |
|----------|-------|
| **Type** | `IExecutionInput` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `lastExecutedNodeId`

- Identifier of the last executed node.

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

- Identifier of the memory thread associated with the execution.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `organizationId`

- Identifier of the organization associated with the execution.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `parentExecution`

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

#### 📝 `status`

- Current status of the execution.

| Property | Value |
|----------|-------|
| **Type** | `ExecutionStatus` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `workerId`

- Identifier of the worker associated with the execution.

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

## ⚡ Static Methods

#### ➕ `create()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | No description |
| `input` | `string` | ✅ | No description |
| `files` | `List[string]` | ✅ | No description |
| `workerId` | `string` | ❌ | No description |
| `threadId` | `string` | ❌ | No description |
| `parentExecutionId` | `string` | ❌ | No description |
| `toolCallName` | `string` | ❌ | No description |
| `agentVersion` | `any` | ❌ | No description |

**Returns:** `any`

</details>

**Usage:**

```python
result = agent.create(agent, input)
```

---

#### 🔧 `fetch()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | No description |
| `executionId` | `string` | ✅ | No description |

**Returns:** `any`

</details>

**Usage:**

```python
result = agent.fetch(agent, executionId)
```

---

#### ➕ `initExecution()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `createdExecution` | `any` | ✅ | No description |

**Returns:** `Execution`

</details>

**Usage:**

```python
result = agent.initExecution(createdExecution)
```

---

#### 📥 `retrievePendingExecution()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | No description |
| `workerId` | `string` | ✅ | No description |

**Returns:** `any`

</details>

**Usage:**

```python
result = agent.retrievePendingExecution(agent, workerId)
```

---

#### ✏️ `update()`

> Updates an execution with the specified delta changes.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | - The agent associated with the execution. |
| `execution_id` | `string` | ✅ | - The ID of the execution to update. |
| `delta` | `Dict[str, any]` | ✅ | - A record of changes to apply to the execution. |

**Returns:** `any`

</details>

**Usage:**

```python
result = agent.update(agent, execution_id)
```

---

## Usage Example

<details>
<summary>🐍 Python Execution Usage</summary>

```python
from xpander_sdk import Execution

# Work with Execution - properties found dynamically
print(f"Execution ID: {execution.id}")
print(f"Status: {execution.status}")
print(f"Result: {execution.result}")
```

</details>

