import 'openai/shims/node';
import dotenv from 'dotenv';
import { GraphItem, XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const agentId = process.env.STG_INTERFACES_TEST_AGENT || '';
const xpanderAPIKey = process.env.STG_API_KEY || '';
const stgInbound = process.env.STG_INBOUND || '';

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (Interfaces)', () => {
  it('List available interfaces in the organization', async () => {
    const xpanderClient = new XpanderClient(xpanderAPIKey, stgInbound);

    // get the agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(agentId);
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    // list available interfaces
    startTime = getStartTime();
    const interfaces = agent.retrieveAgenticInterfaces();
    announceTiming(startTime, 'List interfaces');
    expect(interfaces.length).toBeGreaterThanOrEqual(1);
  }, 3000000);

  it('List available operations in interface', async () => {
    const xpanderClient = new XpanderClient(xpanderAPIKey, stgInbound);

    // get the agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(agentId);
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    // list available interfaces
    startTime = getStartTime();
    const interfaces = agent.retrieveAgenticInterfaces();
    announceTiming(startTime, 'List interfaces');
    expect(interfaces.length).toBeGreaterThanOrEqual(1);

    // find app 4
    const app4Interface = interfaces.find((inter) =>
      inter.name.match(/app4/gi),
    );
    expect(app4Interface).not.toBeNull();

    // list app 4 operations
    startTime = getStartTime();
    const operations = agent.retrieveAgenticOperations(app4Interface!);
    announceTiming(startTime, 'List operations in interface (App4)');
    expect(operations.length).toBeGreaterThanOrEqual(1);
  }, 3000000);

  it('Add 2 operations to agent', async () => {
    const xpanderClient = new XpanderClient(xpanderAPIKey, stgInbound);

    // get the agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(agentId);
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    // list available interfaces
    startTime = getStartTime();
    const interfaces = agent.retrieveAgenticInterfaces();
    announceTiming(startTime, 'List interfaces');
    expect(interfaces.length).toBeGreaterThanOrEqual(1);

    // find app 4
    const app4Interface = interfaces.find((inter) =>
      inter.name.match(/app4/gi),
    );
    expect(app4Interface).not.toBeNull();

    // list app 4 operations
    startTime = getStartTime();
    const operations = agent.retrieveAgenticOperations(app4Interface!);
    announceTiming(startTime, 'List operations in interface (App4)');
    expect(operations.length).toBeGreaterThanOrEqual(1);

    // find 2 operations (get tags and articles)
    const operationsToAdd = operations.filter(
      (op) =>
        op.method === 'get' && (op.path === '/tags' || op.path === '/articles'),
    );

    expect(operationsToAdd.length).toEqual(2);

    // attach the operations
    startTime = getStartTime();
    agent.attachOperations(operationsToAdd);
    announceTiming(startTime, 'Attach operations');

    startTime = getStartTime();
    agent.sync();
    announceTiming(startTime, 'Sync Agent');
  }, 3000000);

  it('Add 2 operations to agent & graph', async () => {
    const xpanderClient = new XpanderClient(xpanderAPIKey, stgInbound);

    // get the agent
    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(agentId);
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    // list available interfaces
    startTime = getStartTime();
    const interfaces = agent.retrieveAgenticInterfaces();
    announceTiming(startTime, 'List interfaces');
    expect(interfaces.length).toBeGreaterThanOrEqual(1);

    // find app 4
    const app4Interface = interfaces.find((inter) =>
      inter.name.match(/app4/gi),
    );
    expect(app4Interface).not.toBeNull();

    // list app 4 operations
    startTime = getStartTime();
    const operations = agent.retrieveAgenticOperations(app4Interface!);
    announceTiming(startTime, 'List operations in interface (App4)');
    expect(operations.length).toBeGreaterThanOrEqual(1);

    // find 2 operations (get tags and articles)
    const operationsToAdd = operations.filter(
      (op) =>
        op.method === 'get' && (op.path === '/tags' || op.path === '/articles'),
    );

    expect(operationsToAdd.length).toEqual(2);

    // attach the operations
    startTime = getStartTime();
    agent.attachOperations(operationsToAdd);
    announceTiming(startTime, 'Attach operations');

    const getTagsOperation = operationsToAdd.find((op) => op.path === '/tags');
    const getArticlesOperation = operationsToAdd.find(
      (op) => op.path === '/articles',
    );

    // add getTags node
    startTime = getStartTime();
    const getTagsNode = agent.graph.addNode(
      new GraphItem(
        agent,
        '',
        getTagsOperation?.idToUseOnGraph,
        getTagsOperation?.name,
      ),
    );

    announceTiming(startTime, 'Add get tags node');

    // add getArticles node
    startTime = getStartTime();
    const getArticlesNode = agent.graph.addNode(
      new GraphItem(
        agent,
        '',
        getArticlesOperation?.idToUseOnGraph,
        getTagsOperation?.name,
      ),
    );
    announceTiming(startTime, 'Add get articles node');

    startTime = getStartTime();
    getTagsNode.connect([getArticlesNode]);
    announceTiming(startTime, 'Connect getTags and getArticles on the graph');

    startTime = getStartTime();
    agent.sync();
    announceTiming(startTime, 'Sync Agent');

    console.log(agent);
  }, 3000000);
});
