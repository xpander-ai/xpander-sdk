import { LLMProvider } from '../../constants/llmProvider';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';
import { Agent } from '../../core/agents/Agent';
import { createTool } from '../../core/tools';
import { IToolCall, IToolInstructions } from '../../types';

/**
 * Class representing the base LLM provider.
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

  static extractToolCalls(llmResponse: Record<string, any>): IToolCall[] {
    // lint purpose only.
    if (llmResponse) {
      return [];
    }
    return [];
  }
  public originalToolNamesReamapping: Record<string, string> = {};
  constructor(public agent: Agent) {}

  getTools(): any[] {
    const agentTools: any = this.agent.tools as unknown as IToolInstructions[];
    const allTools: any[] = [];

    // add local tools
    if (this.agent.hasLocalTools) {
      for (const localTool of this.agent.localTools) {
        allTools.push(localTool);
      }
    }

    allTools.push(...agentTools.map(createTool));

    if (allTools.length === 0) {
      throw new Error(`No tools found for agent ${this.agent.id}`);
    }

    // custom agents doesn't have graphs!
    if (this.agent.id === CUSTOM_AGENT_ID) {
      return [
        ...this.postProcessTools(allTools),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
      ];
    }

    // return pg selection
    const pgSessions = this.agent.promptGroupSessions;
    if (!pgSessions.activeSession) {
      return [
        ...this.postProcessTools(this.agent.pgOas.map(createTool)),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
      ];
    }

    // return session tools
    const sessionTools: any[] = pgSessions.getToolsForActiveSession(allTools);

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
   * Post-processes the tools before returning them.
   * @param tools - The tools to post-process.
   * @returns The post-processed tools.
   */
  postProcessTools(tools: any[]): any[] {
    return tools;
  }
}
