import { useBemm } from ".";


describe("useBemm from Object", () => {
  it("returns valid BEM class name with element and modifier", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "element", modifier: "modifier" });

    expect(bemmClass).toBe("block__element--modifier");
  });

  it("returns valid BEM class name with element and no modifier", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "element", modifier: "" });

    expect(bemmClass).toBe("block__element");
  });

  it("returns valid BEM class name with modifier and no element", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "", modifier: "modifier" });

    expect(bemmClass).toBe("block--modifier");
  });

  it("returns valid BEM class name with no element and no modifier", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({ element: "", modifier: "" });

    expect(bemmClass).toBe("block");
  });

  it("returns valid BEM class name with element, modifier, and true conditional", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({
      element: "element",
      modifier: "modifier",
      show: true,
    });

    expect(bemmClass).toBe("block__element--modifier");
  });

  it("returns empty string with element, modifier, and false conditional", () => {
    const bemm = useBemm("block");
    const bemmClass = bemm({
      element: "element",
      modifier: "modifier",
      show: false,
    });

    expect(bemmClass).toBe("");
  });

  describe("combined functions from useBemm", () => {
    it("returns valid BEM class names", () => {
      const { bemm, classes } = useBemm("block");
      const bemmClass = bemm({ element: "element", modifier: "modifier" });
      const bemmClasses = classes({ e: "test", m: "something" }, "test");

      expect(bemmClass).toBe("block__element--modifier");
      expect(bemmClasses).toEqual(["block__test--something", "block__test"]);
    });
  });
});