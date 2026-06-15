import { PokemonBase } from '../../types/Pokemon';

export const beldum: PokemonBase = {
  id: 'beldum',
  name: "Beldum",
  types: ['Steel', 'Psychic'],
  baseStats: { hp: 40, atk: 55, def: 80, spa: 35, spd: 60, spe: 30 },
  abilities: ['Clear Body', 'Light Metal'],
  learnset: [
    { level: 1, moveId: 'headbutt' },
    { level: 1, moveId: 'holdback' },
    { level: 1, moveId: 'irondefense' },
    { level: 1, moveId: 'ironhead' },
    { level: 1, moveId: 'steelbeam' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'takedown' },
    { level: 1, moveId: 'terablast' },
    { level: 1, moveId: 'zenheadbutt' },
  ],
};
