/**
 * Interface representing a parameter for a tool.
 */
export interface IToolParameter {
  /** The type of the parameter (e.g., string, object). */
  type: string;

  /** Properties of the parameter, if it is an object type. */
  properties: Record<string, IToolParameter>;

  /** List of required properties within this parameter, if any. */
  required?: string[];
}

/**
 * Interface representing a general tool.
 */
export interface ITool {
  /** The name of the tool. */
  name: string;

  /** A description of the tool's functionality. */
  description: string;

  /** Parameters required by the tool. */
  parameters?: Record<string, IToolParameter>;

  /** Function to execute the tool's logic. */
  func?: any;
}

/**
 * Interface representing the input schema for a Bedrock tool.
 */
export interface IBedrockToolSpecInputSchema {
  /** JSON schema defining the parameters for the tool. */
  json: Record<string, IToolParameter>;
}

/**
 * Interface representing the specification for a Bedrock tool.
 */
export interface IBedrockToolSpec {
  /** The name of the Bedrock tool. */
  name: string;

  /** Description of what the Bedrock tool does. */
  description: string;

  /** Input schema detailing required parameters for the tool. */
  inputSchema: IBedrockToolSpecInputSchema;
}

/**
 * Interface representing a Bedrock tool.
 */
export interface IBedrockTool {
  /** Specification details for the Bedrock tool. */
  toolSpec: IBedrockToolSpec;

  /** Function to execute the tool, if defined. */
  execute?: any;
}

/**
 * Output interface for a Bedrock tool.
 */
export interface IBedrockToolOutput {
  /** Specification of the Bedrock tool. */
  readonly toolSpec: IBedrockToolSpec;

  /** Function to execute the Bedrock tool. */
  readonly execute?: any;
}

/**
 * Output interface for an OpenAI tool function.
 */
export interface IOpenAIToolFunctionOutput {
  /** The name of the tool function. */
  readonly name: string;

  /** Description of the tool function's purpose. */
  readonly description: string;

  /** Parameters required for the tool function. */
  readonly parameters?: IToolParameter;

  /** Primary function to execute the tool. */
  readonly func?: any;

  /** Secondary execution function for Bedrock compatibility. */
  readonly execute?: any;
}

/**
 * Output interface for an OpenAI tool.
 */
export interface IOpenAIToolOutput {
  /** Type of the tool, typically 'function'. */
  readonly type: string;

  /** Function specification for the OpenAI tool. */
  readonly function: IOpenAIToolFunctionOutput;
}

/**
 * Type representing a tool output, compatible with both Bedrock and OpenAI tools.
 */
export type IToolOutput = IBedrockToolOutput | IOpenAIToolOutput;

/**
 * Interface for a function within a local tool.
 */
export interface ILocalToolFunction {
  /** The name of the local tool function. */
  readonly name: string;

  /** Description of the local tool's purpose. */
  readonly description: string;

  /** Parameters used by the local tool function. */
  readonly parameters: any;
}

/**
 * Interface for a local tool.
 */
export interface ILocalTool {
  /** Specifies the tool type as a 'function'. */
  readonly type: 'function';

  /** Function specification for the local tool. */
  readonly function: ILocalToolFunction;
}

/**
 * Interface representing instructions for a tool.
 */
export interface IToolInstructions {
  /** Identifier for the tool. */
  id: string;

  /** Description of the tool's function. */
  functionDescription: string;

  /** Parameters required by the tool. */
  parameters?: any;
}

/**
 * Interface representing the payload for a tool call.
 */
export interface IToolCallPayload {
  /** Parameters for the request body. */
  bodyParams: Record<string, any>;

  /** Parameters for the URL query string. */
  queryParams: Record<string, any>;

  /** Parameters for the URL path. */
  pathParams: Record<string, any>;

  /** Headers for the tool call request. */
  headers: Record<string, any>;
}

/**
 * Enum representing types of tool calls.
 */
export enum ToolCallType {
  XPANDER = 'xpander',
  LOCAL = 'local',
}

/**
 * Interface representing a tool call.
 */
export interface IToolCall {
  /** The name of the tool being called. */
  name: string;

  /** The type of the tool call (e.g., xpander, local). */
  type: ToolCallType;

  /** Payload data for the tool call. */
  payload: IToolCallPayload;

  /** Unique identifier for the tool call. */
  toolCallId: string;

  /** Flag indicating if the tool call is part of a prompt group. */
  isPg: boolean;
}

/**
 * Interface representing the result of a tool call.
 */
export interface IToolCallResult {
  /** Name of the function called in the tool. */
  functionName: string;

  /** Payload data used in the tool call. */
  payload: IToolCallPayload;

  /** Status code returned from the tool call, if available. */
  statusCode?: number;

  /** Result of the tool call, if successful. */
  result?: any;

  /** Success flag indicating if the tool call was successful. */
  isSuccess?: boolean;

  /** Error flag indicating if there was an error with the tool call. */
  isError?: boolean;

  /** Unique identifier for the tool call. */
  toolCallId: string;
}
