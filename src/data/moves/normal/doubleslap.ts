import { Move } from '../../../types/Pokemon';

const doubleslap: Move = {
  id: 'doubleslap',
  name: 'Double Slap',
  type: 'Normal',
  category: 'Physical',
  power: 15,
  accuracy: 85,
  pp: 10,
  description: 'Repeatedly slaps 2-5 times.',
  multiHit: [2, 5],
};

export default doubleslap;
