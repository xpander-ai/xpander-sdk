import request, { HttpVerb } from 'sync-request';
import { LOCAL_TOOL_PREFIX } from '../../constants/tools';
import {
  ITool,
  IToolCallPayload,
  IToolExecutionResult,
  IToolInstructions,
  SimplifiedSchemaMatchResult,
  ToolCallType,
} from '../../types';
import {
  IAgentGraphItemMCPSettings,
  IAgentGraphItemSchema,
} from '../../types/agents';
import { Configuration } from '../Configuration';
import { GraphItem } from '../graphs';
import { ToolCall, ToolCallResult } from './ToolCall';
import { convertKeysToCamelCase, toCamelCase } from '../utils';

/**
 * Creates a tool representation for xpanderAI based on tool instructions,
 * formatting description and ensuring parameter fields are included.
 *
 * @param toolInstructions - Instructions containing details about the tool.
 * @returns A tool object structured for use in xpanderAI.
 */
export function createTool(toolInstructions: IToolInstructions): any {
  const { id, functionDescription, parameters } = toolInstructions;

  const description = functionDescription.slice(0, 1024);

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
 *
 * @param tool - The tool call details.
 * @param agentUrl - The base URL of the agent.
 * @param configuration - Configuration for authentication and custom params.
 * @param sourceNodeType - Source node type for tool operation.
 * @returns The result of the tool execution, parsed as JSON if possible.
 * @throws Error if the response status code indicates failure.
 */
export function executeTool(
  tool: ToolCall,
  agentUrl: string,
  configuration: Configuration,
  executionId: string,
  isMultiple: boolean = false,
  hasOutputSchema: boolean = false,
  agentVersion?: any,
): IToolExecutionResult {
  const result: IToolExecutionResult = {
    statusCode: 200,
    data: null,
    isSuccess: true,
    headers: {},
  };

  try {
    const url = `${agentUrl}/${executionId}/operations/${tool.name}`;
    const requestPayload = {
      body_params: tool?.payload?.bodyParams || {},
      path_params: tool?.payload?.pathParams || {},
      query_params: tool?.payload?.queryParams || {},
      headers: tool?.payload?.headers || {},
    };

    const headers: any = {
      'x-api-key': configuration.apiKey,
      'x-xpander-tool-call-id': tool.toolCallId,
      'x-xpander-parallel': isMultiple ? 'true' : 'false',
      'x-xpander-with-auto-report-result': hasOutputSchema ? 'false' : 'true',
    };
    if (agentVersion && Number(agentVersion) >= 2) {
      headers['x-agent-version'] = agentVersion;
    }

    const response = request('POST' as HttpVerb, url, {
      json: requestPayload,
      headers,
    });
    result.statusCode = response.statusCode || 0;
    result.headers = response.headers;

    if (!response.statusCode.toString().startsWith('2')) {
      result.data = response.body.toString();
      result.isSuccess = false;
    } else {
      try {
        result.data = JSON.parse(response.getBody('utf8')); // return as json
      } catch (err) {
        result.data = response.getBody('utf8'); // return raw in case of parsing issue
      }
    }

    // Error handling for GRPC like responses
    if (
      typeof result?.data === 'object' &&
      result.data?.ok === false &&
      'error' in result?.data
    ) {
      throw new Error(JSON.stringify(result.data));
    }
  } catch (err: any) {
    result.statusCode = 500;
    result.data = err.toString();
  }
  return result;
}

export function testToolGraphPosition(
  tool: ToolCall,
  agentUrl: string,
  configuration: Configuration,
  executionId: string,
): boolean {
  try {
    const url = `${agentUrl}/${executionId}/operations/${tool.name}`;
    const requestPayload = {
      body_params: {},
      path_params: {},
      query_params: {},
      headers: {},
    };
    const response = request('HEAD' as HttpVerb, url, {
      json: requestPayload,
      headers: {
        'x-api-key': configuration.apiKey,
        'x-xpander-tool-call-id': tool.toolCallId,
      },
    });

    if (!response.statusCode.toString().startsWith('2')) {
      return false;
    } else {
      return true;
    }
  } catch (err: any) {
    return false;
  }
}

/**
 * Generates the base signature for a tool, identifying tool type.
 *
 * @param toolName - The name of the tool.
 * @param toolCallId - Unique identifier for the tool call.
 * @returns An object containing base details about the tool, such as its type and ID.
 */
export function getToolBaseSignature(toolName: string, toolCallId: string) {
  return {
    name: toolName.startsWith(LOCAL_TOOL_PREFIX)
      ? toolName.slice(LOCAL_TOOL_PREFIX.length)
      : toolName,
    type: toolName.startsWith(LOCAL_TOOL_PREFIX)
      ? ToolCallType.LOCAL
      : ToolCallType.XPANDER,
    toolCallId: toolCallId,
  };
}

/**
 * Performs a deep merge of two objects, combining arrays and overriding properties.
 *
 * @param target - The target object to merge into.
 * @param source - The source object to merge from.
 * @returns A new object representing the merged result.
 */
export function mergeDeep<T>(target: T, source: T): T {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = (target as any)[key];
      const sourceValue = (source as any)[key];

      if (Array.isArray(sourceValue)) {
        (target as any)[key] = Array.isArray(targetValue)
          ? [...targetValue, ...sourceValue]
          : [...sourceValue];
      } else if (typeof sourceValue === 'object') {
        (target as any)[key] = mergeDeep(
          targetValue && typeof targetValue === 'object' ? targetValue : {},
          sourceValue,
        );
      } else {
        (target as any)[key] = sourceValue;
      }
    }
  }

  return target;
}

/**
 * Ensures a consistent structure for the tool call payload, setting default values for parameters.
 *
 * @param payload - The payload object to structure.
 * @returns A structured tool call payload.
 */
export function ensureToolCallPayloadStructure(
  isLocal: boolean = false,
  payload: any,
): IToolCallPayload {
  if (isLocal) {
    return payload;
  }
  return {
    bodyParams: { ...(payload?.bodyParams || {}) },
    queryParams: { ...(payload?.queryParams || {}) },
    pathParams: { ...(payload?.pathParams || {}) },
    headers: { ...(payload?.headers || {}) },
  };
}

/**
 * Extracts properties from a schema object, simplifying it into a list of match results
 * containing paths, blocked statuses, and permanent values.
 *
 * @param obj - The schema object to extract properties from.
 * @param path - The current traversal path (used internally).
 * @returns A list of simplified schema match results.
 */
export function extractSimplifiedSchemaProps(
  obj: any,
  path: string[] = [],
): SimplifiedSchemaMatchResult[] {
  const results: SimplifiedSchemaMatchResult[] = [];

  // Helper function to format the path
  const formatPath = (p: string[]): string =>
    p.slice(0, p.length - 1).join('.');

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = [...path, key];
      const value = obj[key] as any;

      // Recurse into nested objects
      if (typeof value === 'object' && value !== null) {
        results.push(...extractSimplifiedSchemaProps(value, currentPath));
      }

      // Handle isBlocked and permanentValue properties
      if (
        key === 'isBlocked' ||
        key === 'permanentValue' ||
        key === 'description'
      ) {
        const formattedPath = formatPath(currentPath);
        const existingMatch = results.find(
          (result) => result.path === formattedPath,
        );

        if (key === 'isBlocked' && typeof value === 'boolean') {
          if (existingMatch) {
            existingMatch.isBlocked = value;
          } else {
            results.push({ path: formattedPath, isBlocked: value });
          }
        }

        if (
          key === 'permanentValue' &&
          (typeof value === 'string' ||
            typeof value === 'number' ||
            Array.isArray(value))
        ) {
          if (existingMatch) {
            existingMatch.permanentValue = value;
          } else {
            results.push({
              path: formattedPath,
              permanentValue: value,
            });
          }
        }

        if (
          key === 'description' &&
          (typeof value === 'string' || typeof value === 'number')
        ) {
          if (existingMatch) {
            existingMatch.description = value as string;
          } else {
            results.push({ path: formattedPath, description: value as string });
          }
        }
      }
    }
  }

  return results;
}

const getByPath = (obj: any, path: string): any => {
  const parts = path.split('.');
  return parts.reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    return acc[key];
  }, obj);
};

/**
 * Deletes a property from an object or array by following a specified path.
 *
 * @param obj - The object from which to delete the property.
 * @param path - The dot-separated path to the property.
 */
export function deletePropertyByPath(obj: any, path: string): void {
  const keys = path.split('.');

  function deleteInArray(array: any[], arrKeys: string[]): void {
    const currentKey = arrKeys[0];
    const remainingKeys = arrKeys.slice(1);

    for (const item of array) {
      if (remainingKeys.length > 0) {
        // If there are more keys, keep traversing
        if (currentKey in item) {
          if (Array.isArray(item[currentKey])) {
            deleteInArray(item[currentKey], remainingKeys);
          } else {
            deletePropertyByPath(item[currentKey], remainingKeys.join('.'));
          }
        }
      } else {
        // Delete the final property in each object
        if (currentKey in item) {
          delete item[currentKey];
        }

        // Handle "required" logic
        if (Array.isArray(item.required)) {
          item.required = item.required.filter(
            (req: string) => req !== currentKey,
          );
        }
      }
    }
  }

  let current = obj;
  let isDeletingLastKey = false;
  // Traverse to the parent of the target property
  for (let i = 0; i <= keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      // If the path doesn't exist, exit early
      return;
    }

    const isLast = i === keys.length - 1;
    if (isLast) {
      isDeletingLastKey = true;
    }

    if (Array.isArray(current[key])) {
      // If the key points to an array, handle array logic
      deleteInArray(current[key], keys.slice(i + 1));
      return;
    } else if (!isLast) {
      current = current[key];
    }
  }

  // The last key to be deleted
  const lastKey = keys[keys.length - 1];

  // prepare required field deletion
  const parentPathKeys = keys.slice(0, -2); // Up to parent of parent
  let parentOfParent = obj;

  // Delete the property if it exists
  if (lastKey in current) {
    delete current[lastKey];
    if (isDeletingLastKey) {
      const parent = getByPath(obj, keys.slice(0, -2).join('.'));
      if (parent && 'required' in parent && Array.isArray(parent?.required)) {
        parent.required = parent.required.filter(
          (item: string) => item !== lastKey,
        );
      }
    }
  }

  // Handle "required" logic
  for (const key of parentPathKeys) {
    if (!(key in parentOfParent)) {
      return;
    }
    parentOfParent = parentOfParent[key];
  }

  const parentKey = keys[keys.length - 2];
  if (Array.isArray(parentOfParent.required)) {
    parentOfParent.required = parentOfParent.required.filter(
      (item: string) => item !== parentKey,
    );
  }
}

/**
 * Filters out properties from a tool's parameters based on schema restrictions, such as
 * blocked properties or those with permanent values.
 *
 * @param tool - The tool object to filter.
 * @param schemasByNodeName - The schemas defining property restrictions.
 * @param kind - The type of schema to consider ('input' or 'output').
 */
export function modifyPropertiesByRemoteSettings(
  tool: any,
  kind: 'input' | 'output',
  graphItem?: GraphItem,
): any {
  const newTool = JSON.parse(JSON.stringify({ ...tool })); // deep copy
  const matchedSchemas = graphItem?.settings?.schemas?.[kind];
  if (matchedSchemas) {
    let simplifiedSchema = extractSimplifiedSchemaProps(matchedSchemas);
    if (
      simplifiedSchema.some(
        (prop) =>
          prop.isBlocked === true ||
          !!prop.permanentValue ||
          !!prop.description,
      )
    ) {
      // convert paths to camelCase
      simplifiedSchema = simplifiedSchema.map((prop) => {
        const pathParts = prop.path.split('.');
        pathParts[1] = toCamelCase(pathParts[1]);
        prop.path = pathParts.join('.');
        return prop;
      });
      for (const prop of simplifiedSchema) {
        if (!!prop.description) {
          appendDescriptionOverride(newTool, graphItem);
        }
        // if is blocked or has sticky value - llm shouldn't know about it
        if (prop.isBlocked || !!prop.permanentValue) {
          deletePropertyByPath(newTool.function.parameters, prop.path);
        }
      }
    }
  }
  return newTool;
}

/**
 * Sets a value in an object or array at a specified path, creating intermediate objects as needed.
 *
 * @param obj - The target object or array.
 * @param path - The dot-separated path where the value should be set.
 * @param value - The value to set.
 */
export function setValueByPath<T extends object>(
  obj: T,
  path: string,
  value: any,
): void {
  const [key, ...rest] = path.split('.');

  if (rest.length === 0) {
    // Base case: set the value when no more keys remain
    if (Array.isArray(obj)) {
      // If the current object is an array, set the value in each element
      for (const item of obj) {
        if (typeof item === 'object') {
          (item as any)[key] = value;
        }
      }
    } else {
      (obj as any)[key] = value;
    }
  } else {
    // Recursive case: traverse further down the path
    if (Array.isArray(obj)) {
      // If the current object is an array, recurse into each element
      for (const item of obj) {
        if (typeof item === 'object') {
          setValueByPath(item as any, rest.join('.'), value);
        }
      }
    } else {
      // Ensure the next key exists and is an object or array
      if (!(key in obj) || typeof (obj as any)[key] !== 'object') {
        (obj as any)[key] = isNaN(Number(rest[0])) ? {} : [];
      }
      setValueByPath((obj as any)[key], rest.join('.'), value);
    }
  }
}

/**
 * Appends permanent values to the tool's payload based on schema restrictions.
 *
 * @param tool - The tool object to modify.
 * @param schemasByNodeName - The schemas defining property restrictions.
 */
export function appendPermanentValues(
  tool: ToolCall,
  schemas: IAgentGraphItemSchema,
): ToolCall {
  const newTool = ToolCall.fromObject(tool.toDict());
  const matchedSchemas = schemas?.input;
  if (matchedSchemas) {
    let simplifiedSchema = extractSimplifiedSchemaProps(matchedSchemas);
    if (
      simplifiedSchema.some((prop) => !!prop.permanentValue || prop.isBlocked)
    ) {
      // convert paths to camelCase
      simplifiedSchema = simplifiedSchema.map((prop) => {
        const pathParts = prop.path.split('.');
        pathParts[1] = toCamelCase(pathParts[1]);
        // join and remove "properties" prefix
        prop.path = pathParts
          .join('.')
          .replace(/(?:^|\.)properties\.(\w+)\.properties(\.|$)/g, '.$1.')
          .replace(/^\./, ''); // Remove leading dot if present

        return prop;
      });
      for (const prop of simplifiedSchema) {
        // if is blocked or has sticky value - llm shouldn't know about it
        if (!!prop.permanentValue || prop.isBlocked) {
          deletePropertyByPath(newTool.payload, prop.path);
          setValueByPath(newTool.payload, prop.path, prop.permanentValue);
        }
      }
    }
  }
  return newTool;
}

/**
 * Appends permanent values to the tool call result based on schema restrictions.
 *
 * @param toolCallResult - The tool call result to modify.
 * @param schemasByNodeName - The schemas defining property restrictions.
 */
export function appendPermanentValuesToResult(
  toolCallResult: ToolCallResult,
  schemas: IAgentGraphItemSchema,
): ToolCallResult {
  const newToolCallResult = ToolCallResult.fromObject(toolCallResult.toDict());
  const matchedSchemas = schemas?.output;
  if (matchedSchemas) {
    let simplifiedSchema = extractSimplifiedSchemaProps(matchedSchemas);
    if (
      simplifiedSchema.some((prop) => !!prop.permanentValue || prop.isBlocked)
    ) {
      // convert paths to camelCase
      simplifiedSchema = simplifiedSchema.map((prop) => {
        const pathParts = prop.path.split('.');
        if (pathParts.length === 2) {
          pathParts.shift();
        }
        // join and remove "properties" prefix
        prop.path = pathParts
          .join('.')
          .replace(
            /(?:^|\.)properties\.(\w+)\.(?:items\.)?properties(\.|$)/g,
            '.$1.',
          )
          .replace(/^\./, ''); // Remove leading dot if present

        return prop;
      });
      for (const prop of simplifiedSchema) {
        // if is blocked or has sticky value - llm shouldn't know about it
        if (!!prop.permanentValue || prop.isBlocked) {
          deletePropertyByPath(newToolCallResult.result, prop.path);
          setValueByPath(
            newToolCallResult.result,
            prop.path,
            prop.permanentValue,
          );
        }
      }
    }
  }
  return newToolCallResult;
}

/**
 * Appends description override values to the tool's parameters description based on schema restrictions.
 *
 * @param tool - The tool object to modify.
 * @param schemasByNodeName - The schemas defining property restrictions.
 */
export function appendDescriptionOverride(
  tool: any,
  graphItem: GraphItem,
): any {
  const newTool = { ...tool };
  const matchedSchemas = graphItem?.settings?.schemas?.input;
  if (matchedSchemas) {
    let simplifiedSchema = extractSimplifiedSchemaProps(matchedSchemas);
    if (simplifiedSchema.some((prop) => !!prop.description)) {
      // convert paths to camelCase
      simplifiedSchema = simplifiedSchema.map((prop) => {
        const pathParts = prop.path.split('.');
        pathParts[1] = toCamelCase(pathParts[1]);
        // join and remove "properties" prefix
        prop.path = pathParts.join('.').replace(/^\./, ''); // Remove leading dot if present

        return prop;
      });
      for (const prop of simplifiedSchema) {
        // if is has description override
        if (!!prop.description) {
          const propExists = getByPath(newTool.function.parameters, prop.path);
          if (!!propExists) {
            setValueByPath(
              newTool.function.parameters,
              `${prop.path}.description`,
              prop.description,
            );
          }
        }
      }
    }
  }
  return newTool;
}

export const getSubAgentNameFromOAS = (agentId: string, oas: any) => {
  return oas?.paths?.[`/${agentId}`].get.operationId;
};

export const getSubAgentIdFromOASByName = (agentName: string, oas: any) => {
  return Object.keys(oas?.paths)
    ?.find((k) => oas?.paths[k].get.operationId === agentName)
    ?.replace('/', '');
};

export const generateToolCallId = (): string => {
  const prefix = 'call_';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 24;
  let randomString = '';

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return prefix + randomString;
};

export const getMCPServersTools = (graphItems: GraphItem[]): any[] => {
  const tools: any[] = [];
  // add attached mcp servers as tools
  for (const gi of graphItems) {
    if (!gi?.settings?.mcp_settings) continue;
    const mcpSettings: IAgentGraphItemMCPSettings = convertKeysToCamelCase(
      gi.settings.mcp_settings,
    );

    // build tool definition
    const tool: any = {
      type: 'mcp',
      server_label: mcpSettings.name,
      server_url: mcpSettings.url,
      require_approval: 'never',
    };

    // in case of tools whitelisting
    if (mcpSettings.allowedTools) {
      tool.allowed_tools = mcpSettings.allowedTools;
    }

    // authorization
    if (mcpSettings.apiKey) {
      tool.headers = {
        Authorization: `Bearer ${mcpSettings.apiKey}`,
      };
    }

    tools.push(tool);
  }

  return tools;
};
