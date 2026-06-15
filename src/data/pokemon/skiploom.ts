import { PokemonBase } from '../../types/Pokemon';

export const skiploom: PokemonBase = {
  id: 'skiploom',
  name: 'Skiploom',
  types: ['Grass', 'Flying'],
  baseStats: {
    hp: 55,
    atk: 45,
    def: 50,
    spa: 45,
    spd: 65,
    spe: 80,
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
    { level: 28, moveId: 'acrobatics' },
    { level: 29, moveId: 'cottonspore' },
    { level: 34, moveId: 'uturn' },
    { level: 36, moveId: 'ragepowder' },
    { level: 37, moveId: 'gigadrain' },
    { level: 40, moveId: 'worryseed' },
    { level: 41, moveId: 'bounce' },
    { level: 44, moveId: 'memento' }
  ]
};
