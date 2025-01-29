import { OpenAI } from './openai';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Manages interactions with the OpenAI LLM provider, handling tool calls and model-specific settings.
 *
 * @remarks
 * This class extends the core `OpenAI` class to provide specialized
 * functionalities for real-time integrations with xpanderAI's OpenAI models.
 */
export class FriendliAI extends OpenAI {
  /**
   * Determines if this provider should handle the specified LLM provider.
   *
   * @param llmProvider - The LLM provider to check against the supported provider.
   * @returns A boolean indicating if the current provider matches the specified provider.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.FRIENDLI_AI;
  }
}
