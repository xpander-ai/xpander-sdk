import { LLMProvider } from '../constants/llmProvider';
import { createTool } from '../core/tools';
import { XpanderClient } from '../core/XpanderClient';
import { RequestPayload } from '../models/payloads';
import { ToolResponse } from '../models/toolResponse';

interface Tool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

export class NvidiaNIM {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.NVIDIA_NIM;
  }

  client: XpanderClient;

  constructor(xpanderClient: XpanderClient) {
    this.client = xpanderClient;
  }

  getTools(functionize: boolean = false): any[] {
    const agentTools = this.client.loadXpanderTools();
    const tools: any[] = [];

    for (const toolInstructions of agentTools) {
      const createdTool: Tool = createTool(
        this.client,
        toolInstructions,
        functionize,
      );
      const toolDeclaration: any = {
        type: 'function',
        function: {
          name: createdTool.name,
          description: `${createdTool.description}`.slice(0, 1024), // max length of 1024
        },
      };

      if ('parameters' in createdTool) {
        toolDeclaration.function.parameters = createdTool.parameters;
      }

      if (functionize) {
        toolDeclaration.function.execute = createdTool.func;
      }

      tools.push(toolDeclaration);
    }
    return tools;
  }

  singleToolInvoke(toolId: string, payload: RequestPayload): string {
    const tools = this.getTools(true);
    const toolToInvoke = tools.find((tool) => tool.function.name === toolId);

    if (toolToInvoke) {
      return JSON.stringify(toolToInvoke.function.execute(payload));
    } else {
      throw new Error(`Tool ${toolId} implementation not found`);
    }
  }

  invokeTools(toolSelectorResponse: any): ToolResponse[] {
    const outputMessages: ToolResponse[] = [];
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

            const functionResponse = this.singleToolInvoke(
              functionName,
              payload,
            );
            const filteredTool = this.filterTool(functionName);
            outputMessages.push(
              new ToolResponse(
                toolCalls,
                payload,
                'tool',
                functionResponse,
                filteredTool,
              ),
            );
          }
        }
      }
    }
    return outputMessages;
  }

  filterTool(toolId: string): any[] {
    const tools = this.getTools(false);
    const filteredTool = tools.find((tool) => tool.function.name === toolId);
    return filteredTool ? [filteredTool] : [];
  }
}
