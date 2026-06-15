import { PokemonBase } from '../../types/Pokemon';

export const quagsire: PokemonBase = {
  id: 'quagsire',
  name: 'Quagsire',
  types: ['Water', 'Ground'],
  baseStats: {
    hp: 95,
    atk: 85,
    def: 85,
    spa: 65,
    spd: 65,
    spe: 35,
  },
  abilities: ['Damp', 'Water Absorb', 'Unaware'],
  learnset: [
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'raindance' },
    { level: 1, moveId: 'mudsport' },
    { level: 1, moveId: 'mudshot' },
    { level: 11, moveId: 'slam' },
    { level: 12, moveId: 'mist' },
    { level: 12, moveId: 'haze' },
    { level: 19, moveId: 'mudbomb' },
    { level: 23, moveId: 'amnesia' },
    { level: 23, moveId: 'yawn' },
    { level: 28, moveId: 'aquatail' },
    { level: 34, moveId: 'muddywater' },
    { level: 35, moveId: 'earthquake' },
    { level: 46, moveId: 'toxic' }
  ]
};
