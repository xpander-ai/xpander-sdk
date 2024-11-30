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
