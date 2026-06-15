import { Move } from '../../../types/Pokemon';

const minimize: Move = {
  id: 'minimize',
  name: 'Minimize',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'Heightens evasive­ ness.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'evasion',
    stages: 2
  },
};

export default minimize;
