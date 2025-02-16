import { OpenAI } from './openai';
import { LLMProvider } from '../constants/llmProvider';

/**
 * Manages interactions with the OpenAI LLM provider, handling tool calls and model-specific settings.
 *
 * @remarks
 * This class extends the core `OpenAI` class to provide specialized
 * functionalities for real-time integrations with xpanderAI's OpenAI models.
 */
export class GeminiOpenAI extends OpenAI {
  /**
   * Determines if this provider should handle the specified LLM provider.
   *
   * @param llmProvider - The LLM provider to check against the supported provider.
   * @returns A boolean indicating if the current provider matches the specified provider.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.GEMINI_OPEN_AI;
  }

  postProcessTools(tools: any[]): any[] {
    tools = this.runSchemaEnforcement(tools);

    // clear empty parameters
    for (const tool of tools) {
      if (!!tool?.function?.parameters?.properties) {
        for (const property in tool.function.parameters.properties) {
          const isEmpty =
            Object.keys(
              tool?.function?.parameters?.properties?.[property]?.properties ||
                {},
            ).length === 0;
          if (isEmpty) {
            delete tool.function.parameters.properties[property];
            tool.function.parameters.required =
              tool.function.parameters.required.filter(
                (p: string) => p !== property,
              );
          }
        }
      }
      if (
        !tool?.function?.parameters ||
        Object.keys(tool.function.parameters || {}).length === 0
      ) {
        delete tool.function.parameters;
      }
    }

    return tools;
  }
}
