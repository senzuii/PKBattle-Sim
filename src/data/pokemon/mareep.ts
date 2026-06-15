import { PokemonBase } from '../../types/Pokemon';

export const mareep: PokemonBase = {
  id: 'mareep',
  name: 'Mareep',
  types: ['Electric'],
  baseStats: {
    hp: 55,
    atk: 40,
    def: 40,
    spa: 65,
    spd: 45,
    spe: 35,
  },
  abilities: ['Static', 'Plus'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 4, moveId: 'thunderwave' },
    { level: 8, moveId: 'thundershock' },
    { level: 11, moveId: 'cottonspore' },
    { level: 15, moveId: 'charge' },
    { level: 18, moveId: 'takedown' },
    { level: 22, moveId: 'electroball' },
    { level: 25, moveId: 'confuseray' },
    { level: 28, moveId: 'discharge' },
    { level: 29, moveId: 'powergem' },
    { level: 30, moveId: 'lightscreen' },
    { level: 32, moveId: 'signalbeam' },
    { level: 32, moveId: 'cottonguard' },
    { level: 37, moveId: 'thunder' },
    { level: 39, moveId: 'chargebeam' },
    { level: 39, moveId: 'dazzlinggleam' }
  ]
};
