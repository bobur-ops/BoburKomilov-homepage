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

const themeOptions = [
  { name: "Claude", value: "claude" },
  { name: "Catpuccin", value: "catpuccin" },
  { name: "Amber", value: "amber-minimal" },
  { name: "Bubblegum", value: "bubblegum" },
  { name: "Caffeine", value: "caffeine" },
  { name: "Cosmic Night", value: "cosmic-night" },
  { name: "Cyberpunk", value: "cyberpunk" },
  { name: "Doom", value: "doom" },
  { name: "Elegant Luxury", value: "elegant-luxury" },
  { name: "Graphite", value: "graphite" },
  { name: "Kodama Grove", value: "kodama-grove" },
  { name: "Mono", value: "mono" },
  { name: "Nature", value: "nature" },
  { name: "Clean Slate", value: "clean-slate" },
  { name: "Tangerine", value: "tangerine" },
  { name: "Vintage Paper", value: "vintage-paper" },
];

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
              "bg-primary text-primary-foreground": resolvedTheme?.includes(
                theme.value
              ),
            })}
          >
            <div>{theme.name}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
