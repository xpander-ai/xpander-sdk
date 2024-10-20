export interface IGraphItem {
  startingNode: string;
  graph: Record<string, string[]>;
  prompts: string[];
  enrichedPrompts: string[];
}

export interface IGraph {
  graphs: IGraphItem[];
  allowAllOperations: boolean;
  pgSwitchAllowed: boolean;
  spec: any;
  organizationId: boolean;
}

export interface IGraphSession {
  prompt: string;
  previousNode: string;
  promptGroup: any | IGraphItem;
}
