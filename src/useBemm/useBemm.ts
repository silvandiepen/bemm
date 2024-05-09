import {
  isArray,
  isBoolean,
  isNullOrUndefined,
  isNumeric,
  isObject,
  isString,
  isStringArray,
  isUndefined,
  toKebabCase,
  toStringArray,
} from "../helpers";
import { useClasses } from "../useClasses";
import { isBemmObject } from "../useClasses/useClasses.utils";
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

type BemmReturnType<S extends BemmSettings> = S['return'] extends 'array' ? string[] : string;


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
  e: string | string[] | BemmObject | null,
  m: string | string[] | BemmModifiers,
  alt: BemmObject
): BemmObject => {

  const show = ((e as BemmObject)?.show !== undefined) ? (e as BemmObject)?.show : (isBoolean(alt.show) ? alt.show : true);

  let bemmObj: BemmObject = {
    element: alt.element,
    modifier: alt.modifier,
    show
  };

  if ((isString(e) || isStringArray(e)) && isString(m)) {
    bemmObj = {
      element: e,
      modifier: m,
      show
    };

  } else if (isBemmObject(e)) {
    const el: BemmObject = e as BemmObject;
    bemmObj = {
      element: el.element,
      modifier: el.modifier,
      show
    };
  }
  return bemmObj;
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
      return classes.join(" ")
    case BemmReturn.ARRAY:
      return classes
    default:
    case BemmReturn.AUTO:
      return (classes.length == 1 ? classes[0] : classes);
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
  element: string | string[] | null,
  settings: BemmSettings
): string => {
  if (element == null || element == "" || element.length == 0) return convertCase(block, settings);

  return toStringArray(element).map((e) => `${convertCase(block, settings)}${settings.prefix?.element
    }${convertCase(e, settings)}`).join(" ");
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


const handleGenerateArray = (elementClass: string, modifier: string[], settings: BemmSettings) => {
  const classes: string[] = [];
  modifier.forEach((mod: string) => {
    classes.push(constructModifierClass(elementClass, mod, settings));
  });
  return classes;
}


const handleGenerateObject = (elementClass: string, modifier: BemmObject['modifier'], settings: BemmSettings) => {
  const classes: string[] = [];

  Object.keys(modifier).forEach((mod: string) => {
    const shouldShow = !!(modifier as BemmModifiers)[mod];

    if (!mod.includes("|")) {
      classes.push(
        constructModifierClass(
          elementClass,
          shouldShow ? mod : null,
          settings
        )
      );
    } else {
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
    }
  });

  return classes;
}



export const generateBemm = (
  block: string,
  e: BemmObject["element"] = "",
  m: BemmObject["modifier"] = "",
  s: BemmSettings
): string | string[] => {

  if (block == "") return [];

  const { modifier } = toBemmObject(e, m, {
    element: e,
    modifier: m
  });

  const settings = toBemmSettings(s);

  const classes: string[] = [];

  toStringArray(e).forEach((el) => {
    const elementClass = constructElementClass(block, el, settings);

    switch (true) {
      case isString(modifier):
      case isArray(modifier):
        classes.push(...handleGenerateArray(elementClass, toStringArray(modifier), settings));
        break;
      case isObject(modifier):
        classes.push(...handleGenerateObject(elementClass, modifier as BemmModifiers, settings));
        break;
      default:
        classes.push(elementClass);
    }

  });

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

    if (isString(e) && isArray(e) && e !== null && !isUndefined((e as unknown as BemmObject)?.show)) {
      return "";
    }

    let classes: string[] = [];


    const { element, modifier, show } = toBemmObject(e, m, {
      element: isBemmObject(e) ? e.element : e as string | string[] | null,
      modifier: isBemmObject(e) ? e.modifier : m
    });


    switch (true) {
      case isString(block):
        classes = generateBemm(block as string, element, modifier,
          {
            ...settings,
            return: BemmReturn.ARRAY
          }) as string[];
        break;
      case isArray(block):
        classes = toStringArray(block).flatMap(
          (b: string) => {
            return toStringArray(e).map((e) => generateBemm(b, e, m, settings)).flat();
          }
        ).flat();
        break;
    }

    if (!show) return "";

    return returnValues(classes, settings);
  };

  bemm.bemm = bemm;
  bemm.classes = useClasses(block, baseSettings);

  return bemm;
};
