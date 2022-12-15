import { toKebabCase, undefinedIsTrue } from "./helpers";
import { useClasses, type useClassesReturnType } from "./useClasses";
/*
 *
 * Types
 *
 */
export interface BemmObject {
  element: string | null;
  modifier: string | string[];
  show?: boolean;
}

export const BemmReturn = {
  ARRAY: "array",
  STRING: "string",
  AUTO: "auto",
} as const;

export type BemmReturn = typeof BemmReturn[keyof typeof BemmReturn];

export interface BemmSettings {
  toKebabCase?: boolean;
  return?: BemmReturn;
  prefix?: {
    element?: string;
    modifier?: string;
  };
}

export interface MultiBemmObject {
  [key: string]: Function;
}

export interface MultiBemmBlocks {
  [key: string]: string | string[];
}

/*
 *
 * Convert
 *
 */

export const toBemmObject = (
  e: string | BemmObject | null,
  m: string | string[],
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

const toBemmSettings = (settings: BemmSettings): BemmSettings => {
  let prefix = {
    modifier: "--",
    element: "__",
    ...settings.prefix
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

  const convertCase = (str: string): string => {
    if (settings.toKebabCase) str = toKebabCase(str);
    return str;
  };

  const elementClass = `${convertCase(block)}${
    element ? `${settings.prefix?.element}${convertCase(element)}` : ``
  }`;

  const classes: string[] = [];

  if (typeof modifier == "object") {
    modifier.forEach((mod: string) => {
      classes.push(
        convertCase(mod).length
          ? `${elementClass}${settings.prefix?.modifier}${convertCase(mod)}`
          : `${elementClass}`
      );
    });
  } else {
    let className = `${elementClass}${
      modifier ? `${settings.prefix?.modifier}${convertCase(modifier)}` : ``
    }`;

    classes.push(className);
  }
  return returnValues(classes, settings);
};

/*
 *
 * use Multiple Bemms
 *
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

type bemmReturnType = (
  e?: BemmObject["element"] | BemmObject,
  m?: BemmObject["modifier"],
  s?: BemmSettings
) => {};

interface useBemmReturnType {
  bemm: bemmReturnType;
  classes: Function;
}

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

    if (typeof e !== "string" && e !== null && !undefinedIsTrue(e.show)) {
      return "";
    }

    let classes: string[] = [];
    if (typeof block == "string") {
      classes = generateBemm(block, e, m, {
        ...settings,
        return: "array",
      }) as string[];
    } else {
      block.forEach((b) => {
        classes = [
          ...classes,
          ...(generateBemm(b, e, m, {
            ...settings,
            return: "array",
          }) as string[]),
        ];
      });
    }

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

  bemm.bemm = bemm;
  bemm.classes = useClasses(block, baseSettings);

  return bemm;
};
