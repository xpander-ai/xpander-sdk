import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import {
  LLMProvider,
  ILocalTool,
  OpenAISupportedModels,
  ToolCallType,
  XpanderClient,
  IXpanderClientParams,
} from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';
const organizationId = process.env.ORGANIZATION_ID || ''; // only when working with agents service locally!
const openAIKey = process.env.OPENAI_API_KEY || '';

const llmClient = new ChatOpenAI({
  model: OpenAISupportedModels.GPT_4_O,
  temperature: 0,
  apiKey: openAIKey,
});

const xpanderClientParams: IXpanderClientParams = {
  apiKey: xpanderAPIKey,
  customParams: { organizationId },
};

describe('Test LangChain using xpander.ai', () => {
  it('get tools for langchain provider', async () => {
    const xpanderClient = new XpanderClient(xpanderClientParams);
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools(LLMProvider.LANG_CHAIN);
    expect(tools.length).toBeGreaterThanOrEqual(1);

    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];
    const response: any = await llmClient.invoke(messages, {
      tools,
    });

    expect(response.tool_calls.length).toBeGreaterThanOrEqual(1);

    // extract tools
    const toolCalls = xpanderClient.extractToolCalls(
      response,
      LLMProvider.LANG_CHAIN,
    );

    expect(toolCalls.length).toBeGreaterThanOrEqual(1);

    // run tools
    const toolCallsResults = agent.runTools(toolCalls);
    expect(toolCallsResults.length).toEqual(toolCalls.length);
    expect(toolCallsResults[0].isSuccess).toBeTruthy();
  }, 12000);

  it('get tools for langchain provider + invoke tool (one tool)', async () => {
    const xpanderClient = new XpanderClient(xpanderClientParams);
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const pgTools = agent.getTools(LLMProvider.LANG_CHAIN);
    expect(pgTools.length).toBeGreaterThanOrEqual(1);

    // run completion
    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];
    const response: any = await llmClient.invoke(messages, {
      tools: pgTools,
    });

    const toolCall = response?.tool_calls?.[0];
    expect(toolCall).not.toBe(null);
    const pgMatched = pgTools.find(
      (pg: any) => pg.function.name === toolCall.name,
    );
    expect(pgMatched).not.toBe(null);

    // extract tools
    const xpanderToolCalls = xpanderClient.extractToolCalls(
      response,
      LLMProvider.LANG_CHAIN,
    );

    expect(xpanderToolCalls.length).toBeGreaterThanOrEqual(1);

    // pg selected
    expect(xpanderToolCalls[0].isPg).toEqual(true);

    // run tools
    const invocationResults = agent.runTools(xpanderToolCalls);

    expect(invocationResults.length).toBeGreaterThanOrEqual(1);
    expect(invocationResults[0].result).toMatch(
      /graph prompt group selected/gi,
    );

    // now get tags for real using tool and not pg selection
    const completionResult: any = await llmClient.invoke(messages, {
      tools: agent.getTools(LLMProvider.LANG_CHAIN),
    });

    const realToolCalls = xpanderClient.extractToolCalls(
      completionResult,
      LLMProvider.LANG_CHAIN,
    );

    const realInvocationResults = agent.runTools(realToolCalls);

    expect(realInvocationResults.length).toEqual(realToolCalls.length);
    expect(realInvocationResults[0].isSuccess).toBeTruthy();
    expect(realInvocationResults[0].toolCallId).toEqual(
      realToolCalls[0].toolCallId,
    );
  }, 20000);

  it('get tools for langchain provider + invoke tool (multi step)', async () => {
    const xpanderClient = new XpanderClient(xpanderClientParams);
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const messages: any = [
      {
        role: 'assistant',
        content:
          'you are ai agent that runs in a loop, for every loop you may get different tools according to the graph position',
      },
      {
        role: 'user',
        content:
          'step 1: get all tags. step 2: get article (limit = 5) titles from my blog. step 3: enrich and get data about the 3 tags & 3 article titles from "Tavily" in a single query. when you are done with all the required steps - responde with "###FINAL_ANSWER###:" alongside the final answer.',
      },
    ];

    let isFinished = false;

    // prompt groups exists and tools being called
    while (!isFinished) {
      // run completion

      const response: any = await llmClient.invoke(messages, {
        tools: agent.getTools(LLMProvider.LANG_CHAIN),
        tool_choice: 'auto',
        parallel_tool_calls: false,
      });

      isFinished = response?.content?.includes('###FINAL_ANSWER###');

      // extract tools
      const toolCalls = xpanderClient.extractToolCalls(
        response,
        LLMProvider.LANG_CHAIN,
      );
      for (const toolCall of toolCalls) {
        messages.push({
          role: 'assistant',
          tool_calls: [
            {
              id: toolCall.toolCallId,
              function: {
                arguments: JSON.stringify(toolCall.payload),
                name: toolCall.name,
              },
              type: 'function',
            },
          ],
        });
      }

      // run tools
      const toolCallsResults = agent.runTools(toolCalls);
      for (const toolCallResult of toolCallsResults) {
        messages.push({
          role: 'tool',
          content: JSON.stringify(toolCallResult.result),
          tool_call_id: toolCallResult.toolCallId,
          node_name: toolCallResult.functionName,
        });
      }
    }
    expect(isFinished).toBeTruthy();
  }, 120000);

  it('get tools for langchain provider + invoke tool (local tool tool)', async () => {
    const xpanderClient = new XpanderClient(xpanderClientParams);
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const messages = [
      {
        role: 'user',
        content: 'Say hello to David',
      },
    ];

    const localTools: ILocalTool[] = [
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

    agent.addLocalTools(localTools);

    const response: any = await llmClient.invoke(messages, {
      tools: agent.getTools(LLMProvider.LANG_CHAIN),
    });

    // extract tools
    const xpanderToolCalls = xpanderClient.extractToolCalls(
      response,
      LLMProvider.LANG_CHAIN,
    );
    expect(xpanderToolCalls.length).toBeGreaterThanOrEqual(1);
    expect(xpanderToolCalls[0].name).toEqual(localTools[0].function.name);
    expect(xpanderToolCalls[0].type).toEqual(ToolCallType.LOCAL);

    // run tools
    const invocationResults = agent.runTools(xpanderToolCalls);
    expect(invocationResults.length).toBeGreaterThanOrEqual(1);
    expect(invocationResults[0]).not.toHaveProperty('result');
  }, 20000);
});
