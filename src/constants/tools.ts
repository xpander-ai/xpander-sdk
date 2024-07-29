export const DEFAULT_TOOL_PARAMETERS = Object.freeze({
  type: 'object',
  required: [],
  properties: {
    query_params: {
      type: 'object',
      properties: {},
      required: [],
    },
    path_params: {
      type: 'object',
      properties: {},
      required: [],
    },
    body_params: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
});
