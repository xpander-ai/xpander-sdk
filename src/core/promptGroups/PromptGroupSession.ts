import { IGraphItem } from '../../types';

export class PromptGroupSession {
  constructor(
    public pg: IGraphItem,
    public lastNode: string = '',
  ) {}
}
