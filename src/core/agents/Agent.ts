import request from 'sync-request';
import { LLMProvider } from '../../constants/llmProvider';
import { AGENT_FINISH_TOOL_ID, LOCAL_TOOL_PREFIX } from '../../constants/tools';
import { allProviders } from '../../llmProviders';
import {
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
  IAgentInstructions,
  AgentAccessScope,
  IAgentGraphItem,
} from '../../types/agents';
import {
  IMemoryMessage,
  IUserDetails,
  MemoryStrategy,
  MemoryType,
} from '../../types/memory';
import { Base } from '../base';
import { Configuration } from '../Configuration';
import { Execution } from '../executions/Execution';
import { KnowledgeBase } from '../knowledgeBases';
import { Memory } from '../memory';
import { ToolCall, ToolCallResult } from '../toolCalls';
import {
  appendPermanentValues,
  appendPermanentValuesToResult,
  ensureToolCallPayloadStructure,
  executeTool,
  mergeDeep,
} from '../tools';
import { convertKeysToCamelCase, generateUUIDv4 } from '../utils';

/**
 * Represents an agent in xpanderAI, managing tools, sessions, and operational workflows.
 * This class facilitates loading agents, handling tool executions, and managing prompt groups.
 */
export class Agent extends Base {
  /** Indicates if the agent is ready and tools are loaded. */
  ready: boolean = false;

  /** Collection of local tools specific to this agent. */
  localTools: ILocalTool[] = [];

  public execution?: Execution;
  public userDetails?: IUserDetails;
  public executionMemory?: Memory;
  private shouldStop: boolean = false;
  private isLocalRun: boolean = false;

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
    public memoryType: MemoryType,
    public memoryStrategy: MemoryStrategy,
    public instructions: IAgentInstructions,
    public accessScope: AgentAccessScope,
    public sourceNodes: ISourceNode[],
    public prompts: string[],
    public tools: IAgentTool[] = [],
    public graph: IAgentGraphItem[] = [],
    public knowledgeBases: KnowledgeBase[] = [],
  ) {
    super();
    if (this.tools.length !== 0) {
      this.ready = true;
    }
    if (!this.ready) {
      this.load();
    }
  }

  /** Loads the agent data from its source node type. */
  load(agentId?: string): void {
    if (this.ready && !agentId) return;

    console.debug(`loading agent ${this.id}`);

    try {
      const response = request('GET', this.url, {
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const rawAgent = JSON.parse(response.getBody('utf8'));
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
        agent.status,
        agent.organizationId,
        agent.memoryType,
        agent.memoryStrategy,
        agent.enrichedInstructions,
        agent.accessScope,
        agent.sourceNodes,
        agent.enrichedPrompts,
        agent.tools,
        agent.graph,
        agent.knowledgeBases,
      );
      if (agent?.knowledgeBases && agent.knowledgeBases.length !== 0) {
        loadedAgent.knowledgeBases = KnowledgeBase.loadByAgent(loadedAgent);
      }
      Object.assign(this, loadedAgent);
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
  getTools(llmProvider: LLMProvider = LLMProvider.OPEN_AI): any[] {
    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`Provider (${llmProvider}) not found`);
    }
    const providerInstance = new provider(this);
    const tools = providerInstance.getTools();

    this.originalToolNamesReMapping = {
      ...(this.originalToolNamesReMapping || {}),
      ...(providerInstance.originalToolNamesReMapping || {}),
    };

    return tools;
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
    this.localTools = tools.map((tool) => ({
      ...tool,
      function: {
        ...tool.function,
        name: `${LOCAL_TOOL_PREFIX}${tool.function.name}`,
      },
    }));
  }

  /** Checks if the agent has local tools loaded. */
  public get hasLocalTools(): boolean {
    return this.localTools.length !== 0;
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

    // append execution id
    if (!payloadExtension?.headers) {
      payloadExtension.headers = {};
    }
    payloadExtension.headers['x-xpander-execution-id'] = this.execution.id;

    let clonedTool = ToolCall.fromObject(tool.toDict());
    let toolCallResult = ToolCallResult.fromObject({
      functionName: clonedTool.name,
      payload: ensureToolCallPayloadStructure(clonedTool?.payload || {}),
      toolCallId: clonedTool.toolCallId,
    });

    if (clonedTool.type !== ToolCallType.XPANDER) {
      return toolCallResult;
    }

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

      const originalToolName =
        this.originalToolNamesReMapping?.[clonedTool.name] || clonedTool.name;

      const graphItem = this.retrieveNodeFromGraph(originalToolName);
      if (graphItem?.settings?.schemas) {
        clonedTool = appendPermanentValues(
          ToolCall.fromObject({
            ...clonedTool.toDict(),
            name: originalToolName,
          }),
          graphItem.settings?.schemas,
        );
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
      );

      toolCallResult.statusCode = executionResult.statusCode;
      toolCallResult.result = executionResult.data;

      // backend asked to stop the execution
      if (executionResult?.headers?.['xpander-agent-stop'] === 'true') {
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
    return toolCalls.map((toolCall) =>
      this.runTool(toolCall, payloadExtension, toolCalls.length > 1),
    );
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
  public retrieveNodeFromGraph(itemId: string): IAgentGraphItem | undefined {
    return this.graph.find((gi) => gi.itemId === itemId);
  }

  /**
   * Initializes the task execution for the agent.
   *
   * @param execution - The execution details.
   */
  public initTask(execution: any): void {
    const camelCasedExecution = convertKeysToCamelCase(execution);
    this.execution = new Execution(
      camelCasedExecution.id,
      camelCasedExecution.agentId,
      camelCasedExecution.organizationId,
      camelCasedExecution.input,
      camelCasedExecution.status,
      camelCasedExecution.lastExecutedNodeId,
      camelCasedExecution.memoryThreadId,
    );
  }

  /**
   * Updates the user details for the agent.
   *
   * @param userDetails - The user details to update.
   */
  public updateUserDetails(userDetails: any): void {
    const camelCasedUserDetails = convertKeysToCamelCase(userDetails);
    this.userDetails = camelCasedUserDetails;
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
      this.executionMemory = this.initializeMemory();
    }
    return this.executionMemory as Memory;
  }

  /** Initializes the memory instance for the agent. */
  private initializeMemory(): Memory {
    if (!this.execution) {
      throw new Error('Execution is not initialized');
    }

    if (!this.execution.memoryThreadId) {
      const memory = Memory.create(this, this.userDetails);
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

  public isFinished() {
    let shouldStop = false;
    if (this.shouldStop) {
      shouldStop = true;
    } else {
      if (!this.memory) {
        shouldStop = false;
      } else {
        shouldStop = this.memory.messages.some((msg) =>
          msg.toolCalls?.some((tc) => tc.name === AGENT_FINISH_TOOL_ID),
        );
      }
    }

    // check if has sub executions
    if (shouldStop && this.isLocalRun && this?.execution?.workerId) {
      const pendingExecution: Execution = Execution.retrievePendingExecution(
        this,
        this.execution.workerId,
      );
      if (pendingExecution) {
        console.debug(
          `switching from execution ${this.execution.id} to ${pendingExecution.id}`,
        );
        // re-load agent if needed (switch agent)
        if (this.id !== pendingExecution.agentId) {
          this.id = pendingExecution.agentId;
          this.load(pendingExecution.agentId);
          this.isLocalRun = true;
        }
        this.initTask(pendingExecution);

        // reload memory
        this.executionMemory = this.initializeMemory();
        this.memory.selectLLMProvider(LLMProvider.OPEN_AI); // only if not openai..
        this.memory.initializeThread(
          this.execution?.inputMessage as IMemoryMessage,
          this.instructions,
        );
        shouldStop = false;
      } else if (this.execution.parentExecution) {
        // fetch execution result
        console.debug(
          `switching from execution ${this.execution.id} to parent execution ${this.execution.parentExecution}`,
        );
        this.execution = Execution.fetch(this, this.execution.parentExecution);
      }
    }

    return shouldStop;
  }

  public invokeAgent(
    input: string = '',
    files: string[] = [],
    useWorker: boolean = false,
  ): Execution {
    const localWorkerId = !useWorker ? generateUUIDv4() : undefined;
    const execution = Execution.create(this, input, files, localWorkerId);
    this.initTask(execution);
    this.isLocalRun = true;
    return execution;
  }

  public stop() {
    this.shouldStop = true;
  }
}
