import { Move } from '../../../types/Pokemon';

const bounce: Move = {
  id: 'bounce',
  name: 'Bounce',
  type: 'Flying',
  category: 'Physical',
  power: 85,
  accuracy: 85,
  pp: 5,
  description: 'Bounces up, then down the next turn. May paralyze.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default bounce;
