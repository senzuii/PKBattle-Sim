import { BattlePokemon, Move } from '../../types/Pokemon';
import { usableMoves, bestDamageMove, guaranteedKoMove, AIContext } from './common';

/**
 * Medium AI prioritizes a finishing blow, otherwise has a 50% chance to choose
 * the highest damage move and a 50% chance to pick at random.
 */
export function getMediumAIMove(aiPokemon: BattlePokemon, playerPokemon: BattlePokemon, ctx: AIContext = {}): Move {
  const moves = usableMoves(aiPokemon);

  // 1. Look for a finishing blow (guaranteed KO on the minimum roll)
  const koMove = guaranteedKoMove(aiPokemon, playerPokemon, moves, ctx);
  if (koMove) return koMove;

  // 2. 50% chance to pick the highest damage move
  if (Math.random() < 0.5) {
    const best = bestDamageMove(aiPokemon, playerPokemon, moves, ctx);
    if (best) return best.move;
  }

  // 3. Fallback to random move
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}
