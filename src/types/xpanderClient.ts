/**
 * Interface representing a LLM (Large Language Model) provider handler.
 */
export interface ILLMProviderHandler {
  /** Mapping of tool names. */
  toolsNamesMapping?: Record<string, string>;
  /**
   * Retrieves tools.
   * @param functionize - Whether to functionize the tools.
   * @returns Array of tools.
   */
  getTools<T>(functionize?: boolean): T[];
  /**
   * Invokes tools based on the tool selector response.
   * @param toolSelectorResponse - The response from the tool selector.
   * @returns Result of the invoked tools.
   */
  invokeTools(toolSelectorResponse: any): any;
}
