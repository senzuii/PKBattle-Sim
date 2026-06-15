import { POKEMON } from '../pokemon';
import { GEN1_DEX } from './gen1';
import { GEN2_DEX } from './gen2';
import { GEN3_DEX } from './gen3';
import { Pokedex } from '../../../learnsets/pokedex';

/** Sort species IDs by national dex number (ascending). Unknown = placed last. */
function byNationalDex(a: string, b: string): number {
  const normA = a.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normB = b.toLowerCase().replace(/[^a-z0-9]/g, '');
  const numA = Pokedex[normA]?.num ?? 99999;
  const numB = Pokedex[normB]?.num ?? 99999;
  return numA - numB;
}

/**
 * Per-generation Pokémon pools.
 *
 * Each entry is the COMPLETE regional Pokédex for that generation
 * (not a delta — Gen 2 already contains all 251 Pokémon in Johto dex order).
 *
 * - Gen 1 → Kanto dex   (#1–151 national, 151 entries)
 * - Gen 2 → Johto dex   (251 entries, Johto regional order)
 * - Gen N → add GEN{N}_DEX here and register it in GEN_DEX_MAP below
 */
const GEN_DEX_MAP: Record<number, string[]> = {
  1: GEN1_DEX,
  2: GEN2_DEX,
  3: GEN3_DEX,
  // 4: GEN4_DEX,
  // ...
};

/** Lazy cache so we only filter once per gen. */
const _poolCache = new Map<number | null, string[]>();

/**
 * Returns the species IDs (matching keys in the POKEMON record) that are
 * legal for the given generation.
 *
 * @param gen - The selected generation number, or null for "All Games".
 */
export function getPokemonPoolForGen(gen: number | null): string[] {
  if (_poolCache.has(gen)) return _poolCache.get(gen)!;

  let pool: string[];

  if (gen === null) {
    // "All Games" — all implemented species, sorted by national dex number
    pool = Object.keys(POKEMON).sort(byNationalDex);
  } else {
    const dex = GEN_DEX_MAP[gen];
    if (dex) {
      // Keep only species that actually exist in the POKEMON record.
      // Do NOT sort by national dex here; preserve the file's explicitly defined regional order!
      pool = dex.filter(id => POKEMON[id] !== undefined);
    } else {
      // Unknown gen — fall back to all species sorted by national dex
      pool = Object.keys(POKEMON).sort(byNationalDex);
    }
  }

  _poolCache.set(gen, pool);
  return pool;
}

/**
 * Returns true if a Pokémon species is selectable in the given generation.
 */
export function isPokemonInGen(speciesId: string, gen: number | null): boolean {
  return getPokemonPoolForGen(gen).includes(speciesId);
}

/** The highest generation number we have a regional dex for. */
export const MAX_IMPLEMENTED_GEN = Math.max(...Object.keys(GEN_DEX_MAP).map(Number));
