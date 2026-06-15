import { BattlePokemon, Move } from '../../types/Pokemon';
import { estimateDamage } from '../damage/DamageCalculator';

/**
 * Moves the AI can actually use: PP remaining. Falls back to the full move
 * list if everything is out of PP (the engine treats that as Struggle-less
 * desperation — same behavior as before the rework).
 */
export function usableMoves(pokemon: BattlePokemon): Move[] {
  const withPp = pokemon.moves.filter(m => (m.currentPp ?? m.pp) > 0);
  return withPp.length > 0 ? withPp : pokemon.moves;
}

/** The damaging move with the highest average expected damage, if any. */
export function bestDamageMove(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  moves: Move[],
): { move: Move; avg: number } | null {
  let best: { move: Move; avg: number } | null = null;
  for (const move of moves) {
    if (move.category === 'Status') continue;
    const { avg } = estimateDamage(attacker, defender, move);
    if (!best || avg > best.avg) best = { move, avg };
  }
  return best && best.avg > 0 ? best : null;
}

/** A move guaranteed to KO the defender even on the minimum damage roll. */
export function guaranteedKoMove(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  moves: Move[],
): Move | null {
  for (const move of moves) {
    if (move.category === 'Status') continue;
    const { min } = estimateDamage(attacker, defender, move);
    if (min >= defender.currentHp) return move;
  }
  return null;
}
