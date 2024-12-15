type Vector = number[];

/**
 * Convert a string into a character frequency vector [a-z].
 * Non a-z characters are ignored. The result is a 26-dimensional vector.
 */
function textToVector(text: string): Vector {
  const charCount: Record<string, number> = {};
  const lower = text.toLowerCase();
  for (let i = 0; i < lower.length; i++) {
    const char = lower[i];
    if (char >= 'a' && char <= 'z') {
      charCount[char] = (charCount[char] || 0) + 1;
    }
  }

  const vector: Vector = new Array(26).fill(0);
  for (let i = 0; i < 26; i++) {
    const c = String.fromCharCode(97 + i);
    vector[i] = charCount[c] || 0;
  }
  return vector;
}

/**
 * Compute the cosine similarity between two vectors.
 */
function cosineSimilarity(a: Vector, b: Vector): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom ? dot / denom : 0;
}

/**
 * Tokenize the text into words (alphabetic sequences) and record their offsets.
 */
function tokenizeWithOffsets(text: string): {
  tokens: string[];
  offsets: number[];
} {
  const tokens: string[] = [];
  const offsets: number[] = [];

  const regex = /[a-zA-Z]+/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    tokens.push(match[0]);
    offsets.push(match.index);
  }

  return { tokens, offsets };
}

/**
 * Perform a vector-based search for a phrase within a larger text.
 * If no vector match is found, fallback to a case-insensitive substring search.
 * Return a snippet of text around the found match.
 *
 * @param text - The input text to search within.
 * @param phrase - The phrase to search for.
 * @param windowSize - Number of characters around the match to include.
 * @returns A snippet of text containing the best match or a not-found message.
 */
export function vectorSearchWithBubble(
  text: string,
  phrase: string,
  windowSize: number = 100,
): string {
  const { tokens, offsets } = tokenizeWithOffsets(text);
  const phraseVector = textToVector(phrase);

  let bestSimilarity = 0;
  let bestIndex = -1;

  // Compare phrase to each token individually via vector similarity
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const tokenVector = textToVector(token);
    const sim = cosineSimilarity(tokenVector, phraseVector);

    if (sim > bestSimilarity) {
      bestSimilarity = sim;
      bestIndex = i;
    }
  }

  let startOffset: number | null = null;
  let endOffset: number | null = null;

  if (bestIndex !== -1 && bestSimilarity > 0) {
    // We found a vector-based match
    const matchedToken = tokens[bestIndex];
    startOffset = offsets[bestIndex];
    endOffset = startOffset + matchedToken.length;
  } else {
    // Fallback: Case-insensitive substring search
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    const idx = lowerText.indexOf(lowerPhrase);

    if (idx === -1) {
      return `Phrase "${phrase}" not found in the text.`;
    } else {
      startOffset = idx;
      endOffset = idx + phrase.length;
    }
  }

  // Now we have startOffset and endOffset of the best match (vector or fallback)
  if (startOffset === null || endOffset === null) {
    return `Phrase "${phrase}" not found in the text.`;
  }

  // Extract surrounding context
  const snippetStart = Math.max(0, startOffset - windowSize);
  const snippetEnd = Math.min(text.length, endOffset + windowSize);

  return text.slice(snippetStart, snippetEnd);
}
