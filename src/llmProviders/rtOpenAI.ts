import { OpenAI } from './openai';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Contains constants representing various models supported by OpenAI.
 */
export abstract class RealTimeOpenAISupportedModels {
  /** OpenAI GPT-4o Realtime Preview model. */
  public static readonly GPT_4_O_REALTIME_PREVIEW: string =
    'gpt-4o-realtime-preview';

  /** OpenAI GPT-4o Audio Preview model. */
  public static readonly GPT_4_O_AUDIO_PREVIEW: string = 'gpt-4o-audio-preview';

  /** OpenAI Whisper model. */
  public static readonly WHISPER_1: string = 'whisper-1';
}

/**
 * Manages interactions with the OpenAI LLM provider, handling tool calls and model-specific settings.
 */
export class RealTimeOpenAI extends OpenAI {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.REAL_TIME_OPEN_AI;
  }
}
