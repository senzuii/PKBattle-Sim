import { PokemonBase } from '../../types/Pokemon';

export const chinchou: PokemonBase = {
  id: 'chinchou',
  name: 'Chinchou',
  types: ['Water', 'Electric'],
  baseStats: {
    hp: 75,
    atk: 38,
    def: 38,
    spa: 56,
    spd: 56,
    spe: 67,
  },
  abilities: ['Volt Absorb', 'Illuminate', 'Water Absorb'],
  learnset: [
    { level: 1, moveId: 'supersonic' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'thunderwave' },
    { level: 1, moveId: 'bubble' },
    { level: 4, moveId: 'electroball' },
    { level: 9, moveId: 'flail' },
    { level: 12, moveId: 'bubblebeam' },
    { level: 12, moveId: 'confuseray' },
    { level: 20, moveId: 'spark' },
    { level: 23, moveId: 'takedown' },
    { level: 24, moveId: 'charge' },
    { level: 28, moveId: 'signalbeam' },
    { level: 28, moveId: 'discharge' },
    { level: 32, moveId: 'aquaring' },
    { level: 41, moveId: 'hydropump' },
    { level: 47, moveId: 'iondeluge' }
  ]
};
