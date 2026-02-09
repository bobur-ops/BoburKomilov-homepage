import type { Scene, SceneCallback } from "../model/types";

export class SceneController {
  private timeoutId: number | null = null;

  start(scene: Scene, duration: number, callback: SceneCallback): Scene {
    this.cancel();
    this.timeoutId = window.setTimeout(() => {
      this.timeoutId = null;
      callback();
    }, duration);
    return scene;
  }

  cancel(): void {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  destroy(): void {
    this.cancel();
  }
}
