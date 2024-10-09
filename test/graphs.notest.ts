import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { LLMProvider, OpenAISupportedModels, XpanderClient } from '../src';

dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const openAIKey = process.env.OPENAI_API_KEY || '';

const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.OPEN_AI,
);

describe('Testing OpenAI Function Calling with Graphs', () => {
  it('tool selection with graphs - with matched prompt group', async () => {
    const userPrompt = 'get all tags and then latest article please';
    const messages = [
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    const openaiClient = new OpenAI({
      apiKey: openAIKey,
    });

    xpanderClient.startSession(userPrompt);

    const iterations = [
      'Conduit-article-management-getAllTags',
      'Conduit-article-management-retrieveArticlesWithOptionalFilters',
    ];

    // test 2 graph iterations
    for (const requiredTool of iterations) {
      const tools = xpanderClient.tools();

      // required tool exists
      expect(tools.some((tool) => tool.function.name === requiredTool)).toBe(
        true,
      );

      const response: any = await openaiClient.chat.completions.create({
        model: OpenAISupportedModels.GPT_4_O,
        messages: messages as any,
        tools: tools as any,
        tool_choice: 'required',
        temperature: 0,
      });

      expect(
        response.choices[0].message.tool_calls.some(
          (tc: any) => tc.function.name === requiredTool,
        ),
      ).toBe(true);

      const toolResponse = xpanderClient.xpanderToolCall(response);

      expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
      expect(typeof toolResponse[0].toolCallId).toBe('string'); // check that response has correct id

      messages.push({
        role: 'user',
        content: `tool=${toolResponse[0].toolCallId} result = ${toolResponse[0].rawResponse}`,
      });
    }
  }, 20000);

  it('tool selection with graphs - with no matched prompt group BUT with allow all', async () => {
    const userPrompt = 'get articles';
    const messages = [
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    const openaiClient = new OpenAI({
      apiKey: openAIKey,
    });

    xpanderClient.startSession(userPrompt);

    const iterations = [
      'Conduit-article-management-retrieveArticlesWithOptionalFilters',
    ];

    // test 2 graph iterations
    for (const requiredTool of iterations) {
      const tools = xpanderClient.tools();

      // required tool exists
      expect(tools.some((tool) => tool.function.name === requiredTool)).toBe(
        true,
      );

      const response: any = await openaiClient.chat.completions.create({
        model: OpenAISupportedModels.GPT_4_O,
        messages: messages as any,
        tools: tools as any,
        tool_choice: 'required',
        temperature: 0,
      });

      expect(
        response.choices[0].message.tool_calls.some(
          (tc: any) => tc.function.name === requiredTool,
        ),
      ).toBe(true);

      const toolResponse = xpanderClient.xpanderToolCall(response);

      expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
      expect(typeof toolResponse[0].toolCallId).toBe('string'); // check that response has correct id

      messages.push({
        role: 'user',
        content: `tool=${toolResponse[0].toolCallId} result = ${toolResponse[0].rawResponse}`,
      });
    }
  }, 20000);
});
