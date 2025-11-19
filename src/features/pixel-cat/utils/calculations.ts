import type { Position } from "../model/types";

export function calculateDistance(pos1: Position, pos2: Position): number {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function calculateDelta(current: Position, target: Position) {
  return {
    dx: target.x - current.x,
    dy: target.y - current.y,
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function generateRandomPosition(
  currentY: number,
  margin: number,
  spriteWidth: number,
  spriteHeight: number,
  maxYOffset: number
): Position {
  const maxX = window.innerWidth - spriteWidth - margin;
  const maxY = window.innerHeight - spriteHeight - margin;

  const newX = Math.max(margin, Math.random() * maxX);

  const minY = Math.max(margin, currentY - maxYOffset);
  const maxYClamped = Math.min(maxY, currentY + maxYOffset);
  const newY = Math.random() * (maxYClamped - minY) + minY;

  return { x: newX, y: newY };
}

export function moveTowardsTarget(
  current: Position,
  target: Position,
  speed: number,
  delta: number
): Position {
  const { dx, dy } = calculateDelta(current, target);
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 0.1) {
    return target;
  }

  const stepSize = (delta / 1000) * speed;
  const ratio = stepSize / dist;

  return {
    x: current.x + dx * ratio,
    y: current.y + dy * ratio,
  };
}

export function getDirection(currentX: number, targetX: number): "left" | "right" {
  return targetX > currentX ? "right" : "left";
}

export function getCatCenter(bounds: DOMRect): Position {
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}
