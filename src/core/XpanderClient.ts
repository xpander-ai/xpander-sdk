import { Agents } from './agents/AgentsController';
import { Configuration } from './Configuration';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_BASE_URL } from '../constants/xpanderClient';
import { allProviders } from '../llmProviders';
import { IToolCall, IXpanderClientParams } from '../types';

/**
 * Class representing the XpanderClient used to interact with xpanderAI tools.
 */
export class XpanderClient {
  configuration: Configuration;
  agents: Agents;

  /**
   * Constructs a new XpanderClient instance.
   * @param params - An object containing the parameters for the XpanderClient.
   * @param params.apiKey - The API key for the agent.
   * @param params.baseUrl - The base URL for the agent, defaults to DEFAULT_BASE_URL.
   * @param params.withMetricsReport - Optional flag for enabling metrics reporting.
   * @param params.organizationId - Optional organization ID.
   * @throws Will throw an error if an invalid API key is specified.
   */
  constructor({
    apiKey,
    baseUrl = DEFAULT_BASE_URL,
    withMetricsReport = false,
    customParams = {},
  }: IXpanderClientParams) {
    this.configuration = new Configuration({
      apiKey,
      baseUrl,
      withMetricsReport,
      customParams,
    });

    this.agents = new Agents(this.configuration);
  }

  public extractToolCalls(
    llmResponse: any,
    llmProvider: LLMProvider = LLMProvider.OPEN_AI,
  ): IToolCall[] {
    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`provider (${llmProvider}) not found`);
    }
    return provider.extractToolCalls(llmResponse);
  }
}
