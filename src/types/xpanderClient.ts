// interface IConnector {
//   readonly id: string;
//   readonly operation_ids: string[];
// }

export interface IXpanderClientCustomParams {
  readonly organizationId?: string;
  readonly connectors?: any[];
}

export interface IXpanderClientParams {
  readonly apiKey: string;
  readonly baseUrl?: string;
  readonly withMetricsReport?: boolean;
  readonly customParams?: IXpanderClientCustomParams;
}

export interface IConfiguration {
  apiKey: string;
  baseUrl?: string;
  withMetricsReport?: boolean;
  customParams: IXpanderClientCustomParams;
}
