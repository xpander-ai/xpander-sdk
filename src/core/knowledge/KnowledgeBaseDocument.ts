import request, { HttpVerb } from 'sync-request';

import { Base } from '../base';
import { Configuration } from '../Configuration';

/**
 * Represents a knowledge base document in the xpander.ai system.
 * This is used to reference a document within a knowledge base.
 */
export class KnowledgeBaseDocument extends Base {
  /**
   * Creates a new KnowledgeBaseDocument instance.
   *
   * @param configuration - The configuration instance used for interacting with the xpander.ai API.
   * @param id - The unique identifier of the document.
   * @param kbId - The identifier of the knowledge base this document belongs to.
   * @param documentUrl - The URL of the document stored in the knowledge base.
   */
  constructor(
    private configuration: Configuration,
    public id: string,
    public kbId: string,
    public documentUrl: string,
  ) {
    super();
  }

  /**
   * Deletes the document from the knowledge base via the xpander.ai API.
   *
   * @returns void
   *
   * @throws Will throw an error if the deletion request fails or the response status code is not in the 2xx range.
   */
  public delete(): void {
    try {
      const url = `${this.configuration.url}/knowledge-base/${this.kbId}/${this.id}`;

      const response = request('DELETE' as HttpVerb, url, {
        headers: {
          'x-api-key': this.configuration.apiKey,
          ...(this.configuration.organizationId
            ? { 'x-organization-id': this.configuration.organizationId }
            : {}),
        },
      });

      if (!response.statusCode.toString().startsWith('2')) {
        throw new Error(response.body.toString());
      }
    } catch (err) {
      throw new Error('Failed to delete knowledge base documents');
    }
  }
}
