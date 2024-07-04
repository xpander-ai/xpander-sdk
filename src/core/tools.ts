// src/core/tools.ts

import axios from 'axios';
import { XpanderClient } from './XpanderClient';
import { RequestPayload } from '../models/payloads';

interface ToolInstructions {
  id: string;
  function_description: string;
  parameters?: any;
}

interface Tool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

export function createTool(client: XpanderClient, toolInstructions: ToolInstructions, functionize: boolean = true): Tool {
  if (!client || !client.agentKey || !client.agentUrl) {
    throw new Error('Client object or its properties are not properly initialized.');
  }

  const tool: Tool = {
    name: toolInstructions.id,
    description: toolInstructions.function_description.split(' - Valid')[0]
            + ' IMPORTANT! make sure to use body_params, query_params, path_params. these are crucial for ensuring function calling works!',
  };

  if (toolInstructions.parameters) {
    tool.parameters = toolInstructions.parameters;
  }

  if (functionize) {
    const toolInvocationFunction = async (payload: RequestPayload): Promise<any> => {
      const url = `${client.agentUrl}/operations/${toolInstructions.id}`;
      const jsonPayload = payload instanceof Object ? payload : {};

      // // Debug logs for troubleshooting
      // console.log('Client agent_url:', client.agentUrl);
      // console.log('Client agent_key:', client.agentKey);
      // console.log('Invoking tool with URL:', url);
      // console.log('Payload:', jsonPayload);
      // console.log('Headers:', { 'x-api-key': client.agentKey });

      try {
        const response = await axios.post(url, jsonPayload, {
          headers: { 'x-api-key': client.agentKey },
        });

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.data;
      } catch (err) {
        // Ensure 'err' is typed as 'any' to access its properties
        const error = err as any;
        console.error('Error invoking tool:', error.response?.data || error.message);
        throw error;
      }
    };

    tool.description = tool.description.slice(0, 1024); // max length of 1024
    tool.func = toolInvocationFunction;
  }

  return tool;
}