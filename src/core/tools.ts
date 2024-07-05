// src/core/tools.ts

import axios from 'axios';
import { XpanderClient } from './XpanderClient';
import { RequestPayload } from '../models/payloads';

/**
 * Interface representing the instructions for creating a tool.
 */
interface ToolInstructions {
  id: string;
  function_description: string;
  parameters?: any;
}

/**
 * Interface representing a tool with its details and optional invocation function.
 */
interface Tool {
  name: string;
  description: string;
  parameters?: any;
  func?: Function;
}

/**
 * Creates a tool based on the provided client and tool instructions.
 * @param client - The XpanderClient instance.
 * @param toolInstructions - Instructions for creating the tool.
 * @param functionize - (Optional) Whether to include an invocation function for the tool. Default is true.
 * @returns The created Tool object.
 * @throws Will throw an error if the client object or its properties are not properly initialized.
 */
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