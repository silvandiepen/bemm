/*
 *
 * Types
 *
 */

export const BemmReturn = {
  ARRAY: "array",
  STRING: "string",
  AUTO: "auto",
} as const;

export type BemmReturn = (typeof BemmReturn)[keyof typeof BemmReturn];

export interface BemmSettings {
  toKebabCase?: boolean;
  return?: BemmReturn;
}
export interface BemmObject {
  element: string;
  modifier: string | string[];
  show?: boolean;
}
export interface BemmObjectAllowed extends BemmObject {
  block: string;
  b: string;
  e: string;
  m: string | string[];
  s: boolean;
}

export const InputType = {
  STRING: "string",
  ARRAY: "array",
  OBJECT: "object",
  NONE: "none",
};
export type InputType = (typeof InputType)[keyof typeof InputType];
export type useClassesReturnType = Function;
export type useClassesInputType = (
  | null
  | string
  | [string, (string[] | string)?, boolean?]
  | { element: string; modifier?: string }
)[];