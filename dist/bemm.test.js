"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bemm_1 = require("./bemm");
describe("Class Component", () => {
    it("Should respond with the default class", () => {
        const bem = new bemm_1.Bemm("block");
        expect(bem.m()).toEqual("block");
    });
    it("Should respond with the default class with element", () => {
        const bem = new bemm_1.Bemm("block");
        expect(bem.m("element")).toEqual("block__element");
    });
    it("Should respond with the default class with modifier", () => {
        const bem = new bemm_1.Bemm("block");
        expect(bem.m("element", "dark")).toEqual("block__element--dark");
    });
    it("Should respond with the default class with only modifier", () => {
        const bem = new bemm_1.Bemm("block");
        expect(bem.m("", "dark")).toEqual("block--dark");
    });
    it("Should return with multiple modifiers", () => {
        const bem = new bemm_1.Bemm("block");
        expect(bem.m("test", ["blue", "black"])).toEqual([
            "block__test--blue",
            "block__test--black",
        ]);
    });
    it("Should respond convert all cases right", () => {
        const bem = new bemm_1.Bemm("Block");
        expect(bem.m("Element", "Dark")).toEqual("block__element--dark");
    });
    it("Should not respond with converted cases", () => {
        const bem = new bemm_1.Bemm("Block", {
            toKebabCase: false,
        });
        expect(bem.m("Element", "Dark")).toEqual("Block__Element--Dark");
    });
});
describe("Style", () => {
    it("Should respond with the default class", () => {
        const bemm = (0, bemm_1.createBemm)("block");
        expect(bemm()).toEqual("block");
    });
    it("Should respond with the default class with element", () => {
        const bemm = (0, bemm_1.createBemm)("block");
        expect(bemm("element")).toEqual("block__element");
    });
    it("Should respond with the default class with modifier", () => {
        const bemm = (0, bemm_1.createBemm)("block");
        expect(bemm("element", "dark")).toEqual("block__element--dark");
    });
    it("Should respond with the default class with only modifier", () => {
        const bemm = (0, bemm_1.createBemm)("block");
        expect(bemm("", "dark")).toEqual("block--dark");
    });
    it("Should return with multiple modifiers", () => {
        const bemm = (0, bemm_1.createBemm)("block");
        expect(bemm("test", ["blue", "black"])).toEqual([
            "block__test--blue",
            "block__test--black",
        ]);
    });
});
