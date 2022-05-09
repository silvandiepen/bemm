import { BemmObject, BemmSettings } from "./types";
export declare const bemm: (block: string, elm: string | BemmObject | undefined, mod: string | string[] | undefined, set: BemmSettings) => string | string[];
export declare const createBemm: (block: string, settings?: BemmSettings) => Function;
export declare class Bemm {
    block: string;
    settings: BemmSettings;
    constructor(block: string, settings?: BemmSettings);
    m(elm?: BemmObject["element"] | BemmObject, mod?: BemmObject["modifier"]): string | string[];
}
export default bemm;
//# sourceMappingURL=bemm.d.ts.map