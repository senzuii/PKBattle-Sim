import { Move } from '../../../types/Pokemon';

const recover: Move = {
  id: 'recover',
  name: 'Recover',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Recovers up to half the user’s maximum HP.',
  effect: {
    type: 'heal',
    target: 'self',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default recover;
