import { Move } from '../../../types/Pokemon';

const metalsound: Move = {
  id: 'metalsound',
  name: 'Metal Sound',
  type: 'Steel',
  category: 'Status',
  power: 0,
  accuracy: 85,
  pp: 40,
  description: 'Emits a horrible screech that sharply lowers SP. DEF.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -2
  },
};

export default metalsound;
