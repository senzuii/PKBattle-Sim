import { PokemonBase } from '../../types/Pokemon';

export const pichu: PokemonBase = {
  id: 'pichu',
  name: 'Pichu',
  types: ['Electric'],
  baseStats: {
    hp: 20,
    atk: 40,
    def: 15,
    spa: 35,
    spd: 35,
    spe: 60,
  },
  abilities: ['Static', 'Lightning Rod'],
  learnset: [
    { level: 1, moveId: 'tailwhip' },
    { level: 1, moveId: 'thundershock' },
    { level: 1, moveId: 'charm' },
    { level: 4, moveId: 'playnice' },
    { level: 5, moveId: 'quickattack' },
    { level: 8, moveId: 'thunderwave' },
    { level: 8, moveId: 'sweetkiss' },
    { level: 12, moveId: 'nuzzle' },
    { level: 13, moveId: 'nastyplot' },
    { level: 15, moveId: 'swift' },
    { level: 21, moveId: 'spark' },
    { level: 29, moveId: 'thunderbolt' },
    { level: 37, moveId: 'irontail' },
    { level: 47, moveId: 'thunder' }
  ]
};
