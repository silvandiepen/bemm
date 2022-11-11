import {
  classNames as c,
  isMixedInput,
} from "./classNames";

import { useBemm } from "./useBemm";

const bemm = useBemm("block");



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
    const input = c("string");
    const output = "string";

    expect(input).toEqual(output);
  });
  it("A single string", () => {
    const input = c("string");
    const output = "string";

    expect(input).toEqual(output);
  });
  it("Multiple strings - bemm", () => {
    const input = c(bemm("el"));
    const output = "block__el";

    expect(input).toEqual(output);
  });
  it("Multiple strings - bemm", () => {
    const input = c(bemm("el", ["", "mod"], { return: "string" }));

    const output = "block__el block__el--mod";

    expect(input).toEqual(output);
  });
});

describe("Classes from Object", () => {
  it("A single string", () => {
    const input = c({
      block1: false,
      block2: true,
    });
    const output = "block2";

    expect(input).toEqual(output);
  });
});

describe("Classes from Mixed", () => {
  it("A single string", () => {
    const input = c([
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
    const input = c([
      "test1",
      ["test2", "test3", false, 4],
      {
        block1: false,
        block2: true,
        "block-3": 1 == 1,
      },
    ]);
    const output = "test1 test2 test3 block2 block-3";

    expect(input).toEqual(output);
  });
});
