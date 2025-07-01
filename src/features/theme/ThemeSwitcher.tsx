"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { FALLBACK_DEFAULT_THEME } from "./consts";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const isDark = resolvedTheme?.includes("dark");
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [resolvedTheme]);

  if (!mounted) return null;

  const toggleTheme = () => {
    const isDark = resolvedTheme?.includes("dark");
    let baseTheme = FALLBACK_DEFAULT_THEME;

    if (isDark) {
      baseTheme = theme?.replace("dark", "light") || "vintage-paper-light";
    } else {
      baseTheme = theme?.replace("light", "dark") || "vintage-paper-dark";
    }
    setTheme(baseTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer outline-none"
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme?.includes("dark") ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="text-foreground hover:text-accent-foreground transition-colors"
      >
        {resolvedTheme?.includes("dark") ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.div>
    </button>
  );
}
