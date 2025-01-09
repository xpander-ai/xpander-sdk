import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import {
  IMemoryMessage,
  LLMProvider,
  OpenAISupportedModels,
  XpanderClient,
} from '../src';
import { AGENT_FINISH_TOOL_ID } from '../src/constants/tools';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentID = process.env.XPANDER_AGENT_ID || '';
const openAIKey = process.env.OPENAI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

describe('Test OpenAI using xpander.ai', () => {
  it('get tools for openai provider', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      false,
    );
    const agent = xpanderClient.agents.get(xpanderAgentID);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools();
    expect(tools.length).toBeGreaterThanOrEqual(1);

    // manually set execution - should come from worker
    agent.initTask({
      id: '9f3d30b6-44df-48f5-b656-6fb34d29e91a',
      agent_id: '840fd394-3d3e-4ec8-9089-3b2f37ed5c2f',
      organization_id: '6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2',
      input: {
        text: 'Get the longest readable tag AND latest article title',
        files: [],
        user: null,
      },
      status: 'pending',
      last_executed_node_id: null,
      memory_thread_id: '3268f0a3-e28c-42d4-9880-32006f900b96',
      created_at: '2025-01-08T18:44:21.257282Z',
      started_at: null,
      paused_at: null,
      finished_at: null,
      result: null,
      parent_execution: null,
    });

    // configure memory
    const memory = agent.memory;
    memory.selectLLMProvider(LLMProvider.OPEN_AI); // only if not openai..
    memory.initializeThread(
      agent.execution?.inputMessage as IMemoryMessage,
      agent.instructions,
    ); // add input and instructions

    let isFinished = false;
    while (!isFinished) {
      const response: any = await openaiClient.chat.completions.create({
        model: OpenAISupportedModels.GPT_4_O,
        messages: memory.retrieveMessages() as any,
        tools: agent.getTools(),
        tool_choice: 'auto',
        temperature: 0.0,
      });

      // add messages from the LLM (auto extraction)
      memory.addMessages(response);

      // extract tool calls
      const toolCalls = XpanderClient.extractToolCalls(response);
      agent.runTools(toolCalls);

      isFinished = toolCalls.some((tc) => tc.name === AGENT_FINISH_TOOL_ID);
      if (isFinished) {
        break;
      }

      // when using local tools
      // memory.addToolCallResults(toolResults);
    }

    expect(memory.messages[memory.messages.length - 1].role).toEqual(
      'assistant',
    );
  }, 30000);
});
