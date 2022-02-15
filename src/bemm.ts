export interface BemmObject {
  element: string;
  modifier: string | string[];
}

const toBemmObject = (e: string | BemmObject, alt: BemmObject): BemmObject => {
  if (typeof e == "object" && e.element && e.modifier) {
    return e as BemmObject;
  }
  return alt;
};

export const bemm = (
  block: string,
  elm: BemmObject["element"] | BemmObject = "",
  mod: BemmObject["modifier"] = ""
): string | string[] => {
  const { element, modifier } = toBemmObject(elm, {
    element: elm,
    modifier: mod,
  } as BemmObject);

  if (block == "") {
    return ``;
  }

  const elementClass = `${block}${element ? `__${element}` : ``}`;

  if (typeof modifier == "object") {
    const classes: string[] = [];

    modifier.forEach((mod: string) => {
      classes.push(`${elementClass}--${mod}`);
    });
    return classes;
  } else {
    return `${elementClass}${modifier ? `--${modifier}` : ``}`;
  }
};

export const createBemm = (block: string): Function => {
  return (
    e: BemmObject["element"] | BemmObject = "",
    m: BemmObject["modifier"] = ""
  ) => bemm(block, e, m);
};

export class Bemm {
  block: string = "";

  constructor(block: string) {
    this.block = block;
  }

  c(
    elm: BemmObject["element"] | BemmObject = "",
    mod: BemmObject["modifier"] = ""
  ): string | string[] {
    return bemm(this.block, elm, mod);
  }
}

export default bemm;
