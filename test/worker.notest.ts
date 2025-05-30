import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { IMemoryMessage, XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const openAIKey = process.env.OPENAI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

const MANAGER_TASK = {
  id: '79dce1ad-3dd5-476c-a1a9-f0ec37cee44b',
  agent_id: '840fd394-3d3e-4ec8-9089-3b2f37ed5c2d',
  organization_id: '6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2',
  input: {
    text: 'Get longest readable tag and latest article title',
    files: [],
    user: null,
  },
  status: 'pending',
  last_executed_node_id: null,
  memory_thread_id: 'dbb788a1-d89e-4f76-9965-953bd113599e',
  created_at: '2025-01-09T13:41:57.704000Z',
  started_at: null,
  paused_at: null,
  finished_at: null,
  result: null,
  parent_execution: null,
};

const TAGS_TASK = {
  id: '65d73836-a127-439d-a236-4907549f5319',
  agent_id: '840fd394-3d3e-4ec8-9089-3b2f37ed5c2f',
  organization_id: '6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2',
  input: {
    text: 'Retrieve all available blog tags',
    files: [],
    user: null,
  },
  status: 'completed',
  last_executed_node_id: null,
  memory_thread_id: null,
  created_at: '2025-01-09T13:48:19.317567Z',
  started_at: '2025-01-09T13:48:20.353181Z',
  paused_at: null,
  finished_at: '2025-01-09T13:48:20.586580Z',
  result: 'success!!!!',
  parent_execution: '79dce1ad-3dd5-476c-a1a9-f0ec37cee44b',
};

const ARTICLES_TASK = {
  id: 'a2a7384e-c82c-430d-9b72-bb0822feac40',
  agent_id: '840fd394-3d3e-4ec8-9089-3b2f37ed5c3d',
  organization_id: '6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2',
  input: {
    text: 'Retrieve the latest article title',
    files: [],
    user: null,
  },
  status: 'completed',
  last_executed_node_id: null,
  memory_thread_id: null,
  created_at: '2025-01-09T13:48:20.644357Z',
  started_at: '2025-01-09T13:48:24.026629Z',
  paused_at: null,
  finished_at: '2025-01-09T13:48:24.240629Z',
  result: 'success!!!!',
  parent_execution: '79dce1ad-3dd5-476c-a1a9-f0ec37cee44b',
};

const TEMP_TASK = {
  id: '1b07822f-7b31-4982-9a19-d89b81da1552',
  agent_id: '840fd394-3d3e-4ec8-9089-3b2f37ed5c2f',
  organization_id: '6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2',
  input: {
    text: 'Retrieve all tags to find the longest readable tag.',
    files: [],
    user: null,
  },
  status: 'pending',
  last_executed_node_id: null,
  memory_thread_id: null,
  created_at: '2025-01-13T11:35:38.811846Z',
  started_at: null,
  paused_at: null,
  finished_at: null,
  result: null,
  parent_execution: '0d655b9c-b5e4-42f0-b47a-e7f3cbfc01f1',
  pending_sub_executions: [],
  tool_call_id: 'call_FfYFkMt9P1xS91urK0V2nVxJ',
  worker_id: null,
  is_manually_stopped: false,
};

const TASK = TEMP_TASK;

console.log(MANAGER_TASK, TAGS_TASK, ARTICLES_TASK, TEMP_TASK);

describe('Test xpander.ai SDK (Worker Mode)', () => {
  it('Get Task and handle', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      localAgentControllerURL,
      TASK.organization_id,
    );
    const agent = xpanderClient.agents.get(TASK.agent_id);
    expect(agent).toHaveProperty('id');
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools();
    expect(tools.length).toBeGreaterThanOrEqual(1);

    // manually set execution - should come from worker
    agent.initTask(TASK);

    // configure memory
    const memory = agent.memory;
    memory.initMessages(
      agent.execution?.inputMessage as IMemoryMessage,
      agent.instructions,
    );

    while (!agent.isFinished()) {
      const response: any = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: agent.messages as any,
        tools: agent.getTools(),
        tool_choice: 'auto',
        temperature: 0.0,
      });

      // add messages from the LLM (auto extraction)
      agent.addMessages(response);

      // extract tool calls
      const toolCalls = XpanderClient.extractToolCalls(response);
      agent.runTools(toolCalls);

      // when using local tools
    }

    expect(memory.messages[memory.messages.length - 1].role).toEqual(
      'assistant',
    );
  }, 3000000);
});
