import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import {
  ILocalTool,
  OpenAISupportedModels,
  ToolCallType,
  XpanderClient,
  IXpanderClientCustomParams,
} from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';
const organizationId = process.env.ORGANIZATION_ID || ''; // only when working with agents service locally!
const openAIKey = process.env.OPENAI_API_KEY || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

const customParams: IXpanderClientCustomParams = { organizationId };

describe('Test OpenAI using xpander.ai', () => {
  it('get tools for openai provider', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      null,
      false,
      customParams,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const pgTools = agent.getTools();
    expect(pgTools.length).toBeGreaterThanOrEqual(1);

    // run completion
    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];
    const response: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: pgTools,
      tool_choice: 'required',
    });

    const toolCall = response?.choices?.[0]?.message?.tool_calls?.[0];
    expect(toolCall).not.toBe(null);
    const pgMatched = pgTools.find(
      (pg: any) => pg.function.name === toolCall.function.name,
    );
    expect(pgMatched).not.toBe(null);

    // extract tools
    const xpanderToolCalls = xpanderClient.extractToolCalls(response);

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
    const completionResult: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: agent.getTools(),
      tool_choice: 'required',
    });

    const realToolCalls = xpanderClient.extractToolCalls(completionResult);
    expect(realToolCalls.length).toBeGreaterThanOrEqual(1);
  });

  it('get tools for openai provider + invoke tool (one tool)', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      null,
      false,
      customParams,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const pgTools = agent.getTools();
    expect(pgTools.length).toBeGreaterThanOrEqual(1);

    // run completion
    const messages = [
      {
        role: 'user',
        content: 'get all tags',
      },
    ];
    const response: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: pgTools,
      tool_choice: 'required',
    });

    const toolCall = response?.choices?.[0]?.message?.tool_calls?.[0];
    expect(toolCall).not.toBe(null);
    const pgMatched = pgTools.find(
      (pg: any) => pg.function.name === toolCall.function.name,
    );
    expect(pgMatched).not.toBe(null);

    // extract tools
    const xpanderToolCalls = xpanderClient.extractToolCalls(response);

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
    const completionResult: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: agent.getTools(),
      tool_choice: 'required',
    });

    const realToolCalls = xpanderClient.extractToolCalls(completionResult);

    const realInvocationResults = agent.runTools(realToolCalls);

    expect(realInvocationResults.length).toEqual(realToolCalls.length);
    expect(realInvocationResults[0].isSuccess).toBeTruthy();
    expect(realInvocationResults[0].toolCallId).toEqual(
      realToolCalls[0].toolCallId,
    );
  }, 20000);

  it('get tools for openai provider + invoke tool (multi step)', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      null,
      false,
      customParams,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const messages: any = [
      {
        role: 'system',
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
      const response: any = await openaiClient.chat.completions.create({
        model: OpenAISupportedModels.GPT_4_O,
        messages: messages as any,
        tools: agent.getTools(),
        tool_choice: 'auto',
        parallel_tool_calls: false,
        temperature: 0.0,
      });

      isFinished =
        response?.choices?.[0]?.message?.content?.includes(
          '###FINAL_ANSWER###',
        );

      // extract tools
      const toolCalls = xpanderClient.extractToolCalls(response);
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

  it('get tools for openai provider + invoke tool (local tool tool)', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      null,
      false,
      customParams,
    );
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
              bodyParams: {
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
            required: ['bodyParams'],
            additionalProperties: false,
          },
        },
      },
    ];

    agent.addLocalTools(localTools);

    const response: any = await openaiClient.chat.completions.create({
      model: OpenAISupportedModels.GPT_4_O,
      messages: messages as any,
      tools: agent.getTools(),
      tool_choice: 'required',
    });

    // extract tools
    const xpanderToolCalls = xpanderClient.extractToolCalls(response);
    expect(xpanderToolCalls.length).toBeGreaterThanOrEqual(1);
    expect(xpanderToolCalls[0].name).toEqual(localTools[0].function.name);
    expect(xpanderToolCalls[0].type).toEqual(ToolCallType.LOCAL);
    expect(xpanderToolCalls[0].payload.bodyParams.userName).toEqual('David');

    // run tools
    const invocationResults = agent.runTools(xpanderToolCalls);
    expect(invocationResults.length).toBeGreaterThanOrEqual(1);
    expect(invocationResults[0]).not.toHaveProperty('result');
    expect(invocationResults[0].payload.bodyParams.userName).toEqual('David');
  }, 20000);
});
