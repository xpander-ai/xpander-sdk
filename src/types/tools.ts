/**
 * Interface representing a tool parameter.
 */
export interface IToolParameter {
  /** The type of the parameter. */
  type: string;
  /** Properties of the parameter. */
  properties: Record<string, IToolParameter>;
  /** List of required properties. */
  required?: string[];
}

/**
 * Interface representing a tool.
 */
export interface ITool {
  /** The name of the tool. */
  name: string;
  /** The description of the tool. */
  description: string;
  /** Parameters of the tool. */
  parameters?: Record<string, IToolParameter>;
  /** Function to execute the tool. */
  func?: any;
}

/**
 * Interface representing the input schema for a Bedrock tool specification.
 */
export interface IBedrockToolSpecInputSchema {
  /** JSON schema of the tool parameters. */
  json: Record<string, IToolParameter>;
}

/**
 * Interface representing a Bedrock tool specification.
 */
export interface IBedrockToolSpec {
  /** The name of the Bedrock tool. */
  name: string;
  /** The description of the Bedrock tool. */
  description: string;
  /** Input schema of the Bedrock tool. */
  inputSchema: IBedrockToolSpecInputSchema;
}

/**
 * Interface representing a Bedrock tool.
 */
export interface IBedrockTool {
  /** The tool specification of the Bedrock tool. */
  toolSpec: IBedrockToolSpec;
  /** Function to execute the Bedrock tool. */
  execute?: any;
}

export interface IBedrockToolOutput {
  /** The tool specification of the Bedrock tool. */
  readonly toolSpec: IBedrockToolSpec;
  /** Function to execute the Bedrock tool. */
  readonly execute?: any;
}

export interface IOpenAIToolFunctionOutput {
  /** The name of the tool. */
  readonly name: string;
  /** The description of the tool. */
  readonly description: string;
  /** Parameters of the tool. */
  readonly parameters?: IToolParameter;
  /** Function to execute the tool. */
  readonly func?: any;
  /** Function to execute the Bedrock tool. */
  readonly execute?: any;
}

export interface IOpenAIToolOutput {
  readonly type: string;
  readonly function: IOpenAIToolFunctionOutput;
}

export type IToolOutput = IBedrockToolOutput | IOpenAIToolOutput;
