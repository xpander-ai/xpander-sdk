import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI, NvidiaNIM } from '../llmProviders';
import { RequestPayload } from '../models/payloads';
import { ToolResponse } from '../models/toolResponse';
import { ILLMProviderHandler, ITool } from '../types';

const LLMProviderHandlers: {
  [key: string]: new (client: XpanderClient) => ILLMProviderHandler;
} = {
  [LLMProvider.OPEN_AI]: OpenAI,
  [LLMProvider.NVIDIA_NIM]: NvidiaNIM,
  // Add other LLM providers here
};

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  private llmProviderHandler: ILLMProviderHandler;

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

  tools(llmProvider?: string): ITool[] {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return this.llmProviderHandler.getTools();
  }

  stringifiedTools(llmProvider?: string): string {
    if (llmProvider) {
      this.llmProviderHandler = this.initLLMProviderHandler(llmProvider);
    }
    return JSON.stringify(this.llmProviderHandler.getTools());
  }

  getLLMMessagesPayload(
    stringifiedTools: string,
    prompt: string,
  ): { role: 'user'; content: string }[] {
    const handlerStatic = this.llmProviderHandler?.constructor as any;
    return [
      {
        role: 'user',
        content: [
          handlerStatic?.promptPrefix || '',
          stringifiedTools,
          prompt,
          handlerStatic?.promptSuffix || '',
        ].join(''),
      },
    ];
  }

  getToolFromLLMResponse(
    response: any,
  ): { toolId: string; payload?: RequestPayload }[] | null {
    try {
      const toolChoices = JSON.parse(
        response?.choices?.[0]?.message?.content || {},
      );
      if (toolChoices?.[0]?.toolId) {
        return toolChoices;
      }
    } catch (err: any) {
      throw new Error(`llm tool selection failure - ${err.message}`);
    }
    return null;
  }

  xpanderToolCall(
    toolSelectorResponse: any,
    llmProvider?: string,
  ): ToolResponse[] {
    if (
      !Array.isArray(toolSelectorResponse.choices) &&
      !toolSelectorResponse?.[0]?.toolId
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
}
