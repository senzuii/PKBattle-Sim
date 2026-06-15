import { Move } from '../../../types/Pokemon';

const scorchingsands: Move = {
  id: 'scorchingsands',
  name: 'Scorching Sands',
  type: 'Ground',
  category: 'Special',
  power: 70,
  accuracy: 100,
  pp: 10,
  description: 'The user throws scorching sand at the target to attack. This may also leave the target with a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 30
  },
};

export default scorchingsands;
