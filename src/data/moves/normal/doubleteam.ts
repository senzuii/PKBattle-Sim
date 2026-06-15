import { Move } from '../../../types/Pokemon';

const doubleteam: Move = {
  id: 'doubleteam',
  name: 'Double Team',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'Heightens evasive­ ness.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'evasion',
    stages: 1
  },
};

export default doubleteam;
