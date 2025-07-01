"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { themeOptions } from "./consts";

export default function ThemePalette() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleChangeTheme = (newBaseTheme: string) => {
    const currentMode = resolvedTheme?.includes("dark") ? "dark" : "light";
    const newTheme = `${newBaseTheme}-${currentMode}`;

    setTheme(newTheme);
  };

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
            onClick={() => handleChangeTheme(theme.value)}
            className={cn({
              "bg-accent text-accent-foreground": resolvedTheme?.includes(
                theme.value
              ),
            })}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {theme.colors[
                  resolvedTheme?.includes("dark") ? "dark" : "light"
                ].map((color, index) => (
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
