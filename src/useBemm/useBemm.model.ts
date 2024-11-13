/*
 *
 * Types
 *
 */

export interface BemmModifiers {
  [key: string]: boolean | number;
}
export interface BemmObject {
  element: string | string[] | null;
  modifier: string | string[] | BemmModifiers;
  show?: boolean;
}

export const BemmReturn = {
  ARRAY: "array",
  STRING: "string",
  AUTO: "auto",
} as const;

export type BemmReturn = (typeof BemmReturn)[keyof typeof BemmReturn];

export interface BemmSettings {
  toKebabCase?: boolean;
  return?: BemmReturn;
  prefix?: {
    element?: string;
    modifier?: string;
  };
  includeBaseClass?: boolean;
}

export interface MultiBemmObject {
  [key: string]: Function;
}

export interface MultiBemmBlocks {
  [key: string]: string | string[];
}
export type bemmReturnType = (
  e?: BemmObject["element"] | BemmObject,
  m?: BemmObject["modifier"],
  s?: BemmSettings
) => {};

export interface useBemmReturnType {
  bemm: bemmReturnType;
  classes: Function;
}
