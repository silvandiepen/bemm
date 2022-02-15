import { toKebabCase } from "./helpers";

describe("To Kebab Case", () => {
  it("Convert to kebab case - my-component", () => {
    expect(toKebabCase("my-component")).toEqual("my-component");
  });
  it("Convert to kebab case - myComponent", () => {
    expect(toKebabCase("myComponent")).toEqual("my-component");
  });
  it("Convert to kebab case - MyComponent", () => {
    expect(toKebabCase("MyComponent")).toEqual("my-component");
  });
  it("Convert to kebab case - my component", () => {
    expect(toKebabCase("my component")).toEqual("my-component");
  });
});
