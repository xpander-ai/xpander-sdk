export enum MemoryType {
  LONG_TERM = 'long_term',
  SHORT_TERM = 'short_term',
}

export enum MemoryStrategy {
  FULL = 'full',
  SUMMARIZATION = 'summarization',
  BUFFERING = 'buffering',
  MOVING_WINDOW = 'MovingWindow',
  CONTEXT = 'context',
}

export interface IToolCall {
  name: string;
  payload?: string;
  toolCallId: string;
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface IMemoryMessage {
  role: MessageRole;
  content?: string;
  toolCallId?: string;
  toolCalls?: IToolCall[];
  nodeName?: string;
}
