import { BattlePokemon, Move } from '../../types/Pokemon';
import { getEffectiveness } from '../../types/TypeChart';
import { getHardAIMove } from './HardAI';
import { usableMoves } from './common';

/**
 * Cheating (Omniscient) AI:
 * 1. Inspects the player's selected move before making a choice.
 * 2. If the player's move is super effective (> 1.0x) against the AI Pokémon's types:
 *    - 80% chance: Choose defensive or optimal counterplay:
 *      - Charmander: Smokescreen (lower player accuracy to dodge) or Growl.
 *      - Squirtle: Withdraw (raise Defense to absorb physical hits) or Tail Whip.
 *      - Bulbasaur: Leech Seed (steal HP for recovery) or Growl.
 *    - 20% chance: Run normal Hard AI logic.
 * 3. If the player's move is not super effective: Run normal Hard AI logic.
 */
export function getCheatingAIMove(
  aiPokemon: BattlePokemon,
  playerPokemon: BattlePokemon,
  playerSelectedMove: Move
): Move {
  const moves = usableMoves(aiPokemon);

  // Check if player's move is super effective against AI
  const effectiveness = getEffectiveness(playerSelectedMove.type, aiPokemon.types);
  const isSuperEffective = effectiveness > 1.0;

  if (isSuperEffective && Math.random() < 0.8) {
    // 80% chance: Pick defensive or optimal counterplay based on AI Pokémon
    if (aiPokemon.baseId === 'charmander') {
      // Charmander defensive option: Smokescreen (lower accuracy)
      const smokescreenMove = moves.find((m) => m.id === 'smokescreen');
      if (smokescreenMove && playerPokemon.statStages.accuracy > -3) {
        return smokescreenMove;
      }
    } else if (aiPokemon.baseId === 'squirtle') {
      // Squirtle defensive option: Withdraw (raise DEF)
      const withdrawMove = moves.find((m) => m.id === 'withdraw');
      if (withdrawMove && aiPokemon.statStages.def < 3) {
        return withdrawMove;
      }
    } else if (aiPokemon.baseId === 'bulbasaur') {
      // Bulbasaur defensive option: Leech Seed (saps health, recovery)
      const leechSeedMove = moves.find((m) => m.id === 'leechseed');
      if (leechSeedMove && !playerPokemon.isSeeded && !playerPokemon.types.includes('Grass')) {
        return leechSeedMove;
      }
    }

    // Fallback: If no defensive moves are applicable, find if AI has a super-effective move of its own
    for (const move of moves) {
      if (move.category === 'Status') continue;
      const aiEffectiveness = getEffectiveness(move.type, playerPokemon.types);
      if (aiEffectiveness > 1.0) {
        return move;
      }
    }
  }

  // Behave normally (Hard AI)
  return getHardAIMove(aiPokemon, playerPokemon);
}
