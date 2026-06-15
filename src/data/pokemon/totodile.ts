import { PokemonBase } from '../../types/Pokemon';

export const totodile: PokemonBase = {
  id: 'totodile',
  name: 'Totodile',
  types: ['Water'],
  baseStats: {
    hp: 50,
    atk: 65,
    def: 64,
    spa: 44,
    spd: 48,
    spe: 43,
  },
  abilities: ['Torrent', 'Sheer Force'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'leer' },
    { level: 6, moveId: 'watergun' },
    { level: 7, moveId: 'rage' },
    { level: 8, moveId: 'mudslap' },
    { level: 9, moveId: 'bite' },
    { level: 13, moveId: 'scaryface' },
    { level: 19, moveId: 'icefang' },
    { level: 22, moveId: 'thrash' },
    { level: 22, moveId: 'flail' },
    { level: 27, moveId: 'crunch' },
    { level: 29, moveId: 'lowkick' },
    { level: 29, moveId: 'slash' },
    { level: 29, moveId: 'chipaway' },
    { level: 33, moveId: 'screech' },
    { level: 36, moveId: 'aquatail' },
    { level: 41, moveId: 'superpower' },
    { level: 43, moveId: 'hydropump' }
  ]
};
