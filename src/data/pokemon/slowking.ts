import { PokemonBase } from '../../types/Pokemon';

export const slowking: PokemonBase = {
  id: 'slowking',
  name: 'Slowking',
  types: ['Water', 'Psychic'],
  baseStats: {
    hp: 95,
    atk: 75,
    def: 80,
    spa: 100,
    spd: 110,
    spe: 30,
  },
  abilities: ['Oblivious', 'Own Tempo', 'Regenerator'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'curse' },
    { level: 1, moveId: 'swagger' },
    { level: 1, moveId: 'hiddenpower' },
    { level: 1, moveId: 'yawn' },
    { level: 1, moveId: 'powergem' },
    { level: 1, moveId: 'nastyplot' },
    { level: 1, moveId: 'healpulse' },
    { level: 12, moveId: 'confusion' },
    { level: 15, moveId: 'disable' },
    { level: 18, moveId: 'waterpulse' },
    { level: 21, moveId: 'headbutt' },
    { level: 24, moveId: 'zenheadbutt' },
    { level: 27, moveId: 'amnesia' },
    { level: 30, moveId: 'surf' },
    { level: 33, moveId: 'slackoff' },
    { level: 36, moveId: 'psychic' },
    { level: 39, moveId: 'psychup' },
    { level: 42, moveId: 'raindance' },
    { level: 49, moveId: 'trumpcard' }
  ]
};
