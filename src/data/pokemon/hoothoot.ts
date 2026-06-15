import { PokemonBase } from '../../types/Pokemon';

export const hoothoot: PokemonBase = {
  id: 'hoothoot',
  name: 'Hoothoot',
  types: ['Normal', 'Flying'],
  baseStats: {
    hp: 60,
    atk: 30,
    def: 30,
    spa: 36,
    spd: 56,
    spe: 50,
  },
  abilities: ['Insomnia', 'Keen Eye', 'Tinted Lens'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'growl' },
    { level: 1, moveId: 'peck' },
    { level: 1, moveId: 'foresight' },
    { level: 4, moveId: 'hypnosis' },
    { level: 6, moveId: 'echoedvoice' },
    { level: 9, moveId: 'confusion' },
    { level: 12, moveId: 'reflect' },
    { level: 13, moveId: 'uproar' },
    { level: 15, moveId: 'psychoshift' },
    { level: 15, moveId: 'defog' },
    { level: 16, moveId: 'zenheadbutt' },
    { level: 18, moveId: 'airslash' },
    { level: 21, moveId: 'extrasensory' },
    { level: 24, moveId: 'takedown' },
    { level: 30, moveId: 'roost' },
    { level: 33, moveId: 'moonblast' },
    { level: 39, moveId: 'dreameater' },
    { level: 41, moveId: 'synchronoise' }
  ]
};
