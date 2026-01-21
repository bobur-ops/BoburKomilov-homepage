import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { getCurrentTheme, getThemeParts, onThemeChange, toggleMode } from "./theme";

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateFromTheme = (theme?: string) => {
      const nextTheme = theme ?? getCurrentTheme();
      setIsDarkMode(getThemeParts(nextTheme).mode === "dark");
    };

    updateFromTheme();
    return onThemeChange(updateFromTheme);
  }, []);

  return (
    <button
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer outline-none"
      onClick={toggleMode}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="text-foreground hover:text-accent-foreground transition-colors"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.div>
    </button>
  );
}
