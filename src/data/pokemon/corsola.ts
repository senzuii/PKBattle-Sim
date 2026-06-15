import { PokemonBase } from '../../types/Pokemon';

export const corsola: PokemonBase = {
  id: 'corsola',
  name: 'Corsola',
  types: ['Water', 'Rock'],
  baseStats: {
    hp: 65,
    atk: 55,
    def: 95,
    spa: 65,
    spd: 95,
    spe: 35,
  },
  abilities: ['Hustle', 'Natural Cure', 'Regenerator'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'harden' },
    { level: 4, moveId: 'bubble' },
    { level: 5, moveId: 'watergun' },
    { level: 8, moveId: 'recover' },
    { level: 10, moveId: 'bubblebeam' },
    { level: 10, moveId: 'aquaring' },
    { level: 13, moveId: 'refresh' },
    { level: 15, moveId: 'endure' },
    { level: 17, moveId: 'ancientpower' },
    { level: 20, moveId: 'spikecannon' },
    { level: 20, moveId: 'rockblast' },
    { level: 23, moveId: 'luckychant' },
    { level: 27, moveId: 'brine' },
    { level: 29, moveId: 'irondefense' },
    { level: 30, moveId: 'flail' },
    { level: 35, moveId: 'lifedew' },
    { level: 37, moveId: 'mirrorcoat' },
    { level: 40, moveId: 'powergem' },
    { level: 45, moveId: 'earthpower' }
  ]
};
