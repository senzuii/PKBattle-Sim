/**
 * Field.ts
 *
 * Battle-level state that lives outside the two active Pokémon: weather,
 * per-side entry hazards, pending delayed attacks (Future Sight), and Wish.
 * The engine clones the field at the start of each turn, mutates the clone,
 * and returns it in the TurnExecutionResult — same contract as the combatants.
 */

import { BattlePokemon, WeatherKind } from '../../types/Pokemon';
import { getEffectiveness } from '../../types/TypeChart';
import { AbilityManager } from '../abilities/AbilityManager';

// ─────────────────────────────────────────────────────────────────────────────
// State shapes
// ─────────────────────────────────────────────────────────────────────────────
export interface WeatherState {
  kind: WeatherKind;
  /** Decremented at end of turn; weather clears when it reaches 0. */
  turnsLeft: number;
}

export interface HazardLayers {
  stealthRock: boolean;
  /** 0–3 layers (1/8, 1/6, 1/4 of max HP). */
  spikes: number;
  /** 0–2 layers (poison, toxic). */
  toxicSpikes: number;
}

/** A Future Sight–style attack aimed at this side's active slot. */
export interface DelayedAttack {
  moveName: string;
  /** Decremented at end of turn; lands when it reaches 0. */
  turnsLeft: number;
  /** Damage snapshotted when the attack was foreseen. */
  damage: number;
}

export interface PendingWish {
  turnsLeft: number;
  /** Flat HP restored (half the wisher's max HP). */
  amount: number;
  wisher: string;
}

export interface ScreenLayers {
  /** Turns remaining; 0 = inactive. Halves incoming physical damage. */
  reflect: number;
  /** Turns remaining; 0 = inactive. Halves incoming special damage. */
  lightScreen: number;
}

/** Everything that targets one side of the field, persisting across switches. */
export interface SideState {
  hazards: HazardLayers;
  screens: ScreenLayers;
  delayed?: DelayedAttack;
  wish?: PendingWish;
}

export interface FieldState {
  weather?: WeatherState;
  player: SideState;
  opponent: SideState;
}

// ─────────────────────────────────────────────────────────────────────────────
// Construction / cloning
// ─────────────────────────────────────────────────────────────────────────────
const emptySide = (): SideState => ({
  hazards: { stealthRock: false, spikes: 0, toxicSpikes: 0 },
  screens: { reflect: 0, lightScreen: 0 },
});

export function createField(): FieldState {
  return { player: emptySide(), opponent: emptySide() };
}

export function cloneField(src: FieldState): FieldState {
  return {
    weather: src.weather ? { ...src.weather } : undefined,
    player: {
      hazards: { ...src.player.hazards },
      screens: { ...src.player.screens },
      delayed: src.player.delayed ? { ...src.player.delayed } : undefined,
      wish:    src.player.wish    ? { ...src.player.wish }    : undefined,
    },
    opponent: {
      hazards: { ...src.opponent.hazards },
      screens: { ...src.opponent.screens },
      delayed: src.opponent.delayed ? { ...src.opponent.delayed } : undefined,
      wish:    src.opponent.wish    ? { ...src.opponent.wish }    : undefined,
    },
  };
}

export function sideOf(field: FieldState, isPlayer: boolean): SideState {
  return isPlayer ? field.player : field.opponent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather helpers
// ─────────────────────────────────────────────────────────────────────────────
const WEATHER_NEGATORS = new Set(['Cloud Nine', 'Air Lock']);

/**
 * The weather both combatants actually experience. Cloud Nine / Air Lock on
 * either active Pokémon suppresses all weather effects (the weather itself
 * keeps ticking down).
 */
export function effectiveWeather(
  field: FieldState,
  a: BattlePokemon,
  b: BattlePokemon,
): WeatherKind | undefined {
  if (!field.weather) return undefined;
  if (WEATHER_NEGATORS.has(a.ability) || WEATHER_NEGATORS.has(b.ability)) return undefined;
  return field.weather.kind;
}

export const WEATHER_START_MESSAGES: Record<WeatherKind, string> = {
  Sun:       'The sunlight turned harsh!',
  Rain:      'It started to rain!',
  Sandstorm: 'A sandstorm kicked up!',
  Hail:      'It started to hail!',
};

export const WEATHER_END_MESSAGES: Record<WeatherKind, string> = {
  Sun:       'The sunlight faded.',
  Rain:      'The rain stopped.',
  Sandstorm: 'The sandstorm subsided.',
  Hail:      'The hail stopped.',
};

/** Types that take no chip damage from the given weather. */
export function isImmuneToWeatherChip(pokemon: BattlePokemon, weather: WeatherKind): boolean {
  if (weather === 'Sandstorm') {
    return pokemon.types.some(t => t === 'Rock' || t === 'Ground' || t === 'Steel');
  }
  if (weather === 'Hail') {
    return pokemon.types.includes('Ice');
  }
  return true; // Sun and Rain deal no chip damage
}

// ─────────────────────────────────────────────────────────────────────────────
// Entry hazards
// ─────────────────────────────────────────────────────────────────────────────
function isGrounded(pokemon: BattlePokemon): boolean {
  return !pokemon.types.includes('Flying') && pokemon.ability !== 'Levitate';
}

const SPIKES_FRACTION = [0, 1 / 8, 1 / 6, 1 / 4];

/**
 * Applies this side's entry hazards to a Pokémon switching in. Mutates the
 * incoming Pokémon (HP, status) and, for an absorbed Toxic Spikes layer, the
 * hazard state itself. Hazard damage bypasses Substitute and Sturdy.
 */
export function applyEntryHazards(
  incoming: BattlePokemon,
  hazards: HazardLayers,
  logs: string[],
): void {
  // Stealth Rock — typed Rock damage, 1/8 base, hits everything
  if (hazards.stealthRock && incoming.currentHp > 0) {
    const eff = getEffectiveness('Rock', incoming.types);
    const dmg = Math.max(1, Math.floor((incoming.maxHp / 8) * eff));
    incoming.currentHp = Math.max(0, incoming.currentHp - dmg);
    logs.push(`Pointed stones dug into ${incoming.name}!`);
    logs.push(`${incoming.name} took ${dmg} damage!`);
  }

  // Spikes — grounded Pokémon only
  if (hazards.spikes > 0 && incoming.currentHp > 0 && isGrounded(incoming)) {
    const fraction = SPIKES_FRACTION[Math.min(hazards.spikes, 3)];
    const dmg = Math.max(1, Math.floor(incoming.maxHp * fraction));
    incoming.currentHp = Math.max(0, incoming.currentHp - dmg);
    logs.push(`${incoming.name} was hurt by the spikes!`);
    logs.push(`${incoming.name} took ${dmg} damage!`);
  }

  // Toxic Spikes — grounded only; grounded Poison-types absorb them
  if (hazards.toxicSpikes > 0 && incoming.currentHp > 0 && isGrounded(incoming)) {
    if (incoming.types.includes('Poison')) {
      hazards.toxicSpikes = 0;
      logs.push(`${incoming.name} absorbed the toxic spikes!`);
    } else if (
      !incoming.status &&
      !incoming.types.includes('Steel') &&
      AbilityManager.canApplyStatus(incoming, 'Poison')
    ) {
      if (hazards.toxicSpikes >= 2) {
        incoming.status = 'Toxic';
        incoming.toxicCounter = 0;
        logs.push(`${incoming.name} was badly poisoned by the toxic spikes!`);
      } else {
        incoming.status = 'Poison';
        logs.push(`${incoming.name} was poisoned by the toxic spikes!`);
      }
    }
  }
}
