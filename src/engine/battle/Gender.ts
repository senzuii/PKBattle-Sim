import { Gender } from '../../types/Pokemon';
import { Pokedex } from '../../../learnsets/pokedex';
import { BattleRng, defaultRng } from './Random';

/**
 * Rolls a Pokémon's gender from its species data:
 *  - fixed-gender species (e.g. Miltank "F", Tauros "M", Magnemite "N") are returned as-is
 *  - ratio species roll M/F against their male ratio
 *  - anything else defaults to a 50/50 split
 */
export function rollGender(speciesId: string, rng: BattleRng = defaultRng): Gender {
  const norm = speciesId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const entry = (Pokedex as Record<string, any>)[norm];

  if (entry?.gender) return entry.gender as Gender; // "M" | "F" | "N"

  const ratio = entry?.genderRatio as { M: number; F: number } | undefined;
  if (ratio) {
    if (ratio.M === 0) return 'F';
    if (ratio.F === 0) return 'M';
    return rng.next() < ratio.M ? 'M' : 'F';
  }

  return rng.next() < 0.5 ? 'M' : 'F';
}

/** ♂ / ♀ symbol for display (genderless → empty). */
export function genderSymbol(gender?: Gender): string {
  return gender === 'M' ? '♂' : gender === 'F' ? '♀' : '';
}

/** Genders a species can actually be — for the team-builder picker. */
export function possibleGenders(speciesId: string): Gender[] {
  const norm = speciesId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const entry = (Pokedex as Record<string, any>)[norm];
  if (entry?.gender) return [entry.gender as Gender]; // fixed (e.g. Miltank → ['F'])
  if (entry?.genderRatio) {
    const r = entry.genderRatio as { M: number; F: number };
    if (r.M === 0) return ['F'];
    if (r.F === 0) return ['M'];
    return ['M', 'F'];
  }
  return ['M', 'F']; // default 50/50 species
}
