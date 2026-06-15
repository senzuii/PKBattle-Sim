import { PokemonBase } from '../../types/Pokemon';

export const jumpluff: PokemonBase = {
  id: 'jumpluff',
  name: 'Jumpluff',
  types: ['Grass', 'Flying'],
  baseStats: {
    hp: 75,
    atk: 55,
    def: 70,
    spa: 55,
    spd: 95,
    spe: 110,
  },
  abilities: ['Chlorophyll', 'Leaf Guard', 'Infiltrator'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'splash' },
    { level: 1, moveId: 'synthesis' },
    { level: 10, moveId: 'fairywind' },
    { level: 12, moveId: 'poisonpowder' },
    { level: 12, moveId: 'stunspore' },
    { level: 12, moveId: 'sleeppowder' },
    { level: 15, moveId: 'bulletseed' },
    { level: 20, moveId: 'leechseed' },
    { level: 24, moveId: 'megadrain' },
    { level: 30, moveId: 'acrobatics' },
    { level: 32, moveId: 'cottonspore' },
    { level: 36, moveId: 'uturn' },
    { level: 39, moveId: 'ragepowder' },
    { level: 40, moveId: 'worryseed' },
    { level: 43, moveId: 'gigadrain' },
    { level: 48, moveId: 'bounce' },
    { level: 52, moveId: 'memento' }
  ]
};
