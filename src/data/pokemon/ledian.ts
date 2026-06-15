import { PokemonBase } from '../../types/Pokemon';

export const ledian: PokemonBase = {
  id: 'ledian',
  name: 'Ledian',
  types: ['Bug', 'Flying'],
  baseStats: {
    hp: 55,
    atk: 35,
    def: 50,
    spa: 55,
    spd: 110,
    spe: 85,
  },
  abilities: ['Swarm', 'Early Bird', 'Iron Fist'],
  learnset: [
    { level: 1, moveId: 'cometpunch' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'supersonic' },
    { level: 1, moveId: 'swift' },
    { level: 12, moveId: 'lightscreen' },
    { level: 12, moveId: 'reflect' },
    { level: 12, moveId: 'safeguard' },
    { level: 15, moveId: 'machpunch' },
    { level: 20, moveId: 'silverwind' },
    { level: 20, moveId: 'roost' },
    { level: 24, moveId: 'batonpass' },
    { level: 24, moveId: 'strugglebug' },
    { level: 33, moveId: 'agility' },
    { level: 38, moveId: 'bugbuzz' },
    { level: 42, moveId: 'airslash' },
    { level: 47, moveId: 'doubleedge' }
  ]
};
