"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bemm_1 = __importDefault(require("./bemm"));
let bemm = null;
describe("Style", () => {
    beforeEach(() => {
        bemm = new bemm_1.default("block");
    });
    it("Should respond with the default class", () => {
        expect(bemm.c()).toEqual("block");
    });
    it("Should respond with the default class with element", () => {
        expect(bemm.c("element")).toEqual("block__element");
    });
    it("Should respond with the default class with modifier", () => {
        expect(bemm.c("element", "dark")).toEqual("block__element--dark");
    });
    it("Should respond with the default class with only modifier", () => {
        expect(bemm.c("", "dark")).toEqual("block--dark");
    });
    it("Should return with multiple modifiers", () => {
        expect(bemm.c("test", ["blue", "black"])).toEqual([
            "block__test--blue",
            "block__test--black",
        ]);
    });
});
