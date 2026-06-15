import { Move } from '../../../types/Pokemon';

const screech: Move = {
  id: 'screech',
  name: 'Screech',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 85,
  pp: 40,
  description: 'Sharply reduces the foe\'s DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -2
  },
};

export default screech;
