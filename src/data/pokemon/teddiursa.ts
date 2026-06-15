import { PokemonBase } from '../../types/Pokemon';

export const teddiursa: PokemonBase = {
  id: 'teddiursa',
  name: 'Teddiursa',
  types: ['Normal'],
  baseStats: {
    hp: 60,
    atk: 80,
    def: 50,
    spa: 50,
    spd: 50,
    spe: 40,
  },
  abilities: ['Pickup', 'Quick Feet', 'Honey Gather'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'lick' },
    { level: 1, moveId: 'faketears' },
    { level: 1, moveId: 'covet' },
    { level: 1, moveId: 'fling' },
    { level: 1, moveId: 'babydolleyes' },
    { level: 8, moveId: 'furyswipes' },
    { level: 11, moveId: 'bulldoze' },
    { level: 13, moveId: 'payback' },
    { level: 15, moveId: 'feintattack' },
    { level: 17, moveId: 'sweetscent' },
    { level: 18, moveId: 'slash' },
    { level: 25, moveId: 'playrough' },
    { level: 25, moveId: 'playnice' },
    { level: 29, moveId: 'rest' },
    { level: 33, moveId: 'charm' },
    { level: 34, moveId: 'highhorsepower' },
    { level: 37, moveId: 'snore' },
    { level: 41, moveId: 'thrash' },
    { level: 43, moveId: 'doubleedge' }
  ]
};
