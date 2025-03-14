import { MetricsBase } from './MetricsBase';
import { LLMProvider } from '../../constants/llmProvider';
import { SourceNodeType } from '../../types';

export class LLMMetrics extends MetricsBase {
  constructor(
    public sourceNodeType: SourceNodeType,
    public finishReason: string = 'finish',
    public provider: LLMProvider,
    public model: string,
    public duration: number,
    public promptTokens: number,
    public completionTokens: number,
    public totalTokens: number,
    public functionName: string[] = [],
  ) {
    super();
  }
}
