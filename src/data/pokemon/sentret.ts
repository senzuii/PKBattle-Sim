import { PokemonBase } from '../../types/Pokemon';

export const sentret: PokemonBase = {
  id: 'sentret',
  name: 'Sentret',
  types: ['Normal'],
  baseStats: {
    hp: 35,
    atk: 46,
    def: 34,
    spa: 35,
    spd: 45,
    spe: 20,
  },
  abilities: ['Run Away', 'Keen Eye', 'Frisk'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'foresight' },
    { level: 4, moveId: 'defensecurl' },
    { level: 7, moveId: 'quickattack' },
    { level: 12, moveId: 'furyswipes' },
    { level: 16, moveId: 'helpinghand' },
    { level: 19, moveId: 'followme' },
    { level: 24, moveId: 'slam' },
    { level: 28, moveId: 'rest' },
    { level: 31, moveId: 'suckerpunch' },
    { level: 36, moveId: 'amnesia' },
    { level: 39, moveId: 'batonpass' },
    { level: 42, moveId: 'doubleedge' },
    { level: 42, moveId: 'reversal' },
    { level: 42, moveId: 'mefirst' },
    { level: 47, moveId: 'hypervoice' }
  ]
};
