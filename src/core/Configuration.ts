import { DEFAULT_BASE_URL } from '../constants/xpanderClient';
import { IConfiguration } from '../types';
import { Base } from './base';

/**
 * Manages the configuration settings for the xpanderAI client.
 *
 * This class encapsulates settings such as the API key, base URL,
 * metrics reporting, and optional organization-specific parameters.
 */
export class Configuration extends Base {
  /** API key for authenticating requests to xpanderAI. */
  public apiKey: string;

  /** Base URL for the xpanderAI API requests. */
  public baseUrl: string;

  /** Flag to enable or disable metrics reporting. */
  public withMetricsReport: boolean;

  /** Optional organization ID for scoped API requests. */
  public organizationId?: string;

  /**
   * Constructs a new Configuration instance.
   *
   * @param apiKey - The API key for xpanderAI.
   * @param baseUrl - The base URL for API requests (defaults to `DEFAULT_BASE_URL`).
   * @param withMetricsReport - Whether to enable metrics reporting (defaults to `false`).
   * @param organizationId - Optional organization ID for additional scoping.
   */
  constructor({
    apiKey,
    baseUrl = DEFAULT_BASE_URL,
    withMetricsReport = false,
    organizationId,
  }: IConfiguration) {
    super();
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.withMetricsReport = withMetricsReport;
    this.organizationId = organizationId;
  }

  /**
   * Constructs the full API endpoint URL.
   *
   * The URL combines the base URL with the optional organization ID if provided.
   *
   * @returns The constructed API endpoint URL.
   */
  get url(): string {
    const urlParts = [this.baseUrl];
    if (this?.organizationId) {
      urlParts.push(this.organizationId);
    }
    return urlParts.join('/');
  }
}
