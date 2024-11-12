import {
  BedrockRuntimeClient,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import {
  AmazonBedrockSupportedModels,
  LLMProvider,
  ILocalTool,
  ToolCallType,
  XpanderClient,
} from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';
const bedrockAWSRegionName = process.env.BEDROCK_AWS_REGION_NAME || '';
const bedrockAWSAccessKeyId = process.env.BEDROCK_AWS_ACCESS_KEY_ID || '';
const bedrockAWSSecretAccessKey =
  process.env.BEDROCK_AWS_SECRET_ACCESS_KEY || '';
const inboundStgURL = process.env.INBOUND_STG || '';

const bedrockClient = new BedrockRuntimeClient({
  region: bedrockAWSRegionName,
  credentials: {
    accessKeyId: bedrockAWSAccessKeyId,
    secretAccessKey: bedrockAWSSecretAccessKey,
  },
});

describe('Test Amazon Bedrock using xpander.ai', () => {
  it('get tools for bedrock provider', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools(LLMProvider.AMAZON_BEDROCK);
    expect(tools.length).toBeGreaterThanOrEqual(1);

    const messages: any[] = [
      {
        role: 'user',
        content: [{ text: 'get all tags' }],
      },
    ];

    const command = new ConverseCommand({
      modelId: AmazonBedrockSupportedModels.ANTHROPIC_CLAUDE_3_HAIKU_20240307,
      messages,
      inferenceConfig: { temperature: 0.0 },
      toolConfig: { tools },
    });

    const response: any = await bedrockClient.send(command);
    const toolUse = response?.output?.message?.content.find(
      (msg: any) => !!msg.toolUse,
    )?.toolUse;
    expect(toolUse).toHaveProperty('name');

    // extract tools
    const toolCalls = XpanderClient.extractToolCalls(
      response,
      LLMProvider.AMAZON_BEDROCK,
    );

    expect(toolCalls.length).toBeGreaterThanOrEqual(1);

    // run tools
    const toolCallsResults = agent.runTools(toolCalls);
    expect(toolCallsResults.length).toEqual(toolCalls.length);
    expect(toolCallsResults[0].isSuccess).toBeTruthy();
  }, 12000);

  it('get tools for bedrock provider + invoke tool (one tool)', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const pgTools = agent.getTools(LLMProvider.AMAZON_BEDROCK);
    expect(pgTools.length).toBeGreaterThanOrEqual(1);

    const messages: any[] = [
      {
        role: 'user',
        content: [{ text: 'get all tags' }],
      },
    ];

    const command = new ConverseCommand({
      modelId: AmazonBedrockSupportedModels.ANTHROPIC_CLAUDE_3_HAIKU_20240307,
      messages,
      inferenceConfig: { temperature: 0.0 },
      toolConfig: { tools: pgTools },
    });

    const response: any = await bedrockClient.send(command);

    // extract tools
    const xpanderToolCalls = XpanderClient.extractToolCalls(
      response,
      LLMProvider.AMAZON_BEDROCK,
    );

    expect(xpanderToolCalls.length).toBeGreaterThanOrEqual(1);
    const pgMatched = pgTools.find(
      (pg: any) => pg.toolSpec.name === xpanderToolCalls[0].name,
    );
    expect(pgMatched).not.toBe(null);

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
    const command2 = new ConverseCommand({
      modelId: AmazonBedrockSupportedModels.ANTHROPIC_CLAUDE_3_HAIKU_20240307,
      messages,
      inferenceConfig: { temperature: 0.0 },
      toolConfig: { tools: agent.getTools(LLMProvider.AMAZON_BEDROCK) },
    });

    const response2: any = await bedrockClient.send(command2);

    const realToolCalls = XpanderClient.extractToolCalls(
      response2,
      LLMProvider.AMAZON_BEDROCK,
    );

    const realInvocationResults = agent.runTools(realToolCalls);

    expect(realInvocationResults.length).toEqual(realToolCalls.length);
    expect(realInvocationResults[0].isSuccess).toBeTruthy();
    expect(realInvocationResults[0].toolCallId).toEqual(
      realToolCalls[0].toolCallId,
    );
  }, 20000);

  it('get tools for bedrock provider + invoke tool (multi step)', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const messages: any = [
      {
        role: 'user',
        content: [
          {
            text: 'step 1: get all tags. step 2: get article (limit = 5) titles from my blog. step 3: enrich and get data about the 3 tags & 3 article titles from "Tavily" in a single query. when you are done with all the required steps - responde with "###FINAL_ANSWER###:" alongside the final answer.',
          },
        ],
      },
    ];

    let isFinished = false;

    // prompt groups exists and tools being called
    while (!isFinished) {
      // run completion

      const command = new ConverseCommand({
        modelId: AmazonBedrockSupportedModels.ANTHROPIC_CLAUDE_3_HAIKU_20240307,
        messages,
        inferenceConfig: { temperature: 0.0 },
        toolConfig: { tools: agent.getTools(LLMProvider.AMAZON_BEDROCK) },
      });

      const response: any = await bedrockClient.send(command);

      const llmMessages = response?.output?.message?.content || [];
      const textResponse = llmMessages
        ?.filter((msg: any) => !!msg?.text)
        ?.map((msg: any) => msg.text)
        ?.join();

      isFinished = textResponse?.includes('###FINAL_ANSWER###');

      // extract tools
      const toolCalls = XpanderClient.extractToolCalls(
        response,
        LLMProvider.AMAZON_BEDROCK,
      );
      for (const toolCall of toolCalls) {
        const content: any = [
          {
            toolUse: {
              toolUseId: toolCall.toolCallId,
              name: toolCall.name,
              input: toolCall.payload,
            },
          },
        ];
        if (!!llmMessages?.[0]?.text) {
          content.unshift({ text: llmMessages[0].text });
        }
        messages.push({
          role: 'assistant',
          content,
        });
      }

      // run tools
      const toolCallsResults = agent.runTools(toolCalls);
      for (const toolCallResult of toolCallsResults) {
        messages.push({
          role: 'user',
          content: [
            {
              toolResult: {
                toolUseId: toolCallResult.toolCallId,
                content: [{ text: JSON.stringify(toolCallResult.result) }],
              },
            },
          ],
        });
      }
    }
    expect(isFinished).toBeTruthy();
  }, 120000);

  it('get tools for bedrock provider + invoke tool (local tool tool)', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      inboundStgURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const messages: any = [
      {
        role: 'user',
        content: [{ text: 'Say hello to David' }],
      },
    ];

    const localTools: ILocalTool[] = [
      {
        type: 'function',
        function: {
          name: 'greet_by_name',
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

    const command = new ConverseCommand({
      modelId: AmazonBedrockSupportedModels.ANTHROPIC_CLAUDE_3_HAIKU_20240307,
      messages,
      inferenceConfig: { temperature: 0.0 },
      toolConfig: { tools: agent.getTools(LLMProvider.AMAZON_BEDROCK) },
    });

    const response: any = await bedrockClient.send(command);

    // extract tools
    const xpanderToolCalls = XpanderClient.extractToolCalls(
      response,
      LLMProvider.AMAZON_BEDROCK,
    );
    expect(xpanderToolCalls.length).toBeGreaterThanOrEqual(1);
    expect(xpanderToolCalls[0].name).toEqual(localTools[0].function.name);
    expect(xpanderToolCalls[0].type).toEqual(ToolCallType.LOCAL);

    // run tools
    const invocationResults = agent.runTools(xpanderToolCalls);
    expect(invocationResults.length).toBeGreaterThanOrEqual(1);
    expect(invocationResults[0].result).toEqual(null);
  }, 20000);
});
