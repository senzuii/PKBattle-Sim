import { PokemonBase } from '../../types/Pokemon';

export const feraligatr: PokemonBase = {
  id: 'feraligatr',
  name: 'Feraligatr',
  types: ['Water'],
  baseStats: {
    hp: 85,
    atk: 105,
    def: 100,
    spa: 79,
    spd: 83,
    spe: 78,
  },
  abilities: ['Torrent', 'Sheer Force'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'agility' },
    { level: 1, moveId: 'rage' },
    { level: 1, moveId: 'mudslap' },
    { level: 13, moveId: 'bite' },
    { level: 15, moveId: 'scaryface' },
    { level: 21, moveId: 'icefang' },
    { level: 24, moveId: 'thrash' },
    { level: 24, moveId: 'flail' },
    { level: 32, moveId: 'crunch' },
    { level: 37, moveId: 'lowkick' },
    { level: 37, moveId: 'slash' },
    { level: 37, moveId: 'chipaway' },
    { level: 44, moveId: 'screech' },
    { level: 50, moveId: 'aquatail' },
    { level: 58, moveId: 'hydropump' },
    { level: 58, moveId: 'superpower' }
  ]
};
