import { LLMProvider } from '../constants/llmProvider';
import { createTool } from '../core/tools';
import { XpanderClient } from '../core/XpanderClient';
import { RequestPayload } from '../models/payloads';

interface Tool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

export interface OpenAIStructuredTool {
  type: string;
  function: {
    name: string;
    description: string;
    parameters?: any;
  };
}

export class OpenAI {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  client: XpanderClient;

  constructor(xpanderClient: XpanderClient) {
    this.client = xpanderClient;
  }

  getTools(): OpenAIStructuredTool[] {
    const agentTools = this.client.toolsCache;
    const tools: OpenAIStructuredTool[] = [];

    for (const toolInstructions of agentTools) {
      const createdTool: Tool = createTool(this.client, toolInstructions, false);
      const toolDeclaration: OpenAIStructuredTool = {
        type: 'function',
        function: {
          name: createdTool.name,
          description: `${createdTool.description}`.slice(0, 1024), // max length of 1024
        },
      };
      if (createdTool.parameters) {
        toolDeclaration.function.parameters = createdTool.parameters;
      }

      if (!toolDeclaration.function.name) {
        throw new Error(`Tool is missing required 'name' property: ${JSON.stringify(toolDeclaration)}`);
      }

      tools.push(toolDeclaration);
    }
    return tools;
  }

  invokeTool(toolId: string, payload: RequestPayload): string {
    const tools = this.getTools();
    console.log('invokeTool called with toolId:', toolId);
    console.log('Available tools:', tools.map(tool => tool.function.name));

    const toolToInvoke = tools.find(tool => tool.function.name === toolId);

    if (toolToInvoke) {
      console.log(`Invoking tool: ${toolId} with payload:`, payload);
      // Here you would typically call the actual tool function, for now, we're simulating the response
      const simulatedResponse = {
        toolId,
        payload,
        result: 'Simulated tool response',
      };
      return JSON.stringify(simulatedResponse);
    } else {
      console.error(`Tool ${toolId} implementation not found. Available tools:`, tools.map(tool => tool.function.name));
      throw new Error(`Tool ${toolId} implementation not found`);
    }
  }

  invokeTools(toolSelectorResponse: any): any[] {
    const outputMessages: any[] = [];
    if (!Array.isArray(toolSelectorResponse.choices)) {
      throw new Error('Tool selector response does not contain valid choices');
    }

    for (const chatChoice of toolSelectorResponse.choices) {
      if (chatChoice.message) {
        const responseMessage = chatChoice.message;

        const toolCalls = responseMessage.tool_calls;
        if (toolCalls) {
          for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;

            let payload: any;
            try {
              payload = JSON.parse(toolCall.function.arguments);
            } catch (e) {
              payload = null;
            }

            const functionResponse = this.invokeTool(functionName, payload);
            outputMessages.push({
              tool_call_id: toolCall.id,
              role: 'tool',
              name: functionName,
              content: functionResponse,
            });
          }
        }
      }
    }
    return outputMessages;
  }
}