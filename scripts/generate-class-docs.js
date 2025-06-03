#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Enhanced documentation generator that creates individual files per class
 * Generates concise, LLM-friendly documentation from .jsii manifest
 * NOW WITH Standard API DATA INTEGRATION! 🔥
 */

function generateClassDocs() {
  console.log('🚀 Generating per-class documentation...');

  // Check for live data
  const liveDataPath = path.join(process.cwd(), 'docs', 'live-examples', 'live-data.json');
  let liveData = null;
  
  if (fs.existsSync(liveDataPath)) {
    try {
      liveData = JSON.parse(fs.readFileSync(liveDataPath, 'utf8'));
      console.log('📊 Live data found! Using real API outputs for examples');
      console.log(`📊 Using ${liveData.successful_calls || 0} real API responses`);
    } catch (error) {
      console.log('⚠️  Could not parse live data, using dynamic examples');
    }
  } else {
    console.log('💡 No live data found. Run "npm run docs:live" to capture real API outputs');
  }

  // Read the .jsii manifest
  const jsiiPath = path.join(process.cwd(), '.jsii');
  if (!fs.existsSync(jsiiPath)) {
    console.error('❌ .jsii file not found. Please build the project first.');
    process.exit(1);
  }

  const jsiiManifest = JSON.parse(fs.readFileSync(jsiiPath, 'utf8'));
  const types = jsiiManifest.types || {};

  // Create docs directories
  const docsDir = path.join(process.cwd(), 'docs');
  const pythonDocsDir = path.join(docsDir, 'python');
  const typescriptDocsDir = path.join(docsDir, 'typescript');

  // Ensure directories exist
  [docsDir, pythonDocsDir, typescriptDocsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Generate documentation for each type with live data integration
  Object.entries(types).forEach(([fqn, typeInfo]) => {
    if (typeInfo.kind === 'class' || typeInfo.kind === 'interface') {
      generateClassDoc(fqn, typeInfo, pythonDocsDir, 'python', liveData);
      generateClassDoc(fqn, typeInfo, typescriptDocsDir, 'typescript', liveData);
    }
  });

  // Generate index files
  generateIndexFile(types, pythonDocsDir, 'python', liveData);
  generateIndexFile(types, typescriptDocsDir, 'typescript', liveData);

  console.log('✅ Documentation generated successfully!');
  console.log(`📁 Python docs: ${pythonDocsDir}`);
  console.log(`📁 TypeScript docs: ${typescriptDocsDir}`);
  
  if (liveData) {
    console.log('✅ Documentation enhanced with live API data');
  } else {
    console.log('💡 To get real API outputs, run: npm run docs:live');
  }
}

function generateClassDoc(fqn, typeInfo, outputDir, language, liveData) {
  const className = fqn.split('.').pop();
  const fileName = `${className}.md`;
  const filePath = path.join(outputDir, fileName);

  const content = generateClassMarkdown(fqn, typeInfo, language, liveData);
  fs.writeFileSync(filePath, content);
}

function generateClassMarkdown(fqn, typeInfo, language, liveData) {
  const className = fqn.split('.').pop();
  const packageName = language === 'python' ? 'xpander_sdk' : 'xpander-sdk';
  const emoji = getClassEmoji(typeInfo.kind);
  
  // Start with beautiful branding header
  let content = generateBranding(className, typeInfo, language, liveData);

  // Add import statement with better formatting
  content += `## 📦 Installation & Import\n\n`;
  if (language === 'python') {
    content += `\`\`\`python\nfrom ${packageName} import ${className}\n\`\`\`\n\n`;
  } else {
    content += `\`\`\`typescript\nimport { ${className} } from '${packageName}';\n\`\`\`\n\n`;
  }

  // Add description with better formatting
  if (typeInfo.docs?.summary || typeInfo.docs?.remarks) {
    content += `## 📖 Description\n\n`;
    if (typeInfo.docs?.summary) {
      content += `${typeInfo.docs.summary}\n\n`;
    }
    if (typeInfo.docs?.remarks) {
      content += `> ${typeInfo.docs.remarks}\n\n`;
    }
  }

  // Add inheritance info with better styling
  if (typeInfo.base) {
    const baseClassName = typeInfo.base.split('.').pop();
    content += `> 🔗 **Extends:** [\`${baseClassName}\`](${baseClassName}.md)\n\n`;
  }

  // Add constructor (for classes) with better formatting
  if (typeInfo.kind === 'class' && typeInfo.initializer) {
    content += `## 🏗️ Constructor\n\n`;
    content += generateMethodSignature(className, typeInfo.initializer, language, true, liveData);
  }

  // Add properties with better organization
  if (typeInfo.properties && typeInfo.properties.length > 0) {
    content += `## 📋 Properties\n\n`;
    
    // Group properties by type
    const { readonlyProps, optionalProps, requiredProps } = groupProperties(typeInfo.properties);
    
    if (requiredProps.length > 0) {
      content += `### ✅ Required Properties\n\n`;
      requiredProps.forEach(prop => {
        content += generatePropertyDoc(prop, language);
      });
    }
    
    if (optionalProps.length > 0) {
      content += `### ⚙️ Optional Properties\n\n`;
      optionalProps.forEach(prop => {
        content += generatePropertyDoc(prop, language);
      });
    }
    
    if (readonlyProps.length > 0) {
      content += `### 🔒 Read-only Properties\n\n`;
      readonlyProps.forEach(prop => {
        content += generatePropertyDoc(prop, language);
      });
    }
  }

  // Add methods with better organization
  if (typeInfo.methods && typeInfo.methods.length > 0) {
    const instanceMethods = typeInfo.methods.filter(m => !m.static);
    const staticMethods = typeInfo.methods.filter(m => m.static);
    
    if (instanceMethods.length > 0) {
      content += `## 🔧 Methods\n\n`;
      
      // Group methods by category
      const { crudMethods, utilityMethods, otherMethods } = groupMethods(instanceMethods);
      
      if (crudMethods.length > 0) {
        content += `### 💾 Data Operations\n\n`;
        crudMethods.forEach(method => {
          content += generateMethodSignature(method.name, method, language, false, liveData);
        });
      }
      
      if (utilityMethods.length > 0) {
        content += `### 🛠️ Utility Methods\n\n`;
        utilityMethods.forEach(method => {
          content += generateMethodSignature(method.name, method, language, false, liveData);
        });
      }
      
      if (otherMethods.length > 0) {
        content += `### 🔄 Other Methods\n\n`;
        otherMethods.forEach(method => {
          content += generateMethodSignature(method.name, method, language, false, liveData);
        });
      }
    }

    if (staticMethods.length > 0) {
      content += `## ⚡ Static Methods\n\n`;
      staticMethods.forEach(method => {
        content += generateMethodSignature(method.name, method, language, false, liveData);
      });
    }
  }

  // Add example usage with better formatting (enhanced with live data)
  content += generateExampleUsage(className, typeInfo, language, liveData);

  return content;
}

function generatePropertyDoc(prop, language) {
  const typeStr = formatType(prop.type, language);
  const emoji = getPropertyEmoji(prop);
  
  let content = `#### ${emoji} \`${prop.name}\`\n\n`;
  
  if (prop.docs?.summary) {
    content += `${prop.docs.summary}\n\n`;
  }

  // Type information with better styling
  content += `| Property | Value |\n`;
  content += `|----------|-------|\n`;
  content += `| **Type** | \`${typeStr}\` |\n`;
  
  if (prop.optional) {
    content += `| **Required** | ❌ Optional |\n`;
  } else {
    content += `| **Required** | ✅ Required |\n`;
  }
  
  if (prop.const) {
    content += `| **Access** | 🔒 Read-only |\n`;
  } else {
    content += `| **Access** | ✏️ Read/Write |\n`;
  }
  
  content += `\n---\n\n`;

  return content;
}

function generateMethodSignature(methodName, method, language, isConstructor = false, liveData) {
  const emoji = getMethodEmoji(methodName, isConstructor);
  let content = `#### ${emoji} \`${isConstructor ? 'new ' : ''}${methodName}()\`\n\n`;

  if (method.docs?.summary) {
    content += `> ${method.docs.summary}\n\n`;
  }

  // Create a beautiful signature table
  content += `<details>\n<summary>📋 Method Details</summary>\n\n`;

  // Parameters
  if (method.parameters && method.parameters.length > 0) {
    content += `**Parameters:**\n\n`;
    content += `| Parameter | Type | Required | Description |\n`;
    content += `|-----------|------|----------|-------------|\n`;
    
    method.parameters.forEach(param => {
      const typeStr = formatType(param.type, language);
      const required = param.optional ? '❌' : '✅';
      const description = param.docs?.summary || 'No description';
      content += `| \`${param.name}\` | \`${typeStr}\` | ${required} | ${description} |\n`;
    });
    content += '\n';
  }

  // Return type (for methods, not constructors)
  if (!isConstructor && method.returns) {
    const returnTypeStr = formatType(method.returns.type, language);
    content += `**Returns:** \`${returnTypeStr}\`\n\n`;
  }

  content += `</details>\n\n`;

  // Simplified example usage
  if (language === 'python') {
    const simpleParams = method.parameters ? 
      method.parameters.slice(0, 2).map(p => p.optional ? `${p.name}=None` : p.name).join(', ') : '';
    
    content += `**Usage:**\n\n\`\`\`python\n`;
    if (isConstructor) {
      content += `instance = ${methodName}(${simpleParams})\n`;
    } else {
      content += `result = agent.${methodName}(${simpleParams})\n`;
    }
    content += `\`\`\`\n\n`;
  } else {
    const simpleParams = method.parameters ? 
      method.parameters.slice(0, 2).map(p => p.name).join(', ') : '';
    
    content += `**Usage:**\n\n\`\`\`typescript\n`;
    if (isConstructor) {
      content += `const instance = new ${methodName}(${simpleParams});\n`;
    } else {
      content += `const result = agent.${methodName}(${simpleParams});\n`;
    }
    content += `\`\`\`\n\n`;
  }

  content += `---\n\n`;

  return content;
}

function formatType(type, language) {
  if (!type) return 'unknown';

  if (type.primitive) {
    return type.primitive;
  }

  if (type.fqn) {
    const className = type.fqn.split('.').pop();
    return className;
  }

  if (type.collection) {
    const elementType = formatType(type.collection.elementtype, language);
    if (type.collection.kind === 'array') {
      return language === 'python' ? `List[${elementType}]` : `${elementType}[]`;
    }
    if (type.collection.kind === 'map') {
      return language === 'python' ? `Dict[str, ${elementType}]` : `{ [key: string]: ${elementType} }`;
    }
  }

  if (type.union) {
    const types = type.union.types.map(t => formatType(t, language));
    return types.join(' | ');
  }

  return 'any';
}

function generateExampleUsage(className, typeInfo, language, liveData) {
  let content = `## Usage Example\n\n`;

  // Generate dynamic examples based on actual API structure + live data
  if (className === 'Agent') {
    content += generateEnhancedAgentExample(typeInfo, language, liveData);
  } else if (className === 'XpanderClient') {
    content += generateEnhancedClientExample(typeInfo, language, liveData);
  } else if (className === 'Memory' || className === 'MemoryThread') {
    content += generateEnhancedMemoryExample(className, typeInfo, language, liveData);
  } else if (className.includes('Tool') || className === 'ToolCall' || className === 'ToolCallResult') {
    content += generateEnhancedToolExample(className, typeInfo, language, liveData);
  } else if (className === 'Execution') {
    content += generateEnhancedExecutionExample(typeInfo, language, liveData);
  } else {
    // Generate a dynamic contextual example
    content += generateDynamicContextualExample(className, typeInfo, language);
  }

  return content;
}

function generateEnhancedAgentExample(typeInfo, language, liveData) {
  // Get real data if available and successful
  const agentData = liveData?.captured_outputs?.Agent_get?.success ? liveData.captured_outputs.Agent_get.data : null;
  const toolsData = liveData?.captured_outputs?.Agent_getTools?.success ? liveData.captured_outputs.Agent_getTools.data : null;
  const messagesData = liveData?.captured_outputs?.Agent_messages?.success ? liveData.captured_outputs.Agent_messages.data : null;
  const memoryData = liveData?.captured_outputs?.Memory_operations?.success ? liveData.captured_outputs.Memory_operations.data : null;
  
  // If no agent data available, use the basic dynamic example instead
  if (!agentData) {
    console.log('⚠️  No agent data available, using dynamic example');
    return generateDynamicAgentExample(typeInfo, language);
  }
  
  if (language === 'python') {
    return `<details>
<summary>🐍 Python Agent Implementation</summary>

\`\`\`python
"""
Agent implementation using available methods.
"""
from xpander_sdk import Agent, XpanderClient, LLMProvider
import asyncio

class MyAgent:
    def __init__(self, agent: Agent):
        self.agent = agent
        
    async def agent_loop(self, task: str):
        """Demonstrate core Agent workflow using available methods."""
        
        # Agent Information
        print(f"🤖 Agent: {self.agent.name}")
        print(f"📊 Status: {self.agent.status}")
        ${agentData ? `print(f"🔧 Tools available: {self.agent.tools_count}")` : 'print(f"🔧 Tools available: {len(self.agent.tools)}")'}
        
        # Get available tools
        tools = self.agent.get_tools(LLMProvider.OPEN_AI)
        ${toolsData ? `print(f"🎯 OpenAI format tools: {len(tools)}")` : 'print(f"🎯 OpenAI format tools: {len(tools)}")'}
        
        # Access conversation state
        messages = self.agent.messages
        ${messagesData ? `print(f"💬 Current messages: {len(messages)}")` : 'print(f"💬 Current messages: {len(messages)}")'}
        
        # Memory operations
        memory = self.agent.memory
        ${memoryData ? `print(f"🧠 Memory type: {memory.__class__.__name__}")` : 'print(f"🧠 Memory type: {memory.__class__.__name__}")'}
        
        # Main reasoning loop
        while not self.agent.is_finished():
            print("🤔 Agent thinking...")
            
            # Simulate LLM response with tool calls
            mock_response = {"choices": [{"message": {"tool_calls": []}}]}
            
            # Add LLM response to memory
            self.agent.add_messages(mock_response)
            
            # Extract and execute tool calls
            tool_calls = self.agent.extract_tool_calls(mock_response)
            results = self.agent.run_tools(tool_calls)
            print(f"⚡ Executed {len(results)} tools")
            
            break  # Break for demo
        
        # Get final result
        result = self.agent.retrieve_execution_result()
        print(f"✅ Final result: {result}")
        return result

# Usage
async def main():
    client = XpanderClient(api_key="your-api-key")
    agent = client.agents.get("your-agent-id")
    
    my_agent = MyAgent(agent)
    await my_agent.agent_loop("Complete my task")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

${liveData ? `
## Example Output:

\`\`\`
🤖 Agent: ${agentData?.name || 'Unknown'}
📊 Status: ${agentData?.status || 'Unknown'}
🔧 Tools available: ${agentData?.toolsCount || 0}
🎯 OpenAI format tools: ${toolsData?.count || 0}
💬 Current messages: ${messagesData?.count || 0}
🧠 Memory type: ${memoryData?.type || 'Unknown'}
⚡ Executed 0 tools
✅ Final result: [Execution result]
\`\`\`
` : ''}

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript Agent Implementation</summary>

\`\`\`typescript
/**
 * Agent implementation using available methods.
 */
import { Agent, XpanderClient, LLMProvider } from 'xpander-sdk';

export class MyAgent {
    private agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async agentLoop(task: string): Promise<any> {
        console.log("🚀 Starting Agent workflow");
        
        // Agent Information
        console.log(\`🤖 Agent: \${this.agent.name}\`);
        console.log(\`📊 Status: \${this.agent.status}\`);
        ${agentData ? `console.log(\`🔧 Tools available: \${this.agent.toolsCount}\`);` : 'console.log(`🔧 Tools available: ${this.agent.tools?.length}`);'}
        
        // Main reasoning loop
        while (!this.agent.isFinished()) {
            console.log("🤔 Agent thinking...");
            
            // Get available tools
            const tools = this.agent.getTools(LLMProvider.OPEN_AI);
            ${toolsData ? `console.log(\`🎯 OpenAI format tools: \${tools.length}\`);` : 'console.log(`🎯 OpenAI format tools: ${tools.length}`);'}
            
            // Access conversation state
            const messages = this.agent.messages;
            ${messagesData ? `console.log(\`💬 Current messages: \${messages.length}\`);` : 'console.log(`💬 Current messages: ${messages.length}`);'}
            
            // Simulate LLM response with tool calls
            const mockResponse = { choices: [{ message: { tool_calls: [] } }] };
            
            // Add LLM response to memory
            this.agent.addMessages(mockResponse);
            
            // Extract and execute tool calls
            const toolCalls = this.agent.extractToolCalls(mockResponse);
            const results = await this.agent.runTools(toolCalls);
            console.log(\`⚡ Executed \${results.length} tools\`);
            
            break; // Break for demo
        }
        
        // Get final result
        const result = this.agent.retrieveExecutionResult();
        console.log(\`✅ Final result: \${result}\`);
        return result;
    }
}

// Usage
async function main() {
    const client = new XpanderClient({ apiKey: "your-api-key" });
    const agent = client.agents.get("your-agent-id");
    
    const myAgent = new MyAgent(agent);
    await myAgent.agentLoop("Complete my task");
}

main().catch(console.error);
\`\`\`

${liveData ? `
## Example Output:

\`\`\`
🚀 Starting Agent workflow
🤖 Agent: ${agentData?.name || 'Unknown'}
📊 Status: ${agentData?.status || 'Unknown'}
🔧 Tools available: ${agentData?.toolsCount || 0}
🤔 Agent thinking...
🎯 OpenAI format tools: ${toolsData?.count || 0}
💬 Current messages: ${messagesData?.count || 0}
⚡ Executed 0 tools
✅ Final result: [Execution result]
\`\`\`
` : ''}

</details>

`;
  }
}

function generateEnhancedClientExample(typeInfo, language, liveData) {
  const clientData = liveData?.captured_outputs?.XpanderClient_init?.success ? liveData.captured_outputs.XpanderClient_init.data : null;
  
  if (language === 'python') {
    return `<details>
<summary>🐍 Python XpanderClient Usage</summary>

\`\`\`python
from xpander_sdk import XpanderClient

# Create client instance
client = XpanderClient(
    api_key="your-api-key",
    organization_id="your-org-id"
)

${clientData ? `
# Client information:
print(f"✅ Client status: {client.status}")
print(f"🏢 Organization: {client.org_id}")
print(f"📋 Has agents: {hasattr(client, 'agents')}")
` : `
print("XpanderClient ready!")
`}
\`\`\`

${liveData ? `
## Example Output:

\`\`\`
✅ Client status: ${clientData?.status || 'initialized'}
🏢 Organization: ${clientData?.configuration?.organizationId || 'your-org-id'}
📋 Has agents: ${clientData?.hasAgents || true}
\`\`\`
` : ''}

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript XpanderClient Usage</summary>

\`\`\`typescript
import { XpanderClient } from 'xpander-sdk';

// Create client instance
const client = new XpanderClient({
  apiKey: "your-api-key",
  organizationId: "your-org-id"
});

${clientData ? `
// Client information:
console.log(\`✅ Client status: \${client.status}\`);
console.log(\`🏢 Organization: \${client.orgId}\`);
console.log(\`📋 Has agents: \${'agents' in client}\`);
` : `
console.log("XpanderClient ready!");
`}
\`\`\`

${liveData ? `
## Example Output:

\`\`\`
✅ Client status: ${clientData?.status || 'initialized'}
🏢 Organization: ${clientData?.configuration?.organizationId || 'your-org-id'}
📋 Has agents: ${clientData?.hasAgents || true}
\`\`\`
` : ''}

</details>

`;
  }
}

function generateEnhancedMemoryExample(className, typeInfo, language, liveData) {
  const memoryData = liveData?.captured_outputs?.Memory_operations?.success ? liveData.captured_outputs.Memory_operations.data : null;
  
  return generateDynamicMemoryExample(className, typeInfo, language) + 
    (liveData && memoryData ? `
## Memory Information:

\`\`\`json
${JSON.stringify(memoryData, null, 2)}
\`\`\`
` : '');
}

function generateEnhancedToolExample(className, typeInfo, language, liveData) {
  const toolsData = liveData?.captured_outputs?.Agent_getTools?.success ? liveData.captured_outputs.Agent_getTools.data : null;
  const extractionData = liveData?.captured_outputs?.ToolCall_extraction?.success ? liveData.captured_outputs.ToolCall_extraction.data : null;
  
  return generateDynamicToolExample(className, typeInfo, language) +
    (liveData && (toolsData || extractionData) ? `
## Tool Information:

${toolsData ? `
### Available Tools:
\`\`\`json
${JSON.stringify(toolsData, null, 2)}
\`\`\`
` : ''}

${extractionData ? `
### Tool Call Extraction:
\`\`\`json
${JSON.stringify(extractionData, null, 2)}
\`\`\`
` : ''}
` : '');
}

function generateEnhancedExecutionExample(typeInfo, language, liveData) {
  const executionData = liveData?.captured_outputs?.Execution_create?.success ? liveData.captured_outputs.Execution_create.data : null;
  
  return generateDynamicExecutionExample(typeInfo, language) +
    (liveData && executionData ? `
## Execution Information:

\`\`\`json
${JSON.stringify(executionData, null, 2)}
\`\`\`
` : '');
}

function generateBranding(className, typeInfo, language, liveData) {
  const languageDisplay = language === 'python' ? 'Python' : 'TypeScript';
  const typeDisplay = typeInfo.kind === 'class' ? 'Class' : typeInfo.kind === 'interface' ? 'Interface' : 'Type';
  const emoji = getClassEmoji(typeInfo.kind);
  
  return `<h3 align="center">
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

## ${emoji} ${className}

**Language:** ${languageDisplay} | **Type:** ${typeDisplay}${liveData ? ' | **Live Data:** ✅ Available' : ''}

`;
}

function generateIndexFile(types, outputDir, language, liveData) {
  const indexPath = path.join(outputDir, 'README.md');
  
  let content = `# ${language === 'python' ? 'Python' : 'TypeScript'} API Documentation\n\n`;
  
  if (liveData) {
    content += `> Documentation includes examples with live API data.\n> Last updated: ${new Date(liveData.timestamp).toLocaleDateString()}\n\n`;
  }
  
  content += `This directory contains individual documentation files for each class in the xpander-sdk.\n\n`;
  
  // Group by type
  const classes = [];
  const interfaces = [];
  const enums = [];

  Object.entries(types).forEach(([fqn, typeInfo]) => {
    const className = fqn.split('.').pop();
    const item = { name: className, fqn, docs: typeInfo.docs };

    switch (typeInfo.kind) {
      case 'class':
        classes.push(item);
        break;
      case 'interface':
        interfaces.push(item);
        break;
      case 'enum':
        enums.push(item);
        break;
    }
  });

  if (classes.length > 0) {
    content += `## Classes\n\n`;
    classes.forEach(cls => {
      content += `- [${cls.name}](${cls.name}.md)`;
      if (cls.docs?.summary) {
        content += ` - ${cls.docs.summary}`;
      }
      content += '\n';
    });
    content += '\n';
  }

  if (interfaces.length > 0) {
    content += `## Interfaces\n\n`;
    interfaces.forEach(iface => {
      content += `- [${iface.name}](${iface.name}.md)`;
      if (iface.docs?.summary) {
        content += ` - ${iface.docs.summary}`;
      }
      content += '\n';
    });
    content += '\n';
  }

  if (enums.length > 0) {
    content += `## Enums\n\n`;
    enums.forEach(enm => {
      content += `- [${enm.name}](${enm.name}.md)`;
      if (enm.docs?.summary) {
        content += ` - ${enm.docs.summary}`;
      }
      content += '\n';
    });
    content += '\n';
  }

  if (liveData) {
    content += `## Documentation Statistics\n\n`;
    content += `- **Total API Calls Made**: ${liveData.total_calls}\n`;
    content += `- **Successful Calls**: ${liveData.successful_calls}\n`;
    content += `- **Failed Calls**: ${liveData.failed_calls}\n`;
    content += `- **Total Duration**: ${liveData.total_duration}ms\n`;
    content += `- **Generated On**: ${new Date(liveData.timestamp).toLocaleString()}\n\n`;
    content += `> To refresh live data, run: \`npm run docs:live\`\n\n`;
  }

  fs.writeFileSync(indexPath, content);
}

// Helper functions for better formatting

function getClassEmoji(kind) {
  switch (kind) {
    case 'class': return '🏗️';
    case 'interface': return '📋';
    case 'enum': return '🔢';
    default: return '📄';
  }
}

function getPropertyEmoji(prop) {
  if (prop.const) return '🔒';
  if (prop.optional) return '⚙️';
  return '📝';
}

function getMethodEmoji(methodName, isConstructor) {
  if (isConstructor) return '🏗️';
  
  const name = methodName.toLowerCase();
  if (name.includes('get') || name.includes('retrieve') || name.includes('load')) return '📥';
  if (name.includes('add') || name.includes('create') || name.includes('init')) return '➕';
  if (name.includes('delete') || name.includes('remove')) return '🗑️';
  if (name.includes('update') || name.includes('edit') || name.includes('modify')) return '✏️';
  if (name.includes('run') || name.includes('execute') || name.includes('process')) return '▶️';
  if (name.includes('attach') || name.includes('connect')) return '🔗';
  if (name.includes('enable') || name.includes('activate')) return '✅';
  if (name.includes('disable') || name.includes('deactivate')) return '❌';
  if (name.includes('extract') || name.includes('parse')) return '🔍';
  if (name.includes('report') || name.includes('metrics')) return '📊';
  if (name.includes('finish') || name.includes('complete')) return '🏁';
  
  return '🔧';
}

function groupProperties(properties) {
  const readonlyProps = properties.filter(p => p.const);
  const optionalProps = properties.filter(p => p.optional && !p.const);
  const requiredProps = properties.filter(p => !p.optional && !p.const);
  
  return { readonlyProps, optionalProps, requiredProps };
}

function groupMethods(methods) {
  const crudMethods = methods.filter(m => {
    const name = m.name.toLowerCase();
    return name.includes('get') || name.includes('retrieve') || name.includes('load') ||
           name.includes('add') || name.includes('create') || name.includes('update') ||
           name.includes('delete') || name.includes('remove');
  });
  
  const utilityMethods = methods.filter(m => {
    const name = m.name.toLowerCase();
    return name.includes('extract') || name.includes('parse') || name.includes('format') ||
           name.includes('validate') || name.includes('check') || name.includes('is') ||
           name.includes('has') || name.includes('can');
  });
  
  const otherMethods = methods.filter(m => 
    !crudMethods.includes(m) && !utilityMethods.includes(m)
  );
  
  return { crudMethods, utilityMethods, otherMethods };
}

function getExampleValue(type, language) {
  if (!type) return language === 'python' ? 'None' : 'null';
  
  if (type.primitive) {
    switch (type.primitive) {
      case 'string': return language === 'python' ? '"example"' : '"example"';
      case 'number': return '42';
      case 'boolean': return language === 'python' ? 'True' : 'true';
      default: return language === 'python' ? 'None' : 'null';
    }
  }
  
  if (type.fqn) {
    const className = type.fqn.split('.').pop();
    return `${className}()`;
  }
  
  if (type.collection) {
    if (type.collection.kind === 'array') {
      return language === 'python' ? '[]' : '[]';
    }
    if (type.collection.kind === 'map') {
      return language === 'python' ? '{}' : '{}';
    }
  }
  
  return language === 'python' ? 'None' : 'null';
}

// Additional dynamic example generators for fallback

function generateDynamicAgentExample(typeInfo, language) {
  const availableMethods = typeInfo.methods || [];
  const availableProperties = typeInfo.properties || [];
  
  // Find key methods dynamically
  const addTaskMethod = availableMethods.find(m => m.name === 'addTask');
  const getToolsMethod = availableMethods.find(m => m.name === 'getTools');
  const addMessagesMethod = availableMethods.find(m => m.name === 'addMessages');
  const runToolsMethod = availableMethods.find(m => m.name === 'runTools');
  const isFinishedMethod = availableMethods.find(m => m.name === 'isFinished');
  const extractToolCallsMethod = availableMethods.find(m => m.name === 'extractToolCalls');
  const retrieveExecutionResultMethod = availableMethods.find(m => m.name === 'retrieveExecutionResult');
  
  // Find key properties dynamically
  const messagesProperty = availableProperties.find(p => p.name === 'messages');
  
  if (language === 'python') {
    return `<details>
<summary>🐍 Python Agent Implementation</summary>

\`\`\`python
from xpander_sdk import Agent, XpanderClient, LLMProvider
import asyncio

class MyAgent:
    def __init__(self, agent: Agent):
        self.agent = agent
        
    async def agent_loop(self, task: str):
        """Demonstrate core Agent workflow using available methods."""
        
        # Agent workflow
        print(f"🤖 Agent: {self.agent.name}")
        print(f"📊 Status: {self.agent.status}")
        
        # Main reasoning loop
        while not self.agent.is_finished():
            print("🤔 Agent thinking...")
            
            # Get available tools
            tools = self.agent.get_tools(LLMProvider.OPEN_AI)
            print(f"🔧 Available tools: {len(tools)}")
            
            # Access conversation state
            messages = self.agent.messages
            print(f"💬 Messages: {len(messages)}")
            
            # Simulate LLM response with tool calls
            mock_response = {"choices": [{"message": {"tool_calls": []}}]}
            
            # Add LLM response to memory
            self.agent.add_messages(mock_response)
            
            # Extract and execute tool calls
            tool_calls = self.agent.extract_tool_calls(mock_response)
            results = self.agent.run_tools(tool_calls)
            print(f"⚡ Executed {len(results)} tools")
            
            break  # Break for demo
        
        # Get final result
        result = self.agent.retrieve_execution_result()
        print(f"✅ Final result: {result}")
        return result

# Usage
async def main():
    client = XpanderClient(api_key="your-api-key")
    agent = client.agents.get("your-agent-id")
    
    my_agent = MyAgent(agent)
    await my_agent.agent_loop("Complete my task")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript Agent Implementation</summary>

\`\`\`typescript
import { Agent, XpanderClient, LLMProvider } from 'xpander-sdk';

export class MyAgent {
    private agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async agentLoop(task: string): Promise<any> {
        console.log("🚀 Starting Agent workflow");
        
        // Agent workflow
        console.log(\`🤖 Agent: \${this.agent.name}\`);
        console.log(\`📊 Status: \${this.agent.status}\`);
        
        // Main reasoning loop
        while (!this.agent.isFinished()) {
            console.log("🤔 Agent thinking...");
            
            // Get available tools
            const tools = this.agent.getTools(LLMProvider.OPEN_AI);
            console.log(\`🔧 Available tools: \${tools.length}\`);
            
            // Access conversation state
            const messages = this.agent.messages;
            console.log(\`💬 Messages: \${messages.length}\`);
            
            // Simulate LLM response with tool calls
            const mockResponse = { choices: [{ message: { tool_calls: [] } }] };
            
            // Add LLM response to memory
            this.agent.addMessages(mockResponse);
            
            // Extract and execute tool calls
            const toolCalls = this.agent.extractToolCalls(mockResponse);
            const results = await this.agent.runTools(toolCalls);
            console.log(\`⚡ Executed \${results.length} tools\`);
            
            break; // Break for demo
        }
        
        // Get final result
        const result = this.agent.retrieveExecutionResult();
        console.log(\`✅ Final result: \${result}\`);
        return result;
    }
}

// Usage
async function main() {
    const client = new XpanderClient({ apiKey: "your-api-key" });
    const agent = client.agents.get("your-agent-id");
    
    const myAgent = new MyAgent(agent);
    await myAgent.agentLoop("Complete my task");
}

main().catch(console.error);
\`\`\`

</details>

`;
  }
}

function generateDynamicClientExample(typeInfo, language) {
  const availableMethods = typeInfo.methods || [];
  const constructor = typeInfo.initializer;
  
  if (language === 'python') {
    return `<details>
<summary>🐍 Python XpanderClient Usage</summary>

\`\`\`python
from xpander_sdk import XpanderClient

# Create client instance
client = XpanderClient(
    api_key="your-api-key",
    organization_id="your-org-id"
)

print("XpanderClient ready!")
\`\`\`

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript XpanderClient Usage</summary>

\`\`\`typescript
import { XpanderClient } from 'xpander-sdk';

// Create client instance
const client = new XpanderClient({
  apiKey: "your-api-key",
  organizationId: "your-org-id"
});

console.log("XpanderClient ready!");
\`\`\`

</details>

`;
  }
}

function generateDynamicMemoryExample(className, typeInfo, language) {
  if (language === 'python') {
    return `<details>
<summary>🐍 Python ${className} Usage</summary>

\`\`\`python
from xpander_sdk import ${className}

# Work with ${className} - methods found dynamically
memory = agent.memory
messages = memory.messages
print(f"Messages count: {len(messages)}")

# Add messages
new_messages = [
    {"role": "user", "content": "Hello!"},
    {"role": "assistant", "content": "Hi there!"}
]
memory.add_messages(new_messages)

print("${className} operations complete!")
\`\`\`

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript ${className} Usage</summary>

\`\`\`typescript
import { ${className} } from 'xpander-sdk';

// Work with ${className} - methods found dynamically
const memory = agent.memory;
const messages = memory.messages;
console.log(\`Messages count: \${messages.length}\`);

// Add messages
const newMessages = [
    { role: "user", content: "Hello!" },
    { role: "assistant", content: "Hi there!" }
];
memory.addMessages(newMessages);

console.log("${className} operations complete!");
\`\`\`

</details>

`;
  }
}

function generateDynamicToolExample(className, typeInfo, language) {
  if (language === 'python') {
    return `<details>
<summary>🐍 Python ${className} Usage</summary>

\`\`\`python
from xpander_sdk import ${className}

# Work with ${className} - properties found dynamically
print(f"Tool name: {tool_call.name}")
print(f"Payload: {tool_call.payload}")
\`\`\`

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript ${className} Usage</summary>

\`\`\`typescript
import { ${className} } from 'xpander-sdk';

// Work with ${className} - properties found dynamically
console.log(\`Tool name: \${toolCall.name}\`);
console.log(\`Payload: \${JSON.stringify(toolCall.payload)}\`);
\`\`\`

</details>

`;
  }
}

function generateDynamicExecutionExample(typeInfo, language) {
  if (language === 'python') {
    return `<details>
<summary>🐍 Python Execution Usage</summary>

\`\`\`python
from xpander_sdk import Execution

# Work with Execution - properties found dynamically
print(f"Execution ID: {execution.id}")
print(f"Status: {execution.status}")
print(f"Result: {execution.result}")
\`\`\`

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript Execution Usage</summary>

\`\`\`typescript
import { Execution } from 'xpander-sdk';

// Work with Execution - properties found dynamically
console.log(\`Execution ID: \${execution.id}\`);
console.log(\`Status: \${execution.status}\`);
console.log(\`Result: \${execution.result}\`);
\`\`\`

</details>

`;
  }
}

function generateDynamicContextualExample(className, typeInfo, language) {
  const availableMethods = typeInfo.methods || [];
  const availableProperties = typeInfo.properties || [];
  const constructor = typeInfo.initializer;
  
  const keyMethod = availableMethods.find(m => !m.static);
  const keyProperty = availableProperties[0];
  
  if (language === 'python') {
    return `<details>
<summary>🐍 Python ${className} Usage</summary>

\`\`\`python
from xpander_sdk import ${className}

# Create ${className} instance
${className.toLowerCase()} = ${className}()

${keyProperty ? `
# Access key property: ${keyProperty.name}
value = ${className.toLowerCase()}.${keyProperty.name}
print(f"${keyProperty.name}: {value}")
` : ''}

${keyMethod ? `
# Call key method: ${keyMethod.name}
result = ${className.toLowerCase()}.${keyMethod.name}()
print(f"Result: {result}")
` : ''}

print("${className} ready!")
\`\`\`

</details>

`;
  } else {
    return `<details>
<summary>📝 TypeScript ${className} Usage</summary>

\`\`\`typescript
import { ${className} } from 'xpander-sdk';

// Create ${className} instance
const ${className.toLowerCase()} = new ${className}();

${keyProperty ? `
// Access key property: ${keyProperty.name}
const value = ${className.toLowerCase()}.${keyProperty.name};
console.log(\`${keyProperty.name}: \${value}\`);
` : ''}

${keyMethod ? `
// Call key method: ${keyMethod.name}
const result = ${className.toLowerCase()}.${keyMethod.name}();
console.log(\`Result: \${result}\`);
` : ''}

console.log("${className} ready!");
\`\`\`

</details>

`;
  }
}

// Run the generator
if (require.main === module) {
  generateClassDocs();
}

module.exports = { generateClassDocs }; 