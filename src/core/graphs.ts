import { findBestMatch } from 'string-similarity';
import { IGraphItem } from '../types';

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

export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

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
