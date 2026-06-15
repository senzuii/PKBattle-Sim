import { BattlePokemon, Move } from '../../types/Pokemon';
import { usableMoves } from './common';

/**
 * Easy AI selects a move 100% randomly (among moves with PP remaining).
 */
export function getEasyAIMove(aiPokemon: BattlePokemon): Move {
  const moves = usableMoves(aiPokemon);
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}
