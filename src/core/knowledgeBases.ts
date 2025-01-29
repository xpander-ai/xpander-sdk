import request from 'sync-request';
import { KnowledgeBaseStrategy } from '../types';
import { Agent } from './agents';
import { Base } from './base';
import CacheService from './CacheService';
import { convertKeysToCamelCase } from './utils';

export class KnowledgeBase extends Base {
  public static loadByAgent(agent: Agent): KnowledgeBase[] {
    try {
      // load only if needed (vanillas)
      if (
        !agent.knowledgeBases.some(
          (kb) => kb.strategy === KnowledgeBaseStrategy.VANILLA,
        )
      ) {
        return [];
      }
      console.debug(`Loading knowledge bases for agent ${agent.id}`);

      const cache = CacheService.getInstance();
      const kbsURL = `${agent.url}/knowledge_base`;
      const cachedKBs = cache.get(kbsURL);
      let rawResponse: any;

      if (cachedKBs) {
        console.debug('Loaded knowledge bases from cache');
        rawResponse = cachedKBs;
      } else {
        const response = request('GET', kbsURL, {
          headers: { 'x-api-key': agent.configuration.apiKey },
        });
        if (!response.statusCode.toString().startsWith('2')) {
          throw new Error(response.body.toString());
        }

        rawResponse = JSON.parse(response.getBody('utf8'));
        cache.set(kbsURL, rawResponse);
      }

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
