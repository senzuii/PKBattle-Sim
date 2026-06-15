import { PokemonBase } from '../../types/Pokemon';

export const shuckle: PokemonBase = {
  id: 'shuckle',
  name: 'Shuckle',
  types: ['Bug', 'Rock'],
  baseStats: {
    hp: 20,
    atk: 10,
    def: 230,
    spa: 10,
    spd: 230,
    spe: 5,
  },
  abilities: ['Sturdy', 'Gluttony', 'Contrary'],
  learnset: [
    { level: 1, moveId: 'wrap' },
    { level: 1, moveId: 'withdraw' },
    { level: 1, moveId: 'bide' },
    { level: 1, moveId: 'constrict' },
    { level: 1, moveId: 'rollout' },
    { level: 1, moveId: 'strugglebug' },
    { level: 1, moveId: 'stickyweb' },
    { level: 5, moveId: 'encore' },
    { level: 14, moveId: 'safeguard' },
    { level: 15, moveId: 'rockthrow' },
    { level: 20, moveId: 'rest' },
    { level: 27, moveId: 'gastroacid' },
    { level: 30, moveId: 'bugbite' },
    { level: 31, moveId: 'powertrick' },
    { level: 34, moveId: 'shellsmash' },
    { level: 35, moveId: 'guardsplit' },
    { level: 35, moveId: 'powersplit' },
    { level: 38, moveId: 'rockslide' },
    { level: 49, moveId: 'stoneedge' }
  ]
};
