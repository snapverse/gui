import { createElement as createReactElement } from "react";
import {
  appendStyleSheet,
  StylishElement,
  type ElementProps,
  type ElementTagNames,
  type StyleProps,
} from ".";
import CSS from "./utils/css";

const styleKeys = new Set<keyof StyleProps>(["display", "color"]);

const classCache = new Map<string, string>();

export const createElement = <
  T extends ElementTagNames,
  P extends ElementProps,
>(
  tagName: T,
  _props: P,
): StylishElement => {
  const { children, ...restProps } = _props || {};

  const props = Object.create({}) as Record<string, unknown>;

  for (const [attr, value] of Object.entries(restProps)) {
    const cacheKey = `${attr}:${value}`;

    if (classCache.has(cacheKey)) {
      const cssClass = classCache.get(cacheKey)!;
      props.className = props.className ? props.className : "";
      props.className += ` ${cssClass}`.trim();
    } else if (styleKeys.has(attr as keyof StyleProps)) {
      const className = CSS.className(12);
      const css = `.${className} {
  ${attr}: ${value}
}`;
      props.className = props.className ? props.className : "";
      props.className += ` ${className}`.trim();
      appendStyleSheet(css);
    } else {
      props[attr] = value;
    }
  }

  return createReactElement(
    tagName,
    props,
    children,
  ) as unknown as StylishElement;
};
