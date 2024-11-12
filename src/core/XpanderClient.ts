import { Agents } from './agents/AgentsController';
import { Configuration } from './Configuration';
import { ToolCall } from './toolCalls';
import { LLMProvider } from '../constants/llmProvider';
import { DEFAULT_BASE_URL } from '../constants/xpanderClient';
import { allProviders } from '../llmProviders';
import { IXpanderClientCustomParams } from '../types';
import { ensureToolCallPayloadStructure } from './tools';

/**
 * XpanderClient provides methods for configuring and interacting with xpanderAI tools,
 * managing agents, and extracting tool calls from LLM responses.
 */
export class XpanderClient {
  /**
   * Extracts tool calls from an LLM response based on the specified LLM provider.
   * @param llmResponse - The LLM response to analyze for tool calls.
   * @param llmProvider - The LLM provider, defaults to OPEN_AI.
   * @returns An array of tool calls extracted from the LLM response.
   * @throws Error if the specified LLM provider is not supported.
   */
  public static extractToolCalls(
    llmResponse: any,
    llmProvider: LLMProvider = LLMProvider.OPEN_AI,
  ): ToolCall[] {
    const provider = allProviders.find((p) => p.shouldHandle(llmProvider));
    if (!provider) {
      throw new Error(`provider (${llmProvider}) not found`);
    }
    return provider.extractToolCalls(llmResponse).map((toolCall) =>
      ToolCall.fromObject({
        ...toolCall,
        payload: ensureToolCallPayloadStructure(toolCall?.payload || {}),
      }),
    );
  }

  /** Configuration settings for the xpanderAI client. */
  configuration: Configuration;

  /** Instance of Agents to manage xpanderAI agents. */
  agents: Agents;

  /**
   * Constructs a new XpanderClient instance.
   * @param params - An object containing the parameters for the XpanderClient.
   * @param params.apiKey - The API key for the agent.
   * @param params.baseUrl - The base URL for the agent, defaults to DEFAULT_BASE_URL.
   * @param params.withMetricsReport - Optional flag for enabling metrics reporting.
   * @param params.customParams - Additional custom parameters for the client.
   * @throws Will throw an error if an invalid API key is specified.
   */
  constructor(
    apiKey: string,
    baseUrl: any = DEFAULT_BASE_URL,
    withMetricsReport: boolean = false,
    customParams: any | IXpanderClientCustomParams = {},
  ) {
    this.configuration = new Configuration({
      apiKey,
      baseUrl:
        baseUrl && typeof baseUrl === 'string' ? baseUrl : DEFAULT_BASE_URL,
      withMetricsReport,
      customParams,
    });

    this.agents = new Agents(this.configuration);
  }
}
