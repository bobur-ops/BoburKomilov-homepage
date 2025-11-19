import type { Scene } from "../model/types";
import { sprites } from "../config";

interface CatSpriteProps {
  scene: Scene;
  direction: "left" | "right";
  onClick: () => void;
}

export function CatSprite({ scene, direction, onClick }: CatSpriteProps) {
  const current = sprites[scene];

  return (
    <div
      onClick={onClick}
      style={{
        transform: `scaleX(${direction === "right" ? -1 : 1}) scale(1.5)`,
        transformOrigin: "center",
        width: `${current.width}px`,
        height: "64px",
        overflow: "hidden",
        cursor: "pointer",
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
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          transition: "none",
        }}
      />
    </div>
  );
}
