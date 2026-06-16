import { BattlePokemon, Move, PokeType, WeatherKind } from '../../types/Pokemon';
import { getEffectiveness } from '../../types/TypeChart';
import { getStatMultiplier, getAccuracyMultiplier } from '../effects/StatStages';
import { AbilityManager } from '../abilities/AbilityManager';
import { BattleRng, defaultRng } from '../battle/Random';

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────
export interface DamageRoll {
  damage: number;
  effectiveness: number;
  hasStab: boolean;
  isCrit: boolean;
}

export interface DamageEstimate {
  min: number;
  max: number;
  avg: number;
  effectiveness: number;
}

/** Whether the defender's side has an active Reflect / Light Screen. */
export interface ScreenState {
  reflect: boolean;
  lightScreen: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Invulnerability Bypass Table
// Lists which moves can still hit a Pokémon in a semi-invulnerable state,
// and whether they deal double damage in that scenario.
// ─────────────────────────────────────────────────────────────────────────────
const INVULN_BYPASS: Record<string, { bypassMoves: string[]; doubleDmgMoves: string[] }> = {
  dig:    { bypassMoves: ['earthquake', 'magnitude'],             doubleDmgMoves: ['earthquake', 'magnitude'] },
  fly:    { bypassMoves: ['gust', 'twister', 'thunder', 'sky_uppercut'], doubleDmgMoves: ['gust', 'twister'] },
  bounce: { bypassMoves: ['gust', 'twister', 'thunder'],          doubleDmgMoves: ['gust', 'twister'] },
  dive:   { bypassMoves: ['surf', 'whirlpool'],                   doubleDmgMoves: ['surf', 'whirlpool'] },
};

// ─────────────────────────────────────────────────────────────────────────────
// Move Hit Check — rolled ONCE per move use (multi-hit moves do not re-roll)
// ─────────────────────────────────────────────────────────────────────────────
export function checkMoveHit(
  move: Move,
  attacker: BattlePokemon,
  defender: BattlePokemon,
  rng: BattleRng = defaultRng,
  weather?: WeatherKind,
): boolean {
  // Self-targeting status moves always hit
  if (move.category === 'Status') {
    const hitsOpponent = move.effect?.target === 'opponent'
      || move.secondaryEffect?.target === 'opponent';
    if (!hitsOpponent) return true;
  }

  // Semi-invulnerable state check
  if (defender.lockedMove?.invulnerable) {
    const invulnInfo = INVULN_BYPASS[defender.lockedMove.moveId];
    if (invulnInfo && invulnInfo.bypassMoves.includes(move.id)) {
      return true; // This move pierces through
    }
    // Ability override (e.g. No Guard)
    const override = AbilityManager.checkAccuracyOverride(attacker, defender);
    if (override === true) return true;
    return false; // Blocked by invulnerability
  }

  // Type immunities from abilities (Levitate, etc.)
  if (defender.ability === 'Levitate' && move.type === 'Ground') return false;

  // Ability accuracy override
  const accuracyOverride = AbilityManager.checkAccuracyOverride(attacker, defender);
  if (accuracyOverride !== undefined) return accuracyOverride;

  // Move-specific prerequisites
  if (move.id === 'dreameater' && defender.status !== 'Sleep') return false;

  // Moves that never miss
  const NEVER_MISS = new Set(['swift', 'aurasphere', 'disarmingvoice', 'feintattack', 'shadowpunch']);
  if (NEVER_MISS.has(move.id)) return true;

  // Perfect accuracy (move.accuracy === 0 means never-miss in some data formats)
  if (move.accuracy === 0) return true;

  // Weather-dependent accuracy: Thunder/Hurricane never miss in rain, 50% in sun
  let baseAccuracy = move.accuracy;
  if (move.id === 'thunder' || move.id === 'hurricane') {
    if (weather === 'Rain') return true;
    if (weather === 'Sun') baseAccuracy = 50;
  }

  // Accuracy stage × evasion stage
  const accMult  = getAccuracyMultiplier(attacker.statStages.accuracy);
  const evasMult = getAccuracyMultiplier(-defender.statStages.evasion); // evasion opposes accuracy
  let finalAcc = baseAccuracy * accMult * evasMult;
  finalAcc = AbilityManager.modifyAccuracy(attacker, finalAcc);

  return rng.next() * 100 < finalAcc;
}

// ─────────────────────────────────────────────────────────────────────────────
// Critical Hit Check
// ─────────────────────────────────────────────────────────────────────────────
export function checkCriticalHit(move: Move, rng: BattleRng = defaultRng): boolean {
  const ratio = move.critRatio ?? 1;
  const probabilities: Record<number, number> = {
    1: 1 / 24,   // default
    2: 1 / 8,    // high-crit moves
    3: 1 / 2,
    4: 1.0,      // guaranteed
  };
  const prob = probabilities[Math.min(ratio, 4)] ?? 1 / 24;
  return rng.next() < prob;
}

// ─────────────────────────────────────────────────────────────────────────────
// Compute Attack and Defense values
// Gen 3+: crits ignore negative attacker stages and positive defender stages.
// ─────────────────────────────────────────────────────────────────────────────
function computeAttackDefense(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  isCrit: boolean,
): { attackStat: number; defenseStat: number } {
  let attackStat: number;
  let defenseStat: number;

  if (move.category === 'Physical') {
    // Crits ignore negative Atk stages
    const atkStage = isCrit ? Math.max(0, attacker.statStages.atk) : attacker.statStages.atk;
    // Crits ignore positive Def stages
    const defStage = isCrit ? Math.min(0, defender.statStages.def) : defender.statStages.def;

    attackStat  = attacker.stats.atk * getStatMultiplier(atkStage) * AbilityManager.getStatMultiplier(attacker, 'atk');
    defenseStat = defender.stats.def  * getStatMultiplier(defStage)  * AbilityManager.getStatMultiplier(defender, 'def');

    // Burn halves physical attack (except Facade)
    if (attacker.status === 'Burn' && move.id !== 'facade') {
      attackStat = Math.floor(attackStat / 2);
    }
  } else {
    // Special
    const spaStage = isCrit ? Math.max(0, attacker.statStages.spa) : attacker.statStages.spa;
    const spdStage = isCrit ? Math.min(0, defender.statStages.spd) : defender.statStages.spd;

    attackStat  = attacker.stats.spa * getStatMultiplier(spaStage) * AbilityManager.getStatMultiplier(attacker, 'spa');
    defenseStat = defender.stats.spd * getStatMultiplier(spdStage)  * AbilityManager.getStatMultiplier(defender, 'spd');
  }

  return {
    attackStat,
    defenseStat: Math.max(1, defenseStat),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Invulnerability Double-Damage Multiplier
// ─────────────────────────────────────────────────────────────────────────────
function getInvulnMultiplier(defender: BattlePokemon, move: Move): number {
  if (!defender.lockedMove?.invulnerable) return 1;
  const info = INVULN_BYPASS[defender.lockedMove.moveId];
  if (info && info.doubleDmgMoves.includes(move.id)) return 2;
  return 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather interactions with the damage formula
// ─────────────────────────────────────────────────────────────────────────────
const WEATHER_BALL_TYPES: Record<WeatherKind, PokeType> = {
  Sun: 'Fire', Rain: 'Water', Sandstorm: 'Rock', Hail: 'Ice',
};

/** Weather Ball changes type and doubles in power under any weather. */
function effectiveTypeAndPower(move: Move, weather?: WeatherKind): { type: PokeType; power: number } {
  if (move.id === 'weatherball' && weather) {
    return { type: WEATHER_BALL_TYPES[weather], power: move.power * 2 };
  }
  return { type: move.type, power: move.power };
}

function weatherPowerMultiplier(moveId: string, moveType: PokeType, weather?: WeatherKind): number {
  if (!weather) return 1;
  let mult = 1;
  if (weather === 'Rain') {
    if (moveType === 'Water') mult *= 1.5;
    if (moveType === 'Fire')  mult *= 0.5;
  } else if (weather === 'Sun') {
    if (moveType === 'Fire')  mult *= 1.5;
    if (moveType === 'Water') mult *= 0.5;
  }
  // Solar Beam is weakened by any weather other than sun
  if (moveId === 'solarbeam' && weather !== 'Sun') mult *= 0.5;
  return mult;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core damage pipeline (no accuracy, no crit, no random variance).
// Returns the pre-variance damage along with effectiveness/STAB metadata.
// ─────────────────────────────────────────────────────────────────────────────
function computeCoreDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  isCrit: boolean,
  weather?: WeatherKind,
  screens?: ScreenState,
): { damage: number; effectiveness: number; hasStab: boolean; isFixed: boolean } {
  const { type: moveType, power: basePower } = effectiveTypeAndPower(move, weather);
  const effectiveness = getEffectiveness(moveType, defender.types, attacker.ability === 'Scrappy');
  const hasStab = attacker.types.includes(moveType);

  if (effectiveness === 0) {
    return { damage: 0, effectiveness: 0, hasStab, isFixed: false };
  }

  // Fixed-damage moves (Seismic Toss, Dragon Rage, Night Shade, etc.)
  if (move.effect?.type === 'fixed_damage') {
    const dmg = move.effect.useLevel ? attacker.level : (move.effect.amount ?? 0);
    return { damage: dmg, effectiveness: 1, hasStab: false, isFixed: true };
  }

  const { attackStat, defenseStat } = computeAttackDefense(attacker, defender, move, isCrit);

  const level = attacker.level;
  let power = basePower;
  power = AbilityManager.modifyBasePower(attacker, defender, move, power);
  power = power * weatherPowerMultiplier(move.id, moveType, weather);

  // Standard damage formula
  let damage = Math.floor(((((2 * level) / 5 + 2) * power * attackStat) / defenseStat) / 50 + 2);

  // Crit multiplier (1.5× in Gen 3+)
  if (isCrit) damage = Math.floor(damage * 1.5);

  // Invulnerability double damage (Earthquake vs Dig, etc.)
  damage = Math.floor(damage * getInvulnMultiplier(defender, move));

  // Pinch abilities (Overgrow, Blaze, Torrent, Swarm)
  if (attacker.currentHp <= attacker.maxHp / 3) {
    const pinch: Record<string, string> = { Overgrow: 'Grass', Blaze: 'Fire', Torrent: 'Water', Swarm: 'Bug' };
    const boost = pinch[attacker.ability];
    if (boost && moveType === boost) damage = Math.floor(damage * 1.5);
  }

  // STAB
  if (hasStab) damage = Math.floor(damage * 1.5);

  // Type effectiveness
  damage = Math.floor(damage * effectiveness);

  // Reflect / Light Screen — halve damage of the matching category (crits bypass)
  if (!isCrit && screens) {
    if (move.category === 'Physical' && screens.reflect)     damage = Math.floor(damage * 0.5);
    if (move.category === 'Special'  && screens.lightScreen) damage = Math.floor(damage * 0.5);
  }

  return { damage, effectiveness, hasStab, isFixed: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// Roll Damage — assumes the move already passed its accuracy check.
// Rolls crit and the 85–100% damage variance. Called once per hit of a
// multi-hit move.
// ─────────────────────────────────────────────────────────────────────────────
export function rollDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  rng: BattleRng = defaultRng,
  weather?: WeatherKind,
  screens?: ScreenState,
): DamageRoll {
  if (move.category === 'Status') {
    return { damage: 0, effectiveness: 1, hasStab: false, isCrit: false };
  }

  const isCrit = checkCriticalHit(move, rng);
  const core = computeCoreDamage(attacker, defender, move, isCrit, weather, screens);

  if (core.effectiveness === 0) {
    return { damage: 0, effectiveness: 0, hasStab: core.hasStab, isCrit: false };
  }
  if (core.isFixed) {
    return { damage: core.damage, effectiveness: core.effectiveness, hasStab: false, isCrit: false };
  }

  // Random variance: 85–100%
  const variance = (85 + Math.floor(rng.next() * 16)) / 100;
  let damage = Math.floor(core.damage * variance);
  if (damage <= 0) damage = 1;

  return { damage, effectiveness: core.effectiveness, hasStab: core.hasStab, isCrit };
}

// ─────────────────────────────────────────────────────────────────────────────
// Estimate Damage — deterministic, for AI decision-making.
// No accuracy roll, no crit, exact variance bounds.
// ─────────────────────────────────────────────────────────────────────────────
export function estimateDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  weather?: WeatherKind,
  screens?: ScreenState,
): DamageEstimate {
  if (move.category === 'Status') {
    return { min: 0, max: 0, avg: 0, effectiveness: 1 };
  }

  const core = computeCoreDamage(attacker, defender, move, false, weather, screens);

  if (core.effectiveness === 0) {
    return { min: 0, max: 0, avg: 0, effectiveness: 0 };
  }
  if (core.isFixed) {
    return { min: core.damage, max: core.damage, avg: core.damage, effectiveness: core.effectiveness };
  }

  const min = Math.max(1, Math.floor(core.damage * 0.85));
  const max = Math.max(1, core.damage);
  const avg = Math.max(1, Math.floor(core.damage * 0.925));
  return { min, max, avg, effectiveness: core.effectiveness };
}
