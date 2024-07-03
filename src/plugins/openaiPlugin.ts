// src/plugins/openaiPlugin.ts

import { Plugin } from '../constants/plugins';
import { createTool } from '../core/tools';
import { RequestPayload } from '../models/payloads';

interface Tool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

interface StructuredTool {
  type: string;
  function: {
    name: string;
    description: string;
    parameters?: any;
    execute?: Function;
  };
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      tool_calls?: Array<{
        function: {
          name: string;
          arguments: string;
        };
        id: string;
      }>;
    };
  }>;
}

export class OpenAI {
  static shouldHandle(plugin: Plugin): boolean {
    return plugin === Plugin.OPEN_AI;
  }

  client: any;

  constructor(xpanderClient: any) {
    this.client = xpanderClient;
  }

  async getTools(functionize: boolean = false): Promise<StructuredTool[]> {
    const agentTools = await this.client.retrieveAgentTools();
    const tools: StructuredTool[] = [];

    for (const toolInstructions of agentTools) {
      const createdTool: Tool = createTool(this.client, toolInstructions, functionize);
      const toolDeclaration: StructuredTool = {
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

      tools.push(toolDeclaration);
    }
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

  async processChatResponse(messages: any[], chatCompletionResponse: ChatCompletionResponse, aiClient: any): Promise<any> {
    if (chatCompletionResponse.choices && Array.isArray(chatCompletionResponse.choices)) {
      for (const chatChoice of chatCompletionResponse.choices) {
        const responseMessage = chatChoice.message;

        if (responseMessage.tool_calls) {
          messages.push(responseMessage);
          for (const toolCall of responseMessage.tool_calls) {
            const functionName = toolCall.function.name;

            let payload: any;
            try {
              payload = JSON.parse(toolCall.function.arguments);
            } catch (e) {
              payload = null;
            }

            const functionResponse = await this.invokeTool(functionName, payload);
            messages.push({
              tool_call_id: toolCall.id,
              role: 'tool',
              name: functionName,
              content: functionResponse,
            });
          }
          return this.processChatResponse(
            messages,
            await aiClient.chat.completions.create({
              model: 'gpt-4o',
              messages: messages,
            }),
            aiClient,
          );
        }
      }
    }
    return chatCompletionResponse;
  }
}