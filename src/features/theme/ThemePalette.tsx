"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { FALLBACK_DEFAULT_THEME, themeOptions } from "./consts";
import {
  getCurrentTheme,
  getThemeParts,
  onThemeChange,
  setPalette,
} from "./theme";

export default function ThemePalette() {
  const [activePalette, setActivePalette] = useState(
    getThemeParts(FALLBACK_DEFAULT_THEME).palette
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updatePalette = (theme?: string) => {
      const nextTheme = theme ?? getCurrentTheme();
      setActivePalette(getThemeParts(nextTheme).palette);
    };

    updatePalette();
    return onThemeChange(updatePalette);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer">
        <div className="cursor-pointer transition-all hover:-rotate-90 w-8 h-8 flex items-center justify-center outline-none text-foreground hover:text-accent-foreground">
          <Palette />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {themeOptions.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setPalette(theme.value)}
            className={cn({
              "bg-accent text-accent-foreground": activePalette === theme.value,
            })}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {theme.colors["dark"].map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              <div className="font-medium">{theme.name}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
