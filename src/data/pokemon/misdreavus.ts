import { PokemonBase } from '../../types/Pokemon';

export const misdreavus: PokemonBase = {
  id: 'misdreavus',
  name: 'Misdreavus',
  types: ['Ghost'],
  baseStats: {
    hp: 60,
    atk: 60,
    def: 60,
    spa: 85,
    spd: 85,
    spe: 85,
  },
  abilities: ['Levitate'],
  learnset: [
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'confusion' },
    { level: 1, moveId: 'psywave' },
    { level: 1, moveId: 'shadowsneak' },
    { level: 5, moveId: 'spite' },
    { level: 10, moveId: 'astonish' },
    { level: 11, moveId: 'hypnosis' },
    { level: 12, moveId: 'confuseray' },
    { level: 18, moveId: 'hex' },
    { level: 19, moveId: 'meanlook' },
    { level: 23, moveId: 'psybeam' },
    { level: 25, moveId: 'extrasensory' },
    { level: 28, moveId: 'painsplit' },
    { level: 32, moveId: 'payback' },
    { level: 34, moveId: 'powergem' },
    { level: 37, moveId: 'shadowball' },
    { level: 41, moveId: 'perishsong' },
    { level: 46, moveId: 'grudge' }
  ]
};
