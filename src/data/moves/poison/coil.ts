import { Move } from '../../../types/Pokemon';

const coil: Move = {
  id: 'coil',
  name: 'Coil',
  type: 'Poison',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user coils up and concentrates. This raises its Attack and Defense stats as well as its accuracy.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default coil;
