"use client";

import { useEffect, useRef, useState } from "react";

const SPEED = 40;

export default function PixelCat() {
  const [x, setX] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isIdle, setIsIdle] = useState(false);
  const isIdleRef = useRef(false);
  const lastIdleTime = useRef(Date.now());

  useEffect(() => {
    isIdleRef.current = isIdle;
  }, [isIdle]);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    let idleTimeout: NodeJS.Timeout | null = null;

    const maybeIdle = () => {
      const now = Date.now();
      const timeSinceLastIdle = now - lastIdleTime.current;

      if (timeSinceLastIdle > 6000 && Math.random() < 0.005) {
        setIsIdle(true);
        lastIdleTime.current = now;

        idleTimeout = setTimeout(() => {
          setIsIdle(false);
        }, 3000);
      }
    };

    const walk = (time: number) => {
      const delta = time - last;
      last = time;

      if (!isIdleRef.current) {
        setX((prev) => {
          const step = (delta / 1000) * SPEED;

          let next = direction === "right" ? prev + step : prev - step;

          if (next > window.innerWidth - 80) {
            setDirection("left");
            next = window.innerWidth - 80;
          } else if (next < 0) {
            setDirection("right");
            next = 0;
          }

          return next;
        });

        maybeIdle();
      }

      raf = requestAnimationFrame(walk);
    };

    raf = requestAnimationFrame(walk);

    return () => {
      cancelAnimationFrame(raf);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, [direction]);

  const sprite = isIdle ? "/cat/IDLE.png" : "/cat/WALK.png";
  const animation = isIdle
    ? "idle 1.2s steps(8) infinite"
    : "walk 1.5s steps(12) infinite";

  return (
    <div
      className="fixed left-0 top-16 z-50"
      style={{
        transform: `translateX(${x}px) scaleX(${
          direction === "right" ? -1 : 1
        }) scale(1.5)`,
        transformOrigin: "center",
        width: "80px",
        height: "64px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: isIdle ? "640px" : "960px",
          height: "64px",
          backgroundImage: `url('${sprite}')`,
          backgroundRepeat: "no-repeat",
          animation,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
