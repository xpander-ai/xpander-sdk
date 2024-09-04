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

describe('Testing OpenAI Function Calling', () => {
  const xpanderToolsForOpenAI = xpanderClient.tools();

  it('tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTags';
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
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: xpanderToolsForOpenAI as any,
      tool_choice: 'required',
    });

    expect(response.choices[0].message.tool_calls[0].function.name).toEqual(
      TOOL_NAME,
    );

    const toolResponse = xpanderClient.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
    expect(toolResponse[0].payloadRequest).toEqual('{}'); // check payload request stringified
    expect(typeof toolResponse[0].toolCallId).toBe('string'); // check that response has correct id
  });

  it('tool selection is correct with tools in constructor', async () => {
    const tools = [
      {
        type: 'function',
        function: {
          name: 'Conduit-article-management-getAllTags',
          description:
            'Retrieves all tags used in articles. No authentication required. Use to display tag clouds or 4 filtering articles by tag in retrieveArticlesWithOptionalFilters. Helps other operations by providing valid tag options. IMPORTANT! make sure to use body_params, query_params, path_params. these are crucial for ensuring function calling works!',
        },
      },
    ];

    const xpanderClient2 = new XpanderClient(
      xpanderAPIKey,
      agentUrl,
      LLMProvider.OPEN_AI,
      undefined,
      tools,
    );
    const TOOL_NAME = 'Conduit-article-management-getAllTags';
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
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: xpanderToolsForOpenAI as any,
      tool_choice: 'required',
    });

    expect(response.choices[0].message.tool_calls[0].function.name).toEqual(
      TOOL_NAME,
    );

    const toolResponse = xpanderClient2.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
    expect(toolResponse[0].payloadRequest).toEqual('{}'); // check payload request stringified
  });

  it('local tool selection is correct', async () => {
    const messages = [
      {
        role: 'user',
        content: 'Say hello to David',
      },
    ];

    const localTools: any = [
      {
        type: 'function',
        function: {
          name: 'greet-by-name',
          description: 'Returns a greet to a user with name',
          parameters: {
            type: 'object',
            properties: {
              userName: {
                type: 'string',
                description: "The user's name",
              },
            },
            required: ['userName'],
            additionalProperties: false,
          },
        },
      },
    ];

    xpanderClient.addLocalTools(localTools);
    const tools = xpanderClient.tools();

    const openaiClient = new OpenAI({
      apiKey: openAIKey,
    });

    const response: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: tools as any,
      tool_choice: 'required',
    });

    expect(response.choices[0].message.tool_calls[0].function.name).toEqual(
      localTools[0].function.name,
    );

    const toolResponse = xpanderClient.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
    expect(toolResponse[0].localTool?.function.name).toEqual(
      localTools[0].function.name,
    ); // check payload request stringified
    expect(toolResponse[0].payloadRequest).toEqual('{"userName":"David"}'); // check payload request stringified
  });

  it('local tool & xpander tool selection is correct', async () => {
    const XPANDER_TOOL_NAME = 'Conduit-article-management-getAllTags';

    const messages = [
      {
        role: 'user',
        content: 'get all tags, Say hello to David',
      },
    ];

    const localTools: any = [
      {
        type: 'function',
        function: {
          name: 'greet-by-name',
          description: 'Returns a greet to a user with name',
          parameters: {
            type: 'object',
            properties: {
              userName: {
                type: 'string',
                description: "The user's name",
              },
            },
            required: ['userName'],
            additionalProperties: false,
          },
        },
      },
    ];

    xpanderClient.addLocalTools(localTools);
    const tools = xpanderClient.tools();

    const openaiClient = new OpenAI({
      apiKey: openAIKey,
    });

    const response: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: tools as any,
      tool_choice: 'required',
    });

    const toolCalls = response.choices[0].message.tool_calls;

    expect(toolCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          function: expect.objectContaining({ name: XPANDER_TOOL_NAME }),
        }),
      ]),
    );

    expect(toolCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          function: expect.objectContaining({
            name: localTools[0].function.name,
          }),
        }),
      ]),
    );

    const toolResponse = xpanderClient.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses

    // match xpander tools
    expect(toolResponse).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          filteredTool: expect.arrayContaining([
            expect.objectContaining({
              function: expect.objectContaining({ name: XPANDER_TOOL_NAME }),
            }),
          ]),
        }),
      ]),
    );

    //match local function calling
    expect(toolResponse).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          localTool: expect.objectContaining({
            function: expect.objectContaining({
              name: localTools[0].function.name,
            }),
          }),
          payloadRequest: '{"userName":"David"}',
        }),
      ]),
    );
  });

  it('invoke tool directly', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTags';

    const toolResponse = xpanderClient.xpanderSingleToolInvoke(TOOL_NAME);

    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
  });
});
