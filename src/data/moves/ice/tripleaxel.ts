import { Move } from '../../../types/Pokemon';

const tripleaxel: Move = {
  id: 'tripleaxel',
  name: 'Triple Axel',
  type: 'Ice',
  category: 'Physical',
  power: 20,
  accuracy: 90,
  pp: 10,
  description: 'A consecutive three-kick attack that becomes more powerful with each successful hit.',
  multiHit: [3, 3],
};

export default tripleaxel;
