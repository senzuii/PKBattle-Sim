import { PokemonBase } from '../../types/Pokemon';

export const chikorita: PokemonBase = {
  id: 'chikorita',
  name: 'Chikorita',
  types: ['Grass'],
  baseStats: {
    hp: 45,
    atk: 49,
    def: 65,
    spa: 49,
    spd: 65,
    spe: 45,
  },
  abilities: ['Overgrow', 'Leaf Guard'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 6, moveId: 'razorleaf' },
    { level: 9, moveId: 'poisonpowder' },
    { level: 12, moveId: 'reflect' },
    { level: 12, moveId: 'synthesis' },
    { level: 20, moveId: 'magicalleaf' },
    { level: 23, moveId: 'leechseed' },
    { level: 23, moveId: 'naturepower' },
    { level: 23, moveId: 'naturalgift' },
    { level: 28, moveId: 'sweetscent' },
    { level: 29, moveId: 'bodyslam' },
    { level: 31, moveId: 'lightscreen' },
    { level: 39, moveId: 'safeguard' },
    { level: 42, moveId: 'gigadrain' },
    { level: 42, moveId: 'aromatherapy' },
    { level: 45, moveId: 'solarbeam' }
  ]
};
