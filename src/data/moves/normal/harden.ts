import { Move } from '../../../types/Pokemon';

const harden: Move = {
  id: 'harden',
  name: 'Harden',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'Stiffens the body’s  muscles to raise DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'def',
    stages: 1
  },
};

export default harden;
