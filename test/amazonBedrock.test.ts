import {
  BedrockRuntimeClient,
  ConverseCommand,
  Tool,
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import { LLMProvider, XpanderClient } from '../src';

dotenv.config();

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const bedrockAWSRegionName = process.env.BEDROCK_AWS_REGION_NAME || '';
const bedrockAWSAccessKeyId = process.env.BEDROCK_AWS_ACCESS_KEY_ID || '';
const bedrockAWSSecretAccessKey =
  process.env.BEDROCK_AWS_SECRET_ACCESS_KEY || '';

const xpanderClient = new XpanderClient(
  xpanderAPIKey,
  agentUrl,
  LLMProvider.AMAZON_BEDROCK,
);

describe('Testing Amazon Bedrock (Converse) Runtime Function Calling', () => {
  const xpanderToolsForAmazonBedrock =
    xpanderClient.tools() as unknown as Tool[];

  it('tool selection is correct', async () => {
    const TOOL_NAME = 'Conduit-article-management-getAllTagsForArticles';
    const messages: any[] = [
      {
        role: 'user',
        content: [{ text: 'get all tags' }],
      },
    ];

    const bedrockClient = new BedrockRuntimeClient({
      region: bedrockAWSRegionName,
      credentials: {
        accessKeyId: bedrockAWSAccessKeyId,
        secretAccessKey: bedrockAWSSecretAccessKey,
      },
    });

    const command = new ConverseCommand({
      modelId: xpanderClient.supportedModels.Anthropic_Claude_3_Haiku_20240307,
      messages,
      inferenceConfig: { temperature: 0.0 },
      toolConfig: { tools: xpanderToolsForAmazonBedrock },
    });

    const response: any = await bedrockClient.send(command);

    const toolCalls: any[] =
      response?.output?.message?.content.filter(
        (msg: any) => msg.toolUse && msg.toolUse.name,
      ) || [];

    const originalFunctionName =
      xpanderClient.toolsNamesMapping[toolCalls[0].toolUse.name];
    expect(originalFunctionName).toEqual(TOOL_NAME);

    const toolResponse = xpanderClient.xpanderToolCall(response);

    expect(toolResponse.length).toBeGreaterThan(0);
  });
});
