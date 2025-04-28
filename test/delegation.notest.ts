import 'openai/shims/node';
import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentId = 'daa818db-630d-47b9-a711-d81a78f0a525';
const openAIKey = process.env.OPENAI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (Sequence Delegation)', () => {
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
    // manually set execution - should come from worker when running in cloud/on-prem
    agent.addTask(
      'get longest readable tag and send me on email (moriel@xpander.ai)',
    );
    agent.memory.initMessages(
      agent.execution?.inputMessage!,
      agent.instructions,
    );

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
      agent.runTools(toolCalls, {
        bodyParams: { organization_id: organizationId },
      });
      announceTiming(startTime, 'Running tools');

      // when using local tools
      // agent.memory.addToolCallResults(toolResults);
    }

    startTime = getStartTime();
    const executionResult = agent.retrieveExecutionResult();
    announceTiming(startTime, 'Retrieve execution result');

    expect(executionResult?.result.length).toBeGreaterThanOrEqual(1);
  }, 3000000);
});
