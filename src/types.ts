export interface BemmObject {
  element: string;
  modifier: string | string[];
}

export interface BemmSettings {
  toKebabCase?: boolean;
  return?: "array" | "string" | "auto";
}

export interface MultiBemmObject {
  [key: string]: Function;
}

export interface MultiBemmBlocks {
  [key: string]: string | string[];
}
