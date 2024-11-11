import request, { HttpVerb } from 'sync-request';
import { ITool, IToolCall, IToolInstructions, ToolCallType } from '../types';
import { Configuration } from './Configuration';
import { LOCAL_TOOL_PREFIX } from '../constants/tools';
import { CUSTOM_AGENT_ID } from '../constants/xpanderClient';
import { SourceNodeType } from '../types/agents';

/**
 * Creates a tool representation for xpanderAI based on tool instructions,
 * formatting description and ensuring parameter fields are included.
 * @param toolInstructions - Instructions containing details about the tool.
 * @returns A tool object structured for use in xpanderAI.
 */
export function createTool(toolInstructions: IToolInstructions): any {
  const { id, functionDescription, parameters } = toolInstructions;

  const description =
    `${functionDescription.split(' - Valid')[0]} IMPORTANT! Ensure to use bodyParams, queryParams, pathParams. These are crucial for correct function calling!`.slice(
      0,
      1024,
    );

  const createdTool: ITool = {
    name: id,
    description,
    parameters: parameters || {},
  };

  return {
    type: 'function',
    function: {
      name: createdTool.name,
      description: createdTool.description,
      parameters: createdTool.parameters,
    },
  };
}

/**
 * Executes a specified tool for an agent in xpanderAI, sending a request with
 * the appropriate payload structure including headers, path, query, and body parameters.
 * @param tool - The tool call details.
 * @param agentUrl - The base URL of the agent.
 * @param configuration - Configuration for authentication and custom params.
 * @param sourceNodeType - Source node type for tool operation.
 * @returns The result of the tool execution, parsed as JSON if possible.
 * @throws Error if the response status code indicates failure.
 */
export function executeTool(
  tool: IToolCall,
  agentUrl: string,
  configuration: Configuration,
  sourceNodeType: SourceNodeType,
): any {
  const url = `${agentUrl}/${sourceNodeType}/operations/${tool.name}`;
  const requestPayload = {
    ...(configuration?.customParams?.connectors
      ? { [CUSTOM_AGENT_ID]: configuration.customParams }
      : {}),
    body_params: tool?.payload?.bodyParams || {},
    path_params: tool?.payload?.pathParams || {},
    query_params: tool?.payload?.queryParams || {},
    headers: tool?.payload?.headers || {},
  };
  const response = request('POST' as HttpVerb, url, {
    json: requestPayload,
    headers: { 'x-api-key': configuration.apiKey },
  });

  if (!response.statusCode.toString().startsWith('2')) {
    throw new Error(
      `error ${response.statusCode} - ${response.body.toString()}`,
    );
  } else {
    try {
      return JSON.parse(response.getBody('utf8')); // return as json
    } catch (err) {
      return response.getBody('utf8'); // return raw in case of parsing issue
    }
  }
}

/**
 * Generates the base signature for a tool, identifying tool type and presence of
 * prompt group (Pg) functionality based on the tool name.
 * @param toolName - The name of the tool.
 * @param toolCallId - Unique identifier for the tool call.
 * @returns An object containing base details about the tool, such as its type and ID.
 */
export function getToolBaseSignature(toolName: string, toolCallId: string) {
  return {
    name: toolName.startsWith(LOCAL_TOOL_PREFIX)
      ? toolName.slice(LOCAL_TOOL_PREFIX.length)
      : toolName,
    isPg: toolName.startsWith('Pg'),
    type: toolName.startsWith(LOCAL_TOOL_PREFIX)
      ? ToolCallType.LOCAL
      : ToolCallType.XPANDER,
    toolCallId: toolCallId,
  };
}
