import { generateBemm, returnValues } from "./useBemm";
import { isArray, isStringArray, isString, cleanArray } from "./helpers";
// import type { BemmObjectAllowed, BemmSettings } from "./useBemm";

/*
 *
 * Types
 *
 */

export const BemmReturn = {
  ARRAY: "array",
  STRING: "string",
  AUTO: "auto",
} as const;

export type BemmReturn = typeof BemmReturn[keyof typeof BemmReturn];

export interface BemmSettings {
  toKebabCase?: boolean;
  return?: BemmReturn;
}
export interface BemmObject {
  element: string;
  modifier: string | string[];
  show?: boolean;
}
export interface BemmObjectAllowed extends BemmObject {
  block: string;
  b: string;
  e: string;
  m: string | string[];
  s: boolean;
}

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
  input: Partial<BemmObjectAllowed>,
  settings: BemmSettings = {}
): string[] => {
  if (
    (input.show !== undefined && !input.show) ||
    (input.s !== undefined && !input.s)
  ) {
    return [];
  }

  const b = input?.block || input.b || block;
  const bemmObject = {
    element: input.element || input.e || "",
    modifier: input.modifier || input.m || "",
  };

  return generateBemm(b, bemmObject, "", {
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
  if (input == null) return InputType.NONE;

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

export type useClassesReturnType = Function;
type useClassesInputType = (
  | null
  | string
  | [string, (string[] | string)?, boolean?]
  | { element: string; modifier?: string }
)[];

export const useClasses = (
  block: string | string[],
  settings: BemmSettings = {}
): useClassesReturnType => {
  const classes = (...args: useClassesInputType): string | string[] => {
    const blocks = typeof block == "string" ? [block] : block;

    let classes: string[] = [];

    blocks.forEach((b) => {
      if (args.length == 0 || args[0] == null || args[0] == "") {
        classes.push(
          generateBemm(b, "", "", { return: BemmReturn.STRING }) as string
        );
      }

      args.forEach((arg: any) => {
        switch (getInputType(arg)) {
          case InputType.STRING:
            classes.push(...classesFromString(b, arg, settings));
            break;
          case InputType.ARRAY:
            classes.push(...classesFromArray(b, arg, settings));
            break;
          case InputType.OBJECT:
            classes.push(...classesFromObject(b, arg, settings));
            break;
        }
      });
    });

    return returnValues(cleanArray(classes), settings);
  };

  return classes;
};
