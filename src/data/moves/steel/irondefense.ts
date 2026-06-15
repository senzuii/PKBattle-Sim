import { Move } from '../../../types/Pokemon';

const irondefense: Move = {
  id: 'irondefense',
  name: 'Iron Defense',
  type: 'Steel',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'Hardens the body’s surface to sharply raise DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'def',
    stages: 2
  },
};

export default irondefense;
