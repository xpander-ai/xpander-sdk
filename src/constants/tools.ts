/**
 * Default tool parameters.
 */
export const DEFAULT_TOOL_PARAMETERS = Object.freeze({
  /** The type of the tool parameters. */
  type: 'object',
  /** List of required parameters. */
  required: [],
  /** Properties of the tool parameters. */
  properties: {
    /** Query parameters of the tool. */
    query_params: {
      type: 'object',
      properties: {},
      required: [],
    },
    /** Path parameters of the tool. */
    path_params: {
      type: 'object',
      properties: {},
      required: [],
    },
    /** Body parameters of the tool. */
    body_params: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
});

export const LOCAL_TOOL_PREFIX = 'xpLocal_';
