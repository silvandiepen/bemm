import { classes, filterDirt, isMixedInput, isStringArray } from "./classes";
import { createBemm } from "bemm";
const bemm = createBemm("block");

describe("filterDirt", () => {
  it("A single string", () => {
    const input = filterDirt(["block1", "block2"]);
    const output = ["block1", "block2"];

    expect(input).toEqual(output);
  });
  it("A Double string", () => {
    const input = filterDirt(["block1 block2", "block3"]);
    const output = ["block1", "block2", "block3"];

    expect(input).toEqual(output);
  });
  it("A undefined string", () => {
    const input = filterDirt(["block1 block2", undefined, false, "block3"]);
    const output = ["block1", "block2", "block3"];

    expect(input).toEqual(output);
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

describe("isMixedInput", () => {
  it("Wrong values - a string", () => {
    expect(isMixedInput("something")).toEqual(false);
  });
  it("Wrong values - a number", () => {
    expect(isMixedInput(1)).toEqual(false);
  });
  it("Wrong values - a array with unaccepted chars", () => {
    expect(isMixedInput([1, 2])).toEqual(false);
  });
  it("Wrong values - not mixed", () => {
    expect(isMixedInput(["test", "test"])).toEqual(false);
  });
  it("Right values - a array with mixed accepted values", () => {
    expect(isMixedInput(["test1", { test2: true }])).toEqual(true);
  });
});

describe("Classes from base string", () => {
  it("A single string", () => {
    const input = classes("string");
    const output = "string";

    expect(input).toEqual(output);
  });
  it("A single string", () => {
    const input = classes("string");
    const output = "string";

    expect(input).toEqual(output);
  });
  it("Multiple strings - bemm", () => {
    const input = classes(bemm("el"));
    const output = "block__el";

    expect(input).toEqual(output);
  });
  it("Multiple strings - bemm", () => {
    const input = classes(bemm("el", ["", "mod"], { return: "string" }));

    const output = "block__el block__el--mod";

    expect(input).toEqual(output);
  });
});

describe("Classes from Object", () => {
  it("A single string", () => {
    const input = classes({
      block1: false,
      block2: true,
    });
    const output = "block2";

    expect(input).toEqual(output);
  });
});

describe("Classes from Mixed", () => {
  it("A single string", () => {
    const input = classes([
      "test1",
      ["test2", "test3"],
      {
        block1: false,
        block2: true,
      },
    ]);
    const output = "test1 test2 test3 block2";

    expect(input).toEqual(output);
  });
  it("A single string", () => {
    const input = classes([
      "test1",
      ["test2", "test3", false, 4],
      {
        block1: false,
        block2: true,
        'block-3': 1 == 1
      },
    ]);
    const output = "test1 test2 test3 block2 block-3";

    expect(input).toEqual(output);
  });
});
