import { PokemonBase } from '../../types/Pokemon';

export const tyrogue: PokemonBase = {
  id: 'tyrogue',
  name: 'Tyrogue',
  types: ['Fighting'],
  baseStats: {
    hp: 35,
    atk: 35,
    def: 35,
    spa: 35,
    spd: 35,
    spe: 35,
  },
  abilities: ['Guts', 'Steadfast', 'Vital Spirit'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'focusenergy' },
    { level: 1, moveId: 'foresight' },
    { level: 1, moveId: 'fakeout' },
    { level: 1, moveId: 'helpinghand' }
  ]
};
