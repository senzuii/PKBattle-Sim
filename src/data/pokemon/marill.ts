import { PokemonBase } from '../../types/Pokemon';

export const marill: PokemonBase = {
  id: 'marill',
  name: 'Marill',
  types: ['Water', 'Fairy'],
  baseStats: {
    hp: 70,
    atk: 20,
    def: 50,
    spa: 20,
    spd: 50,
    spe: 40,
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
    { level: 5, moveId: 'watersport' },
    { level: 6, moveId: 'bubblebeam' },
    { level: 9, moveId: 'charm' },
    { level: 12, moveId: 'slam' },
    { level: 15, moveId: 'bounce' },
    { level: 19, moveId: 'aquatail' },
    { level: 21, moveId: 'playrough' },
    { level: 23, moveId: 'doubleedge' },
    { level: 23, moveId: 'aquaring' },
    { level: 27, moveId: 'raindance' },
    { level: 30, moveId: 'hydropump' },
    { level: 36, moveId: 'superpower' }
  ]
};
