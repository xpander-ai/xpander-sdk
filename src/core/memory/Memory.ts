import request from 'sync-request';
import {
  Agent,
  IAgentInstructions,
  KnowledgeBaseStrategy,
  LLMProvider,
  ToolCallResult,
} from '../..';
import { BaseOpenAISDKHandler } from '../../llmProviders/shared/baseOpenAI';
import { IMemoryMessage, IUserDetails, MemoryType } from '../../types/memory';
import { Base } from '../base';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '../utils';

/**
 * Represents a memory thread in xpanderAI, handling storage, retrieval,
 * and processing of memory messages and related operations.
 */
export class Memory extends Base {
  /**
   * Creates a new memory thread for the specified agent.
   *
   * @param agent - The agent for which the memory thread is created.
   * @param userDetails - Optional user details associated with the memory thread.
   * @returns A new instance of the Memory class.
   */
  public static create(agent: Agent, userDetails?: IUserDetails): Memory {
    const response = request('POST', `${agent.configuration.url}/memory`, {
      json: {
        organization_id: agent.organizationId,
        user_details: userDetails
          ? convertKeysToSnakeCase(userDetails)
          : undefined,
      },
      headers: { 'x-api-key': agent.configuration.apiKey },
    });

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const createdThread = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    return new Memory(
      agent,
      createdThread.id,
      createdThread.messages,
      createdThread.userDetails,
      agent.memoryType,
    );
  }

  /**
   * Fetches an existing memory thread by its ID.
   *
   * @param agent - The agent associated with the memory thread.
   * @param threadId - The ID of the memory thread to fetch.
   * @returns An instance of the Memory class representing the fetched thread.
   */
  public static fetch(agent: Agent, threadId: string): Memory {
    const response = request(
      'GET',
      `${agent.configuration.url}/memory/${threadId}`,
      {
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const fetchedThread = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    return new Memory(
      agent,
      fetchedThread.id,
      fetchedThread.messages,
      fetchedThread.userDetails,
      agent.memoryType,
    );
  }

  /** The LLM provider to be used for message processing. */
  public llmProvider: LLMProvider = LLMProvider.OPEN_AI;

  constructor(
    private agent: Agent,
    public id: string,
    public messages: IMemoryMessage[],
    public userDetails: string,
    public memoryType: MemoryType,
  ) {
    super();
  }

  /** Executes the memory strategy and updates the messages accordingly. */
  private runStrategy(): void {
    const response = request(
      'GET',
      `${this.agent.configuration.url}/memory/${this.id}/${this.agent.memoryStrategy}`,
      {
        headers: { 'x-api-key': this.agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const fetchedThread = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );
    this.messages = fetchedThread.messages;
  }

  /**
   * Retrieves the messages stored in the memory thread.
   * Applies the agent's memory strategy to refresh the messages if needed.
   *
   * @returns An array of messages formatted for the selected LLM provider.
   */
  public retrieveMessages(): any[] {
    this.runStrategy();
    let messages: IMemoryMessage[] = this.messages;
    switch (this.llmProvider) {
      case LLMProvider.OPEN_AI:
      case LLMProvider.NVIDIA_NIM:
      case LLMProvider.FRIENDLI_AI:
        return BaseOpenAISDKHandler.convertMessages(messages);
    }
    return [];
  }

  /**
   * Adds tool call results as messages to the memory thread.
   *
   * @param toolCallResults - An array of tool call results to be added as messages.
   */
  public addToolCallResults(toolCallResults: ToolCallResult[]): void {
    this.addMessages(
      toolCallResults.map((tc) => ({
        role: 'tool',
        content: JSON.stringify(tc.result),
        toolCallId: tc.toolCallId,
      })),
    );
  }

  /**
   * Adds messages to the memory thread.
   * Converts non-standard messages to a compatible format before storing.
   *
   * @param _messages - An array of messages to be added to the memory thread.
   */
  public addMessages(_messages: any): void {
    let messages = JSON.parse(JSON.stringify(_messages)); // deep copy
    const isXpanderMessageStruct =
      Array.isArray(messages) &&
      messages.length !== 0 &&
      'role' in messages[0] &&
      ('content' in messages[0] || 'files' in messages[0]);

    if (!isXpanderMessageStruct) {
      messages = this.convertLLMResponseToMessages(messages);
    }

    const response = request(
      'PUT',
      `${this.agent.configuration.url}/memory/${this.id}`,
      {
        json: convertKeysToSnakeCase(messages),
        headers: { 'x-api-key': this.agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const updatedThread = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );
    this.from({ messages: updatedThread.messages });
  }

  /**
   * Initializes the memory thread with system instructions if no messages exist.
   *
   * @param instructions - Instructions to initialize the memory thread.
   */
  public initInstructions(instructions: IAgentInstructions): void {
    // temporary workaround for input_task issue (not passing all required data)
    if (instructions.general) {
      instructions.general += `
        IMPORTANT: when making a sub-task (with input_task), make sure to append all related 
        information relevant for the sub-task. For instance, if the sub-task is about sending 
        an email with tags, ensure the tags and any required data are included in the input_task.
        `;
    }
    // faileover
    if (instructions.general) {
      instructions.general += `
        - Execute tools as needed to complete tasks.  
        - If a tool fails **3 times**, execution stalls, or no tool is called for an extended period, stop immediately and report the issue along with any relevant results or errors.
        `;
    }
    this.addMessages([
      {
        role: 'system',
        content: [
          `Your General instructions: ${instructions.general}`,
          `Your Role instructions: ${instructions.role}`,
          `Your Goal instructions: ${instructions.goal}`,
          `IMPORTANT: When done or unable to proceed after attempts, use "xpfinish-agent-execution-finished" to mark success or failure.`,
        ].join('\n'),
      },
    ]);
  }

  /**
   * Initializes the thread with input and instructions.
   *
   * @param input - Initial user input message.
   * @param instructions - Instructions to initialize the memory thread.
   */
  public initMessages(
    input: IMemoryMessage,
    instructions: IAgentInstructions,
    llmProvider: LLMProvider = LLMProvider.OPEN_AI,
  ): void {
    this.llmProvider = llmProvider;
    if (this.messages.length === 0) {
      this.initInstructions(instructions);

      const initialMessages = [input];

      if (!!this.agent?.userDetails) {
        initialMessages.push({
          role: 'system',
          content: `User Details: ${JSON.stringify(this.agent.userDetails)}`,
        });
      }

      this.addMessages(initialMessages);
      this.addKnowledgeBase();
    }
  }

  public addKnowledgeBase() {
    if (
      this.agent?.vanillaKnowledgeBases &&
      this.agent.vanillaKnowledgeBases.length !== 0
    ) {
      const messages: IMemoryMessage[] = [];

      for (const kb of this.agent.vanillaKnowledgeBases) {
        // double check
        if (kb.strategy === KnowledgeBaseStrategy.VANILLA) {
          messages.push({
            role: 'system',
            content: `Here's ${kb.name} knowledge base (${kb.description}) documents: ${JSON.stringify(kb.documents)}`,
          });
        }
      }

      if (messages.length !== 0) {
        this.addMessages(messages);
      }
    }
  }

  /**
   * Converts an LLM response to the memory message format.
   *
   * @param response - The LLM response to convert.
   * @returns An array of memory messages formatted for the memory thread.
   */
  private convertLLMResponseToMessages(response: any): IMemoryMessage[] {
    switch (this.llmProvider) {
      case LLMProvider.OPEN_AI:
      case LLMProvider.NVIDIA_NIM:
      case LLMProvider.FRIENDLI_AI:
        return BaseOpenAISDKHandler.extractMessages(response);
    }
    return [];
  }
}
