import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI, NvidiaNIM, AmazonBedrock } from '../llmProviders';
import { BaseLLMProvider } from '../llmProviders/shared/baseProvider';
import { ToolResponse } from '../models/toolResponse';
import { IBedrockTool, ILLMProviderHandler, ITool } from '../types';

const LLMProviderHandlers: {
  [key: string]: new (client: XpanderClient) => ILLMProviderHandler;
} = {
  [LLMProvider.OPEN_AI]: OpenAI,
  [LLMProvider.NVIDIA_NIM]: NvidiaNIM,
  [LLMProvider.AMAZON_BEDROCK]: AmazonBedrock,
  // Add other LLM providers here
};

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  protected llmProviderHandler: ILLMProviderHandler;

  // Providing a public static method to list valid LLM providers
  static get validProviders(): string[] {
    return Object.keys(LLMProviderHandlers);
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

  public tools(llmProvider?: string): ITool[] | IBedrockTool[] {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.getTools();
  }

  public xpanderToolCall(
    toolSelectorResponse: any,
    llmProvider?: string,
  ): ToolResponse[] {
    if (
      !Array.isArray(toolSelectorResponse.choices) &&
      !Array.isArray(toolSelectorResponse?.output?.message?.content)
    ) {
      return [];
    }
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.invokeTools(toolSelectorResponse);
  }

  private initLLMProviderHandler(llmProvider: string): ILLMProviderHandler {
    const HandlerClass = LLMProviderHandlers[llmProvider];
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

  public get supportedModels(): Record<string, string> {
    return (this.llmProviderHandler.constructor as typeof BaseLLMProvider)
      .supportedModels;
  }

  public get toolsNamesMapping(): Record<string, string> {
    return this.llmProviderHandler.toolsNamesMapping || {};
  }
}
