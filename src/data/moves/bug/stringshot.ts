import { Move } from '../../../types/Pokemon';

const stringshot: Move = {
  id: 'stringshot',
  name: 'String Shot',
  type: 'Bug',
  category: 'Status',
  power: 0,
  accuracy: 95,
  pp: 40,
  description: 'A move that lowers the foe\'s SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -2
  },
};

export default stringshot;
