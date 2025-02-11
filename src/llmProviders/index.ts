// Import providers
import { AmazonBedrock } from './amazonBedrock';
import { FriendliAI } from './friendliAI';
import { GeminiOpenAI } from './geminiOpenAI';
import { LangChain } from './langchain';
import { NvidiaNIM } from './nvidiaNim';
import { Ollama } from './ollama';
import { OpenAI } from './openai';
import { RealTimeOpenAI } from './rtOpenAI';
// Define and export all available providers in a single list for easy management
const allProviders = [
  OpenAI,
  RealTimeOpenAI,
  FriendliAI,
  LangChain,
  AmazonBedrock,
  NvidiaNIM,
  Ollama,
  GeminiOpenAI,
] as const;

// Export individual providers and the combined array for flexibility in imports
export { allProviders, OpenAI, NvidiaNIM, AmazonBedrock, LangChain, Ollama };
