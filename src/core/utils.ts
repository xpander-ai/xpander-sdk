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
 * Recursively converts all object keys to snake_case.
 *
 * @param {any} obj - The object or array to convert.
 * @returns {any} The object with keys converted to snake_case.
 */
export const convertKeysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = toSnakeCase(key);
        acc[snakeKey] = convertKeysToSnakeCase(obj[key]);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
};
