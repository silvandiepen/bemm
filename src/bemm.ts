import {
  BemmObject,
  BemmSettings,
  MultiBemmBlocks,
  MultiBemmObject,
} from "./types";
import { toKebabCase } from "./helpers";

const toBemmObject = (
  e: string | BemmObject | null,
  m: string | string[],
  alt: BemmObject
): BemmObject => {
  if (typeof e == "string" && m == "string") {
    return {
      element: e,
      modifier: m,
    };
  } else if (typeof e == "object" && e?.element && e?.modifier) {
    return {
      element: e.element,
      modifier: e.modifier,
    };
  }

  return {
    element: alt.element,
    modifier: alt.modifier,
  };
};

const toBemmSettings = (settings: BemmSettings): BemmSettings => {
  return {
    toKebabCase: true,
    returnArray: false,
    returnString: false,
    ...settings,
  };
};

export const makeBem = (
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
    element ? `__${convertCase(element)}` : ``
  }`;

  const classes: string[] = [];

  if (typeof modifier == "object") {
    modifier.forEach((mod: string) => {
      classes.push(`${elementClass}--${convertCase(mod)}`);
    });
  } else {
    let className = `${elementClass}${
      modifier ? `--${convertCase(modifier)}` : ``
    }`;

    classes.push(className);
  }

  if (settings.returnString && !settings.returnArray)
    return typeof classes == "string" ? classes : classes.join(" ");
  return settings.returnArray
    ? classes
    : classes.length == 1
    ? classes[0]
    : classes;
};

export const createBemms = (
  blocks: MultiBemmBlocks,
  baseSettings: BemmSettings = {}
): MultiBemmObject => {
  const bemms: MultiBemmObject = {};

  Object.keys(blocks).forEach((key) => {
    bemms[key] = createBemm(blocks[key], baseSettings);
  });

  return bemms;
};

export const createBemm =
  (block: string | string[], baseSettings: BemmSettings = {}): Function =>
  (
    e: BemmObject["element"] | BemmObject = "",
    m: BemmObject["modifier"] = "",
    s: BemmSettings
  ) => {
    const settings = toBemmSettings({ ...baseSettings, ...s });

    let classes: string[] = [];
    if (typeof block == "string") {
      classes = makeBem(block, e, m, {
        ...settings,
        returnArray: true,
      }) as string[];
    } else {
      block.forEach((b) => {
        classes = [
          ...classes,
          ...(makeBem(b, e, m, {
            ...settings,
            returnArray: true,
          }) as string[]),
        ];
      });
    }
    if (settings.returnString && !settings.returnArray)
      return typeof classes == "string" ? classes : classes.join(" ");
    return settings.returnArray
      ? classes
      : classes.length == 1
      ? classes[0]
      : classes;
  };
