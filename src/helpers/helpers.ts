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
 * Checks if the input is an a number.
 * @param input The input to check.
 * @returns True if the input is an object, false otherwise.
 */

export const isNumeric = (input: unknown): input is number => {
  return !isNaN(input as number) && typeof input === "number";
};

/**
 * Checks if the input is an object.
 * @param input The input to check.
 * @returns True if the input is an object, false otherwise.
 */
export const isObject = (input: unknown): input is object => {
  return typeof input == "object" && !Array.isArray(input);
};

/**
 * Checks if the input is an array.
 * @param input The input to check.
 * @returns True if the input is an array, false otherwise.
 */
export const isArray = (input: unknown): input is any[] => {
  return typeof input == "object" && Array.isArray(input) && !isObject(input);
};

/**
 * Checks if the input is an array of strings.
 * @param input The input to check.
 * @returns True if the input is an array of strings, false otherwise.
 */
export const isStringArray = (input: unknown): input is string[] => {
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
export const isString = (input: unknown): input is string => {
  return typeof input == "string";
};

/**
 * 
 * @param input The input to check.
 * @returns boolean
 * @example
 * isNullOrUndefined(null) => true
 * isNullOrUndefined(undefined) => true
 * isNullOrUndefined(1) => false
 * isNullOrUndefined("test") => false
 */
export const isNullOrUndefined = (input: any): input is null | undefined => {
  return input === null || input === undefined;
}


/**
 * Converts the input to an array.
 * @param input The input to convert.
 * @returns The input as an array.
 * @example
 * toArray("test") => ["test"]  
 * toArray(["test"]) => ["test"]
 * toArray(null) => [null]
 * toArray(undefined) => [undefined]
 * toArray(1) => [1]
  */

export const toArray = (input: any): any[] => {
  if (Array.isArray(input)) {
    return input;
  }

  return [input];
}

/**
 * Converts the input to an array of strings.
 * @param input 
 * @returns The input as an array of strings.
 * @example
 * toStringArray("test") => ["test"]
 * toStringArray(["test"]) => ["test"]
 * toStringArray(null) => []
 */

export const toStringArray = (input: unknown): string[] => {
  if (isStringArray(input)) {
    return input;
  }

  if (isString(input)) {
    return [input];
  }

  return [];
}

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
 * Checks if the input is a boolean.
 * @param input The input to check.
 * @returns True if the input is a boolean, false otherwise.
 * 
 */
export const isBoolean = (input: any): boolean => {
  return typeof input === "boolean";
}


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
