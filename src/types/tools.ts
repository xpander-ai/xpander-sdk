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
