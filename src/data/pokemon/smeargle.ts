import { PokemonBase } from '../../types/Pokemon';

export const smeargle: PokemonBase = {
  id: 'smeargle',
  name: 'Smeargle',
  types: ['Normal'],
  baseStats: {
    hp: 55,
    atk: 20,
    def: 35,
    spa: 20,
    spd: 45,
    spe: 75,
  },
  abilities: ['Own Tempo', 'Technician', 'Moody'],
  learnset: [
    { level: 1, moveId: 'sketch' }
  ]
};
