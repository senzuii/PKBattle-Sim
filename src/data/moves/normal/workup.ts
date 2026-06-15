import { Move } from '../../../types/Pokemon';

const workup: Move = {
  id: 'workup',
  name: 'Work Up',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'The user is roused, and its Attack and Sp. Atk stats increase.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default workup;
