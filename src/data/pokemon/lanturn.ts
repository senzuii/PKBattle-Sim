import { PokemonBase } from '../../types/Pokemon';

export const lanturn: PokemonBase = {
  id: 'lanturn',
  name: 'Lanturn',
  types: ['Water', 'Electric'],
  baseStats: {
    hp: 125,
    atk: 58,
    def: 58,
    spa: 76,
    spd: 76,
    spe: 67,
  },
  abilities: ['Volt Absorb', 'Illuminate', 'Water Absorb'],
  learnset: [
    { level: 0, moveId: 'stockpile' },
    { level: 0, moveId: 'spitup' },
    { level: 0, moveId: 'swallow' },
    { level: 1, moveId: 'supersonic' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'thunderwave' },
    { level: 1, moveId: 'bubble' },
    { level: 1, moveId: 'electroball' },
    { level: 1, moveId: 'eerieimpulse' },
    { level: 1, moveId: 'spotlight' },
    { level: 9, moveId: 'flail' },
    { level: 12, moveId: 'bubblebeam' },
    { level: 16, moveId: 'confuseray' },
    { level: 20, moveId: 'spark' },
    { level: 23, moveId: 'takedown' },
    { level: 24, moveId: 'charge' },
    { level: 29, moveId: 'signalbeam' },
    { level: 30, moveId: 'discharge' },
    { level: 36, moveId: 'aquaring' },
    { level: 50, moveId: 'hydropump' },
    { level: 54, moveId: 'iondeluge' }
  ]
};
