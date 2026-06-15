import { PokemonBase } from '../../types/Pokemon';

export const crobat: PokemonBase = {
  id: 'crobat',
  name: 'Crobat',
  types: ['Poison', 'Flying'],
  baseStats: {
    hp: 85,
    atk: 90,
    def: 80,
    spa: 70,
    spd: 80,
    spe: 130,
  },
  abilities: ['Inner Focus', 'Infiltrator'],
  learnset: [
    { level: 0, moveId: 'crosspoison' },
    { level: 1, moveId: 'gust' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'supersonic' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'toxic' },
    { level: 1, moveId: 'screech' },
    { level: 1, moveId: 'leechlife' },
    { level: 1, moveId: 'meanlook' },
    { level: 1, moveId: 'astonish' },
    { level: 1, moveId: 'tailwind' },
    { level: 6, moveId: 'hypnosis' },
    { level: 13, moveId: 'wingattack' },
    { level: 15, moveId: 'poisonfang' },
    { level: 17, moveId: 'confuseray' },
    { level: 18, moveId: 'aircutter' },
    { level: 20, moveId: 'quickguard' },
    { level: 24, moveId: 'swift' },
    { level: 33, moveId: 'acrobatics' },
    { level: 34, moveId: 'airslash' },
    { level: 40, moveId: 'haze' },
    { level: 43, moveId: 'venoshock' }
  ]
};
