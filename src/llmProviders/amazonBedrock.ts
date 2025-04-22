import { BaseLLMProvider } from './shared/baseProvider';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';
import { ToolCall, getToolBaseSignature } from '../core/tools';
import { IBedrockTool, IMemoryMessage } from '../types';

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
   * Converts xpanderAI memory messages into LLM-compatible message formats.
   *
   * @param xpanderMessages - An array of xpanderAI memory messages.
   * @returns An array of messages formatted for LLM compatibility.
   */
  static convertMessages(xpanderMessages: IMemoryMessage[]): any[] {
    const getMsgContent = (msg: IMemoryMessage) => {
      const contentBlocks: any[] = [];

      if (msg.toolCalls) {
        contentBlocks.push(
          ...msg.toolCalls.map((tc) => ({
            toolUse: {
              toolUseId: tc.toolCallId,
              name: tc.name,
              input: tc?.payload ? JSON.parse(tc.payload) : {},
            },
          })),
        );
      } else if (msg.toolCallId) {
        contentBlocks.push({
          toolResult: {
            toolUseId: msg.toolCallId,
            content: [{ text: msg.content }],
          },
        });
      } else {
        contentBlocks.push({ text: msg.content });
      }

      return contentBlocks;
    };
    return xpanderMessages
      .filter((msg) => msg.role !== 'system')
      .map((msg) => ({
        role: msg.role !== 'assistant' ? 'user' : 'assistant',
        content: getMsgContent(msg),
      }));
  }

  /**
   * Transforms a string to a valid AWS identifier by replacing non-alphanumeric characters
   * with underscores and ensuring it starts with a letter.
   * @param inputString - The string to transform.
   * @returns The transformed AWS-compatible string.
   */
  static transformToValidAWSIdentifier(inputString: string): string {
    let modifiedString = inputString.replace(/[^a-zA-Z0-9_]/g, '-');
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
    return this.runSchemaEnforcement(tools).map((tool) => {
      let name = tool.function.name;

      const awsNormalizedFunctionName =
        AmazonBedrock.transformToValidAWSIdentifier(name);
      this.originalToolNamesReMapping[awsNormalizedFunctionName] = name;
      name = awsNormalizedFunctionName;

      return {
        toolSpec: {
          name,
          description: tool.function.description,
          inputSchema: {
            json: {
              ...(Object.keys(tool?.function?.parameters || {}).length !== 0
                ? tool?.function?.parameters
                : DEFAULT_TOOL_PARAMETERS),
              additionalProperties: false,
            },
          },
        },
        execute: tool?.function?.execute,
      };
    }) as IBedrockTool[];
  }
}
