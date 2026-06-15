import { Move } from '../../../types/Pokemon';

const bonemerang: Move = {
  id: 'bonemerang',
  name: 'Bonemerang',
  type: 'Ground',
  category: 'Physical',
  power: 50,
  accuracy: 90,
  pp: 10,
  description: 'An attack that strikes twice.',
  multiHit: [2, 2],
};

export default bonemerang;
