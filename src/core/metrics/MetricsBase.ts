import request from 'sync-request';
import { Agent } from '../agents';
import { Base } from '../base';
import { Execution } from '../executions';
import { convertKeysToSnakeCase } from '../utils';

export class MetricsBase extends Base {
  constructor() {
    super();
  }

  public report(agent: Agent, reportType: 'llm' | 'execution') {
    if (!!agent?.execution) {
      let executionId = agent.execution.id;
      let agentId = agent.id;
      const hasParentExecution = !!agent?.execution?.parentExecution;

      // get parent execution and extract agent id
      if (hasParentExecution) {
        executionId = agent.execution.parentExecution;
        const parentExecution = Execution.fetch(agent, executionId);
        agentId = parentExecution.agentId;
      }

      const response = request(
        'POST',
        `${agent.configuration.url}/agents-metrics/${agentId}/${reportType}`,
        {
          headers: { 'x-api-key': agent.configuration.apiKey },
          json: convertKeysToSnakeCase(this.toDict()),
        },
      );

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }
    } else {
      throw new Error('Execution not initialized');
    }
  }
}
