import { LLMProvider } from '../../constants/llmProvider';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';
import { Agent } from '../../core/agents/Agent';
import { ToolCall } from '../../core/toolCalls';
import { createTool, modifyPropertiesByRemoteSettings } from '../../core/tools';
import { IToolInstructions, KnowledgeBaseStrategy } from '../../types';

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
   * @returns An array of ToolCall objects extracted from the response.
   */
  static extractToolCalls(llmResponse: Record<string, any>): ToolCall[] {
    if (llmResponse) {
      return [];
    }
    return [];
  }

  /** Maps original tool names to modified versions, if needed. */
  public originalToolNamesReMapping: Record<string, string> = {};

  constructor(public agent: Agent) {}
  /**
   * Retrieves and organizes tools available for the agent, considering local tools,
   * session-specific tools, and tools for prompt groups.
   * @returns An array of processed tools ready for use.
   * @throws Error if no tools are found for the agent.
   */
  getTools(returnAllTools: boolean = false): any[] {
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
      return this.postProcessTools(allTools);
    }

    if (returnAllTools) {
      return [
        ...this.postProcessTools(this.agent.pgOas.map(createTool)),
        ...this.postProcessTools(allTools),
      ];
    }

    let knowledgeBaseTools: any[] = [];
    if (
      this.agent.hasKnowledgeBase &&
      this.agent.knowledgeBaseStrategy === KnowledgeBaseStrategy.AGENTIC_RAG
    ) {
      knowledgeBaseTools = allTools.filter((tool) =>
        tool.function.name.startsWith('xpkb'),
      );
    }

    // For prompt group selection
    const pgSessions = this.agent.promptGroupSessions;
    if (!pgSessions.activeSession) {
      return [
        ...this.postProcessTools(this.agent.pgOas.map(createTool)),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
        ...knowledgeBaseTools,
      ];
    }

    // For active session tools
    const sessionTools: any[] = pgSessions.getToolsForActiveSession(allTools);

    // add instructions per node
    if (sessionTools.length !== 0 && !!pgSessions.activeSession) {
      const graphNodesInstructions =
        pgSessions.activeSession.pg.operationNodesInstructions;
      for (const sessionTool of sessionTools) {
        const {
          function: { name: nodeName },
        } = sessionTool;
        const nodeInstructions = graphNodesInstructions?.find(
          (gni) => gni.nodeName === nodeName,
        );
        // override tool description for active pg session
        if (
          !!this?.agent?.promptGroupSessions?.activeSession?.pg?.promptGroupId
        ) {
          const activePg =
            this.agent.promptGroupSessions.activeSession.pg.promptGroupId;
          const descriptionOverride = this.agent.pgNodeDescriptionOverride.find(
            (pndo) =>
              pndo.promptGroupId === activePg &&
              pndo.nodeName === sessionTool.function.name,
          );
          if (!!descriptionOverride?.description) {
            sessionTool.function.description = descriptionOverride.description;
          }
        }

        if (nodeInstructions?.instructions) {
          const addon = ` - IMPORTANT INSTRUCTIONS FOR THIS TOOL: ${nodeInstructions.instructions}`;
          sessionTool.function.description =
            sessionTool.function.description.slice(0, 1024 - addon.length);
          sessionTool.function.description += addon;
        }
      }
    }

    // If no session tools, reset sessions if allowed and return available tools
    if (sessionTools.length === 0 && this.agent.pgSwitchAllowed) {
      pgSessions.resetSessions();
      return [
        ...this.postProcessTools(this.agent.pgOas.map(createTool)),
        ...(this.agent.hasLocalTools
          ? this.postProcessTools(this.agent.localTools)
          : []),
        ...knowledgeBaseTools,
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
    return this.runSchemaEnforcement(tools);
  }

  /**
   * Applies schema enforcement to a list of tools by removing restricted properties
   * from their parameters based on the agent's schemas.
   *
   * This function ensures that properties blocked or restricted by schemas are not
   * accessible by the LLM, maintaining data integrity and compliance with schema rules.
   *
   * @param tools - The array of tools to enforce schema rules on.
   * @returns The modified array of tools after schema enforcement.
   */
  runSchemaEnforcement(tools: any[]): any[] {
    const schemasByNodeName = this.agent.schemasByNodeName();

    if (Object.keys(schemasByNodeName).length !== 0) {
      return tools.map((tool) =>
        modifyPropertiesByRemoteSettings(tool, schemasByNodeName, 'input'),
      );
    }

    return tools;
  }
}
