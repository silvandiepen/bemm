import {
  toKebabCase,
  isStringArray,
  cleanArray,
  undefinedIsTrue,
} from "./helpers";

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

describe("isStringArray", () => {
  it("Wrong values - a string", () => {
    expect(isStringArray("something")).toEqual(false);
  });
  it("Wrong values - a number", () => {
    expect(isStringArray(1)).toEqual(false);
  });
  it("Wrong values - a array with unaccepted chars", () => {
    expect(isStringArray([1, 2])).toEqual(false);
  });
  it("Wrong values - a string array", () => {
    expect(isStringArray(["something"])).toEqual(true);
  });
});

describe("cleanArray", () => {
  it("A single string", () => {
    const input = cleanArray(["block1", "block2"]);
    const output = ["block1", "block2"];

    expect(input).toEqual(output);
  });
  it("A Double string", () => {
    const input = cleanArray(["block1 block2", "block3"]);
    const output = ["block1", "block2", "block3"];

    expect(input).toEqual(output);
  });
  it("A undefined string", () => {
    const input = cleanArray(["block1 block2", undefined, false, "block3"]);
    const output = ["block1", "block2", "block3"];

    expect(input).toEqual(output);
  });
});

describe("undefinedIsTrue", () => {
  it("Undefined == true", () => {
    expect(undefinedIsTrue(undefined)).toEqual(true);
  });
  it("false == false", () => {
    expect(undefinedIsTrue(false)).toEqual(false);
  });
  it("true == true", () => {
    expect(undefinedIsTrue(true)).toEqual(true);
  });
  it("'test' == true", () => {
    expect(undefinedIsTrue("test")).toEqual(true);
  });
});
