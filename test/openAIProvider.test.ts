import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { LLMProvider, XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const openAIKey = process.env.OPENAI_API_KEY || '';
const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.OPEN_AI,
);

describe('Testing OpenAI Function Calling', () => {
  const xpanderToolsForOpenAI = xpanderClient.tools();

  it('tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTagsForArticles';
    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];

    const openaiClient = new OpenAI({
      apiKey: openAIKey,
    });

    const response: any = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: messages as any,
      tools: xpanderToolsForOpenAI as any,
      tool_choice: 'required',
    });

    expect(response.choices[0].message.tool_calls[0].function.name).toEqual(
      TOOL_NAME,
    );

    const toolResponse = xpanderClient.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0);
  });
});
