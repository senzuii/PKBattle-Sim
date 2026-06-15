import { PokemonBase } from '../../types/Pokemon';

export const cascoon: PokemonBase = {
  id: 'cascoon',
  name: "Cascoon",
  types: ['Bug'],
  baseStats: { hp: 50, atk: 35, def: 55, spa: 25, spd: 25, spe: 15 },
  abilities: ['Shed Skin'],
  learnset: [
    { level: 1, moveId: 'bugbite' },
    { level: 1, moveId: 'electroweb' },
    { level: 1, moveId: 'harden' },
    { level: 1, moveId: 'irondefense' },
    { level: 1, moveId: 'stringshot' },
  ],
};
