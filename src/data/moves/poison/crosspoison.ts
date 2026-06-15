import { Move } from '../../../types/Pokemon';

const crosspoison: Move = {
  id: 'crosspoison',
  name: 'Cross Poison',
  type: 'Poison',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 20,
  description: 'A slashing attack that may also leave the target poisoned. It has a high critical-hit ratio.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 10
  },
  critRatio: 2,
};

export default crosspoison;
