import { ITool } from './tools';

export interface ILLMProviderHandler {
  getTools(functionize?: boolean): ITool[];
  invokeTools(toolSelectorResponse: any): any;
}
