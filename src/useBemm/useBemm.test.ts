import { useBemm, useBemms, generateBemm } from "./useBemm";

describe("useBemm", () => {
  describe("with single block", () => {
    it("returns default class name", () => {
      const bemm = useBemm("block");
      expect(bemm()).toEqual("block");
    });

    it("returns class name with element", () => {
      const bemm = useBemm("block");
      expect(bemm("element")).toEqual("block__element");
    });

    it("returns class name with modifier", () => {
      const bemm = useBemm("block");
      expect(bemm("", "dark")).toEqual("block--dark");
    });

    it("returns class name with element and modifier", () => {
      const bemm = useBemm("block");
      expect(bemm("element", "dark")).toEqual("block__element--dark");
    });

    it("returns class name with multiple modifiers", () => {
      const bemm = useBemm("block");
      expect(bemm("element", ["blue", "black"])).toEqual([
        "block__element--blue",
        "block__element--black",
      ]);
    });
  });

  describe("with multiple blocks", () => {
    it("returns default class names", () => {
      const bemm = useBemm(["block1", "block2"]);
      expect(bemm()).toEqual(["block1", "block2"]);
    });

    it("returns class names with element", () => {
      const bemm = useBemm(["block1", "block2"]);
      expect(bemm("element")).toEqual(["block1__element", "block2__element"]);
    });

    it("returns class names with modifier", () => {
      const bemm = useBemm(["block1", "block2"]);
      expect(bemm("", "dark")).toEqual(["block1--dark", "block2--dark"]);
    });

    it("returns class names with element and modifier", () => {
      const bemm = useBemm(["block1", "block2"]);
      expect(bemm("element", "dark")).toEqual([
        "block1__element--dark",
        "block2__element--dark",
      ]);
    });

    it("returns class names with multiple modifiers", () => {
      const bemm = useBemm(["block1", "block2"]);
      expect(bemm("element", ["blue", "black"])).toEqual([
        "block1__element--blue",
        "block1__element--black",
        "block2__element--blue",
        "block2__element--black",
      ]);
    });
  });

  describe("with settings", () => {
    it("returns class names with custom prefix and no kebab case", () => {
      const bemm = useBemm("Block", {
        return: "array",
        toKebabCase: false,
        prefix: {
          element: "_",
          modifier: "-",
        },
      });
      expect(bemm("element", "modifier")).toEqual(["Block_element-modifier"]);
    });
  });
});

describe("generateBemm", () => {
  it("returns class name as string with multiple modifiers", () => {
    expect(
      generateBemm("block", "element", ["blue", "black"], { return: "string" })
    ).toBe("block__element--blue block__element--black");
  });

  it("returns class names as array with multiple modifiers", () => {
    expect(
      generateBemm("block", "element", ["blue", "black"], { return: "array" })
    ).toEqual(["block__element--blue", "block__element--black"]);
  });
});

describe("useBemms", () => {
  it("returns multiple Bemm functions", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm).toMatchObject({
      block: expect.any(Function),
      test: expect.any(Function),
    });
  });

  it("returns value created by a Bemm function", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("")).toBe("testing");
  });

  it("returns class name created by Bemm function with element", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("element")).toBe("testing__element");
  });

  it("returns class name created by Bemm function with modifier", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("", "dark")).toBe("testing--dark");
  });

  it("returns class name created by Bemm function with element and modifier", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("element", "dark")).toBe("testing__element--dark");
  });

  it("returns class names created by Bemm function with multiple modifiers", () => {
    const bemm = useBemms({ block: "block", test: "testing" });

    expect(bemm.test("element", ["blue", "black"])).toEqual([
      "testing__element--blue",
      "testing__element--black",
    ]);
  });
});


describe("useBemm with Modifier Object", () => {
  it("returns valid BEM class name with element and modifier", () => {
    const bemm = useBemm("block");

    expect(bemm("element", "modifier")).toBe("block__element--modifier");
  });

  it("returns valid BEM class name with element and modifier where modifier is an object - true", () => {
    const bemm = useBemm("block");
    expect(
      bemm("element", {
        modifier: true,
      })
    ).toBe("block__element--modifier");
  });

  it("returns valid BEM class name with element and modifier where modifier is an object - false", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm("element", {
      modifier: false,
    });


    expect(bemmClass).toBe("block__element");
  });


  it("returns a valid group of classes with the base class, when the setting is set to includeBaseClass is true",()=>{
    const bemm = useBemm('block',{
      includeBaseClass:true
    });
    const bemmClass = bemm('element','test');

    expect(bemmClass).toEqual(['block__element', 'block__element--test']);

  })

  it("returns valid BEM class name with element and modifier where modifier is an object - with multiple", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm("element", {
      modifier: false,
      test: true,
      another: true,
    });

    expect(bemmClass).toEqual(["block__element", "block__element--test", "block__element--another"]);
  });

  it("returns valid BEM class name with element and modifier where modifier is an object - change casing", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm("element", {
      active: false,
      inActive: true,
    });

    expect(bemmClass).toEqual(["block__element", "block__element--in-active"]);
  });


  it("returns valid BEM class name with element and modifier where modifier is an object - Or", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm("element", {
      'apple|banana': false,
      'kiwi|strawberry': true,
    });

    expect(bemmClass).toEqual(["block__element--banana", "block__element--kiwi"]);
  });

  it("returns valid BEM class name with element and modifier where modifier is an object - Or", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm("element", {
      'apple|banana': 0,
      'kiwi|strawberry': 1,
      'kiwi|strawberry|pinia': 2,
    });

    expect(bemmClass).toEqual(["block__element--apple", "block__element--strawberry", "block__element--pinia"]);
  });
});

describe("useBemm with multiple elements",()=>{
  it("returns valid BEM class name with multiple elements", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm(["element", "element2"], "modifier");

    expect(bemmClass).toEqual(["block__element--modifier", "block__element2--modifier"]);
  });
  it('returns valid BEM class name with multiple elements and multiple modifiers',()=>{
    const bemm = useBemm("block");
    const bemmClass = bemm(["element", "element2"], ["modifier", "modifier2"]);

    expect(bemmClass).toEqual(["block__element--modifier", "block__element--modifier2", "block__element2--modifier", "block__element2--modifier2"]);
  });
});
