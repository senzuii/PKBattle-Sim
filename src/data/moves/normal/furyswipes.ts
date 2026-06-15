import { Move } from '../../../types/Pokemon';

const furyswipes: Move = {
  id: 'furyswipes',
  name: 'Fury Swipes',
  type: 'Normal',
  category: 'Physical',
  power: 18,
  accuracy: 80,
  pp: 15,
  description: 'Quickly scratches 2-5 times.',
  multiHit: [2, 5],
};

export default furyswipes;
