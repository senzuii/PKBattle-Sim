import { PokemonBase } from '../../types/Pokemon';

export const magby: PokemonBase = {
  id: 'magby',
  name: 'Magby',
  types: ['Fire'],
  baseStats: {
    hp: 45,
    atk: 75,
    def: 37,
    spa: 70,
    spd: 55,
    spe: 83,
  },
  abilities: ['Flame Body', 'Vital Spirit'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'ember' },
    { level: 1, moveId: 'smog' },
    { level: 6, moveId: 'tackle' },
    { level: 8, moveId: 'smokescreen' },
    { level: 11, moveId: 'flamewheel' },
    { level: 12, moveId: 'feintattack' },
    { level: 12, moveId: 'clearsmog' },
    { level: 15, moveId: 'firespin' },
    { level: 18, moveId: 'poisongas' },
    { level: 19, moveId: 'firepunch' },
    { level: 20, moveId: 'confuseray' },
    { level: 22, moveId: 'flameburst' },
    { level: 24, moveId: 'scaryface' },
    { level: 31, moveId: 'sunnyday' },
    { level: 32, moveId: 'lavaplume' },
    { level: 34, moveId: 'flamethrower' },
    { level: 36, moveId: 'lowkick' },
    { level: 43, moveId: 'fireblast' }
  ]
};
