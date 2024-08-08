import { IBedrockToolOutput, ILocalTool } from '../types';

// Simplified payload interface
export interface IToolResponsePayload {
  /** A string property for the tool response payload. */
  property1: string;
  /** A numeric property for the tool response payload. */
  property2: number;
}

// Tool response interface
export interface IToolResponse {
  /** The ID of the tool call. */
  toolCallId: string;
  /** The role in the response. */
  role: string;
  /** The name of the tool. */
  name: string;
  /** The response message from the tool. */
  responseMessage: string;
  /** The filtered tool object. */
  filteredTool: object;
  /** The request payload that sent to tool. */
  payloadRequest: string;
}

// Tool response class
export class ToolResponse implements IToolResponse {
  /**
   * Creates a ToolResponse instance from a JSON object.
   * @param json - The JSON object to create the instance from.
   * @returns A new ToolResponse instance.
   */
  static fromJSON(json: any): ToolResponse {
    return new ToolResponse(
      json.toolCallId,
      json.role,
      json.name,
      json.responseMessage,
      json.filteredTool,
      json.payloadRequest,
    );
  }

  toolCallId: string;
  role: string;
  name: string;
  responseMessage: string;
  filteredTool: object;
  payloadRequest: string;
  localTool?: any;

  /**
     * Constructs a new ToolResponse instance.
     * @param toolCallId - The ID of the tool call.
     * @param role - The role in the response.
     * @param name - The name of the tool.
     * @param responseMessage - The response message from the tool.
     * @param filteredTool - The filtered tool object.
     * @param payloadRequest - The request payload that sent to tool.

     */
  constructor(
    toolCallId: string,
    role: string,
    name: string,
    responseMessage: string,
    filteredTool: object,
    payloadRequest: string,
    localTool?: IBedrockToolOutput | ILocalTool,
  ) {
    this.toolCallId = toolCallId;
    this.role = role;
    this.name = name;
    this.responseMessage = responseMessage;
    this.filteredTool = filteredTool;
    this.payloadRequest = payloadRequest;
    this.localTool = localTool;
  }

  /**
   * Converts the ToolResponse instance to a JSON object.
   * @returns A JSON representation of the ToolResponse instance.
   */
  toJSON(): object {
    return {
      toolCallId: this.toolCallId,
      role: this.role,
      name: this.name,
      responseMessage: this.responseMessage,
      filteredTool: this.filteredTool,
      payloadRequest: this.payloadRequest,
    };
  }

  /**
   * Gets the response message.
   * @returns The response message.
   */
  get rawResponse(): any {
    return this.responseMessage;
  }
}
