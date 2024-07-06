import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI } from '../llmProviders/openai';

interface LLMProviderHandler {
  getTools(): any;
  invokeTools(toolSelectorResponse: any): any;
}

const LLMProvider_HANDLERS: { [key in LLMProvider]: new (client: XpanderClient) => LLMProviderHandler } = {
  [LLMProvider.OPEN_AI]: OpenAI,
  // Add other LLM providers here
};

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  private llmProviderHandler: LLMProviderHandler;

  /**
   * Creates an instance of XpanderClient.
   * @param agentKey - Your API key for authenticating with the agent.
   * @param agentUrl - The base URL of your agent.
   * @param llmProvider - The LLM provider to use.
   */
  constructor(agentKey: string, agentUrl: string, llmProvider: LLMProvider) {
    this.agentKey = agentKey;
    this.agentUrl = agentUrl;
    this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    this.toolsCache = null;
    this.retrieveAgentTools(); // Initialize toolsCache synchronously
  }

  /**
   * Retrieves tools from the agent and caches them.
   * @throws Will throw an error if the tools cannot be retrieved or are malformed.
   */
  retrieveAgentTools(): void {
    if (this.toolsCache) {
      return;
    }

    try {
      const response = this.syncRequest('POST', `${this.agentUrl}/tools`, {});
      if (response.statusCode !== 200) {
        throw new Error(JSON.stringify(response.getBody('utf8')));
      }

      this.toolsCache = JSON.parse(response.getBody('utf8'));

      if (!Array.isArray(this.toolsCache)) {
        throw new Error(`Returned tools are malformed - ${JSON.stringify(this.toolsCache)}`);
      }
    } catch (e) {
      throw new Error(`Failed to get agent's spec - ${(e as Error).message}`);
    }
  }

  /**
   * Retrieves tools based on the provided LLM provider.
   * @returns The tools provided by the specified LLM provider.
   */
  tools(): any {
    return this.llmProviderHandler.getTools();
  }

  /**
   * Invokes tools based on the provided tool selector response.
   * @param toolSelectorResponse - The response from the tool selector.
   * @returns The result of the tool invocation.
   */
  xpanderToolCall(toolSelectorResponse: any): any {
    return this.llmProviderHandler.invokeTools(toolSelectorResponse);
  }

  /**
   * Initializes the LLM provider handler based on the provided LLM provider.
   * @param llmProvider - The LLM provider to use.
   * @returns The initialized LLM provider handler.
   * @throws Will throw an error if the LLM provider handler cannot be found.
   */
  private initLLMProviderHandler(llmProvider: LLMProvider): LLMProviderHandler {
    const HandlerClass = LLMProvider_HANDLERS[llmProvider];
    if (!HandlerClass) {
      throw new Error(`LLMProvider ${llmProvider} handler not found`);
    }
    return new HandlerClass(this);
  }

  /**
   * Makes a synchronous HTTP request using then-request.
   * @param method - The HTTP method.
   * @param url - The URL to request.
   * @param data - The data to send with the request.
   * @returns The response data.
   * @throws Will throw an error if the request fails.
   */
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