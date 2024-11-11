import { IGraphItem } from '../../types';

/**
 * Represents a session within a prompt group in xpanderAI, managing the
 * graph item and tracking the last processed node.
 */
export class PromptGroupSession {
  constructor(
    /** The graph item associated with the prompt group session. */
    public pg: IGraphItem,

    /** Identifier for the last node accessed in the session. */
    public lastNode: string = '',
  ) {}
}
