/**
 * Interface represting chat params.
 */
export interface IXChatParams {
  readonly organizationId: string;
  readonly connectors: IConnector[];
}

/**
 * Interface represting a connector.
 */
export interface IConnector {
  /** connector id */
  readonly id: string;
  /** operation ids */
  readonly operationIds: string[];
}
