import {
  isArray,
  isNumeric,
  isObject,
  isString,
  isUndefined,
  toKebabCase,
} from "../helpers";
import { useClasses } from "../useClasses";
import {
  BemmModifiers,
  BemmObject,
  BemmReturn,
  BemmSettings,
  MultiBemmBlocks,
  MultiBemmObject,
  bemmReturnType,
  useBemmReturnType,
} from "./useBemm.model";

/*
 *
 * Convert
 *
 */
/**
 * Converts the provided parameters into a BEM object.
 *
 * @param e - The element name, BEM object, or null.
 * @param m - The modifier name or an array of modifier names.
 * @param alt - The alternative BEM object to use when the input parameters do not match the expected types.
 * @returns The BEM object with element name, modifier name, and show flag.
 */

export const toBemmObject = (
  e: string | BemmObject | null,
  m: string | string[] | BemmModifiers,
  alt: BemmObject
): BemmObject => {
  if (typeof e == "string" && m == "string") {
    return {
      element: e,
      modifier: m,
      show: alt.show,
    };
  } else if (typeof e == "object" && e?.element && e?.modifier) {
    return {
      element: e.element,
      modifier: e.modifier,
      show: e.show,
    };
  }

  return {
    element: alt.element,
    modifier: alt.modifier,
    show: alt.show,
  };
};

/**
 * Converts the provided BEM settings into a standardized format.
 *
 * @param settings - The BEM settings to convert.
 * @returns The standardized BEM settings object.
 */
const toBemmSettings = (settings: BemmSettings): BemmSettings => {
  let prefix = {
    modifier: "--",
    element: "__",
    ...settings.prefix,
  };

  return {
    toKebabCase: true,
    return: BemmReturn.AUTO,
    ...settings,
    prefix: prefix,
  };
};

/*
 *
 * Create a BEMM class
 *
 */
/**
 * Determines the return value based on the BEM settings.
 *
 * @param classes - An array of BEM classes.
 * @param settings - The BEM settings object.
 * @returns The BEM classes as a string or array of strings, based on the settings.
 */
export const returnValues = (
  classes: string[],
  settings: BemmSettings
): string | string[] => {
  switch (settings.return) {
    case BemmReturn.STRING:
      return classes.join(" ");
    case BemmReturn.ARRAY:
      return classes;
    default:
    case BemmReturn.AUTO:
      return classes.length == 1 ? classes[0] : classes;
  }
};
/**
 * Generates BEM classes based on the provided parameters.
 *
 * @param block - The block name.
 * @param e - Optional element name or BEM object.
 * @param m - Optional modifier name.
 * @param s - Optional BEM settings.
 * @returns The generated BEM classes as a string or array of strings.
 */

const convertCase = (str: string, settings: BemmSettings): string => {
  if (settings.toKebabCase) str = toKebabCase(str);
  return str;
};

const constructElementClass = (
  block: string,
  element: string | null,
  settings: BemmSettings
): string => {
  if (element == null || element == "") return convertCase(block, settings);
  return `${convertCase(block, settings)}${
    settings.prefix?.element
  }${convertCase(element, settings)}`;
};

const constructModifierClass = (
  elementClass: string,
  modifier: string | null,
  settings: BemmSettings
): string => {
  if (modifier == null || modifier == "") return elementClass;
  return `${elementClass}${settings.prefix?.modifier}${convertCase(
    modifier,
    settings
  )}`;
};

export const generateBemm = (
  block: string,
  e: BemmObject["element"] | BemmObject = "",
  m: BemmObject["modifier"] = "",
  s: BemmSettings
): string | string[] => {
  if (block == "") return ``;

  const { element, modifier } = toBemmObject(e, m, {
    element: typeof e == "string" || e == null ? e : e.element,
    modifier: typeof e == "string" || e == null ? m : e.modifier,
  });

  const settings = toBemmSettings(s);

  const elementClass = constructElementClass(block, element, settings);

  const classes: string[] = [];

  if (isObject(modifier as BemmModifiers)) {
    Object.keys(modifier).forEach((mod: string) => {
      const shouldShow = !!(modifier as BemmModifiers)[mod];
      if (mod.includes("|")) {
        if (isNumeric((modifier as BemmModifiers)[mod])) {
          const showIndex = (modifier as BemmModifiers)[mod] as number;
          const modArray = mod.split("|");
          const modValue = modArray[showIndex] || "";
          classes.push(
            constructModifierClass(elementClass, modValue, settings)
          );
        } else {
          const trueValue = mod.split("|")[0];
          const falseValue = mod.split("|")[1];
          classes.push(
            constructModifierClass(
              elementClass,
              shouldShow ? trueValue : falseValue,
              settings
            )
          );
        }
      } else {
        classes.push(
          constructModifierClass(
            elementClass,
            shouldShow ? mod : null,
            settings
          )
        );
      }
    });
  } else if (isArray(modifier)) {
    (modifier as string[]).forEach((mod: string) => {
      classes.push(constructModifierClass(elementClass, mod, settings));
    });
  } else if (isString(modifier)) {
    classes.push(
      constructModifierClass(elementClass, modifier as string, settings)
    );
  }

  console.log(`classes`, classes);

  return returnValues(classes, settings);
};

/*
 *
 * use Multiple Bemms
 *
 */
/**
 * Generates multiple sets of BEM classes for various blocks.
 *
 * @param blocks - An object containing block names or arrays of block names.
 * @param baseSettings - Optional base BEM settings.
 * @returns An object containing multiple sets of BEM generation functions and additional BEM-related properties.
 */
export const useBemms = (
  blocks: MultiBemmBlocks,
  baseSettings: BemmSettings = {}
): MultiBemmObject => {
  const bemms: MultiBemmObject = {};

  Object.keys(blocks).forEach((key) => {
    bemms[key] = useBemm(blocks[key], baseSettings);
  });

  return bemms;
};

/*
 *
 * useBemm
 *
 */
/**
 * Custom hook for generating BEM classes.
 *
 * @param block - The block name or an array of block names.
 * @param baseSettings - Optional base BEM settings.
 * @returns An object with BEM generation functions and additional properties related to BEM.
 */
export const useBemm = (
  block: string | string[],
  baseSettings: BemmSettings = {}
): useBemmReturnType & bemmReturnType => {
  const bemm = (
    e: BemmObject["element"] | BemmObject = "",
    m: BemmObject["modifier"] = "",
    s: BemmSettings = {}
  ): string | string[] => {
    const settings = toBemmSettings({ ...baseSettings, ...s });

    if (typeof e !== "string" && e !== null && !isUndefined(e.show)) {
      return "";
    }

    let classes: string[] = [];
    if (typeof block == "string") {
      classes = generateBemm(block, e, m, {
        ...settings,
        return: "array",
      }) as string[];
    } else {
      classes = block.flatMap(
        (b) =>
          generateBemm(b, e, m, {
            ...settings,
            return: "array",
          }) as string[]
      );
    }

    switch (settings.return) {
      case BemmReturn.STRING:
        return classes.join(" ");
      case BemmReturn.ARRAY:
        return classes;
      default:
      case BemmReturn.AUTO:
        return classes.length === 1 ? classes[0] : classes;
    }
  };

  bemm.bemm = bemm;
  bemm.classes = useClasses(block, baseSettings);

  return bemm;
};
