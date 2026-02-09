import type { Position } from "../model/types";

export const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const distance = (a: Position, b: Position): number => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};
