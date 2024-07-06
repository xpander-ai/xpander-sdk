import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_API_KEY || '';
const agentUrl = 'https://inbound.xpander.ai/agent/e4ae74cf-e31c-450b-97f2-51f1734d0377';
const openAPIKey = process.env.OPENAI_API_KEY || '';
const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, 'openai');

test('openAIClient', () => {
  try {
    const xpanderToolsForOpenAI = xpanderClient.tools();
    console.log('Retrieved tools:', JSON.stringify(xpanderToolsForOpenAI, null, 2));
    expect(xpanderToolsForOpenAI.length).toBeGreaterThan(0);
  } catch (error) {
    console.error('Failed to retrieve tools:', error);
    throw error;
  }
}, 30000);

test('openAI_Function_calling', () => {
  try {
    const xpanderToolsForOpenAI = xpanderClient.tools();
    console.log('Retrieved tools for function calling:', JSON.stringify(xpanderToolsForOpenAI, null, 2));

    const messages = [
      {
        role: 'user',
        content: 'Add page about Unicorns in Content DB',
      },
    ];

    const openaiClient = new OpenAI({
      apiKey: openAPIKey,
    });

    const response = openaiClient.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: messages as any,
      tools: xpanderToolsForOpenAI as any,
      tool_choice: 'required',
    });

    console.log('OpenAI response:', response);

    // Simulate the response format
    const simulatedResponse = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                function: { name: 'createPage', arguments: '{}' },
                id: 'tool_call_id_1',
              },
            ],
          },
        },
      ],
    };

    const toolResponse = xpanderClient.xpanderToolCall(simulatedResponse);
    console.log('Tool response:', JSON.stringify(toolResponse, null, 2));

    expect(toolResponse.length).toBeGreaterThan(0);
  } catch (error) {
    console.error('Failed to call function:', error);
    throw error;
  }
}, 30000);