import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Assuming OpenAI is an external library installed via npm
import { XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const xpanderAgentId = '5ee3bfa2-d035-40eb-9037-fe562011ea38';
const openAIKey = process.env.OPENAI_API_KEY || '';
const localAgentControllerURL = process.env.LOCAL_AGENT_CONTROLLER || '';
const organizationId = process.env.ORGANIZATION_ID || '';

const openaiClient = new OpenAI({
  apiKey: openAIKey,
});

const getStartTime = () => performance.now();
const announceTiming = (start: number, label: string) =>
  console.log(`${label} took ${(performance.now() - start).toFixed(2)} ms`);

describe('Test xpander.ai SDK (**NO** Worker Mode)', () => {
  it('Get Task and handle', async () => {
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
    expect(agent.tools.length).toBeGreaterThanOrEqual(1);

    const tools = agent.getTools();
    console.log('Tools:', tools);
    expect(tools.length).toBeGreaterThanOrEqual(1);

    startTime = getStartTime();
    // manually set execution - should come from worker when running in cloud/on-prem
    //agent.addTask('get longest readable tag');
    // agent.addTask('Please look at my last two weeks of emails and help me draft responses to the most important ones.');

    // agent.addTask('Please look at my last email and summarize it.');
    agent.addTask('get the last message from dev channel');
    announceTiming(startTime, 'Invoke Agent');

    console.log(
      'Memory Thread after add task:',
      JSON.stringify(agent.memory.messages, null, 2),
    );
    let num_loops = 1;
    let shouldSkip = false;
    while (!agent.isFinished()) {
      if (shouldSkip) {
        shouldSkip = false;
        continue;
      }
      console.log('num_loops:', num_loops);
      num_loops++;
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
      //  console.log('Response from LLM:', response); // Print the response object
      agent.addMessages(response);
      announceTiming(startTime, 'Adding messages');

      // Print the memory thread after adding messages
      console.log(
        'Memory Thread after adding messages:',
        JSON.stringify(agent.memory.messages, null, 2),
      );

      // extract tool calls
      startTime = getStartTime();
      const toolCalls = XpanderClient.extractToolCalls(response);
      console.log('Tool Calls:', JSON.stringify(toolCalls, null, 2));
      announceTiming(startTime, 'Toolcall Extractions');

      // Print the memory thread after extracting tool calls
      console.log(
        'Memory Thread after extracting tool calls:',
        JSON.stringify(agent.memory.messages, null, 2),
      );

      startTime = getStartTime();
      agent.runTools(toolCalls, {
        bodyParams: { organization_id: organizationId },
      });
      announceTiming(startTime, 'Running tools');

      // Print the memory thread after running tools
      console.log(
        'Memory Thread after running tools:',
        JSON.stringify(agent.memory.messages, null, 2),
      );

      // when using local tools
      // agent.memory.addToolCallResults(toolResults);
    }

    startTime = getStartTime();
    const executionResult = agent.retrieveExecutionResult();
    // console.log('Execution Result:', agent.memory.messages);
    announceTiming(startTime, 'Retrieve execution result');

    // Print the memory thread after retrieving execution result
    console.log(
      'Memory Thread after retrieving execution result:',
      JSON.stringify(agent.memory.messages, null, 2),
    );

    expect(executionResult?.result.length).toBeGreaterThanOrEqual(1);
  }, 3000000);
});
