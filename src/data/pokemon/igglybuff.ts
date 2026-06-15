import { PokemonBase } from '../../types/Pokemon';

export const igglybuff: PokemonBase = {
  id: 'igglybuff',
  name: 'Igglybuff',
  types: ['Normal', 'Fairy'],
  baseStats: {
    hp: 90,
    atk: 30,
    def: 15,
    spa: 40,
    spd: 20,
    spe: 15,
  },
  abilities: ['Cute Charm', 'Competitive', 'Friend Guard'],
  learnset: [
    { level: 1, moveId: 'pound' },
    { level: 1, moveId: 'sing' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'copycat' },
    { level: 3, moveId: 'defensecurl' },
    { level: 8, moveId: 'sweetkiss' },
    { level: 12, moveId: 'disarmingvoice' },
    { level: 16, moveId: 'disable' }
  ]
};
