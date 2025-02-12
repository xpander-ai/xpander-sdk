import request, { HttpVerb } from 'sync-request';
import { AgentGraphItemType } from '../../types';
import { Agent } from '../agents';
import { Base } from '../base';
import { convertKeysToCamelCase } from '../utils';

/**
 * Represents a single item (node) in an agent's graph structure.
 *
 * @class GraphItem
 * @extends {Base}
 *
 * @param {Agent} agent - The agent associated with this graph item.
 * @param {string} id - The unique identifier for the graph item.
 * @param {string} itemId - The associated item ID of the graph item.
 * @param {string} name - The name of the graph item.
 * @param {AgentGraphItemType} type - The type of the graph item (e.g., TOOL or AGENT).
 * @param {boolean} isLocalTool - Indicates if the graph item is a local tool.
 * @param {string[]} targets - The list of target node IDs connected to this graph item.
 * @param {IAgentGraphItemSettings} [settings] - Additional settings for the graph item.
 *
 * @memberof xpander.ai
 */
export class GraphItem extends Base {
  constructor(
    private agent: Agent,
    public id: string = '',
    public itemId: string = '',
    public name: string = '',
    public type: AgentGraphItemType = AgentGraphItemType.TOOL,
    public isLocalTool: boolean = false,
    public targets: string[] = [],
    public settings?: any,
  ) {
    super();
  }

  /**
   * Saves the current graph item state to the server.
   *
   * @returns {GraphItem} The updated graph item after saving.
   * @throws {Error} If saving the graph item fails.
   */
  public save(): GraphItem {
    try {
      const payload: any = {
        agent_id: this.agent.id,
        graph_item_id: this.id,
        item_id: this.itemId,
        name: this.name,
        type: this.type,
        targets: this.targets || [],
      };
      const url = `${this.agent.configuration.url}/agents-crud/tools/graph/update`;
      const response = request('PATCH' as HttpVerb, url, {
        json: payload,
        headers: { 'x-api-key': this.agent.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const updatedAgent = JSON.parse(response.getBody('utf8'));
      const updatedNode = updatedAgent.graph.find(
        (gi: any) => gi.id === this.id,
      );
      return this.from(convertKeysToCamelCase(updatedNode));
    } catch (err) {
      throw new Error('Failed to save node');
    }
  }

  /**
   * Connects this graph item to other graph items, creating edges in the graph.
   *
   * @param {GraphItem[]} targets - The target graph items to connect to.
   * @returns {GraphItem} The updated graph item after establishing connections.
   */
  public connect(targets: GraphItem[]): GraphItem {
    this.targets = this.targets || [];
    this.targets = [...new Set([...this.targets, ...targets.map((t) => t.id)])];
    return this.save();
  }
}
