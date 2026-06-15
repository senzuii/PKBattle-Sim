import { PokemonBase } from '../../types/Pokemon';

export const ursaring: PokemonBase = {
  id: 'ursaring',
  name: 'Ursaring',
  types: ['Normal'],
  baseStats: {
    hp: 90,
    atk: 130,
    def: 75,
    spa: 75,
    spd: 75,
    spe: 55,
  },
  abilities: ['Guts', 'Quick Feet', 'Unnerve'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'lick' },
    { level: 1, moveId: 'furyswipes' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'faketears' },
    { level: 1, moveId: 'covet' },
    { level: 1, moveId: 'hammerarm' },
    { level: 1, moveId: 'fling' },
    { level: 1, moveId: 'babydolleyes' },
    { level: 11, moveId: 'bulldoze' },
    { level: 13, moveId: 'payback' },
    { level: 15, moveId: 'feintattack' },
    { level: 17, moveId: 'sweetscent' },
    { level: 18, moveId: 'slash' },
    { level: 25, moveId: 'playrough' },
    { level: 25, moveId: 'playnice' },
    { level: 29, moveId: 'rest' },
    { level: 34, moveId: 'highhorsepower' },
    { level: 35, moveId: 'scaryface' },
    { level: 41, moveId: 'snore' },
    { level: 43, moveId: 'doubleedge' },
    { level: 49, moveId: 'thrash' }
  ]
};
