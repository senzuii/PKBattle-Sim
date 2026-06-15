import { PokemonBase } from '../../types/Pokemon';

export const gligar: PokemonBase = {
  id: 'gligar',
  name: 'Gligar',
  types: ['Ground', 'Flying'],
  baseStats: {
    hp: 65,
    atk: 75,
    def: 105,
    spa: 35,
    spd: 65,
    spe: 85,
  },
  abilities: ['Hyper Cutter', 'Sand Veil', 'Immunity'],
  learnset: [
    { level: 1, moveId: 'poisonsting' },
    { level: 4, moveId: 'sandattack' },
    { level: 6, moveId: 'quickattack' },
    { level: 7, moveId: 'harden' },
    { level: 10, moveId: 'knockoff' },
    { level: 11, moveId: 'aerialace' },
    { level: 16, moveId: 'furycutter' },
    { level: 18, moveId: 'mudbomb' },
    { level: 19, moveId: 'feintattack' },
    { level: 19, moveId: 'mudslap' },
    { level: 19, moveId: 'poisontail' },
    { level: 22, moveId: 'acrobatics' },
    { level: 25, moveId: 'slash' },
    { level: 27, moveId: 'screech' },
    { level: 30, moveId: 'uturn' },
    { level: 34, moveId: 'swordsdance' },
    { level: 34, moveId: 'poisonjab' },
    { level: 40, moveId: 'xscissor' },
    { level: 45, moveId: 'guillotine' },
    { level: 45, moveId: 'earthquake' },
    { level: 45, moveId: 'crabhammer' },
    { level: 45, moveId: 'skyuppercut' }
  ]
};
