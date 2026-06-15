import { PokemonBase } from '../../types/Pokemon';

export const espeon: PokemonBase = {
  id: 'espeon',
  name: 'Espeon',
  types: ['Psychic'],
  baseStats: {
    hp: 65,
    atk: 65,
    def: 60,
    spa: 130,
    spd: 95,
    spe: 110,
  },
  abilities: ['Synchronize', 'Magic Bounce'],
  learnset: [
    { level: 0, moveId: 'confusion' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'takedown' },
    { level: 1, moveId: 'doubleedge' },
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'batonpass' },
    { level: 1, moveId: 'helpinghand' },
    { level: 1, moveId: 'covet' },
    { level: 1, moveId: 'copycat' },
    { level: 5, moveId: 'sandattack' },
    { level: 6, moveId: 'quickattack' },
    { level: 9, moveId: 'babydolleyes' },
    { level: 11, moveId: 'swift' },
    { level: 20, moveId: 'psybeam' },
    { level: 25, moveId: 'psychic' },
    { level: 25, moveId: 'mimic' },
    { level: 25, moveId: 'futuresight' },
    { level: 29, moveId: 'psychup' },
    { level: 30, moveId: 'morningsun' },
    { level: 34, moveId: 'calmmind' },
    { level: 35, moveId: 'powerswap' },
    { level: 41, moveId: 'lastresort' }
  ]
};
