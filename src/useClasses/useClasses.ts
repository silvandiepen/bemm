import { generateBemm, returnValues } from "../useBemm";
import {
  cleanArray,
} from "../helpers";
import {
  BemmSettings,
  BemmReturn,
  InputType,
  BemmObjectAllowed,
  useClassesReturnType,
  useClassesInputType,
} from "./useClasses.model";
import {
  toElement,
  toModifier,
  isAcceptedArray,
  isFalseArray,
  isBemmObject,
} from "./useClasses.utils";

/**
 * Returns an array of class names generated from an array input.
 * @param block The block name.
 * @param input An array input.
 * @param settings Optional settings for the BEMM generator.
 * @returns An array of class names.
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

/**
 * Returns an array of class names generated from a string input.
 * @param block The block name.
 * @param input A string input.
 * @param settings Optional settings for the BEMM generator.
 * @returns An array of class names.
 */
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

/**
 * Returns an array of class names generated from an object input.
 * @param block The block name.
 * @param input An object input.
 * @param settings Optional settings for the BEMM generator.
 * @returns An array of class names.
 */
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

/**
 * Returns the input type of a given input.
 * @param input The input to check.
 * @returns The input type.
 */
const getInputType = (input: any): InputType => {
  if (input === null || input === undefined) return InputType.NONE;

  if (typeof input === "string") {
    return InputType.STRING;
  }

  if (
    (Array.isArray(input) && input.length < 4) ||
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

/**
 * Returns a function that generates class names based on the given block and settings.
 * @param block The block name or an array of block names.
 * @param settings Optional settings for the BEMM generator.
 * @returns A function that generates class names.
 */
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