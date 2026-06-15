import { Move } from '../../../types/Pokemon';

const waterfall: Move = {
  id: 'waterfall',
  name: 'Waterfall',
  type: 'Water',
  category: 'Physical',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'An aquatic charge attack.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 20
  },
};

export default waterfall;
