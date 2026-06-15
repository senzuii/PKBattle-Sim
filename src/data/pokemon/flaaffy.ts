import { PokemonBase } from '../../types/Pokemon';

export const flaaffy: PokemonBase = {
  id: 'flaaffy',
  name: 'Flaaffy',
  types: ['Electric'],
  baseStats: {
    hp: 70,
    atk: 55,
    def: 55,
    spa: 80,
    spd: 60,
    spe: 45,
  },
  abilities: ['Static', 'Plus'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'thundershock' },
    { level: 1, moveId: 'thunderwave' },
    { level: 11, moveId: 'cottonspore' },
    { level: 16, moveId: 'charge' },
    { level: 20, moveId: 'takedown' },
    { level: 25, moveId: 'electroball' },
    { level: 29, moveId: 'confuseray' },
    { level: 31, moveId: 'discharge' },
    { level: 34, moveId: 'powergem' },
    { level: 36, moveId: 'lightscreen' },
    { level: 36, moveId: 'signalbeam' },
    { level: 36, moveId: 'cottonguard' },
    { level: 45, moveId: 'thunder' },
    { level: 47, moveId: 'chargebeam' },
    { level: 47, moveId: 'dazzlinggleam' }
  ]
};
