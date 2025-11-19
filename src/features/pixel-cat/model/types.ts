export type Scene = "walk" | "idle" | "hurt" | "attack" | "run";

export interface Position {
  x: number;
  y: number;
}

export interface SpriteConfig {
  url: string;
  frames: number;
  width: number;
  duration: string;
  oneShot?: boolean;
}

export interface CatState {
  position: Position;
  target: Position;
  direction: "left" | "right";
  scene: Scene;
  showBubble: boolean;
  message: string;
}

export interface MovementConfig {
  walkSpeed: number;
  runSpeed: number;
  idleTime: number;
  margin: number;
  spriteScale: number;
  spriteHeight: number;
  maxYOffset: number;
}

export interface InteractionConfig {
  attackDistance: number;
  mouseMoveThrottle: number;
  bubbleDisplayDuration: number;
  bubbleCheckInterval: number;
  bubbleChance: number;
  randomIdleChance: number;
}

export type SceneCallback = () => void;

export interface ScenePlayback {
  scene: Scene;
  duration: number;
  callback: SceneCallback;
}
