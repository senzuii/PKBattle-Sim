import { PokemonBase } from '../../types/Pokemon';

export const suicune: PokemonBase = {
  id: 'suicune',
  name: 'Suicune',
  types: ['Water'],
  baseStats: {
    hp: 100,
    atk: 75,
    def: 115,
    spa: 90,
    spd: 115,
    spe: 85,
  },
  abilities: ['Pressure', 'Inner Focus'],
  learnset: [
    { level: 1, moveId: 'gust' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'mist' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'hydropump' },
    { level: 1, moveId: 'bubblebeam' },
    { level: 1, moveId: 'raindance' },
    { level: 1, moveId: 'extremespeed' },
    { level: 1, moveId: 'extrasensory' },
    { level: 1, moveId: 'sheercold' },
    { level: 1, moveId: 'tailwind' },
    { level: 6, moveId: 'waterpulse' },
    { level: 18, moveId: 'calmmind' },
    { level: 21, moveId: 'roar' },
    { level: 29, moveId: 'aurorabeam' },
    { level: 30, moveId: 'icefang' },
    { level: 42, moveId: 'crunch' },
    { level: 43, moveId: 'mirrorcoat' },
    { level: 54, moveId: 'surf' },
    { level: 78, moveId: 'blizzard' }
  ]
};
