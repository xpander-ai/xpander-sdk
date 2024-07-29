import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

export class OpenAI extends BaseOpenAISDKHandler {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  static get supportedModels() {
    return {
      GPT_4: 'gpt-4',
      GPT_4o: 'gpt-4o',
      GPT_4o_mini: 'gpt-4o-mini',
    };
  }
}
