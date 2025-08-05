# xpander.ai SDK

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Documentation](https://img.shields.io/badge/docs-available-brightgreen.svg)](https://docs.xpander.ai) [![PyPI Version](https://img.shields.io/pypi/v/xpander-sdk?label=PyPI)](https://pypi.org/project/xpander-sdk/) [![Downloads](https://pepy.tech/badge/xpander-sdk)](https://pepy.tech/project/xpander-sdk)


The official Python SDK for xpander.ai - a powerful Backend-as-a-Service (BaaS) platform for building, deploying, and managing AI agents at scale.

## 🚀 Overview

xpander.ai SDK provides comprehensive tools for:

- **Agent Management**: Create, configure, and manage AI agents
- **Task Execution**: Handle complex task workflows and execution
- **Tools Repository**: Integrate external tools and services
- **Knowledge Bases**: Manage and search knowledge repositories
- **Event Handling**: Event-driven programming with decorators
- **Real-time Monitoring**: Track agent performance and execution

## 📦 Installation

```bash
pip install xpander-sdk
```

### With Optional Dependencies

```bash
# For Agno framework support
pip install xpander-sdk[agno]

# For development
pip install xpander-sdk[dev]
```

## 🔧 Quick Start

### 1. Configuration

```python
from xpander_sdk import Configuration

# Using environment variables (recommended)
config = Configuration()

# Or explicit configuration
config = Configuration(
    api_key="your-api-key",
    organization_id="your-org-id",
    base_url="https://inbound.xpander.ai"
)
```

### 2. Basic Agent Operations

```python
from xpander_sdk import Agents, Agent, Tasks

# Initialize agents module
agents = Agents(configuration=config)

# List all agents
agent_list = await agents.alist()

# Load existing agent
agent = await agents.aget("agent-id")

# Create and execute a task
task = await agent.acreate_task(
    prompt="Help me analyze this data",
    file_urls=["https://example.com/data.csv"]
)
```

### 3. Task Management

```python
from xpander_sdk import Tasks, Task

# Initialize tasks module
tasks = Tasks(configuration=config)

# Load and manage tasks
task = await tasks.aget("task-id")
await task.aset_status(AgentExecutionStatus.Running)
await task.asave()
```

### 4. Tools Integration

```python
from xpander_sdk import register_tool, ToolsRepository

# Register a local tool
@register_tool
def check_weather(location: str) -> str:
    """Check weather for a given location."""
    return f"Weather in {location}: Sunny, 25°C"

# Register a tool with graph synchronization
@register_tool(add_to_graph=True)
async def analyze_data(data: list, analysis_type: str) -> dict:
    """Analyze data from multiple sources."""
    return {
        "analysis_type": analysis_type,
        "data_points": len(data),
        "status": "completed"
    }

# Use tools repository
tools = ToolsRepository(configuration=config)
weather_tool = tools.get_tool_by_id("check_weather")
result = await weather_tool.ainvoke(
    agent_id="agent-id",
    payload={"location": "New York"}
)
```

### 5. Knowledge Base Operations

```python
from xpander_sdk import KnowledgeBases, KnowledgeBase

# Initialize knowledge bases
kb_module = KnowledgeBases(configuration=config)

# Create knowledge base
kb = await kb_module.acreate(
    name="Company Docs",
    description="Internal documentation"
)

# Add documents
documents = await kb.aadd_documents([
    "https://example.com/doc1.pdf",
    "https://example.com/doc2.txt"
])

# Search knowledge base
results = await kb.asearch(
    search_query="product pricing",
    top_k=5
)
```

### 6. Event-Driven Programming

```python
from xpander_sdk import on_task, Events

# Basic task handler
@on_task
async def handle_task(task):
    print(f"Processing task: {task.id}")
    # Task processing logic here
    task.result = "Task processed successfully"
    return task

# Task handler with configuration
@on_task(configuration=config)
def sync_task_handler(task):
    print(f"Handling task synchronously: {task.id}")
    task.result = "Sync processing complete"
    return task

```

## 📚 Core Modules

| Module              | Description                               | Documentation                                                                            |
| ------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Agents**          | Agent creation, management, and execution | [Agents Guide](https://github.com/xpander-ai/xpander-sdk/blob/main/docs/AGENTS.md)       |
| **Tasks**           | Task lifecycle and execution management   | [Tasks Guide](https://github.com/xpander-ai/xpander-sdk/blob/main/docs/TASKS.md)         |
| **ToolsRepository** | External tools and integrations           | [Tools Guide](https://github.com/xpander-ai/xpander-sdk/blob/main/docs/TOOLS.md)         |
| **KnowledgeBases**  | Knowledge management and search           | [Knowledge Guide](https://github.com/xpander-ai/xpander-sdk/blob/main/docs/KNOWLEDGE.md) |
| **Events**          | Event-driven programming                  | [Events Guide](https://github.com/xpander-ai/xpander-sdk/blob/main/docs/EVENTS.md)       |
| **Backend**         | Agent runtime arguments for frameworks    | [Backend Guide](https://github.com/xpander-ai/xpander-sdk/blob/main/docs/BACKEND.md)     |

## 🔄 Async/Sync Support

The SDK provides both asynchronous and synchronous interfaces:

```python
# Asynchronous (recommended for production)
agent = await Agent.aload("agent-id")
task = await agent.acreate_task(prompt="input data")

# Synchronous (convenient for scripts)
agent = Agent.load("agent-id")
task = agent.create_task(prompt="input data")
```

## 📖 Advanced Examples

### Multi-Agent Orchestration

```python
# Load multiple specialized agents
agents_list = await agents.alist()
data_agent = await agents.aget("data-agent-id")
writer_agent = await agents.aget("writer-agent-id")

# Chain agent executions
analysis_task = await data_agent.acreate_task(prompt="Analyze sales data")
report_task = await writer_agent.acreate_task(
    prompt=f"Write a report based on: {analysis_task.result}"
)
```

### Tool Integration with MCP Servers

```python
from xpander_sdk import MCPServerDetails, MCPServerType

# Configure MCP server
mcp_server = MCPServerDetails(
    name="data-server",
    type=MCPServerType.STDIO,
    command="python",
    args=["-m", "mcp_server"],
    env={"API_KEY": "your-key"}
)

# MCP servers are configured at the platform level
# and tools become available through ToolsRepository
```

### Streaming Task Execution

```python
# Create a task with event streaming enabled
task = await agent.acreate_task(
    prompt="complex analysis task",
    events_streaming=True
)

# Stream events from the task
async for event in task.aevents():
    print(f"Event Type: {event.type}")
    print(f"Event Data: {event.data}")
```

### Local Task Testing

```python
from xpander_sdk.modules.tasks.models.task import LocalTaskTest, AgentExecutionInput
from xpander_sdk.models.shared import OutputFormat
from xpander_sdk import on_task

# Define a local test task
local_task = LocalTaskTest(
    input=AgentExecutionInput(text="What can you do?"),
    output_format=OutputFormat.Json,
    output_schema={"capabilities": "list of capabilities"}
)

# Test with local task
@on_task(test_task=local_task)
async def handle_test_task(task):
    task.result = {
        "capabilities": [
            "Data analysis",
            "Text processing", 
            "API integration"
        ]
    }
    return task
```

## 🧪 Testing

```bash
# Run tests
pytest tests/

# Run with coverage
pytest tests/ --cov=xpander_sdk

# Run specific test
pytest tests/test_agents.py::test_agent_creation
```

## 🏗️ Architecture

```plaintext
xpander_sdk/
├── core/                   # Core API client and base classes
├── models/                 # Pydantic models and configurations
├── modules/
│   ├── agents/            # Agent management
│   ├── tasks/             # Task execution
│   ├── tools_repository/  # Tools and integrations
│   ├── knowledge_bases/   # Knowledge management
│   ├── events/            # Event handling
│   └── backend/           # Agent runtime arguments for frameworks
└── utils/                 # Utility functions
```

## 🔒 Authentication

The SDK supports multiple authentication methods:

### Environment Variables (Recommended)

```bash
export XPANDER_API_KEY="your-api-key"
export XPANDER_ORGANIZATION_ID="your-org-id"
export XPANDER_BASE_URL="https://inbound.xpander.ai" # Optional
export XPANDER_AGENT_ID="your-agent-id" # Optional for Backend module
```

### Configuration Object

```python
config = Configuration(
    api_key="your-api-key",
    organization_id="your-org-id"
)
```

### From File

```python
# .env file
XPANDER_API_KEY=your-api-key
XPANDER_ORGANIZATION_ID=your-org-id

# Python code
from dotenv import load_dotenv
load_dotenv()
config = Configuration()
```

## 🔄 Error Handling

```python
from xpander_sdk.exceptions import ModuleException

try:
    agent = await Agent.aload("invalid-agent-id")
except ModuleException as e:
    print(f"Error {e.status_code}: {e.description}")
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: [https://docs.xpander.ai](https://docs.xpander.ai)
- **Issues**: [GitHub Issues](https://github.com/xpander-ai/xpander-sdk/issues)
- **Email**: dev@xpander.ai

---

Built with ❤️ by the xpander.ai team
