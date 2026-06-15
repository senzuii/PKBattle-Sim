import { Move } from '../../../types/Pokemon';

const tailglow: Move = {
  id: 'tailglow',
  name: 'Tail Glow',
  type: 'Bug',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Stares at flashing lights to drastically raise Sp. Atk.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spa',
    stages: 3,
  },
};

export default tailglow;
