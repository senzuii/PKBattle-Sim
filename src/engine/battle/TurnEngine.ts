/**
 * TurnEngine.ts
 *
 * The turn orchestrator. Responsibilities:
 *   1. Deep-clone both combatants so the originals are never mutated.
 *   2. Resolve action order (switches first, then priority + speed).
 *   3. Execute each side's action in order, checking faints between actions.
 *   4. Apply end-of-turn effects (burn / poison / toxic / leech seed / abilities).
 *   5. Return the result.
 *
 * One rule: no business logic lives here. Every sub-task is delegated to its
 * own module. All randomness flows through the injected BattleRng.
 */

import { BattlePokemon, Move, MoveEffect, WeatherKind } from '../../types/Pokemon';
import { MOVES } from '../../data/moves';
import { BattleAction } from './Actions';
import { BattleRng, defaultRng, chance, intBetween } from './Random';
import { playerActsFirst } from './TurnOrder';
import {
  FieldState, createField, cloneField, sideOf, effectiveWeather,
  applyEntryHazards, WEATHER_START_MESSAGES,
} from './Field';
import { resolvePreMoveStatuses } from '../effects/StatusEffects';
import { applyEndOfTurnEffects } from '../effects/EndOfTurn';
import { checkMoveHit, rollDamage } from '../damage/DamageCalculator';
import { executeMoveEffect, getSpecialMoveHandler, EffectContext } from '../effects/MoveEffects';
import { AbilityManager } from '../abilities/AbilityManager';
import { getEffectiveness } from '../../types/TypeChart';

// ─────────────────────────────────────────────────────────────────────────────
// Public interface
// ─────────────────────────────────────────────────────────────────────────────
export interface TurnExecutionResult {
  player: BattlePokemon;
  opponent: BattlePokemon;
  /** Battle-level state (weather, hazards, pending attacks) after the turn. */
  field: FieldState;
  logs: string[];
  damageDealt: number;
  damageTaken: number;
  /** Set when Roar/Whirlwind/U-turn/Baton Pass forced the named side to switch out. */
  forceSwitch?: 'player' | 'opponent';
  /** Stat stages to hand the incoming Pokémon (Baton Pass). */
  batonPass?: BatonPassState;
}

// ─────────────────────────────────────────────────────────────────────────────
// Charge / 2-turn move data
// ─────────────────────────────────────────────────────────────────────────────
const CHARGE_MOVE_MESSAGES: Record<string, string> = {
  solarbeam:  'NAME absorbed light!',
  skullbash:  'NAME lowered its head!',
  razorwind:  'NAME is gathering wind!',
  skyattack:  'NAME is glowing!',
  fly:        'NAME flew up high!',
  bounce:     'NAME sprang up!',
  dig:        'NAME burrowed underground!',
  dive:       'NAME dove underwater!',
  shadowforce: 'NAME vanished instantly!',
};
const CHARGE_MOVES       = new Set(Object.keys(CHARGE_MOVE_MESSAGES));
const INVULNERABLE_MOVES = new Set(['fly', 'bounce', 'dig', 'dive', 'shadowforce']);

// ─────────────────────────────────────────────────────────────────────────────
// Protect / Detect / Endure
// ─────────────────────────────────────────────────────────────────────────────
const PROTECT_FAMILY = new Set(['protect', 'detect', 'endure']);

/** Effects that live on the field rather than the opponent — Protect ignores them. */
const FIELD_SCOPED_EFFECTS = new Set(['weather', 'hazard', 'delayed_damage', 'wish']);

/** True if the move acts on the opposing Pokémon (and can thus be Protect-blocked). */
function moveTargetsOpponent(move: Move): boolean {
  if (move.category !== 'Status') return true;
  return [move.effect, move.secondaryEffect].some(
    e => e !== undefined && e.target === 'opponent' && !FIELD_SCOPED_EFFECTS.has(e.type),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers — cloning and volatile-state reset
// ─────────────────────────────────────────────────────────────────────────────
function clonePokemon(src: BattlePokemon): BattlePokemon {
  return {
    ...src,
    statStages:       { ...src.statStages },
    volatileStatuses: [...src.volatileStatuses],
    moves:            src.moves.map(m => ({ ...m })),
    lockedMove:       src.lockedMove ? { ...src.lockedMove } : undefined,
    mimicBackup:      src.mimicBackup ? { index: src.mimicBackup.index, move: { ...src.mimicBackup.move } } : undefined,
    trap:             src.trap ? { ...src.trap } : undefined,
    disabled:         src.disabled ? { ...src.disabled } : undefined,
    encore:           src.encore ? { ...src.encore } : undefined,
  };
}

/**
 * Returns a copy with everything that does not persist through a switch
 * cleared: stat stages, volatiles, confusion, substitute, locked moves,
 * Leech Seed, and the toxic counter. HP, status, and PP persist.
 */
export function resetVolatileState(src: BattlePokemon): BattlePokemon {
  const copy = clonePokemon(src);
  copy.statStages       = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0 };
  copy.volatileStatuses = [];
  copy.confusionTurns   = 0;
  copy.lockedMove       = undefined;
  copy.substituteHp     = undefined;
  copy.isSeeded         = false;
  copy.toxicCounter     = 0;
  copy.protectCounter   = 0;
  copy.lastMoveUsed     = undefined;
  copy.trap             = undefined;
  copy.taunted          = undefined;
  copy.disabled         = undefined;
  copy.encore           = undefined;
  copy.torment          = undefined;
  copy.bide             = undefined;
  copy.foresighted      = undefined;
  copy.focusEnergy      = undefined;
  // Natural Cure — status clears as the Pokémon leaves the field.
  if (copy.ability === 'Natural Cure' && copy.status) {
    copy.status = undefined;
    copy.statusTurns = 0;
    copy.toxicCounter = 0;
  }
  if (copy.mimicBackup) {
    copy.moves[copy.mimicBackup.index] = copy.mimicBackup.move;
    copy.mimicBackup = undefined;
  }
  return copy;
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-side turn state
// ─────────────────────────────────────────────────────────────────────────────
/** Stat stages (and a couple of volatiles) handed to the incoming Pokémon by Baton Pass. */
export interface BatonPassState {
  statStages: BattlePokemon['statStages'];
  substituteHp?: number;
  isSeeded: boolean;
}

/** Per-turn flags accumulated as actions resolve (e.g. a forced switch from Roar). */
interface TurnFlags {
  forceSwitch?: 'player' | 'opponent';
  batonPass?: BatonPassState;
}

interface Side {
  pokemon: BattlePokemon;
  action: BattleAction;
  isPlayer: boolean;
  /** Damage this side inflicted on the other (real HP + substitute). */
  damageDealt: number;
  /** Damage this side's Pokémon suffered (attacks + confusion self-hits). */
  damageTaken: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Faint logging — ensures each Pokémon is logged as fainted exactly once
// ─────────────────────────────────────────────────────────────────────────────
function makeFaintTracker(logs: string[]) {
  const logged = new Set<string>();
  return (poke: BattlePokemon) => {
    if (poke.currentHp <= 0 && !logged.has(poke.id)) {
      logs.push(`${poke.name} fainted!`);
      logged.add(poke.id);
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Apply damage to the defender, considering Substitute and Sturdy.
// Returns the damage actually inflicted (absorbed by the substitute or dealt
// to real HP).
// ─────────────────────────────────────────────────────────────────────────────
function applyDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  rawDamage: number,
  logs: string[],
): number {
  if (rawDamage <= 0) return 0;

  // Substitute absorbs damage first
  if (defender.substituteHp !== undefined) {
    const subDmg = Math.min(defender.substituteHp, rawDamage);
    defender.substituteHp -= subDmg;
    logs.push(`${attacker.name} attacked the substitute!`);
    if (defender.substituteHp <= 0) {
      defender.substituteHp = undefined;
      logs.push(`${defender.name}'s substitute broke!`);
    }
    return subDmg; // Real HP unaffected; recoil/drain still uses rawDamage
  }

  // Sturdy: survive a one-hit KO from full HP
  let finalDamage = Math.min(rawDamage, defender.currentHp);
  let survivedBy: 'sturdy' | 'endure' | null = null;
  if (
    defender.ability === 'Sturdy' &&
    defender.currentHp === defender.maxHp &&
    finalDamage >= defender.currentHp
  ) {
    finalDamage = defender.currentHp - 1;
    survivedBy = 'sturdy';
  }

  // Endure: always survive with at least 1 HP this turn
  if (
    defender.volatileStatuses.includes('Enduring') &&
    finalDamage >= defender.currentHp
  ) {
    finalDamage = defender.currentHp - 1;
    survivedBy = 'endure';
  }

  defender.currentHp = Math.max(0, defender.currentHp - finalDamage);
  logs.push(`${defender.name} took ${finalDamage} damage!`);

  // "Hung on" / "endured" messages come after the damage is shown
  if (survivedBy === 'sturdy') {
    logs.push(`[${defender.name}'s Sturdy]`);
    logs.push(`${defender.name} hung on!`);
  } else if (survivedBy === 'endure') {
    logs.push(`${defender.name} endured the hit!`);
  }

  return finalDamage;
}

// ─────────────────────────────────────────────────────────────────────────────
// Chance-based move effects.
// Primary effects of Status moves always apply. Effects riding on damaging
// moves (status / volatile / stat drops) are "secondaries": their proc chance
// runs through ability hooks (Serene Grace, Shield Dust).
// ─────────────────────────────────────────────────────────────────────────────
function tryApplyEffect(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  effect: NonNullable<Move['effect']>,
  damageDealt: number,
  logs: string[],
  rng: BattleRng,
): void {
  const isSecondaryType = effect.type === 'status' ||
                          effect.type === 'volatile_status' ||
                          effect.type === 'stat_change';
  const isSecondary = isSecondaryType && move.category !== 'Status';

  if (isSecondary) {
    const baseChance = effect.chance ?? 100;
    const finalChance = AbilityManager.modifyEffectChance(attacker, defender, effect, baseChance);
    if (!chance(rng, finalChance)) return;
  }

  const ctx: EffectContext = { moveId: move.id, damageDealt, isSecondary, rng };
  executeMoveEffect(attacker, defender, effect, logs, ctx);
}

// ─────────────────────────────────────────────────────────────────────────────
// Field-scoped effects (weather, hazards, Future Sight, Wish)
// These live on the FieldState rather than on a Pokémon, so they're resolved
// here where the field is in scope. Returns true if the effect was handled.
// ─────────────────────────────────────────────────────────────────────────────
function applyFieldEffect(
  side: Side,
  other: Side,
  move: Move,
  effect: MoveEffect,
  field: FieldState,
  logs: string[],
  rng: BattleRng,
): boolean {
  const attacker = side.pokemon;

  switch (effect.type) {
    case 'weather': {
      if (!effect.weather) return true;
      if (field.weather?.kind === effect.weather) {
        logs.push('But it failed!');
        return true;
      }
      field.weather = { kind: effect.weather, turnsLeft: 5 };
      logs.push(WEATHER_START_MESSAGES[effect.weather]);
      return true;
    }

    case 'hazard': {
      const targetSide = sideOf(field, !side.isPlayer);
      const teamLabel = side.isPlayer ? 'the opposing team' : 'your team';
      const hazards = targetSide.hazards;

      if (effect.hazard === 'stealthrock') {
        if (hazards.stealthRock) { logs.push('But it failed!'); return true; }
        hazards.stealthRock = true;
        logs.push(`Pointed stones float in the air around ${teamLabel}!`);
      } else if (effect.hazard === 'spikes') {
        if (hazards.spikes >= 3) { logs.push('But it failed!'); return true; }
        hazards.spikes += 1;
        logs.push(`Spikes were scattered all around ${teamLabel}!`);
      } else if (effect.hazard === 'toxicspikes') {
        if (hazards.toxicSpikes >= 2) { logs.push('But it failed!'); return true; }
        hazards.toxicSpikes += 1;
        logs.push(`Poison spikes were scattered all around ${teamLabel}!`);
      }
      return true;
    }

    case 'delayed_damage': {
      const targetSide = sideOf(field, !side.isPlayer);
      if (targetSide.delayed) {
        logs.push('But it failed!');
        return true;
      }
      // Damage is snapshotted now, against the current target.
      // +1 because the cast turn's own end-of-turn phase already ticks the counter.
      const weather = effectiveWeather(field, attacker, other.pokemon);
      const roll = rollDamage(attacker, other.pokemon, move, rng, weather);
      targetSide.delayed = {
        moveName: move.name,
        turnsLeft: (effect.turns ?? 2) + 1,
        damage: Math.max(1, roll.damage),
      };
      logs.push(`${attacker.name} foresaw an attack!`);
      return true;
    }

    case 'screen': {
      if (!effect.screen) return true;
      const ownSide = sideOf(field, side.isPlayer);
      const key = effect.screen === 'lightscreen' ? 'lightScreen' : 'reflect';
      if (ownSide.screens[key] > 0) {
        logs.push('But it failed!');
        return true;
      }
      ownSide.screens[key] = 5;
      const teamLabel = side.isPlayer ? 'Your' : "The opponent's";
      logs.push(effect.screen === 'lightscreen'
        ? `${teamLabel} team's Special Defense rose!`
        : `${teamLabel} team's Defense rose!`);
      return true;
    }

    case 'wish': {
      const ownSide = sideOf(field, side.isPlayer);
      if (ownSide.wish) {
        logs.push('But it failed!');
        return true;
      }
      // Heals at the end of the NEXT turn; the cast turn's end-of-turn phase
      // already ticks the counter, hence 2.
      ownSide.wish = {
        turnsLeft: 2,
        amount: Math.max(1, Math.floor(attacker.maxHp / 2)),
        wisher: attacker.name,
      };
      logs.push(`${attacker.name} made a wish!`);
      return true;
    }

    default:
      return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Switch action
// ─────────────────────────────────────────────────────────────────────────────
function performSwitch(side: Side, other: Side, field: FieldState, logs: string[]): void {
  const incoming = clonePokemon(side.action.type === 'switch' ? side.action.incoming : side.pokemon);
  logs.push(side.isPlayer
    ? `You switched to ${incoming.name}!`
    : `Opponent switched to ${incoming.name}!`);
  side.pokemon = incoming;
  AbilityManager.onSwitchIn(incoming, other.pokemon, logs, field);
  applyEntryHazards(incoming, sideOf(field, side.isPlayer).hazards, logs);
}

// ─────────────────────────────────────────────────────────────────────────────
// Move action
// ─────────────────────────────────────────────────────────────────────────────
function performMove(side: Side, other: Side, move: Move, field: FieldState, logs: string[], rng: BattleRng, flags: TurnFlags): void {
  const attacker = side.pokemon;
  const defender = other.pokemon;
  const weather = effectiveWeather(field, attacker, defender);

  // Guard: already fainted
  if (attacker.currentHp <= 0 || defender.currentHp <= 0) return;

  // Pre-move status resolution (recharge, flinch, sleep, freeze, paralysis, confusion)
  const resolution = resolvePreMoveStatuses(attacker, logs, rng);
  side.damageTaken += resolution.selfDamage;
  if (!resolution.canAct) return;

  // ── Move-locking volatiles (Encore forces, Taunt/Disable/Torment block) ──
  if (attacker.encore) {
    const forced = attacker.moves.find(m => m.id === attacker.encore!.moveId);
    if (forced) move = forced; // Encore overrides the chosen move
  }
  if (attacker.taunted && attacker.taunted > 0 && move.category === 'Status') {
    logs.push(`${attacker.name} can't use ${move.name} after the taunt!`);
    return;
  }
  if (attacker.disabled && attacker.disabled.moveId === move.id) {
    logs.push(`${attacker.name}'s ${move.name} is disabled!`);
    return;
  }
  if (attacker.torment && attacker.lastMoveUsed === move.id) {
    logs.push(`${attacker.name} can't use ${move.name} twice in a row!`);
    return;
  }

  // ── 2-turn charge move handling (Solar Beam fires instantly in sun) ──────
  const skipCharge = move.id === 'solarbeam' && weather === 'Sun';
  if (CHARGE_MOVES.has(move.id) && !skipCharge) {
    if (!attacker.lockedMove || attacker.lockedMove.moveId !== move.id) {
      // First turn: announce charge and lock
      const msg = (CHARGE_MOVE_MESSAGES[move.id] ?? `${attacker.name} is preparing ${move.name}!`)
        .replace('NAME', attacker.name);
      logs.push(msg);
      attacker.lockedMove = {
        moveId: move.id,
        turn: 2,
        invulnerable: INVULNERABLE_MOVES.has(move.id),
      };
      return;
    }
    // Second turn: release move, clear lock
    attacker.lockedMove = undefined;
  }

  // ── Multi-turn rage / outrage / petal dance handling ────────────────────
  if (
    attacker.lockedMove &&
    attacker.lockedMove.remainingTurns !== undefined &&
    attacker.lockedMove.remainingTurns > 0
  ) {
    attacker.lockedMove.remainingTurns -= 1;
    move = MOVES[attacker.lockedMove.moveId] ?? move; // Force locked move
    if (attacker.lockedMove.remainingTurns <= 0) {
      attacker.lockedMove = undefined;
      if (!attacker.volatileStatuses.includes('Confusion')) {
        attacker.volatileStatuses.push('Confusion');
        attacker.confusionTurns = intBetween(rng, 2, 5);
        logs.push(`${attacker.name} became confused due to fatigue!`);
      }
    }
  } else if (move.multiTurn) {
    attacker.lockedMove = {
      moveId: move.id,
      turn: 1,
      remainingTurns: intBetween(rng, move.multiTurn[0], move.multiTurn[1]) - 1,
    };
  }

  logs.push(`${attacker.name} used ${move.name}!`);

  // ── Decrement PP ─────────────────────────────────────────────────────────
  const moveInList = attacker.moves.find(m => m.id === move.id);
  if (moveInList) {
    if (moveInList.currentPp === undefined) moveInList.currentPp = moveInList.pp;
    moveInList.currentPp = Math.max(0, moveInList.currentPp - 1);
  }

  // Remember this for the opponent's Mimic
  attacker.lastMoveUsed = move.id;

  // ── Baton Pass — retreat, handing stat stages (+ sub / Leech Seed) over ──
  if (move.id === 'batonpass') {
    flags.forceSwitch = side.isPlayer ? 'player' : 'opponent';
    flags.batonPass = {
      statStages: { ...attacker.statStages },
      substituteHp: attacker.substituteHp,
      isSeeded: attacker.isSeeded,
    };
    logs.push(`${attacker.name} passed on the baton!`);
    return;
  }

  // ── Special move handler (Rest, Substitute, Belly Drum, etc.) ───────────
  const specialHandler = getSpecialMoveHandler(move.id);
  if (specialHandler) {
    specialHandler(attacker, defender, move, logs);
    // Special moves may have self-destruct flags too (misty explosion, etc.)
    if (move.flags?.selfDestruct) attacker.currentHp = 0;
    return;
  }

  // ── Delayed attacks (Future Sight) — scheduled, not dealt now ────────────
  if (move.effect?.type === 'delayed_damage') {
    applyFieldEffect(side, other, move, move.effect, field, logs, rng);
    return;
  }

  // ── Protect / Detect — block any move aimed at the protected target ───────
  // (All damaging moves target the foe; status moves only if they do.)
  if (defender.volatileStatuses.includes('Protected') &&
      (move.category !== 'Status' || move.effect?.target === 'opponent')) {
    logs.push(`${defender.name} protected itself!`);
    if (move.flags?.selfDestruct) attacker.currentHp = 0;
    return;
  }

  // ── Status category moves ────────────────────────────────────────────────
  if (move.category === 'Status') {
    if (!checkMoveHit(move, attacker, defender, rng, weather)) {
      logs.push(`${attacker.name}'s attack missed!`);
      return;
    }
    for (const effect of [move.effect, move.secondaryEffect]) {
      if (!effect) continue;
      if (effect.type === 'force_switch') {
        flags.forceSwitch = other.isPlayer ? 'player' : 'opponent';
        continue;
      }
      if (!applyFieldEffect(side, other, move, effect, field, logs, rng)) {
        tryApplyEffect(attacker, defender, move, effect, 0, logs, rng);
      }
    }
    return;
  }

  // ── Damaging moves ───────────────────────────────────────────────────────
  // Ability interception (Water Absorb, Flash Fire, etc.) — before accuracy
  if (AbilityManager.interceptMove(attacker, defender, move, logs)) {
    if (move.flags?.selfDestruct) attacker.currentHp = 0;
    return;
  }

  // Type immunity (Scrappy / Foresight let Normal/Fighting ignore Ghost immunity)
  if (getEffectiveness(move.type, defender.types, attacker.ability === 'Scrappy' || !!defender.foresighted) === 0) {
    logs.push('It has no effect...');
    if (move.flags?.selfDestruct) attacker.currentHp = 0;
    return;
  }

  // Accuracy is rolled ONCE per move use — multi-hit moves don't re-roll
  if (!checkMoveHit(move, attacker, defender, rng, weather)) {
    logs.push(`${attacker.name}'s attack missed!`);
    if (move.flags?.selfDestruct) attacker.currentHp = 0;
    return;
  }

  const hitCount = move.multiHit
    ? intBetween(rng, move.multiHit[0], move.multiHit[1])
    : 1;

  let hitsLanded = 0;
  let effectiveness = 1;
  let critHit = false;

  const defenderScreens = sideOf(field, other.isPlayer).screens;
  const screens = { reflect: defenderScreens.reflect > 0, lightScreen: defenderScreens.lightScreen > 0 };

  for (let i = 0; i < hitCount; i++) {
    if (defender.currentHp <= 0) break;

    const roll = rollDamage(attacker, defender, move, rng, weather, screens);
    effectiveness = roll.effectiveness;

    // Apply damage to defender (substitute and Sturdy aware)
    const inflicted = applyDamage(attacker, defender, roll.damage, logs);
    side.damageDealt  += inflicted;
    other.damageTaken += inflicted;

    // Record for Counter / Mirror Coat / Bide (real HP lost this turn, by category)
    if (inflicted > 0 && defender.substituteHp === undefined) {
      if (!defender.damageTakenThisTurn) defender.damageTakenThisTurn = { physical: 0, special: 0 };
      if (move.category === 'Physical')      defender.damageTakenThisTurn.physical += inflicted;
      else if (move.category === 'Special')  defender.damageTakenThisTurn.special  += inflicted;
      if (defender.bide) defender.bide.damage += inflicted;
    }

    hitsLanded++;
    if (roll.isCrit) critHit = true;

    // Effects proc per hit; drain/recoil are based on the damage actually
    // inflicted (capped to the defender's remaining HP/substitute), not the
    // raw rolled damage — otherwise overkill hits cause disproportionate
    // recoil/drain.
    if (move.effect)          tryApplyEffect(attacker, defender, move, move.effect,          inflicted, logs, rng);
    if (move.secondaryEffect) tryApplyEffect(attacker, defender, move, move.secondaryEffect, inflicted, logs, rng);

    // Contact ability triggers (Static, Poison Point, etc.)
    if (roll.damage > 0 && move.category === 'Physical') {
      AbilityManager.onContactHit(attacker, defender, move, logs);
    }

    // Anger Point — a critical hit maxes the survivor's Attack.
    if (roll.isCrit && defender.currentHp > 0 && defender.ability === 'Anger Point' && defender.statStages.atk < 6) {
      defender.statStages.atk = 6;
      logs.push(`[${defender.name}'s Anger Point]`);
      logs.push(`${defender.name} maxed its Attack!`);
    }
  }

  // Moxie — knocking the target out raises the attacker's Attack.
  if (hitsLanded > 0 && defender.currentHp <= 0 && attacker.ability === 'Moxie' && attacker.statStages.atk < 6) {
    attacker.statStages.atk = Math.min(6, attacker.statStages.atk + 1);
    logs.push(`[${attacker.name}'s Moxie]`);
    logs.push(`${attacker.name}'s Attack rose!`);
  }

  // ── Post-move log messages ───────────────────────────────────────────────
  if (hitsLanded > 1) logs.push(`Hit ${hitsLanded} time(s)!`);

  if (hitsLanded > 0) {
    if (critHit) logs.push('A critical hit!');
    if (effectiveness > 1)                       logs.push("It's super effective!");
    else if (effectiveness > 0 && effectiveness < 1) logs.push("It's not very effective...");

    // Recharge lock (Hyper Beam, Blast Burn, etc.)
    if (move.flags?.recharge) {
      attacker.lockedMove = { moveId: move.id, turn: 1, isRecharge: true };
    }

    // Self-switch (U-turn, Volt Switch) — the user retreats after attacking.
    // Only if the user survived the exchange; the store decides if a
    // replacement is actually available.
    if (move.flags?.selfSwitch && attacker.currentHp > 0) {
      flags.forceSwitch = side.isPlayer ? 'player' : 'opponent';
      logs.push(`${attacker.name} went back!`);
    }

    // Rapid Spin — clears the user's side hazards, trap, and Leech Seed.
    if (move.flags?.rapidSpin && attacker.currentHp > 0) {
      const myHazards = sideOf(field, side.isPlayer).hazards;
      if (myHazards.stealthRock || myHazards.spikes > 0 || myHazards.toxicSpikes > 0 || attacker.trap || attacker.isSeeded) {
        myHazards.stealthRock = false;
        myHazards.spikes = 0;
        myHazards.toxicSpikes = 0;
        attacker.trap = undefined;
        attacker.isSeeded = false;
        logs.push(`${attacker.name} blew away the hazards!`);
      }
    }
  }

  // Self-destruct (Explosion, Self-Destruct) — user faints regardless of hit
  if (move.flags?.selfDestruct) {
    attacker.currentHp = 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Execute one side's chosen action
// ─────────────────────────────────────────────────────────────────────────────
function performAction(side: Side, other: Side, field: FieldState, logs: string[], rng: BattleRng, flags: TurnFlags): void {
  if (side.action.type === 'switch') {
    performSwitch(side, other, field, logs);
    return;
  }
  performMove(side, other, side.action.move, field, logs, rng, flags);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Entry Points
// ─────────────────────────────────────────────────────────────────────────────
export function executeBattleTurn(
  player: BattlePokemon,
  opponent: BattlePokemon,
  playerAction: BattleAction,
  opponentAction: BattleAction,
  inputField: FieldState = createField(),
  rng: BattleRng = defaultRng,
): TurnExecutionResult {
  const logs: string[] = [];
  const field = cloneField(inputField);

  const playerSide: Side = {
    pokemon: clonePokemon(player),
    action: playerAction,
    isPlayer: true,
    damageDealt: 0,
    damageTaken: 0,
  };
  const opponentSide: Side = {
    pokemon: clonePokemon(opponent),
    action: opponentAction,
    isPlayer: false,
    damageDealt: 0,
    damageTaken: 0,
  };

  const checkFaint = makeFaintTracker(logs);
  const flags: TurnFlags = {};

  // Resolve order — switches always precede moves
  const playerFirst = playerActsFirst(
    playerSide.pokemon, opponentSide.pokemon, playerAction, opponentAction, rng,
    effectiveWeather(field, playerSide.pokemon, opponentSide.pokemon),
  );
  let order: [Side, Side] = playerFirst
    ? [playerSide, opponentSide]
    : [opponentSide, playerSide];

  // Pursuit — if the foe is switching out, Pursuit strikes first at double power.
  const isPursuit = (s: Side) => s.action.type === 'move' && s.action.move.id === 'pursuit';
  const isSwitch  = (s: Side) => s.action.type === 'switch';
  let pursuer: Side | null = null;
  if (isPursuit(playerSide) && isSwitch(opponentSide)) pursuer = playerSide;
  else if (isPursuit(opponentSide) && isSwitch(playerSide)) pursuer = opponentSide;
  if (pursuer && pursuer.action.type === 'move') {
    pursuer.action = { ...pursuer.action, move: { ...pursuer.action.move, power: pursuer.action.move.power * 2 } };
    order = pursuer === playerSide ? [playerSide, opponentSide] : [opponentSide, playerSide];
  }

  // First side acts
  performAction(order[0], order[1], field, logs, rng, flags);
  checkFaint(order[0].pokemon);
  checkFaint(order[1].pokemon);

  // Second side acts (if still alive)
  if (order[1].pokemon.currentHp > 0) {
    logs.push('');
    performAction(order[1], order[0], field, logs, rng, flags);
    checkFaint(order[0].pokemon);
    checkFaint(order[1].pokemon);
  }

  // End-of-turn effects (weather / status / leech seed / wish / Future Sight / abilities)
  applyEndOfTurnEffects(playerSide.pokemon, opponentSide.pokemon, field, logs);
  checkFaint(playerSide.pokemon);
  checkFaint(opponentSide.pokemon);

  return {
    player:      playerSide.pokemon,
    opponent:    opponentSide.pokemon,
    field,
    logs,
    damageDealt: playerSide.damageDealt,
    damageTaken: playerSide.damageTaken,
    forceSwitch: flags.forceSwitch,
    batonPass: flags.batonPass,
  };
}

/** Backwards-compatible move-vs-move entry point. */
export function executeTurn(
  player: BattlePokemon,
  opponent: BattlePokemon,
  playerMove: Move,
  opponentMove: Move,
  field?: FieldState,
  rng: BattleRng = defaultRng,
): TurnExecutionResult {
  return executeBattleTurn(
    player,
    opponent,
    { type: 'move', move: playerMove },
    { type: 'move', move: opponentMove },
    field,
    rng,
  );
}
