import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../constants/llmProvider';
import { OpenAI, NvidiaNIM, AmazonBedrock, LangChain } from '../llmProviders';
import { BaseOpenAISDKHandler } from '../llmProviders/shared/baseOpenAI';
import { ToolResponse } from '../models/toolResponse';
import {
  IBedrockToolOutput,
  ICustomParams,
  IGraph,
  IGraphItem,
  IGraphSession,
  ILLMProviderHandler,
  ILocalTool,
  IOpenAIToolOutput,
} from '../types';
import { convertKeysToCamelCase } from './graphs';

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
 * Class representing the XpanderClient used to interact with xpanderAI tools.
 */
export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;
  graphsCache: any | IGraph;
  toolsFromExternal: boolean = false;
  localTools: ILocalTool[] = [];
  protected llmProviderHandler: ILLMProviderHandler;
  protected graphSession: any | IGraphSession;

  /**
   * @internal
   */
  _customParams: ICustomParams | undefined;

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
   * @param tools - Pass existing xpanderAI tools to the client instead of fetching.
   * @param customParams - Optional custom parameters for enhanced context.
   * @throws Will throw an error if an invalid LLM provider is specified.
   */
  constructor(
    agentKey: string,
    agentUrl: string,
    llmProvider: LLMProvider,
    localTools?: ILocalTool[],
    tools?: any[] | IOpenAIToolOutput[] | IBedrockToolOutput[],
    customParams?: any | ICustomParams,
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
    this.graphsCache = null;
    this.graphSession = null;
    this.localTools = localTools || [];
    this._customParams = customParams;

    if (Array.isArray(tools) && tools.length !== 0) {
      this.toolsCache = tools;
      this.toolsFromExternal = true;
    }

    this.loadXpanderTools();
    this.loadXpanderGraphs();
  }

  /**
   * Initializes a new graph session with the provided prompt.
   * @param {string} [prompt=''] - The prompt to initialize the session with.
   * @returns {void}
   */
  public startSession(prompt: string = ''): void {
    this.graphSession = {
      prompt,
      previousNode: '',
      promptGroup: null,
    };
  }

  /**
   * Retrieves the appropriate tools for the current graph session.
   *
   * @param {any[] | IOpenAIToolOutput[] | IBedrockToolOutput[]} tools - Array of available tools.
   *
   * @returns {any[] | IOpenAIToolOutput[] | IBedrockToolOutput[]} A subset of tools based on the graph session and prompt group.
   * @throws {Error} If graphs are not loaded or the graph session is not initiated properly.
   */
  public getToolsForGraphsSession(
    tools: any[] | IOpenAIToolOutput[] | IBedrockToolOutput[],
  ): any[] | IOpenAIToolOutput[] | IBedrockToolOutput[] {
    if (!!this._getCustomParamsIfExist()?.organization_id) return tools;

    // No graphs loaded, error
    if (!this.graphsCache) {
      throw new Error('Graphs not loaded');
    }

    // No prompt, allow all enabled - return all tools
    if (!this.graphSession?.prompt) {
      if (this.graphsCache.allowAllOperations) {
        return tools;
      } else {
        throw new Error('Graph session not initiated');
      }
    }

    // No prompt group but all allowed, so return all
    if (
      !this.graphSession?.promptGroup &&
      this.graphsCache.allowAllOperations
    ) {
      return tools;
    } else if (
      !this.graphSession.promptGroup &&
      !this.graphsCache.allowAllOperations
    ) {
      return [];
    }

    const pg = this.graphSession.promptGroup as IGraphItem;

    // We have a prompt group, let's return a subset of tools
    let subset = pg.graph[this.graphSession.previousNode] || [];

    // First iteration
    if (!this.graphSession.previousNode) {
      const allTargets = Object.entries(pg.graph);
      const multipleStartingNodes = Object.keys(pg.graph).reduce(
        (all: string[], node_name: string) => {
          const hasNoPointers = !allTargets.some(
            ([node, targets]: [string, string[]]) =>
              node !== node_name && targets.includes(node_name),
          );

          if (hasNoPointers) {
            all.push(node_name);
          }

          return all;
        },
        [],
      );
      if (multipleStartingNodes.length > 1) {
        subset = multipleStartingNodes;
      } else if (pg?.startingNode) {
        subset = [pg.startingNode]; // Starting node
      } else {
        subset = [Object.keys(pg?.graph)[0]]; // First node in graph
      }
    }

    const toolsByFunctionName = tools.reduce(
      (all, tool) => {
        all[tool.function.name] = tool;
        return all;
      },
      {} as Record<string, any>,
    );

    return subset.map((node: string) => toolsByFunctionName[node]);
  }

  /**
   * Loads the tools available from the xpanderAI agent.
   * @returns Array of tools.
   * @throws Will throw an error if the tools cannot be loaded.
   */
  public loadXpanderTools(): any[] {
    if (this.toolsCache) {
      return this.toolsCache;
    }

    try {
      const response = this.syncRequest(
        'POST',
        `${this.agentUrl}/tools`,
        this._customParams
          ? {
              __custom__: this._getCustomParamsIfExist(),
            }
          : {},
      );
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
   * Loads the graphs associated with the agent from the server.
   *
   * @returns {IGraph} The loaded graphs, cached if previously loaded.
   * @throws {Error} If the graphs cannot be loaded or are malformed.
   */
  private loadXpanderGraphs(): IGraph {
    if (this.graphsCache) {
      return this.graphsCache;
    }

    try {
      const response = this.syncRequest(
        'POST',
        `${this.agentUrl}/tools/graphs`,
        this._customParams
          ? {
              __custom__: this._getCustomParamsIfExist(),
            }
          : {},
      );

      if (response.statusCode !== 200) {
        throw new Error(JSON.stringify(response.getBody('utf8')));
      }

      this.graphsCache = convertKeysToCamelCase(
        JSON.parse(response.getBody('utf8')),
      );

      const specResponse = this.syncRequest(
        'POST',
        `${this.agentUrl}/tools/graphs/oas`,
        this._customParams
          ? {
              __custom__: this._getCustomParamsIfExist(),
            }
          : {},
      );

      if (specResponse.statusCode !== 200) {
        throw new Error(JSON.stringify(specResponse.getBody('utf8')));
      }

      this.graphsCache.spec = JSON.parse(specResponse.getBody('utf8'));

      if (!this.graphsCache?.organizationId) {
        throw new Error(
          `Returned graphs are malformed - ${JSON.stringify(this.graphsCache)}`,
        );
      }
    } catch (e) {
      throw new Error(`Failed to get agent's graphs - ${(e as Error).message}`);
    }

    return this.graphsCache;
  }

  /**
   * Retrieves custom params in the right format for agents service, only if they exist (passed by constructor).
   * For internal use only.
   * @internal
   * @returns - Empty object or formatted customParams.
   */
  public _getCustomParamsIfExist = () => {
    if (this._customParams) {
      return {
        organization_id: this._customParams.organizationId,
        connectors: this._customParams.connectors.map((connector) => {
          return {
            id: connector.id,
            operation_ids: connector.operationIds,
          };
        }),
      };
    }
    return {};
  };

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

  /**
   * Adds local tools to the client.
   * @param tools - Array of local tools to add.
   */
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
   * Sets a parameter in the current graph session.
   * @param {'previousNode' | 'prompt' | 'promptGroup'} param - The parameter to set, either 'previousNode' or 'prompt'.
   * @param {any} value - The value to assign to the specified parameter.
   * @returns {void}
   */
  public setGraphSessionParam(
    param: 'previousNode' | 'prompt' | 'promptGroup',
    value: any,
  ): void {
    if (this.graphSession && param in this.graphSession) {
      this.graphSession[param] = value;
    }
  }

  public isCustom() {
    return !!this._customParams;
  }

  /**
   * Gets a parameter in the current graph session.
   * @param {'previousNode' | 'prompt' | 'promptGroup' | 'pgSwitchAllowed'} param - The parameter to get, either 'previousNode' or 'prompt'.
   * @returns {any}
   */
  public getGraphSessionParam(
    param: 'previousNode' | 'prompt' | 'promptGroup' | 'pgSwitchAllowed',
  ): any {
    return this?.graphSession?.[param];
  }

  /**
   * Retrieves the tool names mapping for the current LLM provider.
   * @returns A record of tool names mapping.
   */
  public get toolsNamesMapping(): Record<string, string> {
    return this.llmProviderHandler.toolsNamesMapping || {};
  }
}
