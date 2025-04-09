import request from 'sync-request';
import {
  Agent,
  ExecutionStatus,
  IExecutionInput,
  IMemoryMessage,
  Tokens,
} from '../..';
import { Base } from '../base';
import { convertKeysToCamelCase } from '../utils';

/**
 * Represents an execution of an agent in xpanderAI, including its input,
 * status, memory, and other related details.
 */
export class Execution extends Base {
  public static initExecution(createdExecution: any) {
    return new Execution(
      createdExecution.id,
      createdExecution.agentId,
      createdExecution.organizationId,
      createdExecution.input,
      createdExecution.status,
      createdExecution.lastExecutedNodeId,
      createdExecution.memoryThreadId,
      createdExecution.parentExecution || '',
      createdExecution.workerId,
      createdExecution.result || '',
      createdExecution.llmTokens,
    );
  }
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

  public static create(
    agent: Agent,
    input: string,
    files: string[],
    workerId?: string,
    threadId?: string,
    parentExecutionId?: string,
    toolCallName?: string,
  ): any {
    const payload = {
      input: {
        text: input || '',
        files: files || [],
      },
      worker_id: workerId || undefined,
      memory_thread_id: threadId || undefined,
      parent_execution_id: parentExecutionId || undefined,
      tool_call_name: toolCallName || undefined,
    };
    const response = request(
      'POST',
      `${agent.configuration.url}/agent-execution/${agent.id}`,
      {
        json: payload,
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const createdExecution = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    return this.initExecution(createdExecution);
  }

  public static fetch(agent: Agent, executionId: string): any {
    const response = request(
      'GET',
      `${agent.configuration.url}/agent-execution/${executionId}/status`,
      {
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const execution = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    return this.initExecution(execution);
  }

  public static retrievePendingExecution(agent: Agent, workerId: string): any {
    const response = request(
      'GET',
      `${agent.configuration.url}/agent-execution/pending-executions/${workerId}`,
      {
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const createdExecution = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    if (!createdExecution) {
      return null;
    }

    return this.initExecution(createdExecution);
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
   * @param workerId - Identifier of the worker associated with the execution.
   */
  constructor(
    public id: string,
    public agentId: string,
    public organizationId: string,
    public input: IExecutionInput,
    public status: ExecutionStatus,
    public lastExecutedNodeId: string = '',
    public memoryThreadId: string = '',
    public parentExecution: string = '',
    public workerId: string = '',
    public result: string = '',
    public llmTokens: Tokens = new Tokens(),
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

    return { role: 'user', content: content.join('\n') };
  }
}
