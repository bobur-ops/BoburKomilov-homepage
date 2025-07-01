"use client";

import { useEffect, useRef, useState } from "react";
import { Scene, sprites } from "./consts";

const SPEED = 40;
const IDLE_TIME = 3000;

export default function PixelCat() {
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [target, setTarget] = useState({ x: 200, y: 100 });
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

  const pickNewTarget = () => {
    const margin = 80;
    const newX = Math.random() * (window.innerWidth - margin);
    const newY = Math.random() * (window.innerHeight - 200); // avoid footer/header
    setTarget({ x: newX, y: newY });
    setDirection(newX > position.x ? "right" : "left");
    setScene("walk");
  };

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    const step = (time: number) => {
      const delta = time - last;
      last = time;

      if (sceneRef.current === "walk") {
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

          const stepSize = (delta / 1000) * SPEED;
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
  }, [target]);

  useEffect(() => {
    let lastX = 0;
    let lastTime = Date.now();

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = Math.abs(e.clientX - lastX);
      const dt = now - lastTime;
      const cursorSpeed = dx / dt;

      const bounds = catRef.current?.getBoundingClientRect();
      const distance =
        (bounds && Math.abs(e.clientX - (bounds.left + bounds.width / 2))) || 0;

      if (sceneRef.current === "walk" && cursorSpeed > 2 && distance < 100) {
        setScene("attack");
        setTimeout(() => {
          setScene("walk");
        }, 1000);
      }

      lastX = e.clientX;
      lastTime = now;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
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
          setScene("hurt");
          setTimeout(() => setScene("walk"), 600);
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
