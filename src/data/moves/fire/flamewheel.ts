import { Move } from '../../../types/Pokemon';

const flamewheel: Move = {
  id: 'flamewheel',
  name: 'Flame Wheel',
  type: 'Fire',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 25,
  description: 'An attack that may cause a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
};

export default flamewheel;
