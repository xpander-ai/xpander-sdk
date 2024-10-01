import { findBestMatch } from 'string-similarity';
import { IGraphItem } from '../types';

/**
 * Calculates the best match score between the query and a list of strings based on similarity.
 *
 * @param {string} query - The string to match against the list.
 * @param {string[]} listOfStrings - List of strings to match with the query.
 * @param {number} [threshold=0.8] - The similarity score threshold for considering a match.
 * @returns {number} The best match score if it meets the threshold, otherwise 0.
 */
const getBestMatchScore = (
  query: string,
  listOfStrings: string[],
  threshold: number = 0.8,
): number => {
  const similarityScores = findBestMatch(query, listOfStrings);
  if (similarityScores?.bestMatch?.rating >= threshold) {
    return similarityScores.bestMatch.rating;
  }
  return 0;
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

  if (graphs.length === 1) {
    return graphs[0];
  }

  for (const graph of graphs) {
    const score = getBestMatchScore(
      prompt.toLowerCase(),
      [...graph.prompts, ...graph.enrichedPrompts].map((p) => p.toLowerCase()),
    );
    let maxScore = 0;

    if (score > maxScore) {
      maxScore = score;
      matchedGraph = graph;
    }
  }

  return matchedGraph;
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
