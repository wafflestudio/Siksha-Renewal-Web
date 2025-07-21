import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function UseCurrentTheme() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // hydration 이슈 방지
  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const defaultProfileURL = () => {
    if (!mounted) return "/img/default-profile.svg";
    return currentTheme === "dark" ? "/img/default-profile-dark.svg" : "/img/default-profile.svg";
  };

  return {
    currentTheme: mounted ? currentTheme : "light",
    defaultProfileURL: defaultProfileURL(),
  };
}
