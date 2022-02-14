"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bemm = void 0;
class Bemm {
    constructor(block) {
        this.block = "";
        this.block = block;
    }
    c(element = "", modifier = "") {
        if (this.block == "") {
            return ``;
        }
        const className = `${this.block}${element ? `__${element}` : ``}`;
        if (typeof modifier == "string") {
            return `${className}${modifier ? `--${modifier}` : ``}`;
        }
        else {
            const classes = [];
            modifier.forEach((mod) => {
                classes.push(`${className}--${mod}`);
            });
            return classes;
        }
    }
}
exports.Bemm = Bemm;
exports.default = Bemm;
