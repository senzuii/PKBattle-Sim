import { PokemonBase } from '../../types/Pokemon';

export const octillery: PokemonBase = {
  id: 'octillery',
  name: 'Octillery',
  types: ['Water'],
  baseStats: {
    hp: 75,
    atk: 105,
    def: 75,
    spa: 105,
    spd: 75,
    spe: 45,
  },
  abilities: ['Suction Cups', 'Sniper', 'Moody'],
  learnset: [
    { level: 0, moveId: 'octazooka' },
    { level: 1, moveId: 'wrap' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'psybeam' },
    { level: 1, moveId: 'aurorabeam' },
    { level: 1, moveId: 'focusenergy' },
    { level: 1, moveId: 'constrict' },
    { level: 1, moveId: 'bubble' },
    { level: 1, moveId: 'helpinghand' },
    { level: 1, moveId: 'rockblast' },
    { level: 1, moveId: 'waterpulse' },
    { level: 1, moveId: 'gunkshot' },
    { level: 6, moveId: 'acidspray' },
    { level: 11, moveId: 'chargebeam' },
    { level: 18, moveId: 'bubblebeam' },
    { level: 24, moveId: 'lockon' },
    { level: 25, moveId: 'icebeam' },
    { level: 28, moveId: 'wringout' },
    { level: 29, moveId: 'bulletseed' },
    { level: 34, moveId: 'hydropump' },
    { level: 34, moveId: 'signalbeam' },
    { level: 43, moveId: 'hyperbeam' },
    { level: 48, moveId: 'soak' }
  ]
};
