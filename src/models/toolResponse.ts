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
  /** An optional string property for the payload. */
  payloadProperty1?: string;
  /** An optional numeric property for the payload. */
  payloadProperty2?: number;
  /** The role in the response. */
  role: string;
  /** The name of the tool. */
  name: string;
  /** The response message from the tool. */
  responseMessage: string;
  /** The filtered tool object. */
  filteredTool: object;
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
      json.payloadProperty1,
      json.payloadProperty2,
    );
  }

  toolCallId: string;
  payloadProperty1?: string;
  payloadProperty2?: number;
  role: string;
  name: string;
  responseMessage: string;
  filteredTool: object;

  /**
   * Constructs a new ToolResponse instance.
   * @param toolCallId - The ID of the tool call.
   * @param role - The role in the response.
   * @param name - The name of the tool.
   * @param responseMessage - The response message from the tool.
   * @param filteredTool - The filtered tool object.
   * @param payloadProperty1 - An optional string property for the payload.
   * @param payloadProperty2 - An optional numeric property for the payload.
   */
  constructor(
    toolCallId: string,
    role: string,
    name: string,
    responseMessage: string,
    filteredTool: object,
    payloadProperty1?: string,
    payloadProperty2?: number,
  ) {
    this.toolCallId = toolCallId;
    this.payloadProperty1 = payloadProperty1;
    this.payloadProperty2 = payloadProperty2;
    this.role = role;
    this.name = name;
    this.responseMessage = responseMessage;
    this.filteredTool = filteredTool;
  }

  /**
   * Converts the ToolResponse instance to a JSON object.
   * @returns A JSON representation of the ToolResponse instance.
   */
  toJSON(): object {
    return {
      toolCallId: this.toolCallId,
      payloadProperty1: this.payloadProperty1,
      payloadProperty2: this.payloadProperty2,
      role: this.role,
      name: this.name,
      responseMessage: this.responseMessage,
      filteredTool: this.filteredTool,
    };
  }

  /**
   * Gets the response message.
   * @returns The response message.
   */
  get rawResponse(): any {
    return this.responseMessage;
  }

  /**
   * Builds a message string from the tool response.
   * @returns A formatted message string.
   */
  buildMessage(): string {
    return `Tool call: ${this.name}\nPayload: { property1: ${this.payloadProperty1}, property2: ${this.payloadProperty2} }\nTool response: ${this.responseMessage}`;
  }
}
