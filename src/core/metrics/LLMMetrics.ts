import { MetricsBase } from './MetricsBase';
import { LLMProvider } from '../../constants/llmProvider';
import { SourceNodeType } from '../../types';

export class LLMMetrics extends MetricsBase {
  constructor(
    public sourceNodeType: SourceNodeType,
    public finishReason: string = 'finish',
    public provider: LLMProvider = LLMProvider.OPEN_AI,
    public model: string = '',
    public duration: number = 0,
    public promptTokens: number = 0,
    public completionTokens: number = 0,
    public totalTokens: number = 0,
    public functionName: string[] = [],
  ) {
    super();
  }
}
