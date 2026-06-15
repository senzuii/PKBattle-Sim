import { Move } from '../../../types/Pokemon';

const confuseray: Move = {
  id: 'confuseray',
  name: 'Confuse Ray',
  type: 'Ghost',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'A move that causes confusion.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion'
  },
};

export default confuseray;
