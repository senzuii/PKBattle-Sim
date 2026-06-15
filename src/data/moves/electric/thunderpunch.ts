import { Move } from '../../../types/Pokemon';

const thunderpunch: Move = {
  id: 'thunderpunch',
  name: 'Thunder Punch',
  type: 'Electric',
  category: 'Physical',
  power: 75,
  accuracy: 100,
  pp: 15,
  description: 'An electric punch. It may paralyze.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 10
  },
};

export default thunderpunch;
