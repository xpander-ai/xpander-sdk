import dotenv from 'dotenv';
import { XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (CRUD)', () => {
  it('Create Agent', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      organizationId,
    );

    // create agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.create('New Agent');
    announceTiming(startTime, 'Create & Get Agent');
    expect(agent).toHaveProperty('id');
  }, 3000000);

  it('Update Agent', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      organizationId,
    );

    // get the agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(
      'ef3ddd31-b2a3-4a1d-8c12-4f3cbee1f43b',
    );
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    // update agent
    startTime = getStartTime();
    agent.name = 'My agent Name';
    const newInstructions = {
      role: 'My Agent Role instructions',
      goal: 'My Agent Goal instructions',
      general: 'My Agent General instructions',
    };
    agent.instructions = {
      ...newInstructions,
    };
    const updatedAgent = agent.update();
    expect(updatedAgent.instructions.role).toEqual(newInstructions.role);
    announceTiming(startTime, 'Update Agent');
  }, 3000000);

  it('Deploy Agent', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      organizationId,
    );

    // get the agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(
      'ef3ddd31-b2a3-4a1d-8c12-4f3cbee1f43b',
    );
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    // deploy agent
    startTime = getStartTime();
    const deployedAgent = agent.sync();
    expect(deployedAgent.id).not.toBeNull();
    announceTiming(startTime, 'deploy Agent');
  }, 3000000);
});
