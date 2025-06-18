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
      let cacheKey = kbsURL;
      if (agent.version) {
        cacheKey += `_v${agent.version}`;
      }
      const cachedKBs = cache.get(cacheKey);
      let rawResponse: any;

      if (cachedKBs) {
        console.debug('Loaded knowledge bases from cache');
        rawResponse = cachedKBs;
      } else {
        const headers: any = { 'x-api-key': agent.configuration.apiKey };
        if (agent.version && Number(agent.version) >= 2) {
          headers['x-agent-version'] = agent.version;
        }
        const response = request('GET', kbsURL, {
          headers,
        });
        if (!response.statusCode.toString().startsWith('2')) {
          throw new Error(response.body.toString());
        }

        rawResponse = JSON.parse(response.getBody('utf8'));
        cache.set(cacheKey, rawResponse);
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
