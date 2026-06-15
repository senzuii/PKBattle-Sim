import { Move } from '../../../types/Pokemon';

const sweetkiss: Move = {
  id: 'sweetkiss',
  name: 'Sweet Kiss',
  type: 'Fairy',
  category: 'Status',
  power: 0,
  accuracy: 75,
  pp: 10,
  description: 'A move that causes confusion.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion'
  },
};

export default sweetkiss;
