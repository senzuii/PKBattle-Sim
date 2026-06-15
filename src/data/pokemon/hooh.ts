import { PokemonBase } from '../../types/Pokemon';

export const hooh: PokemonBase = {
  id: 'ho-oh',
  name: 'Ho Oh',
  types: ['Fire', 'Flying'],
  baseStats: {
    hp: 106,
    atk: 130,
    def: 90,
    spa: 110,
    spd: 154,
    spe: 90,
  },
  abilities: ['Pressure', 'Regenerator'],
  learnset: [
    { level: 1, moveId: 'gust' },
    { level: 1, moveId: 'whirlwind' },
    { level: 1, moveId: 'sacredfire' },
    { level: 1, moveId: 'ancientpower' },
    { level: 1, moveId: 'weatherball' },
    { level: 9, moveId: 'safeguard' },
    { level: 9, moveId: 'lifedew' },
    { level: 15, moveId: 'bravebird' },
    { level: 23, moveId: 'recover' },
    { level: 23, moveId: 'extrasensory' },
    { level: 27, moveId: 'calmmind' },
    { level: 29, moveId: 'fireblast' },
    { level: 29, moveId: 'sunnyday' },
    { level: 43, moveId: 'swift' },
    { level: 50, moveId: 'punishment' },
    { level: 51, moveId: 'naturalgift' },
    { level: 79, moveId: 'futuresight' },
    { level: 90, moveId: 'skyattack' },
    { level: 99, moveId: 'overheat' },
    { level: 99, moveId: 'burnup' }
  ]
};
