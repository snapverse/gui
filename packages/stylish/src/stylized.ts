import { StyleCollector } from "./provider";

export const appendStyleSheet = (
  css: string,
  collector?: StyleCollector,
): void => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  } else {
    collector?.add(css);
  }
};
