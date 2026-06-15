import { PokemonBase } from '../../types/Pokemon';

export const donphan: PokemonBase = {
  id: 'donphan',
  name: 'Donphan',
  types: ['Ground'],
  baseStats: {
    hp: 90,
    atk: 120,
    def: 120,
    spa: 60,
    spd: 60,
    spe: 50,
  },
  abilities: ['Sturdy', 'Sand Veil'],
  learnset: [
    { level: 0, moveId: 'furyattack' },
    { level: 1, moveId: 'hornattack' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'takedown' },
    { level: 1, moveId: 'doubleedge' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'defensecurl' },
    { level: 1, moveId: 'flail' },
    { level: 1, moveId: 'endure' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'odorsleuth' },
    { level: 1, moveId: 'lastresort' },
    { level: 1, moveId: 'thunderfang' },
    { level: 1, moveId: 'firefang' },
    { level: 1, moveId: 'bulldoze' },
    { level: 6, moveId: 'rapidspin' },
    { level: 10, moveId: 'rollout' },
    { level: 10, moveId: 'knockoff' },
    { level: 15, moveId: 'assurance' },
    { level: 19, moveId: 'magnitude' },
    { level: 24, moveId: 'slam' },
    { level: 30, moveId: 'rocktomb' },
    { level: 30, moveId: 'stompingtantrum' },
    { level: 37, moveId: 'scaryface' },
    { level: 43, moveId: 'earthquake' },
    { level: 50, moveId: 'gigaimpact' }
  ]
};
