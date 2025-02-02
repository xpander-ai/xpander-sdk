import request, { HttpVerb } from 'sync-request';
import { AgentGraphItemType, IAgentGraphItemSettings } from '../../types';
import { Agent } from '../agents';
import { Base } from '../base';
import { convertKeysToCamelCase } from '../utils';

export class GraphItem extends Base {
  constructor(
    private agent: Agent,
    public id: string = '',
    public itemId: string,
    public name: string,
    public type: AgentGraphItemType = AgentGraphItemType.TOOL,
    public isLocalTool: boolean = false,
    public targets: string[] = [],
    public settings?: IAgentGraphItemSettings,
  ) {
    super();
  }

  public save() {
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

  // connect node to other nodes (edge in graph)
  public connect(targets: GraphItem[]): GraphItem {
    this.targets = this.targets || [];
    this.targets = [...new Set([...this.targets, ...targets.map((t) => t.id)])];
    return this.save();
  }
}
