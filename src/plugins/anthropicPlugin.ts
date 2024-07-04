import { Plugin } from '../constants/plugins';
import { createTool } from '../core/tools';
import { RequestPayload } from '../models/payloads';

interface Tool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

interface ToolDeclaration {
  name: string;
  description: string;
  input_schema: {
    type: string;
    properties: any;
    required: string[];
  };
  execute?: Function;
}

interface ToolSelectorResponse {
  content: Array<{
    type: string;
    name: string;
    id: string;
    input: any;
  }>;
}

export class AnthropicPlugin {
  static shouldHandle(plugin: Plugin): boolean {
    return plugin === Plugin.ANTHROPIC;
  }

  xpanderClient: any;

  constructor(xpanderClient: any) {
    this.xpanderClient = xpanderClient;
  }

  public getTools(functionize: boolean = false): ToolDeclaration[] {
    const xpanderTools = this.xpanderClient.retrieveAgentTools();
    const tools: ToolDeclaration[] = [];

    for (const toolInstructions of xpanderTools) {
      const createdTool: Tool = createTool(this.xpanderClient, toolInstructions, functionize);
      const toolDeclaration: ToolDeclaration = {
        name: createdTool.name,
        description: `${createdTool.description}`.slice(0, 1024), // max length of 1024
        input_schema: {
          type: 'object',
          properties: createdTool.parameters || {},
          required: Object.entries(createdTool.parameters || {})
            .filter(([_, v]: [string, any]) => v.required)
            .map(([k, _]: [string, any]) => k),
        },
      };

      if (functionize && createdTool.func) {
        toolDeclaration.execute = createdTool.func;
      }

      tools.push(toolDeclaration);
    }
    return tools;
  }

  public singleToolInvoke(toolId: string, payload: RequestPayload): string {
    const tools = this.getTools(true);
    const toolToInvoke = tools.find(tool => tool.name === toolId);
    if (toolToInvoke && toolToInvoke.execute) {
      return JSON.stringify(toolToInvoke.execute(payload));
    } else {
      throw new Error(`Tool ${toolId} implementation not found`);
    }
  }

  public invokeTools(toolSelectorResponse: ToolSelectorResponse): any[] {
    const outputMessages: any[] = [];

    for (const content of toolSelectorResponse.content) {
      if (content.type === 'tool_use') {
        const functionName = content.name;

        let payload: any;
        try {
          payload = content.input;
        } catch (e) {
          payload = null;
        }

        const functionResponse = this.singleToolInvoke(functionName, payload);
        outputMessages.push({
          type: 'tool_result',
          tool_use_id: content.id,
          content: functionResponse,
        });
      }
    }

    return outputMessages;
  }
}