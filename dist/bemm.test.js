"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bemm_1 = require("./bemm");
describe("Class Component", () => {
    it("Should respond with the default class", () => {
        const bemm = new bemm_1.Bemm("block");
        expect(bemm.c()).toEqual("block");
    });
    it("Should respond with the default class with element", () => {
        const bemm = new bemm_1.Bemm("block");
        expect(bemm.c("element")).toEqual("block__element");
    });
    it("Should respond with the default class with modifier", () => {
        const bemm = new bemm_1.Bemm("block");
        expect(bemm.c("element", "dark")).toEqual("block__element--dark");
    });
    it("Should respond with the default class with only modifier", () => {
        const bemm = new bemm_1.Bemm("block");
        expect(bemm.c("", "dark")).toEqual("block--dark");
    });
    it("Should return with multiple modifiers", () => {
        const bemm = new bemm_1.Bemm("block");
        expect(bemm.c("test", ["blue", "black"])).toEqual([
            "block__test--blue",
            "block__test--black",
        ]);
    });
    it("Should respond convert all cases right", () => {
        const bemm = new bemm_1.Bemm("Block");
        expect(bemm.c("Element", "Dark")).toEqual("block__element--dark");
    });
    it("Should not respond with converted cases", () => {
        const bemm = new bemm_1.Bemm("Block", {
            toKebabCase: false,
        });
        expect(bemm.c("Element", "Dark")).toEqual("Block__Element--Dark");
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
