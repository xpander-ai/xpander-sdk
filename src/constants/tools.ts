/**
 * Default tool parameters used in xpanderAI tool configuration.
 *
 * These parameters define the structure of request payloads for tools, including
 * query, path, and body parameters, as well as specifying required fields for
 * each parameter type.
 */
export const DEFAULT_TOOL_PARAMETERS = Object.freeze({
  /** Specifies the type of tool parameters structure. */
  type: 'object',
  /** List of required top-level parameters. */
  required: [],
  /** Detailed properties of tool parameters. */
  properties: {
    /** Query parameters for the tool, structured as an object. */
    query_params: {
      type: 'object',
      properties: {},
      required: [],
    },
    /** Path parameters for the tool, structured as an object. */
    path_params: {
      type: 'object',
      properties: {},
      required: [],
    },
    /** Body parameters for the tool, structured as an object. */
    body_params: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
});

/** Prefix for identifying local tools in xpanderAI. */
export const LOCAL_TOOL_PREFIX = 'xpLocal_';

export enum OverSizedResponseTool {
  GetFullResponse = 'xp_get_full_response',
  SearchInTheResponse = 'xp_search_in_the_response',
  SkipOrContinue = 'xp_skip_or_continue',
}

export const OVERSIZED_RESPONSE_TOOLS = [
  {
    type: 'function',
    function: {
      name: OverSizedResponseTool.GetFullResponse,
      description:
        'Retrieves the entire unaltered response from the tool, providing complete details as returned by the tool for further analysis or review.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: OverSizedResponseTool.SearchInTheResponse,
      description:
        "Executes a textual (vector-based) search within the tool's response to locate and extract precise information matching the given phrase. Ideal for narrowing down results in large or complex responses. Can be called iteratively to achieve the most relevant and accurate results.",
      parameters: {
        type: 'object',
        properties: {
          bodyParams: {
            type: 'object',
            properties: {
              phrase: {
                type: 'string',
                description:
                  'The specific phrase to search for within the tool response.',
              },
            },
            required: ['phrase'],
            additionalProperties: false,
          },
        },
        required: ['bodyParams'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: OverSizedResponseTool.SkipOrContinue,
      description:
        'Terminates the current tool execution questioning and seamlessly progresses to the next step in the workflow, ensuring a smooth continuation of the process.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];

export const OVERSIZED_RESPONSE_TOOL_NAMES = OVERSIZED_RESPONSE_TOOLS.map(
  (tool) => tool.function.name.toString(),
);
