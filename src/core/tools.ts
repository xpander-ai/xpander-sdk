// src/core/tools.ts

import axios from 'axios';
import { RequestPayload } from '../models/payloads';

interface Client {
  agent_url: string;
  agent_key: string;
  getAgentTools: () => any[];
}

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

export function createTool(client: Client, toolInstructions: ToolInstructions, functionize: boolean = true): Tool {
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
      const url = `${client.agent_url}/operations/${toolInstructions.id}`;
      const response = await axios.post(url, payload, {
        headers: { 'x-api-key': client.agent_key },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      try {
        return response.data;
      } catch {
        return response.statusText;
      }
    };

    tool.description = tool.description.slice(0, 1024); // max length of 1024
    tool.func = toolInvocationFunction;
  }

  return tool;
}