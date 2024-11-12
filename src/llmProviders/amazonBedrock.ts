import { BaseLLMProvider } from './shared/baseProvider';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';
import { ToolCall } from '../core/toolCalls';
import { getToolBaseSignature } from '../core/tools';
import { IBedrockTool } from '../types';

/**
 * Contains constants representing various models supported by Amazon Bedrock.
 */
export abstract class AmazonBedrockSupportedModels {
  /** Anthropocene Claude 3 Haiku model (version 2024-03-07). */
  public static readonly ANTHROPIC_CLAUDE_3_HAIKU_20240307 =
    'anthropic.claude-3-haiku-20240307-v1:0';

  /** Anthropocene Claude 3.5 Sonnet model (version 2024-06-20). */
  public static readonly ANTHROPIC_CLAUDE_3_5_SONNET_20240620 =
    'anthropic.claude-3-5-sonnet-20240620-v1:0';

  /** Cohere Command R model. */
  public static readonly COHERE_COMMAND_R = 'cohere.command-r-v1:0';

  /** Cohere Command R Plus model. */
  public static readonly COHERE_COMMAND_R_PLUS = 'cohere.command-r-plus-v1:0';

  /** Meta Llama 3 1.8B Instruct model. */
  public static readonly META_LLAMA3_1_8B_INSTRUCT =
    'meta.llama3-1-8b-instruct-v1:0';

  /** Meta Llama 3 1.70B Instruct model. */
  public static readonly META_LLAMA3_1_70B_INSTRUCT =
    'meta.llama3-1-70b-instruct-v1:0';

  /** Meta Llama 3 1.405B Instruct model. */
  public static readonly META_LLAMA3_1_405B_INSTRUCT =
    'meta.llama3-1-405b-instruct-v1:0';

  /** Mistral Large 2402 model. */
  public static readonly MISTRAL_MISTRAL_LARGE_2402 =
    'mistral.mistral-large-2402-v1:0';

  /** Mistral Large 2407 model. */
  public static readonly MISTRAL_MISTRAL_LARGE_2407 =
    'mistral.mistral-large-2407-v1:0';

  /** Mistral Small 2402 model. */
  public static readonly MISTRAL_MISTRAL_SMALL_2402 =
    'mistral.mistral-small-2402-v1:0';
}

/**
 * Represents the Amazon Bedrock LLM provider, handling tool calls and model-specific processing.
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
   * Transforms a string to a valid AWS identifier by replacing non-alphanumeric characters
   * with underscores and ensuring it starts with a letter.
   * @param inputString - The string to transform.
   * @returns The transformed AWS-compatible string.
   */
  static transformToValidAWSIdentifier(inputString: string): string {
    let modifiedString = inputString.replace(/[^a-zA-Z0-9_]/g, '_');
    if (!/^[a-zA-Z]/.test(modifiedString)) {
      modifiedString = 'a' + modifiedString;
    }
    return modifiedString;
  }

  /**
   * Extracts tool calls from an Amazon Bedrock LLM response.
   * @param llmResponse - The response object from Amazon Bedrock.
   * @returns An array of ToolCall objects extracted from the response.
   * @throws Error if the response format is invalid.
   */
  static extractToolCalls(llmResponse: Record<string, any>): ToolCall[] {
    if (typeof llmResponse !== 'object') {
      throw new Error('LLM response should be an object.');
    }

    const extractedToolCalls: ToolCall[] = [];
    const messages = llmResponse?.output?.message?.content || [];

    if (messages.length === 0) {
      return [];
    }

    for (const message of messages) {
      if (!('toolUse' in message)) continue;
      const toolCall = message.toolUse;
      let payload = toolCall.input;
      try {
        payload = JSON.parse(toolCall.input);
      } catch (err) {
        payload = toolCall.input;
      }
      extractedToolCalls.push(
        ToolCall.fromObject({
          ...getToolBaseSignature(toolCall.name, toolCall.toolUseId),
          payload,
        }),
      );
    }
    return extractedToolCalls;
  }

  /**
   * Post-processes tools to ensure compliance with the IBedrockTool interface,
   * adjusting names to be AWS-compatible where necessary.
   * @param tools - The tools to post-process.
   * @returns An array of post-processed tools.
   */
  postProcessTools(tools: any[]): IBedrockTool[] {
    return tools.map((tool) => {
      let name = tool.function.name;

      const awsNormalizedFunctionName =
        AmazonBedrock.transformToValidAWSIdentifier(name);
      this.originalToolNamesReamapping[awsNormalizedFunctionName] = name;
      name = awsNormalizedFunctionName;

      return {
        toolSpec: {
          name,
          description: tool.function.description,
          inputSchema: {
            json:
              Object.keys(tool?.function?.parameters || {}).length !== 0
                ? tool?.function?.parameters
                : DEFAULT_TOOL_PARAMETERS,
          },
        },
        execute: tool?.function?.execute,
      };
    }) as IBedrockTool[];
  }
}
