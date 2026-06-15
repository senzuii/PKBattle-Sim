import { PokemonBase } from '../../types/Pokemon';

export const snubbull: PokemonBase = {
  id: 'snubbull',
  name: 'Snubbull',
  types: ['Fairy'],
  baseStats: {
    hp: 60,
    atk: 80,
    def: 50,
    spa: 40,
    spd: 40,
    spe: 30,
  },
  abilities: ['Intimidate', 'Run Away', 'Rattled'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'scaryface' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'thunderfang' },
    { level: 1, moveId: 'icefang' },
    { level: 1, moveId: 'firefang' },
    { level: 7, moveId: 'bite' },
    { level: 13, moveId: 'lick' },
    { level: 19, moveId: 'headbutt' },
    { level: 25, moveId: 'roar' },
    { level: 31, moveId: 'rage' },
    { level: 31, moveId: 'taunt' },
    { level: 31, moveId: 'lastresort' },
    { level: 37, moveId: 'takedown' },
    { level: 37, moveId: 'playrough' },
    { level: 43, moveId: 'payback' },
    { level: 49, moveId: 'crunch' }
  ]
};
