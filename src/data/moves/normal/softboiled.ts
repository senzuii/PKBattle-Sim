import { Move } from '../../../types/Pokemon';

const softboiled: Move = {
  id: 'softboiled',
  name: 'Soft-Boiled',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Restores HP by 1/2 the user\'s max HP.',
  effect: {
    type: 'heal',
    target: 'self',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default softboiled;
