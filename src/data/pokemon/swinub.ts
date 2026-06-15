import { PokemonBase } from '../../types/Pokemon';

export const swinub: PokemonBase = {
  id: 'swinub',
  name: 'Swinub',
  types: ['Ice', 'Ground'],
  baseStats: {
    hp: 50,
    atk: 50,
    def: 40,
    spa: 30,
    spd: 30,
    spe: 50,
  },
  abilities: ['Oblivious', 'Snow Cloak', 'Thick Fat'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'mudslap' },
    { level: 1, moveId: 'odorsleuth' },
    { level: 4, moveId: 'mudsport' },
    { level: 5, moveId: 'powdersnow' },
    { level: 6, moveId: 'iceshard' },
    { level: 10, moveId: 'flail' },
    { level: 11, moveId: 'bulldoze' },
    { level: 14, moveId: 'endure' },
    { level: 18, moveId: 'mudbomb' },
    { level: 18, moveId: 'iciclecrash' },
    { level: 20, moveId: 'mist' },
    { level: 21, moveId: 'icywind' },
    { level: 25, moveId: 'highhorsepower' },
    { level: 28, moveId: 'takedown' },
    { level: 34, moveId: 'ancientpower' },
    { level: 35, moveId: 'amnesia' },
    { level: 37, moveId: 'earthquake' },
    { level: 43, moveId: 'blizzard' },
    { level: 52, moveId: 'doubleedge' }
  ]
};
