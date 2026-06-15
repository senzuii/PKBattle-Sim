import { PokemonBase } from '../../types/Pokemon';

export const meganium: PokemonBase = {
  id: 'meganium',
  name: 'Meganium',
  types: ['Grass'],
  baseStats: {
    hp: 80,
    atk: 82,
    def: 100,
    spa: 83,
    spd: 100,
    spe: 80,
  },
  abilities: ['Overgrow', 'Leaf Guard'],
  learnset: [
    { level: 0, moveId: 'petaldance' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'razorleaf' },
    { level: 1, moveId: 'poisonpowder' },
    { level: 1, moveId: 'reflect' },
    { level: 1, moveId: 'petalblizzard' },
    { level: 12, moveId: 'synthesis' },
    { level: 22, moveId: 'magicalleaf' },
    { level: 26, moveId: 'leechseed' },
    { level: 26, moveId: 'naturepower' },
    { level: 26, moveId: 'naturalgift' },
    { level: 31, moveId: 'bodyslam' },
    { level: 34, moveId: 'sweetscent' },
    { level: 40, moveId: 'lightscreen' },
    { level: 51, moveId: 'safeguard' },
    { level: 60, moveId: 'gigadrain' },
    { level: 60, moveId: 'aromatherapy' },
    { level: 61, moveId: 'solarbeam' }
  ]
};
