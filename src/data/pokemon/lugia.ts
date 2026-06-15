import { PokemonBase } from '../../types/Pokemon';

export const lugia: PokemonBase = {
  id: 'lugia',
  name: 'Lugia',
  types: ['Psychic', 'Flying'],
  baseStats: {
    hp: 106,
    atk: 90,
    def: 130,
    spa: 90,
    spd: 154,
    spe: 110,
  },
  abilities: ['Pressure', 'Multiscale'],
  learnset: [
    { level: 1, moveId: 'gust' },
    { level: 1, moveId: 'whirlwind' },
    { level: 1, moveId: 'aeroblast' },
    { level: 1, moveId: 'ancientpower' },
    { level: 1, moveId: 'weatherball' },
    { level: 1, moveId: 'dragonrush' },
    { level: 9, moveId: 'mist' },
    { level: 9, moveId: 'safeguard' },
    { level: 23, moveId: 'recover' },
    { level: 23, moveId: 'extrasensory' },
    { level: 27, moveId: 'calmmind' },
    { level: 29, moveId: 'hydropump' },
    { level: 29, moveId: 'raindance' },
    { level: 43, moveId: 'swift' },
    { level: 50, moveId: 'punishment' },
    { level: 51, moveId: 'naturalgift' },
    { level: 79, moveId: 'futuresight' },
    { level: 90, moveId: 'skyattack' }
  ]
};
