import { Move } from '../../../types/Pokemon';

const poisongas: Move = {
  id: 'poisongas',
  name: 'Poison Gas',
  type: 'Poison',
  category: 'Status',
  power: 0,
  accuracy: 90,
  pp: 40,
  description: 'A move that may poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison'
  },
};

export default poisongas;
