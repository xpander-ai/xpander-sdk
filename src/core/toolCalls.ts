import { ToolCallType } from '../types';
import { Base } from './base';

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
    public isPg: boolean = false,
  ) {
    super();
  }
}

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
  ) {
    super();
  }
}
