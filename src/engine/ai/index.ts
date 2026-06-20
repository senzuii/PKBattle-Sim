import { getEasyAIMove } from './EasyAI';
import { getMediumAIMove } from './MediumAI';
import { getHardAIMove } from './HardAI';
import { getCheatingAIMove } from './CheatingAI';
import { AIContext } from './common';
import { BattlePokemon, Move, BattleDifficulty } from '../../types/Pokemon';
import { FieldState } from '../battle/Field';

/**
 * Builds the AI's view of the field. The AI always plays the `opponent` side, so
 * its own screens are `field.opponent.screens` and its target (the player) holds
 * `field.player.screens` (which reduce the AI's damage) and `field.player.hazards`.
 */
function buildContext(field?: FieldState): AIContext {
  if (!field) return {};
  return {
    weather: field.weather?.kind,
    defenderScreens: {
      reflect:     field.player.screens.reflect > 0,
      lightScreen: field.player.screens.lightScreen > 0,
    },
    aiScreens:    field.opponent.screens,
    playerHazards: field.player.hazards,
  };
}

/**
 * Interface function that selects a move for the AI based on the specified difficulty,
 * the AI's current state, the player's current state, the player's selected move, and
 * the current field (weather / screens / hazards).
 */
export function selectAIMove(
  difficulty: BattleDifficulty,
  aiPokemon: BattlePokemon,
  playerPokemon: BattlePokemon,
  playerSelectedMove: Move,
  field?: FieldState
): Move {
  const ctx = buildContext(field);
  switch (difficulty) {
    case 'easy':
      return getEasyAIMove(aiPokemon);
    case 'medium':
      return getMediumAIMove(aiPokemon, playerPokemon, ctx);
    case 'hard':
      return getHardAIMove(aiPokemon, playerPokemon, ctx);
    case 'cheating':
      return getCheatingAIMove(aiPokemon, playerPokemon, playerSelectedMove, ctx);
    default:
      return getEasyAIMove(aiPokemon);
  }
}

export { getEasyAIMove, getMediumAIMove, getHardAIMove, getCheatingAIMove };
