"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="text-foreground hover:text-accent-foreground transition-colors"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.div>
    </button>
  );
}
