import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const openAIKey = process.env.OPENAI_API_KEY || '';
const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, 'openai');

describe('Testing OpenAI Function Calling', () => {
  const xpanderToolsForOpenAI = xpanderClient.tools();

  it('tool selection is correct', () => {
    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];

    const openaiClient = new OpenAI({
      apiKey: openAIKey,
    });

    const response = openaiClient.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: messages as any,
      tools: xpanderToolsForOpenAI as any,
      tool_choice: 'required',
    });

    // Simulate the response format
    const simulatedResponse = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                function: {
                  name: 'social-blogging-platform-Conduit-listTags',
                  arguments: '{}',
                },
                id: 'tool_call_id_1',
              },
            ],
          },
        },
      ],
    };

    const toolResponse = xpanderClient.xpanderToolCall(simulatedResponse);

    expect(toolResponse.length).toBeGreaterThan(0);
  });
});
