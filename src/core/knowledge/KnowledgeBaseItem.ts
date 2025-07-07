import request, { HttpVerb } from 'sync-request';
import { KnowledgeBaseDocument } from '.';
import { KnowledgeBaseType } from '../../types';
import { Base } from '../base';
import { Configuration } from '../Configuration';
import { convertKeysToCamelCase } from '../utils';

/**
 * Represents a knowledge base in the xpander.ai system.
 * Used to manage documents stored within the knowledge base.
 */
export class KnowledgeBaseItem extends Base {
  /**
   * Creates a new KnowledgeBaseItem instance.
   *
   * @param configuration - The configuration instance used for interacting with the xpander.ai API.
   * @param id - The unique identifier of the knowledge base.
   * @param name - The name of the knowledge base.
   * @param description - The description of the knowledge base.
   * @param type - The type of the knowledge base.
   * @param organizationId - The ID of the organization to which the knowledge base belongs.
   * @param totalDocuments - The total number of documents in the knowledge base.
   */
  constructor(
    private configuration: Configuration,
    public id: string,
    public name: string,
    public description: string,
    public type: KnowledgeBaseType,
    public organizationId: string,
    public totalDocuments: number,
  ) {
    super();
  }

  /**
   * Retrieves the list of documents in the knowledge base from the xpander.ai API.
   *
   * @returns An array of KnowledgeBaseDocument instances representing the documents in the knowledge base.
   *
   * @throws Will throw an error if the request fails or the response status code is not in the 2xx range.
   */
  public listDocuments(): KnowledgeBaseDocument[] {
    try {
      const url = `${this.configuration.url}/knowledge-base/${this.id}/list`;

      const response = request('GET' as HttpVerb, url, {
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

      const responseBody = response.getBody('utf8');
      const parsedData = convertKeysToCamelCase(JSON.parse(responseBody));

      return parsedData.map(
        (kb: any) =>
          new KnowledgeBaseDocument(
            this.configuration,
            kb.id,
            kb.kbId,
            kb.documentUrl,
          ),
      );
    } catch (err) {
      throw new Error('Failed to retrieve knowledge base documents');
    }
  }

  /**
   * Adds new documents to the knowledge base using the xpander.ai API.
   *
   * @param urls - An array of document URLs to be added to the knowledge base.
   * @param sync - Optional. If true, documents are added synchronously; otherwise, they are added asynchronously. Default is false.
   *
   * @returns An array of KnowledgeBaseDocument instances representing the added documents.
   *
   * @throws Will throw an error if the request fails or the response status code is not in the 2xx range.
   */
  public addDocuments(
    urls: string[],
    sync: boolean = false,
  ): KnowledgeBaseDocument[] {
    try {
      const url = `${this.configuration.url}/knowledge-base/${this.id}`;

      const response = request('POST' as HttpVerb, url, {
        json: urls.map((document_url) => ({ document_url, sync })),
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

      const responseBody = response.getBody('utf8');
      const parsedData = convertKeysToCamelCase(JSON.parse(responseBody));

      return parsedData.map(
        (kb: any) =>
          new KnowledgeBaseDocument(
            this.configuration,
            kb.id,
            kb.kbId,
            kb.documentUrl,
          ),
      );
    } catch (err) {
      throw new Error('Failed to add knowledge base documents');
    }
  }
}
