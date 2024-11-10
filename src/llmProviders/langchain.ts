import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';
import { getToolBaseSignature } from '../core/tools';
import { IToolCall } from '../types';

/**
 * Class representing the LangChain LLM provider.
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

  static extractToolCalls(llmResponse: Record<string, any>): IToolCall[] {
    if (typeof llmResponse !== 'object') {
      throw new Error('llm response should be full');
    }

    const extractedToolCalls: IToolCall[] = [];

    if (
      !Array.isArray(llmResponse?.tool_calls) ||
      llmResponse?.tool_calls?.length === 0
    ) {
      return [];
    }

    for (const toolCall of llmResponse?.tool_calls) {
      let payload = toolCall.args;
      try {
        payload = JSON.parse(toolCall.args);
      } catch (err) {
        payload = toolCall.args;
      }
      extractedToolCalls.push({
        ...getToolBaseSignature(toolCall.name, toolCall.id),
        payload,
      });
    }
    return extractedToolCalls;
  }
}
