declare module 'string-similarity' {
  interface Rating {
    target: string;
    rating: number;
  }

  interface BestMatch {
    ratings: Rating[];
    bestMatch: Rating;
  }

  function compareTwoStrings(str1: string, str2: string): number;
  function findBestMatch(
    mainString: string,
    targetStrings: string[],
  ): BestMatch;

  export { compareTwoStrings, findBestMatch, Rating, BestMatch };
}
