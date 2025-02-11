import request, { HttpVerb } from 'sync-request';
import { AgentGraphItemSubType, AgentGraphItemType } from '../../types';
import { Agent } from '../agents';
import { Base } from '../base';
import { GraphItem } from './GraphItem';
import CacheService from '../CacheService';

/**
 * Represents a graph structure containing nodes related to an agent.
 *
 * @class Graph
 * @extends {Base}
 *
 * @param {Agent} agent - The agent associated with this graph.
 * @param {GraphItem[]} items - The list of graph items (nodes).
 *
 * @memberof xpander.ai
 */
export class Graph extends Base {
  constructor(
    private agent: Agent,
    private items: GraphItem[],
  ) {
    super();
  }

  /**
   * Finds a node in the graph by its item ID.
   *
   * @param {string} itemId - The item ID to search for.
   * @returns {GraphItem | undefined} The found graph item or undefined if not found.
   */
  public findNodeByItemId(itemId: string): GraphItem | undefined {
    return this.items.find((gi) => gi.itemId === itemId);
  }

  /**
   * Finds a node in the graph by its node ID.
   *
   * @param {string} nodeId - The node ID to search for.
   * @returns {GraphItem | undefined} The found graph item or undefined if not found.
   */
  public findNodeByNodeId(nodeId: string): GraphItem | undefined {
    return this.items.find((gi) => gi.id === nodeId);
  }

  /**
   * Gets the list of nodes in the graph.
   *
   * @returns {GraphItem[]} The list of graph items.
   */
  public get nodes(): GraphItem[] {
    return this.items || [];
  }

  /**
   * Checks whether the graph is empty.
   *
   * @returns {boolean} True if the graph is empty, false otherwise.
   */
  public get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Gets the last node in the graph.
   *
   * @returns {GraphItem | undefined} The last graph item or undefined if the graph is empty.
   */
  public get lastNode(): GraphItem | undefined {
    if (!this.items || this.items.length === 0) {
      return;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Adds a new node to the graph.
   *
   * @param {Agent | GraphItem} node - The node to add, which can be an agent or a graph item.
   * @returns {GraphItem} The newly added graph item.
   * @throws {Error} If adding the node fails.
   */
  public addNode(node: Agent | GraphItem): GraphItem {
    try {
      const isAgent = node instanceof Agent;
      const payload: any = {
        agent_id: this.agent.id,
        operation_id: isAgent ? node.id : node.itemId,
        name: node.name,
        type: isAgent ? AgentGraphItemType.AGENT : AgentGraphItemType.TOOL,
        targets: [],
      };

      if (!isAgent) {
        payload.is_local_tool = node.isLocalTool;
      }

      const url = `${this.agent.configuration.url}/agents-crud/tools/graph/add`;
      const response = request('POST' as HttpVerb, url, {
        json: payload,
        headers: { 'x-api-key': this.agent.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const updatedAgent = JSON.parse(response.getBody('utf8'));
      const lastNode = updatedAgent.graph[updatedAgent.graph.length - 1];

      const gi = new GraphItem(
        this.agent,
        lastNode.id,
        lastNode.item_id,
        lastNode.name,
        lastNode.type,
        lastNode.subType === AgentGraphItemSubType.LOCAL_TOOL,
        lastNode.targets,
        lastNode.settings,
      );
      this.items.push(gi);
      return gi;
    } catch (err) {
      throw new Error('Failed to add graph item');
    }
  }

  /**
   * Resets the graph for the associated agent.
   *
   * @throws {Error} If resetting the graph fails.
   */
  public reset(): void {
    try {
      const url = `${this.agent.configuration.url}/agents-crud/tools/crud/update`;
      const response = request('PATCH' as HttpVerb, url, {
        json: {
          agent_id: this.agent.id,
          should_reset_graph: true,
        },
        headers: { 'x-api-key': this.agent.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      CacheService.getInstance().delete(this.agent.id);
      this.items = []; // Reset graph
      this.agent.load(this.agent.id); // Reload the agent
    } catch (err) {
      throw new Error('Failed to reset agent graph');
    }
  }

  public get rootNode(): GraphItem | undefined {
    return this.items.find(
      (gi) => this.items.every((item) => !item.targets.includes(gi.id)), // Not targeted by others
    );
  }
}
