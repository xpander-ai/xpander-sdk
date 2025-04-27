import { ToolCallType } from '../../types';
import { Base } from '../base';

/**
 * Represents a tool call with its metadata and payload.
 *
 * @class ToolCall
 * @extends {Base}
 *
 * @param {string} name - The name of the tool call.
 * @param {ToolCallType} type - The type of the tool call.
 * @param {any} payload - The payload for the tool call, including body, query, path parameters, and headers.
 * @param {string} toolCallId - The unique identifier for the tool call.
 * @param {boolean} graphApproved - Indicates if the tool call is approved within the graph.
 *
 * @memberof xpander.ai
 */
export class ToolCall extends Base {
  constructor(
    public name: string = '',
    public type: ToolCallType = '' as ToolCallType,
    public payload: any = {
      bodyParams: {},
      queryParams: {},
      pathParams: {},
      headers: {},
    },
    public toolCallId: string = '',
    public graphApproved: boolean = false,
  ) {
    super();
  }
}

/**
 * Represents the result of a tool call execution.
 *
 * @class ToolCallResult
 * @extends {Base}
 *
 * @param {string} functionName - The name of the executed function.
 * @param {string} toolCallId - The unique identifier for the related tool call.
 * @param {any} payload - The payload used in the tool call, including body, query, path parameters, and headers.
 * @param {number} statusCode - The HTTP status code returned from the execution.
 * @param {any} result - The result of the tool call execution.
 * @param {boolean} isSuccess - Indicates if the tool call execution was successful.
 * @param {boolean} isError - Indicates if the tool call execution resulted in an error.
 * @param {boolean} isLocal - Indicates if the tool is local.
 * @param {boolean} graphApproved - Indicates if the tool call result is approved within the graph.
 *
 * @memberof xpander.ai
 */
export class ToolCallResult extends Base {
  constructor(
    public functionName: string = '',
    public toolCallId: string = '',
    public payload: any = {
      bodyParams: {},
      queryParams: {},
      pathParams: {},
      headers: {},
    },
    public statusCode: number = 0,
    public result: any = null,
    public isSuccess: boolean = false,
    public isError: boolean = false,
    public isLocal: boolean = false,
    public graphApproved: boolean = false,
  ) {
    super();
  }
}
