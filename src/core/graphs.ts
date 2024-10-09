import { TfIdf, PorterStemmer, WordTokenizer } from 'natural';
import { IGraphItem } from '../types';

/**
 * Preprocess text to remove links, emails, and other unwanted elements.
 * This ensures that irrelevant information does not affect similarity.
 *
 * @param {string} text - The input text to preprocess.
 * @returns {string} - The cleaned text.
 */
export const preprocessText = (text: string): string => {
  // Remove URLs
  const noLinks = text.replace(/https?:\/\/[^\s]+/g, '');

  // Remove email addresses
  const noEmails = noLinks.replace(/\S+@\S+\.\S+/g, '');

  // Remove special characters
  const cleanedText = noEmails.replace(/[^a-zA-Z0-9\s]/g, '');

  return cleanedText;
};

/**
 * Sanitization & Stemming Function: Tokenizes, lowercases, stems, and preprocesses the input text.
 *
 * @param {string} text - The input string to sanitize, stem, and preprocess.
 * @returns {string[]} Array of sanitized and stemmed tokens.
 */
export const sanitizeAndStem = (text: string): string[] => {
  const tokenizer = new WordTokenizer();

  // Preprocess text to remove unnecessary parts
  const preprocessedText = preprocessText(text);

  // Tokenize and stem the cleaned text
  const tokens = tokenizer.tokenize(preprocessedText.toLowerCase());
  return tokens.map((token) => PorterStemmer.stem(token));
};

/**
 * Performs TF-IDF vectorization of documents.
 * Uses natural's TfIdf to build TF-IDF vectors for each document.
 */
class TfidfSearch {
  private tfidf: TfIdf;

  constructor() {
    this.tfidf = new TfIdf();
  }

  /**
   * Adds documents (prompts) to the TF-IDF model.
   *
   * @param {string[][]} documents - Array of documents (arrays of tokens).
   */
  addDocuments(documents: string[][]): void {
    documents.forEach((docTokens) => this.tfidf.addDocument(docTokens));
  }

  /**
   * Calculates cosine similarity between the query and the documents
   * in the TF-IDF model.
   *
   * @param {string[]} queryTokens - The tokenized search query.
   * @returns {number[]} Array of cosine similarity scores for each document.
   */
  calculateSimilarity(queryTokens: string[]): number[] {
    // Add the query to the TF-IDF model temporarily
    this.tfidf.addDocument(queryTokens);

    const queryIndex = this.tfidf.documents.length - 1; // Query is the last added document
    const scores: number[] = [];

    const queryTerms = this.tfidf.listTerms(queryIndex);

    for (let i = 0; i < queryIndex; i++) {
      const docTerms = this.tfidf.listTerms(i);

      const similarity = this.cosineSimilarity(queryTerms, docTerms);
      scores.push(similarity);
    }

    // Remove the query from the model after calculation
    this.tfidf.documents.pop();

    return scores;
  }

  /**
   * Compute cosine similarity between two lists of TF-IDF terms.
   *
   * @param {any[]} termsA - Terms of document A.
   * @param {any[]} termsB - Terms of document B.
   * @returns {number} Cosine similarity score.
   */
  private cosineSimilarity(termsA: any[], termsB: any[]): number {
    const vectorA = this.getVector(termsA);
    const vectorB = this.getVector(termsB);

    // Compute cosine similarity using the vectors
    const dotProduct = this.dot(vectorA, vectorB);
    const magnitudeA = this.magnitude(vectorA);
    const magnitudeB = this.magnitude(vectorB);

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Convert TF-IDF terms into vectors.
   *
   * @param {any[]} terms - List of terms with TF-IDF values.
   * @returns {{ [term: string]: number }} TF-IDF vector.
   */
  private getVector(terms: any[]): { [term: string]: number } {
    const vector: { [term: string]: number } = {};

    terms.forEach((termObj) => {
      vector[termObj.term] = termObj.tfidf;
    });

    return vector;
  }

  /**
   * Calculate the dot product of two vectors.
   *
   * @param {{ [term: string]: number }} vectorA - Vector A.
   * @param {{ [term: string]: number }} vectorB - Vector B.
   * @returns {number} Dot product.
   */
  private dot(
    vectorA: { [term: string]: number },
    vectorB: { [term: string]: number },
  ): number {
    let dotProduct = 0;
    for (const term in vectorA) {
      if (vectorB[term]) {
        dotProduct += vectorA[term] * vectorB[term];
      }
    }
    return dotProduct;
  }

  /**
   * Calculate the magnitude of a vector.
   *
   * @param {{ [term: string]: number }} vector - The vector.
   * @returns {number} Magnitude of the vector.
   */
  private magnitude(vector: { [term: string]: number }): number {
    let sum = 0;
    for (const term in vector) {
      sum += vector[term] * vector[term];
    }
    return Math.sqrt(sum);
  }
}

/**
 * Searches the provided graphs for a matching graph item based on the prompt.
 *
 * @param {string} [prompt=''] - The prompt string to search with.
 * @param {IGraphItem[]} graphs - List of graph items to search within.
 * @returns {IGraphItem | null} The best matching graph item, or null if no match is found.
 */
export const searchGraphByPrompt = (
  prompt: string = '',
  graphs: IGraphItem[],
): IGraphItem | null => {
  if (!prompt) {
    return null;
  }

  const search = new TfidfSearch();

  // Collect all prompts and enriched prompts from each graph
  const processedDocs: string[][] = [];
  const documentGraphIndices: number[] = [];

  graphs.forEach((graph, graphIndex) => {
    const prompts = graph.prompts || [];
    const enrichedPrompts = graph.enrichedPrompts || [];

    prompts.forEach((docPrompt) => {
      const processed = sanitizeAndStem(docPrompt);
      processedDocs.push(processed);
      documentGraphIndices.push(graphIndex);
    });

    enrichedPrompts.forEach((docPrompt) => {
      const processed = sanitizeAndStem(docPrompt);
      processedDocs.push(processed);
      documentGraphIndices.push(graphIndex);
    });
  });

  // Add documents to the TF-IDF model
  search.addDocuments(processedDocs);

  // Process the query
  const processedQuery = sanitizeAndStem(prompt);

  // Calculate similarity scores between the query and all documents
  const scores = search.calculateSimilarity(processedQuery);

  // Find the highest scoring document
  let maxScore = -1;
  let bestMatchIndex = -1;

  scores.forEach((score, index) => {
    if (score > maxScore) {
      maxScore = score;
      bestMatchIndex = index;
    }
  });

  // Apply a threshold for matching (e.g., 0.6)
  if (maxScore > 0.6 && bestMatchIndex !== -1) {
    const bestGraphIndex = documentGraphIndices[bestMatchIndex];
    return graphs[bestGraphIndex];
  }

  return null;
};

/**
 * Converts a snake_case string to camelCase.
 *
 * @param {string} str - The string to convert to camelCase.
 * @returns {string} The camelCase version of the input string.
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Recursively converts all object keys to camelCase.
 *
 * @param {any} obj - The object or array to convert.
 * @returns {any} The object with keys converted to camelCase.
 */
export const convertKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = toCamelCase(key);
        acc[camelKey] = convertKeysToCamelCase(obj[key]);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
};
