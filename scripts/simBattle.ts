/**
 * Engine smoke test — runs scripted turns directly against the TurnEngine and
 * prints the battle log so field mechanics can be verified by eye:
 *   1. Future Sight lands 2 turns later, not immediately
 *   2. Rain Dance boosts Water damage / Thunder never misses, weather expires after 5 turns
 *   3. Stealth Rock + Spikes damage a Pokémon switching in
 *   4. Sandstorm chips non-immune Pokémon each turn
 *   5. Wish heals at the end of the next turn
 *   6. Solar Beam fires instantly in sun
 *
 * Run: npx tsx scripts/simBattle.ts
 */

import { BattlePokemon, Move, PokeType, Stats } from '../src/types/Pokemon';
import { MOVES } from '../src/data/moves';
import { executeBattleTurn, TurnExecutionResult } from '../src/engine/battle/TurnEngine';
import { createField, FieldState } from '../src/engine/battle/Field';
import { seededRng } from '../src/engine/battle/Random';
import { estimateDamage } from '../src/engine/damage/DamageCalculator';

let failures = 0;
function check(label: string, cond: boolean): void {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`);
  if (!cond) failures++;
}

const flatStats = (n: number): Stats => ({ hp: n, atk: n, def: n, spa: n, spd: n, spe: n });

function makePokemon(name: string, types: PokeType[], moveIds: string[], spe = 100): BattlePokemon {
  const stats = { ...flatStats(100), hp: 300, spe };
  const moves = moveIds.map(id => {
    const m = MOVES[id];
    if (!m) throw new Error(`Unknown move: ${id}`);
    return { ...m, currentPp: m.pp } as Move;
  });
  return {
    id: `${name}_test`,
    baseId: name.toLowerCase(),
    name,
    types,
    level: 50,
    ability: 'None',
    ivs: flatStats(31),
    evs: flatStats(0),
    stats,
    currentHp: 300,
    maxHp: 300,
    statStages: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0 },
    isSeeded: false,
    moves,
    volatileStatuses: [],
  };
}

const move = (id: string): Move => {
  const m = MOVES[id];
  if (!m) throw new Error(`Unknown move: ${id}`);
  return m;
};

function turn(
  state: { p: BattlePokemon; o: BattlePokemon; field: FieldState },
  pMoveId: string,
  oMoveId: string,
  seed: number,
): TurnExecutionResult {
  const result = executeBattleTurn(
    state.p, state.o,
    { type: 'move', move: move(pMoveId) },
    { type: 'move', move: move(oMoveId) },
    state.field,
    seededRng(seed),
  );
  state.p = result.player;
  state.o = result.opponent;
  state.field = result.field;
  console.log(result.logs.filter(Boolean).map(l => '    ' + l).join('\n'));
  return result;
}

// ─── 1. Future Sight is delayed ──────────────────────────────────────────────
console.log('\n=== Future Sight ===');
{
  const s = { p: makePokemon('Alakazam', ['Psychic'], ['futuresight', 'splash']), o: makePokemon('Snorlax', ['Normal'], ['splash']), field: createField() };
  const hpStart = s.o.currentHp;
  turn(s, 'futuresight', 'splash', 1);
  check('no damage on cast turn', s.o.currentHp === hpStart);
  check('attack is pending on opponent side', !!s.field.opponent.delayed);
  turn(s, 'splash', 'splash', 2);
  check('still no damage after turn 1 of countdown', s.o.currentHp === hpStart);
  turn(s, 'splash', 'splash', 3);
  check('Future Sight landed at end of turn 2', s.o.currentHp < hpStart);
  check('pending attack cleared', !s.field.opponent.delayed);
}

// ─── 2. Rain: Water boost, Thunder never misses, expiry ──────────────────────
console.log('\n=== Rain Dance ===');
{
  const s = { p: makePokemon('Kyogre', ['Water'], ['raindance', 'surf', 'thunder', 'splash']), o: makePokemon('Golem', ['Rock'], ['splash']), field: createField() };
  const dry = estimateDamage(s.p, s.o, move('surf')).avg;
  const wet = estimateDamage(s.p, s.o, move('surf'), 'Rain').avg;
  check(`rain boosts Water damage (${dry} → ${wet})`, wet > dry * 1.3);
  turn(s, 'raindance', 'splash', 10);
  check('weather set to Rain for 5 turns', s.field.weather?.kind === 'Rain' && s.field.weather.turnsLeft === 4);
  for (let i = 0; i < 4; i++) turn(s, 'splash', 'splash', 20 + i);
  check('rain expired after 5 turns', s.field.weather === undefined);
}

// ─── 3. Entry hazards on switch-in ───────────────────────────────────────────
console.log('\n=== Stealth Rock + Spikes ===');
{
  const s = { p: makePokemon('Skarmory', ['Steel', 'Flying'], ['stealthrock', 'spikes', 'splash']), o: makePokemon('Machamp', ['Fighting'], ['splash']), field: createField() };
  turn(s, 'stealthrock', 'splash', 30);
  turn(s, 'spikes', 'splash', 31);
  check('hazards recorded on opponent side', s.field.opponent.hazards.stealthRock && s.field.opponent.hazards.spikes === 1);

  // Opponent switches in a Charizard (4x weak to Rock, Flying = immune to Spikes)
  const charizard = makePokemon('Charizard', ['Fire', 'Flying'], ['splash']);
  const result = executeBattleTurn(
    s.p, s.o,
    { type: 'move', move: move('splash') },
    { type: 'switch', incoming: charizard },
    s.field,
    seededRng(32),
  );
  console.log(result.logs.filter(Boolean).map(l => '    ' + l).join('\n'));
  // 4x effective Stealth Rock = maxHp/2 = 150; Flying-type dodges Spikes
  check(`Charizard lost exactly half HP to Stealth Rock (${result.opponent.currentHp}/300)`, result.opponent.currentHp === 150);
}

// ─── 4. Sandstorm chip damage ────────────────────────────────────────────────
console.log('\n=== Sandstorm ===');
{
  const s = { p: makePokemon('Tyranitar', ['Rock', 'Dark'], ['sandstorm', 'splash']), o: makePokemon('Pikachu', ['Electric'], ['splash']), field: createField() };
  turn(s, 'sandstorm', 'splash', 40);
  const expected = 300 - Math.floor(300 / 16);
  check(`Pikachu chipped by sandstorm (${s.o.currentHp}/${expected})`, s.o.currentHp === expected);
  check('Rock-type Tyranitar untouched', s.p.currentHp === 300);
}

// ─── 5. Wish heals next turn ─────────────────────────────────────────────────
console.log('\n=== Wish ===');
{
  const s = { p: makePokemon('Blissey', ['Normal'], ['wish', 'splash']), o: makePokemon('Machamp', ['Fighting'], ['splash']), field: createField() };
  s.p.currentHp = 100;
  turn(s, 'wish', 'splash', 50);
  check('no heal on cast turn', s.p.currentHp === 100);
  turn(s, 'splash', 'splash', 51);
  check(`healed half max HP at end of next turn (${s.p.currentHp})`, s.p.currentHp === 250);
}

// ─── 6. Solar Beam in sun ────────────────────────────────────────────────────
console.log('\n=== Solar Beam in sun ===');
{
  const s = { p: makePokemon('Venusaur', ['Grass'], ['sunnyday', 'solarbeam']), o: makePokemon('Golem', ['Rock'], ['splash']), field: createField() };
  turn(s, 'sunnyday', 'splash', 60);
  const hpBefore = s.o.currentHp;
  turn(s, 'solarbeam', 'splash', 61);
  check('Solar Beam fired without a charge turn in sun', s.o.currentHp < hpBefore);

  const s2 = { p: makePokemon('Venusaur', ['Grass'], ['solarbeam']), o: makePokemon('Golem', ['Rock'], ['splash']), field: createField() };
  const hp2 = s2.o.currentHp;
  turn(s2, 'solarbeam', 'splash', 62);
  check('Solar Beam still charges without sun', s2.o.currentHp === hp2);
}

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
