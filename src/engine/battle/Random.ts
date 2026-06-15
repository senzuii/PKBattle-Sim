/**
 * Random.ts
 *
 * Single source of battle randomness. Every roll in the engine goes through a
 * BattleRng so tests and AI damage estimation can be made deterministic by
 * injecting their own implementation.
 */

export interface BattleRng {
  /** Returns a float in [0, 1). */
  next(): number;
}

export const defaultRng: BattleRng = {
  next: () => Math.random(),
};

/** True with `percent`% probability (0–100). */
export function chance(rng: BattleRng, percent: number): boolean {
  return rng.next() * 100 < percent;
}

/** Uniform integer in [min, max] inclusive. */
export function intBetween(rng: BattleRng, min: number, max: number): number {
  return Math.floor(rng.next() * (max - min + 1)) + min;
}

/** Creates a seeded RNG (mulberry32) for reproducible battles/tests. */
export function seededRng(seed: number): BattleRng {
  let state = seed >>> 0;
  return {
    next: () => {
      state = (state + 0x6d2b79f5) >>> 0;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
  };
}
