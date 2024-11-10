export interface IGraphItem {
  startingNode: string;
  graph: Record<string, string[]>;
  prompts: string[];
  enrichedPrompts: string[];
  promptGroupId: string;
}
