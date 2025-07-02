/**
 * Returns true with the given probability (0 to 1).
 * @param probability A number between 0 and 1 representing the chance.
 */
export function randomChance(probability: number): boolean {
  return Math.random() < probability;
}
