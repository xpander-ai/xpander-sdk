import { LLMProvider } from '../constants/llmProvider';
import { createTool } from '../core/tools';


interface StructuredTool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

export class LangChain {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.LANG_CHAIN;
  }

  client: any;

  constructor(xpanderClient: any) {
    this.client = xpanderClient;
  }

  public getTools(): StructuredTool[] {
    const agentTools = this.client.retrieveAgentTools();
    const tools: StructuredTool[] = [];

    for (const toolInstructions of agentTools) {
      const createdTool = createTool(this.client, toolInstructions);
      tools.push(this.convertToStructuredTool(createdTool));
    }

    return tools;
  }

  private convertToStructuredTool(tool: any): StructuredTool {
    // This method converts the created tool to a StructuredTool
    // Adjust as necessary based on the actual structure and requirements of StructuredTool
    return {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
      func: tool.func,
    };
  }
}