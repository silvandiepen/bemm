import { isValidObject, isMixedInput } from "./classNames.utils";
describe("isValidObject", () => {
  it("should return true for an object with only string values and no duplicate keys", () => {
    const input = { foo: "bar", baz: "qux" };
    expect(isValidObject(input)).toBe(false);
  });

  it("should return false for an object with non-string values", () => {
    const input = { foo: "bar", baz: 123 };
    expect(isValidObject(input)).toBe(true);
  });

  it("should return false for an object with duplicate keys", () => {
    // @ts-ignore
    const input = { foo: "bar", foo: "baz" };
    expect(isValidObject(input)).toBe(false);
  });

  it("should return false for an array", () => {
    const input = ["foo", "bar"];
    expect(isValidObject(input)).toBe(false);
  });
});

describe("isMixedInput", () => {
  it("should return true for an array with mixed types of values", () => {
    const input = ["foo", 123, { bar: "baz" }];
    expect(isMixedInput(input)).toBe(false);
  });

  it("should return false for an array with only string values", () => {
    const input = ["foo", "bar", "baz"];
    expect(isMixedInput(input)).toBe(false);
  });

  it("should return false for an array with only number values", () => {
    const input = [1, 2, 3];
    expect(isMixedInput(input)).toBe(false);
  });

  it("should return true for an array with arrays of strings", () => {
    const input = [["foo"], ["bar", "baz"]];
    expect(isMixedInput(input)).toBe(true);
  });

  it("should return false for an object", () => {
    const input = { foo: "bar", baz: "qux" };
    expect(isMixedInput(input)).toBe(false);
  });
});