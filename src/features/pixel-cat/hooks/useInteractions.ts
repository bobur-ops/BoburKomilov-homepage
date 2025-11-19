import { useEffect, useMemo, type RefObject } from "react";
import type { Scene, Position } from "../model/types";
import { INTERACTION_CONFIG, SCENE_DURATIONS, MOVEMENT_CONFIG, sprites } from "../config";
import { calculateDistance, getCatCenter } from "../utils/calculations";
import { throttle } from "../utils/throttle";

interface UseInteractionsProps {
  catRef: RefObject<HTMLDivElement | null>;
  sceneRef: RefObject<Scene>;
  playScene: (name: Scene, duration: number, callback: () => void) => void;
  pickNewTarget: () => void;
  setTarget: (target: Position) => void;
  clearIdleTimeout: () => void;
  reducedMotion: boolean;
}

export function useInteractions({
  catRef,
  sceneRef,
  playScene,
  pickNewTarget,
  setTarget,
  clearIdleTimeout,
  reducedMotion,
}: UseInteractionsProps) {
  const throttledMouseMove = useMemo(
    () =>
      throttle((e: MouseEvent) => {
        if (reducedMotion) return;

        const bounds = catRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const catCenter = getCatCenter(bounds);
        const mousePos = { x: e.clientX, y: e.clientY };
        const distance = calculateDistance(catCenter, mousePos);

        if (
          ["walk", "idle"].includes(sceneRef.current ?? "idle") &&
          distance < INTERACTION_CONFIG.attackDistance
        ) {
          playScene("attack", SCENE_DURATIONS.attack, pickNewTarget);
        }
      }, INTERACTION_CONFIG.mouseMoveThrottle),
    [catRef, sceneRef, playScene, pickNewTarget, reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion) return;

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [throttledMouseMove, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const handleDoubleClick = (e: MouseEvent) => {
      const catOffsetTop = catRef.current?.offsetTop ?? 0;
      const spriteHeight = sprites.run.width * MOVEMENT_CONFIG.spriteScale;
      const maxY =
        window.innerHeight - spriteHeight - MOVEMENT_CONFIG.margin;
      const targetY = Math.max(
        MOVEMENT_CONFIG.margin,
        Math.min(e.clientY - catOffsetTop, maxY)
      );

      setTarget({ x: e.clientX, y: targetY });
      playScene("run", SCENE_DURATIONS.run, () => {});
      clearIdleTimeout();
    };

    window.addEventListener("dblclick", handleDoubleClick);
    return () => window.removeEventListener("dblclick", handleDoubleClick);
  }, [catRef, setTarget, playScene, clearIdleTimeout, reducedMotion]);

  const handleClick = () => {
    if (reducedMotion) return;
    if (sceneRef.current !== "hurt") {
      playScene("hurt", SCENE_DURATIONS.hurt, pickNewTarget);
    }
  };

  return {
    handleClick,
  };
}
