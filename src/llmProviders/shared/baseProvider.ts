import { LLMProvider } from '../../constants/llmProvider';

export class BaseLLMProvider {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }
  static get supportedModels(): Record<string, string> {
    const models: Record<string, string> = {};
    return models;
  }
}
