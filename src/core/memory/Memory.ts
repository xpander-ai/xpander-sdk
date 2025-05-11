import request from 'sync-request';
import {
  Agent,
  IAgentInstructions,
  KnowledgeBaseStrategy,
  LLMProvider,
  ToolCallResult,
} from '../..';
import { BaseOpenAISDKHandler } from '../../llmProviders/shared/baseOpenAI';
import { IMemoryMessage, MemoryType } from '../../types/memory';
import { Base } from '../base';
import { UserDetails } from '../UserDetails';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '../utils';
import { MemoryThread } from './MemoryThread';
import { AmazonBedrock } from '../../llmProviders';

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
  public static create(
    agent: Agent,
    userDetails?: UserDetails,
    threadMetadata?: Record<string, any>,
  ): Memory {
    const response = request('POST', `${agent.configuration.url}/memory`, {
      json: {
        organization_id: agent.organizationId,
        user_details: userDetails
          ? convertKeysToSnakeCase(userDetails.toDict())
          : undefined,
        metadata: threadMetadata || null,
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
  public static fetch(agent: any | Agent, threadId: string): Memory {
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

  /**
   * Fetches the memory threads associated with a given agent.
   *
   * @param {any|Agent} agent - The agent whose memory threads are to be retrieved.
   * @returns {MemoryThread[]} - An array of memory threads belonging to the agent.
   * @throws {Error} - Throws an error if the request fails.
   */
  public static fetchUserThreads(agent: any | Agent): MemoryThread[] {
    const response = request(
      'GET',
      `${agent.configuration.url}/memory/threads/${agent?.userDetails?.id!}`,
      {
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }

    const fetchedThreads = convertKeysToCamelCase(
      JSON.parse(response.getBody('utf8')),
    );

    return fetchedThreads.map(
      (thread: any) =>
        new MemoryThread(
          thread.threadId,
          thread.createdAt,
          thread.name,
          thread?.metadata || {},
        ),
    );
  }

  /**
   * Renames a memory thread by its ID.
   *
   * @param {any | Agent} agent - The agent instance containing configuration details.
   * @param {string} threadId - The ID of the thread to rename.
   * @param {string} name - The new name for the thread.
   * @throws {Error} If the request fails.
   *
   * @xpander.ai
   */
  public static renameThreadById(
    agent: any | Agent,
    threadId: string,
    name: string,
  ) {
    const response = request(
      'PATCH',
      `${agent.configuration.url}/memory/rename/${threadId}/${name}`,
      {
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }
  }

  /**
   * Deletes a memory thread by its ID.
   *
   * @param {any | Agent} agent - The agent instance containing configuration details.
   * @param {string} threadId - The ID of the thread to delete.
   * @throws {Error} If the request fails.
   *
   * @xpander.ai
   */
  public static deleteThreadById(agent: any | Agent, threadId: string) {
    const response = request(
      'DELETE',
      `${agent.configuration.url}/memory/${threadId}`,
      {
        headers: { 'x-api-key': agent.configuration.apiKey },
      },
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(response.body.toString());
    }
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
      case LLMProvider.GEMINI_OPEN_AI:
      case LLMProvider.NVIDIA_NIM:
      case LLMProvider.FRIENDLI_AI:
        return BaseOpenAISDKHandler.convertMessages(messages);
      case LLMProvider.AMAZON_BEDROCK:
        return AmazonBedrock.convertMessages(messages);
    }
    return [];
  }

  public get systemMessage(): any[] {
    return this.messages
      .filter((msg) => msg.role === 'system')
      .map(({ content: text }) => ({ text }));
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
    const instructionsMessages = [
      {
        role: 'system',
        content: [
          `Your General instructions: ${instructions.general}`,
          `Your Role instructions: ${instructions.role}`,
          `Your Goal instructions: ${instructions.goal}`,
          this.agent.endToolEnabled
            ? `IMPORTANT: When done or unable to proceed after attempts, use "xpfinish-agent-execution-finished" to mark success or failure.`
            : '',
        ].join('\n'),
      },
    ];

    const textualGraph = this.agent.graph.textual;
    if (textualGraph && textualGraph.length !== 0) {
      instructionsMessages.push({
        role: 'system',
        content: `
You have access to a structured **AI Agent Graph** that maps available tools and their connections. Use this graph to **pre-plan execution**, ensuring optimal decision-making.

#### **Execution Plan:**
1. **Analyze the Request**: Break down the request into actionable steps.
2. **Identify the Starting Tool**: Find the most relevant tool from the graph.
3. **Map the Execution Flow**: Before running any tool, outline the required sequence of steps using available targets.
4. **Follow Graph Connections**: Execute tools in order, ensuring logical progression.
5. **Adjust Dynamically**: If a tool is unavailable, infer from similar tools or alter execution based on the flow.

#### **Key Guidelines:**
- **Pre-plan all steps** before invoking tools.
- **Use only the available graph paths**—do not invent tools.
- **Optimize efficiency** by choosing the shortest logical path.
- **Ensure contextual accuracy** in every step.

Use the Markdown representation of the graph as your **execution guide**. Do not proceed with execution until a clear plan is defined.

Agent's graph: ${textualGraph}
        `,
      });
    }

    this.addMessages(instructionsMessages);
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
    files: string[] = [],
  ): void {
    this.llmProvider = llmProvider;
    const hasSystemMessage = this.messages.some((msg) => msg.role === 'system');
    const hasUserMessage = this.messages.some((msg) => msg.role === 'user');
    if (this.messages.length === 0 || !hasSystemMessage || !hasUserMessage) {
      if (!hasSystemMessage) {
        this.initInstructions(instructions);
      }

      const initialMessages = [input];

      if (!!this.agent?.userDetails) {
        initialMessages.push({
          role: 'system',
          content: `User Details: ${JSON.stringify(this.agent.userDetails)}`,
        });
      }

      if (Array.isArray(files) && files.length !== 0) {
        initialMessages.push({
          role: 'system',
          content: `Attached Files: ${files.map((file) => `"${file}"`).join(', ')}`,
        });
      }

      if (!hasUserMessage) {
        this.addMessages(initialMessages);
      }
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

  /**
   * Updates the message history for the agent by sending the provided messages to the server.
   * If the messages are not in the expected "xpander.ai" message format, they are converted.
   *
   * @param {any} _messages - The messages to be updated. Can be in various formats.
   *                         If not in the "xpander.ai" format, they will be converted.
   * @throws {Error} - Throws an error if the request to update messages fails.
   */
  public updateMessages(_messages: any): void {
    let messages = JSON.parse(JSON.stringify(_messages)); // Deep copy to avoid mutation

    const isXpanderMessageStruct =
      Array.isArray(messages) &&
      messages.length !== 0 &&
      'role' in messages[0] &&
      ('content' in messages[0] || 'files' in messages[0]);

    if (!isXpanderMessageStruct) {
      messages = this.convertLLMResponseToMessages(messages);
    }

    const response = request(
      'PATCH',
      `${this.agent.configuration.url}/memory/${this.id}`,
      {
        json: { messages: convertKeysToSnakeCase(messages) },
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
}
