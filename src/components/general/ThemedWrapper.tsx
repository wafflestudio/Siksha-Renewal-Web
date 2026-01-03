"use client";

import { ThemeProvider, DefaultTheme } from "styled-components";

export default function ThemedWrapper({
  theme,
  children,
}: {
  theme: DefaultTheme;
  children: React.ReactNode;
}) {
  const ThemeProviderFixed = ThemeProvider as unknown as React.ComponentType<{
    theme: any;
    children: React.ReactNode;
  }>;

  return <ThemeProviderFixed theme={theme}>{children}</ThemeProviderFixed>;
}
