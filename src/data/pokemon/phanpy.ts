import { PokemonBase } from '../../types/Pokemon';

export const phanpy: PokemonBase = {
  id: 'phanpy',
  name: 'Phanpy',
  types: ['Ground'],
  baseStats: {
    hp: 90,
    atk: 60,
    def: 60,
    spa: 40,
    spd: 40,
    spe: 40,
  },
  abilities: ['Pickup', 'Sand Veil'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'defensecurl' },
    { level: 1, moveId: 'odorsleuth' },
    { level: 6, moveId: 'flail' },
    { level: 10, moveId: 'takedown' },
    { level: 10, moveId: 'rollout' },
    { level: 15, moveId: 'naturalgift' },
    { level: 15, moveId: 'bulldoze' },
    { level: 19, moveId: 'endure' },
    { level: 24, moveId: 'slam' },
    { level: 33, moveId: 'charm' },
    { level: 37, moveId: 'lastresort' },
    { level: 42, moveId: 'doubleedge' }
  ]
};
