import {
  isArray,
  isBoolean,
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
    includeBaseClass: false,
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
  opts: {
    classes: string[],
    settings: BemmSettings
  }): string | string[] => {

  const classes = Array.from(new Set(opts.classes.filter((c) => c !== "")));

  switch (opts.settings.return) {
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

/**
 * Construct Element Class
 * @param opts
 * @param {string} opts.block
 * @param {string} opts.element
 * @param {BemmSettings} opts.settings
 * @returns {string}
 */
const constructElementClass = (opts: {
  block: string,
  element: string | string[] | null,
  settings: BemmSettings
}): string => {
  if (opts.element == null || opts.element == "" || opts.element.length == 0) return convertCase(opts.block, opts.settings);

  return toStringArray(opts.element).map((e) => `${convertCase(opts.block, opts.settings)}${opts.settings.prefix?.element
    }${convertCase(e, opts.settings)}`).join(" ");
};

/**
 * Construct Modifier Class
 * @param opts
 * @param {string} opts.elementClass
 * @param {string} opts.modifier
 * @param {BemmSettings} opts.settings
 * @returns {string}
  */
const constructModifierClass = (opts: {
  elementClass: string,
  modifier: string | null,
  settings: BemmSettings
}): string => {
  if (opts.modifier == null || opts.modifier == "") return opts.elementClass;
  return `${opts.elementClass}${opts.settings.prefix?.modifier}${convertCase(
    opts.modifier,
    opts.settings
  )}`;
};

/**
 *  Handle Generate Array
 * @param opts
 * @param {string} opts.elementClass
 * @param {string[]} opts.modifier
 * @param {BemmSettings} opts.settings
 * @returns
 */
const handleGenerateArray = (
  opts: { elementClass: string, modifier: string[], settings: BemmSettings }) => {
  const classes: string[] = [];
  opts.modifier.forEach((mod: string) => {
    classes.push(constructModifierClass({
      elementClass: opts.elementClass, modifier: mod,
      settings: opts.settings
    }));
  });
  return classes;
}

/**
 *
 * @params opts
 * @param {string} opts.elementClass
 * @param {BemmObject['modifier']} opts.modifier
 * @param {BemmSettings} opts.settings
 * @returns {string[]}
 */
const handleGenerateObject = (opts: {
  elementClass: string,
  modifier: BemmObject['modifier'],
  settings: BemmSettings
}): string[] => {

  const classes: string[] = [];

  Object.keys(opts.modifier).forEach((mod: string) => {
    const shouldShow = !!(opts.modifier as BemmModifiers)[mod];

    if (!mod.includes("|")) {
      classes.push(
        constructModifierClass({
          elementClass: opts.elementClass,
          modifier: shouldShow ? mod : null,
          settings: opts.settings
        })
      );
    } else {
      if (isNumeric((opts.modifier as BemmModifiers)[mod])) {
        const showIndex = (opts.modifier as BemmModifiers)[mod] as number;
        const modArray = mod.split("|");
        const modValue = modArray[showIndex] || "";
        classes.push(
          constructModifierClass({
            elementClass: opts.elementClass,
            modifier: modValue,
            settings: opts.settings
          })
        );
      } else {
        const trueValue = mod.split("|")[0];
        const falseValue = mod.split("|")[1];
        classes.push(
          constructModifierClass({
            elementClass: opts.elementClass,
            modifier: shouldShow ? trueValue : falseValue,
            settings: opts.settings
          })
        );
      }
    }
  });

  return classes;
}

/**
 * Generates BEM (Block Element Modifier) class names based on the provided block, element, modifier, and settings.
 *
 * @param {string} block - The block name.
 * @param {string} [e=""] - The element name.
 * @param {string} [m=""] - The modifier name.
 * @param {BemmSettings} s - The settings for BEM generation.
 * @returns {string | string[]} - The generated BEM class names. Returns a string if `s.return` is 'string', otherwise returns an array of strings.
 */
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
    const elementClass = constructElementClass({
      block, element: el, settings
    });

    if(settings.includeBaseClass) classes.push(elementClass);

    switch (true) {
      case isString(modifier):
      case isArray(modifier):
        classes.push(...handleGenerateArray({
          elementClass,
          modifier: toStringArray(modifier),
          settings
        }));
        break;
      case isObject(modifier):
        classes.push(...handleGenerateObject({ elementClass, modifier: modifier as BemmModifiers, settings }));
        break;
      default:
        classes.push(elementClass);
    }
  });

  return returnValues({ classes, settings });
};

/*
 *
 * use Multiple Bemms
 *
 */
/**
 * Generates multiple sets of BEM classes for various blocks.
 *
 * @param {MultiBemmBlocks} blocks - An object containing block names or arrays of block names.
 * @param {BemmSettings} [baseSettings={}] - Optional base BEM settings.
 * @returns {MultiBemmObject} An object containing multiple sets of BEM generation functions and additional BEM-related properties.
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
 * Custom hook for generating BEM (Block Element Modifier) classes.
 *
 * @param {string | string[]} block - The block name or an array of block names.
 * @param {BemmSettings} [baseSettings={}] - Optional base BEM settings.
 * @returns {useBemmReturnType & bemmReturnType} An object with BEM generation functions and additional properties related to BEM.
 */
export const useBemm = <S extends BemmSettings = BemmSettings>(
  block: string | string[],
  baseSettings: S = {} as S
): useBemmReturnType & bemmReturnType => {

  const bemmFn = <T extends BemmSettings = S>(
    e: BemmObject["element"] | BemmObject = "",
    m: BemmObject["modifier"] = "",
    s: T = baseSettings as unknown as T
  ): T extends { return: 'string' } ? string : T extends { return: 'array' } ? string[] : string | string[] => {
    const settings = toBemmSettings({ ...baseSettings, ...s });

    if (isString(e) && isArray(e) && e !== null && !isUndefined((e as unknown as BemmObject)?.show)) {
      return "" as T extends { return: 'string' } ? string : T extends { return: 'array' } ? string[] : string | string[];
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

    if (!show) return "" as T extends { return: 'string' } ? string : T extends { return: 'array' } ? string[] : string | string[];

    return returnValues({
      classes,
      settings
    }) as T extends { return: 'string' } ? string : T extends { return: 'array' } ? string[] : string | string[];
  };

  const bemm = bemmFn as useBemmReturnType & bemmReturnType;
  bemm.bemm = bemmFn;
  bemm.classes = useClasses(block, baseSettings);

  return bemm;
};
