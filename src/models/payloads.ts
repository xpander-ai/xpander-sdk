// models/payloads.ts

/**
 * Class representing the request payload.
 */
export class RequestPayload {
  /**
   * The body parameters of the request.
   */
  body_params: any;

  /**
   * The query parameters of the request.
   */
  query_params: any;

  /**
   * The path parameters of the request.
   */
  path_params: any;

  /**
   * The headers of the request.
   */
  headers: any;

  /**
   * Constructs a new RequestPayload instance.
   * @param body_params - The body parameters of the request.
   * @param query_params - The query parameters of the request.
   * @param path_params - The path parameters of the request.
   * @param headers - The headers of the request.
   */
  constructor(
    body_params: any,
    query_params: any,
    path_params: any,
    headers: any,
  ) {
    this.body_params = body_params;
    this.query_params = query_params;
    this.path_params = path_params;
    this.headers = headers;
  }
}
