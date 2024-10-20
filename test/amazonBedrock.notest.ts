import {
  BedrockRuntimeClient,
  ConverseCommand,
  Tool,
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import {
  AmazonBedrockSupportedModels,
  LLMProvider,
  XpanderClient,
} from '../src';

dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const bedrockAWSRegionName = process.env.BEDROCK_AWS_REGION_NAME || '';
const bedrockAWSAccessKeyId = process.env.BEDROCK_AWS_ACCESS_KEY_ID || '';
const bedrockAWSSecretAccessKey =
  process.env.BEDROCK_AWS_SECRET_ACCESS_KEY || '';

describe('Testing Amazon Bedrock (Converse) Runtime Function Calling', () => {
  it('tool selection is correct - with graphs', async () => {
    const userPrompt = 'whos my boss? my organization id is 123';
    const messages: any[] = [
      {
        role: 'user',
        content: [{ text: userPrompt }],
      },
    ];

    const client = new XpanderClient(
      xpanderAPIKey,
      agentUrl,
      LLMProvider.AMAZON_BEDROCK,
    );

    client.startSession(userPrompt);

    const bedrockClient = new BedrockRuntimeClient({
      region: bedrockAWSRegionName,
      credentials: {
        accessKeyId: bedrockAWSAccessKeyId,
        secretAccessKey: bedrockAWSSecretAccessKey,
      },
    });

    const iterations = [
      'CompanyPeopleBookRetrieveOrgHierarchy',
      'CompanyPeopleBookRetrieveOrganizationHierarchyByCompanyId',
    ];

    // test single graph iteration
    for (const requiredTool of iterations) {
      const tools = client.tools() as unknown as Tool[];
      // required tool exists
      expect(tools.some((tool) => tool.toolSpec?.name === requiredTool)).toBe(
        true,
      );

      const command = new ConverseCommand({
        modelId: AmazonBedrockSupportedModels.ANTHROPIC_CLAUDE_3_HAIKU_20240307,
        messages,
        inferenceConfig: { temperature: 0.0 },
        toolConfig: { tools },
      });

      const response: any = await bedrockClient.send(command);
      const toolCalls: any[] =
        response?.output?.message?.content.filter(
          (msg: any) => msg.toolUse && msg.toolUse.name,
        ) || [];
      const originalFunctionName =
        client.toolsNamesMapping[toolCalls[0].toolUse.name];
      expect(originalFunctionName).toEqual(requiredTool.replace(/\_/g, '-'));

      const toolResponse = client.xpanderToolCall(response);

      expect(toolResponse.length).toBeGreaterThan(0);
    }
  }, 20000);
});
