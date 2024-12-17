import { OpenAI } from './openai';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Contains constants representing various models supported by OpenAI.
 *
 * @remarks
 * This abstract class defines static constants for the supported models
 * by xpanderAI's OpenAI real-time integrations.
 */
export abstract class RealTimeOpenAISupportedModels {
  /** OpenAI GPT-4o Realtime Preview model. */
  public static readonly GPT_4_O_REALTIME_PREVIEW: string =
    'gpt-4o-realtime-preview';

  /** OpenAI GPT-4o Audio Preview model. */
  public static readonly GPT_4_O_AUDIO_PREVIEW: string = 'gpt-4o-audio-preview';

  /** OpenAI Whisper model for speech-to-text tasks. */
  public static readonly WHISPER_1: string = 'whisper-1';
}

/**
 * Manages interactions with the OpenAI LLM provider, handling tool calls and model-specific settings.
 *
 * @remarks
 * This class extends the core `OpenAI` class to provide specialized
 * functionalities for real-time integrations with xpanderAI's OpenAI models.
 */
export class RealTimeOpenAI extends OpenAI {
  /**
   * Determines if this provider should handle the specified LLM provider.
   *
   * @param llmProvider - The LLM provider to check against the supported provider.
   * @returns A boolean indicating if the current provider matches the specified provider.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.REAL_TIME_OPEN_AI;
  }
}
