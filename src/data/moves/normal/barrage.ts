import { Move } from '../../../types/Pokemon';

const barrage: Move = {
  id: 'barrage',
  name: 'Barrage',
  type: 'Normal',
  category: 'Physical',
  power: 15,
  accuracy: 85,
  pp: 20,
  description: 'Throws orbs to hit 2-5 times.',
  multiHit: [2, 5],
};

export default barrage;
