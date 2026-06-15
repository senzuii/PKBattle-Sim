import { PokemonBase } from '../../types/Pokemon';

export const entei: PokemonBase = {
  id: 'entei',
  name: 'Entei',
  types: ['Fire'],
  baseStats: {
    hp: 115,
    atk: 115,
    def: 85,
    spa: 90,
    spd: 75,
    spe: 100,
  },
  abilities: ['Pressure', 'Inner Focus'],
  learnset: [
    { level: 1, moveId: 'stomp' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'ember' },
    { level: 1, moveId: 'smokescreen' },
    { level: 1, moveId: 'sacredfire' },
    { level: 1, moveId: 'extremespeed' },
    { level: 1, moveId: 'eruption' },
    { level: 1, moveId: 'extrasensory' },
    { level: 1, moveId: 'lavaplume' },
    { level: 6, moveId: 'flamewheel' },
    { level: 15, moveId: 'roar' },
    { level: 18, moveId: 'calmmind' },
    { level: 22, moveId: 'firespin' },
    { level: 30, moveId: 'firefang' },
    { level: 36, moveId: 'flamethrower' },
    { level: 36, moveId: 'scaryface' },
    { level: 42, moveId: 'crunch' },
    { level: 43, moveId: 'swagger' },
    { level: 66, moveId: 'sunnyday' },
    { level: 71, moveId: 'fireblast' }
  ]
};
