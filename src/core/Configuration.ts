import { DEFAULT_BASE_URL } from '../constants/xpanderClient';
import { IConfiguration, IXpanderClientCustomParams } from '../types';

export class Configuration {
  public apiKey: string;
  public baseUrl: string;
  public withMetricsReport: boolean;
  public customParams: IXpanderClientCustomParams;

  constructor({
    apiKey,
    baseUrl = DEFAULT_BASE_URL,
    withMetricsReport = false,
    customParams,
  }: IConfiguration) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.withMetricsReport = withMetricsReport;
    this.customParams = customParams;
  }
}
