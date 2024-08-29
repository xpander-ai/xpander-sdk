/**
 * Interface represting chat params.
 */
export interface IXChatParams {
  organizationId: string;
  connectors: IConnector[];
}

/**
 * Interface represting a connector.
 */
export interface IConnector {
  /** connector id */
  id: string;
  /** operation ids */
  operationIds: string[];
}
