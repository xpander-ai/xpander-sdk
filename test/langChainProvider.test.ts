import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import { LLMProvider, XpanderClient } from '../src';

dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const openAIKey = process.env.OPENAI_API_KEY || '';

const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.LANG_CHAIN,
);

describe('Testing LangChain Function Calling', () => {
  const xpanderToolsForLangChain = xpanderClient.tools();

  it('tools not empty', async () => {
    expect(xpanderToolsForLangChain).toBeInstanceOf(Array);
    expect(xpanderToolsForLangChain).not.toHaveLength(0);
  });

  it('tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTags';

    const llm = new ChatOpenAI({
      model: 'gpt-4o',
      temperature: 0,
      apiKey: openAIKey,
    });

    const response: any = await llm.invoke('get all tags', {
      tools: xpanderToolsForLangChain,
    });

    expect(response.tool_calls[0].name).toEqual(TOOL_NAME);

    const toolResponse = xpanderClient.xpanderToolCall(response);
    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
    expect(toolResponse[0].payloadRequest).toEqual('{}'); // check payload request stringified
  });

  it('tool selection is correct with payload', async () => {
    const TOOL_NAME = 'Conduit-article-management-createNewArticle';

    const llm = new ChatOpenAI({
      model: 'gpt-4o',
      temperature: 0,
      apiKey: openAIKey,
    });

    const response: any = await llm.invoke(
      'create new article with title=test_title, body=test_body',
      {
        tools: xpanderToolsForLangChain,
      },
    );

    expect(response.tool_calls[0].name).toEqual(TOOL_NAME);

    const toolResponse = xpanderClient.xpanderToolCall(response);
    expect(toolResponse.length).toBeGreaterThan(0); // check that we've got tool responses
    const payloadRequest = JSON.parse(toolResponse[0].payloadRequest);

    expect(payloadRequest).toEqual(
      expect.objectContaining({
        body_params: expect.objectContaining({
          article: expect.objectContaining({
            title: 'test_title',
            body: 'test_body',
          }),
        }),
      }),
    );
  });
});
