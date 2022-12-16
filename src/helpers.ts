export const toKebabCase = (str: string = ""): string => {
  if (!str) return "";
  const matches = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  );
  return matches ? matches.map((x) => x.toLowerCase()).join("-") : "";
};


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

export const isNumber = (input: any): boolean => {
  return !isNaN(input) && Number.isInteger(input);
};

export const arrayHasNumber = (input: any): boolean => {
  if (!Array.isArray(input)) return false;

  input.forEach((v) => {
    if (typeof v == "number") return true;
  });

  return false;
};