"use client";

import { useRef, useEffect } from "react";
import { sprites } from "./config";
import { preloadSprites } from "./utils/preloadSprites";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useSceneController } from "./hooks/useSceneController";
import { useMovement } from "./hooks/useMovement";
import { useInteractions } from "./hooks/useInteractions";
import { useSpeechBubble } from "./hooks/useSpeechBubble";
import { CatSprite } from "./components/CatSprite";
import { SpeechBubble } from "./components/SpeechBubble";

export default function PixelCat() {
  const catRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    preloadSprites(sprites).catch((error) => {
      console.warn("Failed to preload some sprites:", error);
    });
  }, []);

  const { scene, sceneRef, playScene } = useSceneController(catRef);

  const { position, direction, setTarget, pickNewTarget, clearIdleTimeout } = useMovement({
    sceneRef,
    playScene,
    reducedMotion,
  });

  const { handleClick } = useInteractions({
    catRef,
    sceneRef,
    playScene,
    pickNewTarget,
    setTarget,
    clearIdleTimeout,
    reducedMotion,
  });

  const { showBubble, message } = useSpeechBubble();

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="fixed left-8 top-16 z-50"
    >
      <SpeechBubble message={message} visible={showBubble} />
      <div ref={catRef}>
        <CatSprite scene={scene} direction={direction} onClick={handleClick} />
      </div>
    </div>
  );
}
