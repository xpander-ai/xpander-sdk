import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

export class NvidiaNIM extends BaseOpenAISDKHandler {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.NVIDIA_NIM;
  }
}
