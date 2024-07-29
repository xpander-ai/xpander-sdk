import { BaseLLMProvider } from './shared/baseProvider';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';
import { RequestPayload } from '../models/payloads';
import { ToolResponse } from '../models/toolResponse';
import { IBedrockTool } from '../types';

export class AmazonBedrock extends BaseLLMProvider {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.AMAZON_BEDROCK;
  }
  static get supportedModels() {
    return {
      Anthropic_Claude_3_Haiku_20240307:
        'anthropic.claude-3-haiku-20240307-v1:0',
      Anthropic_Claude_3_5_Sonnet_20240620:
        'anthropic.claude-3-5-sonnet-20240620-v1:0',
      Cohere_Command_R: 'cohere.command-r-v1:0',
      Cohere_Command_R_Plus: 'cohere.command-r-plus-v1:0',
      Meta_Llama3_1_8B_Instruct: 'meta.llama3-1-8b-instruct-v1:0',
      Meta_Llama3_1_70B_Instruct: 'meta.llama3-1-70b-instruct-v1:0',
      Meta_Llama3_1_405B_Instruct: 'meta.llama3-1-405b-instruct-v1:0',
      Mistral_Mistral_Large_2402: 'mistral.mistral-large-2402-v1:0',
      Mistral_Mistral_Large_2407: 'mistral.mistral-large-2407-v1:0',
      Mistral_Mistral_Small_2402: 'mistral.mistral-small-2402-v1:0',
    };
  }

  static transformToValidAWSIdentifier(inputString: string) {
    let modifiedString = inputString.replace(/[^a-zA-Z0-9_]/g, '_');

    if (!/^[a-zA-Z]/.test(modifiedString)) {
      modifiedString = 'a' + modifiedString;
    }

    return modifiedString;
  }

  toolsNamesMapping: Record<string, string> = {};

  get alreadyMappedFunctions() {
    return Object.keys(this.toolsNamesMapping).length !== 0;
  }

  postProcessTools(tools: any[]): IBedrockTool[] {
    return tools.map((tool) => {
      let name = tool.function.name;

      const awsNormalizedFunctionName =
        AmazonBedrock.transformToValidAWSIdentifier(name);
      this.toolsNamesMapping[awsNormalizedFunctionName] = name;
      name = awsNormalizedFunctionName;

      return {
        toolSpec: {
          name,
          description: tool.function.description,
          inputSchema: {
            json: tool?.function?.parameters || DEFAULT_TOOL_PARAMETERS,
          },
        },
        execute: tool?.function?.execute,
      };
    }) as IBedrockTool[];
  }

  invokeTools(toolSelectorResponse: any): ToolResponse[] {
    const outputMessages: ToolResponse[] = [];
    if (!Array.isArray(toolSelectorResponse?.output?.message?.content)) {
      throw new Error('Tool selector response does not contain valid choices');
    }

    const toolCalls: any[] =
      toolSelectorResponse?.output?.message?.content.filter(
        (msg: any) => msg.toolUse && msg.toolUse.name,
      ) || [];

    for (const { toolUse } of toolCalls) {
      if (!!toolUse?.name) {
        const functionName = toolUse.name;
        const originalFunctionName = this.toolsNamesMapping[functionName];
        const payload = toolUse?.input || {};

        const functionResponse = this.singleToolInvoke(functionName, payload);
        const filteredTool = this.filterTool(functionName);
        outputMessages.push(
          new ToolResponse(
            toolUse.toolUseId,
            'tool',
            originalFunctionName,
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
    const filteredTool = tools.find((tool) => tool.toolSpec.name === toolId);
    return filteredTool ? [filteredTool] : [];
  }

  singleToolInvoke(toolId: string, payload: RequestPayload): string {
    const tools = this.getTools(true);
    const toolToInvoke = tools.find(
      (tool: IBedrockTool) => tool.toolSpec.name === toolId,
    );

    if (toolToInvoke) {
      return JSON.stringify(toolToInvoke.execute(payload));
    } else {
      throw new Error(`Tool ${toolId} implementation not found`);
    }
  }
}
