import { PokemonBase } from '../../types/Pokemon';

export const typhlosion: PokemonBase = {
  id: 'typhlosion',
  name: 'Typhlosion',
  types: ['Fire'],
  baseStats: {
    hp: 78,
    atk: 84,
    def: 78,
    spa: 109,
    spd: 85,
    spe: 100,
  },
  abilities: ['Blaze', 'Flash Fire'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'doubleedge' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'ember' },
    { level: 1, moveId: 'smokescreen' },
    { level: 1, moveId: 'eruption' },
    { level: 1, moveId: 'gyroball' },
    { level: 13, moveId: 'quickattack' },
    { level: 20, moveId: 'flamewheel' },
    { level: 24, moveId: 'defensecurl' },
    { level: 31, moveId: 'swift' },
    { level: 35, moveId: 'lavaplume' },
    { level: 35, moveId: 'flamecharge' },
    { level: 42, moveId: 'flamethrower' },
    { level: 46, moveId: 'rollout' },
    { level: 56, moveId: 'inferno' },
    { level: 74, moveId: 'overheat' },
    { level: 74, moveId: 'burnup' }
  ]
};
