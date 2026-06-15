import { Move } from '../../../types/Pokemon';

const bulletseed: Move = {
  id: 'bulletseed',
  name: 'Bullet Seed',
  type: 'Grass',
  category: 'Physical',
  power: 25,
  accuracy: 100,
  pp: 30,
  description: 'Shoots 2 to 5 seeds in a row to strike the foe.',
  multiHit: [2, 5],
};

export default bulletseed;
