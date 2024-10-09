declare module 'natural' {
  /**
   * PorterStemmer - A stemming algorithm to reduce words to their root form.
   */
  export const PorterStemmer: {
    /**
     * Stems a given word to its root form.
     *
     * @param word - The word to stem.
     * @returns {string} - The stemmed version of the word.
     */
    stem(word: string): string;
  };

  /**
   * WordTokenizer - Tokenizes a sentence into individual words.
   */
  export class WordTokenizer {
    /**
     * Tokenizes the input text into an array of words.
     *
     * @param text - The text to tokenize.
     * @returns {string[]} - An array of tokenized words.
     */
    tokenize(text: string): string[];
  }
}
