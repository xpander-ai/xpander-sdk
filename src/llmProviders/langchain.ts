import { BaseOpenAISDKHandler } from './shared/baseOpenAI';
import { LLMProvider } from '../constants/llmProvider';
import { ToolResponse } from '../models/toolResponse';

/**
 * Class representing the LangChain LLM provider.
 */
export class LangChain extends BaseOpenAISDKHandler {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.LANG_CHAIN;
  }
  /**
   * Invokes the tools based on the tool selector response.
   * @param toolSelectorResponse - The response from the tool selector.
   * @returns An array of tool responses.
   * @throws Will throw an error if the tool selector response does not contain valid choices.
   */
  invokeTools(toolSelectorResponse: any): ToolResponse[] {
    const outputMessages: ToolResponse[] = [];
    if (!Array.isArray(toolSelectorResponse.tool_calls)) {
      throw new Error('Tool selector response does not contain valid choices');
    }

    for (const toolCall of toolSelectorResponse.tool_calls) {
      const functionName = toolCall.name;

      let payload: any;
      try {
        payload = JSON.parse(toolCall.args);
      } catch (e) {
        payload = toolCall.args;
      }

      let payloadRequest;
      try {
        payloadRequest = JSON.stringify(payload); // Convert payload to JSON string
      } catch (err) {
        payloadRequest = String(payload); // Convert payload to JSON string
      }

      // support local tools
      if (
        Array.isArray(this.client.localTools) &&
        this.client.localTools.length !== 0
      ) {
        const localTool = this.client.localTools.find(
          (lt) => lt.function.name === functionName,
        );
        if (localTool) {
          outputMessages.push(
            new ToolResponse(
              toolCall.id,
              'tool',
              functionName,
              '',
              {},
              payloadRequest,
              localTool,
            ),
          );
          continue;
        }
      }

      const functionResponse = this.singleToolInvoke(functionName, payload);
      const filteredTool = this.filterTool(functionName);
      outputMessages.push(
        new ToolResponse(
          toolCall.id,
          'tool',
          functionName,
          functionResponse,
          filteredTool,
          payloadRequest,
        ),
      );
    }
    return outputMessages;
  }
}
