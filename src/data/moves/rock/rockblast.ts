import { Move } from '../../../types/Pokemon';

const rockblast: Move = {
  id: 'rockblast',
  name: 'Rock Blast',
  type: 'Rock',
  category: 'Physical',
  power: 25,
  accuracy: 90,
  pp: 10,
  description: 'Hurls boulders at the foe 2 to 5 times in a row.',
  multiHit: [2, 5],
};

export default rockblast;
