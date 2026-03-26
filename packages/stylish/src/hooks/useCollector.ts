import React from "react";
import { CollectorContext } from "../provider";

export default function useCollector() {
  const collector = React.useContext(CollectorContext);
  if (!collector) {
    throw new Error(
      "useCollector must be used within a CollectorProvider. Please ensure that your component is wrapped with a CollectorProvider.",
    );
  }
  return collector;
}
