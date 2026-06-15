import { Learnsets } from '../../../learnsets/learnsets';
import { Moves } from '../../../learnsets/moves';
import { Pokedex } from '../../../learnsets/pokedex';

/**
 * Returns the generation number when a move was introduced based on its Pokédex number.
 */
export function getMoveGeneration(num: number): number {
  if (num <= 0) return 9; // Non-standard or special moves
  if (num <= 165) return 1;
  if (num <= 251) return 2;
  if (num <= 354) return 3;
  if (num <= 467) return 4;
  if (num <= 559) return 5;
  if (num <= 621) return 6;
  if (num <= 742) return 7;
  if (num <= 826) return 8;
  return 9;
}

/**
 * Checks recursively if a Pokémon (or its pre-evolutions) can learn a move in a specific generation.
 */
export function isMoveLegalForPokemon(
  pokemonId: string,
  moveId: string,
  gen: number | null
): boolean {
  const normPokemonId = pokemonId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normMoveId = moveId.toLowerCase().replace(/[^a-z0-9]/g, '');

  const moveMeta = Moves[normMoveId];
  if (!moveMeta) {
    // If move metadata is not found, default to false
    return false;
  }

  // If a generation is selected, the move itself must have existed in that generation
  if (gen !== null) {
    const moveGen = getMoveGeneration(moveMeta.num);
    if (moveGen > gen) {
      return false;
    }
  }

  // Check learnset sources for this species
  const learnset = Learnsets[normPokemonId]?.learnset;
  const sources = learnset ? learnset[normMoveId] : undefined;

  if (sources && sources.length > 0) {
    if (gen === null) {
      // In "All Games" mode, if it learns it at all, it's legal
      return true;
    }

    if (gen === 1 || gen === 2) {
      // Gen 1 & Gen 2: Learnset data in this file starts at Gen 3.
      // Gen 1/2 availability is represented by Virtual Console tags ("7V" or "8V")
      return sources.some((src) => src === '7V' || src === '8V');
    }

    // Gen 3 to 9:
    // Can be learned directly in any generation from 3 up to `gen`,
    // or transferred up from Gen 1/2 (represented by "7V" or "8V")
    return sources.some((src) => {
      if (src === '7V' || src === '8V') return true;
      const firstChar = src.charAt(0);
      const srcGen = parseInt(firstChar, 10);
      return !isNaN(srcGen) && srcGen >= 3 && srcGen <= gen;
    });
  }

  // If not learnable by this stage, check pre-evolutions recursively
  const speciesMeta = Pokedex[normPokemonId];
  if (speciesMeta && speciesMeta.prevo) {
    const prevoId = speciesMeta.prevo.toLowerCase().replace(/[^a-z0-9]/g, '');
    return isMoveLegalForPokemon(prevoId, normMoveId, gen);
  }

  return false;
}

/**
 * Validates a list of move IDs for a Pokémon, returning overall status and detailed reasons for any failures.
 */
export function validatePokemonLegality(
  pokemonId: string,
  moveIds: string[],
  gen: number | null
): { isLegal: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const pokemonName = Pokedex[pokemonId.toLowerCase()]?.name || pokemonId;

  // Filter out empty moves
  const activeMoves = moveIds.filter(Boolean);

  if (activeMoves.length === 0) {
    reasons.push(`${pokemonName} must have at least one move.`);
  }

  for (const moveId of activeMoves) {
    const isLegal = isMoveLegalForPokemon(pokemonId, moveId, gen);
    if (!isLegal) {
      const moveMeta = Moves[moveId.toLowerCase()];
      const moveName = moveMeta ? moveMeta.name : moveId;
      
      if (gen === null) {
        reasons.push(`${pokemonName} cannot learn ${moveName} in any game.`);
      } else {
        const moveMetaInfo = Moves[moveId.toLowerCase()];
        if (moveMetaInfo && getMoveGeneration(moveMetaInfo.num) > gen) {
          reasons.push(
            `${moveName} did not exist in Gen ${gen} (introduced in Gen ${getMoveGeneration(moveMetaInfo.num)}).`
          );
        } else {
          reasons.push(
            `${pokemonName} cannot learn ${moveName} in Gen ${gen}.`
          );
        }
      }
    }
  }

  return {
    isLegal: reasons.length === 0,
    reasons,
  };
}
