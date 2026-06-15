import { PokemonBase } from '../../types/Pokemon';

export const magcargo: PokemonBase = {
  id: 'magcargo',
  name: 'Magcargo',
  types: ['Fire', 'Rock'],
  baseStats: {
    hp: 60,
    atk: 50,
    def: 120,
    spa: 90,
    spd: 80,
    spe: 30,
  },
  abilities: ['Magma Armor', 'Flame Body', 'Weak Armor'],
  learnset: [
    { level: 0, moveId: 'shellsmash' },
    { level: 1, moveId: 'ember' },
    { level: 1, moveId: 'rockthrow' },
    { level: 1, moveId: 'smog' },
    { level: 1, moveId: 'yawn' },
    { level: 1, moveId: 'earthpower' },
    { level: 13, moveId: 'harden' },
    { level: 15, moveId: 'incinerate' },
    { level: 19, moveId: 'recover' },
    { level: 20, moveId: 'clearsmog' },
    { level: 22, moveId: 'ancientpower' },
    { level: 23, moveId: 'flameburst' },
    { level: 29, moveId: 'amnesia' },
    { level: 29, moveId: 'rockslide' },
    { level: 34, moveId: 'lavaplume' },
    { level: 36, moveId: 'flamethrower' },
    { level: 43, moveId: 'bodyslam' }
  ]
};
