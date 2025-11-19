import { useState, useRef, useEffect, useCallback } from "react";
import type { Scene, SceneCallback } from "../model/types";
import { sprites } from "../config";
import { loadSprite } from "../utils/preloadSprites";

export function useSceneController(catRef: React.RefObject<HTMLDivElement | null>) {
  const [scene, setScene] = useState<Scene>("walk");
  const sceneRef = useRef<Scene>("walk");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  const playScene = useCallback(
    (name: Scene, duration: number, callback: SceneCallback) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      loadSprite(sprites[name].url)
        .then(() => {
          setScene(name);
          requestAnimationFrame(() => {
            void catRef.current?.offsetHeight;
          });

          timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            callback();
          }, duration);
        })
        .catch((error) => {
          console.error("Failed to play scene:", error);
          callback();
        });
    },
    [catRef]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    scene,
    sceneRef,
    playScene,
  };
}
