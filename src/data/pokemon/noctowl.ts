import { PokemonBase } from '../../types/Pokemon';

export const noctowl: PokemonBase = {
  id: 'noctowl',
  name: 'Noctowl',
  types: ['Normal', 'Flying'],
  baseStats: {
    hp: 100,
    atk: 50,
    def: 50,
    spa: 86,
    spd: 96,
    spe: 70,
  },
  abilities: ['Insomnia', 'Keen Eye', 'Tinted Lens'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'peck' },
    { level: 1, moveId: 'hypnosis' },
    { level: 1, moveId: 'dreameater' },
    { level: 1, moveId: 'skyattack' },
    { level: 1, moveId: 'foresight' },
    { level: 1, moveId: 'echoedvoice' },
    { level: 9, moveId: 'confusion' },
    { level: 12, moveId: 'reflect' },
    { level: 13, moveId: 'uproar' },
    { level: 15, moveId: 'psychoshift' },
    { level: 16, moveId: 'zenheadbutt' },
    { level: 18, moveId: 'airslash' },
    { level: 23, moveId: 'extrasensory' },
    { level: 27, moveId: 'takedown' },
    { level: 38, moveId: 'roost' },
    { level: 43, moveId: 'moonblast' },
    { level: 47, moveId: 'synchronoise' }
  ]
};
