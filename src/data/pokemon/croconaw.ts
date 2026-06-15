import { PokemonBase } from '../../types/Pokemon';

export const croconaw: PokemonBase = {
  id: 'croconaw',
  name: 'Croconaw',
  types: ['Water'],
  baseStats: {
    hp: 65,
    atk: 80,
    def: 80,
    spa: 59,
    spd: 63,
    spe: 58,
  },
  abilities: ['Torrent', 'Sheer Force'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'rage' },
    { level: 8, moveId: 'mudslap' },
    { level: 13, moveId: 'bite' },
    { level: 15, moveId: 'scaryface' },
    { level: 21, moveId: 'icefang' },
    { level: 24, moveId: 'thrash' },
    { level: 24, moveId: 'flail' },
    { level: 30, moveId: 'crunch' },
    { level: 33, moveId: 'lowkick' },
    { level: 33, moveId: 'slash' },
    { level: 33, moveId: 'chipaway' },
    { level: 37, moveId: 'screech' },
    { level: 42, moveId: 'aquatail' },
    { level: 48, moveId: 'superpower' },
    { level: 51, moveId: 'hydropump' }
  ]
};
