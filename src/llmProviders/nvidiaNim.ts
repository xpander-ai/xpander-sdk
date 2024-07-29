import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';

export class NvidiaNIM extends BaseOpenAISDKHandler {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.NVIDIA_NIM;
  }

  // append default parameters due to nvidia's strict mode
  postProcessTools(tools: any[]): any[] {
    return tools.map((tool: any) => {
      if (!('parameters' in tool.function)) {
        tool.function.parameters = DEFAULT_TOOL_PARAMETERS;
      }
      return tool;
    });
  }

  static get supportedModels() {
    return {
      LLAMA_3_1_70B_Instruct: 'meta/llama-3.1-70b-instruct',
    };
  }
}
