import dotenv from 'dotenv';
import { IOpenAIToolOutput, LLMProvider, XpanderClient } from '../src';

dotenv.config();

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';

const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.OPEN_AI,
);

describe('Test XPander Client', () => {
  let tools: IOpenAIToolOutput[] = xpanderClient.tools() as IOpenAIToolOutput[];

  beforeAll(() => {
    tools = xpanderClient.tools() as IOpenAIToolOutput[];
  });

  it('tools are not empty', () => {
    expect(tools).toBeInstanceOf(Array);
    expect(tools).not.toHaveLength(0);
  });
});
