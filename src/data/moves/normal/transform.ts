import { Move } from '../../../types/Pokemon';

const transform: Move = {
  id: 'transform',
  name: 'Transform',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'The user assumes the foe\'s guise.',
  effect: {
    type: 'transform',
    target: 'self',
  },
};

export default transform;
