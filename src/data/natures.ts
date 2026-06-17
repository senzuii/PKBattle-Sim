import { Nature, Stats } from '../types/Pokemon';

type NStat = 'atk' | 'def' | 'spa' | 'spd' | 'spe';

/**
 * The 25 natures. `plus` gets ×1.1, `minus` gets ×0.9. The five neutral
 * natures (Hardy, Docile, Serious, Bashful, Quirky) have no effect.
 */
export const NATURES: Record<Nature, { plus: NStat | null; minus: NStat | null }> = {
  Hardy:   { plus: null,  minus: null },
  Lonely:  { plus: 'atk', minus: 'def' },
  Brave:   { plus: 'atk', minus: 'spe' },
  Adamant: { plus: 'atk', minus: 'spa' },
  Naughty: { plus: 'atk', minus: 'spd' },
  Bold:    { plus: 'def', minus: 'atk' },
  Docile:  { plus: null,  minus: null },
  Relaxed: { plus: 'def', minus: 'spe' },
  Impish:  { plus: 'def', minus: 'spa' },
  Lax:     { plus: 'def', minus: 'spd' },
  Timid:   { plus: 'spe', minus: 'atk' },
  Hasty:   { plus: 'spe', minus: 'def' },
  Serious: { plus: null,  minus: null },
  Jolly:   { plus: 'spe', minus: 'spa' },
  Naive:   { plus: 'spe', minus: 'spd' },
  Modest:  { plus: 'spa', minus: 'atk' },
  Mild:    { plus: 'spa', minus: 'def' },
  Quiet:   { plus: 'spa', minus: 'spe' },
  Bashful: { plus: null,  minus: null },
  Rash:    { plus: 'spa', minus: 'spd' },
  Calm:    { plus: 'spd', minus: 'atk' },
  Gentle:  { plus: 'spd', minus: 'def' },
  Sassy:   { plus: 'spd', minus: 'spe' },
  Careful: { plus: 'spd', minus: 'spa' },
  Quirky:  { plus: null,  minus: null },
};

export const NATURE_LIST = Object.keys(NATURES) as Nature[];

/** Stat order for the nature chart axes. */
export const NATURE_STATS: NStat[] = ['atk', 'def', 'spa', 'spd', 'spe'];
export const NATURE_STAT_LABELS: Record<NStat, string> = {
  atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe',
};

/**
 * Nature chart: rows = the LOWERED stat (−), columns = the RAISED stat (+),
 * both in NATURE_STATS order. The diagonal holds the five neutral natures.
 */
export const NATURE_CHART: Nature[][] = [
  // −Atk:  +Atk     +Def      +SpA      +SpD      +Spe
  ['Hardy',  'Bold',   'Modest', 'Calm',   'Timid'],
  // −Def
  ['Lonely', 'Docile', 'Mild',   'Gentle', 'Hasty'],
  // −SpA
  ['Adamant','Impish', 'Bashful','Careful','Jolly'],
  // −SpD
  ['Naughty','Lax',    'Rash',   'Quirky', 'Naive'],
  // −Spe
  ['Brave',  'Relaxed','Quiet',  'Sassy',  'Serious'],
];

const STAT_LABEL: Record<NStat, string> = {
  atk: 'Attack', def: 'Defense', spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed',
};

export function rollNature(): Nature {
  return NATURE_LIST[Math.floor(Math.random() * NATURE_LIST.length)];
}

/** Applies a nature's ×1.1 / ×0.9 modifiers to a computed stat block (HP is never affected). */
export function applyNature(stats: Stats, nature?: Nature): Stats {
  if (!nature) return stats;
  const n = NATURES[nature];
  const out = { ...stats };
  if (n.plus)  out[n.plus]  = Math.floor(out[n.plus]  * 1.1);
  if (n.minus) out[n.minus] = Math.floor(out[n.minus] * 0.9);
  return out;
}

/** "+Atk / −Spe" style summary, or "—" for neutral natures. */
export function natureSummary(nature?: Nature): string {
  if (!nature) return '';
  const n = NATURES[nature];
  if (!n.plus || !n.minus) return `${nature} (neutral)`;
  return `${nature} (+${STAT_LABEL[n.plus]} / −${STAT_LABEL[n.minus]})`;
}
