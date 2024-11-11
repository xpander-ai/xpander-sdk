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

/**
 * Interface representing a source node in the agent's graph.
 */
export interface ISourceNode {
  /** Unique identifier for the source node. */
  id: string;

  /** Type of the source node (e.g., SDK, TASK). */
  type: SourceNodeType;

  /** List of target nodes connected to this source node. */
  targets: string[];

  /** Flag indicating if switching prompt groups is allowed for this node. */
  pgSwitchAllowed: boolean;

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
