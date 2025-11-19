import type { Scene, SpriteConfig } from "../model/types";

export function preloadSprites(sprites: Record<Scene, SpriteConfig>): Promise<void[]> {
  const promises = Object.values(sprites).map((sprite) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = "async";

      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Failed to preload sprite: ${sprite.url}`);
        resolve();
      };

      img.src = sprite.url;
    });
  });

  return Promise.all(promises);
}

export function loadSprite(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load sprite: ${url}`));
  });
}
