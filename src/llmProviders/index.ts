// Import providers
import { AmazonBedrock } from './amazonBedrock';
import { LangChain } from './langchain';
import { NvidiaNIM } from './nvidiaNim';
import { Ollama } from './ollama';
import { OpenAI } from './openai';
// Define and export all available providers in a single list for easy management
const allProviders = [
  OpenAI,
  LangChain,
  AmazonBedrock,
  NvidiaNIM,
  Ollama,
] as const;

// Export individual providers and the combined array for flexibility in imports
export { allProviders, OpenAI, NvidiaNIM, AmazonBedrock, LangChain, Ollama };
