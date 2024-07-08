// Simplified payload interface
export interface IToolResponsePayload {
  property1: string;
  property2: number;
}

// Tool response interface
export interface IToolResponse {
  toolCallId: string;
  payloadProperty1?: string; // Optional property to avoid null
  payloadProperty2?: number; // Optional property to avoid null
  role: string;
  name: string;
  responseMessage: string;
  filteredTool: object;
}

// Tool response class
export class ToolResponse implements IToolResponse {
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

  buildMessage(): string {
    return `Tool call: ${this.name}\nPayload: { property1: ${this.payloadProperty1}, property2: ${this.payloadProperty2} }\nTool response: ${this.responseMessage}`;
  }
}