import {
  BemmObject,
  BemmSettings,
  MultiBemmBlocks,
  MultiBemmObject,
} from "./types";
import { toKebabCase } from "./helpers";

const toBemmObject = (
  e: string | BemmObject | null,
  alt: BemmObject
): BemmObject => {
  if (e !== null && typeof e == "object" && e.element && e.modifier) {
    return e as BemmObject;
  }
  return alt;
};

const toBemmSettings = (settings: BemmSettings): BemmSettings => {
  return {
    toKebabCase: true,
    returnArray: false,
    returnString: false,
    ...settings,
  };
};

export const bemm = (
  block: string,
  e: BemmObject["element"] | BemmObject = "",
  m: BemmObject["modifier"] = "",
  s: BemmSettings
): string | string[] => {
  const { element, modifier } = toBemmObject(e, {
    element: e || "",
    modifier: m,
  } as BemmObject);

  const settings = toBemmSettings(s);

  if (block == "") {
    return ``;
  }

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

export const createMultiBemm = (
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
      classes = bemm(block, e, m, {
        ...settings,
        returnArray: true,
      }) as string[];
    } else {
      block.forEach((b) => {
        classes = [
          ...classes,
          ...(bemm(b, e, m, { ...settings, returnArray: true }) as string[]),
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

export class Bemm {
  block: string = "";
  settings: BemmSettings = {};

  constructor(block: string, settings: BemmSettings = {}) {
    this.block = block;
    this.settings = settings;
  }

  m(
    e: BemmObject["element"] | BemmObject = "",
    m: BemmObject["modifier"] = ""
  ): string | string[] {
    const classes = bemm(this.block, e, m, {
      ...this.settings,
      returnArray: true,
    });

    if (this.settings.returnString && !this.settings.returnArray)
      return (classes as string[]).join(" ");
    return this.settings.returnArray
      ? classes
      : classes.length == 1
      ? classes[0]
      : classes;
  }
}

export default bemm;
