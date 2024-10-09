declare module 'natural' {
  export class TfIdf {
    addDocument(document: string[]): void;
    listTerms(docIndex: number): { term: string; tfidf: number }[];
    documents: Array<any>;
  }

  export class PorterStemmer {
    static stem(token: string): string;
  }

  export class WordTokenizer {
    tokenize(text: string): string[];
  }
}

declare interface IGraphItem {
  prompts?: string[];
  enrichedPrompts?: string[];
}

export declare function preprocessText(text: string): string;

export declare function sanitizeAndStem(text: string): string[];

declare class TfidfSearch {
  private tfidf: TfIdf;

  constructor();

  addDocuments(documents: string[][]): void;

  calculateSimilarity(queryTokens: string[]): number[];

  private cosineSimilarity(termsA: any[], termsB: any[]): number;

  private getVector(terms: any[]): { [term: string]: number };

  private dot(
    vectorA: { [term: string]: number },
    vectorB: { [term: string]: number },
  ): number;

  private magnitude(vector: { [term: string]: number }): number;
}

export declare function searchGraphByPrompt(
  prompt: string,
  graphs: IGraphItem[],
): IGraphItem | null;

export declare function toCamelCase(str: string): string;

export declare function convertKeysToCamelCase(obj: any): any;
