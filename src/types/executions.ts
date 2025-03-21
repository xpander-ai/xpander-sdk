import { UserDetails } from '../core/UserDetails';

export enum ExecutionStatus {
  PENDING = 'pending',
  EXECUTING = 'executing',
  PAUSED = 'paused',
  ERROR = 'error',
  COMPLETED = 'completed',
}

export interface IExecutionInput {
  text?: string;
  files?: string[];
  user: UserDetails;
}
