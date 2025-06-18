import { Base } from '../base';

/**
 * Represents the instructions provided to an agent within the xpander.ai framework.
 *
 * @class AgentInstructions
 * @extends Base
 *
 * @param {string[]} role - An array of strings representing the role(s) assigned to the agent.
 * @param {string[]} goal - An array of strings detailing the agent's goal(s).
 * @param {string} general - A general instruction or summary description for the agent.
 *
 * @example
 * const instructions = new AgentInstructions(
 *   ['data-analyzer'],
 *   ['extract insights from customer data'],
 *   'Perform general analysis and summary of given inputs.'
 * );
 */
export class AgentInstructions extends Base {
  constructor(
    public role: string[] = [],
    public goal: string[] = [],
    public general: string = '',
  ) {
    super();
  }
}
