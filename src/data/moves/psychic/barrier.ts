import { Move } from '../../../types/Pokemon';

const barrier: Move = {
  id: 'barrier',
  name: 'Barrier',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Sharply increases user\'s DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'def',
    stages: 2
  },
};

export default barrier;
