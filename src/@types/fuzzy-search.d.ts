declare module 'fuzzy-search' {
  export default class FuzzySearch<T> {
    constructor(haystack: T[]);
    search(query: string): T[];
  }
}
