import { BaseLLMProvider } from './baseProvider';
import { LLMProvider } from '../../constants/llmProvider';
import { ToolCall } from '../../core/toolCalls';
import { getToolBaseSignature } from '../../core/tools';

/**
 * Handles interaction with OpenAI SDK, processing responses to extract tool calls.
 */
export class BaseOpenAISDKHandler extends BaseLLMProvider {
  /**
   * Determines if this handler should manage the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the handler should manage the provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  /**
   * Extracts tool calls from an OpenAI LLM response.
   * @param llmResponse - The response object from the OpenAI LLM.
   * @returns An array of ToolCall objects extracted from the response.
   * @throws Error if the response format is invalid.
   */
  static extractToolCalls(llmResponse: Record<string, any>): ToolCall[] {
    if (typeof llmResponse !== 'object') {
      throw new Error('LLM response should be an object.');
    }

    const extractedToolCalls: ToolCall[] = [];
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
          extractedToolCalls.push(
            ToolCall.fromObject({
              ...getToolBaseSignature(toolCall.function.name, toolCall.id),
              payload,
            }),
          );
        }
      }
    }
    return extractedToolCalls;
  }
}
