import request, { HttpVerb } from 'sync-request';
import { XpanderClient } from './XpanderClient';
import { RequestPayload } from '../models/payloads';
import { ITool } from '../types';

/**
 * Interface representing tool instructions.
 */
interface IToolInstructions {
  /** The ID of the tool. */
  id: string;
  /** The description of the tool function. */
  function_description: string;
  /** The parameters for the tool. */
  parameters?: any;
}

/**
 * Creates a tool based on the provided client and tool instructions.
 * @param client - The XpanderClient instance.
 * @param toolInstructions - Instructions for creating the tool.
 * @param functionize - (Optional) Whether to include an invocation function for the tool. Default is true.
 * @returns The created Tool object.
 * @throws Will throw an error if the client object or its properties are not properly initialized.
 */
export function createTool(
  client: XpanderClient,
  toolInstructions: IToolInstructions,
  functionize: boolean = true,
  getFunctionOnly: boolean = false,
): ITool | any {
  if (!client || !client.agentKey || !client.agentUrl) {
    throw new Error(
      'Client object or its properties are not properly initialized.',
    );
  }

  let functionDescription = '';
  let functionInvocationMethod: any;

  const toolData: any = toolInstructions;
  if (functionize) {
    const toolInvocationFunction = (payload: RequestPayload): any => {
      const url = `${client.agentUrl}/operations/${toolData?.id || toolData?.function?.name}`;
      const jsonPayload: any = payload instanceof Object ? payload : {};

      try {
        const xchatParams = client._getXChatParamsIfExist();
        const hasXChatParams = !!xchatParams.organization_id;
        if (hasXChatParams) {
          jsonPayload.__xchat__ = xchatParams;
        }

        const response = request('POST' as HttpVerb, url, {
          json: jsonPayload,
          headers: { 'x-api-key': client.agentKey },
        });

        if (response.statusCode !== 200) {
          throw new Error(response.body.toString());
        }

        return JSON.parse(response.getBody('utf8'));
      } catch (err) {
        // Ensure 'err' is typed as 'any' to access its properties
        const error = err as any;
        console.error('Error invoking tool:', error.message);
        throw error;
      }
    };

    if (getFunctionOnly) {
      return toolInvocationFunction;
    }

    functionDescription = toolData?.function?.description;
    functionInvocationMethod = toolInvocationFunction;
  }

  const tool: ITool = {
    name: toolInstructions.id,
    description:
      toolInstructions.function_description.split(' - Valid')[0] +
      ' IMPORTANT! make sure to use body_params, query_params, path_params. these are crucial for ensuring function calling works!',
  };

  if (tool?.description) {
    functionDescription = tool.description;
  }

  if (toolInstructions.parameters) {
    tool.parameters = toolInstructions.parameters;
  }

  tool.description = functionDescription;
  tool.func = functionInvocationMethod;

  return tool;
}
