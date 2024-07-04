import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { LLMProvider, XpanderClient } from '../src';
import { OpenAIStructuredTool } from '../src/llmProviders/openai';

dotenv.config();

const xpanderAPIKey = '45C5SMkWBy879rS8kYXyea1gAoazuDTIaHn2gtYq';
const agentUrl = 'https://inbound.xpander.ai/agent/e4ae74cf-e31c-450b-97f2-51f1734d0377';
const openAPIKey = process.env.OPENAI_API_KEY;

test('openAIClient', async () => {
  const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, LLMProvider.OPEN_AI);

  try {
    await xpanderClient.retrieveAgentTools();
    const xpanderToolsForOpenAI = await xpanderClient.tools(LLMProvider.OPEN_AI);

    expect(xpanderToolsForOpenAI.length).toBeGreaterThan(0);
  } catch (error) {
    console.error('Failed to retrieve tools:', error);
    throw error;
  }
}, 30000);

// test('anthropicAIClient', async () => {
//   const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, LLMProvider.ANTHROPIC);

//   try {
//     await xpanderClient.retrieveAgentTools();
//     const xpanderToolsForOpenAIforAnthropic = await xpanderClient.tools(LLMProvider.ANTHROPIC);

//     expect(xpanderToolsForOpenAIforAnthropic.length).toBeGreaterThan(0);
//   } catch (error) {
//     console.error('Failed to retrieve tools:', error);
//     throw error;
//   }
// }, 30000);

test('openAI_Function_calling', async () => {
  const xpanderClient = new XpanderClient(xpanderAPIKey, agentUrl, LLMProvider.OPEN_AI);

  try {
    await xpanderClient.retrieveAgentTools();
    const openAIClientTools: OpenAIStructuredTool[] = await xpanderClient.tools(LLMProvider.OPEN_AI);

    // Ensure each tool has the required properties
    const validatedTools = openAIClientTools.map((tool: OpenAIStructuredTool) => {
      if (!tool.function.name) {
        throw new Error(`Tool is missing required 'name' property: ${JSON.stringify(tool)}`);
      }
      return tool;
    });

    // Debugging: Log the validated tools to check their structure
    // console.log('Validated tools:', JSON.stringify(validatedTools, null, 2));

    const messages = [
      {
        role: 'user',
        content: 'Add page about Unicorns in Content DB',
      },
    ];

    const openaiClient = new OpenAI({
      apiKey: openAPIKey,
    });

    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: messages as any,
      tools: validatedTools as any,
      tool_choice: 'required',
    });

    const toolResponse = await xpanderClient.xpanderToolCall(response);
    console.log(JSON.stringify(toolResponse, null, 2));

    expect(toolResponse.length).toBeGreaterThan(0);
  } catch (error) {
    console.error('Failed to call function:', error);
    throw error;
  }
}, 30000);