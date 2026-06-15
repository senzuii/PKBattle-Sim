import { PokemonBase } from '../../types/Pokemon';

export const wynaut: PokemonBase = {
  id: 'wynaut',
  name: "Wynaut",
  types: ['Psychic'],
  baseStats: { hp: 95, atk: 23, def: 48, spa: 23, spd: 48, spe: 23 },
  abilities: ['Shadow Tag', 'Telepathy'],
  learnset: [
    { level: 1, moveId: 'amnesia' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'encore' },
    { level: 1, moveId: 'splash' },
    { level: 1, moveId: 'tickle' },
    { level: 15, moveId: 'counter' },
    { level: 15, moveId: 'destinybond' },
    { level: 15, moveId: 'mirrorcoat' },
    { level: 15, moveId: 'safeguard' },
  ],
};
