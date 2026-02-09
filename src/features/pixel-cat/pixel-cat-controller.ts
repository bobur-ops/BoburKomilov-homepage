import {
  DIRECTION_THRESHOLD,
  INITIAL_POSITION,
  INTERACTION_CONFIG,
  messages,
  MOVEMENT_CONFIG,
  MOVEMENT_THRESHOLD,
  SCENE_DURATIONS,
  sprites,
} from "./config";
import { SceneController } from "./lib/scene-controller";
import { clamp, distance, randomBetween } from "./lib/math";
import { preloadImages } from "./lib/preload";
import { throttle } from "./lib/throttle";
import type { CatState, Direction, Position, Scene } from "./model/types";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export class PixelCatController {
  private readonly root: HTMLElement;
  private readonly spriteEl: HTMLButtonElement;
  private readonly bubbleEl: HTMLElement;
  private readonly messageEl: HTMLElement;

  private readonly sceneController = new SceneController();

  private readonly state: CatState = {
    position: { ...INITIAL_POSITION },
    target: { ...INITIAL_POSITION },
    direction: "left",
    scene: "idle",
    showBubble: false,
    message: "",
  };

  private rafId: number | null = null;
  private previousFrame = 0;
  private idleTimeoutId: number | null = null;
  private bubbleIntervalId: number | null = null;
  private bubbleTimeoutId: number | null = null;
  private isMoving = false;
  private isDestroyed = false;
  private prefersReducedMotion = false;

  private readonly onResize = (): void => {
    this.state.position = this.clampToViewport(this.state.position);
    this.state.target = this.clampToViewport(this.state.target);
    this.render();
  };

  private readonly onSpriteClick = (): void => {
    if (this.prefersReducedMotion) return;
    this.clearIdleTimeout();
    this.isMoving = false;
    this.playScene("hurt", () => {
      this.startWalkingTo(this.getRandomTarget(), "walk");
    });
  };

  private readonly onDoubleClick = (event: MouseEvent): void => {
    if (this.prefersReducedMotion) return;
    this.clearIdleTimeout();
    const target = this.fromViewportPoint(event.clientX, event.clientY);
    this.startWalkingTo(target, "run");
  };

  private readonly onMouseMove = throttle((event: MouseEvent): void => {
    if (this.prefersReducedMotion) return;
    if (this.state.scene !== "walk" && this.state.scene !== "idle") return;

    const center = this.getCatCenter();
    const pointer = { x: event.clientX, y: event.clientY };

    if (distance(center, pointer) < INTERACTION_CONFIG.attackDistance) {
      this.clearIdleTimeout();
      this.isMoving = false;
      this.playScene("attack", () => {
        this.startWalkingTo(this.getRandomTarget(), "walk");
      });
    }
  }, INTERACTION_CONFIG.mouseMoveThrottle);

  constructor(root: HTMLElement) {
    this.root = root;

    const spriteEl = root.querySelector<HTMLButtonElement>("[data-pixel-cat-sprite]");
    const bubbleEl = root.querySelector<HTMLElement>("[data-pixel-cat-bubble]");
    const messageEl = root.querySelector<HTMLElement>("[data-pixel-cat-message]");

    if (!spriteEl || !bubbleEl || !messageEl) {
      throw new Error("Pixel cat DOM is incomplete.");
    }

    this.spriteEl = spriteEl;
    this.bubbleEl = bubbleEl;
    this.messageEl = messageEl;
  }

  async init(): Promise<void> {
    this.prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    await preloadImages(Object.values(sprites).map((sprite) => sprite.url));
    this.render();

    if (this.prefersReducedMotion) {
      this.setScene("idle");
      return;
    }

    this.attachEvents();
    this.startBubbleLoop();
    this.startWalkingTo(this.getRandomTarget(), "walk");
    this.startFrameLoop();
  }

  destroy(): void {
    if (this.isDestroyed) return;
    this.isDestroyed = true;

    this.detachEvents();
    this.stopFrameLoop();
    this.clearIdleTimeout();
    this.clearBubbleTimers();
    this.sceneController.destroy();
  }

  private attachEvents(): void {
    this.spriteEl.addEventListener("click", this.onSpriteClick);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("dblclick", this.onDoubleClick);
    window.addEventListener("resize", this.onResize);
  }

  private detachEvents(): void {
    this.spriteEl.removeEventListener("click", this.onSpriteClick);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("dblclick", this.onDoubleClick);
    window.removeEventListener("resize", this.onResize);
  }

  private startFrameLoop(): void {
    this.previousFrame = performance.now();
    this.rafId = window.requestAnimationFrame(this.onAnimationFrame);
  }

  private stopFrameLoop(): void {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private readonly onAnimationFrame = (timestamp: number): void => {
    if (this.isDestroyed) return;

    const deltaSeconds = Math.min((timestamp - this.previousFrame) / 1000, 0.05);
    this.previousFrame = timestamp;

    this.updateMovement(deltaSeconds);
    this.rafId = window.requestAnimationFrame(this.onAnimationFrame);
  };

  private updateMovement(deltaSeconds: number): void {
    if (!this.isMoving) return;

    const dx = this.state.target.x - this.state.position.x;
    const dy = this.state.target.y - this.state.position.y;
    const remainingDistance = Math.hypot(dx, dy);

    if (Math.abs(dx) > DIRECTION_THRESHOLD) {
      const direction: Direction = dx > 0 ? "right" : "left";
      if (direction !== this.state.direction) {
        this.state.direction = direction;
      }
    }

    if (remainingDistance <= MOVEMENT_THRESHOLD) {
      this.state.position = { ...this.state.target };
      this.isMoving = false;
      this.onArrived();
      this.render();
      return;
    }

    const speed = this.state.scene === "run" ? MOVEMENT_CONFIG.runSpeed : MOVEMENT_CONFIG.walkSpeed;
    const step = speed * deltaSeconds;

    if (step >= remainingDistance) {
      this.state.position = { ...this.state.target };
      this.isMoving = false;
      this.onArrived();
      this.render();
      return;
    }

    const ratio = step / remainingDistance;
    this.state.position = {
      x: this.state.position.x + dx * ratio,
      y: this.state.position.y + dy * ratio,
    };

    if (this.state.scene === "walk" && Math.random() < INTERACTION_CONFIG.randomIdleChance) {
      this.isMoving = false;
      this.setScene("idle");
      this.setIdleTimeout(() => {
        this.setScene("walk");
        this.isMoving = true;
      });
    }

    this.render();
  }

  private onArrived(): void {
    this.setScene("idle");
    this.setIdleTimeout(() => {
      this.startWalkingTo(this.getRandomTarget(), "walk");
    });
  }

  private startWalkingTo(target: Position, scene: "walk" | "run"): void {
    this.state.target = this.clampToViewport(target);
    this.isMoving = true;
    this.setScene(scene);
    this.render();
  }

  private setScene(scene: Scene, onComplete?: () => void): void {
    const duration = SCENE_DURATIONS[scene];
    const sprite = sprites[scene];

    this.state.scene = scene;
    this.render();

    if (!sprite.oneShot) {
      this.sceneController.cancel();
      return;
    }

    this.sceneController.start(scene, duration, () => {
      if (this.isDestroyed) return;
      onComplete?.();
    });
  }

  private playScene(scene: Extract<Scene, "hurt" | "attack">, onComplete: () => void): void {
    this.setScene(scene, onComplete);
  }

  private getRandomTarget(): Position {
    const bounds = this.getMovementBounds();

    const randomX = randomBetween(bounds.minX, bounds.maxX);
    const minY = this.state.position.y - MOVEMENT_CONFIG.maxYOffset;
    const maxY = this.state.position.y + MOVEMENT_CONFIG.maxYOffset;
    const randomY = randomBetween(minY, maxY);

    return {
      x: clamp(randomX, bounds.minX, bounds.maxX),
      y: clamp(randomY, bounds.minY, bounds.maxY),
    };
  }

  private clampToViewport(position: Position): Position {
    const bounds = this.getMovementBounds();
    return {
      x: clamp(position.x, bounds.minX, bounds.maxX),
      y: clamp(position.y, bounds.minY, bounds.maxY),
    };
  }

  private fromViewportPoint(clientX: number, clientY: number): Position {
    const base = this.getBaseOffset();
    const halfWidth = this.getSpriteWidth() / 2;
    const halfHeight = this.getSpriteHeight() / 2;

    return this.clampToViewport({
      x: clientX - base.x - halfWidth,
      y: clientY - base.y - halfHeight,
    });
  }

  private getMovementBounds(): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } {
    const base = this.getBaseOffset();
    const spriteWidth = this.getSpriteWidth();
    const spriteHeight = this.getSpriteHeight();

    const minX = MOVEMENT_CONFIG.margin - base.x;
    const rawMaxX = window.innerWidth - MOVEMENT_CONFIG.margin - spriteWidth - base.x;
    const minY = MOVEMENT_CONFIG.margin - base.y;
    const rawMaxY = window.innerHeight - MOVEMENT_CONFIG.margin - spriteHeight - base.y;

    const maxX = Math.max(minX, rawMaxX);
    const maxY = Math.max(minY, rawMaxY);

    return { minX, maxX, minY, maxY };
  }

  private getBaseOffset(): Position {
    const computed = window.getComputedStyle(this.root);
    return {
      x: Number.parseFloat(computed.left) || 0,
      y: Number.parseFloat(computed.top) || 0,
    };
  }

  private getSpriteWidth(): number {
    return sprites.walk.frameWidth * MOVEMENT_CONFIG.spriteScale;
  }

  private getSpriteHeight(): number {
    return MOVEMENT_CONFIG.spriteHeight * MOVEMENT_CONFIG.spriteScale;
  }

  private getCatCenter(): Position {
    const base = this.getBaseOffset();
    return {
      x: base.x + this.state.position.x + this.getSpriteWidth() / 2,
      y: base.y + this.state.position.y + this.getSpriteHeight() / 2,
    };
  }

  private setIdleTimeout(callback: () => void): void {
    this.clearIdleTimeout();
    this.idleTimeoutId = window.setTimeout(() => {
      this.idleTimeoutId = null;
      callback();
    }, MOVEMENT_CONFIG.idleTime);
  }

  private clearIdleTimeout(): void {
    if (this.idleTimeoutId !== null) {
      window.clearTimeout(this.idleTimeoutId);
      this.idleTimeoutId = null;
    }
  }

  private startBubbleLoop(): void {
    this.clearBubbleTimers();
    this.bubbleIntervalId = window.setInterval(() => {
      if (Math.random() <= INTERACTION_CONFIG.bubbleChance) {
        this.showRandomBubble();
      }
    }, INTERACTION_CONFIG.bubbleCheckInterval);
  }

  private clearBubbleTimers(): void {
    if (this.bubbleIntervalId !== null) {
      window.clearInterval(this.bubbleIntervalId);
      this.bubbleIntervalId = null;
    }

    if (this.bubbleTimeoutId !== null) {
      window.clearTimeout(this.bubbleTimeoutId);
      this.bubbleTimeoutId = null;
    }
  }

  private showRandomBubble(): void {
    const randomIndex = Math.floor(Math.random() * messages.length);
    this.state.message = messages[randomIndex] ?? "";
    this.state.showBubble = true;
    this.render();

    if (this.bubbleTimeoutId !== null) {
      window.clearTimeout(this.bubbleTimeoutId);
    }

    this.bubbleTimeoutId = window.setTimeout(() => {
      this.bubbleTimeoutId = null;
      this.state.showBubble = false;
      this.render();
    }, INTERACTION_CONFIG.bubbleDisplayDuration);
  }

  private render(): void {
    const sprite = sprites[this.state.scene];

    this.root.style.setProperty("--cat-x", `${this.state.position.x}px`);
    this.root.style.setProperty("--cat-y", `${this.state.position.y}px`);
    this.root.dataset.scene = this.state.scene;
    this.root.dataset.direction = this.state.direction;

    this.spriteEl.style.backgroundImage = `url(${sprite.url})`;
    this.spriteEl.style.width = `${sprite.frameWidth}px`;

    if (this.state.showBubble) {
      this.messageEl.textContent = this.state.message;
      this.bubbleEl.hidden = false;
    } else {
      this.bubbleEl.hidden = true;
    }
  }
}
