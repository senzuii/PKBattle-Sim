import { PokemonBase } from '../../types/Pokemon';

export const remoraid: PokemonBase = {
  id: 'remoraid',
  name: 'Remoraid',
  types: ['Water'],
  baseStats: {
    hp: 35,
    atk: 65,
    def: 35,
    spa: 65,
    spd: 35,
    spe: 65,
  },
  abilities: ['Hustle', 'Sniper', 'Moody'],
  learnset: [
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'bubble' },
    { level: 1, moveId: 'helpinghand' },
    { level: 4, moveId: 'waterpulse' },
    { level: 6, moveId: 'lockon' },
    { level: 6, moveId: 'acidspray' },
    { level: 8, moveId: 'focusenergy' },
    { level: 10, moveId: 'psybeam' },
    { level: 11, moveId: 'chargebeam' },
    { level: 14, moveId: 'aurorabeam' },
    { level: 18, moveId: 'bubblebeam' },
    { level: 25, moveId: 'icebeam' },
    { level: 27, moveId: 'bulletseed' },
    { level: 30, moveId: 'signalbeam' },
    { level: 34, moveId: 'hydropump' },
    { level: 40, moveId: 'soak' },
    { level: 43, moveId: 'hyperbeam' }
  ]
};
