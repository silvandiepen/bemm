import { BemmObject, BemmSettings } from "./types";
import { toKebabCase } from "./helpers";

const toBemmObject = (e: string | BemmObject, alt: BemmObject): BemmObject => {
  if (typeof e == "object" && e.element && e.modifier) {
    return e as BemmObject;
  }
  return alt;
};

const toBemmSettings = (set: BemmSettings): BemmSettings => {
  return {
    toKebabCase: true,
    ...set,
  };
};

export const bemm = (
  block: string,
  elm: BemmObject["element"] | BemmObject = "",
  mod: BemmObject["modifier"] = "",
  set: BemmSettings
): string | string[] => {
  const { element, modifier } = toBemmObject(elm, {
    element: elm,
    modifier: mod,
  } as BemmObject);

  const settings = toBemmSettings(set);

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

  if (typeof modifier == "object") {
    const classes: string[] = [];

    modifier.forEach((mod: string) => {
      classes.push(`${elementClass}--${convertCase(mod)}`);
    });
    return classes;
  } else {
    return `${elementClass}${modifier ? `--${convertCase(modifier)}` : ``}`;
  }
};

export const createBemm =
  (block: string, settings: BemmSettings = {}): Function =>
  (
    e: BemmObject["element"] | BemmObject = "",
    m: BemmObject["modifier"] = ""
  ) =>
    bemm(block, e, m, settings);

export class Bemm {
  block: string = "";
  settings: BemmSettings = {};

  constructor(block: string, settings: BemmSettings = {}) {
    this.block = block;
    this.settings = settings;
  }

  m(
    elm: BemmObject["element"] | BemmObject = "",
    mod: BemmObject["modifier"] = ""
  ): string | string[] {
    return bemm(this.block, elm, mod, this.settings);
  }
}

export default bemm;
