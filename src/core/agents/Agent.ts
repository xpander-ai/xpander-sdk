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

/**
 * Represents an agent in xpanderAI, managing the tools, sessions, and operations
 * associated with the agent. This class enables loading agents, handling tool executions,
 * and managing prompt group sessions.
 */
export class Agent {
  /** Indicates whether the agent is ready with tools loaded. */
  ready: boolean = false;

  /** Collection of local tools specific to this agent. */
  localTools: ILocalTool[] = [];

  /** Manages prompt group sessions for this agent. */
  public promptGroupSessions: PromptGroupSessionsList;

  /** Maps original tool names to renamed versions for consistency. */
  protected originalToolNamesReamapping: Record<string, string> = {};

  constructor(
    /** Configuration settings for the agent. */
    public configuration: Configuration,

    /** Unique identifier for the agent. */
    public id: string,

    /** Organization ID to which the agent belongs. */
    public organizationId: string,

    /** Current status of the agent. */
    public status: AgentStatus,

    /** Human-readable name of the agent. */
    public name: string,

    /** List of source nodes associated with the agent. */
    public sourceNodes: ISourceNode[],

    /** Whether prompt group switching is allowed for the agent. */
    public pgSwitchAllowed: boolean = false,

    /** Array of tools available to the agent. */
    public tools: IAgentTool[] = [],

    /** Array of graph items related to the agent. */
    public graphs: IGraphItem[] = [],

    /** Array of agent tools specific to prompt groups. */
    public pgOas: IAgentTool[] = [],

    /** Whether the agent should automatically load its resources. */
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

  /** Checks if the agent is a custom-defined agent. */
  get isCustom() {
    return this.id === CUSTOM_AGENT_ID;
  }

  /**
   * Loads the agent data from the specified source node type.
   * @param sourceNodeType - The type of source node to load.
   */
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

  /**
   * Retrieves tools compatible with the specified LLM provider.
   * @param llmProvider - The LLM provider to filter tools by.
   * @returns A list of tools that match the specified provider.
   */
  getTools(llmProvider: LLMProvider = LLMProvider.OPEN_AI): any[] {
    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`provider (${llmProvider}) not found`);
    }
    const providerInstance = new provider(this);
    const tools = providerInstance.getTools();

    // mainly for AWS Bedrock resource ID conventions
    this.originalToolNamesReamapping = {
      ...(this.originalToolNamesReamapping || {}),
      ...(providerInstance.originalToolNamesReamapping || {}),
    };

    return tools;
  }

  /** Constructs the API URL for this agent. */
  public get url() {
    return `${this.configuration.baseUrl}/agents/${this.id}`;
  }

  /**
   * Adds local tools to the agent with prefixed function names.
   * @param tools - The list of local tools to add.
   */
  public addLocalTools(tools: any[] | ILocalTool[]): void {
    this.localTools = tools.map((tool) => ({
      ...tool,
      function: {
        ...tool.function,
        name: `${LOCAL_TOOL_PREFIX}${tool.function.name}`,
      },
    }));
  }

  /** Checks if the agent has any local tools loaded. */
  public get hasLocalTools() {
    return this.localTools.length !== 0;
  }

  /**
   * Executes a single tool call and returns the result.
   * @param tool - The tool call to execute.
   * @returns The result of the tool execution.
   */
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

  /**
   * Executes multiple tool calls sequentially and returns their results.
   * @param toolCalls - The list of tool calls to execute.
   * @returns A list of results for each tool execution.
   */
  public runTools(toolCalls: IToolCall[]): IToolCallResult[] {
    if (
      toolCalls.length === 0 &&
      !!this.promptGroupSessions.activeSession &&
      this.pgSwitchAllowed
    ) {
      this.promptGroupSessions.resetSessions();
    }
    return toolCalls.map(this.runTool.bind(this));
  }

  /** Retrieves the type of source node for the agent. */
  public get sourceNodeType(): SourceNodeType {
    return this.sourceNodes[0].type || SourceNodeType.SDK;
  }

  public toDict(): Record<string, any> {
    const dict: Record<string, any> = {};

    // Use Object.getOwnPropertyNames to get all properties
    for (const key of Object.getOwnPropertyNames(this)) {
      dict[key] = (this as any)[key];
    }

    return dict;
  }
}
