import { PokemonBase } from '../../types/Pokemon';

export const sunflora: PokemonBase = {
  id: 'sunflora',
  name: 'Sunflora',
  types: ['Grass'],
  baseStats: {
    hp: 75,
    atk: 75,
    def: 55,
    spa: 105,
    spd: 85,
    spe: 30,
  },
  abilities: ['Chlorophyll', 'Solar Power', 'Early Bird'],
  learnset: [
    { level: 1, moveId: 'pound' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'growth' },
    { level: 1, moveId: 'synthesis' },
    { level: 1, moveId: 'endeavor' },
    { level: 1, moveId: 'seedbomb' },
    { level: 1, moveId: 'flowershield' },
    { level: 4, moveId: 'ingrain' },
    { level: 5, moveId: 'megadrain' },
    { level: 7, moveId: 'grasswhistle' },
    { level: 10, moveId: 'razorleaf' },
    { level: 13, moveId: 'leechseed' },
    { level: 19, moveId: 'sunnyday' },
    { level: 19, moveId: 'worryseed' },
    { level: 21, moveId: 'bulletseed' },
    { level: 22, moveId: 'gigadrain' },
    { level: 28, moveId: 'petaldance' },
    { level: 31, moveId: 'solarbeam' },
    { level: 31, moveId: 'naturalgift' },
    { level: 34, moveId: 'doubleedge' },
    { level: 43, moveId: 'leafstorm' },
    { level: 50, moveId: 'petalblizzard' }
  ]
};
