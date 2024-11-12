// interface IConnector {
//   readonly id: string;
//   readonly operation_ids: string[];
// }

/**
 * Interface representing optional custom parameters for configuring the xpanderAI client.
 */
export interface IXpanderClientCustomParams {
  /** Optional organization ID associated with the client. */
  readonly organizationId?: string;

  /** Optional array of connectors associated with the client. */
  readonly connectors?: any[];
}

/**
 * Interface representing configuration settings for the xpanderAI client.
 */
export interface IConfiguration {
  /** API key for authenticating with xpanderAI. */
  apiKey: string;

  /** Optional base URL for the xpanderAI API. */
  baseUrl?: string;

  /** Optional flag to enable metrics reporting. */
  withMetricsReport?: boolean;

  /** Custom parameters for client-specific settings. */
  customParams: IXpanderClientCustomParams;
}
