import {
  Bemm,
  createBemm,
  createMultiBemm,
  bemm as BemmFunction,
} from "./bemm";

describe("Class Component", () => {
  it("Should respond with the default class", () => {
    const bem = new Bemm("block");
    expect(bem.m()).toEqual("block");
  });

  it("Should respond with the default class with element", () => {
    const bem = new Bemm("block");
    expect(bem.m("element")).toEqual("block__element");
  });

  it("Should respond with the default class with modifier", () => {
    const bem = new Bemm("block");
    expect(bem.m("element", "dark")).toEqual("block__element--dark");
  });

  it("Should respond with the default class with only modifier", () => {
    const bem = new Bemm("block");
    expect(bem.m("", "dark")).toEqual("block--dark");
  });

  it("Should return with multiple modifiers", () => {
    const bem = new Bemm("block");
    expect(bem.m("test", ["blue", "black"])).toEqual([
      "block__test--blue",
      "block__test--black",
    ]);
  });

  it("Should respond convert all cases right", () => {
    const bem = new Bemm("Block");
    expect(bem.m("Element", "Dark")).toEqual("block__element--dark");
  });
  it("Should not respond with converted cases", () => {
    const bem = new Bemm("Block", {
      toKebabCase: false,
    });
    expect(bem.m("Element", "Dark")).toEqual("Block__Element--Dark");
  });
});

describe("Style", () => {
  it("Should respond with the default class", () => {
    const bemm = createBemm("block");
    expect(bemm()).toEqual("block");
  });
  it("Should respond with the default class with element", () => {
    const bemm = createBemm("block");
    expect(bemm("element")).toEqual("block__element");
  });
  it("Should respond with the default class with modifier", () => {
    const bemm = createBemm("block");
    expect(bemm("element", "dark")).toEqual("block__element--dark");
  });

  it("Should respond with the default class no element (empty string) with modifier", () => {
    const bemm = createBemm("block");
    expect(bemm("", "dark")).toEqual("block--dark");
  });

  it("Should respond with the default class no element (undefined) with modifier", () => {
    const bemm = createBemm("block");
    const _ = undefined;
    expect(bemm(_, "dark")).toEqual("block--dark");
  });

  it("Should respond with the default class no element (null) with modifier", () => {
    const bemm = createBemm("block");
    const _ = undefined;
    expect(bemm(null, "dark")).toEqual("block--dark");
  });

  it("Should respond with the default class with only modifier", () => {
    const bemm = createBemm("block");
    expect(bemm("", "dark")).toEqual("block--dark");
  });
  it("Should return with multiple modifiers", () => {
    const bemm = createBemm("block");
    expect(bemm("test", ["blue", "black"])).toEqual([
      "block__test--blue",
      "block__test--black",
    ]);
  });
  it("Should return with multiple block", () => {
    const bemm = createBemm(["block1", "block2"]);
    expect(bemm()).toEqual(["block1", "block2"]);
  });
  it("Should return with multiple block with elements", () => {
    const bemm = createBemm(["block1", "block2"]);
    expect(bemm("test")).toEqual(["block1__test", "block2__test"]);
  });
  it("Should return with multiple with element and modifiers", () => {
    const bemm = createBemm(["block1", "block2"]);
    expect(bemm("test", ["blue", "black"])).toEqual([
      "block1__test--blue",
      "block1__test--black",
      "block2__test--blue",
      "block2__test--black",
    ]);
  });
  it("Should return with multiple with element and modifiers", () => {
    const bemm = createBemm(["block1", "block2"]);
    expect(bemm("test", ["blue", "black"], { returnString: true })).toBe(
      "block1__test--blue block1__test--black block2__test--blue block2__test--black"
    );
  });
});

describe("Output", () => {
  it("Should return a string with multiple modifiers", () => {
    expect(
      BemmFunction("block", "test", ["blue", "black"], { returnString: true })
    ).toBe("block__test--blue block__test--black");
  });
  it("Should return with multiple with element and modifiers", () => {
    expect(
      BemmFunction("block", "test", ["blue", "black"], { returnArray: true })
    ).toEqual(["block__test--blue", "block__test--black"]);
  });
});

describe("createMultiBemm", () => {
  it("Should return multiple Bemm scripts", () => {
    const bemm = createMultiBemm({ block: "block", test: "testing" });

    expect(bemm).toMatchObject({
      block: expect.any(Function),
      test: expect.any(Function),
    });
  });
  it("Should return a value created by a multibemm function", () => {
    const bemm = createMultiBemm({ block: "block", test: "testing" });

    expect(bemm.test("")).toBe("testing");
  });
  it("Should return a class created by multibemm value with element", () => {
    const bemm = createMultiBemm({ block: "block", test: "testing" });

    expect(bemm.test("test")).toBe("testing__test");
  });
});

describe("createBemm from Object", () => {
  it("Should return a valid bemm class", () => {
    const bemm = createBemm("block");
    const bemmClass = bemm({ element: "", modifier: "" });

    expect(bemmClass).toBe("block");

  });  it("Should return a valid bemm class - with element", () => {
    const bemm = createBemm("block");
    const bemmClass = bemm({ element: "test", modifier: "" });
    expect(bemmClass).toBe("block__test");
  });
  it("Should return a valid bemm class - with modifier", () => {
    const bemm = createBemm("block");
    const bemmClass = bemm({ element: "", modifier: "modified" });

    expect(bemmClass).toBe("block--modified");
  });
  it("Should return a valid bemm class - with element and modifier", () => {
    const bemm = createBemm("block");
    const bemmClass = bemm({ element: "test", modifier: "modified" });

    expect(bemmClass).toBe("block__test--modified");
  });
});
