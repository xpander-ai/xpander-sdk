import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { LLMProvider, XpanderClient } from '../src';

dotenv.config();
const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const nvidiaNIMKey = process.env.NVIDIA_NIM_API_KEY || '';
const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.NVIDIA_NIM,
);

describe('Testing NvidiaNIM Function Calling', () => {
  const xpanderToolsForNvidiaNIM = xpanderClient.tools();

  it('tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTagsForArticles';
    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];

    const openaiClient = new OpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: nvidiaNIMKey,
    });

    const response: any = await openaiClient.chat.completions.create({
      model: xpanderClient.supportedModels.LLAMA_3_1_70B_Instruct,
      messages: messages as any,
      tools: xpanderToolsForNvidiaNIM as any,
      tool_choice: 'required',
    });

    expect(response.choices[0].message.tool_calls[0].function.name).toEqual(
      TOOL_NAME,
    );

    const toolResponse = xpanderClient.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0);
  });
});
