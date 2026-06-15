import { PokemonBase } from '../../types/Pokemon';

export const unown: PokemonBase = {
  id: 'unown',
  name: 'Unown',
  types: ['Psychic'],
  baseStats: {
    hp: 48,
    atk: 72,
    def: 48,
    spa: 72,
    spd: 48,
    spe: 48,
  },
  abilities: ['Levitate'],
  learnset: [
    { level: 1, moveId: 'hiddenpower' }
  ]
};
