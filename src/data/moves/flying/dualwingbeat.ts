import { Move } from '../../../types/Pokemon';

const dualwingbeat: Move = {
  id: 'dualwingbeat',
  name: 'Dual Wingbeat',
  type: 'Flying',
  category: 'Physical',
  power: 40,
  accuracy: 90,
  pp: 10,
  description: 'The user slams the target with its wings. The target is hit twice in a row.',
  multiHit: [2, 2],
};

export default dualwingbeat;
