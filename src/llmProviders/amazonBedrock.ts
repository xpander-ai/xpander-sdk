import { BaseLLMProvider } from './shared/baseProvider';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';
import { RequestPayload } from '../models/payloads';
import { ToolResponse } from '../models/toolResponse';
import { IBedrockTool } from '../types';

/**
 * @class AmazonBedrockSupportedModels
 * @description A class containing constants representing various supported models in Amazon Bedrock.
 */
export abstract class AmazonBedrockSupportedModels {
  /**
   * @constant
   * @type {string}
   * @description Anthropocene Claude 3 Haiku model with a version date of 2024-03-07.
   */
  public static readonly ANTHROPIC_CLAUDE_3_HAIKU_20240307 =
    'anthropic.claude-3-haiku-20240307-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Anthropocene Claude 3.5 Sonnet model with a version date of 2024-06-20.
   */
  public static readonly ANTHROPIC_CLAUDE_3_5_SONNET_20240620 =
    'anthropic.claude-3-5-sonnet-20240620-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Cohere Command R model.
   */
  public static readonly COHERE_COMMAND_R = 'cohere.command-r-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Cohere Command R Plus model.
   */
  public static readonly COHERE_COMMAND_R_PLUS = 'cohere.command-r-plus-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Meta Llama 3 1.8B Instruct model.
   */
  public static readonly META_LLAMA3_1_8B_INSTRUCT =
    'meta.llama3-1-8b-instruct-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Meta Llama 3 1.70B Instruct model.
   */
  public static readonly META_LLAMA3_1_70B_INSTRUCT =
    'meta.llama3-1-70b-instruct-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Meta Llama 3 1.405B Instruct model.
   */
  public static readonly META_LLAMA3_1_405B_INSTRUCT =
    'meta.llama3-1-405b-instruct-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Mistral Large 2402 model.
   */
  public static readonly MISTRAL_MISTRAL_LARGE_2402 =
    'mistral.mistral-large-2402-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Mistral Large 2407 model.
   */
  public static readonly MISTRAL_MISTRAL_LARGE_2407 =
    'mistral.mistral-large-2407-v1:0';

  /**
   * @constant
   * @type {string}
   * @description Mistral Small 2402 model.
   */
  public static readonly MISTRAL_MISTRAL_SMALL_2402 =
    'mistral.mistral-small-2402-v1:0';
}

/**
 * Class representing the Amazon Bedrock LLM provider.
 */
export class AmazonBedrock extends BaseLLMProvider {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.AMAZON_BEDROCK;
  }

  /**
   * Transforms a string to a valid AWS identifier.
   * @param inputString - The string to transform.
   * @returns The transformed string.
   */
  static transformToValidAWSIdentifier(inputString: string) {
    let modifiedString = inputString.replace(/[^a-zA-Z0-9_]/g, '_');

    if (!/^[a-zA-Z]/.test(modifiedString)) {
      modifiedString = 'a' + modifiedString;
    }

    return modifiedString;
  }

  toolsNamesMapping: Record<string, string> = {};

  /**
   * Checks if the tools have already been mapped.
   * @returns True if the tools have already been mapped, otherwise false.
   */
  get alreadyMappedFunctions() {
    return Object.keys(this.toolsNamesMapping).length !== 0;
  }

  /**
   * Post-processes the tools to conform to the IBedrockTool interface.
   * @param tools - The tools to post-process.
   * @returns An array of post-processed tools.
   */
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

  /**
   * Invokes tools based on the tool selector response.
   * @param toolSelectorResponse - The response from the tool selector.
   * @returns An array of tool responses.
   * @throws Will throw an error if the tool selector response does not contain valid choices.
   */
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
      if (toolUse?.name) {
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

  /**
   * Filters the tools to find the one with the specified ID.
   * @param toolId - The ID of the tool to find.
   * @returns An array containing the filtered tool, or an empty array if not found.
   */
  filterTool(toolId: string): any[] {
    const tools = this.getTools<IBedrockTool>(false);
    const filteredTool = tools.find((tool) => tool.toolSpec.name === toolId);
    return filteredTool ? [filteredTool] : [];
  }

  /**
   * Invokes a single tool with the given ID and payload.
   * @param toolId - The ID of the tool to invoke.
   * @param payload - The payload to pass to the tool.
   * @returns The result of the tool invocation.
   * @throws Will throw an error if the tool implementation is not found.
   */
  singleToolInvoke(toolId: string, payload: RequestPayload): string {
    const tools = this.getTools<IBedrockTool>(true);
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
