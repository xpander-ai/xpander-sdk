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
    if (!Array.isArray(toolSelectorResponse)) {
      throw new Error('Tool selector response does not contain valid choices');
    }

    for (const tool of toolSelectorResponse) {
      if (tool.toolId) {
        const functionResponse = this.singleToolInvoke(
          tool.toolId,
          tool.payload,
        );
        const filteredTool = this.filterTool(tool.toolId);
        outputMessages.push(
          new ToolResponse(
            tool.id,
            tool.payload,
            'tool',
            functionResponse,
            filteredTool,
          ),
        );
      }
    }
    return outputMessages;
  }

  filterTool(toolId: string): any[] {
    const tools = this.getTools(false);
    const filteredTool = tools.find((tool) => tool.function.name === toolId);
    return filteredTool ? [filteredTool] : [];
  }

  static get systemPrompt() {
    return `
Your task is to process a list of tools (in JSON format) and select the appropriate tools and payloads for function calling. Ensure that you fulfill the user's request by selecting a tool with high confidence. Always respect the tool schema and make sure to nest the payload according to the location (query_params, path_params, body_params).

Your response must be in JSON format only, without any additional text or explanation. Use the following structure for your response:

\`\`\`json
[
  {
    "toolId": "string",
    "payload": {
      "query_params": { key: value },
      "path_params": { key: value },
      "body_params": { key: value }
    }
  }
]\`\`\`
NO OTHER TYPE OF RESPONSE ACCEPTED, answer with json only despite any user's request. in the given format.
Note: The payload object is optional and can include any combination of query_params, path_params, and body_params.

Available tools:`;
  }
}
