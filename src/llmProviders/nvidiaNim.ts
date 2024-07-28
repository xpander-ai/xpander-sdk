import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

export class NvidiaNIM extends BaseOpenAISDKHandler {
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.NVIDIA_NIM;
  }

  // append default parameters due to nvidia's strict mode
  postProcessTools(tools: any[]): any[] {
    return tools.map((tool: any) => {
      if (!('parameters' in tool.function)) {
        tool.function.parameters = {
          type: 'object',
          required: [],
          properties: {
            query_params: {
              type: 'object',
              properties: {},
              required: [],
            },
            path_params: {
              type: 'object',
              properties: {},
              required: [],
            },
            body_params: {
              type: 'object',
              properties: {},
              required: [],
            },
          },
        };
      }
      return tool;
    });
  }
}
