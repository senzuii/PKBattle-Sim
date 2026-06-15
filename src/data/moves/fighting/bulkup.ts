import { Move } from '../../../types/Pokemon';

const bulkup: Move = {
  id: 'bulkup',
  name: 'Bulk Up',
  type: 'Fighting',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Bulks up the body to boost both ATTACK and DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default bulkup;
