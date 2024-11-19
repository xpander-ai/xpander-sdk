# Xpander SDK

**Xpander Open Source SDK** empowers developers to build intelligent and reliable AI Agents capable of managing complex, multi-step tasks across diverse systems and platforms. The SDK simplifies challenges like function calling, schema definition, graph enforcement, and prompt group management.

With support for leading LLM providers such as OpenAI, Amazon Bedrock, and NVIDIA NIM, the **Xpander SDK** seamlessly integrates into your existing systems.

![ai-agents-with-xpander](static/images/screenshots/2024-11-19-21-45-27.png)


## 📦 Installation

Choose your preferred package manager:

### npm

```bash
npm install xpander-sdk
```

### pip

```bash
pip install xpander-sdk
```

## 🚀 Getting Started

### Prerequisites

1. Visit [app.xpander.ai](https://app.xpander.ai)
2. Retrieve your Agent Key from the Agent Settings page
3. Install the SDK and make sure you have Node.js installed (required as the SDK runs as a Node.js app under the hood)

### Quick Start Examples

<details>

<summary>TypeScript</summary>

```typescript
import { XpanderClient } from 'xpander-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const xpanderAPIKey = process.env.XPANDER_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';

const xpanderClient = new XpanderClient({ apiKey: xpanderAPIKey });
const agent = await xpanderClient.agents.get(xpanderAgentID);

// Get available tools for the agent
const tools = await agent.getTools();

// This is a placeholder for AI to analyze the tools and decide which to invoke
// You would typically send these tools to your AI provider (e.g., OpenAI, Anthropic)
// The AI will return a structured response indicating which tools to call
const llmResponse = await yourAIProvider.chat.completions.create({
  messages: [userMessage],
  tools: tools // The tools are formatted for the AI to understand
  // ... other AI configuration
});

// Parse LLM response automatically into tool calls
const toolsToRun = XpanderClient.extractToolCalls(llmResponse);

// Execute multiple tool calls at once
const results = await agent.runTools(toolsToRun);
```

</details>

<details>
<summary>JavaScript</summary>

```javascript
const { XpanderClient } = require('xpander-sdk');
require('dotenv').config();

const xpanderAPIKey = process.env.XPANDER_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';

const xpanderClient = new XpanderClient({ apiKey: xpanderAPIKey });
const agent = await xpanderClient.agents.get(xpanderAgentID);

// Get available tools for the agent
const tools = await agent.getTools();

// This is a placeholder for AI to analyze the tools and decide which to invoke
// You would typically send these tools to your AI provider (e.g., OpenAI, Anthropic)
// The AI will return a structured response indicating which tools to call
const llmResponse = await yourAIProvider.chat.completions.create({
  messages: [userMessage],
  tools: tools // The tools are formatted for the AI to understand
  // ... other AI configuration
});

// Parse LLM response automatically into tool calls
const toolsToRun = XpanderClient.extractToolCalls(llmResponse);

// Execute multiple tool calls at once
const results = await agent.runTools(toolsToRun);
```

</details>

<details>
<summary>Python</summary>

```python
from xpander_sdk import XpanderClient
from dotenv import load_dotenv
import os

load_dotenv()

xpanderAPIKey = os.environ.get("XPANDER_API_KEY", "")
xpanderAgentID = os.environ.get("XPANDER_AGENT_ID", "")

xpander_client = XpanderClient(api_key=xpanderAPIKey)
agent = xpander_client.agents.get(agent_id=xpanderAgentID)

# Get available tools for the agent
tools = agent.get_tools()

# This is a placeholder for AI to analyze the tools and decide which to invoke
# You would typically send these tools to your AI provider (e.g., OpenAI, Anthropic)
# The AI will return a structured response indicating which tools to call
llm_response = your_ai_provider.chat.completions.create(
    messages=[user_message],
    tools=tools  # The tools are formatted for the AI to understand
    # ... other AI configuration
)

# Parse LLM response automatically into tool calls
tools_to_run = XpanderClient.extract_tool_calls(llm_response=llm_response.model_dump())

# Execute multiple tool calls at once
results = agent.run_tools(tools_to_run)
```

</details>

<details>
<summary>C#</summary>

```csharp
using Xpander.Sdk;
using DotEnv.Net;

new DotEnvLoader().Load();

var xpanderAPIKey = Environment.GetEnvironmentVariable("XPANDER_API_KEY") ?? "";
var xpanderAgentID = Environment.GetEnvironmentVariable("XPANDER_AGENT_ID") ?? "";

var xpanderClient = new XpanderClient(xpanderAPIKey);
var agent = await xpanderClient.Agents.GetAsync(xpanderAgentID);

// Get available tools for the agent
var tools = await agent.GetToolsAsync();

// This is a placeholder for AI to analyze the tools and decide which to invoke
// You would typically send these tools to your AI provider (e.g., OpenAI, Anthropic)
// The AI will return a structured response indicating which tools to call
var llmResponse = await yourAIProvider.chat.completions.create({
  messages: [userMessage],
  tools: tools // The tools are formatted for the AI to understand
  // ... other AI configuration
});

// Parse LLM response automatically into tool calls
var toolsToRun = XpanderClient.ExtractToolCalls(llmResponse);

// Execute multiple tool calls at once
var results = await agent.RunToolsAsync(toolsToRun);
```

</details>

## 📚 Documentation

For comprehensive documentation, tutorials, and API references, visit:

- [Official Documentation](https://docs.xpander.ai/userguides/overview/introduction)
- [API Reference](https://docs.xpander.ai/api-reference/SDK/getting-started)

## ⚙️ Technical Note

The library is compiled using Projen and runs as a Node.js application under the hood. Ensure you have Node.js installed for optimal performance.

## 🤝 Contributing

We welcome contributions to improve the SDK. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit improvements and bug fixes.
