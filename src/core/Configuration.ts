import { DEFAULT_BASE_URL } from '../constants/xpanderClient';
import { IConfiguration, IXpanderClientCustomParams } from '../types';
import { Base } from './base';

/**
 * Manages the configuration settings for the xpanderAI client, including API key,
 * base URL, metrics reporting, and custom parameters.
 */
export class Configuration extends Base {
  /** API key for authenticating requests to xpanderAI. */
  public apiKey: string;

  /** Base URL for the xpanderAI API requests. */
  public baseUrl: string;

  /** Flag to enable or disable metrics reporting. */
  public withMetricsReport: boolean;

  /** Custom parameters for additional configuration options. */
  public customParams: IXpanderClientCustomParams;

  constructor({
    apiKey,
    baseUrl = DEFAULT_BASE_URL,
    withMetricsReport = false,
    customParams,
  }: IConfiguration) {
    super();
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.withMetricsReport = withMetricsReport;
    this.customParams = customParams;
  }
}
