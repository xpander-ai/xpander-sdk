export class LLMTokens {
  constructor(
    public completionTokens: number = 0,
    public promptTokens: number = 0,
    public totalTokens: number = 0,
  ) {}
}

export class Tokens {
  constructor(
    public inner: LLMTokens = new LLMTokens(),
    public worker: LLMTokens = new LLMTokens(),
  ) {}
}
