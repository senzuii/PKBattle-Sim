import { PokemonBase } from '../../types/Pokemon';

export const wobbuffet: PokemonBase = {
  id: 'wobbuffet',
  name: 'Wobbuffet',
  types: ['Psychic'],
  baseStats: {
    hp: 190,
    atk: 33,
    def: 58,
    spa: 33,
    spd: 58,
    spe: 33,
  },
  abilities: ['Shadow Tag', 'Telepathy'],
  learnset: [
    { level: 0, moveId: 'counter' },
    { level: 0, moveId: 'destinybond' },
    { level: 0, moveId: 'safeguard' },
    { level: 0, moveId: 'mirrorcoat' },
    { level: 1, moveId: 'amnesia' },
    { level: 1, moveId: 'splash' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'encore' }
  ]
};
