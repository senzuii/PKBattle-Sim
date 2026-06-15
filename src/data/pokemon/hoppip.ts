import { PokemonBase } from '../../types/Pokemon';

export const hoppip: PokemonBase = {
  id: 'hoppip',
  name: 'Hoppip',
  types: ['Grass', 'Flying'],
  baseStats: {
    hp: 35,
    atk: 35,
    def: 40,
    spa: 35,
    spd: 55,
    spe: 50,
  },
  abilities: ['Chlorophyll', 'Leaf Guard', 'Infiltrator'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'splash' },
    { level: 1, moveId: 'synthesis' },
    { level: 4, moveId: 'tailwhip' },
    { level: 8, moveId: 'fairywind' },
    { level: 10, moveId: 'poisonpowder' },
    { level: 10, moveId: 'stunspore' },
    { level: 10, moveId: 'sleeppowder' },
    { level: 12, moveId: 'bulletseed' },
    { level: 19, moveId: 'leechseed' },
    { level: 22, moveId: 'megadrain' },
    { level: 24, moveId: 'acrobatics' },
    { level: 25, moveId: 'cottonspore' },
    { level: 29, moveId: 'uturn' },
    { level: 31, moveId: 'ragepowder' },
    { level: 32, moveId: 'gigadrain' },
    { level: 34, moveId: 'worryseed' },
    { level: 35, moveId: 'bounce' },
    { level: 38, moveId: 'memento' }
  ]
};
