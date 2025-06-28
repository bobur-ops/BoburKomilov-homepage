"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const animations = {
  initial: { rotate: 90, opacity: 0.5 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: -90, opacity: 0.5 },
  transition: { duration: 0.2, ease: "linear" },
  className: "text-foreground hover:text-accent-foreground transition-colors",
} as const;

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {currentTheme === "dark" ? (
          <motion.span key="moon" {...animations}>
            <Moon className="!size-5.5" />
          </motion.span>
        ) : (
          <motion.span key="sun" {...animations}>
            <Sun className="!size-5.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
