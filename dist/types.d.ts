export interface BemmObject {
    element: string | undefined | null;
    modifier: string | string[];
}
export interface BemmSettings {
    toKebabCase?: boolean;
    returnArray?: boolean;
    returnString?: boolean;
}
export interface MultiBemmObject {
    [key: string]: Function;
}
export interface MultiBemmBlocks {
    [key: string]: string | string[];
}
//# sourceMappingURL=types.d.ts.map