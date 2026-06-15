import { PokemonBase } from '../../types/Pokemon';

export const aipom: PokemonBase = {
  id: 'aipom',
  name: 'Aipom',
  types: ['Normal'],
  baseStats: {
    hp: 55,
    atk: 70,
    def: 55,
    spa: 40,
    spd: 55,
    spe: 85,
  },
  abilities: ['Run Away', 'Pickup', 'Skill Link'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'quickattack' },
    { level: 4, moveId: 'sandattack' },
    { level: 6, moveId: 'nastyplot' },
    { level: 8, moveId: 'astonish' },
    { level: 11, moveId: 'swift' },
    { level: 11, moveId: 'batonpass' },
    { level: 15, moveId: 'tickle' },
    { level: 18, moveId: 'furyswipes' },
    { level: 18, moveId: 'mudbomb' },
    { level: 25, moveId: 'screech' },
    { level: 25, moveId: 'doublehit' },
    { level: 29, moveId: 'agility' },
    { level: 34, moveId: 'irontail' },
    { level: 36, moveId: 'fling' },
    { level: 43, moveId: 'doubleedge' },
    { level: 43, moveId: 'lastresort' }
  ]
};
