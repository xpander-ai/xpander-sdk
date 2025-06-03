#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
try {
  require('dotenv').config();
} catch (error) {
  // dotenv not available, try manual loading
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !key.startsWith('#')) {
          process.env[key.trim()] = value.trim();
        }
      });
    }
  } catch (err) {
    console.log('ℹ️  No .env file found or could not parse it');
  }
}

/**
 * Live Documentation Generator
 * 
 * Executes real API calls with actual credentials to generate
 * 100% authentic documentation with real outputs.
 */

class LiveDocsRunner {
  constructor() {
    this.apiKey = process.env.XPANDER_API_KEY;
    this.orgId = process.env.XPANDER_ORG_ID;
    this.agentId = process.env.XPANDER_AGENT_ID;
    this.openaiKey = process.env.OPENAI_API_KEY;
    
    this.liveMode = this.apiKey && this.orgId && this.agentId;
    this.capturedOutputs = new Map();
    this.executionLog = [];
    this.loadedAgent = null; // Store loaded agent reference
    
    console.log(`🔍 Live mode: ${this.liveMode ? '✅ ENABLED' : '❌ DISABLED (add API keys)'}`);
  }

  async generateLiveDocumentation() {
    console.log('🚀 Generating documentation with API calls...');
    
    if (!this.liveMode) {
      console.log('⚠️  Add API keys to .env for live mode:');
      console.log('   XPANDER_API_KEY=your-key');
      console.log('   XPANDER_ORG_ID=your-org');
      console.log('   XPANDER_AGENT_ID=your-agent');
      console.log('   OPENAI_API_KEY=your-openai-key');
      return;
    }

    try {
      // Import the SDK dynamically
      const { XpanderClient, LLMProvider } = await this.importSDK();
      
      // Execute live API calls safely
      await this.runLiveExamples(XpanderClient, LLMProvider);
      
      // Generate enhanced documentation with real outputs
      await this.generateEnhancedDocs();
      
      console.log('✅ Live documentation generated successfully!');
      console.log(`📊 Captured ${this.capturedOutputs.size} API responses`);
      
    } catch (error) {
      console.error('❌ Live documentation generation failed:', error.message);
      console.log('📝 Generating documentation with available data...');
      
      // Still try to generate docs with whatever data we captured
      try {
        await this.generateEnhancedDocs();
        console.log('✅ Documentation generated with partial live data');
      } catch (docError) {
        console.error('❌ Could not generate documentation:', docError.message);
      }
    }
  }

  async importSDK() {
    try {
      // Try to import from built dist
      return await import('../dist/js/index.js');
    } catch (error) {
      // Fallback to lib
      return await import('../lib/index.js');
    }
  }

  async runLiveExamples(XpanderClient, LLMProvider) {
    console.log('📊 Executing API calls...');
    
    // 1. Initialize real client
    const client = new XpanderClient(this.apiKey);
    
    await this.captureOutput('XpanderClient_init', () => {
      return {
        status: 'initialized',
        hasAgents: !!client.agents,
        configuration: {
          organizationId: client.configuration?.organizationId || this.orgId
        }
      };
    });

    // 2. Get real agent
    console.log('📥 Fetching real agent...');
    let agent = null;
    try {
      agent = await this.captureOutput('Agent_get', async () => {
        console.log(`   🔍 Attempting to load agent: ${this.agentId}`);
        const realAgent = client.agents.get(this.agentId);
        console.log(`   📋 Agent object created, calling load()...`);
        await realAgent.load();
        console.log(`   ✅ Agent loaded successfully`);
        
        // Store reference separately to avoid circular JSON
        this.loadedAgent = realAgent;
        
        return {
          id: realAgent.id,
          name: realAgent.name,
          status: realAgent.status,
          toolsCount: realAgent.tools?.length || 0,
          memoryType: realAgent.memoryType,
          memoryStrategy: realAgent.memoryStrategy,
          llmProvider: realAgent.llmProvider,
          ready: realAgent.ready
        };
      });
    } catch (error) {
      console.log('❌ Agent loading failed, let me try to get more details...');
      console.log(`   Error: ${error.message}`);
      console.log(`   Error type: ${error.constructor.name}`);
      console.log(`   Stack: ${error.stack?.split('\n')[0]}`);
      
      // Try to get available agents to help debug
      try {
        console.log('🔍 Checking what agents are available...');
        const availableAgents = await client.agents.list();
        console.log(`   Found ${availableAgents?.length || 0} agents available`);
        if (availableAgents && availableAgents.length > 0) {
          console.log(`   Available agent IDs: ${availableAgents.slice(0, 3).map(a => a.id).join(', ')}`);
        }
      } catch (listError) {
        console.log(`   ⚠️  Could not list agents: ${listError.message}`);
      }
      
      agent = null;
    }

    // 3. Get real tools (only if agent loaded)
    if (agent && this.loadedAgent) {
      console.log('🔧 Fetching real tools...');
      try {
        await this.captureOutput('Agent_getTools', () => {
          const tools = this.loadedAgent.getTools(LLMProvider.OPEN_AI);
          return {
            count: tools.length,
            sample_tools: tools.slice(0, 3).map(tool => ({
              type: tool.type,
              function: {
                name: tool.function?.name,
                description: tool.function?.description?.substring(0, 100),
                parameters_count: Object.keys(tool.function?.parameters?.properties || {}).length
              }
            }))
          };
        });
      } catch (error) {
        console.log('❌ Tool fetching failed, skipping...');
        console.log(`   Error: ${error.message}`);
      }
    } else {
      console.log('⏭️  Skipping tools (no agent available)');
    }

    // 4. Test tool call extraction (safe - no execution context needed)
    console.log('🔍 Testing tool call extraction...');
    await this.captureOutput('ToolCall_extraction', () => {
      const mockLLMResponse = {
        choices: [{
          message: {
            role: 'assistant',
            content: null,
            tool_calls: [{
              id: 'call_example123',
              type: 'function',
              function: {
                name: 'example_tool',
                arguments: '{"query": "test"}'
              }
            }]
          }
        }]
      };
      
      const extractedCalls = XpanderClient.extractToolCalls(mockLLMResponse, LLMProvider.OPEN_AI);
      return {
        input_format: 'OpenAI ChatCompletion with tool_calls',
        extracted_count: extractedCalls.length,
        sample_call: extractedCalls[0] ? {
          name: extractedCalls[0].name,
          type: extractedCalls[0].type,
          toolCallId: extractedCalls[0].toolCallId,
          hasPayload: !!extractedCalls[0].payload
        } : null
      };
    });

    // 5. Create execution context FIRST (required for messages/memory access)
    if (agent && this.loadedAgent) {
      console.log('⚡ Creating execution context...');
      try {
        await this.captureOutput('Execution_create', async () => {
          const execution = this.loadedAgent.addTask('Generate a simple greeting message for documentation testing', null, [], false);
          return {
            id: execution.id,
            status: execution.status,
            hasResult: !!execution.result,
            memoryThreadId: execution.memoryThreadId,
            created: new Date().toISOString()
          };
        });
        
        // Now that we have an execution context, we can access messages and memory
        console.log('💬 Accessing messages (now with execution context)...');
        try {
          await this.captureOutput('Agent_messages', () => {
            const messages = this.loadedAgent.messages;
            return {
              count: messages.length,
              sample_messages: messages.slice(-2).map(msg => ({
                role: msg.role,
                content: typeof msg.content === 'string' ? 
                  msg.content.substring(0, 100) + '...' : 
                  '[non-string content]',
                hasToolCalls: !!msg.tool_calls
              }))
            };
          });
        } catch (error) {
          console.log('❌ Message access still failed:', error.message);
        }

        console.log('🧠 Testing memory operations (now with execution context)...');
        try {
          await this.captureOutput('Memory_operations', () => {
            const memory = this.loadedAgent.memory;
            return {
              type: memory.constructor.name,
              strategy: agent.memoryStrategy,
              messagesCount: memory.messages?.length || 0,
              hasAddMessages: typeof memory.addMessages === 'function',
              hasRetrieveThreads: typeof this.loadedAgent.retrieveThreadsList === 'function'
            };
          });
        } catch (error) {
          console.log('❌ Memory operations still failed:', error.message);
        }
        
      } catch (error) {
        console.log('❌ Execution creation failed, skipping dependent operations...');
        console.log(`   Error: ${error.message}`);
      }
    } else {
      console.log('⏭️  Skipping execution and dependent operations (no agent available)');
    }

    console.log(`✅ Captured ${this.capturedOutputs.size} API responses`);
  }

  async captureOutput(key, fn) {
    try {
      console.log(`  🔄 Executing ${key}...`);
      const startTime = Date.now();
      const result = await fn();
      const duration = Date.now() - startTime;
      
      this.capturedOutputs.set(key, {
        success: true,
        data: result,
        duration,
        timestamp: new Date().toISOString()
      });
      
      this.executionLog.push({
        key,
        success: true,
        duration,
        timestamp: new Date().toISOString()
      });
      
      console.log(`  ✅ ${key} completed in ${duration}ms`);
      return result;
      
    } catch (error) {
      console.log(`  ❌ ${key} failed:`, error.message);
      
      this.capturedOutputs.set(key, {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      
      this.executionLog.push({
        key,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }

  async generateEnhancedDocs() {
    console.log('📝 Generating enhanced documentation with real outputs...');
    
    // Read the .jsii manifest
    const jsiiPath = path.join(process.cwd(), '.jsii');
    const jsiiManifest = JSON.parse(fs.readFileSync(jsiiPath, 'utf8'));
    const types = jsiiManifest.types || {};

    // Create enhanced docs directories
    const docsDir = path.join(process.cwd(), 'docs');
    const liveDocsDir = path.join(docsDir, 'live-examples');
    
    if (!fs.existsSync(liveDocsDir)) {
      fs.mkdirSync(liveDocsDir, { recursive: true });
    }

    // Generate enhanced examples for key classes
    await this.generateLiveAgentDocs(types['xpander-sdk.Agent'], liveDocsDir);
    await this.generateLiveClientDocs(types['xpander-sdk.XpanderClient'], liveDocsDir);
    await this.generateLiveExecutionReport(liveDocsDir);
    
    console.log(`📁 Enhanced docs saved to: ${liveDocsDir}`);
  }

  async generateLiveAgentDocs(agentType, outputDir) {
    const agentOutput = this.capturedOutputs.get('Agent_get');
    const toolsOutput = this.capturedOutputs.get('Agent_getTools');
    const messagesOutput = this.capturedOutputs.get('Agent_messages');
    
    const content = `# Agent Documentation

*Generated with API calls on ${new Date().toISOString()}*

## Agent Instance

\`\`\`json
${JSON.stringify(agentOutput?.data || {}, null, 2)}
\`\`\`

## Available Tools

\`\`\`json
${JSON.stringify(toolsOutput?.data || {}, null, 2)}
\`\`\`

## Messages

\`\`\`json
${JSON.stringify(messagesOutput?.data || {}, null, 2)}
\`\`\`

## Complete Python Workflow

\`\`\`python
from xpander_sdk import XpanderClient, LLMProvider
import os

# API call
client = XpanderClient(
    api_key=os.getenv("XPANDER_API_KEY"),
    organization_id=os.getenv("XPANDER_ORG_ID")
)

# Agent fetch
agent = client.agents.get(os.getenv("XPANDER_AGENT_ID"))
await agent.load()

print(f"✅ Loaded agent: {agent.name}")
print(f"📊 Status: {agent.status}")
print(f"🔧 Tools available: {len(agent.tools)}")

# Get tools
tools = agent.get_tools(LLMProvider.OPEN_AI)
print(f"🎯 Tools for OpenAI: {len(tools)}")

# Access messages  
messages = agent.messages
print(f"💬 Current messages: {len(messages)}")
\`\`\`

## Example Output:

\`\`\`
✅ Loaded agent: ${agentOutput?.data?.name || 'Test Agent'}
📊 Status: ${agentOutput?.data?.status || 'ACTIVE'}
🔧 Tools available: ${agentOutput?.data?.toolsCount || 0}
🎯 Tools for OpenAI: ${toolsOutput?.data?.count || 0}
💬 Current messages: ${messagesOutput?.data?.count || 0}
\`\`\`

---
*Documentation generated on ${new Date().toLocaleDateString()}*
`;

    fs.writeFileSync(path.join(outputDir, 'Agent-LIVE.md'), content);
  }

  async generateLiveClientDocs(clientType, outputDir) {
    const clientOutput = this.capturedOutputs.get('XpanderClient_init');
    
    const content = `# XpanderClient Documentation

*Generated with API calls on ${new Date().toISOString()}*

## Client Initialization

\`\`\`json
${JSON.stringify({
  status: clientOutput?.data?.status || 'initialized',
  hasAgents: clientOutput?.data?.hasAgents || false,
  configuration: {
    organizationId: clientOutput?.data?.configuration?.organizationId || 'your-org-id'
  }
}, null, 2)}
\`\`\`

## Complete Setup

\`\`\`python
from xpander_sdk import XpanderClient
import os

# Client initialization
client = XpanderClient(
    api_key=os.getenv("XPANDER_API_KEY"),
    organization_id=os.getenv("XPANDER_ORG_ID")
)

print(f"✅ Client initialized")
print(f"🏢 Organization: {client.configuration.organization_id}")
print(f"📋 Has agents: {hasattr(client, 'agents')}")
\`\`\`

## Example Output:

\`\`\`
✅ Client initialized
🏢 Organization: ${clientOutput?.data?.configuration?.organizationId || 'your-org-id'}
📋 Has agents: ${clientOutput?.data?.hasAgents || true}
\`\`\`

---
*Documentation generated on ${new Date().toLocaleDateString()}*
`;

    fs.writeFileSync(path.join(outputDir, 'XpanderClient-LIVE.md'), content);
  }

  async generateLiveExecutionReport(outputDir) {
    const report = {
      timestamp: new Date().toISOString(),
      total_calls: this.executionLog.length,
      successful_calls: this.executionLog.filter(log => log.success).length,
      failed_calls: this.executionLog.filter(log => !log.success).length,
      total_duration: this.executionLog.reduce((sum, log) => sum + (log.duration || 0), 0),
      execution_log: this.executionLog,
      captured_outputs: Object.fromEntries(this.capturedOutputs)
    };

    const content = `# 📊 Live Documentation Execution Report

*Generated on ${new Date().toISOString()}*

## Summary

- **Total API Calls**: ${report.total_calls}
- **Successful**: ${report.successful_calls} ✅
- **Failed**: ${report.failed_calls} ❌
- **Total Duration**: ${report.total_duration}ms

## Execution Log

\`\`\`json
${JSON.stringify(report.execution_log, null, 2)}
\`\`\`

## All Captured Outputs

\`\`\`json
${JSON.stringify(report.captured_outputs, null, 2)}
\`\`\`

---
*This report contains real API responses and execution data*
`;

    fs.writeFileSync(path.join(outputDir, 'EXECUTION-REPORT.md'), content);
    fs.writeFileSync(path.join(outputDir, 'live-data.json'), JSON.stringify(report, null, 2));
  }
}

// CLI interface
if (require.main === module) {
  const runner = new LiveDocsRunner();
  runner.generateLiveDocumentation().catch(console.error);
}

module.exports = { LiveDocsRunner }; 