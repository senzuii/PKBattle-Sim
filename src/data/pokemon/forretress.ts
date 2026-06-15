import { PokemonBase } from '../../types/Pokemon';

export const forretress: PokemonBase = {
  id: 'forretress',
  name: 'Forretress',
  types: ['Bug', 'Steel'],
  baseStats: {
    hp: 75,
    atk: 90,
    def: 140,
    spa: 60,
    spd: 60,
    spe: 40,
  },
  abilities: ['Sturdy', 'Overcoat'],
  learnset: [
    { level: 0, moveId: 'mirrorshot' },
    { level: 0, moveId: 'autotomize' },
    { level: 0, moveId: 'heavyslam' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'takedown' },
    { level: 1, moveId: 'selfdestruct' },
    { level: 1, moveId: 'protect' },
    { level: 1, moveId: 'zapcannon' },
    { level: 1, moveId: 'toxicspikes' },
    { level: 1, moveId: 'magnetrise' },
    { level: 1, moveId: 'bugbite' },
    { level: 12, moveId: 'rapidspin' },
    { level: 17, moveId: 'bide' },
    { level: 20, moveId: 'reflect' },
    { level: 20, moveId: 'rollout' },
    { level: 20, moveId: 'naturalgift' },
    { level: 23, moveId: 'curse' },
    { level: 23, moveId: 'spikes' },
    { level: 28, moveId: 'payback' },
    { level: 33, moveId: 'explosion' },
    { level: 38, moveId: 'irondefense' },
    { level: 45, moveId: 'gyroball' },
    { level: 50, moveId: 'doubleedge' }
  ]
};
