import request from 'sync-request';
import { Agent, ExecutionStatus, IExecutionInput, IMemoryMessage } from '../..';
import { Base } from '../base';
import { convertKeysToCamelCase } from '../utils';

/**
 * Represents an execution of an agent in xpanderAI, including its input,
 * status, memory, and other related details.
 */
export class Execution extends Base {
  /**
   * Updates an execution with the specified delta changes.
   *
   * @param agent - The agent associated with the execution.
   * @param execution_id - The ID of the execution to update.
   * @param delta - A record of changes to apply to the execution.
   * @returns The updated execution object.
   */
  public static update(
    agent: Agent,
    execution_id: string,
    delta: Record<string, any>,
  ): any {
    const response = request(
      'PATCH',
      `${agent.configuration.url}/agent-execution/${execution_id}/update`,
      {
        json: delta,
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const updatedExecution = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    return updatedExecution;
  }

  /**
   * Constructs a new Execution instance.
   *
   * @param id - Unique identifier of the execution.
   * @param agentId - Identifier of the agent performing the execution.
   * @param organizationId - Identifier of the organization associated with the execution.
   * @param input - Input provided for the execution.
   * @param status - Current status of the execution.
   * @param lastExecutedNodeId - Identifier of the last executed node.
   * @param memoryThreadId - Identifier of the memory thread associated with the execution.
   */
  constructor(
    public id: string,
    public agentId: string,
    public organizationId: string,
    public input: IExecutionInput,
    public status: ExecutionStatus,
    public lastExecutedNodeId: string = '',
    public memoryThreadId: string = '',
  ) {
    super();
  }

  /**
   * Retrieves the input message formatted as a memory message.
   *
   * Combines text and file references into a single message object.
   *
   * @returns An object representing the user's input message.
   */
  public get inputMessage(): IMemoryMessage {
    const content: string[] = [];

    if (this.input.text) {
      content.push(this.input.text);
    }

    if (Array.isArray(this.input.files) && this.input.files.length !== 0) {
      content.push(
        `Files: ${this.input.files.map((file) => `"${file}"`).join(', ')}`,
      );
    }

    return { role: 'user', content: content.join('\n') };
  }
}
