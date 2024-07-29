import { ITool } from './tools';

export interface ILLMProviderHandler {
  toolsNamesMapping?: Record<string, string>;
  getTools(functionize?: boolean): ITool[];
  invokeTools(toolSelectorResponse: any): any;
}
