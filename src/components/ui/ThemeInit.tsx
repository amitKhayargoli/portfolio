"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Reads the saved theme (or system preference) on first mount
 * and applies it to <html>. Runs once before paint via
 * suppressHydrationWarning + inline <script> in layout,
 * but as a fallback this component ensures consistency.
 */
export function ThemeInit() {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return null;
}
