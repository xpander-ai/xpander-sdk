import request, { HttpVerb } from 'sync-request';
import { AgentGraphItemSubType, AgentGraphItemType } from '../../types';
import { Agent } from '../agents';
import { Base } from '../base';
import { GraphItem } from './GraphItem';
import CacheService from '../CacheService';

export class Graph extends Base {
  constructor(
    private agent: Agent,
    private items: GraphItem[],
  ) {
    super();
  }

  public findNodeByItemId(itemId: string): GraphItem | undefined {
    return this.items.find((gi) => gi.itemId === itemId);
  }

  public findNodeByNodeId(nodeId: string): GraphItem | undefined {
    return this.items.find((gi) => gi.id === nodeId);
  }

  public get nodes() {
    return this.items || [];
  }

  public get isEmpty() {
    return this.items.length === 0;
  }

  public get lastNode(): GraphItem | undefined {
    if (!this.items || this.items.length === 0) {
      return;
    }
    return this.items[this.items.length - 1];
  }

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

  public reset() {
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
      this.items = []; // reset graph
      this.agent.load(this.agent.id); // reload the agent
    } catch (err) {
      throw new Error('Failed to reset agent graph');
    }
  }
}
