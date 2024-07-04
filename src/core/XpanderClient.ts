import axios from 'axios';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI, LangChain, Anthropic } from '../llmProviders';

const LLMProvider_HANDLERS: LLMProviderHandler[] = [OpenAI, LangChain, Anthropic];

interface LLMProviderHandler {
  new(client: XpanderClient): any;
  shouldHandle(llmProvider: LLMProvider): boolean;
}

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;

  constructor(agentKey: string, agentUrl: string) {
    this.agentKey = agentKey;
    this.agentUrl = agentUrl;
  }

  async retrieveAgentTools(): Promise<any> {
    if (this.toolsCache) {
      return this.toolsCache;
    }

    try {
      const result = await axios.post(`${this.agentUrl}/tools`, {}, {
        headers: { 'x-api-key': this.agentKey },
      });

      if (result.status !== 200) {
        throw new Error(JSON.stringify(result.data));
      }

      this.toolsCache = result.data;

      if (!Array.isArray(this.toolsCache)) {
        throw new Error(`Returned tools are malformed - ${JSON.stringify(this.toolsCache)}`);
      }
    } catch (e) {
      throw new Error(`Failed to get agent's spec - ${(e as Error).message}`);
    }

    return this.toolsCache;
  }

  tools(llmProvider: LLMProvider): any {
    const handler = this.getLLMProviderHandler(llmProvider);
    return handler.getTools();
  }

  getLLMProviderHandler(llmProvider: LLMProvider): any {
    for (const LLMProviderHandler of LLMProvider_HANDLERS) {
      if (LLMProviderHandler.shouldHandle(llmProvider)) {
        return new LLMProviderHandler(this);
      }
    }
    throw new Error(`LLMProvider ${llmProvider} handler not found`);
  }

  processChatResponse(messages: any[], llmProvider: LLMProvider, chatCompletionResponse: any, aiClient: any): any {
    try {
      const handler = this.getLLMProviderHandler(llmProvider);
      if (handler.processChatResponse) {
        return handler.processChatResponse(messages, chatCompletionResponse, aiClient);
      } else {
        throw new Error('Handler implementation issue - ChatCompletion');
      }
    } catch (e) {
      throw new Error(`Failed to handle chat completion - ${(e as Error).message}`);
    }
  }
}