import request, { HttpVerb } from 'sync-request';
import { Agent } from './Agent';
import { CUSTOM_AGENT_ID } from '../../constants/xpanderClient';
import { AgentStatus, SourceNodeType } from '../../types/agents';
import { Configuration } from '../Configuration';
import { convertKeysToCamelCase } from '../utils';

/**
 * Manages a collection of Agent instances in xpanderAI, providing methods to list,
 * retrieve, and initialize specific agents including custom agents.
 */
export class Agents {
  /** Collection of Agent instances managed by this class. */
  public agentsList: Agent[] = [];

  constructor(public configuration: Configuration) {}

  /**
   * Retrieves the list of agents. If `refetch` is true, it re-fetches the list
   * from the API even if agents are already loaded.
   * @param refetch - If true, forces a re-fetch of the agent list from the API.
   * @returns Array of Agent instances.
   */
  public list(refetch: boolean = false): Agent[] {
    if (this.agentsList.length !== 0 && !refetch) {
      return this.agentsList;
    }
    try {
      let url = `${this.configuration.baseUrl}/agents/list`;
      if (this.configuration?.customParams?.organizationId) {
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

  /**
   * Retrieves an agent by ID and initializes it with the given source node type.
   * @param agentId - The ID of the agent to retrieve.
   * @param sourceNodeType - The source node type for the agent, default is SDK.
   * @returns The requested Agent instance.
   */
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
        false,
        [],
        [],
        [],
        false,
      );
      agent.load(sourceNodeType);
      return agent;
    } catch (err) {
      throw new Error('Failed to retrieve agent');
    }
  }

  /**
   * Retrieves the custom agent instance, initializing it with the given source node type.
   * @param sourceNodeType - The source node type for the custom agent, default is SDK.
   * @returns The custom Agent instance.
   */
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
      agent.sourceNodes = [
        {
          id: 'source-node-id',
          type: sourceNodeType,
          targets: [],
          pgSwitchAllowed: false,
          metadata: {},
        },
      ];
      return agent;
    } catch (err) {
      throw new Error('Failed to get custom agent');
    }
  }
}
