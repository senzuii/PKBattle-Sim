import { PokemonBase } from '../../types/Pokemon';

export const quilava: PokemonBase = {
  id: 'quilava',
  name: 'Quilava',
  types: ['Fire'],
  baseStats: {
    hp: 58,
    atk: 64,
    def: 58,
    spa: 80,
    spd: 65,
    spe: 80,
  },
  abilities: ['Blaze', 'Flash Fire'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'smokescreen' },
    { level: 6, moveId: 'ember' },
    { level: 11, moveId: 'rollout' },
    { level: 18, moveId: 'flamewheel' },
    { level: 24, moveId: 'defensecurl' },
    { level: 25, moveId: 'swift' },
    { level: 34, moveId: 'flamethrower' },
    { level: 35, moveId: 'lavaplume' },
    { level: 35, moveId: 'flamecharge' },
    { level: 43, moveId: 'overheat' },
    { level: 53, moveId: 'doubleedge' },
    { level: 53, moveId: 'inferno' },
    { level: 57, moveId: 'eruption' },
    { level: 68, moveId: 'burnup' }
  ]
};
