/**
 * Interface representing custom parameters.
 */
export interface ICustomParams {
  /** Organization ID associated with the custom. */
  readonly organization_id: string;
  /** List of connectors associated with the organization. */
  readonly connectors: IConnector[];
}

/**
 * Interface representing a connector.
 */
export interface IConnector {
  /** Unique connector ID. */
  readonly id: string;
  /** List of operation IDs for the connector. */
  readonly operation_ids: string[];
}
