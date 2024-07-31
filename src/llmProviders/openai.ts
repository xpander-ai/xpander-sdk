import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

/**
 * @class OpenAISupportedModels
 * @description A class containing constants representing various supported models in OpenAI.
 */
export abstract class OpenAISupportedModels {
  /**
   * @constant
   * @type {string}
   * @description OpenAI GPT-4 model.
   */
  public static readonly GPT_4: string = 'gpt-4';

  /**
   * @constant
   * @type {string}
   * @description OpenAI GPT-4o model.
   */
  public static readonly GPT_4_O: string = 'gpt-4o';

  /**
   * @constant
   * @type {string}
   * @description OpenAI GPT-4o Mini model.
   */
  public static readonly GPT_4_O_MINI: string = 'gpt-4o-mini';
}

/**
 * Class representing the OpenAI LLM provider.
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
