import { BaseLLMProvider } from './baseProvider';
import { IMemoryMessage } from '../..';
import { LLMProvider } from '../../constants/llmProvider';
import { ToolCall, getToolBaseSignature } from '../../core/tools';

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
   * Utility functions for converting LLM responses and xpanderAI messages into compatible formats.
   */
  static extractMessages(llmResponse: any): IMemoryMessage[] {
    const messages: IMemoryMessage[] = [];
    const choices = llmResponse.choices;

    for (const choice of choices) {
      const llmMessage = choice.message;
      messages.push({
        role: llmMessage.role,
        content: llmMessage.content,
        toolCalls: llmMessage?.tool_calls?.map((tc: any) => ({
          name: tc.function.name,
          payload: tc.function.arguments,
          toolCallId: tc.id,
        })),
        completionResponse: llmResponse,
      });
    }

    return messages;
  }

  /**
   * Converts xpanderAI memory messages into LLM-compatible message formats.
   *
   * @param xpanderMessages - An array of xpanderAI memory messages.
   * @returns An array of messages formatted for LLM compatibility.
   */
  static convertMessages(xpanderMessages: IMemoryMessage[]): any[] {
    return xpanderMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
      tool_calls: msg.toolCalls?.map((tc) => ({
        id: tc.toolCallId,
        type: 'function',
        function: { name: tc.name, arguments: tc.payload },
      })),
      tool_call_id: msg.toolCallId,
    }));
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
