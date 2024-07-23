import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { LLMProvider, XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const nvidiaNIMKEy = process.env.NVIDIA_NIM_API_KEY || '';
const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.NVIDIA_NIM,
);

describe('Testing Nvidia NIM Function Calling', () => {
  const xpanderToolsForNvidiaNim = xpanderClient.stringifiedTools();

  it('tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTagsForArticles';

    const openaiClient = new OpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: nvidiaNIMKEy,
    });

    const messages = xpanderClient.getLLMMessagesPayload(
      xpanderToolsForNvidiaNim,
      'get all tags',
    );

    const response: any = await openaiClient.chat.completions.create({
      model: 'meta/llama3-70b-instruct',
      messages: messages as any,
    });

    const tools = xpanderClient.getToolFromLLMResponse(response);

    expect(tools?.length).toBeGreaterThan(0);
    expect(tools?.[0]?.toolId).toEqual(TOOL_NAME);

    const toolResponse = xpanderClient.xpanderToolCall(tools);

    expect(toolResponse.length).toBeGreaterThan(0);
  }, 15000);

  it('2nd tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-createNewArticleWithTags';

    // TODO SET THE TOOLS AS SYSTEM
    const messages = xpanderClient.getLLMMessagesPayload(
      xpanderToolsForNvidiaNim,
      'create dummy article',
    );

    const openaiClient = new OpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: nvidiaNIMKEy,
    });

    const response: any = await openaiClient.chat.completions.create({
      model: 'meta/llama3-70b-instruct',
      messages: messages as any,
    });

    const tools = xpanderClient.getToolFromLLMResponse(response);

    expect(tools?.length).toBeGreaterThan(0);
    expect(tools?.[0]?.toolId).toEqual(TOOL_NAME);
    expect(tools?.[0]?.payload).toHaveProperty('body_params');
    expect(tools?.[0]?.payload?.body_params).toHaveProperty('article');
  }, 15000);
});
