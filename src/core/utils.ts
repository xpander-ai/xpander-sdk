import * as fs from 'fs';
import { IAgentInstructions } from '../types';

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

export const generateUUIDv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === 'x' ? random : Math.floor(random % 4) + 8;
    return value.toString(16);
  });
};

export const fileExists = (path: string): boolean => {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    return false;
  }
};

export const readFile = (path: string): string | null => {
  try {
    return fs.readFileSync(path).toString();
  } catch {
    return null;
  }
};

export const getCurrentWorkDir = (): string => process.cwd();

export const getInstructionsFromLocalFile = (): IAgentInstructions | null => {
  const instructionsFilePath = `${getCurrentWorkDir()}/agent_instructions.json`;
  if (fileExists(instructionsFilePath)) {
    try {
      const rawFile = readFile(instructionsFilePath);
      if (!rawFile) {
        return null;
      }
      return JSON.parse(rawFile);
    } catch (err: any) {
      console.warn(`Failed to load agent instructions - ${err.toString()}`);
    }
  }

  return null;
};
