import { PokemonBase } from '../../types/Pokemon';

export const miltank: PokemonBase = {
  id: 'miltank',
  name: 'Miltank',
  types: ['Normal'],
  baseStats: {
    hp: 95,
    atk: 80,
    def: 105,
    spa: 40,
    spd: 70,
    spe: 100,
  },
  abilities: ['Thick Fat', 'Scrappy', 'Sap Sipper'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 5, moveId: 'defensecurl' },
    { level: 5, moveId: 'rollout' },
    { level: 8, moveId: 'stomp' },
    { level: 11, moveId: 'milkdrink' },
    { level: 15, moveId: 'bide' },
    { level: 20, moveId: 'healbell' },
    { level: 24, moveId: 'bodyslam' },
    { level: 25, moveId: 'headbutt' },
    { level: 29, moveId: 'zenheadbutt' },
    { level: 35, moveId: 'captivate' },
    { level: 41, moveId: 'gyroball' },
    { level: 45, moveId: 'playrough' },
    { level: 50, moveId: 'charm' },
    { level: 50, moveId: 'wakeupslap' },
    { level: 55, moveId: 'highhorsepower' }
  ]
};
