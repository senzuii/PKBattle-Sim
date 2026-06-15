import { PokemonBase } from '../../types/Pokemon';

export const smoochum: PokemonBase = {
  id: 'smoochum',
  name: 'Smoochum',
  types: ['Ice', 'Psychic'],
  baseStats: {
    hp: 45,
    atk: 30,
    def: 15,
    spa: 85,
    spd: 65,
    spe: 65,
  },
  abilities: ['Oblivious', 'Forewarn', 'Hydration'],
  learnset: [
    { level: 1, moveId: 'pound' },
    { level: 1, moveId: 'lick' },
    { level: 4, moveId: 'powdersnow' },
    { level: 8, moveId: 'sweetkiss' },
    { level: 8, moveId: 'copycat' },
    { level: 12, moveId: 'confusion' },
    { level: 16, moveId: 'covet' },
    { level: 18, moveId: 'sing' },
    { level: 21, moveId: 'meanlook' },
    { level: 21, moveId: 'heartstamp' },
    { level: 24, moveId: 'faketears' },
    { level: 28, moveId: 'icepunch' },
    { level: 28, moveId: 'luckychant' },
    { level: 31, moveId: 'avalanche' },
    { level: 32, moveId: 'psychic' },
    { level: 41, moveId: 'perishsong' },
    { level: 45, moveId: 'blizzard' }
  ]
};
