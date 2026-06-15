import { PokemonBase } from '../../types/Pokemon';

export const skarmory: PokemonBase = {
  id: 'skarmory',
  name: 'Skarmory',
  types: ['Steel', 'Flying'],
  baseStats: {
    hp: 65,
    atk: 80,
    def: 140,
    spa: 40,
    spd: 70,
    spe: 70,
  },
  abilities: ['Keen Eye', 'Sturdy', 'Weak Armor'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'peck' },
    { level: 4, moveId: 'sandattack' },
    { level: 8, moveId: 'furyattack' },
    { level: 9, moveId: 'swift' },
    { level: 9, moveId: 'metalclaw' },
    { level: 12, moveId: 'agility' },
    { level: 12, moveId: 'aircutter' },
    { level: 20, moveId: 'wingattack' },
    { level: 20, moveId: 'feint' },
    { level: 24, moveId: 'slash' },
    { level: 27, moveId: 'spikes' },
    { level: 28, moveId: 'steelwing' },
    { level: 31, moveId: 'metalsound' },
    { level: 32, moveId: 'payback' },
    { level: 32, moveId: 'autotomize' },
    { level: 36, moveId: 'drillpeck' },
    { level: 39, moveId: 'airslash' },
    { level: 45, moveId: 'nightslash' },
    { level: 48, moveId: 'irondefense' },
    { level: 52, moveId: 'bravebird' }
  ]
};
