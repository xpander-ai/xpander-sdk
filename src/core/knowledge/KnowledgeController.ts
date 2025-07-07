import request, { HttpVerb } from 'sync-request';
import { KnowledgeBaseItem } from '.';
import { Configuration } from '../Configuration';

/**
 * Manages a collection of knowledge bases in the xpander.ai system,
 * providing methods to list, retrieve, and create individual knowledge bases.
 */
export class KnowledgeBases {
  /**
   * Constructs an instance of the KnowledgeBases manager.
   *
   * @param configuration - Configuration settings for managing knowledge bases.
   */
  constructor(public configuration: Configuration) {}

  /**
   * Retrieves the list of knowledge bases from the xpander.ai API.
   *
   * @returns An array of KnowledgeBaseItem instances.
   *
   * @throws Will throw an error if the request fails or the response status code is not in the 2xx range.
   */
  public list(): KnowledgeBaseItem[] {
    try {
      const url = `${this.configuration.url}/knowledge-base/list`;

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
      const parsedData = JSON.parse(responseBody);

      return parsedData.map(
        (kb: any) =>
          new KnowledgeBaseItem(
            this.configuration,
            kb.id,
            kb.name,
            kb.description,
            kb.type,
            kb.organizationId,
            kb.totalDocuments,
          ),
      );
    } catch (err) {
      throw new Error('Failed to retrieve knowledge bases list');
    }
  }

  /**
   * Retrieves a specific knowledge base by its ID from the xpander.ai API.
   *
   * @param knowledgeBaseId - The unique identifier of the knowledge base to retrieve.
   *
   * @returns The requested KnowledgeBaseItem instance.
   *
   * @throws Will throw an error if the knowledge base is not found or if the retrieval fails.
   */
  public get(knowledgeBaseId: string): KnowledgeBaseItem {
    try {
      const allKbs = this.list();
      const matchedKb = allKbs.find((kb) => kb.id === knowledgeBaseId);
      if (!matchedKb) {
        throw new Error(`Knowledge base ${knowledgeBaseId} not found`);
      }
      return matchedKb;
    } catch (err) {
      throw new Error('Failed to retrieve knowledge base');
    }
  }

  /**
   * Creates a new knowledge base using the xpander.ai API.
   *
   * @param name - The name of the new knowledge base.
   * @param description - Optional. The description of the knowledge base. Defaults to an empty string.
   *
   * @returns A new KnowledgeBaseItem instance representing the created knowledge base.
   *
   * @throws Will throw an error if the creation request fails or the response status code is not in the 2xx range.
   */
  public create(name: string, description: string = ''): KnowledgeBaseItem {
    try {
      const url = `${this.configuration.url}/knowledge-base`;

      const response = request('POST' as HttpVerb, url, {
        json: { name, description },
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
      const parsedData = JSON.parse(responseBody);

      return new KnowledgeBaseItem(
        this.configuration,
        parsedData.id,
        parsedData.name,
        parsedData.description,
        parsedData.type,
        parsedData.organizationId,
        parsedData.totalDocuments,
      );
    } catch (err) {
      throw new Error('Failed to create knowledge base');
    }
  }
}
