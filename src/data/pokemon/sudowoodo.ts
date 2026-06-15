import { PokemonBase } from '../../types/Pokemon';

export const sudowoodo: PokemonBase = {
  id: 'sudowoodo',
  name: 'Sudowoodo',
  types: ['Rock'],
  baseStats: {
    hp: 70,
    atk: 100,
    def: 115,
    spa: 30,
    spd: 65,
    spe: 30,
  },
  abilities: ['Sturdy', 'Rock Head', 'Rattled'],
  learnset: [
    { level: 0, moveId: 'slam' },
    { level: 1, moveId: 'lowkick' },
    { level: 1, moveId: 'rockthrow' },
    { level: 1, moveId: 'mimic' },
    { level: 1, moveId: 'flail' },
    { level: 1, moveId: 'rollout' },
    { level: 1, moveId: 'faketears' },
    { level: 1, moveId: 'hammerarm' },
    { level: 1, moveId: 'copycat' },
    { level: 1, moveId: 'stoneedge' },
    { level: 1, moveId: 'woodhammer' },
    { level: 5, moveId: 'tackle' },
    { level: 9, moveId: 'stealthrock' },
    { level: 12, moveId: 'block' },
    { level: 15, moveId: 'rockslide' },
    { level: 19, moveId: 'feintattack' },
    { level: 20, moveId: 'rocktomb' },
    { level: 21, moveId: 'irondefense' },
    { level: 22, moveId: 'tearfullook' },
    { level: 28, moveId: 'suckerpunch' },
    { level: 33, moveId: 'counter' },
    { level: 37, moveId: 'doubleedge' },
    { level: 47, moveId: 'headsmash' }
  ]
};
