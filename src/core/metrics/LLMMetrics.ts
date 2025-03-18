import { MetricsBase } from './MetricsBase';
import { LLMProvider } from '../../constants/llmProvider';

export class LLMMetrics extends MetricsBase {
  constructor(
    public sourceNodeType: string,
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
