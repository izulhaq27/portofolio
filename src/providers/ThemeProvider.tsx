"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme?: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => null,
  resolvedTheme: "dark",
});

export function ThemeProvider({ children, defaultTheme = "dark" }: { children: React.ReactNode, defaultTheme?: Theme, attribute?: string, enableSystem?: boolean, disableTransitionOnChange?: boolean }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<string>(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setThemeState(stored);
      setResolvedTheme(stored === "system" ? getSystemTheme() : stored);
    } else {
      setThemeState(defaultTheme);
      setResolvedTheme(defaultTheme === "system" ? getSystemTheme() : defaultTheme);
    }
  }, [defaultTheme]);

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    
    const actualTheme = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(actualTheme);
    
    if (actualTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
