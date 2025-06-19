import { Base } from '../base';

/**
 * Represents token usage statistics for a language model interaction.
 *
 * @class LLMTokens
 * @extends Base
 *
 * @param {number} completionTokens - Number of tokens used in the completion (model's response).
 * @param {number} promptTokens - Number of tokens used in the prompt (input).
 * @param {number} totalTokens - Total number of tokens used (prompt + completion).
 *
 * @example
 * const tokens = new LLMTokens(100, 50, 150);
 */
export class LLMTokens extends Base {
  constructor(
    public completionTokens: number = 0,
    public promptTokens: number = 0,
    public totalTokens: number = 0,
  ) {
    super();
  }
}

/**
 * Encapsulates token usage for different components of a task,
 * typically an internal process and a worker/agent execution.
 *
 * @class Tokens
 * @extends Base
 *
 * @param {LLMTokens} inner - Token usage for internal processing.
 * @param {LLMTokens} worker - Token usage for the worker or external agent.
 *
 * @example
 * const tokens = new Tokens(
 *   new LLMTokens(30, 20, 50),
 *   new LLMTokens(80, 40, 120)
 * );
 */
export class Tokens extends Base {
  constructor(
    public inner: LLMTokens = new LLMTokens(),
    public worker: LLMTokens = new LLMTokens(),
  ) {
    super();
  }
}
