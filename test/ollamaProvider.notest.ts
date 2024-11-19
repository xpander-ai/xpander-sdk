import { ToolCall } from '../src/core/toolCalls';
import { Ollama } from '../src/llmProviders/ollama';

describe('Ollama.extractToolCalls', () => {
  it('should extract tool calls from a valid LLM response', () => {
    const llmResponse = {
      model: 'qwen2.5-coder',
      created_at: '2024-11-15T22:05:13.39141Z',
      message: {
        role: 'assistant',
        content: '',
        tool_calls: [
          {
            function: {
              name: 'tavily-insights-fetchInsightsFromTavilyAI',
              arguments: {
                bodyParams: {},
                pathParams: {},
                queryParams: {
                  query: 'qwen2.5-coder news on HackerNews',
                },
              },
            },
          },
        ],
      },
      done_reason: 'stop',
      done: true,
      total_duration: 2794865541,
      load_duration: 29125458,
      prompt_eval_count: 471,
      prompt_eval_duration: 212000000,
      eval_count: 69,
      eval_duration: 2545000000,
    };

    const expectedToolCalls = [
      ToolCall.fromObject({
        name: 'tavily-insights-fetchInsightsFromTavilyAI',
        toolCallId: '',
        type: 'xpander',
        isPg: false,
        payload: {
          bodyParams: {},
          pathParams: {},
          queryParams: {
            query: 'qwen2.5-coder news on HackerNews',
          },
        },
      }),
    ];

    const result = Ollama.extractToolCalls(llmResponse);
    console.log('Result:', JSON.stringify(result, null, 2));
    console.log('Expected:', JSON.stringify(expectedToolCalls, null, 2));
    expect(result).toEqual(expectedToolCalls);
  });

  it('should return an empty array if no tool calls are present', () => {
    const llmResponse = {
      message: {
        tool_calls: [],
      },
    };

    const result = Ollama.extractToolCalls(llmResponse);
    expect(result).toEqual([]);
  });

  it('should handle missing function details gracefully', () => {
    const llmResponse = {
      message: {
        tool_calls: [
          {
            function: null,
          },
        ],
      },
    };

    const result = Ollama.extractToolCalls(llmResponse);
    expect(result).toEqual([]);
  });
});
