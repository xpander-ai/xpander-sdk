import { LLMProvider } from '../../constants/llmProvider';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';
import { Agent } from '../../core/agents/Agent';
import { createTool } from '../../core/tools';
import { IToolCall, IToolInstructions } from '../../types';

/**
 * BaseLLMProvider serves as the foundational class for integrating different
 * LLM providers, defining common functionality for handling tool extraction
 * and management within an agent.
 */
export class BaseLLMProvider {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  /**
   * Extracts tool calls from an LLM response, if applicable.
   * @param llmResponse - The LLM response object.
   * @returns An array of IToolCall objects extracted from the response.
   */
  static extractToolCalls(llmResponse: Record<string, any>): IToolCall[] {
    if (llmResponse) {
      return [];
    }
    return [];
  }

  /** Maps original tool names to modified versions, if needed. */
  public originalToolNamesReamapping: Record<string, string> = {};

  constructor(public agent: Agent) {}
  /**
   * Retrieves and organizes tools available for the agent, considering local tools,
   * session-specific tools, and tools for prompt groups.
   * @returns An array of processed tools ready for use.
   * @throws Error if no tools are found for the agent.
   */
  getTools(): any[] {
    const agentTools: IToolInstructions[] = this.agent
      .tools as IToolInstructions[];
    const allTools: any[] = [];

    // Add local tools
    if (this.agent.hasLocalTools) {
      for (const localTool of this.agent.localTools) {
        allTools.push(localTool);
      }
    }

    allTools.push(...agentTools.map(createTool));

    if (allTools.length === 0) {
      throw new Error(`No tools found for agent ${this.agent.id}`);
    }

    // Return tools for custom agents, which lack graphs
    if (this.agent.id === CUSTOM_AGENT_ID) {
      return [
        ...this.postProcessTools(allTools),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
      ];
    }

    // For prompt group selection
    const pgSessions = this.agent.promptGroupSessions;
    if (!pgSessions.activeSession) {
      return [
        ...this.postProcessTools(this.agent.pgOas.map(createTool)),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
      ];
    }

    // For active session tools
    const sessionTools: any[] = pgSessions.getToolsForActiveSession(allTools);

    // If no session tools, reset sessions if allowed and return available tools
    if (sessionTools.length === 0 && this.agent.pgSwitchAllowed) {
      pgSessions.resetSessions();
      return [
        ...this.postProcessTools(this.agent.pgOas.map(createTool)),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
      ];
    }

    return this.postProcessTools(sessionTools);
  }

  /**
   * Post-processes tools to prepare them for use, applying any necessary modifications.
   * @param tools - The tools to post-process.
   * @returns The processed tools ready for execution.
   */
  postProcessTools(tools: any[]): any[] {
    return tools;
  }
}
