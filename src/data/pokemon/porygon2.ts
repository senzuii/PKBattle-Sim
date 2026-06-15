import { PokemonBase } from '../../types/Pokemon';

export const porygon2: PokemonBase = {
  id: 'porygon2',
  name: 'Porygon2',
  types: ['Normal'],
  baseStats: {
    hp: 85,
    atk: 80,
    def: 90,
    spa: 105,
    spd: 95,
    spe: 60,
  },
  abilities: ['Trace', 'Download', 'Analytic'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'defensecurl' },
    { level: 1, moveId: 'conversion' },
    { level: 1, moveId: 'conversion2' },
    { level: 1, moveId: 'zapcannon' },
    { level: 1, moveId: 'magiccoat' },
    { level: 1, moveId: 'recycle' },
    { level: 1, moveId: 'magnetrise' },
    { level: 7, moveId: 'psybeam' },
    { level: 9, moveId: 'agility' },
    { level: 15, moveId: 'thundershock' },
    { level: 18, moveId: 'recover' },
    { level: 29, moveId: 'signalbeam' },
    { level: 32, moveId: 'lockon' },
    { level: 36, moveId: 'triattack' },
    { level: 40, moveId: 'discharge' },
    { level: 60, moveId: 'hyperbeam' }
  ]
};
