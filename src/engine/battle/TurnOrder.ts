import { BattlePokemon, Move, WeatherKind } from '../../types/Pokemon';
import { getStatMultiplier } from '../effects/StatStages';
import { AbilityManager } from '../abilities/AbilityManager';
import { BattleAction } from './Actions';
import { BattleRng, defaultRng } from './Random';

// ─────────────────────────────────────────────────────────────────────────────
// Move Priority Lookup
// Any move can override priority via move.priority field; this table is the
// fallback for all standard Gen 1–4 priority moves.
// ─────────────────────────────────────────────────────────────────────────────
const PRIORITY_TABLE: Record<string, number> = {
  // +3
  protect: 3, detect: 3, endure: 3,
  // +2
  extremespeed: 2,
  // +1
  quickattack: 1, machpunch: 1, shadowsneak: 1,
  bulletpunch: 1, iceshard: 1, vacuumwave: 1,
  aquajet: 1, suckerpunch: 1,
  // 0 (default — no entry needed)
  // -1
  vitalthrow: -1,
  // -3
  bide: -3,
  // -5
  counter: -5, mirrorcoat: -5, metalburst: -5,
  // -6
  roar: -6, whirlwind: -6, dragontail: -6, circlethrow: -6,
};

export function getMovePriority(move: Move): number {
  return move.priority ?? PRIORITY_TABLE[move.id] ?? 0;
}

/** Switching always resolves before any move (+7 beats Protect's +3). */
export function getActionPriority(action: BattleAction): number {
  return action.type === 'switch' ? 7 : getMovePriority(action.move);
}

// ─────────────────────────────────────────────────────────────────────────────
// Turn Order Resolution
// ─────────────────────────────────────────────────────────────────────────────

/**
 * True if the player acts before the opponent, given both chosen actions.
 * Higher priority wins; ties go to effective speed; speed ties are a coin flip.
 */
export function playerActsFirst(
  player: BattlePokemon,
  opponent: BattlePokemon,
  playerAction: BattleAction,
  opponentAction: BattleAction,
  rng: BattleRng = defaultRng,
  weather?: WeatherKind,
): boolean {
  const pPriority = getActionPriority(playerAction);
  const oPriority = getActionPriority(opponentAction);

  if (pPriority !== oPriority) return pPriority > oPriority;

  const pSpeed = getEffectiveSpeed(player, weather);
  const oSpeed = getEffectiveSpeed(opponent, weather);
  if (pSpeed !== oSpeed) return pSpeed > oSpeed;

  return rng.next() < 0.5;
}

export function getEffectiveSpeed(pokemon: BattlePokemon, weather?: WeatherKind): number {
  let speed = pokemon.stats.spe
    * getStatMultiplier(pokemon.statStages.spe)
    * AbilityManager.getSpeedMultiplier(pokemon, weather);

  // Paralysis cuts speed to 25% (Gen 3+ mechanic; Gen 1/2 used 50%)
  if (pokemon.status === 'Paralysis' && pokemon.ability !== 'Quick Feet') {
    speed *= 0.25;
  }

  return speed;
}
