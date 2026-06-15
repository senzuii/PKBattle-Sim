import { Move } from '../../../types/Pokemon';

const poisonpowder: Move = {
  id: 'poisonpowder',
  name: 'Poison Powder',
  type: 'Poison',
  category: 'Status',
  power: 0,
  accuracy: 75,
  pp: 35,
  description: 'A move that may poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison'
  },
};

export default poisonpowder;
