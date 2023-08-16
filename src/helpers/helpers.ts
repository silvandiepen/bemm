/**
 * Converts a string to kebab case (e.g. "my-component" instead of "myComponent").
 * @param str The input string to convert.
 * @returns The kebab-cased string.
 */
export const toKebabCase = (str: string): string => {
  if (str === "") {
    return "";
  }

  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([\d])([a-zA-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

/**
 * Checks if the input is an array.
 * @param input The input to check.
 * @returns True if the input is an array, false otherwise.
 */
export const isArray = (input: any) => {
  return typeof input == "object" && Array.isArray(input);
};

/**
 * Checks if the input is an array of strings.
 * @param input The input to check.
 * @returns True if the input is an array of strings, false otherwise.
 */
export const isStringArray = (input: any): boolean => {
  if (!Array.isArray(input)) {
    return false;
  }

  if (input.length === 0) {
    return false;
  }

  for (let i = 0; i < input.length; i++) {
    if (typeof input[i] !== "string") {
      return false;
    }
  }

  return true;
};

/**
 * Checks if the input is a string.
 * @param input The input to check.
 * @returns True if the input is a string, false otherwise.
 */
export const isString = (input: any): boolean => {
  return typeof input == "string";
};

/**
 * Cleans up an array of strings by removing leading/trailing whitespace and splitting any strings that contain spaces into multiple strings.
 * @param classArray The input array to clean up.
 * @returns A new array with all the strings cleaned up.
 */
export const cleanArray = (classArray: any[]): string[] => {
  const cleanedArray = classArray
    .map((v: string) => {
      if (v && typeof v == "string" && v.includes(" ")) {
        return cleanArray(v.split(" "));
      }
      let cleanedValue = v && typeof v == "string" ? v.trim() : null;
      return cleanedValue || "";
    })
    .flat()
    .filter((v) => v !== "");

  return [...new Set(cleanedArray)];
};

/**
 * Checks if the input is undefined or truthy.
 * @param value The input to check.
 * @returns True if the input is undefined or truthy, false otherwise.
 */
export const isUndefined = (value: any): boolean => {
  if (value == undefined) return true;
  if (value !== undefined) {
    return !!value;
  }
  return false;
};

/**
 * Checks if the input is a number.
 * @param input The input to check.
 * @returns True if the input is a number, false otherwise.
 */
export const isNumber = (input: any): boolean => {
  return !isNaN(input) && Number.isInteger(input);
};

/**
 * Checks if the input array contains at least one number.
 * @param input The input array to check.
 * @returns True if the input array contains at least one number, false otherwise.
 */
export const arrayHasNumber = (input: any): boolean => {
  if (!Array.isArray(input)) {
    return false;
  }

  return input.some((v) => typeof v === "number");
};
