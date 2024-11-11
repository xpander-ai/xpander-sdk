export interface OperationNodeInstructions {
  nodeName: string;
  instructions: string;
  nodeIndexInGraph: number;
}

/**
 * Interface representing an item in an agent's graph, containing the structure
 * of connected nodes, prompt details, and associated group information.
 */
export interface IGraphItem {
  /** Identifier for the starting node in the graph. */
  startingNode: string;

  /** Representation of the graph structure with nodes and their connections. */
  graph: Record<string, string[]>;

  /** Array of prompt texts associated with the graph item. */
  prompts: string[];

  /** Array of enriched prompts, providing additional context or formatting. */
  enrichedPrompts: string[];

  /** Unique identifier for the prompt group associated with this graph item. */
  promptGroupId: string;

  operationNodesInstructions?: OperationNodeInstructions[];
}
