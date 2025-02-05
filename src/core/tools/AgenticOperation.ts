import { Base } from '../base';

/**
 * Represents an agentic operation with metadata and execution details.
 *
 * @class AgenticOperation
 * @extends {Base}
 *
 * @param {string} id - The unique identifier for the agentic operation.
 * @param {string} name - The name of the agentic operation.
 * @param {string} summary - A brief summary of the agentic operation.
 * @param {string} description - A detailed description of the agentic operation.
 * @param {string} idToUseOnGraph - The identifier used to represent this operation on a graph.
 * @param {string} interfaceId - The identifier of the interface this operation belongs to.
 * @param {boolean} isFunction - Indicates whether the operation represents a function.
 * @param {string} method - The HTTP method used for this operation (e.g., GET, POST).
 * @param {string} path - The API endpoint path for this operation.
 *
 * @memberof xpander.ai
 */
export class AgenticOperation extends Base {
  constructor(
    public id: string,
    public name: string,
    public summary: string,
    public description: string,
    public idToUseOnGraph: string,
    public interfaceId: string,
    public isFunction: boolean,
    public method: string,
    public path: string,
  ) {
    super();
  }
}
