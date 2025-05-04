import 'openai/shims/node';
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import { LLMProvider, XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentId = 'd86f4f03-0bb3-4fd4-ab07-dd9254fea783';

const bedrockAWSRegionName = process.env.BEDROCK_AWS_REGION || '';
const bedrockAWSAccessKeyId = process.env.BEDROCK_AWS_ACCESS_KEY_ID || '';
const bedrockAWSSecretAccessKey =
  process.env.BEDROCK_AWS_SECRET_ACCESS_KEY || '';
const bedrockAWSSessionToken = process.env.BEDROCK_AWS_SESSION_TOKEN || '';

const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = '729931d4-9320-46bf-a6a9-cf1a252e7cc6';

const bedrockClient = new BedrockRuntimeClient({
  region: bedrockAWSRegionName,
  credentials: {
    accessKeyId: bedrockAWSAccessKeyId,
    secretAccessKey: bedrockAWSSecretAccessKey,
    sessionToken: bedrockAWSSessionToken,
  },
});

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (**NO** Worker Mode)', () => {
  it('Get Task and handle', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      organizationId,
    );

    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(xpanderAgentId);
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools();
    expect(tools.length).toBeGreaterThanOrEqual(1);

    startTime = getStartTime();

    agent.addTask('what can you do?');
    announceTiming(startTime, 'Invoke Agent');

    let shouldSkip = false;
    while (!agent.isFinished()) {
      if (shouldSkip) {
        shouldSkip = false;
        continue;
      }
      startTime = getStartTime();
      agent.memory.llmProvider = LLMProvider.AMAZON_BEDROCK;

      const command = new ConverseCommand({
        modelId: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
        messages: agent.messages,
        inferenceConfig: { temperature: 0.0 },
        system: agent.memory.systemMessage,
        toolConfig: {
          tools: agent.getTools(LLMProvider.AMAZON_BEDROCK),
          toolChoice: { any: agent.toolChoice === 'required' ? {} : false },
        },
      });
      const response: any = await bedrockClient.send(command);

      announceTiming(startTime, 'LLM Completion');

      // add messages from the LLM (auto extraction)
      startTime = getStartTime();
      agent.addMessages(response);
      announceTiming(startTime, 'Adding messages');

      // extract tool calls
      startTime = getStartTime();
      const toolCalls = XpanderClient.extractToolCalls(
        response,
        LLMProvider.AMAZON_BEDROCK,
      );
      announceTiming(startTime, 'Toolcall Extractions');

      startTime = getStartTime();
      agent.runTools(toolCalls);
      announceTiming(startTime, 'Running tools');
    }

    startTime = getStartTime();
    const executionResult = agent.retrieveExecutionResult();
    console.log(executionResult);
    announceTiming(startTime, 'Retrieve execution result');

    expect(executionResult?.result.length).toBeGreaterThanOrEqual(1);
  }, 3000000);
});
