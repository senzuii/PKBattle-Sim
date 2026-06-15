import { PokemonBase } from '../../types/Pokemon';

export const tyranitar: PokemonBase = {
  id: 'tyranitar',
  name: 'Tyranitar',
  types: ['Rock', 'Dark'],
  baseStats: {
    hp: 100,
    atk: 134,
    def: 110,
    spa: 95,
    spd: 100,
    spe: 61,
  },
  abilities: ['Sand Stream', 'Unnerve'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'bite' },
    { level: 1, moveId: 'rockthrow' },
    { level: 1, moveId: 'screech' },
    { level: 1, moveId: 'sandstorm' },
    { level: 1, moveId: 'irondefense' },
    { level: 1, moveId: 'payback' },
    { level: 1, moveId: 'darkpulse' },
    { level: 1, moveId: 'thunderfang' },
    { level: 1, moveId: 'icefang' },
    { level: 1, moveId: 'firefang' },
    { level: 12, moveId: 'scaryface' },
    { level: 14, moveId: 'rockslide' },
    { level: 14, moveId: 'chipaway' },
    { level: 18, moveId: 'stompingtantrum' },
    { level: 23, moveId: 'thrash' },
    { level: 24, moveId: 'smackdown' },
    { level: 27, moveId: 'crunch' },
    { level: 33, moveId: 'earthquake' },
    { level: 37, moveId: 'stoneedge' },
    { level: 52, moveId: 'hyperbeam' },
    { level: 59, moveId: 'gigaimpact' }
  ]
};
