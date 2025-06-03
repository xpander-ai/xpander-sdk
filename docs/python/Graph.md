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

## 🏗️ Graph

**Language:** Python | **Type:** Class

## 📦 Installation & Import

```python
from xpander_sdk import Graph
```

## 📖 Description

Represents a graph structure containing nodes related to an agent.

> 🔗 **Extends:** [`Base`](Base.md)

## 🏗️ Constructor

#### 🏗️ `new Graph()`

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | `Agent` | ✅ | No description |
| `items` | `List[GraphItem]` | ✅ | No description |

</details>

**Usage:**

```python
instance = Graph(agent, items)
```

---

## 📋 Properties

### ✅ Required Properties

#### 📝 `isEmpty`

Checks whether the graph is empty.

| Property | Value |
|----------|-------|
| **Type** | `boolean` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `mcpNodes`

| Property | Value |
|----------|-------|
| **Type** | `List[GraphItem]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `nodes`

Gets the list of nodes in the graph.

| Property | Value |
|----------|-------|
| **Type** | `List[GraphItem]` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

#### 📝 `textual`

| Property | Value |
|----------|-------|
| **Type** | `string` |
| **Required** | ✅ Required |
| **Access** | ✏️ Read/Write |

---

### ⚙️ Optional Properties

#### ⚙️ `lastNode`

Gets the last node in the graph.

| Property | Value |
|----------|-------|
| **Type** | `GraphItem` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

#### ⚙️ `lastNodeInSequence`

Gets the last node in sequence.

| Property | Value |
|----------|-------|
| **Type** | `GraphItem` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

#### ⚙️ `rootNode`

| Property | Value |
|----------|-------|
| **Type** | `GraphItem` |
| **Required** | ❌ Optional |
| **Access** | ✏️ Read/Write |

---

## 🔧 Methods

### 💾 Data Operations

#### ➕ `addNode()`

> Adds a new node to the graph.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `node` | `Agent | GraphItem` | ✅ | - The node to add, which can be an agent or a graph item. |

**Returns:** `GraphItem`

</details>

**Usage:**

```python
result = agent.addNode(node)
```

---

### 🔄 Other Methods

#### 🔧 `findNodeByItemId()`

> Finds a node in the graph by its item ID.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `itemId` | `string` | ✅ | - The item ID to search for. |

**Returns:** `GraphItem`

</details>

**Usage:**

```python
result = agent.findNodeByItemId(itemId)
```

---

#### 🔧 `findNodeByName()`

> Finds a node in the graph by its name.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | ✅ | - The item ID to search for. |

**Returns:** `GraphItem`

</details>

**Usage:**

```python
result = agent.findNodeByName(name)
```

---

#### 🔧 `findNodeByNodeId()`

> Finds a node in the graph by its node ID.

<details>
<summary>📋 Method Details</summary>

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `nodeId` | `string` | ✅ | - The node ID to search for. |

**Returns:** `GraphItem`

</details>

**Usage:**

```python
result = agent.findNodeByNodeId(nodeId)
```

---

#### 🔧 `reset()`

> Resets the graph for the associated agent.

<details>
<summary>📋 Method Details</summary>

</details>

**Usage:**

```python
result = agent.reset()
```

---

## Usage Example

<details>
<summary>🐍 Python Graph Usage</summary>

```python
from xpander_sdk import Graph

# Create Graph instance
graph = Graph()


# Access key property: isEmpty
value = graph.isEmpty
print(f"isEmpty: {value}")



# Call key method: addNode
result = graph.addNode()
print(f"Result: {result}")


print("Graph ready!")
```

</details>

