"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    // ts: Property 'clearTag' does not exist on type 'ServerStyleSheet'
    // @ts-ignore
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  const StyleSheetManagerFixed = StyleSheetManager as unknown as React.ComponentType<{
    sheet: any;
    children: React.ReactNode;
  }>;

  return (
    <StyleSheetManagerFixed sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManagerFixed>
  );
}
