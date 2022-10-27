"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bemm = exports.createBemm = exports.createMultiBemm = exports.bemm = void 0;
const helpers_1 = require("./helpers");
const toBemmObject = (e, m, alt) => {
    if (typeof e == "string" && m == "string") {
        return {
            element: e,
            modifier: m,
        };
    }
    else if (typeof e == "object" && (e === null || e === void 0 ? void 0 : e.element) && (e === null || e === void 0 ? void 0 : e.modifier)) {
        return {
            element: e.element,
            modifier: e.modifier,
        };
    }
    return {
        element: alt.element,
        modifier: alt.modifier,
    };
};
const toBemmSettings = (settings) => {
    return Object.assign({ toKebabCase: true, returnArray: false, returnString: false }, settings);
};
const bemm = (block, e = "", m = "", s) => {
    if (block == "")
        return ``;
    const { element, modifier } = toBemmObject(e, m, {
        element: typeof e == "string" || e == null ? e : e.element,
        modifier: typeof e == "string" || e == null ? m : e.modifier,
    });
    const settings = toBemmSettings(s);
    const convertCase = (str) => {
        if (settings.toKebabCase)
            str = (0, helpers_1.toKebabCase)(str);
        return str;
    };
    const elementClass = `${convertCase(block)}${element ? `__${convertCase(element)}` : ``}`;
    const classes = [];
    if (typeof modifier == "object") {
        modifier.forEach((mod) => {
            classes.push(`${elementClass}--${convertCase(mod)}`);
        });
    }
    else {
        let className = `${elementClass}${modifier ? `--${convertCase(modifier)}` : ``}`;
        classes.push(className);
    }
    if (settings.returnString && !settings.returnArray)
        return typeof classes == "string" ? classes : classes.join(" ");
    return settings.returnArray
        ? classes
        : classes.length == 1
            ? classes[0]
            : classes;
};
exports.bemm = bemm;
const createMultiBemm = (blocks, baseSettings = {}) => {
    const bemms = {};
    Object.keys(blocks).forEach((key) => {
        bemms[key] = (0, exports.createBemm)(blocks[key], baseSettings);
    });
    return bemms;
};
exports.createMultiBemm = createMultiBemm;
const createBemm = (block, baseSettings = {}) => (e = "", m = "", s) => {
    const settings = toBemmSettings(Object.assign(Object.assign({}, baseSettings), s));
    let classes = [];
    if (typeof block == "string") {
        classes = (0, exports.bemm)(block, e, m, Object.assign(Object.assign({}, settings), { returnArray: true }));
    }
    else {
        block.forEach((b) => {
            classes = [
                ...classes,
                ...(0, exports.bemm)(b, e, m, Object.assign(Object.assign({}, settings), { returnArray: true })),
            ];
        });
    }
    if (settings.returnString && !settings.returnArray)
        return typeof classes == "string" ? classes : classes.join(" ");
    return settings.returnArray
        ? classes
        : classes.length == 1
            ? classes[0]
            : classes;
};
exports.createBemm = createBemm;
class Bemm {
    constructor(block, settings = {}) {
        this.block = "";
        this.settings = {};
        this.block = block;
        this.settings = settings;
    }
    m(e = "", m = "") {
        const classes = (0, exports.bemm)(this.block, e, m, Object.assign(Object.assign({}, this.settings), { returnArray: true }));
        if (this.settings.returnString && !this.settings.returnArray)
            return classes.join(" ");
        return this.settings.returnArray
            ? classes
            : classes.length == 1
                ? classes[0]
                : classes;
    }
}
exports.Bemm = Bemm;
exports.default = exports.bemm;
