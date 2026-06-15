import { PokemonBase } from '../../types/Pokemon';

export const elekid: PokemonBase = {
  id: 'elekid',
  name: 'Elekid',
  types: ['Electric'],
  baseStats: {
    hp: 45,
    atk: 63,
    def: 37,
    spa: 65,
    spd: 55,
    spe: 95,
  },
  abilities: ['Static', 'Vital Spirit'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'thundershock' },
    { level: 1, moveId: 'quickattack' },
    { level: 8, moveId: 'lowkick' },
    { level: 8, moveId: 'charge' },
    { level: 9, moveId: 'thunderpunch' },
    { level: 11, moveId: 'spark' },
    { level: 12, moveId: 'swift' },
    { level: 15, moveId: 'shockwave' },
    { level: 17, moveId: 'lightscreen' },
    { level: 18, moveId: 'thunderwave' },
    { level: 22, moveId: 'electroball' },
    { level: 24, moveId: 'screech' },
    { level: 32, moveId: 'discharge' },
    { level: 34, moveId: 'thunderbolt' },
    { level: 43, moveId: 'thunder' }
  ]
};
