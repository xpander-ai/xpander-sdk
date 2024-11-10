export enum SourceNodeType {
  SDK = 'sdk',
  TASK = 'task',
  ASSISTANT = 'assistant',
  WEBHOOK = 'webhook',
}

export enum AgentStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface ISourceNode {
  id: string;
  type: SourceNodeType;
  targets: string[];
  pgSwitchAllowed: boolean;
  metadata: any;
}

export interface IAgentTool {
  id: string;
  name: string;
  rawDescription: string;
  functionDescription: string;
  pathParams: any;
  queryParams: any;
  parameters: any;
  method: string;
  path: string;
}
