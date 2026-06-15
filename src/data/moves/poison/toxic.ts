import { Move } from '../../../types/Pokemon';

const toxic: Move = {
  id: 'toxic',
  name: 'Toxic',
  type: 'Poison',
  category: 'Status',
  power: 0,
  accuracy: 90,
  pp: 10,
  description: 'A poison move with increasing damage.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Toxic'
  },
};

export default toxic;
