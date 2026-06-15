import { PokemonBase } from '../../types/Pokemon';

export const delibird: PokemonBase = {
  id: 'delibird',
  name: 'Delibird',
  types: ['Ice', 'Flying'],
  baseStats: {
    hp: 45,
    atk: 55,
    def: 45,
    spa: 65,
    spd: 45,
    spe: 75,
  },
  abilities: ['Vital Spirit', 'Hustle', 'Insomnia'],
  learnset: [
    { level: 1, moveId: 'present' },
    { level: 25, moveId: 'drillpeck' }
  ]
};
