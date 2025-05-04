import { ToolCallType } from '../../types';
import { Base } from '../base';

const extractParam = (bodyParams: string, paramName: string): string | null => {
  const regex = new RegExp(`<parameter name="${paramName}">(.*?)\\b`, 'i');
  const match = bodyParams.match(regex);
  return match ? match[1] : null;
};

export const ensureFinishStruct = (data: any) => {
  let isSuccess = false;
  let result = '';
  try {
    const isNotInStruct =
      !data?.payload ||
      !('bodyParams' in data?.payload) ||
      !('is_success' in data?.payload?.bodyParams) ||
      !('result' in data?.payload?.bodyParams);
    if (isNotInStruct) {
      if (!!data?.payload) {
        try {
          data.payload = JSON.parse(data.payload);
        } catch (err) {
          // ignore
        }
      }
      result = data?.payload?.result || '';
      const hasParameters = JSON.stringify(data?.payload || {}).includes(
        '<parameter name=',
      );
      if (hasParameters) {
        isSuccess =
          extractParam(data.payload.bodyParams, 'is_success') === 'true' ||
          false;
        if (!result) {
          result = extractParam(data.payload.bodyParams, 'result') || '';
        }
      }
    }
  } catch (err: any) {
    isSuccess = false;
    result = `Failed to parse xpfinish result - ${err.toString()}`;
  } finally {
    data.payload = {
      bodyParams: { is_success: isSuccess, result },
      queryParams: {},
      pathParams: {},
    };
  }
};

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
