import { useClasses } from "./useClasses";

describe("useClasses", () => {
  it("Create multiple classes easily - strings", () => {
    const cls = useClasses("block");

    const input = cls("test", "test2", "test3:modifier");

    const output = ["block__test", "block__test2", "block__test3--modifier"];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - arrays", () => {
    const cls = useClasses("block");

    const input = cls(
      ["element"],
      ["element", ""],
      ["element", [""]],
      ["element2", "modifier2"],
      ["element3", ["modifier3", ""]],
      ["element4", ["modifier-a", "modifier-b"]],
      ["element", ""]
    );

    const output = [
      "block__element",
      "block__element2--modifier2",
      "block__element3--modifier3",
      "block__element3",
      "block__element4--modifier-a",
      "block__element4--modifier-b",
    ];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - objects", () => {
    const cls = useClasses("block");

    const input = cls(
      { element: "block" },
      { element: "block", modifier: "modifier" },
      { element: "block", modifier: "modifier1", show: true },
      { element: "block", modifier: "modifier2", show: false }
    );

    const output = [
      "block__block",
      "block__block--modifier",
      "block__block--modifier1",
    ];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - mixed", () => {
    const cls = useClasses("block");

    const input = cls(
      ["element"],
      ["element2", "modifier2"],
      "test",
      { element: "block" },
      { element: "block", modifier: "modifier" }
    );

    const output = [
      "block__element",
      "block__element2--modifier2",
      "block__test",
      "block__block",
      "block__block--modifier",
    ];

    expect(input).toEqual(output);
  });
  
  it("Create multiple classes easily - mixed - string return", () => {
    const cls = useClasses("block", { return: "string"});

    const input = cls(
      ["element Yeah"],
      ["Element2", "modifier2"],
      "test",
      { element: "block" },
      { element: "block", modifier: "modifier" }
    );

    const output = "block__element-yeah block__element2--modifier2 block__test block__block block__block--modifier";

    expect(input).toEqual(output);
  });

  it("Create multiple classes easily - with inline conditionals", () => {
    const cls = useClasses("block");

    const input = cls(
      1 == 1 ? ["element"] : "",
      true == true ? "test" : null,
      false ? "test" : "",
      "lorem",
      false ? ["ipsum"] : "",
      1 == 1 ? { element: "dolor" } : null
    );

    const output = [
      "block__element",
      "block__test",
      "block__lorem",
      "block__dolor",
    ];

    expect(input).toEqual(output);
  });

  it("Create multiple classes easily - with conditionals in array", () => {
    const cls = useClasses("block");

    const input = cls(
      ["element1", "modifier1", false],
      ["element2", "modifier2", true]
    );

    const output = "block__element2--modifier2";

    expect(input).toEqual(output);
  });
});
