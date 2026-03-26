import crypto from "node:crypto";

const CSS = {
  /**
   * Generates a random CSS-compatible class name.
   *
   * The resulting class name is always prefixed with `"css_"`,
   * regardless of the provided size or any external naming strategy.
   *
   * Since CSS class names must start with a letter or underscore,
   * this function guarantees that the first character after the prefix
   * is always an alphabetic character (`a-z`, case-insensitive).
   * The remaining characters are randomly generated alphanumeric values.
   *
   * @param size - The length of the generated identifier *excluding* the `"css_"` prefix.
   * Defaults to `10`.
   *
   * @returns A CSS-compatible class name string in the form:
   * `"css_" + <random-alphanumeric-sequence>`.
   *
   * @example
   * CSS.className();    // "css_gx3ab1c9f2"
   * CSS.className(5);   // "css_bk4f2"
   */
  className(size = 10): string {
    const randomString = crypto
      .randomBytes(Math.ceil((size - 1) / 2))
      .toString("hex")
      .slice(0, size - 1);

    return `css_${randomString}`;
  },

  toKebabCase(className: string): string {
    return className
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
      .toLowerCase();
  },
};

export default CSS;
