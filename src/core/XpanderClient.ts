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
  }

  /**
   * Retrieves tools from the agent. Caches the tools for future use.
   * @returns A promise that resolves to the list of tools.
   * @throws Will throw an error if the tools cannot be retrieved or are malformed.
   */
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

  /**
   * Retrieves tools based on the provided LLM provider.
   * @param llmProvider - (Optional) The LLM provider to use.
   * @returns The tools provided by the specified LLM provider.
   */
  tools(llmProvider?: LLMProvider): any {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.getTools();
  }

  /**
   * Initializes the LLM provider handler based on the provided LLM provider.
   * @param llmProvider - The LLM provider to use.
   * @returns The initialized LLM provider handler.
   * @throws Will throw an error if the LLM provider handler cannot be found.
   */
  initLLMProviderHandler(llmProvider: LLMProvider): any {
    for (const LLMProviderHandler of LLMProvider_HANDLERS) {
      if (LLMProviderHandler.shouldHandle(llmProvider)) {
        return new LLMProviderHandler(this);
      }
    }
    throw new Error(`LLMProvider ${llmProvider} handler not found`);
  }

  /**
   * Invokes tools based on the provided tool selector response and LLM provider.
   * @param toolSelectorResponse - The response from the tool selector.
   * @param llmProvider - (Optional) The LLM provider to use.
   * @returns The result of the tool invocation.
   */
  xpanderToolCall(toolSelectorResponse: any, llmProvider?: LLMProvider): any {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.invokeTools(toolSelectorResponse);
  }

  /**
   * Retrieves the LLM provider handler based on the provided LLM provider.
   * @param llmProvider - The LLM provider to use.
   * @returns The initialized LLM provider handler.
   * @throws Will throw an error if the LLM provider handler cannot be found.
   */
  getLLMProviderHandler(llmProvider: LLMProvider): any {
    for (const LLMProviderHandler of LLMProvider_HANDLERS) {
      if (LLMProviderHandler.shouldHandle(llmProvider)) {
        return new LLMProviderHandler(this);
      }
    }
    throw new Error(`LLMProvider ${llmProvider} handler not found`);
  }
}