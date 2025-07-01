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
    duration: "0.8s",
    oneShot: false,
  },
};
