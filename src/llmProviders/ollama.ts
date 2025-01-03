import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_TOOL_PARAMETERS } from '../constants/tools';
import { ToolCall } from '../core/toolCalls';
import { getToolBaseSignature } from '../core/tools';
import { BaseLLMProvider } from './shared/baseProvider';

/**
 * Contains constants representing various models supported by Ollama.
 */
export abstract class OllamaSupportedModels {
  /** Qwen2.5-Coder model. */
  public static readonly QWEN2_5_CODER = 'qwen2.5-coder';
}

/**
 * Handles interactions with the Ollama LLM provider, including tool post-processing
 * to append default parameters when necessary.
 */
export class Ollama extends BaseLLMProvider {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OLLAMA;
  }

  /**
   * Extracts tool calls from an Ollama LLM response.
   * @param llmResponse - The response object from Ollama.
   * @returns An array of ToolCall objects extracted from the response.
   * @throws Error if the response format is invalid.
   */
  static extractToolCalls(llmResponse: Record<string, any>): ToolCall[] {
    if (typeof llmResponse !== 'object') {
      throw new Error('LLM response should be an object.');
    }

    const extractedToolCalls: ToolCall[] = [];
    const toolCalls = llmResponse?.message?.tool_calls || [];

    for (const toolCall of toolCalls) {
      // Skip if required properties are missing
      if (!toolCall?.function?.name || !toolCall?.function?.arguments) {
        continue;
      }

      const functionDetails = toolCall.function;
      const payload = {
        bodyParams: functionDetails.arguments.bodyParams || {},
        pathParams: functionDetails.arguments.pathParams || {},
        queryParams: functionDetails.arguments.queryParams || {},
      };

      extractedToolCalls.push(
        ToolCall.fromObject({
          ...getToolBaseSignature(functionDetails.name, ''),
          payload,
        }),
      );
    }

    return extractedToolCalls;
  }

  /**
   * Post-processes tools to append default parameters, ensuring compatibility with Ollama's strict requirements.
   * @param tools - The tools to post-process.
   * @returns An array of post-processed tools with default parameters applied where necessary.
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
