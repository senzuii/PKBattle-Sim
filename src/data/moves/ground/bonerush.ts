import { Move } from '../../../types/Pokemon';

const bonerush: Move = {
  id: 'bonerush',
  name: 'Bone Rush',
  type: 'Ground',
  category: 'Physical',
  power: 25,
  accuracy: 90,
  pp: 10,
  description: 'An attack that hits 2-5 times.',
  multiHit: [2, 5],
};

export default bonerush;
