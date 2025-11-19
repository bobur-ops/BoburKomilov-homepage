import { useState, useEffect, useCallback, useRef, type RefObject } from "react";
import type { Position, Scene } from "../model/types";
import {
  MOVEMENT_CONFIG,
  INTERACTION_CONFIG,
  SCENE_DURATIONS,
  INITIAL_POSITION,
  MOVEMENT_THRESHOLD,
  DIRECTION_THRESHOLD,
  sprites,
} from "../config";
import {
  calculateDistance,
  generateRandomPosition,
  moveTowardsTarget,
  getDirection,
} from "../utils/calculations";
import { randomChance } from "@/utils/randomChance";

interface UseMovementProps {
  sceneRef: RefObject<Scene>;
  playScene: (name: Scene, duration: number, callback: () => void) => void;
  reducedMotion: boolean;
}

export function useMovement({ sceneRef, playScene, reducedMotion }: UseMovementProps) {
  const [position, setPosition] = useState<Position>(INITIAL_POSITION);
  const [target, setTarget] = useState<Position>(INITIAL_POSITION);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pickNewTarget = useCallback(() => {
    setPosition((prev) => {
      const spriteWidth = sprites.walk.width * MOVEMENT_CONFIG.spriteScale;
      const newTarget = generateRandomPosition(
        prev.y,
        MOVEMENT_CONFIG.margin,
        spriteWidth,
        MOVEMENT_CONFIG.spriteHeight * MOVEMENT_CONFIG.spriteScale,
        MOVEMENT_CONFIG.maxYOffset
      );

      setTarget(newTarget);
      setDirection(getDirection(prev.x, newTarget.x));

      if (!reducedMotion) {
        playScene("walk", SCENE_DURATIONS.walk, () => {});
      }

      return prev;
    });
  }, [playScene, reducedMotion]);

  useEffect(() => {
    if (!reducedMotion) {
      pickNewTarget();
    }
  }, [pickNewTarget, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let raf: number;
    let last = performance.now();

    const step = (time: number) => {
      const delta = time - last;
      last = time;

      const currentScene = sceneRef.current;

      if (["walk", "run"].includes(currentScene)) {
        setPosition((prev) => {
          const dist = calculateDistance(prev, target);

          const dx = target.x - prev.x;
          if (Math.abs(dx) > DIRECTION_THRESHOLD) {
            setDirection(getDirection(prev.x, target.x));
          }

          if (dist < MOVEMENT_THRESHOLD) {
            if (!idleTimeoutRef.current) {
              setPosition(target);
              playScene("idle", SCENE_DURATIONS.idle, () => {});
              idleTimeoutRef.current = setTimeout(() => {
                idleTimeoutRef.current = null;
                pickNewTarget();
              }, MOVEMENT_CONFIG.idleTime);
            }
            return prev;
          }

          if (
            !idleTimeoutRef.current &&
            randomChance(INTERACTION_CONFIG.randomIdleChance) &&
            currentScene !== "run"
          ) {
            playScene("idle", SCENE_DURATIONS.idle, () => {});
            idleTimeoutRef.current = setTimeout(() => {
              idleTimeoutRef.current = null;
              playScene("walk", SCENE_DURATIONS.walk, () => {});
            }, MOVEMENT_CONFIG.idleTime);
            return prev;
          }

          const currentSpeed =
            currentScene === "run" ? MOVEMENT_CONFIG.runSpeed : MOVEMENT_CONFIG.walkSpeed;

          return moveTowardsTarget(prev, target, currentSpeed, delta);
        });
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    };
  }, [target, pickNewTarget, sceneRef, playScene, reducedMotion]);

  const clearIdleTimeout = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  return {
    position,
    target,
    direction,
    setTarget,
    pickNewTarget,
    clearIdleTimeout,
  };
}
