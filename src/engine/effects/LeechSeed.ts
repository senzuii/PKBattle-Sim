import { BattlePokemon } from '../../types/Pokemon';

/**
 * Processes Leech Seed end-of-turn effects.
 * Seeded Pokemon loses 1/8th of its max HP, and the seeding Pokemon heals by that amount.
 */
export function processLeechSeed(
  seeder: BattlePokemon,
  seeded: BattlePokemon
): { damage: number; heal: number; logs: string[] } {
  const logs: string[] = [];
  if (!seeded.isSeeded) {
    return { damage: 0, heal: 0, logs };
  }

  // 1/8th of max HP, min 1
  const damage = Math.max(1, Math.floor(seeded.maxHp / 8));
  const actualDamage = Math.min(seeded.currentHp, damage);

  // Seeder heals by the actual damage dealt (capped at seeder's remaining HP space)
  const heal = Math.min(seeder.maxHp - seeder.currentHp, actualDamage);

  logs.push(`${seeded.name}'s health was sapped by Leech Seed!`);

  return {
    damage: actualDamage,
    heal,
    logs,
  };
}
