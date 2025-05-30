import { LLMProvider } from '../../constants/llmProvider';
import { AGENT_FINISH_TOOL_ID } from '../../constants/tools';
import { Agent } from '../../core/agents/Agent';
import {
  ToolCall,
  createTool,
  getSubAgentNameFromOAS,
  modifyPropertiesByRemoteSettings,
  getMCPServersTools,
} from '../../core/tools';
import { AgentDelegationType, IToolInstructions } from '../../types';

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
  public mcpSupported: boolean = false;

  constructor(public agent: Agent) {}
  /**
   * Retrieves and organizes tools available for the agent, considering local tools,
   * session-specific tools, and tools for prompt groups.
   * @returns An array of processed tools ready for use.
   * @throws Error if no tools are found for the agent.
   */
  getTools(withAgentEndTool: boolean = true): any[] {
    const agentTools: IToolInstructions[] = this.agent
      .tools as IToolInstructions[];
    let toolset: any[] = [];

    // Add local tools
    if (this.agent.hasLocalTools) {
      toolset.push(...this.agent.localTools);
    }

    toolset.push(...agentTools.map(createTool));

    if (toolset.length === 0 && !this.agent.hasMCPServers) {
      throw new Error(`No tools found for agent ${this.agent.id}`);
    }

    // add instructions per node
    for (const tool of toolset) {
      const {
        function: { name: nodeName },
      } = tool;
      const graphItem = this.agent.retrieveNodeFromGraph(nodeName);
      if (!graphItem?.settings) {
        continue;
      }
      // override tool description for active pg session
      if (!!graphItem?.settings?.description) {
        tool.function.description = graphItem.settings.description;
      }

      if (!!graphItem?.settings?.instructions) {
        const addon = ` - IMPORTANT INSTRUCTIONS FOR THIS TOOL: ${graphItem.settings.instructions}`;
        tool.function.description = tool.function.description.slice(
          0,
          1024 - addon.length,
        );
        tool.function.description += addon;
      }
    }

    if (!withAgentEndTool) {
      toolset = toolset.filter(
        (tool) => tool.function.name !== AGENT_FINISH_TOOL_ID,
      );
    }

    // agent sequence delegation
    if (this.agent.delegationType === AgentDelegationType.SEQUENCE) {
      const isFirstIteration = !this.agent.execution?.lastExecutedNodeId;
      if (!this.agent.graph.rootNode) {
        throw new Error('Root node not found');
      }

      // first iteration keep only root node without finish tool
      if (isFirstIteration) {
        const rootNodeToolName = getSubAgentNameFromOAS(
          this.agent.graph.rootNode.itemId,
          this.agent.oas,
        );
        toolset = toolset.filter(
          (tool) => tool.function.name === rootNodeToolName,
        );
      } else if (!!this.agent.execution?.lastExecutedNodeId) {
        // get only relevant items
        const lastUsedNode = this.agent.graph.findNodeByNodeId(
          this.agent.execution?.lastExecutedNodeId,
        );
        if (lastUsedNode) {
          const possibleNodes: string[] = lastUsedNode.targets.map((target) =>
            getSubAgentNameFromOAS(
              this.agent.graph.findNodeByNodeId(target)?.itemId!,
              this.agent.oas,
            ),
          );

          // allow end tool (xpfinish)
          if (possibleNodes.length === 0 && this.agent.endToolEnabled) {
            possibleNodes.push(AGENT_FINISH_TOOL_ID);
          }

          toolset = toolset.filter((tool) =>
            possibleNodes.includes(tool.function.name),
          );
        }
      }
    }

    // disable additional properties
    for (const tool of toolset) {
      if (!!tool?.function?.parameters) {
        tool.function.parameters.additionalProperties = false;
      }
    }

    // add mcp servers
    const mcpServers = [];
    if (this.agent.hasMCPServers && this.mcpSupported) {
      mcpServers.push(...getMCPServersTools(this.agent.graph.mcpNodes));
    }

    return [...this.postProcessTools(toolset), ...mcpServers];
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
    return tools.map((tool) =>
      modifyPropertiesByRemoteSettings(
        tool,
        'input',
        this.agent.retrieveNodeFromGraph(tool.function.name),
      ),
    );
  }
}
