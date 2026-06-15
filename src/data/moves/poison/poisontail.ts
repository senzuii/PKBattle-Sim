import { Move } from '../../../types/Pokemon';

const poisontail: Move = {
  id: 'poisontail',
  name: 'Poison Tail',
  type: 'Poison',
  category: 'Physical',
  power: 50,
  accuracy: 100,
  pp: 25,
  description: 'Has a high critical-hit ratio. May also poison.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 10
  },
  critRatio: 2,
};

export default poisontail;
