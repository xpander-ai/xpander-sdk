import 'openai/shims/node';
import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { LLMProvider, XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentId = 'eec5fba6-b172-4926-8d4d-20942bbb0a78';
const llmAPIKey = process.env.GEMINI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const openaiClient = new OpenAI({
  apiKey: llmAPIKey,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (**NO** Worker Mode)', () => {
  it('Get Task and handle', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
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
    agent.addTask('get longest readable tag');
    announceTiming(startTime, 'Invoke Agent');

    let shouldSkip = false;
    while (!agent.isFinished()) {
      if (shouldSkip) {
        shouldSkip = false;
        continue;
      }
      startTime = getStartTime();
      let response: any;
      try {
        response = await openaiClient.chat.completions.create({
          model: 'gemini-2.0-flash',
          messages: agent.messages,
          tools: agent.getTools(LLMProvider.GEMINI_OPEN_AI),
          tool_choice: agent.toolChoice,
          temperature: 0.0,
        });
      } catch (err) {
        console.error(err);
      }

      announceTiming(startTime, 'LLM Completion');

      // add messages from the LLM (auto extraction)
      startTime = getStartTime();
      agent.addMessages(response);
      announceTiming(startTime, 'Adding messages');

      // extract tool calls
      startTime = getStartTime();
      const toolCalls = XpanderClient.extractToolCalls(
        response,
        LLMProvider.GEMINI_OPEN_AI,
      );
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
