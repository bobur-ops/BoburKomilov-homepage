"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Scene, sprites } from "./consts";

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

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  useEffect(() => {
    Object.values(sprites).forEach((sprite) => {
      const img = new Image();
      img.src = sprite.url;
    });
  }, []);

  const playScene = (name: Scene, duration: number, then: () => void) => {
    setScene(name);
    setTimeout(() => {
      then();
    }, duration);
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
      setScene("walk");

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
              setScene("idle");
              idleTimeoutRef.current = setTimeout(() => {
                idleTimeoutRef.current = null;
                pickNewTarget();
              }, IDLE_TIME);
            }
            return prev;
          }

          if (
            !idleTimeoutRef.current &&
            Math.random() < 0.0007 &&
            sceneRef.current !== "run"
          ) {
            setScene("idle");
            idleTimeoutRef.current = setTimeout(() => {
              idleTimeoutRef.current = null;
              setScene("walk");
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
          playScene("attack", 1000, pickNewTarget);
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
      setScene("run");

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
  const animation = `${scene} ${current.duration} steps(${current.frames}) ${
    current.oneShot ? "1" : "infinite"
  }`;

  return (
    <div
      ref={catRef}
      className="fixed left-8 top-16 z-50"
      onClick={() => {
        if (sceneRef.current !== "hurt") {
          playScene("hurt", 1000, pickNewTarget);
        }
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scaleX(${
          direction === "right" ? -1 : 1
        }) scale(1.5)`,
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
          animation,
          imageRendering: "pixelated",
          willChange: "transform, background-image",
        }}
      />
    </div>
  );
}
