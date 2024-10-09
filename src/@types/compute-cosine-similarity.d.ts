declare module 'compute-cosine-similarity' {
  /**
   * Computes the cosine similarity between two vectors (arrays of numbers).
   *
   * @param vectorA - First array of numbers (vector).
   * @param vectorB - Second array of numbers (vector).
   * @returns {number | null} - Cosine similarity between the two vectors, or `null` if the vectors have different lengths.
   */
  export default function cosineSimilarity(vectorA: number[], vectorB: number[]): number | null;
}
