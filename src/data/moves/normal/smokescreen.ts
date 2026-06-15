import { Move } from '../../../types/Pokemon';

const smokescreen: Move = {
  id: 'smokescreen',
  name: 'Smokescreen',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Lowers the foe\'s accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1
  },
};

export default smokescreen;
