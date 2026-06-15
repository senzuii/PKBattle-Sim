import { getEasyAIMove } from './EasyAI';
import { getMediumAIMove } from './MediumAI';
import { getHardAIMove } from './HardAI';
import { getCheatingAIMove } from './CheatingAI';
import { BattlePokemon, Move, BattleDifficulty } from '../../types/Pokemon';

/**
 * Interface function that selects a move for the AI based on the specified difficulty,
 * the AI's current state, the player's current state, and the player's selected move.
 */
export function selectAIMove(
  difficulty: BattleDifficulty,
  aiPokemon: BattlePokemon,
  playerPokemon: BattlePokemon,
  playerSelectedMove: Move
): Move {
  switch (difficulty) {
    case 'easy':
      return getEasyAIMove(aiPokemon);
    case 'medium':
      return getMediumAIMove(aiPokemon, playerPokemon);
    case 'hard':
      return getHardAIMove(aiPokemon, playerPokemon);
    case 'cheating':
      return getCheatingAIMove(aiPokemon, playerPokemon, playerSelectedMove);
    default:
      return getEasyAIMove(aiPokemon);
  }
}

export { getEasyAIMove, getMediumAIMove, getHardAIMove, getCheatingAIMove };
