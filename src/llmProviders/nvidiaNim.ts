import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';

/**
 * @class NvidiaNIMSupportedModels
 * @description A class containing constants representing various supported models in Nvidia NIM.
 */
export abstract class NvidiaNIMSupportedModels {
  /**
   * @constant
   * @type {string}
   * @description Meta Llama 3.1 70B Instruct model.
   */
  public static readonly LLAMA_3_1_70B_INSTRUCT = 'meta/llama-3.1-70b-instruct';
}

/**
 * Class representing the Nvidia NIM LLM provider.
 */
export class NvidiaNIM extends BaseOpenAISDKHandler {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.NVIDIA_NIM;
  }

  /**
   * Post-processes the tools to append default parameters due to Nvidia's strict mode.
   * @param tools - The tools to post-process.
   * @returns An array of post-processed tools.
   */
  postProcessTools(tools: any[]): any[] {
    return tools.map((tool: any) => {
      if (!('parameters' in tool.function)) {
        tool.function.parameters = DEFAULT_TOOL_PARAMETERS;
      }
      return tool;
    });
  }
}
