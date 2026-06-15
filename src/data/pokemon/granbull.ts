import { PokemonBase } from '../../types/Pokemon';

export const granbull: PokemonBase = {
  id: 'granbull',
  name: 'Granbull',
  types: ['Fairy'],
  baseStats: {
    hp: 90,
    atk: 120,
    def: 75,
    spa: 60,
    spd: 60,
    spe: 45,
  },
  abilities: ['Intimidate', 'Quick Feet', 'Rattled'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'scaryface' },
    { level: 1, moveId: 'outrage' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'thunderfang' },
    { level: 1, moveId: 'icefang' },
    { level: 1, moveId: 'firefang' },
    { level: 7, moveId: 'bite' },
    { level: 13, moveId: 'lick' },
    { level: 19, moveId: 'headbutt' },
    { level: 27, moveId: 'roar' },
    { level: 35, moveId: 'rage' },
    { level: 35, moveId: 'taunt' },
    { level: 35, moveId: 'lastresort' },
    { level: 43, moveId: 'takedown' },
    { level: 43, moveId: 'playrough' },
    { level: 51, moveId: 'payback' },
    { level: 59, moveId: 'crunch' }
  ]
};
