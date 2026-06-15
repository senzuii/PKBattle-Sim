import { PokemonBase } from '../../types/Pokemon';

export const pineco: PokemonBase = {
  id: 'pineco',
  name: 'Pineco',
  types: ['Bug'],
  baseStats: {
    hp: 50,
    atk: 65,
    def: 90,
    spa: 35,
    spd: 35,
    spe: 15,
  },
  abilities: ['Sturdy', 'Overcoat'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'protect' },
    { level: 6, moveId: 'selfdestruct' },
    { level: 9, moveId: 'takedown' },
    { level: 9, moveId: 'bugbite' },
    { level: 12, moveId: 'rapidspin' },
    { level: 17, moveId: 'bide' },
    { level: 20, moveId: 'rollout' },
    { level: 20, moveId: 'naturalgift' },
    { level: 20, moveId: 'autotomize' },
    { level: 23, moveId: 'curse' },
    { level: 23, moveId: 'spikes' },
    { level: 28, moveId: 'payback' },
    { level: 31, moveId: 'explosion' },
    { level: 34, moveId: 'irondefense' },
    { level: 39, moveId: 'gyroball' },
    { level: 42, moveId: 'doubleedge' }
  ]
};
