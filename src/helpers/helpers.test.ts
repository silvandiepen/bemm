import {
  toKebabCase,
  isStringArray,
  cleanArray,
  isUndefined,
  arrayHasNumber,
} from "./helpers";

describe("toKebabCase", () => {
  describe.each([
    ["my-component", "my-component"],
    ["myComponent", "my-component"],
    ["MyComponent", "my-component"],
    ["my component", "my-component"],
    ["my-component-123", "my-component-123"],
    ["myComponent123", "my-component123"],
    ["MyComponent123", "my-component123"],
    ["my component 123", "my-component-123"],
    ["my-component-123-abc", "my-component-123-abc"],
    ["myComponent123Abc", "my-component123-abc"],
    ["MyComponent123Abc", "my-component123-abc"],
    ["my component 123 abc", "my-component-123-abc"],
  ])("toKebabCase :: converts to kebab case", (input, expected) => {
    it(`converts "${input}" to "${expected}"`, () => {
      expect(toKebabCase(input)).toEqual(expected);
    });
  });
});

describe("isStringArray", () => {
  describe.each([
    ["something", false],
    [1, false],
    [[1, 2], false],
    [["something"], true],
    [["something", 1], false],
    [["something", "else"], true],
    [[], false],
  ])("isStringArray :: checks if input is a string array", (input, expected) => {
    it(`returns ${expected} for input ${JSON.stringify(input)}`, () => {
      expect(isStringArray(input)).toEqual(expected);
    });
  });
});

describe("cleanArray", () => {
  describe.each([
    [
      ["block1", "block2"],
      ["block1", "block2"],
    ],
    [
      ["block1 block2", "block3"],
      ["block1", "block2", "block3"],
    ],
    [
      ["block1 block2", undefined, false, "block3"],
      ["block1", "block2", "block3"],
    ],
    [["  block1  ", "  block2  "], ["block1", "block2"]],
    [["block1  block2", "  block3  "], ["block1", "block2", "block3"]],
    [["block1  block2", undefined, false, "  block3  "], ["block1", "block2", "block3"]],
    [["block1", "block2", ""], ["block1", "block2"]],
    [["block1", "block2", "  "], ["block1", "block2"]],
    [["block1", "block2", "  ", "block3"], ["block1", "block2", "block3"]],
  ])("cleanArray :: cleans up array of strings", (input, expected) => {
    it(`returns ${JSON.stringify(expected)} for input ${JSON.stringify(input)}`, () => {
      expect(cleanArray(input)).toEqual(expected);
    });
  });
});

describe("isUndefined", () => {
  describe.each([
    [undefined, true],
    [false, false],
    [true, true],
    ["test", true],
    [0, false],
    [1, true],
    [-1, true],
    [null, true],
    [{}, true],
    [[], true],
  ])("isUndefined :: checks if input is undefined or truthy", (input, expected) => {
    it(`returns ${expected} for input ${JSON.stringify(input)}`, () => {
      expect(isUndefined(input)).toEqual(expected);
    });
  });
});

describe("arrayHasNumber", () => {
  describe.each([
    [[1, "text", 3.14], true],
    [["abc", "def", "ghi"], false],
    ["not an array", false],
    [[], false],
    [[-1, -2, -3], true],
    [[true, "text", 42, null], true],
    [[0, "abc", "def"], true],
    [[123, 456, 789], true],
    [["123"], false],
    [["123", "456"], false],
    [["123", "abc"], false],
    [["abc", "123"], false],
  ])("arrayHasNumber :: checks if array contains at least one number", (input, expected) => {
    it(`returns ${expected} for input ${JSON.stringify(input)}`, () => {
      expect(arrayHasNumber(input)).toEqual(expected);
    });
  });
});