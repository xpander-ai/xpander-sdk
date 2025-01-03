import dotenv from 'dotenv';
import { XpanderClient, IXpanderClientCustomParams, LLMProvider } from '../src';
import {
  CUSTOM_AGENT_ID,
  DEFAULT_BASE_URL,
} from '../src/constants/xpanderClient';
import { SourceNodeType } from '../src/types/agents';

dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';
const agentsServiceURL = process.env.AGENT_SERVICE_URL || '';
const inboundStgURL = process.env.INBOUND_STG || '';
const organizationId = process.env.ORGANIZATION_ID || ''; // only when working with agents service locally!

const customParams: IXpanderClientCustomParams = { organizationId };

describe('Test XPander Client', () => {
  it('client initiated', () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    expect(xpanderClient.configuration.apiKey).toEqual(xpanderAPIKey);
    expect(xpanderClient.configuration.baseUrl).toEqual(DEFAULT_BASE_URL);
  });

  it('client initiated - different base url', () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    expect(xpanderClient.configuration.apiKey).toEqual(xpanderAPIKey);
    expect(xpanderClient.configuration.baseUrl).toEqual(agentsServiceURL);
  });

  it('get agent list', () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agents = xpanderClient.agents.list();
    expect(agents.length).toBeGreaterThan(0);
  });

  it('get agent by id', () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.organizationId.length).toBeGreaterThan(10);
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);
    expect(agent.pgOas.length).toBeGreaterThanOrEqual(1);
    expect(agent.graphs.length).toBeGreaterThanOrEqual(1);
  });

  it("get all the agent's tools by agent id", () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.organizationId.length).toBeGreaterThan(10);
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);
    expect(agent.pgOas.length).toBeGreaterThanOrEqual(1);
    expect(agent.graphs.length).toBeGreaterThanOrEqual(1);
    expect(
      agent.getTools(LLMProvider.OPEN_AI, true).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('get custom agent - for chat i.e', () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
      {
        ...customParams,
        connectors: [
          {
            id: '178c1d77-58c0-457a-8ed5-acd614b8bfd1',
            operation_ids: [
              '66c1d2c986be0770d862eed4',
              '66c1d2c986be0770d862eee2',
            ],
          },
        ],
      },
    );
    const agent = xpanderClient.agents.getCustomAgent(SourceNodeType.SDK);
    expect(agent.id).toEqual(CUSTOM_AGENT_ID);
    expect(agent.organizationId.length).toBeGreaterThan(10);
    expect(agent.tools.length).toEqual(2);
  });
});
