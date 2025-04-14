import { Agent } from '.';
import { AgentStatus } from '../../types';
import { Base } from '../base';
import { Configuration } from '../Configuration';

/**
 * Represents an unloaded agent in the xpander.ai system.
 * Used to reference agents that are not yet fully loaded.
 */
export class UnloadedAgent extends Base {
  /**
   * Creates a new UnloadedAgent instance.
   *
   * @param configuration - The configuration instance used for loading the agent.
   * @param id - The unique identifier of the agent.
   * @param name - The name of the agent.
   * @param status - The current status of the agent.
   * @param organizationId - The ID of the organization to which the agent belongs.
   */
  constructor(
    private configuration: Configuration,
    public id: string,
    public name: string,
    public status: AgentStatus,
    public organizationId: string,
  ) {
    super();
  }

  /**
   * Loads the full Agent instance from the xpander.ai system using its ID.
   *
   * @returns The fully loaded Agent instance.
   */
  public load(): Agent {
    return Agent.getById(this.configuration, this.id);
  }
}
