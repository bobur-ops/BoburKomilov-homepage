export type Scene = "walk" | "idle" | "hurt" | "attack" | "run";

export const sprites: Record<
  Scene,
  {
    url: string;
    frames: number;
    width: number;
    duration: string;
    oneShot?: boolean;
  }
> = {
  walk: { url: "/cat/WALK.png", frames: 12, width: 80, duration: "1.5s" },
  idle: { url: "/cat/IDLE.png", frames: 8, width: 80, duration: "1.2s" },
  hurt: {
    url: "/cat/HURT.png",
    frames: 4,
    width: 80,
    duration: "1s",
    oneShot: true,
  },
  attack: {
    url: "/cat/ATTACK.png",
    frames: 8,
    width: 80,
    duration: "1s",
    oneShot: true,
  },
  run: {
    url: "/cat/RUN.png",
    frames: 8,
    width: 80,
    duration: "1s",
    oneShot: false,
  },
};

export const messages = [
  // 🧭 Interaction hints
  "Click me!",
  "Double-click anywhere to make me run!",
  "Move your mouse fast nearby to scare me!",
  "Try double-clicking near me!",
  "Can you make me attack?",

  // 🐾 Personality & vibes
  "I love walking 🌟",
  "I'm just vibing 🐾",
  "Do you like cats?",
  "Pet me... I dare you.",
  "I'm watching you 👀",
  "Life is better with pixels.",
  "I'm not lazy, just energy efficient.",

  // 🌙 Idle / chill mode
  "*stares into the void*",
  "Just stretching my paws.",
  "Meow. (That's it, that's the message.)",
  "I could nap right here...",
  "Sometimes I just stop and think...",
  "I'm plotting world domination.",
];
