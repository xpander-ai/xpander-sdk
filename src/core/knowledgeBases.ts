import { KnowledgeBaseStrategy } from '../types';
import { Base } from './base';

export class KnowledgeBase extends Base {
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
