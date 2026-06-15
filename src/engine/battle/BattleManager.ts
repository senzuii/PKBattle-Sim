/**
 * BattleManager.ts
 *
 * Responsible for Pokémon generation only.
 * Turn execution is now handled by TurnEngine.ts.
 *
 * Public API is preserved — consumers that import executeTurn or
 * TurnExecutionResult from this file will still work.
 */

import { BattlePokemon, PokemonBase, Move, Stats } from '../../types/Pokemon';
import { MOVES } from '../../data/moves';
import { isMoveLegalForPokemon } from '../learnset/LearnsetChecker';

// ── Re-export the turn engine so existing imports keep working ────────────────
export { executeTurn, executeBattleTurn, resetVolatileState } from './TurnEngine';
export type { TurnExecutionResult } from './TurnEngine';
export type { BattleAction } from './Actions';
export { getMovePriority } from './TurnOrder';
export { createField, cloneField, applyEntryHazards } from './Field';
export type { FieldState } from './Field';

// ─────────────────────────────────────────────────────────────────────────────
// IV / EV Generation
// ─────────────────────────────────────────────────────────────────────────────
export function generateRandomIVs(): Stats {
  return {
    hp:  Math.floor(Math.random() * 32),
    atk: Math.floor(Math.random() * 32),
    def: Math.floor(Math.random() * 32),
    spa: Math.floor(Math.random() * 32),
    spd: Math.floor(Math.random() * 32),
    spe: Math.floor(Math.random() * 32),
  };
}

export function generateRandomEVs(): Stats {
  const evs: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  let remaining = 510;
  const keys: (keyof Stats)[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

  while (remaining > 0) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    if (evs[key] < 252) {
      const max = Math.min(252 - evs[key], remaining);
      if (max <= 0) continue;
      const add = Math.min(4 * (Math.floor(Math.random() * 10) + 1), max);
      evs[key] += add;
      remaining -= add;
    }
    if (Object.values(evs).reduce((a, b) => a + b, 0) >= 510) break;
  }
  return evs;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat Calculation (Gen 3+ formula)
// ─────────────────────────────────────────────────────────────────────────────
export function calculateStats(base: Stats, ivs: Stats, evs: Stats, level: number): Stats {
  const norm = (b: number, iv: number, ev: number) =>
    Math.floor(((2 * b + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  const hp = (b: number, iv: number, ev: number) =>
    Math.floor(((2 * b + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;

  return {
    hp:  hp(base.hp,  ivs.hp,  evs.hp),
    atk: norm(base.atk, ivs.atk, evs.atk),
    def: norm(base.def, ivs.def, evs.def),
    spa: norm(base.spa, ivs.spa, evs.spa),
    spd: norm(base.spd, ivs.spd, evs.spd),
    spe: norm(base.spe, ivs.spe, evs.spe),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Move Selection Helper — picks 1 STAB, 1 Status, 2 Randoms from the pool
// ─────────────────────────────────────────────────────────────────────────────
function selectTemplateMoves(pool: Move[], types: string[]): Move[] {
  if (pool.length <= 4) return pool;

  const stabPool   = pool.filter(m => m.category !== 'Status' && types.includes(m.type));
  const statusPool = pool.filter(m => m.category === 'Status');
  const selected: Move[] = [];
  const remaining = new Set(pool);

  const pickFrom = (candidates: Move[]) => {
    const valid = candidates.filter(m => remaining.has(m));
    if (valid.length > 0) {
      const pick = valid[Math.floor(Math.random() * valid.length)];
      selected.push(pick);
      remaining.delete(pick);
    } else {
      pickAny();
    }
  };

  const pickAny = () => {
    if (remaining.size > 0) {
      const arr  = Array.from(remaining);
      const pick = arr[Math.floor(Math.random() * arr.length)];
      selected.push(pick);
      remaining.delete(pick);
    }
  };

  pickFrom(stabPool);                // 1 STAB
  pickFrom(statusPool);              // 1 Status
  pickAny();                         // Random 1
  pickAny();                         // Random 2

  return selected;
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate a fully-initialised BattlePokemon for a random encounter
// ─────────────────────────────────────────────────────────────────────────────
export function generatePokemon(
  base: PokemonBase,
  level: number = 7,
  gen: number | null = null,
): BattlePokemon {
  const ivs   = generateRandomIVs();
  const evs   = generateRandomEVs();
  const stats = calculateStats(base.baseStats, ivs, evs, level);

  // Build the legal move pool for this species at this level/gen
  let entries = base.learnset
    .filter(e => e.level <= level)
    .filter(e => isMoveLegalForPokemon(base.id, e.moveId, gen));

  if (entries.length === 0) {
    entries = base.learnset.filter(e => isMoveLegalForPokemon(base.id, e.moveId, gen));
  }

  let moves: Move[] = entries
    .map(e => MOVES[e.moveId])
    .filter((m): m is Move => !!m);

  if (moves.length === 0) moves = [MOVES['tackle']].filter(Boolean);

  moves = selectTemplateMoves(moves, base.types);
  // Initialise currentPp for every move
  moves = moves.map(m => ({ ...m, currentPp: m.pp }));

  return {
    id:               `${base.id}_${Math.random().toString(36).substr(2, 9)}`,
    baseId:           base.id,
    name:             base.name,
    types:            base.types,
    level,
    ivs,
    evs,
    stats,
    currentHp:        stats.hp,
    maxHp:            stats.hp,
    statStages:       { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0 },
    isSeeded:         false,
    ability:          base.abilities[0] || 'None',
    moves,
    volatileStatuses: [],
    statusTurns:      0,
    confusionTurns:   0,
  };
}
