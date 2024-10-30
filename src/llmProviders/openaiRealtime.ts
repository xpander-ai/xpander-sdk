import { IToolDefinition } from '../types';
import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Class representing the OpenAI Realtime LLM provider.
 */
export class OpenAIRealtime extends BaseOpenAISDKHandler {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.REAL_TIME_OPEN_AI;
  }
  /**
   * Post-processes the tools to conform to the ToolDefinitionType schema.
   * @param tools - The tools to post-process.
   * @returns An array of post-processed tools conforming to ToolDefinitionType.
   */
  postProcessTools(tools: any[]): IToolDefinition[] {
    const processedTools: IToolDefinition[] = tools.map((tool) => ({
      type: 'function',
      name: tool.name,
      description: tool.description,
      parameters: {
        ...tool.parameters,
        required: tool.parameters.required || [],
      },
    }));

    return processedTools;
  }
}
