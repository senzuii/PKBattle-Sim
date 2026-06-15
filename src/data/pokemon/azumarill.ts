import { PokemonBase } from '../../types/Pokemon';

export const azumarill: PokemonBase = {
  id: 'azumarill',
  name: 'Azumarill',
  types: ['Water', 'Fairy'],
  baseStats: {
    hp: 100,
    atk: 50,
    def: 80,
    spa: 60,
    spd: 80,
    spe: 50,
  },
  abilities: ['Thick Fat', 'Huge Power', 'Sap Sipper'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'defensecurl' },
    { level: 1, moveId: 'bubble' },
    { level: 1, moveId: 'splash' },
    { level: 1, moveId: 'rollout' },
    { level: 1, moveId: 'helpinghand' },
    { level: 1, moveId: 'watersport' },
    { level: 6, moveId: 'bubblebeam' },
    { level: 9, moveId: 'charm' },
    { level: 12, moveId: 'slam' },
    { level: 15, moveId: 'bounce' },
    { level: 21, moveId: 'aquatail' },
    { level: 25, moveId: 'doubleedge' },
    { level: 25, moveId: 'playrough' },
    { level: 27, moveId: 'aquaring' },
    { level: 35, moveId: 'raindance' },
    { level: 40, moveId: 'hydropump' },
    { level: 42, moveId: 'superpower' }
  ]
};
