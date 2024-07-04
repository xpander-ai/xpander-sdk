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
    execute?: Function;
  };
}

export class OpenAI {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  client: XpanderClient;

  constructor(xpanderClient: any) {
    this.client = xpanderClient;
  }

  async getTools(functionize: boolean = false): Promise<OpenAIStructuredTool[]> {
    const agentTools = await this.client.retrieveAgentTools();
    const tools: OpenAIStructuredTool[] = [];

    for (const toolInstructions of agentTools) {
      const createdTool: Tool = createTool(this.client, toolInstructions, functionize);
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

      if (functionize && createdTool.func) {
        toolDeclaration.function.execute = createdTool.func;
      }

      if (!toolDeclaration.function.name) {
        throw new Error(`Tool is missing required 'name' property: ${JSON.stringify(toolDeclaration)}`);
      }

      tools.push(toolDeclaration);
    }
    // console.log('Retrieved tools:', JSON.stringify(tools, null, 2));
    return tools;
  }

  async invokeTool(toolId: string, payload: RequestPayload): Promise<string> {
    const tools = await this.getTools(true);
    const toolToInvoke = tools.find(tool => tool.function.name === toolId);
    if (toolToInvoke && toolToInvoke.function.execute) {
      return JSON.stringify(await toolToInvoke.function.execute(payload));
    } else {
      throw new Error(`Tool ${toolId} implementation not found`);
    }
  }

  async invokeTools(toolSelectorResponse: any): Promise<any[]> {
    const outputMessages: any[] = [];

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

            const functionResponse = await this.invokeTool(functionName, payload);
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