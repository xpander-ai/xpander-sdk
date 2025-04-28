import 'openai/shims/node';
import dotenv from 'dotenv';
import { AgentGraphItemType, XpanderClient } from '../src';
import { GraphItem } from '../src/core/graphs';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (GRAPHS)', () => {
  it('Create Graph Item', async () => {
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

    // create graph item
    const graph = agent.graph;
    startTime = getStartTime();
    const addedNode = graph.addNode(
      new GraphItem(agent, '', 'my function', 'test2'),
    );
    announceTiming(startTime, 'Add graph item');
    expect(addedNode.id.length).toBeGreaterThanOrEqual(1);

    // sync
    startTime = getStartTime();
    agent.sync();
    announceTiming(startTime, 'Sync Agent');
    expect(agent.graph.findNodeByNodeId(addedNode.id)).not.toBeNull();
  }, 3000000);

  it('Update Graph Item', async () => {
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

    // update graph item
    const graph = agent.graph;
    const graphItem = graph.lastNode!; // take last

    startTime = getStartTime();
    graphItem.name = 'Hello world';
    const updatedNode = graphItem.save();
    announceTiming(startTime, 'Save graph item');
    expect(updatedNode.id.length).toBeGreaterThanOrEqual(1);

    // sync
    startTime = getStartTime();
    agent.sync();
    announceTiming(startTime, 'Sync Agent');
    expect(agent.graph.findNodeByNodeId(updatedNode.id)!.name).toEqual(
      graphItem.name,
    );
  }, 3000000);

  it('Connect Graph Items', async () => {
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

    // create graph items
    const graph = agent.graph;

    // item 1
    startTime = getStartTime();
    const nodeA = graph.addNode(new GraphItem(agent, '', 'node A', 'node A'));
    expect(nodeA.id.length).toBeGreaterThanOrEqual(1);
    announceTiming(startTime, 'Save graph item');

    // item 2
    startTime = getStartTime();
    const nodeB = graph.addNode(new GraphItem(agent, '', 'node B', 'node B'));
    expect(nodeA.id.length).toBeGreaterThanOrEqual(1);
    announceTiming(startTime, 'Save graph item');

    // item 3
    startTime = getStartTime();
    const nodeC = graph.addNode(new GraphItem(agent, '', 'node C', 'node C'));
    expect(nodeA.id.length).toBeGreaterThanOrEqual(1);
    announceTiming(startTime, 'Save graph item');

    // connections
    startTime = getStartTime();
    nodeA.connect([nodeB]);
    announceTiming(startTime, 'Connect A -> B');
    startTime = getStartTime();
    nodeB.connect([nodeB, nodeC]);
    announceTiming(startTime, 'Connect B -> B & C');
    startTime = getStartTime();
    nodeC.connect([nodeB]);
    announceTiming(startTime, 'Connect C -> B');

    // sync
    startTime = getStartTime();
    agent.sync();
    announceTiming(startTime, 'Sync Agent');

    const giNodeA = agent.graph.findNodeByItemId('node A')!;
    const giNodeB = agent.graph.findNodeByItemId('node B')!;
    const giNodeC = agent.graph.findNodeByItemId('node C')!;

    expect(giNodeA?.targets).toContain(giNodeB.id); // A -> B
    expect(giNodeB?.targets).toContain(giNodeB.id); // B -> C
    expect(giNodeB?.targets).toContain(giNodeC.id); // B -> B
    expect(giNodeC?.targets).toContain(giNodeB.id); // C -> B
  }, 3000000);

  it.only('Create Graph Item (Local Function)', async () => {
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

    // create graph item
    const graph = agent.graph;
    startTime = getStartTime();
    const addedNode = graph.addNode(
      new GraphItem(agent, '', 'greet', 'greet', AgentGraphItemType.TOOL, true),
    );
    announceTiming(startTime, 'Add graph item');
    expect(addedNode.id.length).toBeGreaterThanOrEqual(1);

    // sync
    startTime = getStartTime();
    agent.sync();
    announceTiming(startTime, 'Sync Agent');
    expect(agent.graph.findNodeByNodeId(addedNode.id)).not.toBeNull();
  }, 3000000);
});
