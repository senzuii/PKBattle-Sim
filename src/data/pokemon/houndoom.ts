import { PokemonBase } from '../../types/Pokemon';

export const houndoom: PokemonBase = {
  id: 'houndoom',
  name: 'Houndoom',
  types: ['Dark', 'Fire'],
  baseStats: {
    hp: 75,
    atk: 90,
    def: 50,
    spa: 110,
    spd: 80,
    spe: 95,
  },
  abilities: ['Early Bird', 'Flash Fire', 'Unnerve'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'ember' },
    { level: 1, moveId: 'smog' },
    { level: 1, moveId: 'howl' },
    { level: 1, moveId: 'nastyplot' },
    { level: 1, moveId: 'thunderfang' },
    { level: 1, moveId: 'inferno' },
    { level: 7, moveId: 'roar' },
    { level: 16, moveId: 'bite' },
    { level: 20, moveId: 'taunt' },
    { level: 20, moveId: 'odorsleuth' },
    { level: 20, moveId: 'incinerate' },
    { level: 26, moveId: 'beatup' },
    { level: 30, moveId: 'feintattack' },
    { level: 30, moveId: 'firefang' },
    { level: 35, moveId: 'torment' },
    { level: 35, moveId: 'payback' },
    { level: 41, moveId: 'flamethrower' },
    { level: 41, moveId: 'embargo' },
    { level: 41, moveId: 'flamecharge' },
    { level: 41, moveId: 'comeuppance' },
    { level: 45, moveId: 'foulplay' },
    { level: 52, moveId: 'crunch' }
  ]
};
