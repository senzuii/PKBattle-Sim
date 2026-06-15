import { Move } from '../../../types/Pokemon';

const meditate: Move = {
  id: 'meditate',
  name: 'Meditate',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 40,
  description: 'Raises the user\'s ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default meditate;
