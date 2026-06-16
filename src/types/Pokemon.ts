export type PokeType = 'Bug' | 'Dark' | 'Dragon' | 'Electric' | 'Fairy' | 'Fighting' | 'Fire' | 'Flying' | 'Ghost' | 'Grass' | 'Ground' | 'Ice' | 'Normal' | 'Poison' | 'Psychic' | 'Rock' | 'Steel' | 'Water';

export type MoveCategory = 'Physical' | 'Special' | 'Status';

export type NonVolatileStatus = 'Burn' | 'Freeze' | 'Paralysis' | 'Poison' | 'Toxic' | 'Sleep';
export type VolatileStatus = 'Confusion' | 'Flinch' | 'Protected' | 'Enduring' | 'Infatuation';

export type Gender = 'M' | 'F' | 'N';

export type Nature =
  | 'Hardy' | 'Lonely' | 'Brave' | 'Adamant' | 'Naughty'
  | 'Bold' | 'Docile' | 'Relaxed' | 'Impish' | 'Lax'
  | 'Timid' | 'Hasty' | 'Serious' | 'Jolly' | 'Naive'
  | 'Modest' | 'Mild' | 'Quiet' | 'Bashful' | 'Rash'
  | 'Calm' | 'Gentle' | 'Sassy' | 'Careful' | 'Quirky';

export type WeatherKind = 'Sun' | 'Rain' | 'Sandstorm' | 'Hail';
export type HazardKind = 'stealthrock' | 'spikes' | 'toxicspikes';

export type ScreenKind = 'reflect' | 'lightscreen';

export interface MoveEffect {
  type: 'stat_change' | 'leech_seed' | 'transform' | 'status' | 'volatile_status' | 'heal' | 'drain' | 'recoil' | 'fixed_damage'
      | 'weather' | 'hazard' | 'delayed_damage' | 'wish' | 'screen' | 'force_switch' | 'trap';
  target: 'self' | 'opponent';
  stat?: 'atk' | 'def' | 'spa' | 'spd' | 'spe' | 'accuracy' | 'evasion';
  stages?: number; // e.g., -1 to lower, +1 to raise
  status?: NonVolatileStatus;
  volatileStatus?: VolatileStatus;
  chance?: number; // 0 to 100, for secondary effects
  percent?: number; // e.g., 50 for 50%, 75 for 75%
  amount?: number; // flat value for fixed damage
  useLevel?: boolean; // use attacker's level for fixed damage
  weather?: WeatherKind; // for 'weather' effects
  hazard?: HazardKind; // for 'hazard' effects
  turns?: number; // delay for 'delayed_damage' (end-of-turn countdown, default 2)
  screen?: ScreenKind; // for 'screen' effects
}

export interface Move {
  id: string;
  name: string;
  type: PokeType;
  category: MoveCategory;
  power: number;
  accuracy: number; // 0 to 100 percentage
  pp: number;
  currentPp?: number; // tracks remaining PP in battle (defaults to pp if not set)
  priority?: number; // optional explicit priority of the move (e.g. +1, -5)
  effect?: MoveEffect;
  secondaryEffect?: MoveEffect; // secondary effect (e.g. recoil on a move that also burns)
  description: string;
  multiHit?: [number, number];
  multiTurn?: [number, number];
  critRatio?: number; // 1 for normal, 2+ for high
  hasAfterEffect?: boolean;
  flags?: Record<string, boolean>;
}

export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface StatStages {
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
  accuracy: number;
  evasion: number;
}

export interface PokemonBase {
  id: string;
  name: string;
  types: PokeType[];
  baseStats: Stats;
  abilities: string[];
  learnset: { level: number; moveId: string }[];
}

export interface CustomPokemon {
  speciesId: string; // 'bulbasaur' | 'charmander' | 'squirtle'
  level: number;
  ability: string;
  moves: string[]; // array of up to 4 move IDs
  ivs: Stats;
  evs: Stats;
  nature?: Nature;
  heldItem?: string;
}

export interface BattlePokemon {
  id: string; // unique instance ID for this specific battle
  baseId: string; // bulbasaur, charmander, squirtle
  name: string;
  types: PokeType[];
  gender?: Gender;
  nature?: Nature;
  level: number;
  ability: string;
  ivs: Stats;
  evs: Stats;
  stats: Stats; // calculated stats
  heldItem?: string;
  currentHp: number;
  maxHp: number;
  statStages: StatStages;
  isSeeded: boolean;
  status?: NonVolatileStatus;
  statusTurns?: number;
  toxicCounter?: number; // badly-poisoned turn counter (separate from sleep's statusTurns)
  volatileStatuses: VolatileStatus[];
  confusionTurns?: number;
  protectCounter?: number; // consecutive Protect/Detect/Endure uses (halves success rate)
  lockedMove?: {
    moveId: string;
    turn: number; // For 2-turn or multi-turn moves
    invulnerable?: boolean;
    remainingTurns?: number; // For outrage/petaldance
    isRecharge?: boolean;    // Must recharge next turn (Hyper Beam etc.)
  };
  substituteHp?: number; // HP of the active substitute doll (undefined = no sub)
  moves: Move[];
  lastMoveUsed?: string; // moveId of the last move this Pokémon used (for Mimic)
  mimicBackup?: { index: number; move: Move }; // original move slot replaced by Mimic, restored on switch-out
  trap?: { turnsLeft: number; moveName: string }; // Wrap/Bind/etc. — can't switch, chip damage each turn
  taunted?: number;                               // Taunt: turns left where status moves are blocked
  disabled?: { moveId: string; turnsLeft: number }; // Disable: a move that can't be used
  encore?: { moveId: string; turnsLeft: number };   // Encore: forced to repeat this move
  torment?: boolean;                              // Torment: can't use the same move twice in a row
}

export type BattleDifficulty = 'easy' | 'medium' | 'hard' | 'cheating';

export interface BattleSummary {
  winner: 'player' | 'opponent' | null;
  turnsPlayed: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  log: string[];
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  onSwitchIn?: (pokemon: BattlePokemon, opponent: BattlePokemon, logs: string[]) => void;
  getSpeedMultiplier?: (pokemon: BattlePokemon, weather?: string) => number;
  getStatMultiplier?: (pokemon: BattlePokemon, stat: 'atk' | 'def' | 'spa' | 'spd') => number;
  modifyBasePower?: (attacker: BattlePokemon, defender: BattlePokemon, move: Move, basePower: number) => number;
  modifyAccuracy?: (pokemon: BattlePokemon, accuracy: number) => number;
  checkAccuracyOverride?: (attacker: BattlePokemon, defender: BattlePokemon) => boolean | undefined;
  interceptMove?: (attacker: BattlePokemon, defender: BattlePokemon, move: Move, logs: string[]) => boolean;
  onContactHit?: (attacker: BattlePokemon, defender: BattlePokemon, move: Move, logs: string[]) => void;
  onEndOfTurn?: (pokemon: BattlePokemon, logs: string[]) => void;
  canApplyStatus?: (pokemon: BattlePokemon, status: NonVolatileStatus | VolatileStatus) => boolean;
  /** Returns false to block a foe-inflicted drop of the given stat (Clear Body, Hyper Cutter…). */
  canLowerStat?: (pokemon: BattlePokemon, stat: keyof StatStages) => boolean;
  /**
   * Adjusts the proc chance of chance-based move effects.
   * role 'attacker': the ability holder is using the move (Serene Grace).
   * role 'defender': the effect targets the ability holder (Shield Dust).
   */
  modifySecondaryChance?: (pokemon: BattlePokemon, chance: number, role: 'attacker' | 'defender') => number;
}
