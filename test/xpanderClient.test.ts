import dotenv from 'dotenv';
import { XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_API_KEY || '';
console.log(xpanderAPIKey);
const agentUrl =
  'https://inbound.xpander.ai/agent/e49a370d-a1a3-4f89-a9fb-a8aec1a8251e';
const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, 'openai');

test('openAIClient', () => {
  try {
    const xpanderToolsForOpenAI = xpanderClient.tools();
    console.log(
      'Retrieved tools:',
      JSON.stringify(xpanderToolsForOpenAI, null, 2),
    );
    expect(xpanderToolsForOpenAI.length).toBeGreaterThan(0);
  } catch (error) {
    console.error('Failed to retrieve tools:', error);
    throw error;
  }
}, 30000);
