import { isArray, isStringArray, isString } from "../helpers";

/**
 * Converts the input into an element name.
 *
 * @param input - The input value to convert.
 * @returns The element name as a string.
 */
export const toElement = (input: any): string => {
  if (isString(input)) {
    return input;
  }
  return "";
};

/**
 * Converts the input into a modifier name or an array of modifier names.
 *
 * @param input - The input value to convert.
 * @returns The modifier name or array of modifier names.
 */
export const toModifier = (input: any): string | string[] => {
  if (isString(input)) {
    return input;
  } else if (isStringArray(input)) {
    return input;
  }
  return "";
};

/*
 *
 * Checking / Is
 *
 */

export const isBemmObject = (input: any): boolean => {
  if (typeof input !== "object" && !Array.isArray(input) && input !== null)
    return false;

  const allowedKeys = [
    "b",
    "block",
    "e",
    "element",
    "m",
    "modifier",
    "s",
    "show",
  ];

  let isAllowed = ![
    ...new Set(Object.keys(input).find((v) => !allowedKeys.includes(v))),
  ].length;

  return isAllowed;
};

export const isAcceptedArray = (input: any): boolean => {
  if (isArray(input)) {
    if (isString(input[0]) && (isStringArray(input[1]) || isString(input[1]))) {
      return true;
    }
  }
  return false;
};
/**
 * Checks if the input is an array that represents a false condition.
 *
 * @param input - The input value to check.
 * @returns True if the input is an array representing a false condition, false otherwise.
 */
export const isFalseArray = (input: any): boolean => {
    if (!isString(input) && input[2] !== undefined) {
      if (!input[2]) {
        return true;
      }
    }
  
    return false;
  };