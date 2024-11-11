/**
 * Enum representing different Large Language Model (LLM) providers.
 *
 * This enum lists various LLM service providers integrated with xpanderAI, enabling
 * selection of the desired LLM provider for specific tasks.
 */
export enum LLMProvider {
  /** Represents the 'langchain' provider. */
  LANG_CHAIN = 'langchain',

  /** Represents the 'openai' provider. */
  OPEN_AI = 'openai',

  /** Represents the 'nvidiaNim' provider. */
  NVIDIA_NIM = 'nvidiaNim',

  /** Represents the 'amazonBedrock' provider. */
  AMAZON_BEDROCK = 'amazonBedrock',
}
