import { LLMProvider } from '../../constants/llmProvider';
import { createTool } from '../../core/tools';
import { XpanderClient } from '../../core/XpanderClient';
import { RequestPayload } from '../../models/payloads';
import { ToolResponse } from '../../models/toolResponse';

/**
 * Interface representing a tool.
 */
interface Tool {
  /** The name of the tool. */
  name: string;
  /** The description of the tool. */
  description: string;
  /** The parameters for the tool. */
  parameters?: any;
  /** The function to execute the tool. */
  func?: Function;
}

/**
 * Class representing the base LLM provider.
 */
export class BaseLLMProvider {
  /**
   * Determines if this provider should handle the specified LLM provider.
   * @param llmProvider - The LLM provider to check.
   * @returns True if the provider should handle the specified LLM provider, otherwise false.
   */
  static shouldHandle(llmProvider: LLMProvider): boolean {
    return llmProvider === LLMProvider.OPEN_AI;
  }

  client: XpanderClient;

  /**
   * Constructs a new BaseLLMProvider instance.
   * @param xpanderClient - The XpanderClient instance.
   */
  constructor(xpanderClient: XpanderClient) {
    this.client = xpanderClient;
  }

  /**
   * Retrieves the tools for the LLM provider.
   * @param functionize - (Optional) Whether to include an invocation function for the tools. Default is false.
   * @returns An array of tools.
   */
  getTools<T>(functionize: boolean = false): T[] {
    const agentTools = this.client.loadXpanderTools();
    let tools: any[] = [];

    for (const toolInstructions of agentTools) {
      if (this.client.toolsFromExternal) {
        if (functionize) {
          toolInstructions.func = toolInstructions.function.execute =
            createTool(this.client, toolInstructions, true, true);
        }
        tools.push({ ...toolInstructions });
        continue;
      }

      const createdTool: Tool = createTool(
        this.client,
        toolInstructions,
        functionize,
      );
      const toolDeclaration: any = {
        type: 'function',
        function: {
          name: createdTool.name,
          description: `${createdTool.description}`.slice(0, 1024), // max length of 1024
        },
      };

      if ('parameters' in createdTool) {
        toolDeclaration.function.parameters = createdTool.parameters;
      }

      if (functionize) {
        toolDeclaration.function.execute = createdTool.func;
      }

      tools.push(toolDeclaration);
    }

    // post process local tools
    if (typeof this.postProcessTools === 'function') {
      if (this.client.localTools.length !== 0) {
        this.client.localTools = this.postProcessTools(this.client.localTools);
      }
    }

    // filter tools according to graph's sessions
    tools = this.client.getToolsForGraphsSession(tools);

    // LLMs with function calling but no tools to workaround issue with empty tools array returned to LLMs
    if (tools == null || tools.length == 0) {
      // check if already in prompt group, if not - give matching function calling.
      const pg = this.client.getGraphSessionParam('promptGroup');
      // no pg, return pg matching tools
      if (
        !!this.client.graphsCache.spec &&
        (!pg || this.client.getGraphSessionParam('pgSwitchAllowed') === true)
      ) {
        for (const pgTool of this.client.graphsCache.spec) {
          const createdTool: Tool = createTool(
            this.client,
            pgTool,
            functionize,
          );
          const toolDeclaration: any = {
            type: 'function',
            function: {
              name: createdTool.name,
              description: `${createdTool.description}`.slice(0, 1024), // max length of 1024
            },
          };

          if ('parameters' in createdTool) {
            toolDeclaration.function.parameters = createdTool.parameters;
          }

          if (functionize) {
            toolDeclaration.function.execute = createdTool.func;
          }

          tools.push(toolDeclaration);
        }
      } else {
        tools = [
          {
            type: 'function',
            function: {
              name: 'EmptyFunction',
              description: 'Empty function with no parameters',
            },
          },
        ];
      }
    }

    return typeof this.postProcessTools === 'function'
      ? this.postProcessTools(tools)
      : tools;
  }

  /**
   * Invokes a single tool with the given ID and payload.
   * @param toolId - The ID of the tool to invoke.
   * @param payload - The payload to pass to the tool.
   * @returns The result of the tool invocation.
   * @throws Will throw an error if the tool implementation is not found.
   */
  singleToolInvoke(toolId: string, payload: RequestPayload): string {
    const tools = this.getTools<any>(true);
    const toolToInvoke = tools.find((tool) => tool.function.name === toolId);
    const pgSelectorTool =
      !this.client?._customParams?.organizationId &&
      this.client?.graphsCache?.spec?.find((tool: any) => tool.id === toolId);

    if (pgSelectorTool) {
      const promptGroup = this.client.graphsCache.graphs.find(
        (graph: any) => graph.promptGroupId === pgSelectorTool.name,
      );
      this.client.setGraphSessionParam('promptGroup', promptGroup);
      this.client.setGraphSessionParam('previousNode', null);
      return "system message: graph prompt group selected, ignore this and proceed with the user's request.";
    }

    if (toolToInvoke) {
      return JSON.stringify(toolToInvoke.function.execute(payload));
    } else {
      throw new Error(`Tool ${toolId} implementation not found`);
    }
  }

  /**
   * Invokes the tools based on the tool selector response.
   * @param toolSelectorResponse - The response from the tool selector.
   * @returns An array of tool responses.
   * @throws Will throw an error if the tool selector response does not contain valid choices.
   */
  invokeTools(toolSelectorResponse: any): ToolResponse[] {
    const outputMessages: ToolResponse[] = [];
    if (!Array.isArray(toolSelectorResponse.choices)) {
      throw new Error('Tool selector response does not contain valid choices');
    }

    for (const chatChoice of toolSelectorResponse.choices) {
      if (chatChoice.message) {
        const responseMessage = chatChoice.message;

        const toolCalls = responseMessage.tool_calls;
        if (toolCalls) {
          for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;

            let payload: any;
            try {
              payload = JSON.parse(toolCall.function.arguments);
            } catch (e) {
              payload = null;
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

            const functionResponse = this.singleToolInvoke(
              functionName,
              payload,
            );
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
        }
      }
    }
    return outputMessages;
  }

  /**
   * Filters the tools to find the one with the specified ID.
   * @param toolId - The ID of the tool to find.
   * @returns An array containing the filtered tool, or an empty array if not found.
   */
  filterTool(toolId: string): any[] {
    const tools = this.getTools<any>(false);
    const filteredTool = tools.find((tool) => tool.function.name === toolId);
    return filteredTool ? [filteredTool] : [];
  }

  /**
   * Post-processes the tools before returning them.
   * @param tools - The tools to post-process.
   * @returns The post-processed tools.
   */
  postProcessTools(tools: any[]): any[] {
    return tools;
  }
}
