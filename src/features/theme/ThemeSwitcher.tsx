"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

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
    let baseTheme = "claude-light";

    if (isDark) {
      baseTheme = theme?.replace("dark", "light") || "claude-light";
    } else {
      baseTheme = theme?.replace("light", "dark") || "claude-dark";
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
