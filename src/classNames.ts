import { isArray, isStringArray, cleanArray } from "./helpers";

  

  type keyObject = { [key: string]: any };
  type classesInput = string | string[] | keyObject;
  
  
  export const isValidObject = (input: any) => {
    if (isArray(input)) return false;
  
    const keys = Object.values(input);
    const values = Object.keys(input);
  
    // Check if the keys is the same amount as the values
    if (keys.length !== values.length) {
      return false;
    }
    // Check if all keys are strings;
    keys.forEach((key) => {
      if (typeof key !== "string") return false;
    });
  
    return true;
  };
  
  const isString = (input: any): boolean => {
    return typeof input == "string";
  };
  
  const isNumber = (input: any): boolean => {
    return !isNaN(input) && Number.isInteger(input);
  };
  const arrayHasNumber = (input: any): boolean => {
    if (!Array.isArray(input)) return false;
  
    input.forEach((v) => {
      if (typeof v == "number") return true;
    });
  
    return false;
  };
  
  export const isMixedInput = (input: any): boolean => {
    if (!Array.isArray(input)) return false;
    if (isStringArray(input)) return false;
    if (arrayHasNumber(input)) return false;
    let ret = true;
    input.forEach((v) => {
      if (
        typeof v == "number" ||
        !(isString(v) || isStringArray(v) || isValidObject(v) || isNumber(v))
      ) {
        ret = false;
      }
    });
    return ret;
  };
  

  
  const getObjectClasses = (input: any): string[] => {
    let classArray: string[] = [];
    const keys = Object.keys(input);
    keys.forEach((key: string) => {
      if ((input as keyObject)[key]) {
        classArray.push(key);
      }
    });
    return classArray;
  };
  
  const generateClasses = (input: classesInput): string[] => {
    let classArray: string[] = [];
  
    if (typeof input == "string") {
      classArray = [input];
    } else if (isStringArray(input)) {
      classArray = input as string[];
    } else if (isValidObject(input)) {
      classArray = getObjectClasses(input);
    } else if (isArray(input)) {
      classArray = cleanArray(input as any[]);
    }
    return classArray;
  };
  
  export const classNames = (input: classesInput): string => {
    let classArray: string[] = [];
  
    if (isMixedInput(input) || isArray(input)) {
      (input as any[]).forEach((v: any) => {
        const vClasses = generateClasses(v);
        vClasses.forEach((c) => {
          classArray.push(c);
        });
      });
    } else {
      classArray = generateClasses(input);
    }
    return cleanArray(classArray).join(" ");
  };
  