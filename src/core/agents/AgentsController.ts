import request, { HttpVerb } from 'sync-request';
import { Agent } from './Agent';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';
import { AgentStatus, SourceNodeType } from '../../types/agents';
import { Configuration } from '../Configuration';
import { convertKeysToCamelCase } from '../utils';

export class Agents {
  public agentsList: Agent[] = [];
  constructor(public configuration: Configuration) {}

  public list(refetch: boolean = false): Agent[] {
    if (this.agentsList.length !== 0 && !refetch) {
      return this.agentsList;
    }
    try {
      let url = `${this.configuration.baseUrl}/agents/list`;
      if (!!this.configuration?.customParams?.organizationId) {
        url += `/${this.configuration.customParams.organizationId}`;
      }
      const response = request('GET' as HttpVerb, url, {
        headers: { 'x-api-key': this.configuration.apiKey },
      });
      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      this.agentsList =
        JSON.parse(response.getBody('utf8')).map((agent: any) => {
          agent = convertKeysToCamelCase(agent);
          return new Agent(
            this.configuration,
            agent.id,
            agent.organizationId,
            agent.status,
            agent.name,
            agent.sourceNodes,
            false,
            [],
            [],
            [],
            false,
          );
        }) || [];
      return this.agentsList;
    } catch (err) {
      throw new Error('Failed to retrieve agents list');
    }
  }

  public get(
    agentId: string,
    sourceNodeType: SourceNodeType = SourceNodeType.SDK,
  ): Agent {
    try {
      const agent = new Agent(
        this.configuration,
        agentId,
        '',
        AgentStatus.ACTIVE,
        '',
        [],
      );
      agent.load(sourceNodeType);
      return agent;
    } catch (err) {
      throw new Error('Failed to retrieve agent');
    }
  }

  public getCustomAgent(
    sourceNodeType: SourceNodeType = SourceNodeType.SDK,
  ): Agent {
    try {
      const agent = new Agent(
        this.configuration,
        CUSTOM_AGENT_ID,
        '',
        AgentStatus.ACTIVE,
        '',
        [],
      );
      agent.load(sourceNodeType);
      return agent;
    } catch (err) {
      throw new Error('Failed to get custom agent');
    }
  }
}
