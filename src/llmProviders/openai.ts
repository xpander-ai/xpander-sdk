import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Manages interactions with the OpenAI LLM provider, handling tool calls and model-specific settings.
 */
export class OpenAI extends BaseOpenAISDKHandler {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  mcpSupported = true;
}
