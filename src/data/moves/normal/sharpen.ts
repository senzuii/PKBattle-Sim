import { Move } from '../../../types/Pokemon';

const sharpen: Move = {
  id: 'sharpen',
  name: 'Sharpen',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'A move that raises the user\'s ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default sharpen;
