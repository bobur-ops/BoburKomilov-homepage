"use client";

import { Button } from "@/components/ui/button";
import { useThemePlayer } from "./useThemePlayer";
import { Pause, Play, SkipForward } from "lucide-react";
import { MUSICS } from "./consts";
import { useState, useEffect } from "react";

export default function ThemeMusic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hasEverBeenReady, setHasEverBeenReady] = useState(false);

  // Pick random track on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MUSICS.length);
    setCurrentIndex(randomIndex);
    setMounted(true);
  }, []);

  const currentTrack = MUSICS[currentIndex];
  const { isPlaying, isReady, toggle } = useThemePlayer(
    mounted ? currentTrack.src : undefined,
  );

  // Track if we've ever been ready to prevent unmounting
  useEffect(() => {
    if (isReady) {
      setHasEverBeenReady(true);
    }
  }, [isReady]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MUSICS.length);
  };

  if (!hasEverBeenReady || !mounted) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div className="bg-card/80 backdrop-blur-sm max-w-[220px] border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 overflow-hidden">
          <div className="text-xs font-mono mb-1 whitespace-nowrap">
            <div className="flex w-max animate-marquee delay-1000">
              <span className="mr-10">{currentTrack.title}</span>
              <span className="mr-10">{currentTrack.title}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 pb-3">
          <Button
            onClick={toggle}
            size="icon"
            variant={"secondary"}
            className="h-8 w-8"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          <Button
            onClick={handleNext}
            variant={"secondary"}
            size="icon"
            className="h-8 w-8"
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          {/* Visualizer bars */}
          <div className="flex items-center gap-0.5 ml-auto">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-0.5 bg-foreground/40 transition-all ${
                  isPlaying ? "animate-pulse" : ""
                }`}
                style={{
                  height: isPlaying ? `${8 + Math.random() * 8}px` : "4px",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
