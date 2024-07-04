import { LLMProvider, XpanderClient } from '../src';

test('client', async () => {
  const client = new XpanderClient('45C5SMkWBy879rS8kYXyea1gAoazuDTIaHn2gtYq', 'https://inbound.xpander.ai/agent/e4ae74cf-e31c-450b-97f2-51f1734d0377');

  // Retrieve tools from the real API
  try {
    await client.retrieveAgentTools();
    const tools = await client.tools(LLMProvider.OPEN_AI);

    // Check that tools array is not empty and contains at least one function
    expect(tools.length).toBeGreaterThan(0);
  } catch (error) {
    console.error('Failed to retrieve tools:', error);
    throw error;
  }
}, 30000); // Set timeout to 30 seconds (30000 ms)