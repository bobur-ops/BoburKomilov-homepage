"use client";

import { useEffect, useState } from "react";

export default function PixelCat() {
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [position, setPosition] = useState(0);
  const speed = 50;
  const frameWidth = 96;

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    const step = (time: number) => {
      const delta = (time - last) / 1000;
      last = time;

      setPosition((prev) => {
        const next =
          direction === "right" ? prev + speed * delta : prev - speed * delta;
        const maxX = window.innerWidth - frameWidth;

        if (next > maxX) setDirection("left");
        else if (next < 0) setDirection("right");

        return next;
      });

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [direction]);

  return (
    <div
      className="fixed bottom-8 w-[96px] h-[64px] bg-no-repeat pointer-events-none z-50 animate-walk"
      style={{
        left: `${position}px`,
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        backgroundImage: "url('/cat/WALK.png')",
        backgroundSize: "960px 64px",
      }}
    />
  );
}
