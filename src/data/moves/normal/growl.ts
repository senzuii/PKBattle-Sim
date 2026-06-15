import { Move } from '../../../types/Pokemon';

const growl: Move = {
  id: 'growl',
  name: 'Growl',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 40,
  description: 'Reduces the foe\'s ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1
  },
};

export default growl;
