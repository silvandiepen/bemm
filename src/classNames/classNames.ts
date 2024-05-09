import { isArray, isStringArray, cleanArray, isString } from "../helpers";
import { keyObject, classesInput } from "./classNames.model";
import { isValidObject, isMixedInput } from "./classNames.utils";

/**
 * Returns an array of class names from an object with boolean values.
 * @param input An object with boolean values.
 * @returns An array of class names.
 */
const getObjectClasses = (input: any): string[] => {
  let classArray: string[] = [];
  const keys = Object.keys(input);
  keys.forEach((key: string) => {
    if ((input as keyObject)[key]) {
      classArray.push(key);
    }
  });
  return classArray;
};

/**
 * Generates an array of class names from a mixed input.
 * @param input A string, string array, object with boolean values, or array of mixed inputs.
 * @returns An array of class names.
 */
const generateClasses = (input: classesInput): string[] => {
  let classArray: string[] = [];

  if (isString(input)) {
    classArray = [input];
  } else if (isStringArray(input)) {
    classArray = input as string[];
  } else if (isValidObject(input)) {
    classArray = getObjectClasses(input);
  } else if (isArray(input)) {
    classArray = cleanArray(input as any[]);
  }
  return classArray;
};

/**
 * Generates a string of space-separated class names from a mixed input.
 * @param input A string, string array, object with boolean values, or array of mixed inputs.
 * @returns A string of space-separated class names.
 */
export const classNames = (input: classesInput): string => {
  let classArray: string[] = [];

  if (isMixedInput(input) || isArray(input)) {
    (input as any[]).forEach((v: any) => {
      const vClasses = generateClasses(v);
      vClasses.forEach((c) => {
        classArray.push(c);
      });
    });
  } else {
    classArray = generateClasses(input);
  }
  return cleanArray(classArray).join(" ");
};