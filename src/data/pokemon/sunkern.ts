import { PokemonBase } from '../../types/Pokemon';

export const sunkern: PokemonBase = {
  id: 'sunkern',
  name: 'Sunkern',
  types: ['Grass'],
  baseStats: {
    hp: 30,
    atk: 30,
    def: 30,
    spa: 30,
    spd: 30,
    spe: 30,
  },
  abilities: ['Chlorophyll', 'Solar Power', 'Early Bird'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'growth' },
    { level: 4, moveId: 'ingrain' },
    { level: 5, moveId: 'megadrain' },
    { level: 7, moveId: 'grasswhistle' },
    { level: 13, moveId: 'leechseed' },
    { level: 16, moveId: 'razorleaf' },
    { level: 19, moveId: 'sunnyday' },
    { level: 19, moveId: 'worryseed' },
    { level: 21, moveId: 'endeavor' },
    { level: 22, moveId: 'gigadrain' },
    { level: 28, moveId: 'synthesis' },
    { level: 31, moveId: 'solarbeam' },
    { level: 31, moveId: 'naturalgift' },
    { level: 34, moveId: 'doubleedge' },
    { level: 39, moveId: 'seedbomb' }
  ]
};
