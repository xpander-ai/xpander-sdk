import dotenv from 'dotenv';
import { IOpenAIToolOutput, LLMProvider, XpanderClient } from '../src';

dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.XPANDER_AGENT_API_KEY || '';
const agentUrl = process.env.XPANDER_AGENT_URL || '';

describe('Test XPander Client', () => {
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
});
