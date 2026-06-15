import { BattlePokemon, Move } from '../../types/Pokemon';
import { usableMoves, bestDamageMove, guaranteedKoMove } from './common';

/**
 * Hard AI plays strategically:
 * 1. Checks if it can KO the player this turn.
 * 2. Uses status moves like Leech Seed, Smokescreen, or stat buffs/debuffs when appropriate.
 * 3. Falls back to dealing the maximum damage possible.
 */
export function getHardAIMove(aiPokemon: BattlePokemon, playerPokemon: BattlePokemon): Move {
  const moves = usableMoves(aiPokemon);

  // 1. Look for a finishing blow (guaranteed KO on the minimum roll)
  const koMove = guaranteedKoMove(aiPokemon, playerPokemon, moves);
  if (koMove) return koMove;

  // 2. Strategic Status Moves
  // Leech Seed: Apply if target is not seeded and target is not Grass-type
  const leechSeedMove = moves.find((m) => m.id === 'leechseed');
  if (
    leechSeedMove &&
    !playerPokemon.isSeeded &&
    !playerPokemon.types.includes('Grass')
  ) {
    return leechSeedMove;
  }

  // Smokescreen: Lower target accuracy if it is not already heavily debuffed
  const smokescreenMove = moves.find((m) => m.id === 'smokescreen');
  if (
    smokescreenMove &&
    playerPokemon.statStages.accuracy > -3 &&
    Math.random() < 0.4
  ) {
    return smokescreenMove;
  }

  // Withdraw: Raise defense if defense is not already highly boosted and AI has decent HP
  const withdrawMove = moves.find((m) => m.id === 'withdraw');
  if (
    withdrawMove &&
    aiPokemon.statStages.def < 3 &&
    aiPokemon.currentHp > aiPokemon.maxHp * 0.4 &&
    Math.random() < 0.4
  ) {
    return withdrawMove;
  }

  // Growl: Lower player Attack if not heavily debuffed
  const growlMove = moves.find((m) => m.id === 'growl');
  if (
    growlMove &&
    playerPokemon.statStages.atk > -3 &&
    Math.random() < 0.3
  ) {
    return growlMove;
  }

  // Tail Whip: Lower player Defense if not heavily debuffed
  const tailWhipMove = moves.find((m) => m.id === 'tailwhip');
  if (
    tailWhipMove &&
    playerPokemon.statStages.def > -3 &&
    Math.random() < 0.3
  ) {
    return tailWhipMove;
  }

  // 3. Max Damage Move
  const best = bestDamageMove(aiPokemon, playerPokemon, moves);
  if (best) return best.move;

  // 4. Default to random fallback
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}
