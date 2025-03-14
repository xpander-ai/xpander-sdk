/**
 * Interface representing configuration settings for the xpanderAI client.
 */
export interface IConfiguration {
  /** API key for authenticating with xpanderAI. */
  apiKey: string;

  /** Optional base URL for the xpanderAI API. */
  baseUrl?: string;

  /** Custom parameters for client-specific settings. */
  organizationId?: string;
}
