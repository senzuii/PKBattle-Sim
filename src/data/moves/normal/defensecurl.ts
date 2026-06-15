import { Move } from '../../../types/Pokemon';

const defensecurl: Move = {
  id: 'defensecurl',
  name: 'Defense Curl',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 40,
  description: 'Heightens the user\'s DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'def',
    stages: 1
  },
};

export default defensecurl;
