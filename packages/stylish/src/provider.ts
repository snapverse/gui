import React from "react";

export type StyleCollector = {
  add(css: string): void;
  css: string;
};

export const createCollector = () => {
  const styles: Array<string> = [];
  return {
    css: styles,
    add(css: string) {
      return styles.push(css);
    },
  };
};

export const CollectorContext = React.createContext<StyleCollector | null>(
  null,
);
