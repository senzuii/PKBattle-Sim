import { PokemonBase } from '../../types/Pokemon';

export const pupitar: PokemonBase = {
  id: 'pupitar',
  name: 'Pupitar',
  types: ['Rock', 'Ground'],
  baseStats: {
    hp: 70,
    atk: 84,
    def: 70,
    spa: 65,
    spd: 70,
    spe: 51,
  },
  abilities: ['Shed Skin'],
  learnset: [
    { level: 0, moveId: 'irondefense' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'rockthrow' },
    { level: 1, moveId: 'screech' },
    { level: 1, moveId: 'sandstorm' },
    { level: 1, moveId: 'payback' },
    { level: 12, moveId: 'scaryface' },
    { level: 14, moveId: 'rockslide' },
    { level: 14, moveId: 'chipaway' },
    { level: 18, moveId: 'stompingtantrum' },
    { level: 23, moveId: 'thrash' },
    { level: 24, moveId: 'darkpulse' },
    { level: 24, moveId: 'smackdown' },
    { level: 27, moveId: 'crunch' },
    { level: 33, moveId: 'earthquake' },
    { level: 37, moveId: 'stoneedge' },
    { level: 52, moveId: 'hyperbeam' }
  ]
};
