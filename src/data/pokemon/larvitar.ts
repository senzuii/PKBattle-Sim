import { PokemonBase } from '../../types/Pokemon';

export const larvitar: PokemonBase = {
  id: 'larvitar',
  name: 'Larvitar',
  types: ['Rock', 'Ground'],
  baseStats: {
    hp: 50,
    atk: 64,
    def: 50,
    spa: 45,
    spd: 50,
    spe: 41,
  },
  abilities: ['Guts', 'Sand Veil'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'bite' },
    { level: 3, moveId: 'rockthrow' },
    { level: 5, moveId: 'sandstorm' },
    { level: 6, moveId: 'payback' },
    { level: 10, moveId: 'screech' },
    { level: 12, moveId: 'scaryface' },
    { level: 14, moveId: 'rockslide' },
    { level: 14, moveId: 'chipaway' },
    { level: 18, moveId: 'stompingtantrum' },
    { level: 23, moveId: 'thrash' },
    { level: 24, moveId: 'darkpulse' },
    { level: 24, moveId: 'smackdown' },
    { level: 27, moveId: 'crunch' },
    { level: 31, moveId: 'earthquake' },
    { level: 33, moveId: 'stoneedge' },
    { level: 42, moveId: 'hyperbeam' }
  ]
};
