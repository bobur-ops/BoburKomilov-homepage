"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { messages, Scene, sprites } from "./consts";
import { randomChance } from "@/utils/randomChance";

const WALK_SPEED = 25;
const RUN_SPEED = 75;
const IDLE_TIME = 3000;

export default function PixelCat() {
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [target, setTarget] = useState({
    x: 150.90771343948535,
    y: 309.99170040941084,
  });

  const [direction, setDirection] = useState<"left" | "right">("right");
  const [scene, setScene] = useState<Scene>("walk");
  const sceneRef = useRef<Scene>("walk");
  const catRef = useRef<HTMLDivElement | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  useEffect(() => {
    Object.values(sprites).forEach((sprite) => {
      const img = new Image();
      img.decoding = "async";
      img.src = sprite.url;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (randomChance(0.18)) {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowBubble(true);

        setTimeout(() => setShowBubble(false), 3000);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const playScene = (name: Scene, duration: number, then: () => void) => {
    const img = new Image();
    img.src = sprites[name].url;

    img.onload = () => {
      setScene(name);
      requestAnimationFrame(() => {
        void catRef.current?.offsetHeight;
      });

      setTimeout(then, duration);
    };
  };

  const pickNewTarget = useCallback(() => {
    const margin = 80;
    const spriteWidth = sprites.walk.width * 1.5;
    const spriteHeight = 64 * 1.5;

    const maxX = window.innerWidth - spriteWidth - margin;
    const maxY = window.innerHeight - spriteHeight - margin;

    const newX = Math.max(margin, Math.random() * maxX);

    setPosition((prev) => {
      const maxYOffset = 200;
      const minY = Math.max(margin, prev.y - maxYOffset);
      const maxYClamped = Math.min(maxY, prev.y + maxYOffset);
      const newY = Math.random() * (maxYClamped - minY) + minY;

      setTarget(() => ({ x: newX, y: newY }));
      setDirection(newX > prev.x ? "right" : "left");
      playScene("walk", 1200, () => {});

      return prev;
    });
  }, []);

  useEffect(() => {
    pickNewTarget();
  }, [pickNewTarget]);

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    const step = (time: number) => {
      const delta = time - last;
      last = time;

      if (sceneRef.current === "walk" || sceneRef.current === "run") {
        setPosition((prev) => {
          const dx = target.x - prev.x;
          const dy = target.y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (Math.abs(dx) > 1) {
            setDirection(dx > 0 ? "right" : "left");
          }

          if (dist < 2) {
            if (!idleTimeoutRef.current) {
              setPosition(target);
              playScene("idle", 1500, () => {});
              idleTimeoutRef.current = setTimeout(() => {
                idleTimeoutRef.current = null;
                pickNewTarget();
              }, IDLE_TIME);
            }
            return prev;
          }

          if (
            !idleTimeoutRef.current &&
            randomChance(0.0007) &&
            sceneRef.current !== "run"
          ) {
            playScene("idle", 1500, () => {});
            idleTimeoutRef.current = setTimeout(() => {
              idleTimeoutRef.current = null;
              playScene("walk", 1200, () => {});
            }, IDLE_TIME);
            return prev;
          }

          const currentSpeed =
            sceneRef.current === "run" ? RUN_SPEED : WALK_SPEED;

          const stepSize = (delta / 1000) * currentSpeed;
          const ratio = stepSize / dist;

          return {
            x: prev.x + dx * ratio,
            y: prev.y + dy * ratio,
          };
        });
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [target, pickNewTarget]);

  useEffect(() => {
    let lastX = 0;
    let lastTime = Date.now();

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = Math.abs(e.clientX - lastX);
      const dt = now - lastTime;
      const cursorSpeed = dx / dt;

      const bounds = catRef.current?.getBoundingClientRect();

      if (bounds) {
        const catCenterX = bounds.left + bounds.width / 2;
        const catCenterY = bounds.top + bounds.height / 2;
        const dx = e.clientX - catCenterX;
        const dy = e.clientY - catCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (sceneRef.current === "walk" && cursorSpeed > 2 && distance < 100) {
          playScene("attack", 800, pickNewTarget);
        }
      }

      lastX = e.clientX;
      lastTime = now;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [pickNewTarget]);

  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      const catOffsetTop = catRef.current?.offsetTop ?? 0;
      const spriteHeight = sprites.run.width * 1.5;
      const safeMargin = 64;
      const maxY = window.innerHeight - spriteHeight - safeMargin;
      const targetY = Math.max(
        safeMargin,
        Math.min(e.clientY - catOffsetTop, maxY)
      );

      setTarget({ x: e.clientX, y: targetY });
      playScene("run", 800, () => {});

      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    };

    window.addEventListener("dblclick", handleDoubleClick);
    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  const current = sprites[scene];

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="fixed left-8 top-16 z-50"
    >
      {showBubble && (
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1.5 bg-accent text-foreground shadow-md"
          style={{
            whiteSpace: "nowrap",
            imageRendering: "pixelated",
          }}
        >
          {message}
        </div>
      )}
      <div
        ref={catRef}
        onClick={() => {
          if (sceneRef.current !== "hurt") {
            playScene("hurt", 800, pickNewTarget);
          }
        }}
        style={{
          transform: `scaleX(${direction === "right" ? -1 : 1}) scale(1.5)`,
          transformOrigin: "center",
          width: `${current.width}px`,
          height: "64px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: current.frames * current.width,
            height: "64px",
            backgroundImage: `url('${current.url}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",

            animationName: scene,
            animationDuration: `${current.duration}`,
            animationTimingFunction: `steps(${current.frames})`,
            animationIterationCount: current.oneShot ? "1" : "infinite",
            animationFillMode: "forwards",

            imageRendering: "pixelated",
            willChange: "background-position",
            transform: "translateZ(0)", // optional: keep if Safari still benefits
            backfaceVisibility: "hidden",
            transition: "none",
          }}
        />
      </div>
    </div>
  );
}
