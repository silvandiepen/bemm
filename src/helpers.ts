export const toKebabCase = (str: string): string =>
  str !== ""
    ? str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase()
    : "";

export const isArray = (input: any) => {
  return typeof input == "object" && Array.isArray(input);
};
export const isStringArray = (input: any): boolean => {
  if (!isArray(input)) return false;
  else {
    let ret = true;
    input.forEach((v: any) => {
      if (typeof v !== "string") ret = false;
    });
    return ret;
  }
};
export const isString = (input: any): boolean => {
  return typeof input == "string";
};

export const cleanArray = (classArray: any[]): string[] => {
  return [
    ...new Set(
      classArray
        .map((v: string) => {
          if (v && typeof v == "string" && v.includes(" ")) {
            return cleanArray(v.split(" "));
          }
          let cleanedValue = v && typeof v == "string" ? v.trim() : null;
          return cleanedValue || "";
        })
        .flat()
        .filter((v) => v !== "")
    ),
  ];
};

export const undefinedIsTrue = (value: any): boolean => {
  if (value == undefined) return true;
  if (value !== undefined) return !!value;
  return false;
};
