import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function UseCurrentTheme() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // hydration 이슈 방지
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return currentTheme;
}
