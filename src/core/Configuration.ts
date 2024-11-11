import { DEFAULT_BASE_URL } from '../constants/xpanderClient';
import { IConfiguration, IXpanderClientCustomParams } from '../types';

/**
 * Manages the configuration settings for the xpanderAI client, including API key,
 * base URL, metrics reporting, and custom parameters.
 */
export class Configuration {
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
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.withMetricsReport = withMetricsReport;
    this.customParams = customParams;
  }

  public toDict(): Record<string, any> {
    const dict: Record<string, any> = {};

    // Use Object.getOwnPropertyNames to get all properties
    for (const key of Object.getOwnPropertyNames(this)) {
      dict[key] = (this as any)[key];
    }

    return dict;
  }
}
