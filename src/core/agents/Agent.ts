import request, { HttpVerb } from 'sync-request';
import { LLMProvider } from '../../constants/llmProvider';
import { AGENT_FINISH_TOOL_ID, LOCAL_TOOL_PREFIX } from '../../constants/tools';
import { allProviders } from '../../llmProviders';
import {
  ExecutionStatus,
  ILocalTool,
  IToolCallPayload,
  KnowledgeBaseStrategy,
  ToolCallType,
} from '../../types';
import {
  AgentStatus,
  IAgentTool,
  ISourceNode,
  SourceNodeType,
  AgentAccessScope,
  AgentGraphItemSubType,
  AgentDelegationType,
  AgentGraphItemType,
  AgentDelegationEndStrategy,
} from '../../types/agents';
import { IMemoryMessage, MemoryStrategy, MemoryType } from '../../types/memory';
import { Base } from '../base';
import CacheService from '../CacheService';
import { Configuration } from '../Configuration';
import { Tokens } from '../executions';
import { Execution } from '../executions/Execution';
import { Graph, GraphItem } from '../graphs';
import { KnowledgeBase } from '../knowledgeBases';
import { Memory, MemoryThread } from '../memory';
import { ExecutionMetrics, LLMMetrics } from '../metrics';
import { AgenticInterface, AgenticOperation } from '../tools';
import { ToolCall, ToolCallResult } from '../tools/ToolCall';
import {
  appendPermanentValues,
  appendPermanentValuesToResult,
  ensureToolCallPayloadStructure,
  executeTool,
  generateToolCallId,
  getSubAgentIdFromOASByName,
  getSubAgentNameFromOAS,
  mergeDeep,
  testToolGraphPosition,
} from '../tools/utils';
import { UserDetails } from '../UserDetails';
import {
  convertKeysToCamelCase,
  generateUUIDv4,
  getInstructionsFromLocalFile,
} from '../utils';
import { XpanderClient } from '../XpanderClient';
import { AgentInstructions } from './AgentInstructions';

/**
 * Represents an agent in xpanderAI, managing tools, sessions, and operational workflows.
 * This class facilitates loading agents, handling tool executions, and managing prompt groups.
 */
export class Agent extends Base {
  public static getById(
    configuration: Configuration,
    agentId: string,
    version?: number,
  ): Agent {
    const agent = new Agent(
      configuration,
      agentId,
      '',
      '',
      AgentStatus.ACTIVE,
      AgentDelegationType.ROUTER,
      AgentDelegationEndStrategy.RETURN_TO_START,
      MemoryType.SHORT_TERM,
      MemoryStrategy.FULL,
      new AgentInstructions(),
      AgentAccessScope.ORGANIZATIONAL,
      [],
      [],
      [],
      [],
      [],
      null,
      version,
    );
    agent.load();
    return agent;
  }

  /** Indicates if the agent is ready and tools are loaded. */
  ready: boolean = false;

  /** Collection of local tools specific to this agent. */
  localTools: ILocalTool[] = [];

  public execution?: Execution;
  public userDetails?: UserDetails;
  public executionMemory?: Memory;
  private shouldStop: boolean = false;
  private hitlIsRunning: boolean = false;
  private isLocalRun: boolean = false;
  private withAgentEndTool: boolean = true;
  public graph: Graph;
  public llmProvider: LLMProvider = LLMProvider.OPEN_AI;

  /** Maps original tool names to renamed versions for consistency. */
  protected originalToolNamesReMapping: Record<string, string> = {};

  /**
   * Constructs a new Agent instance.
   *
   * @param configuration - Configuration settings for the agent.
   * @param id - Unique identifier for the agent.
   * @param name - Human-readable name of the agent.
   * @param organizationId - Organization ID to which the agent belongs.
   * @param status - Current status of the agent.
   * @param delegationType - The agent's delegation type (Router/Sequence).
   * @param memoryType - Type of memory the agent utilizes.
   * @param memoryStrategy - Strategy for memory management.
   * @param instructions - Instructions for the agent's operation.
   * @param accessScope - Scope of the agent's access permissions.
   * @param sourceNodes - Source nodes associated with the agent.
   * @param prompts - Prompts used by the agent.
   * @param tools - Tools available to the agent.
   * @param graph - Graph structure representing the agent's operational flow.
   * @param knowledgeBases - Knowledge bases associated with the agent.
   */
  constructor(
    public configuration: Configuration,
    public id: string,
    public name: string,
    public organizationId: string,
    public status: AgentStatus,
    public delegationType: AgentDelegationType,
    public delegationEndStrategy: AgentDelegationEndStrategy,
    public memoryType: MemoryType,
    public memoryStrategy: MemoryStrategy,
    public instructions: AgentInstructions,
    public accessScope: AgentAccessScope,
    public sourceNodes: ISourceNode[],
    public prompts: string[],
    public tools: IAgentTool[] = [],
    private _graph: any[] = [],
    public knowledgeBases: KnowledgeBase[] = [],
    public oas: any = null,
    public version: any = null,
  ) {
    super();
    if (this.tools.length !== 0) {
      this.ready = true;
    }
    if (!this.ready) {
      this.load();
    }
    this.graph = new Graph(this, this._graph);
  }

  public selectLLMProvider(llmProvider: LLMProvider) {
    this.llmProvider = llmProvider;
  }

  /**
   * Extracts tool calls from an LLM response based on the specified LLM provider.
   * @param llmResponse - The LLM response to analyze for tool calls.
   * @returns An array of tool calls extracted from the LLM response.
   * @throws Error if the specified LLM provider is not supported.
   */
  public extractToolCalls(llmResponse: any) {
    return XpanderClient.extractToolCalls(llmResponse, this.llmProvider);
  }

  /**
   * Filters and retrieves local tool calls from a given list of tool calls.
   * @param toolCalls - The list of tool calls to filter.
   * @returns An array of tool calls that are of type LOCAL.
   */
  public retrievePendingLocalToolCalls(toolCalls: ToolCall[]): ToolCall[] {
    return XpanderClient.retrievePendingLocalToolCalls(toolCalls);
  }

  /** Loads the agent data from its source node type. */
  load(
    agentId: string = '',
    ignoreCache: boolean = false,
    rawAgentData?: any,
  ): void {
    if (this.ready && !agentId) return;

    console.debug(`loading agent ${this.id}`);

    // keep local tools
    const localTools = JSON.parse(JSON.stringify(this.localTools));
    const shouldKeepLocalTools = this.id === agentId;

    try {
      const cache = CacheService.getInstance();
      let cacheKey = this.id;
      if (this.version) {
        cacheKey += `_v${this.version}`;
      }
      const cachedAgent = cache.get(cacheKey);

      let rawAgent: any;
      if (cachedAgent && !ignoreCache) {
        console.debug('Agent loaded from cache');
        rawAgent = cachedAgent;
      } else {
        if (rawAgentData) {
          rawAgent = rawAgentData;
        } else {
          const headers: any = { 'x-api-key': this.configuration.apiKey };
          if (this.version && Number(this.version) >= 2) {
            headers['x-agent-version'] = this.version;
          }
          const response = request('GET', this.url, {
            headers,
          });

          if (!response.statusCode.toString().startsWith('2')) {
            throw new Error(response.body.toString());
          }

          rawAgent = JSON.parse(response.getBody('utf8'));
          cache.set(cacheKey, rawAgent);
        }
      }

      const agent = convertKeysToCamelCase(rawAgent);

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
                queryParams: matchedRawTool.parameters.properties.query_params,
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
        agent.name,
        agent.organizationId,
        agent.status,
        agent.delegationType,
        agent.delegationEndStrategy,
        agent.memoryType,
        agent.memoryStrategy,
        AgentInstructions.fromObject(agent.instructions),
        agent.accessScope,
        agent.sourceNodes,
        agent.prompts,
        agent.tools,
        agent.graph
          .map((gi: any, idx: number) => ({
            ...gi,
            settings: rawAgent.graph[idx].settings,
          }))
          .map(
            (gi: any) =>
              new GraphItem(
                this,
                gi.id,
                gi.itemId,
                gi.name,
                gi.type,
                gi.subType === AgentGraphItemSubType.LOCAL_TOOL,
                gi.targets,
                gi.settings,
              ),
          ),
        agent.knowledgeBases,
        rawAgent.oas,
        agent.version,
      );
      if (agent?.knowledgeBases && agent.knowledgeBases.length !== 0) {
        loadedAgent.knowledgeBases = KnowledgeBase.loadByAgent(loadedAgent);
      }
      Object.assign(this, loadedAgent);
      if (shouldKeepLocalTools) {
        this.localTools = localTools;
      }

      // assign local instructions
      const localInstruction = getInstructionsFromLocalFile();
      if (localInstruction) {
        this.instructions = localInstruction;
      }
    } catch (err) {
      throw new Error('Failed to load agent');
    }
  }

  /**
   * Retrieves tools compatible with a specified LLM provider.
   *
   * @param llmProvider - The LLM provider to filter tools by (default: `OPEN_AI`).
   * @returns A list of tools matching the specified provider.
   */
  getTools(llmProvider: LLMProvider = this.llmProvider): any[] {
    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`Provider (${llmProvider}) not found`);
    }
    const providerInstance = new provider(this);
    const tools = providerInstance.getTools(this.withAgentEndTool);

    this.originalToolNamesReMapping = {
      ...(this.originalToolNamesReMapping || {}),
      ...(providerInstance.originalToolNamesReMapping || {}),
    };

    return tools;
  }

  /**
   * Adds messages to the memory thread.
   * Converts non-standard messages to a compatible format before storing.
   *
   * @param messages - An array of messages to be added to the memory thread.
   */
  public addMessages(messages: any): void {
    // in case of openai gemini - ensure tool call id exists + content
    if (Array.isArray(messages?.choices) && messages.created) {
      let fixed = false;
      for (const { message } of messages.choices) {
        if (
          Array.isArray(message?.tool_calls) &&
          message?.tool_calls?.length !== 0
        ) {
          for (const tc of message.tool_calls) {
            if (!tc.id || tc.id === '') {
              fixed = true;
              tc.id = generateToolCallId();
              if (!message.content) {
                message.content = `Calling ${tc.function.name}`;
              } else {
                message.content += ` + Calling ${tc.function.name}`;
              }
            }
          }
        }
      }
      if (fixed) {
        CacheService.getInstance().set(
          `llmResponse_${messages.created}`,
          messages,
        );
      }
    }
    // amazon bedrock converse messaging api
    if (!!messages?.output?.message) {
      const bedrockResponseMessage: any = messages.output.message;
      const xpanderMessages: IMemoryMessage[] = [];
      const msg: IMemoryMessage = {
        role: bedrockResponseMessage.role,
        content: '',
      };

      for (const content of bedrockResponseMessage.content) {
        if (!!content?.toolUse) {
          const { toolUse } = content;
          msg.toolCalls = [
            {
              toolCallId: toolUse.toolUseId,
              name: toolUse.name,
              payload: JSON.stringify(toolUse.input),
            },
          ];
        }
        if (!!content?.text) {
          msg.content = content.text;
        }
      }
      if (msg?.content || msg.toolCalls) {
        xpanderMessages.push(msg);
      }

      return this.memory.addMessages(xpanderMessages);
    }
    return this.memory.addMessages(messages);
  }

  /**
   * Adds tool call results as messages to the memory thread.
   *
   * @param toolCallResults - An array of tool call results to be added as messages.
   */
  public addToolCallResults(toolCallResults: ToolCallResult[]): void {
    return this.memory.addToolCallResults(toolCallResults);
  }

  /**
   * Retrieves list of messages.
   *
   * @returns A list of messages according to the agent's llm provider.
   */
  public get messages() {
    return this.memory.retrieveMessages();
  }

  /**
   * Gets the tool choice mode.
   * @returns {'required' | 'auto'} Returns 'required' if `withAgentEndTool` is true, otherwise 'auto'.
   */
  public get toolChoice(): 'required' | 'auto' {
    return this.withAgentEndTool ||
      this.delegationType === AgentDelegationType.SEQUENCE
      ? 'required'
      : 'auto';
  }

  /** Constructs the API URL for this agent. */
  public get url(): string {
    return `${this.configuration.url}/agents/${this.id}`;
  }

  /**
   * Adds local tools to the agent with prefixed function names.
   *
   * @param tools - The list of local tools to add.
   */
  public addLocalTools(tools: any[] | ILocalTool[]): void {
    this.localTools = [];
    let hasChanges = false;
    for (const tool of tools) {
      const localTool = {
        ...tool,
        function: {
          ...tool.function,
          name: `${LOCAL_TOOL_PREFIX}${tool.function.name}`,
        },
      };
      this.localTools.push(localTool);

      // graph attach
      const isAlreadyOnGraph =
        this.graph.findNodeByItemId(localTool.function.name) ||
        this.graph.findNodeByName(localTool.function.name);

      if (!isAlreadyOnGraph) {
        hasChanges = true;
        this.graph.addNode(
          new GraphItem(
            this,
            '',
            localTool.function.name,
            tool.function.name,
            AgentGraphItemType.TOOL,
            true,
          ),
        );
      }
    }
    if (hasChanges) {
      this.sync(); // deploy
    }
  }

  /** Checks if the agent has local tools loaded. */
  public get hasLocalTools(): boolean {
    return this.localTools.length !== 0;
  }

  /** Checks if the agent has mcp servers attached. */
  public get hasMCPServers(): boolean {
    return this.graph.mcpNodes.length !== 0;
  }

  private toolCallActionCounterKey() {
    return `executions_api_call_counter_${this.execution?.parentExecution || this?.execution?.id}`;
  }

  /**
   * Executes a single tool call and returns the result.
   *
   * @param tool - The tool call to execute.
   * @param payloadExtension - Additional payload data to merge.
   * @returns The result of the tool execution.
   */
  public runTool(
    tool: ToolCall,
    payloadExtension: any = {},
    isMultiple: boolean = false,
  ): ToolCallResult {
    if (!this.execution) {
      throw new Error('Agent cannot run tool without execution');
    }

    console.debug(
      `running tool ${tool.name} on agent ${this.id} with execution ${this.execution.id}`,
    );

    // increase execution tool actions audit
    const cache = CacheService.getInstance();
    const actions = (cache.get(this.toolCallActionCounterKey()) as any[]) || [];
    actions.push(tool.toDict());
    cache.set(this.toolCallActionCounterKey(), actions);

    // append execution id
    if (!payloadExtension?.headers) {
      payloadExtension.headers = {};
    }
    payloadExtension.headers['x-xpander-execution-id'] = this.execution.id;

    let clonedTool = ToolCall.fromObject(tool.toDict());
    let toolCallResult = ToolCallResult.fromObject({
      functionName: clonedTool.name,
      payload: ensureToolCallPayloadStructure(
        clonedTool.type === ToolCallType.LOCAL,
        clonedTool?.payload || {},
      ),
      toolCallId: clonedTool.toolCallId,
    });

    if (clonedTool.type !== ToolCallType.XPANDER) {
      // in case of local tool check HEAD to approve graph position
      const canProceed = testToolGraphPosition(
        ToolCall.fromObject({
          ...clonedTool,
        }),
        this.url,
        this.configuration,
        this.execution.id,
      );
      toolCallResult.graphApproved = tool.graphApproved = canProceed;
      toolCallResult.isLocal = true;

      return toolCallResult;
    }

    let hasOutputSchema = false;
    try {
      const originalToolName =
        this.originalToolNamesReMapping?.[clonedTool.name] || clonedTool.name;

      const graphItem = this.retrieveNodeFromGraph(originalToolName);
      hasOutputSchema = !!graphItem?.settings?.schemas?.output; // in case we have output schema, let the sdk to report tool call result
      if (graphItem?.settings?.schemas) {
        clonedTool = appendPermanentValues(
          ToolCall.fromObject({
            ...clonedTool.toDict(),
            name: originalToolName,
          }),
          graphItem.settings?.schemas,
        );
      }

      if (payloadExtension && typeof payloadExtension === 'object') {
        if (!clonedTool.payload) {
          clonedTool.payload = {} as IToolCallPayload;
        }
        toolCallResult.payload = clonedTool.payload = mergeDeep(
          clonedTool.payload,
          payloadExtension,
        );
      }

      // Query params manual fix for arrays
      if (
        clonedTool?.payload?.queryParams &&
        Object.keys(clonedTool.payload.queryParams).length !== 0
      ) {
        for (const k in clonedTool.payload.queryParams) {
          if (
            k in clonedTool.payload.queryParams &&
            Array.isArray(clonedTool.payload.queryParams[k])
          ) {
            clonedTool.payload.queryParams[`${k}[]`] =
              clonedTool.payload.queryParams[k];
            clonedTool.payload.queryParams[k] = undefined;
            delete clonedTool.payload.queryParams[k];
          }
        }
      }

      const executionResult = executeTool(
        ToolCall.fromObject({
          ...clonedTool,
          name: originalToolName,
        }),
        this.url,
        this.configuration,
        this.execution.id,
        isMultiple,
        hasOutputSchema,
        this.version,
      );

      toolCallResult.statusCode = executionResult.statusCode;
      toolCallResult.result = executionResult.data;

      // backend asked to stop the execution
      if (
        executionResult?.headers?.['xpander-agent-stop'] === 'true' &&
        this.withAgentEndTool
      ) {
        this.shouldStop = true;
      }

      // is human-in-the-loop running
      if (
        executionResult?.headers?.['xpander-agent-hitl'] === 'true' &&
        this.withAgentEndTool
      ) {
        this.hitlIsRunning = true;
        this.shouldStop = true;
      }

      if (!executionResult.isSuccess) {
        throw new Error(toolCallResult.result);
      }

      if (graphItem?.settings?.schemas) {
        toolCallResult = appendPermanentValuesToResult(
          toolCallResult,
          graphItem.settings?.schemas,
        );
      }

      toolCallResult.isSuccess = true;
    } catch (err: any) {
      toolCallResult.isError = true;
      toolCallResult.result = `Error: ${err.toString()}`;
    } finally {
      if (hasOutputSchema) {
        this.memory.addToolCallResults([toolCallResult]);
      }
    }

    return toolCallResult;
  }

  /**
   * Executes multiple tool calls sequentially and returns their results.
   *
   * @param toolCalls - The list of tool calls to execute.
   * @param payloadExtension - Additional payload data to merge.
   * @returns A list of results for each tool execution.
   */
  public runTools(
    toolCalls: ToolCall[],
    payloadExtension: any = {},
  ): ToolCallResult[] {
    // kb before other tools
    const kbToolCalls = toolCalls.filter((tc) => tc.name.startsWith('xpkb'));

    // no kb
    const nonKbToolCalls = toolCalls.filter(
      (tc) => !tc.name.startsWith('xpkb'),
    );

    const result: ToolCallResult[] = [];

    // kb and cloud tool calls
    for (const toolCall of [...kbToolCalls, ...nonKbToolCalls]) {
      result.push(
        this.runTool(toolCall, payloadExtension, toolCalls.length > 1),
      );
    }

    // do not return local tools, we need to call the run tools to enforce graph (HEAD request)
    return result.filter((res) => !res.isLocal);
  }

  /** Retrieves the type of source node for the agent. */
  public get sourceNodeType(): SourceNodeType {
    return this.sourceNodes[0].type || SourceNodeType.SDK;
  }

  /**
   * Retrieves a node from the graph by its ID.
   *
   * @param itemId - The ID of the graph node to retrieve.
   * @returns The matching graph node, or undefined if not found.
   */
  public retrieveNodeFromGraph(itemId: string): GraphItem | undefined {
    return this.graph.findNodeByItemId(itemId);
  }

  /**
   * Initializes the task execution for the agent.
   *
   * @param execution - The execution details.
   */
  public initTask(execution: any): void {
    const camelCasedExecution = convertKeysToCamelCase(execution);
    this.shouldStop = false;
    this.hitlIsRunning = false;
    this.execution = new Execution(
      camelCasedExecution.id,
      camelCasedExecution.agentId,
      camelCasedExecution.organizationId,
      camelCasedExecution.input,
      camelCasedExecution.status,
      camelCasedExecution.lastExecutedNodeId,
      camelCasedExecution.memoryThreadId,
      camelCasedExecution.parentExecution,
      camelCasedExecution.workerId,
      camelCasedExecution.result,
      camelCasedExecution.llmTokens,
    );
  }

  /**
   * Updates the user details for the agent.
   *
   * @param userDetails - The user details to update.
   */
  public updateUserDetails(userDetails: UserDetails): void {
    this.userDetails = userDetails;
  }

  /**
   * Retrieves the list of memory threads for the current user.
   *
   * @returns {MemoryThread[]} An array of memory threads associated with the user.
   * @throws {Error} If user details are missing, instructing to update user details first.
   */
  public retrieveThreadsList(): MemoryThread[] {
    if (!this.userDetails) {
      throw new Error(
        'User details required for listing threads. Use agent.update_user_details first (user must have an ID).',
      );
    }
    return Memory.fetchUserThreads(this);
  }

  /** Retrieves the vanilla knowledge bases of the agent. */
  public get vanillaKnowledgeBases(): KnowledgeBase[] {
    return this.knowledgeBases.filter(
      (kb) => kb.strategy === KnowledgeBaseStrategy.VANILLA,
    );
  }

  /** Retrieves the memory instance for the agent. */
  public get memory(): Memory {
    if (!this.executionMemory) {
      // create thread
      this.executionMemory = this.initializeMemory();

      // set initial messages
      this.executionMemory.initMessages(
        this.execution?.inputMessage as IMemoryMessage,
        this.instructions,
        undefined,
        this.execution?.input?.files || [],
      );
    } else if (
      !!this?.executionMemory &&
      (this.executionMemory.messages.length === 0 ||
        !this.executionMemory.messages.some((msg) => msg.role === 'system'))
    ) {
      this.executionMemory.initInstructions(this.instructions);
    }

    this.executionMemory.llmProvider = this.llmProvider;

    return this.executionMemory as Memory;
  }

  /** Initializes the memory instance for the agent. */
  private initializeMemory(): Memory {
    if (!this.execution) {
      throw new Error('Execution is not initialized');
    }

    if (!this.execution.memoryThreadId) {
      const memory = Memory.create(this, this.userDetails, {
        agent_id: this.id,
      });
      this.execution.from(
        Execution.update(this, this.execution.id, {
          memory_thread_id: memory.id,
        }),
      );
      return memory;
    } else {
      return Memory.fetch(this, this.execution.memoryThreadId);
    }
  }

  private get isAwaitingHITL() {
    return (
      this?.messages?.[this?.messages?.length - 1]?.content?.includes(
        'waiting for a human approval',
      ) && this?.messages?.[this?.messages?.length - 1]?.length < 1000
    );
  }

  public isFinished(): boolean {
    let shouldStopByHITL = false;
    let shouldStop = false;
    let shouldStopBySequence = false;

    if (this.isAwaitingHITL && !!this.execution?.id && !this.hitlIsRunning) {
      Execution.update(this, this.execution.id, {
        result: "The agent's execution is still pending approval.",
        status: ExecutionStatus.COMPLETED,
      });
      return true;
    }

    if (this.hitlIsRunning) {
      console.debug(
        `Agent ${this.id} with execution ${this.execution?.id} stopped due to HITL`,
      );
      shouldStopByHITL = true;
    }
    // get pending execution in hitl to continue local execution
    if (shouldStopByHITL) {
      return true;
    }

    if (this.shouldStop) {
      shouldStop = true;
    } else {
      // sequence delegation manager agent handling
      if (
        this.delegationType === AgentDelegationType.SEQUENCE &&
        !!this?.graph?.rootNode?.itemId &&
        !!this.execution?.id
      ) {
        // is finished by xpfinish?
        if (
          this?.messages?.[this?.messages?.length - 2]?.tool_calls?.[0]
            ?.function?.name === AGENT_FINISH_TOOL_ID
        ) {
          return true;
        }

        // is first iteration?
        if (!this.execution.lastExecutedNodeId) {
          // load root agent (1st agent on graph sequence)
          const firstAgent = Agent.getById(
            this.configuration,
            this.graph.rootNode.itemId,
          );
          console.debug(
            `sequence switching from agent ${this.id} to ${firstAgent.id} (first)`,
          );
          // create sub execution for the manager (will automatically update the parent execution with the newly created execution)
          Execution.create(
            firstAgent,
            this.execution.input.text || '',
            this.execution.input.files || [],
            this.execution.workerId,
            undefined, // TODO delegation memory strategy
            this.execution.id,
            getSubAgentNameFromOAS(firstAgent.id, this.oas),
          );

          // stop the current agent (stack)
          shouldStop = shouldStopBySequence = true;
        } else {
          // N agent
          const tools = this.getTools();
          if (tools.length > 1) {
            return true; // STOP - ERROR???
          }
          if (tools?.[0]?.function?.name === AGENT_FINISH_TOOL_ID) {
            return false;
          }
          const agentId = getSubAgentIdFromOASByName(
            tools[0].function.name,
            this.oas,
          );
          if (!agentId) {
            return true; // STOP
          }
          // load the next agent (N agent on graph sequence)
          const nextAgent = Agent.getById(this.configuration, agentId);
          console.debug(
            `sequence switching from agent ${this.id} to ${nextAgent.id}`,
          );
          // create sub execution for the manager (will automatically update the parent execution with the newly created execution)
          Execution.create(
            nextAgent,
            `${this.execution.input.text}\n${this.messages[this.messages.length - 1].content}` ||
              '',
            this.execution.input.files || [],
            this.execution.workerId,
            undefined, // TODO delegation memory strategy
            this.execution.id,
            getSubAgentNameFromOAS(nextAgent.id, this.oas),
          );

          // stop the current agent (stack)
          shouldStop = shouldStopBySequence = true;
        }
      }

      if (!shouldStopBySequence) {
        if (!this.memory) {
          shouldStop = false;
        } else {
          shouldStop = this.memory.messages.some((msg) =>
            msg.toolCalls?.some((tc) => tc.name === AGENT_FINISH_TOOL_ID),
          );
        }
      }
    }

    // check if has sub executions
    if (shouldStop && this.isLocalRun && this?.execution?.workerId) {
      const pendingExecution: Execution = Execution.retrievePendingExecution(
        this,
        this.execution.workerId,
      );
      if (pendingExecution) {
        this.switchExecution(pendingExecution);
        shouldStop = false;
      } else if (this.execution.parentExecution) {
        // fetch execution result
        console.debug(
          `switching from execution ${this.execution.id} to parent execution ${this.execution.parentExecution}`,
        );
        const agentId = this.execution.agentId;
        this.execution = Execution.fetch(this, this.execution.parentExecution);
        shouldStop = false;

        if (!!this.execution?.agentId) {
          // handle finish with last (sequence)
          const parentAgent = Agent.getById(
            this.configuration,
            this.execution?.agentId,
            this.execution?.agentVersion,
          );
          if (
            !!parentAgent &&
            parentAgent?.delegationType === AgentDelegationType.SEQUENCE &&
            parentAgent?.delegationEndStrategy ===
              AgentDelegationEndStrategy.FINISH_WITH_LAST
          ) {
            // this is last? stop
            if (parentAgent.graph.lastNodeInSequence?.itemId === agentId) {
              return true;
            }
          }
        }
      }
    }

    // in case of sequence switch to next agent
    if (
      this.delegationType === AgentDelegationType.SEQUENCE &&
      !!this.execution?.lastExecutedNodeId &&
      this?.messages?.[this?.messages?.length - 2]?.tool_calls?.[0]?.function
        ?.name !== AGENT_FINISH_TOOL_ID
    ) {
      return this.isFinished();
    }

    return shouldStop;
  }

  private switchExecution(
    pendingExecution: Execution,
    allowSameAgentSwitch: boolean = false,
  ) {
    if (!!this?.execution?.id) {
      console.debug(
        `switching from execution ${this.execution.id} to ${pendingExecution.id}`,
      );
      const isDifferentAgent = this.id !== pendingExecution.agentId;
      // re-load agent if needed (switch agent)
      if (isDifferentAgent || allowSameAgentSwitch) {
        this.id = pendingExecution.agentId;

        const withAgentEndTool = this.withAgentEndTool;
        const localTools = this.localTools;

        this.version = null;
        this.load(pendingExecution.agentId);

        // preserve agent end tool state
        if (!withAgentEndTool) {
          this.disableAgentEndTool();
        }
        // preserve local tools
        if (localTools && localTools.length !== 0) {
          this.localTools = localTools;
        }

        this.isLocalRun = true;

        // different agent? new task
        if (isDifferentAgent) {
          this.initTask(pendingExecution);

          // reload memory
          this.executionMemory = this.initializeMemory();
          this.memory.initMessages(
            this.execution?.inputMessage as IMemoryMessage,
            this.instructions,
            undefined,
            this.execution?.input?.files || [],
          );
        }
      }
    }
  }

  public addTask(
    input: string = '',
    threadId: string | undefined = undefined,
    files: string[] = [],
    useWorker: boolean = false,
  ): Execution {
    const localWorkerId = !useWorker ? generateUUIDv4() : undefined;
    const execution = Execution.create(
      this,
      input,
      files,
      localWorkerId,
      threadId,
      undefined,
      undefined,
      this.version,
    );
    this.initTask(execution);
    this.isLocalRun = true;
    return execution;
  }

  public stop() {
    this.shouldStop = true;
  }

  public disableAgentEndTool(): void {
    this.withAgentEndTool = false;
  }

  public enableAgentEndTool(): void {
    this.withAgentEndTool = true;
  }

  public retrieveExecutionResult(): Execution {
    if (!this?.execution?.id) {
      throw new Error('Execution is missing!');
    }

    const pollInterval = 2000; // 2 seconds
    const timeout = 30000; // 30 seconds
    const startTime = Date.now();
    let latestExecution: Execution = this.execution;

    while (Date.now() - startTime < timeout) {
      latestExecution = Execution.fetch(this, this.execution.id); // Synchronous call

      if (
        [
          ExecutionStatus.COMPLETED,
          ExecutionStatus.ERROR,
          ExecutionStatus.PAUSED,
        ].includes(latestExecution.status)
      ) {
        return latestExecution; // Return immediately if status is terminal
      }

      // Sleep synchronously for the poll interval
      const now = Date.now();
      while (Date.now() - now < pollInterval) {
        // Busy wait to simulate synchronous sleep
      }
    }

    // Return the latest execution if timeout occurs
    return latestExecution;
  }

  /**
   * @function update
   * @description Updates the agent with the current instance's properties.
   * @returns {Agent} The updated agent's details.
   * @throws {Error} If the update process fails.
   * @memberof xpanderAI
   */
  public update(): Agent {
    try {
      const url = `${this.configuration.url}/agents-crud/tools/crud/update`;
      const response = request('PATCH' as HttpVerb, url, {
        json: {
          agent_id: this.id,
          name: this.name,
          instructions: this.instructions,
        },
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      CacheService.getInstance().delete(this.id);
      this.load(this.id);
      return this;
    } catch (err) {
      throw new Error('Failed to update agent');
    }
  }

  /**
   * @function sync
   * @description Syncs and deploys the agent along with its related assets.
   * @returns {Agent} The deployed agent's details.
   * @throws {Error} If the sync process fails.
   * @memberof xpanderAI
   */
  public sync(): Agent {
    try {
      const url = `${this.configuration.url}/agents-crud/tools/crud/deploy`;
      const response = request('PUT' as HttpVerb, url, {
        json: { agent_id: this.id },
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const rawResponse = convertKeysToCamelCase(
        JSON.parse(response.getBody('utf8')),
      );

      CacheService.getInstance().delete(this.id);
      this.load(this.id, true, rawResponse);
      return this;
    } catch (err) {
      throw new Error('Failed to sync agent');
    }
  }

  /**
   * Retrieves a list of available agentic interfaces.
   *
   * @param {boolean} [ignore_cache=false] - Whether to ignore cached data and fetch fresh data.
   * @returns {AgenticInterface[]} A list of agentic interfaces.
   * @throws {Error} If retrieval fails.
   *
   * @memberof xpander.ai
   */
  public retrieveAgenticInterfaces(
    ignore_cache: boolean = false,
  ): AgenticInterface[] {
    const agenticInterfaces: AgenticInterface[] = [];
    const cacheService = CacheService.getInstance();
    const cacheKey = 'organization_interfaces';

    // Get from cache if not ignored
    if (!ignore_cache) {
      const cachedInterfaces = cacheService.get(cacheKey);
      if (cachedInterfaces) {
        return cachedInterfaces as AgenticInterface[];
      }
    }

    try {
      const url = `${this.configuration.url}/agents-crud/tools/agent_tools/search-interfaces`;
      const response = request('POST' as HttpVerb, url, {
        json: {
          search_phrase: '',
          list_mode: true,
        },
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const rawResponse = convertKeysToCamelCase(
        JSON.parse(response.getBody('utf8')),
      );

      agenticInterfaces.push(
        ...rawResponse.map(
          (agInterface: any) =>
            new AgenticInterface(
              agInterface.id,
              agInterface.name || agInterface.id,
              agInterface.summary || '',
              agInterface.description || '',
            ),
        ),
      );

      cacheService.set(cacheKey, agenticInterfaces);
    } catch (err) {
      throw new Error('Failed to retrieve available interfaces');
    }

    return agenticInterfaces;
  }

  /**
   * Retrieves a list of operations for a given agentic interface.
   *
   * @param {AgenticInterface} agenticInterface - The agentic interface to retrieve operations for.
   * @param {boolean} [ignore_cache=false] - Whether to ignore cached data and fetch fresh data.
   * @returns {AgenticOperation[]} A list of agentic operations.
   * @throws {Error} If retrieval fails.
   *
   * @memberof xpander.ai
   */
  public retrieveAgenticOperations(
    agenticInterface: AgenticInterface,
    ignore_cache: boolean = false,
  ): AgenticOperation[] {
    const agenticOperations: AgenticOperation[] = [];
    const cacheService = CacheService.getInstance();
    const cacheKey = `agentic_interface_${agenticInterface.id}_operations`;

    // Get from cache if not ignored
    if (!ignore_cache) {
      const cachedOperations = cacheService.get(cacheKey);
      if (cachedOperations) {
        return cachedOperations as AgenticOperation[];
      }
    }

    try {
      const url = `${this.configuration.url}/agents-crud/tools/agent_tools/search-operations`;
      const response = request('POST' as HttpVerb, url, {
        json: {
          interfaces: [
            {
              type: 'interface',
              asset_id: agenticInterface.id,
            },
          ],
          search_phrases: [],
          list_mode: true,
        },
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const rawResponse = convertKeysToCamelCase(
        JSON.parse(response.getBody('utf8')),
      );

      agenticOperations.push(
        ...rawResponse.map(
          (op: any) =>
            new AgenticOperation(
              op.id,
              op.name || op.id,
              op.summary || '',
              op.description || '',
              op.idToUseOnGraph,
              op.parentId,
              op.isFunction || false,
              op.method || '',
              op.path || '',
            ),
        ),
      );

      cacheService.set(cacheKey, agenticOperations);
    } catch (err) {
      throw new Error('Failed to retrieve interface operations');
    }

    return agenticOperations;
  }

  /**
   * Attaches a list of agentic operations to the agent.
   *
   * @param {AgenticOperation[]} operations - The list of agentic operations to attach.
   * @throws {Error} If the attachment process fails.
   *
   * @memberof xpander.ai
   */
  public attachOperations(operations: AgenticOperation[]): void {
    try {
      const agenticInterfaces = this.retrieveAgenticInterfaces();
      const tools: Record<string, string[]> = {};

      // Build the tools object
      for (const operation of operations) {
        const agenticInterface = agenticInterfaces.find(
          (agi) => agi.id === operation.interfaceId,
        );

        if (agenticInterface) {
          if (!(agenticInterface.id in tools)) {
            tools[agenticInterface.id] = [operation.id];
          } else {
            tools[agenticInterface.id].push(operation.id);
          }
        }
      }

      // Build the payload
      const payload: any = {
        agent_id: this.id,
        tools: Object.keys(tools).map((id) => ({
          id,
          operation_ids: tools[id],
        })),
      };

      // Attach to the agent
      const url = `${this.configuration.url}/agents-crud/tools/agent_tools/add`;
      const response = request('POST' as HttpVerb, url, {
        json: payload,
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }
    } catch (err) {
      throw new Error('Failed to attach operations to agent');
    }
  }

  public get endToolEnabled(): boolean {
    return this.withAgentEndTool;
  }

  public reportLlmUsage(
    llmResponse: any,
    llmInferenceDuration: number = 0,
    llmProvider: LLMProvider = LLMProvider.OPEN_AI,
    sourceNodeType: string = '',
  ) {
    const structIsValid =
      !!llmResponse?.usage?.completion_tokens &&
      !!llmResponse?.usage?.prompt_tokens &&
      !!llmResponse?.usage?.total_tokens;

    if (!structIsValid) {
      throw new Error(
        'llm response must include usage(dict with completion_tokens, prompt_tokens and total_tokens) e.g: {"usage":{"completion_tokens":10,"prompt_tokens":20,"total_tokens":30}}',
      );
    }
    try {
      const metrics = new LLMMetrics(
        sourceNodeType || this.sourceNodeType.toString().toLowerCase(),
        llmResponse?.choices?.[0]?.finish_reason || 'finish',
        llmProvider,
        llmResponse?.model || 'Unknown',
        llmInferenceDuration,
        llmResponse.usage.prompt_tokens,
        llmResponse.usage.completion_tokens,
        llmResponse.usage.total_tokens,
      );
      metrics.report(this, 'llm');
    } catch (err) {
      console.error(`failed to report llm `);
    }
  }

  public reportExecutionMetrics(
    llmTokens: Tokens,
    aiModel: string = 'Unknown',
    sourceNodeType: string = '',
  ) {
    try {
      const duration = 0;
      if (!!this.execution) {
        let triggeredBy = [];
        if (!!this?.userDetails) {
          if (
            !this.userDetails?.firstName &&
            !this.userDetails?.lastName &&
            !!this.userDetails?.email
          ) {
            triggeredBy.push(this.userDetails.email);
          } else if (!!this.userDetails?.firstName) {
            triggeredBy.push(this.userDetails.firstName);
            if (!!this.userDetails?.lastName) {
              triggeredBy.push(this.userDetails.lastName);
            }
          }
        }
        const cache = CacheService.getInstance();
        const metrics = new ExecutionMetrics(
          sourceNodeType || this.sourceNodeType.toString().toLowerCase(),
          this.execution.id,
          [],
          this.execution.memoryThreadId,
          this?.execution?.input?.text || '',
          triggeredBy.join(' ') || 'Unknown',
          [],
          this.execution.status,
          duration,
          aiModel,
          this.execution.workerId || '',
          '',
          (cache.get(this.toolCallActionCounterKey()) as any[]) || [],
          this.execution.result,
          llmTokens,
        );
        metrics.report(this, 'execution');
      }
    } catch (err) {
      console.error(`failed to report execution metrics `);
    }
  }

  /**
   * Stops execution and reports the final result to the controller via a tool call.
   *
   * @param {boolean} isSuccess - Indicates whether the execution was successful.
   * @param {string} [result=''] - Optional result string to return upon stopping.
   *
   * @returns {void}
   *
   * @remarks
   * This method generates a tool call payload with execution result and uses `AGENT_FINISH_TOOL_ID`
   * to notify the controller via both `addMessages` and `runTool`.
   * It uses `ToolCallType.XPANDER` to mark the tool call type for xpander.ai execution tracking.
   */
  public stopExecution(isSuccess: boolean, result: string = '') {
    this.shouldStop = true;
    const toolCallId = generateToolCallId();
    const payload = {
      bodyParams: { result, is_success: isSuccess },
      queryParams: {},
      pathParams: {},
    };

    const message: IMemoryMessage = {
      role: 'assistant',
      content: '',
      toolCalls: [
        {
          name: AGENT_FINISH_TOOL_ID,
          payload: JSON.stringify(payload),
          toolCallId: toolCallId,
        },
      ],
    };

    this.addMessages([message]);

    this.runTool(
      ToolCall.fromObject({
        name: AGENT_FINISH_TOOL_ID,
        type: ToolCallType.XPANDER,
        toolCallId,
        payload,
      }),
    );
  }
}
