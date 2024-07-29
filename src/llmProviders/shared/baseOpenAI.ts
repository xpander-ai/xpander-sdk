import { BaseLLMProvider } from './baseProvider';
import { LLMProvider } from '../../constants/llmProvider';

export class BaseOpenAISDKHandler extends BaseLLMProvider {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }
}
