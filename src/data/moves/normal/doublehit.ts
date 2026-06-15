import { Move } from '../../../types/Pokemon';

const doublehit: Move = {
  id: 'doublehit',
  name: 'Double Hit',
  type: 'Normal',
  category: 'Physical',
  power: 35,
  accuracy: 90,
  pp: 10,
  description: 'The user slams the foe with a tail, etc. The target is hit twice in a row. ',
  multiHit: [2, 2],
};

export default doublehit;
