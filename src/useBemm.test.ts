import { useBemm, useBemms, generateBemm } from "./useBemm";

describe("Style", () => {
  it("Should respond with the default class", () => {
    const bemm = useBemm("block");
    expect(bemm()).toEqual("block");
  });
  it("Should respond with the default class with element", () => {
    const bemm = useBemm("block");
    expect(bemm("element")).toEqual("block__element");
  });
  it("Should respond with the default class with modifier", () => {
    const bemm = useBemm("block");
    expect(bemm("element", "dark")).toEqual("block__element--dark");
  });

  it("Should respond with the default class no element (empty string) with modifier", () => {
    const bemm = useBemm("block");
    expect(bemm("", "dark")).toEqual("block--dark");
  });

  it("Should respond with the default class no element (undefined) with modifier", () => {
    const bemm = useBemm("block");
    const _ = undefined;
    expect(bemm(_, "dark")).toEqual("block--dark");
  });

  it("Should respond with the default class no element (null) with modifier", () => {
    const bemm = useBemm("block");
    expect(bemm(null, "dark")).toEqual("block--dark");
  });

  it("Should respond with the default class with only modifier", () => {
    const bemm = useBemm("block");
    expect(bemm("", "dark")).toEqual("block--dark");
  });
  it("Should return with multiple modifiers", () => {
    const bemm = useBemm("block");
    expect(bemm("test", ["blue", "black"])).toEqual([
      "block__test--blue",
      "block__test--black",
    ]);
  });
  it("Should return with multiple block", () => {
    const bemm = useBemm(["block1", "block2"]);
    expect(bemm()).toEqual(["block1", "block2"]);
  });
  it("Should return with multiple block with elements", () => {
    const bemm = useBemm(["block1", "block2"]);
    expect(bemm("test")).toEqual(["block1__test", "block2__test"]);
  });
  it("Should return with multiple with element and modifiers", () => {
    const bemm = useBemm(["block1", "block2"]);
    expect(bemm("test", ["blue", "black"])).toEqual([
      "block1__test--blue",
      "block1__test--black",
      "block2__test--blue",
      "block2__test--black",
    ]);
  });
  it("Should return with multiple with element and modifiers", () => {
    const bemm = useBemm(["block1", "block2"]);
    expect(bemm("test", ["blue", "black"], { return: "string" })).toBe(
      "block1__test--blue block1__test--black block2__test--blue block2__test--black"
    );
  });
});

describe("Output", () => {
  it("Should return a string with multiple modifiers", () => {
    expect(
      generateBemm("block", "test", ["blue", "black"], { return: "string" })
    ).toBe("block__test--blue block__test--black");
  });
  it("Should return with multiple with element and modifiers", () => {
    expect(
      generateBemm("block", "test", ["blue", "black"], { return: "array" })
    ).toEqual(["block__test--blue", "block__test--black"]);
  });
  it("should return a string of multiple outputs as string", () => {
    const bemm = useBemm("block", { return: "string" });
    expect(bemm("test", ["something", "black"])).toBe(
      "block__test--something block__test--black"
    );
  });
  it("should return a string of multiple outputs as string", () => {
    const bemm = useBemm("block", { return: "string" });
    expect(bemm("test", ["", "black"])).toBe("block__test block__test--black");
  });
});

describe("createMultiBemm", () => {
  it("Should return multiple Bemm scripts", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm).toMatchObject({
      block: expect.any(Function),
      test: expect.any(Function),
    });
  });
  it("Should return a value created by a multibemm function", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("")).toBe("testing");
  });
  it("Should return a class created by multibemm value with element", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("test")).toBe("testing__test");
  });
});

describe("useBemm from Object", () => {
  it("Should return a valid bemm class", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "", modifier: "" });

    expect(bemmClass).toBe("block");
  });
  it("Should return a valid bemm class - with element", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "test", modifier: "" });
    expect(bemmClass).toBe("block__test");
  });
  it("Should return a valid bemm class - with modifier", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "", modifier: "modified" });

    expect(bemmClass).toBe("block--modified");
  });
  it("Should return a valid bemm class - with element and modifier", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "test", modifier: "modified" });

    expect(bemmClass).toBe("block__test--modified");
  });
  it("Should return a valid bemm class - with element and modifier + conditional", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({
      element: "test",
      modifier: "modified",
      show: true,
    });

    expect(bemmClass).toBe("block__test--modified");
  });
  it("Should not return a valid bemm class - with element and modifier + conditional", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({
      element: "test",
      modifier: "modified",
      show: false,
    });

    expect(bemmClass).toBe("");
  });

  describe("Combined functions from useBemm", () => {
    it("Should return a valid bemm class", () => {
      const { bemm, classes } = useBemm("block");
      const bemmClass = bemm({ element: "", modifier: "" });
      const bemmClasses = classes({ e: "", m: "test" }, "test");

      expect(bemmClass).toBe("block");
      expect(bemmClasses).toEqual(["block--test", "block__test"]);
    });
  });
});
