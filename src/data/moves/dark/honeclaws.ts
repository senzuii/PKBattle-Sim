import { Move } from '../../../types/Pokemon';

const honeclaws: Move = {
  id: 'honeclaws',
  name: 'Hone Claws',
  type: 'Dark',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'The user sharpens its claws to boost its Attack stat and accuracy.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default honeclaws;
