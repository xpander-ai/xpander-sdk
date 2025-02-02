import request, { HttpVerb } from 'sync-request';
import { Agent } from './Agent';
import { AgentAccessScope, AgentStatus, AgentType } from '../../types/agents';
import { MemoryStrategy, MemoryType } from '../../types/memory';
import { Configuration } from '../Configuration';
import { convertKeysToCamelCase } from '../utils';

/**
 * Manages a collection of Agent instances in xpanderAI, providing methods to list,
 * retrieve, and initialize agents, including custom agents.
 */
export class Agents {
  /** Collection of Agent instances managed by this class. */
  public agentsList: Agent[] = [];

  /**
   * Constructs an instance of the Agents manager.
   *
   * @param configuration - Configuration settings for managing agents.
   */
  constructor(public configuration: Configuration) {}

  /**
   * Retrieves the list of agents from the API and populates the local agents list.
   *
   * @returns An array of Agent instances.
   */
  public list(): Agent[] {
    try {
      const url = `${this.configuration.url}/agents/list`;
      const response = request('GET' as HttpVerb, url, {
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      this.agentsList =
        JSON.parse(response.getBody('utf8')).map((agent: any) => {
          const camelCasedAgent = convertKeysToCamelCase(agent);
          return new Agent(
            this.configuration,
            camelCasedAgent.id,
            camelCasedAgent.name,
            camelCasedAgent.organizationId,
            camelCasedAgent.status,
            camelCasedAgent.memoryType,
            camelCasedAgent.memoryStrategy,
            camelCasedAgent.enrichedInstructions,
            camelCasedAgent.accessScope,
            camelCasedAgent.sourceNodes,
            camelCasedAgent.enrichedPrompts,
            [],
            [],
          );
        }) || [];
      return this.agentsList;
    } catch (err) {
      throw new Error('Failed to retrieve agents list');
    }
  }

  /**
   * Retrieves a specific agent by its ID and initializes it.
   *
   * @param agentId - The unique identifier of the agent to retrieve.
   * @returns The requested Agent instance.
   */
  public get(agentId: string): Agent {
    try {
      const agent = new Agent(
        this.configuration,
        agentId,
        '',
        '',
        AgentStatus.ACTIVE,
        MemoryType.SHORT_TERM,
        MemoryStrategy.FULL,
        { role: '', general: '', goal: '' },
        AgentAccessScope.ORGANIZATIONAL,
        [],
        [],
        [],
        [],
      );
      agent.load();
      return agent;
    } catch (err) {
      throw new Error('Failed to retrieve agent');
    }
  }
  /**
   * @function create
   * @description Creates a new agent with the given name and type.
   * @param {string} name - The name of the agent to be created.
   * @param {AgentType} [type=AgentType.Regular] - The type of the agent, defaults to Regular.
   * @returns {Agent} The created agent's details.
   * @throws {Error} If the creation process fails.
   * @memberof xpanderAI
   */
  public create(name: string, type: AgentType = AgentType.REGULAR): Agent {
    try {
      const url = `${this.configuration.url}/agents-crud/tools/crud/create`;
      const response = request('POST' as HttpVerb, url, {
        json: { name, type },
        headers: { 'x-api-key': this.configuration.apiKey },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const createdAgent = JSON.parse(response.getBody('utf8'));
      return this.get(createdAgent.id);
    } catch (err: any) {
      throw new Error(`Failed to create agent - ${err.toString()}`);
    }
  }
}
