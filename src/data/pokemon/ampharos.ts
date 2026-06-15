import { PokemonBase } from '../../types/Pokemon';

export const ampharos: PokemonBase = {
  id: 'ampharos',
  name: 'Ampharos',
  types: ['Electric'],
  baseStats: {
    hp: 90,
    atk: 75,
    def: 85,
    spa: 115,
    spd: 90,
    spe: 55,
  },
  abilities: ['Static', 'Plus'],
  learnset: [
    { level: 0, moveId: 'thunderpunch' },
    { level: 1, moveId: 'firepunch' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'thundershock' },
    { level: 1, moveId: 'thunderwave' },
    { level: 1, moveId: 'zapcannon' },
    { level: 1, moveId: 'dragonpulse' },
    { level: 1, moveId: 'iondeluge' },
    { level: 1, moveId: 'magneticflux' },
    { level: 11, moveId: 'cottonspore' },
    { level: 16, moveId: 'charge' },
    { level: 20, moveId: 'takedown' },
    { level: 25, moveId: 'electroball' },
    { level: 29, moveId: 'confuseray' },
    { level: 34, moveId: 'discharge' },
    { level: 35, moveId: 'powergem' },
    { level: 40, moveId: 'cottonguard' },
    { level: 42, moveId: 'lightscreen' },
    { level: 42, moveId: 'signalbeam' },
    { level: 51, moveId: 'chargebeam' },
    { level: 51, moveId: 'dazzlinggleam' },
    { level: 57, moveId: 'thunder' }
  ]
};
