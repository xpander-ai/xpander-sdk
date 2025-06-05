import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';

const applyAdditionalPropertiesFalse = (schema: any): void => {
  if (schema && typeof schema === 'object') {
    if (schema.type === 'object') {
      if (!schema.hasOwnProperty('additionalProperties')) {
        schema.additionalProperties = false;
      }
      if (schema.properties) {
        for (const key in schema.properties) {
          applyAdditionalPropertiesFalse(schema.properties[key]);
        }
      }
    }

    // Handle arrays of objects
    if (schema.type === 'array' && schema.items) {
      applyAdditionalPropertiesFalse(schema.items);
    }

    // Handle `anyOf`, `oneOf`, `allOf`, etc.
    ['anyOf', 'oneOf', 'allOf'].forEach((combiner) => {
      if (Array.isArray(schema[combiner])) {
        schema[combiner].forEach((subSchema) =>
          applyAdditionalPropertiesFalse(subSchema),
        );
      }
    });
  }
};

/**
 * Manages interactions with the OpenAI LLM provider, handling tool calls and model-specific settings.
 */
export class OpenAI extends BaseOpenAISDKHandler {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }
}
