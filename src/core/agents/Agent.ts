import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../../constants/llmProvider';
import { LOCAL_TOOL_PREFIX } from '../../constants/tools';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';

import { allProviders } from '../../llmProviders';
import {
  IGraphItem,
  ILocalTool,
  IToolCall,
  IToolCallResult,
  ToolCallType,
} from '../../types';
import {
  AgentStatus,
  IAgentTool,
  ISourceNode,
  SourceNodeType,
} from '../../types/agents';
import { Configuration } from '../Configuration';
import { PromptGroupSessionsList } from '../promptGroups/PromptGroupSessionsList';
import { executeTool } from '../tools';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '../utils';

export class Agent {
  ready: boolean = false;
  localTools: ILocalTool[] = [];
  public promptGroupSessions: PromptGroupSessionsList;
  protected originalToolNamesReamapping: Record<string, string> = {};

  constructor(
    public configuration: Configuration,
    public id: string,
    public organizationId: string,
    public status: AgentStatus,
    public name: string,
    public sourceNodes: ISourceNode[],
    public pgSwitchAllowed: boolean = false,
    public tools: IAgentTool[] = [],
    public graphs: IGraphItem[] = [],
    public pgOas: IAgentTool[] = [],
    autoLoad: boolean = true,
  ) {
    if (this.tools.length !== 0) {
      this.ready = true;
    }
    if (autoLoad && !this.ready) {
      this.load();
    }
    this.promptGroupSessions = new PromptGroupSessionsList(
      this.graphs,
      this.pgOas,
    );
  }

  get isCustom() {
    return this.id === CUSTOM_AGENT_ID;
  }

  load(sourceNodeType: SourceNodeType = SourceNodeType.SDK): void {
    if (this.ready) {
      return;
    } else {
      try {
        const url = `${this.url}/${sourceNodeType}`;
        const response = request(
          this.isCustom ? 'POST' : ('GET' as HttpVerb),
          url,
          {
            json: this.isCustom
              ? {
                  __custom__: convertKeysToSnakeCase(
                    this.configuration.customParams,
                  ),
                }
              : undefined,
            headers: { 'x-api-key': this.configuration.apiKey },
          },
        );
        if (!response.statusCode.toString().startsWith('2')) {
          throw new Error(response.body.toString());
        }

        const agent = convertKeysToCamelCase(
          JSON.parse(response.getBody('utf8')),
        );

        const loadedAgent = new Agent(
          this.configuration,
          agent.id,
          agent.organizationId,
          AgentStatus.ACTIVE,
          agent.name,
          agent.sourceNode ? [agent.sourceNode] : [],
          agent.pgSwitchAllowed,
          agent.tools,
          agent.graphs,
          agent.pgOas,
        );
        Object.assign(this, loadedAgent);
      } catch (err) {
        throw new Error('Failed to load agent');
      }
    }
  }

  getTools(llmProvider: LLMProvider = LLMProvider.OPEN_AI): any[] {
    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`provider (${llmProvider}) not found`);
    }
    const providerInstance = new provider(this);
    const tools = providerInstance.getTools();

    // mainly for bedrock aws resource ids convention
    this.originalToolNamesReamapping = {
      ...(this.originalToolNamesReamapping || {}),
      ...(providerInstance.originalToolNamesReamapping || {}),
    };

    return tools;
  }

  public get url() {
    return `${this.configuration.baseUrl}/agents/${this.id}`;
  }

  public addLocalTools(tools: any[] | ILocalTool[]): void {
    this.localTools = tools.map((tool) => ({
      ...tool,
      function: {
        ...tool.function,
        name: `${LOCAL_TOOL_PREFIX}${tool.function.name}`,
      },
    }));
  }

  public get hasLocalTools() {
    return this.localTools.length !== 0;
  }

  public runTool(tool: IToolCall): IToolCallResult {
    const toolCallResult: IToolCallResult = {
      functionName: tool.name,
      payload: tool.payload,
      toolCallId: tool.toolCallId,
    };

    if (tool.isPg) {
      // start session
      try {
        toolCallResult.result = this.promptGroupSessions.startPgSession(tool);
        toolCallResult.isSuccess = true;
      } catch (err: any) {
        toolCallResult.isError = true;
        toolCallResult.result = `Error: ${err.toString()}`;
      }
      return toolCallResult;
    }

    if (tool.type !== ToolCallType.XPANDER) {
      return toolCallResult;
    }

    // run tool
    try {
      toolCallResult.result = executeTool(
        {
          ...tool,
          name: this.originalToolNamesReamapping?.[tool.name] || tool.name,
        },
        this.url,
        this.configuration,
        this.sourceNodeType,
      );
      this.promptGroupSessions.activeSession.lastNode = tool.name;
      toolCallResult.isSuccess = true;
    } catch (err: any) {
      toolCallResult.isError = true;
      toolCallResult.result = `Error: ${err.toString()}`;
    }

    return toolCallResult;
  }

  public runTools(toolCalls: IToolCall[]): IToolCallResult[] {
    if (
      toolCalls.length === 0 &&
      !!this.promptGroupSessions.activeSession &&
      this.pgSwitchAllowed
    )
      this.promptGroupSessions.resetSessions();
    return toolCalls.map(this.runTool.bind(this));
  }

  public get sourceNodeType(): SourceNodeType {
    return this.sourceNodes[0].type || SourceNodeType.SDK;
  }
}
