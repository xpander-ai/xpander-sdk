import cosineSimilarity from 'compute-cosine-similarity';
import { PorterStemmer, WordTokenizer } from 'natural';
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

  // You can add further patterns to clean the text if needed
  // e.g., Remove special characters
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
 * Convert prompt to vectors using character codes (basic vectorization).
 * Pads vectors with zeros to ensure they are the same length.
 *
 * @param {string} prompt - The input prompt string.
 * @param {number} maxLength - The maximum length for padding.
 * @returns {number[]} Array of vector representation of the input prompt.
 */
export const getVectorRepresentation = (
  prompt: string,
  maxLength: number,
): number[] => {
  const vector = Array.from(prompt).map((char) => char.charCodeAt(0));

  // Pad the vector with zeros to ensure it matches the desired max length
  while (vector.length < maxLength) {
    vector.push(0);
  }

  return vector;
};

/**
 * Get the maximum length of all strings in the list.
 *
 * @param {string[]} list - The list of strings.
 * @returns {number} The length of the longest string in the list.
 */
export const getMaxStringLength = (list: string[]): number => {
  return list.reduce((max, str) => Math.max(max, str.length), 0);
};

/**
 * Calculates the best match score between the query and a list of strings based on cosine similarity.
 *
 * @param {string} query - The string to match against the list.
 * @param {string[]} listOfStrings - List of strings to match with the query.
 * @returns {number} The best match score if it meets the threshold, otherwise 0.
 */
const getBestMatchScore = (query: string, listOfStrings: string[]): number => {
  const sanitizedQuery = sanitizeAndStem(query).join(' ');

  // Find the max string length to pad all vectors to the same length
  const maxLength = Math.max(
    sanitizedQuery.length,
    getMaxStringLength(
      listOfStrings.map(sanitizeAndStem).map((s) => s.join(' ')),
    ),
  );

  const queryVector = getVectorRepresentation(sanitizedQuery, maxLength);

  let highestScore = 0;

  listOfStrings.forEach((prompt) => {
    const sanitizedPrompt = sanitizeAndStem(prompt).join(' ');
    const promptVector = getVectorRepresentation(sanitizedPrompt, maxLength);

    // Compute cosine similarity between the query vector and prompt vector
    const similarityScore = cosineSimilarity(queryVector, promptVector);

    if (similarityScore && similarityScore > highestScore) {
      highestScore = similarityScore;
    }
  });

  return highestScore;
};

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
  let matchedGraph: IGraphItem | null = null;
  let maxScore = 0;

  // Sanitize the input prompt
  const sanitizedPrompt = sanitizeAndStem(prompt).join(' ');

  for (const graph of graphs) {
    // Sanitize and stem each prompt and enriched prompt in the graph
    const graphPrompts = [
      ...graph.prompts.map((p) => sanitizeAndStem(p).join(' ')),
      ...graph.enrichedPrompts.map((p) => sanitizeAndStem(p).join(' ')),
    ];

    // Get the best match score using cosine similarity
    const score = getBestMatchScore(sanitizedPrompt, graphPrompts);

    if (score > maxScore) {
      maxScore = score;
      matchedGraph = graph;
    }
  }

  // Apply a threshold for matching (adjust as needed)
  return maxScore > 0.8 ? matchedGraph : null;
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
