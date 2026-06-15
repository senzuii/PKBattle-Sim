import { PokemonBase } from '../../types/Pokemon';

export const ledyba: PokemonBase = {
  id: 'ledyba',
  name: 'Ledyba',
  types: ['Bug', 'Flying'],
  baseStats: {
    hp: 40,
    atk: 20,
    def: 30,
    spa: 40,
    spd: 80,
    spe: 55,
  },
  abilities: ['Swarm', 'Early Bird', 'Rattled'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 5, moveId: 'supersonic' },
    { level: 8, moveId: 'swift' },
    { level: 9, moveId: 'cometpunch' },
    { level: 12, moveId: 'lightscreen' },
    { level: 12, moveId: 'reflect' },
    { level: 12, moveId: 'safeguard' },
    { level: 15, moveId: 'machpunch' },
    { level: 19, moveId: 'silverwind' },
    { level: 19, moveId: 'roost' },
    { level: 22, moveId: 'batonpass' },
    { level: 22, moveId: 'strugglebug' },
    { level: 29, moveId: 'agility' },
    { level: 33, moveId: 'bugbuzz' },
    { level: 36, moveId: 'airslash' },
    { level: 38, moveId: 'doubleedge' }
  ]
};
