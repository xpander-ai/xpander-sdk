/**
 * Enum representing different source node types for agents.
 */
export enum SourceNodeType {
  SDK = 'sdk',
  TASK = 'task',
  ASSISTANT = 'assistant',
  WEBHOOK = 'webhook',
}

/**
 * Enum representing the possible statuses of an agent.
 */
export enum AgentStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AgentDelegationType {
  ROUTER = 'router',
  SEQUENCE = 'sequence',
}

export enum AgentDelegationEndStrategy {
  RETURN_TO_START = 'return-to-start',
  FINISH_WITH_LAST = 'finish-with-last',
}

export interface IAgentGraphItemAdvancedFilteringOption {
  returnables?: string[];
  searchables?: string[];
}

export enum AgentGraphItemType {
  SOURCE_NODE = 'source_node',
  AGENT = 'agent',
  TOOL = 'tool',
  HUMAN_IN_THE_LOOP = 'human_in_the_loop',
}

export enum AgentGraphItemSubType {
  // source nodes
  SDK = 'sdk',
  TASK = 'task',
  ASSISTANT = 'assistant',
  WEBHOOK = 'webhook',
  // tools
  OPERATION = 'operation',
  CUSTOM_FUNCTION = 'custom_function',
  LOCAL_TOOL = 'local_tool',
}

export interface IAgentGraphItemSchema {
  input?: Record<string, any>;
  output?: Record<string, any>;
}

export interface IAgentGraphItemSettings {
  instructions?: string;
  description?: string;
  schemas?: IAgentGraphItemSchema;
  advancedFilteringOptions?: IAgentGraphItemAdvancedFilteringOption[];
}

/**
 * Interface representing a source node in the agent's graph.
 */
export interface ISourceNode {
  /** Unique identifier for the source node. */
  id: string;

  /** Type of the source node (e.g., SDK, TASK). */
  type: SourceNodeType;

  /** Metadata associated with the source node. */
  metadata: any;
}

/**
 * Interface representing a tool available to an agent.
 */
export interface IAgentTool {
  /** Unique identifier for the tool. */
  id: string;

  /** Name of the tool. */
  name: string;

  /** Raw description of the tool. */
  rawDescription: string;

  /** Function-level description for the tool. */
  functionDescription: string;

  /** Parameters for path in the tool’s endpoint. */
  pathParams: any;

  /** Parameters for query in the tool’s endpoint. */
  queryParams: any;

  /** Parameters required for executing the tool. */
  parameters: any;

  /** HTTP method used to call the tool. */
  method: string;

  /** Endpoint path for the tool. */
  path: string;
}

/**
 * Represents the schema of a single node with defined input and output structures.
 */
export interface INodeSchema {
  readonly nodeName: string; // Name of the node
  readonly input: any; // Input schema definition
  readonly output: any; // Output schema definition
}

/**
 * Represents a schema group for a prompt group session (PGSchema),
 * containing multiple node schemas.
 */
export interface IPGSchema {
  readonly id: string; // Unique identifier for the schema group
  readonly schemas: INodeSchema[]; // Array of node schemas within the group
}

/**
 * Represents a prompt group + node name node's description override
 */
export interface INodeDescription {
  readonly promptGroupId: string; // Unique identifier of the prompt group
  readonly nodeName: string; // Node name to apply the description to
  readonly description: string; // The description override
}

export enum AgentAccessScope {
  PERSONAL = 'personal',
  ORGANIZATIONAL = 'organizational',
}

export interface IAgentInstructions {
  role: string;
  goal: string;
  general: string;
}

export enum AgentType {
  REGULAR = 'regular',
  MANAGER = 'manager',
}
