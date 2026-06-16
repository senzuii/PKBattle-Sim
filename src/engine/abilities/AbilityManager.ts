import { BattlePokemon, Move, MoveEffect, NonVolatileStatus, VolatileStatus, StatStages, WeatherKind } from '../../types/Pokemon';
import { ABILITIES } from '../../data/abilities';
import { FieldState } from '../battle/Field';

// Abilities that set weather the moment their holder enters the field.
const WEATHER_ON_ENTRY: Record<string, WeatherKind> = {
  'Drizzle': 'Rain',
  'Drought': 'Sun',
  'Sand Stream': 'Sandstorm',
  'Snow Warning': 'Hail',
};
const WEATHER_START_MSG: Record<WeatherKind, string> = {
  Rain: 'It started to rain!',
  Sun: 'The sunlight turned harsh!',
  Sandstorm: 'A sandstorm kicked up!',
  Hail: 'It started to hail!',
};

/**
 * Dispatches all ability hooks to the data-driven ABILITIES registry.
 * To add a new ability, add an entry to src/data/abilities/list/ and export it from src/data/abilities.ts.
 */
export const AbilityManager = {
  onSwitchIn: (pokemon: BattlePokemon, opponent: BattlePokemon, logs: string[], field?: FieldState) => {
    ABILITIES[pokemon.ability]?.onSwitchIn?.(pokemon, opponent, logs);

    // Weather-setting abilities (Drizzle, Drought, …) — Gen 3: stays until changed.
    const w = WEATHER_ON_ENTRY[pokemon.ability];
    if (w && field && field.weather?.kind !== w) {
      field.weather = { kind: w, turnsLeft: 9999 };
      logs.push(`[${pokemon.name}'s ${pokemon.ability}]`);
      logs.push(WEATHER_START_MSG[w]);
    }
  },

  /** False when a foe-inflicted drop of `stat` is blocked (Clear Body, Hyper Cutter…). */
  canLowerStat: (pokemon: BattlePokemon, stat: keyof StatStages): boolean => {
    return ABILITIES[pokemon.ability]?.canLowerStat?.(pokemon, stat) ?? true;
  },

  getSpeedMultiplier: (pokemon: BattlePokemon, weather?: string): number => {
    return ABILITIES[pokemon.ability]?.getSpeedMultiplier?.(pokemon, weather) ?? 1.0;
  },

  getStatMultiplier: (pokemon: BattlePokemon, stat: 'atk' | 'def' | 'spa' | 'spd'): number => {
    return ABILITIES[pokemon.ability]?.getStatMultiplier?.(pokemon, stat) ?? 1.0;
  },

  modifyBasePower: (attacker: BattlePokemon, defender: BattlePokemon, move: Move, basePower: number): number => {
    let power = basePower;
    // Attacker ability can boost power
    power = ABILITIES[attacker.ability]?.modifyBasePower?.(attacker, defender, move, power) ?? power;
    // Defender ability can reduce power (e.g. Thick Fat)
    power = ABILITIES[defender.ability]?.modifyBasePower?.(attacker, defender, move, power) ?? power;
    return power;
  },

  modifyAccuracy: (pokemon: BattlePokemon, accuracy: number): number => {
    return ABILITIES[pokemon.ability]?.modifyAccuracy?.(pokemon, accuracy) ?? accuracy;
  },

  checkAccuracyOverride: (attacker: BattlePokemon, defender: BattlePokemon): boolean | undefined => {
    return (
      ABILITIES[attacker.ability]?.checkAccuracyOverride?.(attacker, defender) ??
      ABILITIES[defender.ability]?.checkAccuracyOverride?.(attacker, defender)
    );
  },

  interceptMove: (attacker: BattlePokemon, defender: BattlePokemon, move: Move, logs: string[]): boolean => {
    if (move.category === 'Status') return false;
    return ABILITIES[defender.ability]?.interceptMove?.(attacker, defender, move, logs) ?? false;
  },

  onContactHit: (attacker: BattlePokemon, defender: BattlePokemon, move: Move, logs: string[]) => {
    if (move.category !== 'Physical') return;
    if (attacker.currentHp <= 0 || defender.currentHp <= 0) return;
    ABILITIES[defender.ability]?.onContactHit?.(attacker, defender, move, logs);
  },

  onEndOfTurn: (pokemon: BattlePokemon, logs: string[]) => {
    if (pokemon.currentHp <= 0) return;
    ABILITIES[pokemon.ability]?.onEndOfTurn?.(pokemon, logs);
  },

  canApplyStatus: (pokemon: BattlePokemon, status: NonVolatileStatus | VolatileStatus): boolean => {
    return ABILITIES[pokemon.ability]?.canApplyStatus?.(pokemon, status) ?? true;
  },

  /**
   * Final proc chance for a chance-based move effect.
   * Serene Grace (attacker) doubles it; Shield Dust (defender) blocks effects
   * that target the defender.
   */
  modifyEffectChance: (attacker: BattlePokemon, defender: BattlePokemon, effect: MoveEffect, baseChance: number): number => {
    let chance = baseChance;
    chance = ABILITIES[attacker.ability]?.modifySecondaryChance?.(attacker, chance, 'attacker') ?? chance;
    if (effect.target === 'opponent') {
      chance = ABILITIES[defender.ability]?.modifySecondaryChance?.(defender, chance, 'defender') ?? chance;
    }
    return chance;
  },
};
