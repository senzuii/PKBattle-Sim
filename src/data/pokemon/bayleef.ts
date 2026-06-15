import { PokemonBase } from '../../types/Pokemon';

export const bayleef: PokemonBase = {
  id: 'bayleef',
  name: 'Bayleef',
  types: ['Grass'],
  baseStats: {
    hp: 60,
    atk: 62,
    def: 80,
    spa: 63,
    spd: 80,
    spe: 60,
  },
  abilities: ['Overgrow', 'Leaf Guard'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'razorleaf' },
    { level: 1, moveId: 'poisonpowder' },
    { level: 1, moveId: 'reflect' },
    { level: 12, moveId: 'synthesis' },
    { level: 22, moveId: 'magicalleaf' },
    { level: 26, moveId: 'leechseed' },
    { level: 26, moveId: 'naturepower' },
    { level: 26, moveId: 'naturalgift' },
    { level: 31, moveId: 'bodyslam' },
    { level: 32, moveId: 'sweetscent' },
    { level: 36, moveId: 'lightscreen' },
    { level: 46, moveId: 'safeguard' },
    { level: 50, moveId: 'gigadrain' },
    { level: 50, moveId: 'aromatherapy' },
    { level: 54, moveId: 'solarbeam' }
  ]
};
