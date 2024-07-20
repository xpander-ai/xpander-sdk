import request, { HttpVerb } from 'sync-request';
import { OpenAI } from '../llmProviders/openai';
import { ToolResponse } from '../models/toolResponse';

interface LLMProviderHandler {
  getTools(functionize?: boolean): any;
  invokeTools(toolSelectorResponse: any): any;
}

const LLMProvider_HANDLERS: {
  [key: string]: new (client: XpanderClient) => LLMProviderHandler;
} = {
  openai: OpenAI,
  // Add other LLM providers here
};

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  private llmProviderHandler: LLMProviderHandler;

  // Providing a public static method to list valid LLM providers
  static get validProviders(): string[] {
    return Object.keys(LLMProvider_HANDLERS);
  }

  constructor(agentKey: string, agentUrl: string, llmProvider: string) {
    if (!XpanderClient.validProviders.includes(llmProvider)) {
      throw new Error(
        `Invalid LLMProvider. Valid providers are: ${XpanderClient.validProviders.join(', ')}`,
      );
    }
    this.agentKey = agentKey;
    this.agentUrl = agentUrl;
    this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    this.toolsCache = null;
    this.loadXpanderTools();
  }

  loadXpanderTools(): any[] {
    if (this.toolsCache) {
      return this.toolsCache;
    }

    try {
      const response = this.syncRequest('POST', `${this.agentUrl}/tools`, {});
      if (response.statusCode !== 200) {
        throw new Error(JSON.stringify(response.getBody('utf8')));
      }

      this.toolsCache = JSON.parse(response.getBody('utf8'));
      if (!Array.isArray(this.toolsCache)) {
        throw new Error(
          `Returned tools are malformed - ${JSON.stringify(this.toolsCache)}`,
        );
      }
    } catch (e) {
      throw new Error(`Failed to get agent's spec - ${(e as Error).message}`);
    }

    return this.toolsCache;
  }

  tools(llmProvider?: string): any {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.getTools();
  }

  xpanderToolCall(
    toolSelectorResponse: any,
    llmProvider?: string,
  ): ToolResponse[] {
    if (!Array.isArray(toolSelectorResponse.choices)) {
      return [];
    }
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.invokeTools(toolSelectorResponse);
  }

  private initLLMProviderHandler(llmProvider: string): LLMProviderHandler {
    const HandlerClass = LLMProvider_HANDLERS[llmProvider];
    if (!HandlerClass) {
      throw new Error(`LLMProvider ${llmProvider} handler not found`);
    }
    return new HandlerClass(this);
  }

  private syncRequest(method: HttpVerb, url: string, data: any): any {
    try {
      const response = request(method, url, {
        json: data,
        headers: { 'x-api-key': this.agentKey },
      });
      return response;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }
}
