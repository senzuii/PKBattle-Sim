import { BattlePokemon } from '../../types/Pokemon';
import { getStatMultiplier } from './StatStages';
import { AbilityManager } from '../abilities/AbilityManager';
import { BattleRng, defaultRng } from '../battle/Random';

// ─────────────────────────────────────────────────────────────────────────────
// Pre-Move Status Resolution
// Called before a Pokémon executes its move.
// ─────────────────────────────────────────────────────────────────────────────

export interface StatusResolution {
  /** True if the Pokémon can act this turn. */
  canAct: boolean;
  /** HP the Pokémon lost to itself (confusion self-hit). */
  selfDamage: number;
}

/**
 * Processes all pre-move status and volatile-status checks for an attacker.
 * Mutates the attacker in-place.
 */
export function resolvePreMoveStatuses(
  attacker: BattlePokemon,
  logs: string[],
  rng: BattleRng = defaultRng,
): StatusResolution {
  const blocked = (selfDamage = 0): StatusResolution => ({ canAct: false, selfDamage });

  // 1. Recharge (Hyper Beam, etc.)
  if (attacker.lockedMove?.isRecharge) {
    logs.push(`${attacker.name} must recharge!`);
    attacker.lockedMove = undefined;
    return blocked();
  }

  // 2. Flinch — only possible if the opponent already hit us this turn;
  //    cleared at end of turn either way.
  if (attacker.volatileStatuses.includes('Flinch')) {
    attacker.volatileStatuses = attacker.volatileStatuses.filter(s => s !== 'Flinch');
    logs.push(`${attacker.name} flinched and couldn't move!`);
    return blocked();
  }

  // 3. Sleep
  if (attacker.status === 'Sleep') {
    if (attacker.statusTurns === undefined) attacker.statusTurns = 1;

    if (attacker.statusTurns > 0) {
      attacker.statusTurns -= 1;
      logs.push(`${attacker.name} is fast asleep.`);
      return blocked();
    }

    // statusTurns reached 0 → wake up, still acts this turn
    attacker.status = undefined;
    attacker.statusTurns = 0;
    logs.push(`${attacker.name} woke up!`);
    // Fall through — can act this turn
  }

  // 4. Freeze (20% thaw chance each turn)
  if (attacker.status === 'Freeze') {
    if (rng.next() < 0.2) {
      attacker.status = undefined;
      logs.push(`${attacker.name} thawed out!`);
      // Fall through — can act this turn
    } else {
      logs.push(`${attacker.name} is frozen solid!`);
      return blocked();
    }
  }

  // 5. Paralysis (25% fully paralysed chance)
  if (attacker.status === 'Paralysis') {
    if (rng.next() < 0.25) {
      logs.push(`${attacker.name} is paralyzed! It can't move!`);
      return blocked();
    }
  }

  // 6. Confusion
  if (attacker.volatileStatuses.includes('Confusion')) {
    // Count down confusion turns
    attacker.confusionTurns = (attacker.confusionTurns ?? 0) - 1;

    if (attacker.confusionTurns <= 0) {
      // Snapped out — remove confusion and proceed normally
      attacker.volatileStatuses = attacker.volatileStatuses.filter(s => s !== 'Confusion');
      logs.push(`${attacker.name} snapped out of its confusion!`);
    } else {
      logs.push(`${attacker.name} is confused!`);

      if (rng.next() < 0.5) {
        // Hurt itself
        const dmg = calcConfusionDamage(attacker);
        attacker.currentHp = Math.max(0, attacker.currentHp - dmg);
        logs.push(`It hurt itself in its confusion!`);
        logs.push(`${attacker.name} took ${dmg} damage!`);
        return blocked(dmg);
      }
    }
  }

  // 7. Infatuation (50% immobilized by love)
  if (attacker.volatileStatuses.includes('Infatuation')) {
    logs.push(`${attacker.name} is in love!`);
    if (rng.next() < 0.5) {
      logs.push(`${attacker.name} is immobilized by love!`);
      return blocked();
    }
  }

  return { canAct: true, selfDamage: 0 };
}

// ─────────────────────────────────────────────────────────────────────────────
// Confusion Damage
// Typeless 40-power physical hit against the confused Pokémon itself, using
// its own Attack and Defense with current stat stages. Never crits, no STAB,
// no type chart.
// ─────────────────────────────────────────────────────────────────────────────
export function calcConfusionDamage(pokemon: BattlePokemon): number {
  const level = pokemon.level;

  let atk = pokemon.stats.atk
    * getStatMultiplier(pokemon.statStages.atk)
    * AbilityManager.getStatMultiplier(pokemon, 'atk');

  if (pokemon.status === 'Burn') {
    atk = Math.floor(atk / 2);
  }

  const def = Math.max(1,
    pokemon.stats.def
    * getStatMultiplier(pokemon.statStages.def)
    * AbilityManager.getStatMultiplier(pokemon, 'def'),
  );

  const base = ((((2 * level) / 5 + 2) * 40 * atk) / def) / 50 + 2;
  return Math.max(1, Math.floor(base));
}
