import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Contains constants representing various models supported by OpenAI.
 */
export abstract class OpenAISupportedModels {
  /** OpenAI GPT-4 model. */
  public static readonly GPT_4: string = 'gpt-4';

  /** OpenAI GPT-4o model. */
  public static readonly GPT_4_O: string = 'gpt-4o';

  /** OpenAI GPT-4o Mini model. */
  public static readonly GPT_4_O_MINI: string = 'gpt-4o-mini';
}

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
}
