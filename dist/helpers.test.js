"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
describe("To Kebab Case", () => {
    it("Convert to kebab case - my-component", () => {
        expect((0, helpers_1.toKebabCase)("my-component")).toEqual("my-component");
    });
    it("Convert to kebab case - myComponent", () => {
        expect((0, helpers_1.toKebabCase)("myComponent")).toEqual("my-component");
    });
    it("Convert to kebab case - MyComponent", () => {
        expect((0, helpers_1.toKebabCase)("MyComponent")).toEqual("my-component");
    });
    it("Convert to kebab case - my component", () => {
        expect((0, helpers_1.toKebabCase)("my component")).toEqual("my-component");
    });
});
