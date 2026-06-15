import { PokemonBase } from '../../types/Pokemon';

export const togepi: PokemonBase = {
  id: 'togepi',
  name: 'Togepi',
  types: ['Fairy'],
  baseStats: {
    hp: 35,
    atk: 20,
    def: 65,
    spa: 40,
    spd: 65,
    spe: 20,
  },
  abilities: ['Hustle', 'Serene Grace', 'Super Luck'],
  learnset: [
    { level: 1, moveId: 'pound' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'charm' },
    { level: 4, moveId: 'metronome' },
    { level: 4, moveId: 'sweetkiss' },
    { level: 6, moveId: 'fairywind' },
    { level: 8, moveId: 'lifedew' },
    { level: 11, moveId: 'drainingkiss' },
    { level: 13, moveId: 'yawn' },
    { level: 16, moveId: 'ancientpower' },
    { level: 17, moveId: 'encore' },
    { level: 18, moveId: 'calmmind' },
    { level: 21, moveId: 'followme' },
    { level: 25, moveId: 'bestow' },
    { level: 25, moveId: 'babydolleyes' },
    { level: 28, moveId: 'wish' },
    { level: 28, moveId: 'afteryou' },
    { level: 31, moveId: 'safeguard' },
    { level: 32, moveId: 'doubleedge' },
    { level: 34, moveId: 'extrasensory' },
    { level: 41, moveId: 'batonpass' },
    { level: 43, moveId: 'moonblast' },
    { level: 48, moveId: 'lastresort' }
  ]
};
