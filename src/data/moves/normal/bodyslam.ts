import { Move } from '../../../types/Pokemon';

const bodyslam: Move = {
  id: 'bodyslam',
  name: 'Body Slam',
  type: 'Normal',
  category: 'Physical',
  power: 85,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default bodyslam;
