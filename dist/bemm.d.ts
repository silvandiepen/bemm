import { BemmObject, BemmSettings } from "./types";
export declare const bemm: (block: string, e: string | BemmObject | undefined, m: string | string[] | undefined, s: BemmSettings) => string | string[];
export declare const createBemm: (block: string | string[], baseSettings?: BemmSettings) => Function;
export declare class Bemm {
    block: string;
    settings: BemmSettings;
    constructor(block: string, settings?: BemmSettings);
    m(e?: BemmObject["element"] | BemmObject, m?: BemmObject["modifier"]): string | string[];
}
export default bemm;
//# sourceMappingURL=bemm.d.ts.map