import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../../constants/llmProvider';
import {
  LOCAL_TOOL_PREFIX,
  OVERSIZED_RESPONSE_TOOL_NAMES,
  OVERSIZED_RESPONSE_TOOLS,
  OverSizedResponseTool,
} from '../../constants/tools';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';

import { allProviders } from '../../llmProviders';
import {
  IGraphItem,
  ILocalTool,
  IToolCallPayload,
  ToolCallType,
} from '../../types';
import {
  AgentStatus,
  IAgentTool,
  ISourceNode,
  INodeSchema,
  IPGSchema,
  SourceNodeType,
  INodeDescription,
} from '../../types/agents';
import { Base } from '../base';
import { Configuration } from '../Configuration';
import { PromptGroupSessionsList } from '../promptGroups/PromptGroupSessionsList';
import { ToolCall, ToolCallResult } from '../toolCalls';
import {
  appendPermanentValues,
  appendPermanentValuesToResult,
  ensureToolCallPayloadStructure,
  executeTool,
  isOversizedToolResponse,
  mergeDeep,
} from '../tools';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '../utils';
import { vectorSearchWithBubble } from '../vector';

/**
 * Represents an agent in xpanderAI, managing the tools, sessions, and operations
 * associated with the agent. This class enables loading agents, handling tool executions,
 * and managing prompt group sessions.
 */
export class Agent extends Base {
  /** Indicates whether the agent is ready with tools loaded. */
  ready: boolean = false;

  /** Collection of local tools specific to this agent. */
  localTools: ILocalTool[] = [];

  /** Manages prompt group sessions for this agent. */
  public promptGroupSessions: PromptGroupSessionsList;

  protected oversizedResponseCache: any = null;

  /** Maps original tool names to renamed versions for consistency. */
  protected originalToolNamesReMapping: Record<string, string> = {};

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

    /** Array of agent tools specific to prompt groups. */
    public pgSchemas: IPGSchema[] = [],

    /** Array of agent tools specific to prompt groups. */
    public pgNodeDescriptionOverride: INodeDescription[] = [],
    public generalInstructions: string = '',
    public judgeInstructions: string = '',
  ) {
    super();
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

        const rawAgent = JSON.parse(response.getBody('utf8'));
        const agent = convertKeysToCamelCase(rawAgent);

        // keep original tools structure
        if ('tools' in agent) {
          for (const tool of agent.tools) {
            const matchedRawTool = rawAgent.tools.find(
              (t: any) => t.id === tool.id,
            );
            tool.bodySchema = matchedRawTool.body_schema;
            tool.bodyParams = matchedRawTool.body_params;
            tool.queryParams = matchedRawTool.query_params;
            tool.pathParams = matchedRawTool.path_params;
            if (!!tool?.parameters) {
              tool.parameters = {
                type: 'object',
                properties: {
                  bodyParams: matchedRawTool.parameters.properties.body_params,
                  queryParams:
                    matchedRawTool.parameters.properties.query_params,
                  pathParams: matchedRawTool.parameters.properties.path_params,
                },
                required: ['bodyParams', 'queryParams', 'pathParams'],
              };
            }
          }
        }

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
          true,
          rawAgent?.schemas?.map((schema: any) => ({
            id: schema.id,
            schemas: schema.schemas.map((nodeSchema: any) => ({
              nodeName: nodeSchema.node_name,
              input: nodeSchema.schemas.input,
              output: nodeSchema.schemas.output,
            })),
          })) || [],
          rawAgent?.pgs_tools_descriptions?.map((ptd: any) => ({
            promptGroupId: ptd.prompt_group_id,
            nodeName: ptd.node_name,
            description: ptd.description,
          })) || [],
          agent.generalInstructions,
          agent.judgeInstructions,
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
  getTools(
    llmProvider: LLMProvider = LLMProvider.OPEN_AI,
    returnAllTools: boolean = false,
  ): any[] {
    if (!!this.oversizedResponseCache) {
      return this.getOversizedResponseTools(llmProvider);
    }

    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`provider (${llmProvider}) not found`);
    }
    const providerInstance = new provider(this);
    const tools = providerInstance.getTools(returnAllTools);

    // mainly for AWS Bedrock resource ID conventions
    this.originalToolNamesReMapping = {
      ...(this.originalToolNamesReMapping || {}),
      ...(providerInstance.originalToolNamesReMapping || {}),
    };

    return tools;
  }

  protected getOversizedResponseTools(
    llmProvider: LLMProvider = LLMProvider.OPEN_AI,
  ): any[] {
    const tools: any[] = OVERSIZED_RESPONSE_TOOLS;

    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`provider (${llmProvider}) not found`);
    }
    const providerInstance = new provider(this);

    return providerInstance.postProcessTools(tools);
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
  public runTool(tool: ToolCall, payloadExtension?: any): ToolCallResult {
    if (OVERSIZED_RESPONSE_TOOL_NAMES.includes(tool.name)) {
      return this.runOversizedResponseTool(tool);
    }

    let clonedTool = ToolCall.fromObject(tool.toDict());
    let toolCallResult = ToolCallResult.fromObject({
      functionName: clonedTool.name,
      payload: ensureToolCallPayloadStructure(clonedTool?.payload || {}),
      toolCallId: clonedTool.toolCallId,
    });

    if (clonedTool.isPg) {
      // start session
      try {
        toolCallResult.result =
          this.promptGroupSessions.startPgSession(clonedTool);
        toolCallResult.isSuccess = true;
      } catch (err: any) {
        toolCallResult.isError = true;
        toolCallResult.result = `Error: ${err.toString()}`;
      }
      return toolCallResult;
    }

    if (clonedTool.type !== ToolCallType.XPANDER) {
      return toolCallResult;
    }

    // run tool
    try {
      if (payloadExtension && typeof payloadExtension === 'object') {
        if (!clonedTool.payload) {
          clonedTool.payload = {} as IToolCallPayload;
        }
        toolCallResult.payload = clonedTool.payload = mergeDeep(
          clonedTool.payload,
          payloadExtension,
        );
      }

      // append permanent values
      const schemasByNodeName = this.schemasByNodeName();
      const originalToolName =
        this.originalToolNamesReMapping?.[clonedTool.name] || clonedTool.name;

      const shouldEnforceSchema = !!schemasByNodeName?.[originalToolName];

      if (shouldEnforceSchema) {
        clonedTool = appendPermanentValues(
          ToolCall.fromObject({
            ...clonedTool.toDict(),
            name: originalToolName,
          }),
          schemasByNodeName,
        );
      }
      const executionResult = executeTool(
        ToolCall.fromObject({
          ...clonedTool,
          name: originalToolName,
        }),
        this.url,
        this.configuration,
        this.sourceNodeType,
      );
      toolCallResult.statusCode = executionResult.statusCode;
      toolCallResult.result = executionResult.data;
      if (!executionResult.isSuccess) {
        throw new Error(toolCallResult.result);
      }

      if (shouldEnforceSchema) {
        toolCallResult = appendPermanentValuesToResult(
          toolCallResult,
          schemasByNodeName,
        );
      }

      if (!!this.promptGroupSessions.activeSession) {
        this.promptGroupSessions.activeSession.lastNode = clonedTool.name;
      }

      const isOverSized = isOversizedToolResponse(toolCallResult.result);
      if (isOverSized) {
        this.oversizedResponseCache = toolCallResult.result;
        toolCallResult.result = `the output of tool ${toolCallResult.functionName} is too big (${JSON.stringify(toolCallResult.result).length} chars). you can: 1. get full response. 2. search in the response. 3. skip or continue`;
      }

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
  public runTools(
    toolCalls: ToolCall[],
    payloadExtension?: any,
  ): ToolCallResult[] {
    if (
      toolCalls.length === 0 &&
      !!this.promptGroupSessions.activeSession &&
      this.pgSwitchAllowed
    ) {
      this.promptGroupSessions.resetSessions();
    }
    return toolCalls.map((toolCall) =>
      this.runTool(toolCall, payloadExtension),
    );
  }

  /** Retrieves the type of source node for the agent. */
  public get sourceNodeType(): SourceNodeType {
    return this.sourceNodes[0].type || SourceNodeType.SDK;
  }

  // used in hybrid agents for cross instance messaging and clients
  public selectPromptGroup(promptGroupName: string): void {
    const pgTool = this.pgOas.find((pg) => pg.id === promptGroupName);
    if (!pgTool) {
      throw new Error(`Prompt group ${promptGroupName} not found`);
    }
    this.promptGroupSessions.startPgSession(
      ToolCall.fromObject({
        name: pgTool.id,
      }),
    );
  }

  /**
   * Retrieves schemas grouped by node name based on the active prompt group session.
   *
   * This method returns an object where each key is a node name, and the value is the corresponding schema.
   * It ensures that schemas are only fetched if there is an active session with a valid `promptGroupId`
   * and if `pgSchemas` is not empty.
   *
   * @returns {Record<string, INodeSchema>} A record of schemas indexed by their node name, or an empty object if conditions are not met.
   */
  public schemasByNodeName(): Record<string, INodeSchema> {
    if (
      !!this?.promptGroupSessions?.activeSession?.pg?.promptGroupId &&
      this?.pgSchemas?.length !== 0
    ) {
      const schemasByNodeName =
        this.pgSchemas
          .find(
            (schema) =>
              schema.id ===
              this.promptGroupSessions.activeSession.pg.promptGroupId,
          )
          ?.schemas.reduce(
            (all, item) => {
              all[item.nodeName] = item;
              return all;
            },
            {} as Record<string, INodeSchema>,
          ) || {};

      return schemasByNodeName;
    }
    return {};
  }

  protected runOversizedResponseTool(tool: ToolCall): ToolCallResult {
    let clonedTool = ToolCall.fromObject(tool.toDict());
    let toolCallResult = ToolCallResult.fromObject({
      functionName: clonedTool.name,
      payload: ensureToolCallPayloadStructure(clonedTool?.payload || {}),
      toolCallId: clonedTool.toolCallId,
    });

    switch (tool.name) {
      case OverSizedResponseTool.GetFullResponse: {
        toolCallResult.result = this.oversizedResponseCache;
        this.oversizedResponseCache = null;
        return toolCallResult;
      }
      case OverSizedResponseTool.SkipOrContinue: {
        toolCallResult.result = 'skipped';
        this.oversizedResponseCache = null;
        return toolCallResult;
      }
      case OverSizedResponseTool.SearchInTheResponse: {
        toolCallResult.result = vectorSearchWithBubble(
          JSON.stringify(this.oversizedResponseCache),
          tool.payload.bodyParams.phrase,
          1000,
        );
        return toolCallResult;
      }
    }

    return toolCallResult;
  }
}
