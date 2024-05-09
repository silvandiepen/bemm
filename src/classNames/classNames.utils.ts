import {
  isArray,
  isStringArray,
  arrayHasNumber,
  isString,
  isNumber,
} from "../helpers";

/**
 * Checks if an input object is a valid object for generating class names.
 * An object is considered valid if it has only string values and no duplicate keys.
 * @param input - The input object to check.
 * @returns `true` if the input object is valid, `false` otherwise.
 */
export const isValidObject = (input: any): boolean => {
  if (isArray(input)) return false;

  const values = Object.values(input);
  const keys = [...new Set(Object.keys(input))];



  // Check if the keys is the same amount as the values
  if (keys.length !== values.length) {
    return false;
  }

  return !isStringArray(values);
};

/**
 * Checks if an input array contains mixed types of values that are not valid for generating class names.
 * An array is considered mixed if it contains any of the following types:
 * - Numbers
 * - Arrays of strings
 * - Objects with non-string values
 * @param input - The input array to check.
 * @returns `true` if the input array is mixed, `false` otherwise.
 */
export const isMixedInput = (input: any): boolean => {
  if (!Array.isArray(input)) return false;
  if (isStringArray(input)) return false;
  if (arrayHasNumber(input)) return false;
  let ret = true;
  input.forEach((v) => {
    if (
      isNumber(v) ||
      !(isString(v) || isStringArray(v) || isValidObject(v) || isNumber(v))
    ) {
      ret = false;
    }
  });
  return ret;
};