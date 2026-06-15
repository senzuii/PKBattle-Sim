import { PokemonBase } from '../../types/Pokemon';

export const dunsparce: PokemonBase = {
  id: 'dunsparce',
  name: 'Dunsparce',
  types: ['Normal'],
  baseStats: {
    hp: 100,
    atk: 70,
    def: 70,
    spa: 65,
    spd: 65,
    spe: 45,
  },
  abilities: ['Serene Grace', 'Run Away', 'Rattled'],
  learnset: [
    { level: 1, moveId: 'rage' },
    { level: 1, moveId: 'defensecurl' },
    { level: 1, moveId: 'flail' },
    { level: 3, moveId: 'rollout' },
    { level: 4, moveId: 'mudslap' },
    { level: 6, moveId: 'spite' },
    { level: 8, moveId: 'pursuit' },
    { level: 8, moveId: 'yawn' },
    { level: 11, moveId: 'screech' },
    { level: 12, moveId: 'glare' },
    { level: 16, moveId: 'ancientpower' },
    { level: 18, moveId: 'bodyslam' },
    { level: 21, moveId: 'drillrun' },
    { level: 22, moveId: 'takedown' },
    { level: 23, moveId: 'roost' },
    { level: 28, moveId: 'coil' },
    { level: 31, moveId: 'dig' },
    { level: 32, moveId: 'hyperdrill' },
    { level: 34, moveId: 'doubleedge' },
    { level: 38, moveId: 'endeavor' },
    { level: 40, moveId: 'endure' },
    { level: 40, moveId: 'dragonrush' },
    { level: 41, moveId: 'airslash' }
  ]
};
