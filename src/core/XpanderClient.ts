import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI, NvidiaNIM, AmazonBedrock, LangChain } from '../llmProviders';
import { BaseOpenAISDKHandler } from '../llmProviders/shared/baseOpenAI';
import { ToolResponse } from '../models/toolResponse';
import {
  IBedrockToolOutput,
  ILLMProviderHandler,
  ILocalTool,
  IOpenAIToolOutput,
} from '../types';

/**
 * Handlers for various LLM providers.
 */
const LLMProviderHandlers: {
  [key: string]: new (client: XpanderClient) => ILLMProviderHandler;
} = {
  [LLMProvider.OPEN_AI]: OpenAI,
  [LLMProvider.NVIDIA_NIM]: NvidiaNIM,
  [LLMProvider.AMAZON_BEDROCK]: AmazonBedrock,
  [LLMProvider.LANG_CHAIN]: LangChain,
  // Add other LLM providers here
};

/**
 * Class representing the Xpander client.
 */
export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  toolsFromExternal: boolean = false;
  localTools: ILocalTool[] = [];
  protected llmProviderHandler: ILLMProviderHandler;

  /**
   * Provides a list of valid LLM providers.
   * @returns Array of valid provider names.
   */
  static get validProviders(): string[] {
    return Object.keys(LLMProviderHandlers);
  }

  /**
   * Constructs a new XpanderClient instance.
   * @param agentKey - The API key for the agent.
   * @param agentUrl - The URL for the agent.
   * @param llmProvider - The LLM provider to use.
   * @param localTools - Local tools to append into the tools list.
   * @param tools - Pass existing xpander.ai tools to the client instead of fetching.
   * @throws Will throw an error if an invalid LLM provider is specified.
   */
  constructor(
    agentKey: string,
    agentUrl: string,
    llmProvider: LLMProvider,
    localTools?: ILocalTool[],
    tools?: any[] | IOpenAIToolOutput[] | IBedrockToolOutput[],
  ) {
    if (!XpanderClient.validProviders.includes(llmProvider)) {
      throw new Error(
        `Invalid LLMProvider. Valid providers are: ${XpanderClient.validProviders.join(', ')}`,
      );
    }
    this.agentKey = agentKey;
    this.agentUrl = agentUrl;
    this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    this.toolsCache = null;
    this.localTools = localTools || [];

    if (Array.isArray(tools) && tools.length !== 0) {
      this.toolsCache = tools;
      this.toolsFromExternal = true;
    }

    this.loadXpanderTools();
  }

  /**
   * Loads the tools available from the Xpander agent.
   * @returns Array of tools.
   * @throws Will throw an error if the tools cannot be loaded.
   */
  public loadXpanderTools(): any[] {
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

  /**
   * Retrieves the tools for the current or specified LLM provider.
   * @param {LLMProvider} llmProvider (Optional) The LLM provider to use.
   * @returns Array of tools.
   */
  public tools(
    llmProvider?: LLMProvider,
  ): any[] | IOpenAIToolOutput[] | IBedrockToolOutput[] {
    if (this.toolsFromExternal) {
      return this.toolsCache;
    }
    let tools: any[] | IOpenAIToolOutput[] | IBedrockToolOutput[] = [];
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    const isOpenAIBasedProvider =
      this.llmProviderHandler instanceof BaseOpenAISDKHandler;

    if (isOpenAIBasedProvider) {
      tools = this.llmProviderHandler.getTools<IOpenAIToolOutput>();
    } else {
      tools = this.llmProviderHandler.getTools<IBedrockToolOutput>();
    }

    return [...tools, ...this.localTools];
  }

  /**
   * Invokes the tools based on the tool selector response.
   * @param toolSelectorResponse - The response from the tool selector.
   * @param llmProvider - (Optional) The LLM provider to use.
   * @returns Array of tool responses.
   */
  public xpanderToolCall(
    toolSelectorResponse: any,
    llmProvider?: string,
  ): ToolResponse[] {
    if (
      !Array.isArray(toolSelectorResponse.choices) &&
      !Array.isArray(toolSelectorResponse?.output?.message?.content) &&
      !Array.isArray(toolSelectorResponse?.tool_calls)
    ) {
      return [];
    }
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.invokeTools(toolSelectorResponse);
  }

  /**
   * Initializes the LLM provider handler for the specified provider.
   * @param llmProvider - The LLM provider to initialize.
   * @returns The initialized LLM provider handler.
   * @throws Will throw an error if the handler for the specified provider cannot be found.
   */
  private initLLMProviderHandler(llmProvider: string): ILLMProviderHandler {
    const HandlerClass = LLMProviderHandlers[llmProvider];
    if (!HandlerClass) {
      throw new Error(`LLMProvider ${llmProvider} handler not found`);
    }
    return new HandlerClass(this);
  }

  /**
   * Makes a synchronous request.
   * @param method - The HTTP method to use.
   * @param url - The URL to send the request to.
   * @param data - The data to include in the request.
   * @returns The response from the request.
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

  public addLocalTools(tools: ILocalTool[]): void {
    this.localTools = tools;
  }

  /**
   * Invokes a single tool with the given tool ID and payload.
   * @param toolId - The ID of the tool to invoke.
   * @param payload - The payload to pass to the tool.
   * @returns The result of the tool invocation.
   * @throws Will throw an error if the tool implementation is not found.
   */
  public xpanderSingleToolInvoke(toolId: string, payload?: any): string {
    return this.llmProviderHandler.singleToolInvoke(
      toolId,
      payload || ({} as any),
    );
  }

  /**
   * Retrieves the tool names mapping for the current LLM provider.
   * @returns A record of tool names mapping.
   */
  public get toolsNamesMapping(): Record<string, string> {
    return this.llmProviderHandler.toolsNamesMapping || {};
  }
}
