import { Move } from '../../../types/Pokemon';

const dreameater: Move = {
  id: 'dreameater',
  name: 'Dream Eater',
  type: 'Psychic',
  category: 'Special',
  power: 100,
  accuracy: 100,
  pp: 15,
  description: 'Steals HP from a sleeping victim.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default dreameater;
