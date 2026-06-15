import { PokemonBase } from '../../types/Pokemon';

export const slugma: PokemonBase = {
  id: 'slugma',
  name: 'Slugma',
  types: ['Fire'],
  baseStats: {
    hp: 40,
    atk: 40,
    def: 40,
    spa: 70,
    spd: 40,
    spe: 20,
  },
  abilities: ['Magma Armor', 'Flame Body', 'Weak Armor'],
  learnset: [
    { level: 1, moveId: 'smog' },
    { level: 1, moveId: 'yawn' },
    { level: 5, moveId: 'ember' },
    { level: 8, moveId: 'rockthrow' },
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
    { level: 41, moveId: 'bodyslam' },
    { level: 50, moveId: 'earthpower' }
  ]
};
