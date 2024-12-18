import { OpenAI } from './openai';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Contains constants representing various models supported by OpenAI.
 *
 * @remarks
 * This abstract class defines static constants for the supported models
 * by xpanderAI's OpenAI real-time integrations.
 */
export abstract class FriendliAISupportedModels {
  /** Meta LLaMA 3.1 8B Instruct model. */
  public static readonly META_LLAMA_3_1_8B_INSTRUCT: string =
    'meta-llama-3.1-8b-instruct';
  /** Meta LLaMA 3.1 70B Instruct model. */
  public static readonly META_LLAMA_3_1_70B_INSTRUCT: string =
    'meta-llama-3.1-70b-instruct';
  /** Mistral 8x7B Instruct model (version 0.1). */
  public static readonly MISTRAL_8X_7B_INSTRUCT: string =
    'mixtral-8x7b-instruct-v0-1';
}

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
