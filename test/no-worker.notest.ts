import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import {
  IMemoryMessage,
  LLMProvider,
  OpenAISupportedModels,
  XpanderClient,
} from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentId = process.env.XPANDER_AGENT_ID || '';
const openAIKey = process.env.OPENAI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

describe('Test xpander.ai SDK (**NO** Worker Mode)', () => {
  it('Get Task and handle', async () => {
    const xpanderClient = new XpanderClient(
      organizationId,
      xpanderAPIKey,
      localAgentControllerURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentId);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools();
    expect(tools.length).toBeGreaterThanOrEqual(1);

    // manually set execution - should come from worker
    agent.invokeAgent(
      'Get longest readable tag from my blog. enrich info about this tag from the internet',
    );

    // configure memory
    agent.memory.selectLLMProvider(LLMProvider.OPEN_AI); // only if not openai..
    agent.memory.initializeThread(
      agent.execution?.inputMessage as IMemoryMessage,
      agent.instructions,
    ); // add input and instructions

    let shouldSkip = false;
    while (!agent.isFinished()) {
      if (shouldSkip) {
        shouldSkip = false;
        continue;
      }
      const response: any = await openaiClient.chat.completions.create({
        model: OpenAISupportedModels.GPT_4_O,
        messages: agent.memory.retrieveMessages() as any,
        tools: agent.getTools(),
        tool_choice: 'auto',
        temperature: 0.0,
      });

      // add messages from the LLM (auto extraction)
      agent.memory.addMessages(response);

      // extract tool calls
      const toolCalls = XpanderClient.extractToolCalls(response);
      agent.runTools(toolCalls);

      // when using local tools
      // memory.addToolCallResults(toolResults);
    }
    console.log(agent);
    expect(agent.execution?.result.length).toBeGreaterThanOrEqual(1);
  }, 3000000);
});
