export interface IToolParameter {
  type: string;
  properties: Record<string, any>;
  required?: string[];
}

export interface ITool {
  name: string;
  description: string;
  parameters?: Record<string, IToolParameter>;
  func?: any;
}

export interface IBedrockToolSpecInputSchema {
  json: Record<string, IToolParameter>;
}

export interface IBedrockToolSpec {
  name: string;
  description: string;
  inputSchema: IBedrockToolSpecInputSchema;
}
export interface IBedrockTool {
  toolSpec: IBedrockToolSpec;
  execute?: any;
}
