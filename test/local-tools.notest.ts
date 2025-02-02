import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { ToolCallResult, XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentId = 'ef3ddd31-b2a3-4a1d-8c12-4f3cbee1f43b';
const openAIKey = process.env.OPENAI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

const localTools = [
  {
    decleration: {
      type: 'function',
      function: {
        name: 'greet',
        description:
          'Generates a greeting message for a user using their first and last name.',
        parameters: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'The first name of the user.',
            },
            lastName: {
              type: 'string',
              description: 'The last name of the user.',
            },
          },
          required: ['firstName', 'lastName'],
        },
      },
    },
    fn: (firstName: string, lastName: string): string => {
      return `Hello, ${firstName} ${lastName}! Welcome aboard.`;
    },
  },
  {
    decleration: {
      type: 'function',
      function: {
        name: 'sendMessage',
        description: 'Sends a message to a user.',
        parameters: {
          type: 'object',
          properties: {
            recipient: {
              type: 'string',
              description: 'The recipient of the message.',
            },
            message: {
              type: 'string',
              description: 'The message content.',
            },
          },
          required: ['recipient', 'message'],
        },
      },
    },
    fn: (recipient: string, message: string): string => {
      console.log(`Sending message to ${recipient}: "${message}"`);
      return `Message sent to ${recipient}`;
    },
  },
];

const localToolsByName = localTools.reduce((all: any, item) => {
  all[item.decleration.function.name] = item.fn;
  return all;
}, {});

const localToolsDecleration = localTools.map((lt) => lt.decleration);

describe('Test xpander.ai SDK (**NO** Worker Mode - Local Tools)', () => {
  it('Run Local Tools', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      false,
      organizationId,
    );

    let startTime = getStartTime();
    const agent = xpanderClient.agents.get(xpanderAgentId);
    announceTiming(startTime, 'Get Agent');
    expect(agent).toHaveProperty('id');

    agent.addLocalTools(localToolsDecleration);

    // console.log(greetUser);

    const tools = agent.getTools();
    expect(tools.length).toBeGreaterThanOrEqual(1);

    startTime = getStartTime();
    // manually set execution - should come from worker when running in cloud/on-prem
    agent.addTask('greet Moriel Pahima and then send him a message');
    announceTiming(startTime, 'Invoke Agent');

    let shouldSkip = false;
    while (!agent.isFinished()) {
      if (shouldSkip) {
        shouldSkip = false;
        continue;
      }
      startTime = getStartTime();
      const response: any = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: agent.messages,
        tools: agent.getTools(),
        tool_choice: agent.toolChoice,
        temperature: 0.0,
      });
      announceTiming(startTime, 'LLM Completion');

      // add messages from the LLM (auto extraction)
      startTime = getStartTime();
      agent.addMessages(response);
      announceTiming(startTime, 'Adding messages');

      // extract tool calls
      startTime = getStartTime();
      const toolCalls = XpanderClient.extractToolCalls(response);
      announceTiming(startTime, 'Toolcall Extractions');

      startTime = getStartTime();
      const toolCallResults = agent.runTools(toolCalls, {
        bodyParams: { organization_id: organizationId },
      });
      announceTiming(startTime, 'Running tools');

      const pendingLocalToolCalls =
        XpanderClient.retrievePendingLocalToolCalls(toolCalls);
      if (pendingLocalToolCalls.length !== 0) {
        for (const toolCall of pendingLocalToolCalls) {
          if (toolCall.name in localToolsByName) {
            const toolCallResult = localToolsByName[toolCall.name](
              ...Object.values(toolCall.payload),
            );
            agent.memory.addToolCallResults([
              new ToolCallResult(
                toolCall.name,
                toolCall.toolCallId,
                toolCall.payload,
                200,
                toolCallResult,
                true,
                false,
              ),
            ]);
          }
        }
      }
    }

    startTime = getStartTime();
    const executionResult = agent.retrieveExecutionResult();
    announceTiming(startTime, 'Retrieve execution result');

    expect(executionResult?.result.length).toBeGreaterThanOrEqual(1);
  }, 3000000);
});
