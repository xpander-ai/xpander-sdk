import dotenv from 'dotenv';
import { IOpenAIToolOutput, LLMProvider, XpanderClient } from '../src';

dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';
const chatAgentID = process.env.CHAT_AGENT_ID || '';
const agentsURL = process.env.AGENTS_URL || '';
const chatAgentKey = process.env.CHAT_AGENT_API_KEY || '';

describe.only('Test XPander Client', () => {
  it('tools are not empty', () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      agentUrl,
      LLMProvider.OPEN_AI,
    );
    const tools: IOpenAIToolOutput[] =
      xpanderClient.tools() as IOpenAIToolOutput[];
    expect(tools).toBeInstanceOf(Array);
    expect(tools).not.toHaveLength(0);
  });

  it('allow tools by constructor', () => {
    const _tools = [
      {
        type: 'function',
        function: {
          name: 'XpanderAI-yaml-to-csv-excel-convertYamlToExcelOrCsv',
          description:
            "Converts YAML to Excel or CSV format. If yaml_content isn't provided, run extractMediaPlansFromFile before anything else to get YAML data. Use 4 data transformation, creating spreadsheets from YAML, or preparing data 4 analysis in Excel or CSV format. IMPORTANT! make sure to use body_params, query_params, path_params. these are crucial for ensuring function calling works!",
          parameters: {
            type: 'object',
            properties: {
              query_params: { type: 'object', properties: {}, required: [] },
              path_params: { type: 'object', properties: {}, required: [] },
              body_params: {
                type: 'object',
                properties: {
                  file_name: {
                    type: 'string',
                    description: 'File name - NO extension.',
                  },
                  is_csv: {
                    type: 'boolean',
                    description:
                      'Mark `true` for YAML to CSV conversion, `false` for YAML to Excel conversion.',
                  },
                  yaml_content: {
                    type: 'string',
                    description: 'YAML content to convert.',
                  },
                },
                required: [],
              },
            },
            required: ['query_params', 'path_params', 'body_params'],
          },
        },
      },
    ];
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      agentUrl,
      LLMProvider.OPEN_AI,
      undefined,
      _tools,
    );
    const tools: IOpenAIToolOutput[] =
      xpanderClient.tools() as IOpenAIToolOutput[];
    expect(tools).toBeInstanceOf(Array);
    expect(tools).not.toHaveLength(0);
  });

  it('allow custom params by constructor', () => {
    const chatParams = {
      // those are hardcoded for test purpose and would need to change in case these ids change.
      organization_id: '6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2',
      connectors: [
        {
          id: '0cf2a84a-b9e8-4c72-aa43-4b39ecf0cd70',
          operation_ids: ['66cdb21ac2d9da6b42de0b0f'],
        },
      ],
    };

    const xpanderClient = new XpanderClient(
      chatAgentKey,
      agentsURL + '/' + chatAgentID,
      LLMProvider.OPEN_AI,
      undefined,
      undefined,
      chatParams,
    );

    const tools = xpanderClient.tools();
    expect(tools).toBeInstanceOf(Array);
    expect(tools).not.toHaveLength(0);
    console.log(tools);
  });
});
