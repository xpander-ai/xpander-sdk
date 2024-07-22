import dotenv from 'dotenv';
import { ITool, XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, 'openai');

describe('Test XPander Client', () => {
  let tools: ITool[] = xpanderClient.tools();

  beforeAll(() => {
    tools = xpanderClient.tools();
  });

  it('tools are not empty', () => {
    expect(tools).toBeInstanceOf(Array);
    expect(tools).not.toHaveLength(0);
  });
});
