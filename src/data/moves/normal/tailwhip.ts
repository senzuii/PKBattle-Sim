import { Move } from '../../../types/Pokemon';

const tailwhip: Move = {
  id: 'tailwhip',
  name: 'Tail Whip',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'Lowers the foe\'s DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1
  },
};

export default tailwhip;
