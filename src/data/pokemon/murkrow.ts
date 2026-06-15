import { PokemonBase } from '../../types/Pokemon';

export const murkrow: PokemonBase = {
  id: 'murkrow',
  name: 'Murkrow',
  types: ['Dark', 'Flying'],
  baseStats: {
    hp: 60,
    atk: 85,
    def: 42,
    spa: 85,
    spd: 42,
    spe: 91,
  },
  abilities: ['Insomnia', 'Super Luck', 'Prankster'],
  learnset: [
    { level: 1, moveId: 'gust' },
    { level: 1, moveId: 'peck' },
    { level: 1, moveId: 'astonish' },
    { level: 5, moveId: 'pursuit' },
    { level: 6, moveId: 'snarl' },
    { level: 11, moveId: 'haze' },
    { level: 11, moveId: 'roost' },
    { level: 15, moveId: 'wingattack' },
    { level: 18, moveId: 'aerialace' },
    { level: 21, moveId: 'nightshade' },
    { level: 25, moveId: 'assurance' },
    { level: 25, moveId: 'nightslash' },
    { level: 30, moveId: 'airslash' },
    { level: 31, moveId: 'feintattack' },
    { level: 31, moveId: 'taunt' },
    { level: 34, moveId: 'nastyplot' },
    { level: 35, moveId: 'meanlook' },
    { level: 35, moveId: 'aircutter' },
    { level: 40, moveId: 'foulplay' },
    { level: 43, moveId: 'darkpulse' },
    { level: 45, moveId: 'suckerpunch' },
    { level: 50, moveId: 'tailwind' },
    { level: 55, moveId: 'torment' },
    { level: 60, moveId: 'quash' }
  ]
};
