import axios from 'axios';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI } from '../llmProviders';

const LLMProvider_HANDLERS: LLMProviderHandler[] = [OpenAI];

interface LLMProviderHandler {
  new(client: XpanderClient): any;
  shouldHandle(llmProvider: LLMProvider): boolean;
}

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  llmProviderHandler: any;

  constructor(agentKey: string, agentUrl: string, llmProvider: LLMProvider) {
    this.agentKey = agentKey;
    this.agentUrl = agentUrl;
    this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
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

  tools(llmProvider?: LLMProvider): any {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.getTools();
  }

  initLLMProviderHandler(llmProvider: LLMProvider): any {
    for (const LLMProviderHandler of LLMProvider_HANDLERS) {
      if (LLMProviderHandler.shouldHandle(llmProvider)) {
        return new LLMProviderHandler(this);
      }
    }
    throw new Error(`LLMProvider ${llmProvider} handler not found`);
  }

  xpanderToolCall(toolSelectorResponse: any, llmProvider?: LLMProvider): any {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.invokeTools(toolSelectorResponse);
  }

  getLLMProviderHandler(llmProvider: LLMProvider): any {
    for (const LLMProviderHandler of LLMProvider_HANDLERS) {
      if (LLMProviderHandler.shouldHandle(llmProvider)) {
        return new LLMProviderHandler(this);
      }
    }
    throw new Error(`LLMProvider ${llmProvider} handler not found`);
  }
}