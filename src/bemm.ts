export class Bemm {
  block: string = "";

  constructor(block: string) {
    this.block = block;
  }
  c(element: string = "", modifier: string | string[] = ""): string | string[] {
    if (this.block == "") {
      return ``;
    }

    const className = `${this.block}${element ? `__${element}` : ``}`;

    if (typeof modifier == "string") {
      return `${className}${modifier ? `--${modifier}` : ``}`;
    } else {
      const classes: string[] = [];

      modifier.forEach((mod: string) => {
        classes.push(`${className}--${mod}`);
      });
      return classes;
    }
  }
}

export default Bemm;
