import { SourceNodeType } from '../../types';
import { Tokens } from '../executions';
import { MetricsBase } from './MetricsBase';

export class ExecutionMetrics extends MetricsBase {
  constructor(
    public source: SourceNodeType,
    public executionId: string,
    public subExecutions: string[] = [],
    public memoryThreadId: string = '',
    public task: string = '',
    public triggeredBy: string = 'N/A',
    public skills: string[] = [],
    public status: string = '',
    public duration: number = 0,
    public aiModel: string = '',
    public worker: string = '',
    public aiEmployeeId: string = '',
    public apiCallsMade: any[] = [],
    public result: string = '',
    public llmTokens: Tokens = new Tokens(),
  ) {
    super();
  }
}
