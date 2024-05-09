import { useClasses } from "./useClasses";

describe("useClasses", () => {
  it("Create multiple classes easily - strings", () => {
    const classes = useClasses("block");

    const input = classes("test", "test2");

    const output = ["block__test", "block__test2"];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - strings with modifier", () => {
    const classes = useClasses("block");

    const input = classes("test", "test2:modifier");

    const output = ["block__test", "block__test2--modifier"];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - strings with modifier no element", () => {
    const classes = useClasses("block");

    const input = classes("test", ":modifier");

    const output = ["block__test", "block--modifier"];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - arrays", () => {
    const classes = useClasses("block");

    const input = classes(
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
    const classes = useClasses("block");

    const input = classes(
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
  it("Create multiple classes easily - objects shorthanded", () => {
    const classes = useClasses("block");

    const input = classes(
      { e: "block" },
      { e: "block", m: "modifier" },
      { e: "block", m: "modifier1", s: true },
      { e: "block", m: "modifier2", s: false }
    );

    const output = [
      "block__block",
      "block__block--modifier",
      "block__block--modifier1",
    ];

    expect(input).toEqual(output);
  });
  it("Create classes with Object, change block", () => {
    const classes = useClasses("block");

    const input = classes(
      { block: "Another" },
      { block: "Another", element: "element" },
      { b: "Another2", e: "element" },
      { element: "element" }
    );

    const output = [
      "another",
      "another__element",
      "another2__element",
      "block__element",
    ];

    expect(input).toEqual(output);
  });
  it("Create multiple classes easily - mixed", () => {
    const classes = useClasses("block");

    const input = classes(
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
    const classes = useClasses("block", { return: "string" });

    const input = classes(
      ["element Yeah"],
      ["Element2", "modifier2"],
      "test",
      { element: "block" },
      { element: "block", modifier: "modifier" }
    );

    const output =
      "block__element-yeah block__element2--modifier2 block__test block__block block__block--modifier";

    expect(input).toEqual(output);
  });

  it("Create multiple classes easily - with inline conditionals", () => {
    const classes = useClasses("block");

    const input = classes(
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
      "block",
      "block__lorem",
      "block__dolor",
    ];

    expect(input).toEqual(output);
  });

  it("Create multiple classes easily - with conditionals in array", () => {
    const classes = useClasses("block");

    const input = classes(
      ["element1", "modifier1", false],
      ["element2", "modifier2", true]
    );

    const output = "block__element2--modifier2";

    expect(input).toEqual(output);
  });

  it("Get the block class - when empty", () => {
    const classes = useClasses("block");

    const input = classes();

    const output = "block";

    expect(input).toEqual(output);
  });

  it("Get the block class - when first is null", () => {
    const classes = useClasses("block");

    const input = classes(null, "test");

    const output = ["block","block__test"];

    expect(input).toEqual(output);
  });
  it("Get the block class - when first is empty string", () => {
    const classes = useClasses("block");

    const input = classes("", "test");

    const output = ["block", "block__test"];

    expect(input).toEqual(output);
  });
  it("Get the block class - when first is empty array", () => {
    const classes = useClasses("block");

    const input = classes([""], "test");

    const output = ["block", "block__test"];

    expect(input).toEqual(output);
  });
  it("Get the block class - when first is empty array", () => {
    const classes = useClasses("block");

    const input = classes([], "test");

    const output = ["block", "block__test"];

    expect(input).toEqual(output);
  });

  it("Get the classes, with multiple block classes", () => {
    const classes = useClasses(["block", "block1"]);

    const input = classes([], "test");

    const output = ["block", "block__test", 'block1', 'block1__test'];

    expect(input).toEqual(output);
  });
});
