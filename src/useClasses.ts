import { generateBemm, BemmReturn, returnValues } from "./useBemm";
import { isArray, isStringArray, isString, cleanArray } from "./helpers";
import { BemmObject, BemmSettings } from "useBemm";

/*
 *
 * Types
 *
 */

const InputType = {
  STRING: "string",
  ARRAY: "array",
  OBJECT: "object",
  NONE: "none",
};
type InputType = typeof InputType[keyof typeof InputType];

/*
 *
 * Convert
 *
 */
const toElement = (input: any): string => {
  if (isString(input)) {
    return input;
  }
  return "";
};
const toModifier = (input: any): string | string[] => {
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

const isBemmObject = (input: any): boolean => {
  if (typeof input !== "object" && !Array.isArray(input) && input !== null)
    return false;

  if (input.element) {
    return true;
  }

  return false;
};

const isAcceptedArray = (input: any): boolean => {
  if (isArray(input)) {
    if (isString(input[0]) && (isStringArray(input[1]) || isString(input[1]))) {
      return true;
    }
  }
  return false;
};

const isFalseArray = (input: any) => {
  if (!isString(input) && input[2] !== undefined) {
    if (!input[2]) {
      return true;
    }
  }

  return false;
};

/*
 *
 * Create Classes
 *
 */
const classesFromArray = (
  block: string,
  input: any[],
  settings: BemmSettings = {}
) => {
  const classes: string[] = [];
  const bemmClasses = generateBemm(
    block,
    toElement(input[0]),
    toModifier(input[1]),
    { ...settings, return: BemmReturn.ARRAY }
  );
  (bemmClasses as string[]).forEach((c) => {
    classes.push(c);
  });
  return classes;
};

const classesFromString = (
  block: string,
  input: string,
  settings: BemmSettings = {}
): string[] => {
  const b: { [key: string]: string } = {
    block,
    element: "",
    modifier: "",
  };
  if (input.includes(":")) {
    b.element = input.split(":")[0];
    b.modifier = input.split(":")[1];
  } else {
    b.element = input;
  }

  return generateBemm(b.block, b.element, b.modifier, {
    ...settings,
    return: BemmReturn.ARRAY,
  }) as string[];
};

const classesFromObject = (
  block: string,
  input: BemmObject,
  settings: BemmSettings = {}
): string[] => {
  if (input.show !== undefined && !input.show) {
    return [];
  }
  const bemmObject = { element: input.element, modifier: input.modifier };
  return generateBemm(block, bemmObject, "", {
    ...settings,
    return: BemmReturn.ARRAY,
  }) as string[];
};

/*
 *
 * Get the Type
 *
 */

const getInputType = (input: any): InputType => {
  if (isString(input) && input !== "") {
    return InputType.STRING;
  }
  if (
    (isStringArray(input) && (input as string[]).length < 4) ||
    isAcceptedArray(input)
  ) {
    if (isFalseArray(input)) return InputType.NONE;
    return InputType.ARRAY;
  }
  if (isBemmObject(input)) {
    return InputType.OBJECT;
  }
  return InputType.NONE;
};

/*
 *
 * The Function
 *
 */
export const useClasses = (
  block: string,
  settings: BemmSettings = {}
): Function => {
  return (
    ...args: (
      | null
      | string
      | [string, (string[] | string)?, boolean?]
      | { element: string; modifier?: string }
    )[]
  ) => {
    let classes: string[] = [];

    args.forEach((arg: any) => {
      switch (getInputType(arg)) {
        case InputType.STRING:
          classes.push(...classesFromString(block, arg, settings));
          break;
        case InputType.ARRAY:
          classes.push(...classesFromArray(block, arg, settings));
          break;
        case InputType.OBJECT:
          classes.push(...classesFromObject(block, arg, settings));
          break;
      }
    });

    return returnValues(cleanArray(classes), settings);
  };
};
