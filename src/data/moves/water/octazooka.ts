import { Move } from '../../../types/Pokemon';

const octazooka: Move = {
  id: 'octazooka',
  name: 'Octazooka',
  type: 'Water',
  category: 'Special',
  power: 65,
  accuracy: 85,
  pp: 10,
  description: 'An attack that may reduce accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1,
    chance: 50
  },
};

export default octazooka;
