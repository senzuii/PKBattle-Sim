import { PokemonBase } from '../../types/Pokemon';

export const houndour: PokemonBase = {
  id: 'houndour',
  name: 'Houndour',
  types: ['Dark', 'Fire'],
  baseStats: {
    hp: 45,
    atk: 60,
    def: 30,
    spa: 80,
    spd: 50,
    spe: 65,
  },
  abilities: ['Early Bird', 'Flash Fire', 'Unnerve'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'ember' },
    { level: 4, moveId: 'howl' },
    { level: 7, moveId: 'roar' },
    { level: 8, moveId: 'smog' },
    { level: 16, moveId: 'bite' },
    { level: 20, moveId: 'taunt' },
    { level: 20, moveId: 'odorsleuth' },
    { level: 20, moveId: 'incinerate' },
    { level: 25, moveId: 'beatup' },
    { level: 27, moveId: 'feintattack' },
    { level: 28, moveId: 'firefang' },
    { level: 32, moveId: 'torment' },
    { level: 32, moveId: 'payback' },
    { level: 35, moveId: 'flamethrower' },
    { level: 37, moveId: 'embargo' },
    { level: 37, moveId: 'flamecharge' },
    { level: 37, moveId: 'comeuppance' },
    { level: 40, moveId: 'foulplay' },
    { level: 43, moveId: 'crunch' },
    { level: 52, moveId: 'nastyplot' },
    { level: 56, moveId: 'inferno' }
  ]
};
