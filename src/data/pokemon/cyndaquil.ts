import { PokemonBase } from '../../types/Pokemon';

export const cyndaquil: PokemonBase = {
  id: 'cyndaquil',
  name: 'Cyndaquil',
  types: ['Fire'],
  baseStats: {
    hp: 39,
    atk: 52,
    def: 43,
    spa: 60,
    spd: 50,
    spe: 65,
  },
  abilities: ['Blaze', 'Flash Fire'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'quickattack' },
    { level: 4, moveId: 'smokescreen' },
    { level: 6, moveId: 'ember' },
    { level: 11, moveId: 'rollout' },
    { level: 18, moveId: 'flamewheel' },
    { level: 22, moveId: 'defensecurl' },
    { level: 25, moveId: 'swift' },
    { level: 28, moveId: 'flamecharge' },
    { level: 31, moveId: 'lavaplume' },
    { level: 34, moveId: 'flamethrower' },
    { level: 43, moveId: 'overheat' },
    { level: 46, moveId: 'doubleedge' },
    { level: 46, moveId: 'inferno' },
    { level: 49, moveId: 'eruption' },
    { level: 58, moveId: 'burnup' }
  ]
};
