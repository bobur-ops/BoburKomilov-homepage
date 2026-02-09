import type {
  SpriteConfig,
  MovementConfig,
  InteractionConfig,
  Scene,
} from "./model/types";

export const sprites: Record<Scene, SpriteConfig> = {
  walk: {
    url: "/cat/WALK.png",
    frames: 12,
    frameWidth: 80,
    duration: "1.5s",
    oneShot: false,
  },
  idle: {
    url: "/cat/IDLE.png",
    frames: 8,
    frameWidth: 80,
    duration: "1.2s",
    oneShot: false,
  },
  hurt: {
    url: "/cat/HURT.png",
    frames: 4,
    frameWidth: 80,
    duration: "1s",
    oneShot: true,
  },
  attack: {
    url: "/cat/ATTACK.png",
    frames: 8,
    frameWidth: 80,
    duration: "1s",
    oneShot: true,
  },
  run: {
    url: "/cat/RUN.png",
    frames: 8,
    frameWidth: 80,
    duration: "1s",
    oneShot: false,
  },
};

export const messages = [
  "Click me!",
  "Double-click anywhere to make me run!",
  "Move your mouse fast nearby to scare me!",
  "Try double-clicking near me!",
  "Can you make me attack?",
  "I love walking 🌟",
  "I’m just vibing 🐾",
  "Do you like cats?",
  "Pet me... I dare you.",
  "I’m watching you 👀",
  "Life is better with pixels.",
  "I’m not lazy, just energy efficient.",
  "*stares into the void*",
  "Just stretching my paws.",
  "Meow. (That’s it, that’s the message.)",
  "I could nap right here...",
  "Sometimes I just stop and think...",
  "I’m plotting world domination.",
];

export const MOVEMENT_CONFIG: MovementConfig = {
  walkSpeed: 25,
  runSpeed: 75,
  idleTime: 3000,
  margin: 80,
  spriteScale: 1.5,
  spriteHeight: 64,
  maxYOffset: 200,
};

export const INTERACTION_CONFIG: InteractionConfig = {
  attackDistance: 100,
  mouseMoveThrottle: 100,
  bubbleDisplayDuration: 3000,
  bubbleCheckInterval: 6000,
  bubbleChance: 0.25,
  randomIdleChance: 0.0007,
};

export const SCENE_DURATIONS: Record<Scene, number> = {
  walk: 1200,
  idle: 1500,
  hurt: 800,
  attack: 800,
  run: 800,
};

export const INITIAL_POSITION = { x: 0, y: 100 };

export const MOVEMENT_THRESHOLD = 2;
export const DIRECTION_THRESHOLD = 1;
