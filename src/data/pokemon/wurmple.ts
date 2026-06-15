import { PokemonBase } from '../../types/Pokemon';

export const wurmple: PokemonBase = {
  id: 'wurmple',
  name: "Wurmple",
  types: ['Bug'],
  baseStats: { hp: 45, atk: 45, def: 35, spa: 20, spd: 30, spe: 20 },
  abilities: ['Shield Dust', 'Run Away'],
  learnset: [
    { level: 1, moveId: 'electroweb' },
    { level: 1, moveId: 'snore' },
    { level: 1, moveId: 'stringshot' },
    { level: 1, moveId: 'tackle' },
    { level: 5, moveId: 'poisonsting' },
    { level: 15, moveId: 'bugbite' },
  ],
};
