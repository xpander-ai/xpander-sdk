// constants/llmProviders.ts

/**
 * Enum representing different Large Language Model (LLM) providers.
 */
export enum LLMProvider {
  /** Represents the 'langchain' provider. */
  LANG_CHAIN = 'langchain',

  /** Represents the 'openai' provider. */
  OPEN_AI = 'openai',

  /** Represents the 'realtimeopenai' provider. */
  REAL_TIME_OPEN_AI = 'realtimeopenai',

  /** Represents the 'nvidiaNim' provider. */
  NVIDIA_NIM = 'nvidiaNim',

  /** Represents the 'amazonBedrock' provider. */
  AMAZON_BEDROCK = 'amazonBedrock',

  // Represents the 'anthropic' provider.
  // ANTHROPIC = 'anthropic'
}
