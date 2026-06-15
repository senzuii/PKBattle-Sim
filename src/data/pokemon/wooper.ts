import { PokemonBase } from '../../types/Pokemon';

export const wooper: PokemonBase = {
  id: 'wooper',
  name: 'Wooper',
  types: ['Water', 'Ground'],
  baseStats: {
    hp: 55,
    atk: 45,
    def: 45,
    spa: 25,
    spd: 25,
    spe: 15,
  },
  abilities: ['Damp', 'Water Absorb', 'Unaware'],
  learnset: [
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'watergun' },
    { level: 4, moveId: 'raindance' },
    { level: 5, moveId: 'mudsport' },
    { level: 8, moveId: 'mudshot' },
    { level: 11, moveId: 'slam' },
    { level: 12, moveId: 'mist' },
    { level: 12, moveId: 'haze' },
    { level: 19, moveId: 'mudbomb' },
    { level: 21, moveId: 'amnesia' },
    { level: 21, moveId: 'yawn' },
    { level: 24, moveId: 'aquatail' },
    { level: 28, moveId: 'muddywater' },
    { level: 31, moveId: 'earthquake' },
    { level: 36, moveId: 'toxic' }
  ]
};
