import { Base } from '../base';

/**
 * Represents an agentic interface with identifying and descriptive properties.
 *
 * @class AgenticInterface
 * @extends {Base}
 *
 * @param {string} id - The unique identifier for the agentic interface.
 * @param {string} name - The name of the agentic interface.
 * @param {string} summary - A brief summary of the agentic interface.
 * @param {string} description - A detailed description of the agentic interface.
 *
 * @memberof xpander.ai
 */
export class AgenticInterface extends Base {
  constructor(
    public id: string,
    public name: string,
    public summary: string,
    public description: string,
  ) {
    super();
  }
}
