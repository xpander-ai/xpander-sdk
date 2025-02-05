import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';
import { ToolCall, getToolBaseSignature } from '../core/tools';

/**
 * Handles interactions with the LangChain LLM provider, extracting tool calls from responses.
 */
export class LangChain extends BaseOpenAISDKHandler {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.LANG_CHAIN;
  }

  /**
   * Extracts tool calls from a LangChain LLM response.
   * @param llmResponse - The response object from LangChain.
   * @returns An array of ToolCall objects extracted from the response.
   * @throws Error if the response format is invalid.
   */
  static extractToolCalls(llmResponse: Record<string, any>): ToolCall[] {
    if (typeof llmResponse !== 'object') {
      throw new Error('LLM response should be an object.');
    }

    const extractedToolCalls: ToolCall[] = [];

    if (
      !Array.isArray(llmResponse?.tool_calls) ||
      llmResponse?.tool_calls?.length === 0
    ) {
      return [];
    }

    for (const toolCall of llmResponse.tool_calls) {
      let payload = toolCall.args;
      try {
        payload = JSON.parse(toolCall.args);
      } catch (err) {
        payload = toolCall.args;
      }
      extractedToolCalls.push(
        ToolCall.fromObject({
          ...getToolBaseSignature(toolCall.name, toolCall.id),
          payload,
        }),
      );
    }
    return extractedToolCalls;
  }
}
