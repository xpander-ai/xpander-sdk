import { BaseLLMProvider } from './baseProvider';
import { LLMProvider } from '../../constants/llmProvider';

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
}
