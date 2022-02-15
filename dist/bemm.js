"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bemm = exports.createBemm = exports.bemm = void 0;
const toBemmObject = (e, alt) => {
    if (typeof e == "object" && e.element && e.modifier) {
        return e;
    }
    return alt;
};
const bemm = (block, elm = "", mod = "") => {
    const { element, modifier } = toBemmObject(elm, {
        element: elm,
        modifier: mod,
    });
    if (block == "") {
        return ``;
    }
    const elementClass = `${block}${element ? `__${element}` : ``}`;
    if (typeof modifier == "object") {
        const classes = [];
        modifier.forEach((mod) => {
            classes.push(`${elementClass}--${mod}`);
        });
        return classes;
    }
    else {
        return `${elementClass}${modifier ? `--${modifier}` : ``}`;
    }
};
exports.bemm = bemm;
const createBemm = (block) => {
    return (e = "", m = "") => (0, exports.bemm)(block, e, m);
};
exports.createBemm = createBemm;
class Bemm {
    constructor(block) {
        this.block = "";
        this.block = block;
    }
    c(elm = "", mod = "") {
        return (0, exports.bemm)(this.block, elm, mod);
    }
}
exports.Bemm = Bemm;
exports.default = exports.bemm;
