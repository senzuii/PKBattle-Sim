import { Move } from '../../../types/Pokemon';

const poisonsting: Move = {
  id: 'poisonsting',
  name: 'Poison Sting',
  type: 'Poison',
  category: 'Physical',
  power: 15,
  accuracy: 100,
  pp: 35,
  description: 'An attack that may poison the target.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 30
  },
};

export default poisonsting;
