import { BattlePokemon, Move, MoveEffect, NonVolatileStatus } from '../../types/Pokemon';
import { modifyStatStage } from './StatStages';
import { AbilityManager } from '../abilities/AbilityManager';
import { BattleRng, defaultRng, chance, intBetween } from '../battle/Random';
import { MOVES } from '../../data/moves';

// ─────────────────────────────────────────────────────────────────────────────
// Effect Execution Context
// Passed through to handlers so they can reference damage dealt, etc.
// ─────────────────────────────────────────────────────────────────────────────
export interface EffectContext {
  moveId: string;
  damageDealt?: number;
  /** True when this is a secondary / chance-based effect (suppress "failed" messages) */
  isSecondary?: boolean;
  rng?: BattleRng;
}

// ─────────────────────────────────────────────────────────────────────────────
// Special Move Handler Registry
// Each key is a move ID. The handler is called INSTEAD of the normal damage
// + effect pipeline. Return value is unused; log messages go in `logs`.
// ─────────────────────────────────────────────────────────────────────────────
type MoveHandler = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  logs: string[],
  rng?: BattleRng,
) => void;

function handleRest(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  if (attacker.status === 'Sleep') {
    logs.push('But it failed!');
    return;
  }
  if (attacker.currentHp >= attacker.maxHp && !attacker.status) {
    logs.push('But it failed!');
    return;
  }
  attacker.currentHp = attacker.maxHp;
  attacker.status = 'Sleep';
  attacker.statusTurns = 2; // Counts down to 0 over two turns, wakes on 0
  attacker.toxicCounter = 0;
  logs.push(`${attacker.name} restored its HP fully!`);
  logs.push(`${attacker.name} went to sleep!`);
}

function handleSubstitute(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  if (attacker.substituteHp !== undefined) {
    logs.push(`${attacker.name} already has a substitute!`);
    return;
  }
  const cost = Math.floor(attacker.maxHp / 4);
  if (attacker.currentHp <= cost) {
    logs.push(`${attacker.name} doesn't have enough HP!`);
    return;
  }
  attacker.currentHp -= cost;
  attacker.substituteHp = cost;
  logs.push(`${attacker.name} put in a substitute!`);
  logs.push(`${attacker.name} lost ${cost} HP!`);
}

function handleBellyDrum(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  const cost = Math.floor(attacker.maxHp / 2);
  if (attacker.currentHp <= cost || attacker.statStages.atk === 6) {
    logs.push('But it failed!');
    return;
  }
  attacker.currentHp -= cost;
  attacker.statStages.atk = 6;
  logs.push(`${attacker.name} cut its own HP to maximize its Attack!`);
}

function handleRefresh(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  if (attacker.status === 'Burn' || attacker.status === 'Paralysis' ||
      attacker.status === 'Poison' || attacker.status === 'Toxic') {
    const old = attacker.status;
    attacker.status = undefined;
    attacker.toxicCounter = 0;
    logs.push(`${attacker.name} cured its ${old.toLowerCase()}!`);
  } else {
    logs.push('But it failed!');
  }
}

function handleAromatherapy(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  if (attacker.status) {
    const old = attacker.status;
    attacker.status = undefined;
    attacker.toxicCounter = 0;
    logs.push(`${attacker.name} was healed by the sweet aroma!`);
    logs.push(`${attacker.name}'s ${old.toLowerCase()} was cured!`);
  } else {
    logs.push('But it failed!');
  }
}

function handleHealBell(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  if (attacker.status) {
    const old = attacker.status;
    attacker.status = undefined;
    attacker.toxicCounter = 0;
    logs.push(`A bell chimed! ${attacker.name}'s ${old.toLowerCase()} was cured!`);
  } else {
    logs.push('But it failed!');
  }
}

function handleShellSmash(attacker: BattlePokemon, _defender: BattlePokemon, _move: Move, logs: string[]): void {
  // +2 Atk, SpA, Spe; -1 Def, SpD
  for (const stat of ['atk', 'spa', 'spe'] as const) {
    const { newStage } = modifyStatStage(attacker.statStages[stat], 2);
    attacker.statStages[stat] = newStage;
  }
  for (const stat of ['def', 'spd'] as const) {
    const { newStage } = modifyStatStage(attacker.statStages[stat], -1);
    attacker.statStages[stat] = newStage;
  }
  logs.push(`${attacker.name} broke its shell and powered up!`);
}

// Mimic — temporarily replaces this move's slot with the target's last-used
// move (full PP). Restored when the user switches out.
function handleMimic(attacker: BattlePokemon, defender: BattlePokemon, _move: Move, logs: string[]): void {
  const targetMoveId = defender.lastMoveUsed;
  const targetMove = targetMoveId ? MOVES[targetMoveId] : undefined;

  if (!targetMove || targetMoveId === 'mimic') {
    logs.push('But it failed!');
    return;
  }

  const idx = attacker.moves.findIndex(m => m.id === 'mimic');
  if (idx === -1) {
    logs.push('But it failed!');
    return;
  }

  if (!attacker.mimicBackup) {
    attacker.mimicBackup = { index: idx, move: { ...attacker.moves[idx] } };
  }
  attacker.moves[idx] = { ...targetMove, currentPp: targetMove.pp };
  logs.push(`${attacker.name} learned ${targetMove.name}!`);
}

// Protect / Detect / Endure — success rate halves with each consecutive use;
// the counter is reset by TurnEngine whenever the user does anything else.
function handleProtect(attacker: BattlePokemon, _defender: BattlePokemon, move: Move, logs: string[], rng?: BattleRng): void {
  const uses = attacker.protectCounter ?? 0;
  if (!chance(rng ?? defaultRng, 100 / Math.pow(2, uses))) {
    attacker.protectCounter = 0;
    logs.push('But it failed!');
    return;
  }
  attacker.protectCounter = uses + 1;
  if (move.id === 'endure') {
    attacker.volatileStatuses.push('Enduring');
    logs.push(`${attacker.name} braced itself!`);
  } else {
    attacker.volatileStatuses.push('Protected');
    logs.push(`${attacker.name} protected itself!`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Registry — add new special moves here; engine picks them up automatically
// ─────────────────────────────────────────────────────────────────────────────
const SPECIAL_HANDLERS: Record<string, MoveHandler> = {
  rest:         handleRest,
  substitute:   handleSubstitute,
  bellydrum:    handleBellyDrum,
  refresh:      handleRefresh,
  aromatherapy: handleAromatherapy,
  healbell:     handleHealBell,
  shellsmash:   handleShellSmash,
  protect:      handleProtect,
  detect:       handleProtect,
  endure:       handleProtect,
  mimic:        handleMimic,
};

export function getSpecialMoveHandler(moveId: string): MoveHandler | undefined {
  return SPECIAL_HANDLERS[moveId];
}

// ─────────────────────────────────────────────────────────────────────────────
// Human-readable stat label helper (shared)
// ─────────────────────────────────────────────────────────────────────────────
const STAT_LABELS: Record<string, string> = {
  atk: 'Attack', def: 'Defense', spa: 'Sp. Atk',
  spd: 'Sp. Def', spe: 'Speed', accuracy: 'Accuracy', evasion: 'Evasion',
};
export const statLabel = (stat: string): string => STAT_LABELS[stat] ?? stat.toUpperCase();

const STATUS_APPLIED_MESSAGES: Record<NonVolatileStatus, string> = {
  Burn:      'was burned!',
  Freeze:    'was frozen solid!',
  Paralysis: 'is paralyzed! It may be unable to move!',
  Poison:    'was poisoned!',
  Toxic:     'was badly poisoned!',
  Sleep:     'fell asleep!',
};
const statusAppliedMessage = (status: NonVolatileStatus): string =>
  STATUS_APPLIED_MESSAGES[status] ?? `was afflicted with ${status}!`;

// ─────────────────────────────────────────────────────────────────────────────
// Generic Effect Executor
// Handles all MoveEffect types. Called for both primary and secondary effects.
// ─────────────────────────────────────────────────────────────────────────────
export function executeMoveEffect(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  effect: MoveEffect,
  logs: string[],
  ctx: EffectContext,
): void {
  const target = effect.target === 'self' ? attacker : defender;

  switch (effect.type) {

    // ── Stat change ────────────────────────────────────────────────────────
    case 'stat_change': {
      if (!effect.stat) break;
      const stages = effect.stages ?? 0;
      const { newStage, changed } = modifyStatStage(target.statStages[effect.stat], stages);
      target.statStages[effect.stat] = newStage;

      if (changed) {
        const mag = Math.abs(stages);
        const dir = stages > 0 ? 'rose' : 'fell';
        const adv = mag >= 3 ? ' drastically' : mag >= 2 ? ' sharply' : '';
        logs.push(`${target.name}'s ${statLabel(effect.stat)}${adv} ${dir}!`);
      } else {
        const limit = stages > 0 ? 'higher' : 'lower';
        logs.push(`${target.name}'s ${statLabel(effect.stat)} won't go any ${limit}!`);
      }
      break;
    }

    // ── Non-volatile status ────────────────────────────────────────────────
    case 'status': {
      if (!effect.status) break;

      if (target.status) {
        if (!ctx.isSecondary) logs.push('But it failed!');
        break;
      }

      if (!AbilityManager.canApplyStatus(target, effect.status)) {
        if (!ctx.isSecondary) {
          logs.push(`[${target.name}'s ${target.ability}]`);
          logs.push(`It doesn't affect ${target.name}...`);
        }
        break;
      }

      target.status = effect.status;
      // Normal sleep gets a random 1–3 turn duration; Rest sets 2 explicitly
      target.statusTurns = effect.status === 'Sleep'
        ? intBetween(ctx.rng ?? defaultRng, 1, 3)
        : 0;
      if (effect.status === 'Toxic') target.toxicCounter = 0;
      logs.push(`${target.name} ${statusAppliedMessage(effect.status)}`);
      break;
    }

    // ── Volatile status ────────────────────────────────────────────────────
    case 'volatile_status': {
      if (!effect.volatileStatus) break;

      if (target.volatileStatuses.includes(effect.volatileStatus)) {
        if (!ctx.isSecondary && effect.volatileStatus !== 'Flinch') {
          logs.push(`${target.name} is already ${effect.volatileStatus.toLowerCase()}!`);
        }
        break;
      }

      if (!AbilityManager.canApplyStatus(target, effect.volatileStatus)) {
        if (!ctx.isSecondary) {
          logs.push(`[${target.name}'s ${target.ability}]`);
          logs.push(`It doesn't affect ${target.name}...`);
        }
        break;
      }

      target.volatileStatuses.push(effect.volatileStatus);
      if (effect.volatileStatus === 'Confusion') {
        target.confusionTurns = intBetween(ctx.rng ?? defaultRng, 2, 5);
        logs.push(`${target.name} became confused!`);
      }
      // Flinch is silent here — the message appears when the target fails to move
      break;
    }

    // ── Leech Seed ─────────────────────────────────────────────────────────
    case 'leech_seed': {
      if (defender.isSeeded) {
        logs.push(`${defender.name} is already seeded!`);
        break;
      }
      if (defender.types.includes('Grass')) {
        logs.push(`${defender.name} is immune to Leech Seed!`);
        break;
      }
      defender.isSeeded = true;
      logs.push(`${defender.name} was seeded!`);
      break;
    }

    // ── Transform ──────────────────────────────────────────────────────────
    case 'transform': {
      if (attacker.baseId === defender.baseId) {
        logs.push('But it failed!');
        break;
      }
      const beforeName = attacker.name;
      attacker.baseId   = defender.baseId;
      attacker.name     = defender.name;
      attacker.types    = [...defender.types];
      attacker.stats    = { ...defender.stats, hp: attacker.stats.hp };
      attacker.statStages = { ...defender.statStages };
      attacker.moves    = defender.moves.map(m => ({ ...m }));
      logs.push(`${beforeName} transformed into ${defender.name}!`);
      break;
    }

    // ── Heal ──────────────────────────────────────────────────────────────
    case 'heal': {
      if (target.currentHp >= target.maxHp) {
        if (!ctx.isSecondary) logs.push('But it failed!');
        break;
      }
      const pct = effect.percent ?? 50;
      const amt = Math.max(1, Math.floor((target.maxHp * pct) / 100));
      const actual = Math.min(target.maxHp - target.currentHp, amt);
      target.currentHp += actual;
      logs.push(`${target.name} recovered ${actual} HP!`);
      break;
    }

    // ── Drain ─────────────────────────────────────────────────────────────
    case 'drain': {
      const dmg = ctx.damageDealt ?? 0;
      if (dmg <= 0) break;
      const pct = effect.percent ?? 50;
      const healAmt  = Math.max(1, Math.floor((dmg * pct) / 100));
      const actual   = Math.min(attacker.maxHp - attacker.currentHp, healAmt);
      if (actual > 0) {
        attacker.currentHp += actual;
        logs.push(`${defender.name} had its energy drained!`);
        logs.push(`${attacker.name} recovered HP!`);
      }
      break;
    }

    // ── Recoil ────────────────────────────────────────────────────────────
    case 'recoil': {
      const dmg = ctx.damageDealt ?? 0;
      if (dmg <= 0) break;
      const pct = effect.percent ?? 25;
      const recoil = Math.max(1, Math.floor((dmg * pct) / 100));
      attacker.currentHp = Math.max(0, attacker.currentHp - recoil);
      logs.push(`${attacker.name} was hit with recoil!`);
      break;
    }

    // ── Fixed Damage ───────────────────────────────────────────────────────
    // Handled in DamageCalculator — nothing extra to do here
    case 'fixed_damage':
      break;

    default:
      break;
  }
}
