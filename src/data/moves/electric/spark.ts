import { Move } from '../../../types/Pokemon';

const spark: Move = {
  id: 'spark',
  name: 'Spark',
  type: 'Electric',
  category: 'Physical',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'An attack that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default spark;
