import { BattlePokemon } from '../../types/Pokemon';
import { AbilityManager } from '../abilities/AbilityManager';
import {
  FieldState, SideState, effectiveWeather, isImmuneToWeatherChip,
  WEATHER_END_MESSAGES,
} from '../battle/Field';

// ─────────────────────────────────────────────────────────────────────────────
// End-of-Turn Effects
// Applied after both Pokémon have acted. Order:
//   1. Weather chip damage (sandstorm / hail), then weather countdown
//   2. Burn / Poison / Toxic — both Pokémon
//   3. Leech Seed — both Pokémon
//   4. Wish — heals the active Pokémon of the wishing side
//   5. Delayed attacks (Future Sight) land
//   6. Ability end-of-turn hooks (Speed Boost, Shed Skin, etc.)
//   7. Clear turn-scoped volatiles (Flinch)
// ─────────────────────────────────────────────────────────────────────────────

export function applyEndOfTurnEffects(
  p: BattlePokemon,
  o: BattlePokemon,
  field: FieldState,
  logs: string[],
): void {
  applyWeather(p, o, field, logs);
  applyScreens(field.player,   'Your',              logs);
  applyScreens(field.opponent, "The opponent's",    logs);
  applyStatusDamage(p, logs);
  applyStatusDamage(o, logs);
  applyLeechSeed(p, o, logs);  // p is seeded → o heals
  applyLeechSeed(o, p, logs);  // o is seeded → p heals
  applyWish(field.player,   p, logs);
  applyWish(field.opponent, o, logs);
  applyDelayedAttack(field.player,   p, logs);
  applyDelayedAttack(field.opponent, o, logs);
  AbilityManager.onEndOfTurn(p, logs);
  AbilityManager.onEndOfTurn(o, logs);
  clearTurnVolatiles(p);
  clearTurnVolatiles(o);
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather — chip damage while active, then tick down and clear at 0
// ─────────────────────────────────────────────────────────────────────────────
function applyWeather(
  p: BattlePokemon,
  o: BattlePokemon,
  field: FieldState,
  logs: string[],
): void {
  if (!field.weather) return;

  // Cloud Nine / Air Lock suppress effects but the countdown continues
  const active = effectiveWeather(field, p, o);
  if (active === 'Sandstorm' || active === 'Hail') {
    logs.push(active === 'Sandstorm' ? 'The sandstorm rages.' : 'Hail continues to fall.');
    for (const poke of [p, o]) {
      if (poke.currentHp <= 0 || isImmuneToWeatherChip(poke, active)) continue;
      const dmg = Math.max(1, Math.floor(poke.maxHp / 16));
      poke.currentHp = Math.max(0, poke.currentHp - dmg);
      logs.push(active === 'Sandstorm'
        ? `${poke.name} is buffeted by the sandstorm!`
        : `${poke.name} is pelted by the hail!`);
    }
  }

  field.weather.turnsLeft -= 1;
  if (field.weather.turnsLeft <= 0) {
    logs.push(WEATHER_END_MESSAGES[field.weather.kind]);
    field.weather = undefined;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Screens — Reflect / Light Screen tick down and clear at 0
// ─────────────────────────────────────────────────────────────────────────────
function applyScreens(side: SideState, teamLabel: string, logs: string[]): void {
  if (side.screens.reflect > 0) {
    side.screens.reflect -= 1;
    if (side.screens.reflect === 0) logs.push(`${teamLabel} team's Reflect wore off!`);
  }
  if (side.screens.lightScreen > 0) {
    side.screens.lightScreen -= 1;
    if (side.screens.lightScreen === 0) logs.push(`${teamLabel} team's Light Screen wore off!`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Status Damage (Burn / Poison / Toxic)
// ─────────────────────────────────────────────────────────────────────────────
function applyStatusDamage(poke: BattlePokemon, logs: string[]): void {
  if (poke.currentHp <= 0) return;

  if (poke.status === 'Burn' || poke.status === 'Poison') {
    const dmg = Math.max(1, Math.floor(poke.maxHp / 8));
    poke.currentHp = Math.max(0, poke.currentHp - dmg);
    logs.push(`${poke.name} was hurt by its ${poke.status.toLowerCase()}!`);
  } else if (poke.status === 'Toxic') {
    // Toxic counter increments each turn; damage = n/16 of max HP
    poke.toxicCounter = (poke.toxicCounter ?? 0) + 1;
    const dmg = Math.max(1, Math.floor((poke.maxHp / 16) * poke.toxicCounter));
    poke.currentHp = Math.max(0, poke.currentHp - dmg);
    logs.push(`${poke.name} was hurt by the poison!`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Leech Seed
// seeded loses 1/8 maxHP; seeder heals by that amount.
// ─────────────────────────────────────────────────────────────────────────────
function applyLeechSeed(
  seeded: BattlePokemon,
  seeder: BattlePokemon,
  logs: string[],
): void {
  if (!seeded.isSeeded) return;
  if (seeded.currentHp <= 0) return;

  const drain = Math.max(1, Math.floor(seeded.maxHp / 8));
  const actual = Math.min(seeded.currentHp, drain);
  seeded.currentHp = Math.max(0, seeded.currentHp - actual);
  logs.push(`${seeded.name}'s health is sapped by Leech Seed!`);

  if (seeder.currentHp > 0) {
    const heal = Math.min(seeder.maxHp - seeder.currentHp, actual);
    if (heal > 0) {
      seeder.currentHp += heal;
      logs.push(`${seeder.name} recovered HP!`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Wish — heals whatever Pokémon occupies the wishing side's slot
// ─────────────────────────────────────────────────────────────────────────────
function applyWish(side: SideState, active: BattlePokemon, logs: string[]): void {
  if (!side.wish) return;
  side.wish.turnsLeft -= 1;
  if (side.wish.turnsLeft > 0) return;

  const wish = side.wish;
  side.wish = undefined;
  if (active.currentHp <= 0) return;

  const heal = Math.min(active.maxHp - active.currentHp, wish.amount);
  if (heal > 0) {
    active.currentHp += heal;
    logs.push(`${wish.wisher}'s wish came true!`);
    logs.push(`${active.name} recovered ${heal} HP!`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Delayed attacks (Future Sight) — hit whatever Pokémon occupies the slot
// ─────────────────────────────────────────────────────────────────────────────
function applyDelayedAttack(side: SideState, active: BattlePokemon, logs: string[]): void {
  if (!side.delayed) return;
  side.delayed.turnsLeft -= 1;
  if (side.delayed.turnsLeft > 0) return;

  const attack = side.delayed;
  side.delayed = undefined;
  if (active.currentHp <= 0) return;

  logs.push(`${active.name} took the ${attack.moveName} attack!`);
  const dmg = Math.min(active.currentHp, attack.damage);
  active.currentHp = Math.max(0, active.currentHp - dmg);
  logs.push(`${active.name} took ${dmg} damage!`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Turn-scoped volatiles — Flinch only lasts for the turn it was inflicted.
// ─────────────────────────────────────────────────────────────────────────────
function clearTurnVolatiles(poke: BattlePokemon): void {
  if (poke.volatileStatuses.includes('Flinch')) {
    poke.volatileStatuses = poke.volatileStatuses.filter(s => s !== 'Flinch');
  }
}
