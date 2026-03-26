import { ComponentPropsWithoutRef } from "react";
import { createElement } from "./elementary";
import type { ElementProps, ElementTagNames, StyleProps } from "./index.d";

const cache = new Map<string, unknown>();

type StylishFactory = {
  [K in ElementTagNames]: (
    props: ComponentPropsWithoutRef<K> & Partial<StyleProps>,
  ) => ReturnType<typeof createElement>;
};

export const stylish = new Proxy({} as StylishFactory, {
  get(_target, tagName: ElementTagNames) {
    if (!cache.has(tagName)) {
      const element = (props: ElementProps) => createElement(tagName, props);
      cache.set(tagName, element);
    }
    return cache.get(tagName)!;
  },
});
