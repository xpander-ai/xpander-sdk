import request from 'sync-request';
import { KnowledgeBaseStrategy } from '../types';
import { Agent } from './agents';
import { Base } from './base';
import { convertKeysToCamelCase } from './utils';

export class KnowledgeBase extends Base {
  public static loadByAgent(agent: Agent): KnowledgeBase[] {
    console.debug(`Loading knowledge bases for agent ${agent.id}`);
    try {
      // load only if needed (vanillas)
      if (
        !agent.knowledgeBases.some(
          (kb) => kb.strategy === KnowledgeBaseStrategy.VANILLA,
        )
      ) {
        return [];
      }
      const response = request('GET', `${agent.url}/knowledge_base`, {
        headers: { 'x-api-key': agent.configuration.apiKey },
      });
      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }

      const rawResponse = JSON.parse(response.getBody('utf8'));
      const kbs = convertKeysToCamelCase(rawResponse);
      return kbs.map(
        (kb: any) =>
          new KnowledgeBase(
            kb.id,
            kb.name,
            kb.description,
            kb.strategy,
            kb.documents,
          ),
      );
    } catch (err) {
      console.error('failed to load agent knowledge bases', err);
    }
    console.log(agent);
    return [];
  }
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public strategy: KnowledgeBaseStrategy,
    public documents: string[],
  ) {
    super();
  }
}
