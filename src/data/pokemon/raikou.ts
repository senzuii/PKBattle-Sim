import { PokemonBase } from '../../types/Pokemon';

export const raikou: PokemonBase = {
  id: 'raikou',
  name: 'Raikou',
  types: ['Electric'],
  baseStats: {
    hp: 90,
    atk: 85,
    def: 75,
    spa: 115,
    spd: 100,
    spe: 115,
  },
  abilities: ['Pressure', 'Inner Focus'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'thundershock' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'extremespeed' },
    { level: 1, moveId: 'charge' },
    { level: 1, moveId: 'extrasensory' },
    { level: 1, moveId: 'discharge' },
    { level: 6, moveId: 'spark' },
    { level: 15, moveId: 'roar' },
    { level: 18, moveId: 'calmmind' },
    { level: 30, moveId: 'thunderfang' },
    { level: 36, moveId: 'reflect' },
    { level: 36, moveId: 'howl' },
    { level: 42, moveId: 'crunch' },
    { level: 66, moveId: 'raindance' },
    { level: 71, moveId: 'thunder' },
    { level: 78, moveId: 'zapcannon' }
  ]
};
