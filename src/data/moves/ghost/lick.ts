import { Move } from '../../../types/Pokemon';

const lick: Move = {
  id: 'lick',
  name: 'Lick',
  type: 'Ghost',
  category: 'Physical',
  power: 30,
  accuracy: 100,
  pp: 30,
  description: 'An attack that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default lick;
