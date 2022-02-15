"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bemm = exports.createBemm = exports.bemm = void 0;
const helpers_1 = require("./helpers");
const toBemmObject = (e, alt) => {
    if (typeof e == "object" && e.element && e.modifier) {
        return e;
    }
    return alt;
};
const toBemmSettings = (set) => {
    return Object.assign({ toKebabCase: true }, set);
};
const bemm = (block, elm = "", mod = "", set) => {
    const { element, modifier } = toBemmObject(elm, {
        element: elm,
        modifier: mod,
    });
    const settings = toBemmSettings(set);
    if (block == "") {
        return ``;
    }
    const convertCase = (str) => {
        if (settings.toKebabCase)
            str = (0, helpers_1.toKebabCase)(str);
        return str;
    };
    const elementClass = `${convertCase(block)}${element ? `__${convertCase(element)}` : ``}`;
    if (typeof modifier == "object") {
        const classes = [];
        modifier.forEach((mod) => {
            classes.push(`${elementClass}--${convertCase(mod)}`);
        });
        return classes;
    }
    else {
        return `${elementClass}${modifier ? `--${convertCase(modifier)}` : ``}`;
    }
};
exports.bemm = bemm;
const createBemm = (block, settings = {}) => {
    return (e = "", m = "") => (0, exports.bemm)(block, e, m, settings);
};
exports.createBemm = createBemm;
class Bemm {
    constructor(block, settings = {}) {
        this.block = "";
        this.settings = {};
        this.block = block;
        this.settings = settings;
    }
    c(elm = "", mod = "") {
        return (0, exports.bemm)(this.block, elm, mod, this.settings);
    }
}
exports.Bemm = Bemm;
exports.default = exports.bemm;
