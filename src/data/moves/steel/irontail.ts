import { Move } from '../../../types/Pokemon';

const irontail: Move = {
  id: 'irontail',
  name: 'Iron Tail',
  type: 'Steel',
  category: 'Physical',
  power: 100,
  accuracy: 75,
  pp: 15,
  description: 'An attack that may reduce DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1,
    chance: 30
  },
};

export default irontail;
