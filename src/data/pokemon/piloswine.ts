import { PokemonBase } from '../../types/Pokemon';

export const piloswine: PokemonBase = {
  id: 'piloswine',
  name: 'Piloswine',
  types: ['Ice', 'Ground'],
  baseStats: {
    hp: 100,
    atk: 100,
    def: 80,
    spa: 60,
    spd: 60,
    spe: 50,
  },
  abilities: ['Oblivious', 'Snow Cloak', 'Thick Fat'],
  learnset: [
    { level: 0, moveId: 'furyattack' },
    { level: 0, moveId: 'icefang' },
    { level: 1, moveId: 'hornattack' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'peck' },
    { level: 1, moveId: 'flail' },
    { level: 1, moveId: 'powdersnow' },
    { level: 1, moveId: 'mudslap' },
    { level: 1, moveId: 'endure' },
    { level: 1, moveId: 'ancientpower' },
    { level: 1, moveId: 'mudsport' },
    { level: 1, moveId: 'odorsleuth' },
    { level: 6, moveId: 'iceshard' },
    { level: 11, moveId: 'bulldoze' },
    { level: 18, moveId: 'mudbomb' },
    { level: 18, moveId: 'iciclecrash' },
    { level: 20, moveId: 'mist' },
    { level: 21, moveId: 'icywind' },
    { level: 25, moveId: 'highhorsepower' },
    { level: 28, moveId: 'takedown' },
    { level: 37, moveId: 'amnesia' },
    { level: 40, moveId: 'earthquake' },
    { level: 41, moveId: 'thrash' },
    { level: 43, moveId: 'blizzard' },
    { level: 52, moveId: 'doubleedge' }
  ]
};
