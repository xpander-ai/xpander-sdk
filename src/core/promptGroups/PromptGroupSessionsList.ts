import { PromptGroupSession } from './PromptGroupSession';
import { LOCAL_TOOL_PREFIX } from '../../constants/tools';
import { IGraphItem, IToolCall } from '../../types';
import { IAgentTool } from '../../types/agents';
import { createTool } from '../tools';

/**
 * Manages a collection of prompt group sessions, providing functionalities
 * to start, manage, and retrieve tools for active sessions in xpanderAI.
 */
export class PromptGroupSessionsList {
  constructor(
    /** Collection of graph items associated with prompt groups. */
    private graphs: IGraphItem[],

    /** Array of agent tools specific to prompt groups. */
    public pgOas: IAgentTool[],

    /** List of active prompt group sessions. */
    private sessions: PromptGroupSession[] = [],
  ) {}

  /**
   * Starts a new session for a specified tool call, associating it with a prompt group.
   * If the prompt group or graph cannot be matched, an error is thrown.
   * @param tool - The tool call used to start the prompt group session.
   * @returns A system message indicating the prompt group was successfully selected.
   */
  public startPgSession(tool: IToolCall): string {
    const matchedPg = this.pgOas.find((pg) => pg.id === tool.name);
    if (!matchedPg) {
      throw new Error(`failed to match prompt group - ${tool.name}`);
    }
    let session = this.sessions.find(
      (_session) => _session.pg.promptGroupId === matchedPg.name,
    );
    if (!session) {
      const matchedGraph = this.graphs.find(
        (graph) => graph.promptGroupId === matchedPg.name,
      );
      if (matchedGraph) {
        session = new PromptGroupSession(matchedGraph);
        this.sessions = [session]; // single session permitted
      } else {
        throw new Error(`failed to match graph - ${matchedPg.name}`);
      }
    } else {
      session.lastNode = tool.name;
    }
    return "system message: graph prompt group selected, ignore this and proceed with the user's request using new tools.";
  }

  /** Returns the currently active session, if one exists. */
  public get activeSession() {
    return this.sessions?.[0];
  }

  /** Resets all active prompt group sessions. */
  public resetSessions(): void {
    this.sessions = [];
  }

  /**
   * Determines starting nodes within the graph that are not targeted by other nodes,
   * ensuring that explicitly defined starting nodes are included.
   * @returns A list of starting node names.
   */
  private getStartingNodes(): string[] {
    const startingNodes: string[] = [];
    const allKeys = Object.keys(this.activeSession.pg.graph);
    const targetedNodes = new Set<string>();

    // Collect all nodes that are targeted by other nodes
    for (const key of allKeys) {
      const targets = this.activeSession.pg.graph[key];
      targets.forEach((target: string) => {
        if (target !== key) {
          targetedNodes.add(target);
        }
      });
    }

    // Find nodes that are not in the set of targeted nodes
    for (const key of allKeys) {
      if (!targetedNodes.has(key)) {
        startingNodes.push(key);
      }
    }

    // Ensure the explicitly defined starting node is included
    if (
      this.activeSession.pg.startingNode &&
      !startingNodes.includes(this.activeSession.pg.startingNode)
    ) {
      startingNodes.push(this.activeSession.pg.startingNode);
    }

    return startingNodes;
  }

  /**
   * Retrieves the available tools for the currently active session,
   * filtering tools based on their position in the graph and local tool prefix.
   * @param allTools - A list of all tools available for the session.
   * @returns A filtered list of tools available for the active session.
   */
  public getToolsForActiveSession(allTools: any[]): any[] {
    let availableNodes: string[] = [];
    let isLastNodeInSubGraph = false;
    if (!this.activeSession.lastNode) {
      availableNodes = this.getStartingNodes();
    } else {
      availableNodes =
        this.activeSession?.pg?.graph?.[this.activeSession.lastNode] || [];
      isLastNodeInSubGraph =
        availableNodes.filter((an) => an !== this.activeSession.lastNode)
          .length === 0;
    }
    const filteredTools = allTools.filter(
      (tool) =>
        availableNodes.includes(tool.function.name) ||
        tool.function.name.startsWith(LOCAL_TOOL_PREFIX),
    );

    if (isLastNodeInSubGraph && this.pgOas.length !== 0) {
      filteredTools.push(...this.pgOas.map(createTool));
    }

    return filteredTools;
  }
}
