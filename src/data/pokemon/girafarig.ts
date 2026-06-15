import { PokemonBase } from '../../types/Pokemon';

export const girafarig: PokemonBase = {
  id: 'girafarig',
  name: 'Girafarig',
  types: ['Normal', 'Psychic'],
  baseStats: {
    hp: 70,
    atk: 80,
    def: 65,
    spa: 90,
    spd: 65,
    spe: 85,
  },
  abilities: ['Inner Focus', 'Early Bird', 'Sap Sipper'],
  learnset: [
    { level: 1, moveId: 'stomp' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'confusion' },
    { level: 1, moveId: 'astonish' },
    { level: 1, moveId: 'powerswap' },
    { level: 1, moveId: 'guardswap' },
    { level: 5, moveId: 'odorsleuth' },
    { level: 10, moveId: 'assurance' },
    { level: 14, moveId: 'agility' },
    { level: 19, moveId: 'psybeam' },
    { level: 23, moveId: 'batonpass' },
    { level: 28, moveId: 'doublehit' },
    { level: 32, moveId: 'zenheadbutt' },
    { level: 32, moveId: 'twinbeam' },
    { level: 37, moveId: 'psychic' },
    { level: 37, moveId: 'crunch' },
    { level: 46, moveId: 'nastyplot' }
  ]
};
