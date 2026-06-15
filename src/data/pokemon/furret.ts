import { PokemonBase } from '../../types/Pokemon';

export const furret: PokemonBase = {
  id: 'furret',
  name: 'Furret',
  types: ['Normal'],
  baseStats: {
    hp: 85,
    atk: 76,
    def: 64,
    spa: 45,
    spd: 55,
    spe: 90,
  },
  abilities: ['Run Away', 'Keen Eye', 'Frisk'],
  learnset: [
    { level: 0, moveId: 'agility' },
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'defensecurl' },
    { level: 1, moveId: 'foresight' },
    { level: 1, moveId: 'coil' },
    { level: 12, moveId: 'furyswipes' },
    { level: 17, moveId: 'helpinghand' },
    { level: 21, moveId: 'followme' },
    { level: 28, moveId: 'slam' },
    { level: 32, moveId: 'rest' },
    { level: 36, moveId: 'suckerpunch' },
    { level: 42, moveId: 'amnesia' },
    { level: 46, moveId: 'batonpass' },
    { level: 50, moveId: 'doubleedge' },
    { level: 50, moveId: 'reversal' },
    { level: 50, moveId: 'mefirst' },
    { level: 56, moveId: 'hypervoice' }
  ]
};
