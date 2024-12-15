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
 * Recursively converts all object keys to camelCase, excluding specified root key values.
 *
 * @param {any} obj - The object or array to convert.
 * @param {string[]} [excludeKeys=[]] - List of root-level keys whose values should be excluded from conversion.
 * @returns {any} The object with keys converted to camelCase.
 */
export const convertKeysToCamelCase = (
  obj: any,
  excludeKeys: string[] = [],
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item, excludeKeys));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = toCamelCase(key);
        // If key is in excludeKeys, keep the original value without converting
        acc[camelKey] = excludeKeys.includes(key)
          ? obj[key]
          : convertKeysToCamelCase(obj[key], excludeKeys);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
};

/**
 * Converts a camelCase string to snake_case.
 *
 * @param {string} str - The string to convert to snake_case.
 * @returns {string} The snake_case version of the input string.
 */
export const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

/**
 * Recursively converts all object keys to snake_case, excluding specified root key values.
 *
 * @param {any} obj - The object or array to convert.
 * @param {string[]} [excludeKeys=[]] - List of root-level keys whose values should be excluded from conversion.
 * @returns {any} The object with keys converted to snake_case.
 */
export const convertKeysToSnakeCase = (
  obj: any,
  excludeKeys: string[] = [],
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item, excludeKeys));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = toSnakeCase(key);
        // If key is in excludeKeys, keep the original value without converting
        acc[snakeKey] = excludeKeys.includes(key)
          ? obj[key]
          : convertKeysToSnakeCase(obj[key], excludeKeys);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
};

export const countTokens = (input: string): number => {
  /**
   * A simple tokenizer function to estimate token count.
   * This splits the string by spaces and common delimiters.
   *
   * @param input - The input string to tokenize.
   * @returns The estimated number of tokens.
   */

  // Define a regular expression to match words and common punctuation
  const regex = /\w+|[^\s\w]/g;

  // Match the string against the regex to extract tokens
  const tokens = input.match(regex);

  // Return the number of tokens, or 0 if no matches found
  return tokens ? tokens.length : 0;
};
