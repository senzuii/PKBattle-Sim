import { PokemonBase } from '../../types/Pokemon';

export const sneasel: PokemonBase = {
  id: 'sneasel',
  name: 'Sneasel',
  types: ['Dark', 'Ice'],
  baseStats: {
    hp: 55,
    atk: 95,
    def: 55,
    spa: 35,
    spd: 75,
    spe: 115,
  },
  abilities: ['Inner Focus', 'Keen Eye', 'Pickpocket'],
  learnset: [
    { level: 1, moveId: 'scratch' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'taunt' },
    { level: 6, moveId: 'iceshard' },
    { level: 10, moveId: 'screech' },
    { level: 10, moveId: 'feintattack' },
    { level: 11, moveId: 'swift' },
    { level: 14, moveId: 'icywind' },
    { level: 16, moveId: 'furyswipes' },
    { level: 18, moveId: 'slash' },
    { level: 18, moveId: 'metalclaw' },
    { level: 20, moveId: 'agility' },
    { level: 25, moveId: 'poisonjab' },
    { level: 25, moveId: 'honeclaws' },
    { level: 28, moveId: 'beatup' },
    { level: 34, moveId: 'swordsdance' },
    { level: 40, moveId: 'snatch' },
    { level: 43, moveId: 'blizzard' },
    { level: 44, moveId: 'punishment' }
  ]
};
