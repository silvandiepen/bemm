export const toKebabCase = (str: string): string =>
  str !== ""
    ? str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase()
    : "";
