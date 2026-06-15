import { PokemonBase } from '../../types/Pokemon';

export const cleffa: PokemonBase = {
  id: 'cleffa',
  name: 'Cleffa',
  types: ['Fairy'],
  baseStats: {
    hp: 50,
    atk: 25,
    def: 28,
    spa: 45,
    spd: 55,
    spe: 15,
  },
  abilities: ['Cute Charm', 'Magic Guard', 'Friend Guard'],
  learnset: [
    { level: 1, moveId: 'pound' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'splash' },
    { level: 1, moveId: 'charm' },
    { level: 1, moveId: 'copycat' },
    { level: 4, moveId: 'sing' },
    { level: 4, moveId: 'encore' },
    { level: 5, moveId: 'fairywind' },
    { level: 8, moveId: 'sweetkiss' },
    { level: 9, moveId: 'babydolleyes' },
    { level: 12, moveId: 'disarmingvoice' },
    { level: 15, moveId: 'drainingkiss' },
    { level: 16, moveId: 'magicalleaf' },
    { level: 21, moveId: 'calmmind' },
    { level: 29, moveId: 'psychic' },
    { level: 37, moveId: 'moonblast' },
    { level: 47, moveId: 'doubleedge' }
  ]
};
