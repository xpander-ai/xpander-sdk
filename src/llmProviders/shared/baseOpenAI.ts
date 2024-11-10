import { BaseLLMProvider } from './baseProvider';
import { LLMProvider } from '../../constants/llmProvider';
import { getToolBaseSignature } from '../../core/tools';
import { IToolCall } from '../../types';

/**
 * Class representing the base handler for OpenAI SDK.
 */
export class BaseOpenAISDKHandler extends BaseLLMProvider {
  /**
   * Determines if this handler should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the handler should handle the provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  static extractToolCalls(llmResponse: Record<string, any>): IToolCall[] {
    if (typeof llmResponse !== 'object') {
      throw new Error('llm response should be full');
    }

    const extractedToolCalls: IToolCall[] = [];
    const choices = llmResponse?.choices || [];

    if (choices.length === 0) {
      return [];
    }

    for (const { message } of choices) {
      const toolCalls = message?.tool_calls || [];
      if (toolCalls.length !== 0) {
        for (const toolCall of toolCalls) {
          let payload = toolCall.function.arguments;
          try {
            payload = JSON.parse(toolCall.function.arguments);
          } catch (err) {
            payload = toolCall.function.arguments;
          }
          extractedToolCalls.push({
            ...getToolBaseSignature(toolCall.function.name, toolCall.id),
            payload,
          });
        }
      }
    }
    return extractedToolCalls;
  }
}
