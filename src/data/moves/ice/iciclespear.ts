import { Move } from '../../../types/Pokemon';

const iciclespear: Move = {
  id: 'iciclespear',
  name: 'Icicle Spear',
  type: 'Ice',
  category: 'Physical',
  power: 25,
  accuracy: 100,
  pp: 30,
  description: 'Attacks the foe by firing 2 to 5 icicles in a row.',
  multiHit: [2, 5],
};

export default iciclespear;
